const userModel = require("../models/user.Model");
const createError = require("http-errors");
const { userValidate } = require("../helpers/validation.helper");
const { signAccessToken, verifyAccessToken, signRefreshToken } = require("../helpers/jwt.helper");
class userCtrl {
    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const { error } = userValidate(req.body);
            if (error) {
                throw next(
                    createError.BadRequest(
                        error.details[0].message || "Email or password is not correct!!"
                    )
                );
            }
            const user = await userModel.findOne({ username: email });
            if (!user || !password) {
                throw createError.Conflict("Email or password is not correct!!");
            }
            const isValid = await user.isCheckPassword(password);
            if (!isValid) {
                throw createError.Conflict("Email or password is not correct!!");
            }
            const accessToken = await signAccessToken(user._id);
            const refreshToken = await signRefreshToken(user._id);
            res.status(200).json({
                status: "sucess",
                elements: {
                    accessToken,
                    refreshToken,
                },
            });
        } catch (err) {
            next(err);
        }
    }
    async register(req, res, next) {
        try {
            const { email, password } = req.body;
            const { error } = userValidate(req.body);
            if (error) {
                throw next(
                    createError.BadRequest(
                        error.details[0].message || "Email or password is not correct!!"
                    )
                );
            }
            if (!email || !password) throw createError.BadRequest();
            const isExist = await userModel.findOne({ username: email });
            if (isExist) throw createError.Conflict(`${email} is existed!!!`);
            const user = new userModel({
                username: email,
                password,
            });
            const saveUser = await user.save();
            res.json({
                status: "success",
                elements: saveUser,
            });
        } catch (err) {
            next(err);
        }
    }
    async refreshToken(req, res, next) {
        res.send("refresh page!!");
    }
    async logout(req, res, next) {
        res.send("logout page!!");
    }
}

module.exports = new userCtrl();
