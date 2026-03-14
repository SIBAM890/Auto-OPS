const { google } = require('googleapis');
const path = require('path');
require('dotenv').config();

const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;
const CREDENTIALS_PATH = process.env.GOOGLE_APPLICATION_CREDENTIALS || './credentials.json';

// Initialize Auth
const auth = new google.auth.GoogleAuth({
    keyFile: path.resolve(CREDENTIALS_PATH),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });

/**
 * Sync Inventory from "Inventory" tab
 * Expected columns: ID, Product Name, Stock, Price
 */
exports.syncInventory = async () => {
    try {
        console.log('📊 Google Sheets: Syncing Inventory...');
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: SPREADSHEET_ID,
            range: 'Inventory!A2:D', // Skip header
        });

        const rows = response.data.values;
        if (!rows || rows.length === 0) {
            console.log('⚠️ No data found in Inventory sheet.');
            return [];
        }

        // Map rows to objects
        const inventory = rows.map(row => ({
            id: row[0],
            product: row[1], // Changed 'name' to 'product' to match Engine expectations
            stock: parseInt(row[2] || '0', 10),
            price: parseFloat(row[3] || '0.00')
        }));

        console.log(`✅ Synced ${inventory.length} items from Google Sheets.`);
        return inventory;

    } catch (error) {
        console.error('❌ Google Sheet Sync Error:', error.message);
        return [];
    }
};

/**
 * Get formatted list of all products
 */
exports.getAllProducts = async () => {
    const inventory = await exports.syncInventory();
    if (inventory.length === 0) return "No products available currently.";

    return inventory.map(p => `- ${p.product} (₹${p.price})`).join("\n");
};

/**
 * Lookup a single product by name
 */
exports.lookupProduct = async (query) => {
    const inventory = await exports.syncInventory();
    const item = inventory.find(p =>
        p.product.toLowerCase().includes(query.toLowerCase())
    );

    if (item) {
        return { found: true, ...item };
    }
    return { found: false };
};

/**
 * Log Order to "Orders" tab
 * Columns: Order ID, Customer, Items, Total, Status, Date
 */
exports.logOrder = async (orderData) => {
    try {
        const { orderId, customer, items, total, status } = orderData;
        const timestamp = new Date().toISOString();

        await sheets.spreadsheets.values.append({
            spreadsheetId: SPREADSHEET_ID,
            range: 'Order!A:F',
            valueInputOption: 'USER_ENTERED',
            resource: {
                values: [
                    [orderId, customer, items, total, status, timestamp]
                ]
            }
        });

        console.log(`📝 Order logged to Google Sheets: ${orderId}`);
        return true;

    } catch (error) {
        console.error('❌ Google Sheet Log Error:', error.message);
        return false;
    }
};
