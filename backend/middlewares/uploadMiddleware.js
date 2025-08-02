const multer = require('multer');
const path = require('path');

// Set storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // folder name
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// Allowed file extensions
const allowedTypes = /jpeg|jpg|png|gif|pdf|doc|docx/;

// File filter
const fileFilter = (req, file, cb) => {
  const ext = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mime = allowedTypes.test(file.mimetype.toLowerCase());
  
  if (ext && mime) {
    cb(null, true);
  } else {
    cb(
      new Error(
        'Only image files (jpeg, jpg, png, gif) and document files (pdf, doc, docx) are allowed'
      )
    );
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB max
});

module.exports = upload;
