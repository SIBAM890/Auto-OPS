const fs = require("fs");
const makeWASocket = require("@whiskeysockets/baileys").default;
const {
    useMultiFileAuthState,
    DisconnectReason,
} = require("@whiskeysockets/baileys");
const engineService = require("./engine.service");

// Global State
let sock = null;
let isConnected = false;
let isConnecting = false;
let qrCode = null;
let connectTimeout = null;

exports.connectToWhatsApp = async () => {
    // Check if already connected or connecting
    if (isConnected) {
        console.log("⚠️ WhatsApp already connected.");
        return { status: "already_connected" };
    }
    if (isConnecting) {
        console.log("⚠️ WhatsApp connection already in progress.");
        return { status: "connecting" };
    }

    isConnecting = true;
    qrCode = null; // Reset QR

    // Ensure previous socket is dead before starting new one
    if (sock) {
        try {
            sock.ev.removeAllListeners();
            sock.end();
            sock = null;
        } catch (e) {}
    }

    // Set a safety timeout - if no QR or connection in 60s, reset isConnecting
    if (connectTimeout) clearTimeout(connectTimeout);
    connectTimeout = setTimeout(() => {
        if (isConnecting && !isConnected && !qrCode) {
            console.log("🕒 Connection Timeout: Resetting state...");
            isConnecting = false;
            sock?.end();
            sock = null;
        }
    }, 60000);

    try {
        const { state, saveCreds } = await useMultiFileAuthState("auth_info_baileys");

        sock = makeWASocket({
            auth: state,
            printQRInTerminal: false,
            logger: require('pino')({ level: 'fatal' }),
            connectTimeoutMs: 30000,
            keepAliveIntervalMs: 15000
        });

        // Use a flag to prevent multiple connection.update executions for the same event in edge cases
        let isClosed = false;

        // Safe credential saving wrapper
        sock.ev.on("creds.update", async (creds) => {
            try {
                if (fs.existsSync("auth_info_baileys")) {
                    await saveCreds(creds);
                }
            } catch (e) { }
        });

        sock.ev.on("connection.update", async (update) => {
            const { connection, lastDisconnect, qr } = update;

            // Capture QR Code
            if (qr) {
                console.log("📸 QR Code Generated!");
                qrCode = qr;
                // keep isConnecting = true to blockade other connection attempts
            }

            if (connection === "close") {
                if (isClosed) return; // Prevent double handling
                isClosed = true;

                const statusCode = lastDisconnect?.error?.output?.statusCode;
                
                // If it's a conflict or generic error that causes a loop, let's be careful
                const isConflict = statusCode === DisconnectReason.connectionLost || statusCode === DisconnectReason.connectionClosed;
                const shouldReconnect = statusCode !== DisconnectReason.loggedOut;

                console.log(`❌ Connection closed. Status: ${statusCode}, Reconnect: ${shouldReconnect}`);

                isConnected = false;
                qrCode = null;

                // Cleanup listeners immediately to prevent accidental firings
                sock?.ev?.removeAllListeners();

                if (!shouldReconnect) {
                    console.log("⚠️ Session Invalidated/Logged Out. Cleaning up...");
                    isConnecting = false;
                    if (connectTimeout) clearTimeout(connectTimeout);
                    try {
                        sock?.end();
                    } catch (e) { }
                    sock = null;

                    try {
                        await new Promise(r => setTimeout(r, 800));
                        fs.rmSync("auth_info_baileys", { recursive: true, force: true });
                        console.log("📂 Session files deleted.");
                    } catch (e) {
                        console.error("Failed to delete session files:", e.message);
                    }
                } else {
                    // Auto-reconnect with backoff logic
                    console.log("🔄 Auto-reconnecting in 3s...");
                    isConnecting = false; 
                    if (connectTimeout) clearTimeout(connectTimeout);

                    try {
                        sock?.end();
                    } catch (e) { }
                    sock = null;

                    setTimeout(() => {
                        exports.connectToWhatsApp();
                    }, 3000);
                }
            }

            if (connection === "open") {
                console.log("✅ WhatsApp Connected Successfully!");
                isConnected = true;
                isConnecting = false;
                qrCode = null;
                if (connectTimeout) clearTimeout(connectTimeout);
            }
        });

        sock.ev.on("messages.upsert", async ({ messages }) => {
            const msg = messages[0];
            if (!msg.message || msg.key.fromMe) return;

            const sender = msg.key.remoteJid;
            const userMessage = msg.message.conversation || msg.message.extendedTextMessage?.text || msg.message.imageMessage?.caption || null;

            if (!userMessage) return;

            console.log(`📩 New Message from ${sender}: ${userMessage}`);
            try {
                await engineService.processMessage(sock, sender, userMessage);
            } catch (err) {
                console.error("❌ Engine Error:", err);
            }
        });

        return { status: "initiated" };

    } catch (e) {
        console.error("❌ WhatsApp Connection Failed:", e);
        isConnecting = false;
        if (connectTimeout) clearTimeout(connectTimeout);
        return { error: e.message };
    }
};

exports.getStatus = () => {
    return {
        connected: isConnected,
        connecting: isConnecting,
        qr: qrCode
    };
};

exports.logout = async () => {
    try {
        if (sock) {
            sock.ev.removeAllListeners();
            sock.end(undefined); // Close connection
            sock = null;
        }
    } catch (e) { }

    isConnected = false;
    isConnecting = false;
    qrCode = null;
    if (connectTimeout) clearTimeout(connectTimeout);

    try {
        console.log("⚠️ Manual Logout. Clearing session...");
        await new Promise(r => setTimeout(r, 500));
        fs.rmSync("auth_info_baileys", { recursive: true, force: true });
        return { success: true };
    } catch (e) {
        console.error("Failed to delete session:", e.message);
        return { success: false, error: e.message };
    }
};
