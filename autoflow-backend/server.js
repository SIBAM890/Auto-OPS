require('dotenv').config();
const app = require('./src/app');
const whatsappService = require('./src/services/whatsapp.service');

const PORT = process.env.PORT || 3000;

// Start Server
app.listen(PORT, async () => {
    console.log(`🚀 Server running on port ${PORT}`);

    // Connect to WhatsApp after server starts
    // try {
    //     console.log("📱 Connecting to WhatsApp...");
    //     await whatsappService.connectToWhatsApp();
    // } catch (err) {
    //     console.error("❌ WhatsApp Connection Failed:", err);
    // }
});