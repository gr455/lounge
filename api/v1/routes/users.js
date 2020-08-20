/* This file contains the controllers and corresponding routes for users */

const express = require('express');
const router = express.Router();
const UserController =  require('../controllers/users');

router.get('/', UserController.getUsers);
router.post('/', UserController.createUser);

module.exports = router;
