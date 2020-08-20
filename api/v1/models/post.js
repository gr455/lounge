/* This file contains the definition of the Post model */

const mongoose = require('mongoose');
const md5 = require('md5');
const crypto = require('crypto');

// regular text/media post
var PostSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	author: { type: String, required: true },
	media: { type: Array, default: [] }

}, { timestamps: true });