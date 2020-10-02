/* This file contains the definition of the Post model */

const mongoose = require('mongoose');
const md5 = require('md5');
const crypto = require('crypto');

// regular text/media post
const PostSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	author: { type: String, required: true },
	body: { type: String, required: true },
	media: { type: Array, default: [] }
}, { timestamps: true });

PostSchema.statics.createPost = async (author,body,media) => {
	let postdata = { author, body };
	if(media && media.length > 0) postdata.media = media;
	const post = new Post(postdata);
	try{
		const done = await post.save();
		return done;
	} catch(err){ 
		throw(err);
	}
};

PostSchema.statics.updatePost = async (_id, body, media) => {
	let updates = {};
	if(body) updates.body = body;
	if(media && media.length > 0) updates.media = media;
	try{
		let { n } = await Post.updateOne({ _id }, updates);
		// n refers to the number of documents matched (which should be 1 in this case)
		return n !== 0;
	} catch(err){
		throw(err);
	}
}

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;
