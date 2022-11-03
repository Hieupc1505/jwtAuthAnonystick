require("dotenv").config();
const express = require("express");
const router = require("./src/app.router");
const createError = require("http-errors");
const app = express();
// require("./src/config/redis.config");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// require("./src/config/mongo.config.js");

router(app);

app.use("/", (req, res, next) => {
    next(createError.NotFound("Page is not found!!!"));
});

app.use("/", (err, req, res, next) => {
    res.status(err.status || 500).json({
        status: "Fail",
        msg: err.message || "Internal Server Error!!",
    });
});

const PORT = process.env.PORT || 8500;
app.listen(PORT, () => {
    console.log("server running at:::", PORT);
});
