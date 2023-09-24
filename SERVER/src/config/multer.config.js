const multer = require("multer");
const path = require("path");

// Cấu hình thư mục lưu trữ và tên tệp
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "public/uploads");
  },
  filename: (req, file, callback) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    callback(null, uniqueSuffix + path.extname(file.originalname));
  },
});

// Kiểm tra loại tệp được chấp nhận
const fileFilter = (req, file, callback) => {
  const allowedFileTypes = /jpeg|jpg|png|gif/;
  const extname = allowedFileTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedFileTypes.test(file.mimetype);

  if (extname && mimetype) {
    return callback(null, true);
  } else {
    return callback(
      new Error("Chỉ chấp nhận tệp ảnh có định dạng: jpeg, jpg, png, gif")
    );
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

module.exports = upload;
