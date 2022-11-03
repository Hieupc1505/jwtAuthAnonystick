require("dotenv").config();
const mongoose = require("mongoose");

function newConnection(uri) {
    const conn = mongoose.createConnection(uri, {
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
    // process.on("SIGINT", async () => {
    //     await conn.close();
    //     process.exit();
    // });
    return conn;
}

const _userConnect = newConnection(process.env.LINK_DB);

module.exports = {
    _userConnect,
};
