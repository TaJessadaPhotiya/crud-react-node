const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const sequelize = require('./config/db');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('public/uploads')); 
app.use('/api/products', productRoutes);

sequelize.sync().then(() => {
  console.log('Database synced');
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
