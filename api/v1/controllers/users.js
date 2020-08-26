/* This file contains the controller methods for user schema */

const User = require('../models/user');
const mongoose = require('mongoose');
const app = require('../../../app');
const ERR = app.ERR

exports.getUsers = async (req, res, next) => {
	try{
		const users = await User.find();
		res.status(200).json(users);
	} catch(err){
		res.status(500).json({error: ERR.ise});
	}
}

exports.createUser = async (req, res, next) => {
	console.log(next);
	const data = req.body;
	try{
		const user = await User.createUser(data.login, data.password, data.email, data.imageUrl, data.bio);
		res.status(200).json(user);
	} catch(err){
		console.error(err);
		res.status(500).json({error: ERR.ise});
	}
}

exports.getUser = async(req, res, next) => {
	const id = req.params.id;
	try{
		const user = await User.findOne({_id: id});
		if(user) res.status(200).json(user);
		else res.status(ERR.not_found.status).json({error: ERR.not_found});
	} catch(err){
		console.error(err);
		res.status(500).json({error: ERR.ise});
	}
}

exports.login = async(req, res, next) => {
	var login = "";
	try{
		if(!req.body.login) login = await User.findLoginByEmail(req.body.email);
		else login = req.body.login;
		const auth = await User.authenticate(login, req.body.password);
		if(auth){
			res.status(200).json(auth);
			// TODO: cookies
		}
		else{
			res.status(401).json({error: ERR.auth_fail});
		}
	} catch(err){
		console.error(err);
		res.status(500).json({error: ERR.ise});
	}
}
