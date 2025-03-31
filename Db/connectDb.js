const MongodbClient = require("mongodb").MongoClient;
require("dotenv").config();

async function connectDb() {
  const connectionUrl = process.env.MONGODB_URL;

  try {
    const client = await MongodbClient.connect(connectionUrl);
    return client.db();
  } catch (e) {
    console.log("Db Connection Falid", e.message);
  }
}

module.exports = connectDb;
