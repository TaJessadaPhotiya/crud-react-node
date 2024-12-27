// นำเข้าโมดูล Product จากไฟล์ models/Product
const Product = require("../models/Product");
const fs = require("fs");
const path = require("path");

// สร้างสินค้าใหม่
exports.createProduct = async (req, res) => {
  try {
    // ดึงข้อมูล name, description, และ price จาก body ของคำขอ
    const { name, description, price } = req.body;

    // หากมีไฟล์อัปโหลดมากับคำขอ จะดึงชื่อไฟล์มาใช้; ถ้าไม่มี ให้ตั้งค่าเป็น null
    const image = req.file ? req.file.filename : null;

    // สร้างสินค้าใหม่ในฐานข้อมูลโดยใช้ข้อมูลที่ได้รับจากคำขอ
    const newProduct = await Product.create({
      name,
      description,
      price,
      image,
    });

    // ส่งข้อมูลสินค้าใหม่กลับไปยังผู้ใช้งาน พร้อมสถานะ 201 (สร้างสำเร็จ)
    res.status(201).json(newProduct);
  } catch (error) {
    // หากเกิดข้อผิดพลาด ส่งข้อความแสดงข้อผิดพลาดกลับไป พร้อมสถานะ 500
    res.status(500).json({ message: "Error creating product", error });
  }
};

// อ่านรายการสินค้าทั้งหมด
exports.getProducts = async (req, res) => {
  try {
    // ดึงรายการสินค้าทั้งหมดจากฐานข้อมูล
    const products = await Product.findAll();

    // ส่งรายการสินค้ากลับไปยังผู้ใช้งาน
    res.json(products);
  } catch (error) {
    // หากเกิดข้อผิดพลาด ส่งข้อความแสดงข้อผิดพลาดกลับไป พร้อมสถานะ 500
    res.status(500).json({ message: "Error fetching products", error });
  }
};

// อ่านสินค้าตาม ID
exports.getProductById = async (req, res) => {
  try {
    // ค้นหาสินค้าในฐานข้อมูลโดยใช้ ID ที่ส่งมากับคำขอ
    const product = await Product.findByPk(req.params.id);

    // หากไม่พบสินค้า ส่งข้อความ "ไม่พบสินค้า" พร้อมสถานะ 404
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // หากพบสินค้า ส่งข้อมูลสินค้ากลับไปยังผู้ใช้งาน
    res.json(product);
  } catch (error) {
    // หากเกิดข้อผิดพลาด ส่งข้อความแสดงข้อผิดพลาดกลับไป พร้อมสถานะ 500
    res.status(500).json({ message: "Error fetching product", error });
  }
};

// อัปเดตข้อมูลสินค้า
exports.updateProduct = async (req, res) => {
  try {
    // ดึงข้อมูล name, description, และ price จาก body ของคำขอ
    const { name, description, price } = req.body;

    // หากมีไฟล์อัปโหลดมากับคำขอ จะดึงชื่อไฟล์มาใช้; ถ้าไม่มี ให้ตั้งค่าเป็น null
    const image = req.file ? req.file.filename : null;

    // ค้นหาสินค้าในฐานข้อมูลโดยใช้ ID ที่ส่งมากับคำขอ
    const product = await Product.findByPk(req.params.id);

    // หากไม่พบสินค้า ส่งข้อความ "ไม่พบสินค้า" พร้อมสถานะ 404
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // ลบไฟล์รูปภาพเก่าหากมีการอัปเดตไฟล์ใหม่
    if (image && product.image) {
      const oldImagePath = path.join(__dirname, "../public/uploads/", product.image);
      fs.existsSync(oldImagePath) && fs.unlinkSync(oldImagePath);
    }

    // อัปเดตข้อมูลสินค้า โดยใช้ค่าที่ส่งมา หรือค่าสินค้าเดิมหากไม่มีการส่งมา
    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.image = image || product.image;

    // บันทึกการเปลี่ยนแปลงลงฐานข้อมูล
    await product.save();

    // ส่งข้อมูลสินค้าที่อัปเดตกลับไปยังผู้ใช้งาน
    res.json(product);
  } catch (error) {
    // หากเกิดข้อผิดพลาด ส่งข้อความแสดงข้อผิดพลาดกลับไป พร้อมสถานะ 500
    res.status(500).json({ message: "Error updating product", error });
  }
};

// ลบสินค้า
exports.deleteProduct = async (req, res) => {
  try {
    // ค้นหาสินค้าในฐานข้อมูลโดยใช้ ID ที่ส่งมากับคำขอ
    const product = await Product.findByPk(req.params.id);

    // หากไม่พบสินค้า ส่งข้อความ "ไม่พบสินค้า" พร้อมสถานะ 404
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // ตรวจสอบว่ามีไฟล์รูปภาพที่เกี่ยวข้องหรือไม่
    const imagePath = path.join(__dirname, "../public/uploads/", product.image);
    fs.existsSync(imagePath) && fs.unlinkSync(imagePath);

    // ลบสินค้าจากฐานข้อมูล
    await product.destroy();

    // ส่งข้อความยืนยันการลบกลับไปยังผู้ใช้งาน
    res.json({ message: "Product and image deleted" });
  } catch (error) {
    // หากเกิดข้อผิดพลาด ส่งข้อความแสดงข้อผิดพลาดกลับไป พร้อมสถานะ 500
    res.status(500).json({ message: "Error deleting product", error });
  }
};
