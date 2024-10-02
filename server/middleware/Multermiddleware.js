import multer from 'multer';
import path from 'path';
import fs from 'fs';
// Create uploads directory if it doesn't exist
const dir = './upload/';
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

// Set storage engine for Multer
const storage = multer.diskStorage({
  destination: dir,  // Temporary storage directory
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

// Initialize Multer upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // 1MB file size limit
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
}).single('Imageurl');  // Accept a single file with the name imageurl

// File type validation
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Please upload image in jpeg,jpg,png,pdf format only');
  }
}

export default upload;
