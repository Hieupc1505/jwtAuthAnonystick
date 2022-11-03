const router = require("express").Router();
const userCtrl = require("../controllers/user.controller");
const { verifyAccessToken } = require("../helpers/jwt.helper");

router.route("/login").post(userCtrl.login);
router.route("/register").post(userCtrl.register);
router.route("/refresh-token").post(userCtrl.refreshToken);
router.route("/logout").post(userCtrl.logout);
router.get("/getLists", verifyAccessToken, (req, res, next) => {
    const listUser = [{ email: "email@akjg" }, { email: "eadete@gae.com" }];
    res.status(200).json({
        status: "success",
        elements: listUser,
    });
});

module.exports = router;
