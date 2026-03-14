const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');
const { parse } = require('csv-parse/sync');

exports.parseFile = async (filePath, mimetype) => {
    try {
        let textContext = "";
        const fileExt = path.extname(filePath).toLowerCase();

        if (fileExt === '.csv' || mimetype === 'text/csv') {
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            const records = parse(fileContent, {
                columns: true,
                skip_empty_lines: true,
                to: 50 // Limit rows to avoid token overflow
            });
            textContext = JSON.stringify(records, null, 2);
        }
        else if (['.xlsx', '.xls'].includes(fileExt)) {
            const workbook = xlsx.readFile(filePath);
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const data = xlsx.utils.sheet_to_json(sheet, { header: 1, range: 0, raw: false });

            // Log first 50 rows
            const limitedData = data.slice(0, 50);
            textContext = JSON.stringify(limitedData, null, 2);
        } else {
            throw new Error("Unsupported file type. Please upload .csv or .xlsx");
        }

        // Cleanup: Delete file after parsing to save space
        try {
            fs.unlinkSync(filePath);
        } catch (e) {
            console.error("Failed to delete temp file:", e);
        }

        return `User Uploaded File Context (Inventory/Data):\n${textContext}\n`;

    } catch (error) {
        console.error("File Parsing Error:", error);
        throw new Error("Failed to parse file: " + error.message);
    }
};
