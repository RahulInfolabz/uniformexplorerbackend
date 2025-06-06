const express = require("express");
const cors = require("cors");
const connectDb = require("./Db/connectDb");
const fetchAllProducts = require("./Apis/User/Products/fetchAllProducts");
const insertProducts = require("./Apis/Admin/Products/insertProducts");
const insertProduct = require("./Apis/Admin/Products/insertProduct");
const insertCategories = require("./Apis/Admin/Category/inserCategories");
const fetchAllCategories = require("./Apis/User/Category/fetchAllCategories");
const insertCategory = require("./Apis/Admin/Category/insertCategory");
const fetchProductsByCategory = require("./Apis/User/Category/fetchProductsByCategory");
const fetchProductById = require("./Apis/User/Products/fetchProductsById");
const {
  AddContactInquiry,
} = require("./Apis/User/Products/storeContactInqiry");
const {
  AddProductInquiry,
} = require("./Apis/User/Products/storeProductInquiry");
require("dotenv").config();

// create app
const app = express();
const PORT = process.env.PORT;

// increse the limit of payload
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigins = [
        "http://localhost:3000",
        "http://localhost:3001",
        "http://localhost:5173",
        "http://localhost:5174",
      ];

      if (
        !origin || // allow non-browser requests like curl, Postman
        allowedOrigins.includes(origin) ||
        /https?:\/\/.*\.?onrender\.com$/.test(origin)
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

connectDb();

// user
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Data retrieved successfully.",
    Apis: {
      Products: "https://uniformexplorerbackend.onrender.com/products",
      Categories: "https://uniformexplorerbackend.onrender.com/categories",
    },
  });
});

app.get("/products", fetchAllProducts);
app.get("/categories", fetchAllCategories);
app.get("/category/:category_id", fetchProductsByCategory);
app.get("/products/:product_id", fetchProductById);
app.post("/storeContactInquiry", AddContactInquiry);
app.post("/storeProductInquiry", AddProductInquiry);

// admin
app.post("/insertProducts", insertProducts);
app.post("/insertProduct", insertProduct);
app.post("/insertCategories", insertCategories);
app.post("/insertCategory", insertCategory);

app.listen(PORT, () => {
  console.log(`Server Started on Port ${PORT}!`);
});
