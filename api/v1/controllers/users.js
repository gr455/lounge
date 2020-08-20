/* This file contains the controller methods for user schema */
const User = require('../models/user');

exports.getUsers = async (req, res, next) => {
	const users = await User.find();
	res.status(200).json(users);
}

exports.createUser = async (req, res, next) => {
	var user = User.create()
}