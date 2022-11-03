require("dotenv").config();
const JWT = require("jsonwebtoken");
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;
const createError = require("http-errors");
const signAccessToken = async (userId) => {
    return new Promise((res, rej) => {
        const payload = {
            userId,
        };
        const secret = ACCESS_TOKEN_SECRET;
        const options = {
            expiresIn: "1h",
        };
        JWT.sign(payload, secret, options, (err, token) => {
            if (err) rej(err);
            res(token);
        });
    });
};
const signRefreshToken = async (userId) => {
    return new Promise((res, rej) => {
        const payload = {
            userId,
        };
        const secret = ACCESS_TOKEN_SECRET;
        const options = {
            expiresIn: "10d",
        };
        JWT.sign(payload, secret, options, (err, token) => {
            if (err) rej(err);
            res(token);
        });
    });
};
const verifyAccessToken = (req, res, next) => {
    if (!req.headers["authorization"]) {
        return next(createError.Unauthorized());
    }
    const authHeader = req.headers["authorization"];
    const token = authHeader.split(" ")[1];

    JWT.verify(token, ACCESS_TOKEN_SECRET, (err, payload) => {
        if (err) {
            return next(createError.Unauthorized("verify accesstoken"));
        }
        req.payload = payload;
        next();
    });
};
const verifyRefreshToken = (req, res, next) => {
    if (!req.headers["authorization"]) {
        return next(createError.Unauthorized());
    }
    const authHeader = req.headers["authorization"];
    const token = authHeader.split(" ")[1];

    JWT.verify(token, ACCESS_TOKEN_SECRET, (err, payload) => {
        if (err) {
            return next(createError.Unauthorized("verify accesstoken"));
        }
        req.payload = payload;
        next();
    });
};
module.exports = {
    signAccessToken,
    verifyAccessToken,
    signRefreshToken,
    verifyRefreshToken,
};
