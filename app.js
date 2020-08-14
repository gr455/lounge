/* Main app settings file for lounge */

const express = require('express');
const parser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const router = express.Router();

//connection to mongodb
mongoose.connect(
	process.env.MONGODB_LOUNGE,

	{ 
		useNewUrlParser: true, useUnifiedTopology: true }
	);

const ERR = {
	not_found: {
		message: "Not found",
		status: 404
	},

	unauth: {
		message: "Unauthorized",
		status: 401
	},

	ise: {
		message: "Something went wrong",
		status: 500
	},

}
const api_routes_path = "./api/v1/routes/";
const models_path = "./api/v1/models/";



/* configuring routes for api */

//users
const routes_users = require(api_routes_path + 'users');
app.use('/api/users', routes_users);

/* importing api models */

//users

const UserModel = require(models_path + 'user');

app.get('/api', (req, res) => {
	res.json({
		message: "Lounge API endpoint"
	});
});

app.use((req, res, next) => {
	res.status(ERR['not_found'].status);
	const error = new Error(ERR['not_found'].message)
	res.json({
		error: {
			message: error.message,
			details: ""
		}
	});

});

module.exports = app;

