/* Main app settings file for lounge */

const express = require('express');
const mongoose = require('mongoose');

// middleware

const parser = require('./api/v1/middleware/parser')

const app = express();
const router = express.Router();
const io = require('socket.io')(app)

//connection to mongodb

mongoose.set('useCreateIndex', true);
mongoose.connect(
	process.env.MONGODB_LOUNGE,

	{ 
		useNewUrlParser: true, useUnifiedTopology: true }
	);


// middleware config

app.use(parser.bodyParser.urlencoded({ extended: false }));
app.use(parser.bodyParser.json());

exports.ERR = {
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
	auth_fail: {
		message: "Incorrect username or password",
		status: 401
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
app.get('/message',(req,res) =>{
	let details = req.body 
	let msg = details.message
	let uid = details.user_id
	let rec_detail = {
		message: msg,
	}

	io.emit('message',rec_detail)

	//need a function to add messages to database
})
app.use((req, res, next) => {
	res.status(404).json({error: {message: "Not found",
		status: 404} })
});

io.on('connection',socket=>{
	console.log('Connected')
})
module.exports = app;
// module.exports.ERR = ERR;
