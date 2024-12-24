const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const upload = require('../middleware/uploadMiddleware');

// Route สำหรับสร้างสินค้า
router.post('/', upload.single('image'), productController.createProduct);

// Route สำหรับดึงรายการสินค้า
router.get('/', productController.getProducts);

// Route สำหรับดึงสินค้าตาม ID
router.get('/:id', productController.getProductById);

// Route สำหรับอัพเดทสินค้า
router.put('/:id', upload.single('image'), productController.updateProduct);

// Route สำหรับลบสินค้า
router.delete('/:id', productController.deleteProduct);

module.exports = router;
