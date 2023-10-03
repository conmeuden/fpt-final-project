/** @format */

const express = require("express");
const router = express.Router();
const upload = require("../config/multer.config");
const { log } = require("../services/discord.logger");

router.post("/single", upload.single("file"), (req, res) => {
  try {
    // Đường dẫn đến tệp đã tải lên
    const filePath = "/uploads/" + req.file.filename;

    // Trả về đường dẫn tệp dưới dạng JSON
    res.json({ filePath });
  } catch (error) {
    log("Lỗi upload single file : " + error);
    res.status(500).json({ message: "Lỗi xử lý tệp tin tải lên" });
  }
});

router.post("/multiple", upload.array("files", 10), (req, res) => {
  try {
    // Đường dẫn đến các tệp đã tải lên (danh sách)
    const filePaths = req.files.map((file) => "/uploads/" + file.filename);

    // Trả về danh sách đường dẫn tệp dưới dạng JSON
    res.json({ filePaths });
  } catch (error) {
    log("Lỗi upload multiple file : " + error);
    res.status(500).json({ message: "Lỗi xử lý tệp tin tải lên" });
  }
});

module.exports = router;
