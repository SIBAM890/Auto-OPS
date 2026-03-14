const multer = require('multer');
const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');

// Configure Multer for local storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, '../../uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

exports.uploadFile = [
    upload.single('file'),
    (req, res) => {
        try {
            if (!req.file) {
                return res.status(400).json({ error: "No file uploaded" });
            }

            const filePath = req.file.path;
            const fileExt = path.extname(req.file.originalname).toLowerCase();
            let data = [];

            // Parse Excel or CSV
            if (fileExt === '.xlsx' || fileExt === '.xls' || fileExt === '.csv') {
                const workbook = xlsx.readFile(filePath);
                const sheetName = workbook.SheetNames[0]; // Read first sheet
                const sheet = workbook.Sheets[sheetName];
                data = xlsx.utils.sheet_to_json(sheet);
            }

            // Get columns for AI context
            const columns = data.length > 0 ? Object.keys(data[0]) : [];
            const preview = data.slice(0, 5); // Send first 5 rows as sample

            res.json({
                filename: req.file.filename,
                originalName: req.file.originalname,
                columns: columns, // Vital for AI to know "Stock", "Price" etc. exists
                rowCount: data.length,
                preview: preview,
                message: `Successfully analyzed ${req.file.originalname}. Found columns: ${columns.join(', ')}`
            });

        } catch (error) {
            console.error("Upload Error:", error);
            res.status(500).json({ error: "Failed to process file" });
        }
    }
];
