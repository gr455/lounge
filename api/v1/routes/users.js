/* This file contains the controllers and corresponding routes for users */

const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
	res.status(200).json({
		message: "Hello buddy",
	});
});

module.exports = router;
