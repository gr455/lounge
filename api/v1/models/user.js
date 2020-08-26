/* This file contains the definition of the User model */

const mongoose = require('mongoose');
const md5 = require('md5');
const crypto = require('crypto');

var UserSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	login: { type: String, unique: true, required: true },
	pass_hash: { type: String, required: true },
	pass_salt: String,
	email: { type: String, unique: true, required: true, match: [ /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Invalid email" ]},
	image: String,
	bio: String
}, { timestamps: true });

UserSchema.statics.authenticate = async (login, password) => {
	try{
		const user = await User.findOne({login: login}).exec();
		if(user && user.pass_hash === md5(password + user.pass_salt)){
			return user
		}
		else return null;
	} catch(error){
		console.error(err);
		return null;
	}
}

UserSchema.statics.findLoginByEmail = async(email) => {
	try{
		const user = await User.findOne({email: email});
		if(user){
			return user.login;
		}
		else{
			return "";
		}
	} catch(err){

	}
}

UserSchema.statics.createUser = async (login, password, email, image, bio) => {
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


	try{
		const done = await user.save();
		return done;
	} catch(err){
		throw err;
	}
}


UserSchema.methods.destroy = async () => {
	const user = await User.findById(this.id).exec();
	await user.delete();
}

// 'user' deletes 'this'
UserSchema.methods.canDelete = async(user) => {
	return this.id === user.id;
}

var User = mongoose.model('User', UserSchema);
module.exports = User;