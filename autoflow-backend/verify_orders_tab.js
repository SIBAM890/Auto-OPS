const { google } = require('googleapis');
const path = require('path');
require('dotenv').config();

const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;
const CREDENTIALS_PATH = process.env.GOOGLE_APPLICATION_CREDENTIALS || './credentials.json';

const auth = new google.auth.GoogleAuth({
    keyFile: path.resolve(CREDENTIALS_PATH),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });

async function verifySheets() {
    try {
        console.log("🔍 Checking spreadsheet metadata...");
        const response = await sheets.spreadsheets.get({
            spreadsheetId: SPREADSHEET_ID,
        });

        const sheetNames = response.data.sheets.map(s => s.properties.title);
        console.log("📂 Found Sheets:", sheetNames);

        if (sheetNames.includes('Orders')) {
            console.log("✅ 'Orders' tab exists.");
        } else {
            console.error("❌ 'Orders' tab is MISSING!");
        }

    } catch (error) {
        console.error("❌ Error fetching metadata:", error.message);
    }
}

verifySheets();
