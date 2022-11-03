require("dotenv").config();
const mongoose = require("mongoose");

const conn = mongoose.createConnection(process.env.LINK_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
conn.on("connected", function () {
    console.log("MongoDB::: connected:::", this.name);
});
conn.on("disconnected", function () {
    console.log("Mongodb::: disconnected:::", this.name);
});
conn.on("error", function () {
    console.log("Mongodb::: error:::", JSON.stringify(error));
});
process.on("SIGINT", async () => {
    await conn.close();
    process.exit();
});
module.exports = conn;
