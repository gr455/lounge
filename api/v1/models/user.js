/* This file contains the definition of the User model */

const mongoose = require('mongoose');
const md5 = require('md5');
const crypto = require('crypto');

const UserSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	login: { type: String, unique: true, required: true},
	pass_hash: String,
	pass_salt: String,
	email: { type: String, unique: true, required: true},
	image: String,
	bio: String
}, {timestamps: true})

const User = mongoose.model('User', UserSchema);

function authenticate(login, password){

	const user = User.find({login: login})
	.exec()
	.then(result => {
		if(user) return user.pass_hash === md5(password + salt);
		else return false;
	})
	.catch(error => {
		return false;
	});
}

async function create(login, password, email, image, bio){
	const salt = crypto.randomBytes(16);
	var user = new User({
		_id: new mongoose.Types.ObjectId(),
		login: login,
		pass_hash: md5(password + salt),
		salt: salt,
		email: email,
		image: image,
		bio: bio
	});

	return new Promise((resolve, reject) => {
		user.save()
		.then(result => {
			resolve(result);
		})
		.catch(error => {
			reject(error);
		})
	})
}

async function destroy(id){
	const user = await User.findById(id).exec();
	await user.delete();
}


module.exports = User;