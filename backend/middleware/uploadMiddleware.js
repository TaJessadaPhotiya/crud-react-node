const multer = require("multer"); // นำเข้า multer สำหรับจัดการการอัปโหลดไฟล์
const path = require("path"); // นำเข้า path สำหรับจัดการเส้นทางและนามสกุลไฟล์

const upload = multer({
  storage: multer.diskStorage({
    destination: "public/uploads/", // โฟลเดอร์สำหรับจัดเก็บไฟล์ที่อัปโหลด
    filename: (req, file, cb) =>
      cb(null, Date.now() + path.extname(file.originalname)), // ตั้งชื่อไฟล์ด้วย timestamp + นามสกุลไฟล์
  }),
});

module.exports = upload;
