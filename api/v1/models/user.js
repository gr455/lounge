/* This file contains the definition of the User model */

const mongoose = require('mongoose');
const md5 = require('md5');
const crypto = require('crypto');

var UserSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	login: { type: String, unique: true, required: true },
	pass_hash: { type: String, required: true },
	pass_salt: String,
	email: { type: String, unique: true, required: true },
	image: String,
	bio: String
}, { timestamps: true });

var User = mongoose.model('User', UserSchema);

UserSchema.statics.authenticate = async (login, password) => {
	try{
		const user = await User.findOne({login: login}).exec();
		console.log(user);
		if(user) return user.pass_hash === md5(password + user.pass_salt);
		else return false;
	} catch(error){
		return false;
	}
}


UserSchema.statics.create = async (login, password, email, image, bio) => {
	const salt = crypto.randomBytes(16).toString('hex');
	var user = new User({
		_id: new mongoose.Types.ObjectId(),
		login: login,
		pass_hash: md5(password + salt),
		pass_salt: salt,
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


UserSchema.methods.destroy = async () => {
	const user = await User.findById(this.id).exec();
	await user.delete();
}

// 'user' deletes 'this'
UserSchema.methods.canDelete = async(user) => {
	return this.id === user.id;
}

User = mongoose.model('User', UserSchema);

module.exports = User;