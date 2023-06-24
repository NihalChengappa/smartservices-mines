const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
	user: { type: String, required: true },
	pwd: { type: String, required: true },
});

userSchema.methods.generateAuthToken = function () {
	const expirationtime=3600000+Date.now();
	const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
		expiresIn: expirationtime,
	});
	return {token,expiration:expirationtime};
};

const User = mongoose.model("user", userSchema);

const validate = (data) => {
	const schema = Joi.object({
		user: Joi.string().email().required().label("Email"),
		pwd: Joi.string().required().label("Password"),
	});
	return schema.validate(data);
};

module.exports = { User, validate };