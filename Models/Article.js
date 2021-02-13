const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
	title: {
		type: String,
		maxlength: 50,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	content: {
		type: String,
		required: true,
	},
	contentImage: {
		type: String,
	},
	createAt: {
		type: Date,
		default: Date.now,
	},
	reactionPoint: {
		type: Number,
		default: 0,
	},
	hashtags: [
		{
			type: mongoose.Types.ObjectId,
			ref: 'Hashtag',
		},
	],
	user_id: {
		type: mongoose.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	comments: {
		type: mongoose.Types.ObjectId,
		ref: 'Comment',
	},
	likes: [
		{
			type: mongoose.Types.ObjectId,
			ref: 'Like',
		},
	],
});
module.exports = mongoose.model('article', ArticleSchema);
