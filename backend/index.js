const express = require("express");
const cors = require("cors");
const productRoutes = require("./routes/productRoutes");
const sequelize = require("./config/db");
const app = express();

// app.use(cors());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173", "http://localhost:5174"],
  })
);
app.use(express.json());
app.use(express.static("public"));

app.use("/api/products", productRoutes);

sequelize.sync().then(() => {
  console.log("Database synced");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
