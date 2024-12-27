// นำเข้าโมดูล multer สำหรับจัดการการอัปโหลดไฟล์ และ path สำหรับจัดการเส้นทางของไฟล์
const multer = require('multer');
const path = require('path');

// การตั้งค่าการจัดเก็บไฟล์สำหรับการอัปโหลด
const storage = multer.diskStorage({
  // กำหนดโฟลเดอร์ปลายทางที่จะเก็บไฟล์อัปโหลด
  destination: (req, file, cb) => {
    // 'public/uploads/' เป็นโฟลเดอร์ที่จะเก็บไฟล์ที่อัปโหลด
    cb(null, 'public/uploads/');
  },
  // กำหนดชื่อไฟล์เมื่อบันทึกลงในโฟลเดอร์
  filename: (req, file, cb) => {
    // ใช้เวลา ณ ตอนนี้ (Date.now()) รวมกับนามสกุลไฟล์เดิม (file.originalname)
    // เพื่อสร้างชื่อไฟล์ที่ไม่ซ้ำกัน
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// สร้างตัวแปร upload โดยใช้ multer พร้อมการตั้งค่าการจัดเก็บ (storage)
const upload = multer({ storage });

// ส่งออกโมดูล upload เพื่อให้ไฟล์อื่นสามารถใช้งานได้
module.exports = upload;
