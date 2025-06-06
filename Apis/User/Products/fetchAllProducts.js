const connectDb = require("../../../Db/connectDb");

async function fetchAllProducts(req, res) {
  try {
    // get database
    const db = await connectDb();

    // get collection
    const collection = db.collection("products");

    // write here query
    const products = await collection.find().toArray();

    if (products.length > 0) {
      console.log("Data Found!");
      res.status(200).json({
        success: true,
        message: "Data retrieved successfully.",
        products,
      });
    } else {
      res.status(404).json({
        success: false,
        error: "Requested resource not found.",
        message: "No data found for the given criteria.",
      });
    }
  } catch (e) {
    res.status(500).json({
      success: false,
      error: "An unexpected error occurred on the server.",
      message: "Internal Server Error. Please try again later.",
    });
  }
}

module.exports = fetchAllProducts;
