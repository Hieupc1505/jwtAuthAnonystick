const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { _userConnect } = require("../../config/mongo.muti.config");
const bcrypt = require("bcrypt");
const userSchema = new Schema({
    username: {
        type: String,
        lowercase: true,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

userSchema.pre("save", async function (next) {
    try {
        // console.log(`Called before save:::`, this.email, this.password);
        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(this.password, salt);
        this.password = hashPass;
        next();
    } catch (err) {
        next(err);
    }
});
userSchema.methods.isCheckPassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (err) {
        return new Error("Internal Server Error");
    }
};
module.exports = _userConnect.model("users", userSchema);
// module.exports = {
//     userModel: _userConnect.model("users", userSchema),
//     // testModel : _testConnect.model("test", testSchema)
// };
