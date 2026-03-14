const { google } = require('googleapis');
const path = require('path');
require('dotenv').config();

const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;
const CREDENTIALS_PATH = process.env.GOOGLE_APPLICATION_CREDENTIALS || './credentials.json';

async function testConnection() {
    console.log("🔍 Testing Google Sheets Connection...");
    console.log(`📄 Spreadsheet ID: ${SPREADSHEET_ID || "MISSING"}`);
    console.log(`🔑 Credentials Path: ${CREDENTIALS_PATH}`);

    if (!SPREADSHEET_ID || SPREADSHEET_ID.includes("YOUR_SHEET_ID")) {
        console.error("❌ ERROR: GOOGLE_SHEET_ID is not set in .env");
        process.exit(1);
    }

    try {
        const auth = new google.auth.GoogleAuth({
            keyFile: path.resolve(CREDENTIALS_PATH),
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });

        const sheets = google.sheets({ version: 'v4', auth });

        // Try reading "Inventory" range (just headers to be safe)
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: SPREADSHEET_ID,
            range: 'Inventory!A1:D1',
        });

        console.log("✅ Success! Connected to Sheet.");
        console.log("📋 Headers found:", response.data.values ? response.data.values[0] : "None (Empty Sheet)");

    } catch (error) {
        console.error("❌ Connection Failed:");
        if (error.code === 'ENOENT') {
            console.error(`   File not found: ${CREDENTIALS_PATH}`);
            console.error("   Please make sure 'credentials.json' needs to be in the backend folder.");
        } else {
            console.error(`   ${error.message}`);
        }
    }
}

testConnection();
