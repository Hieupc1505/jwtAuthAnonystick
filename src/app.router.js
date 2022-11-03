const routeV1 = require("./v1/routes/index.route");
const router = (app) => {
    app.get("/status", (req, res) => {
        res.status(200).json({
            status: "success",
            msg: "server ready!!",
        });
    });
    app.use("/v1/api", routeV1);
};
module.exports = router;
