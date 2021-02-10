const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	surname: {
		type: String,
		required: true,
	},
	username: {
		type: String,
		required: true,
		unique: true,
	},
	phoneNumber: {
		type: String,
		required: true,
		unique: true,
	},
	email: {
		type: String,
		unique: true,
		required: true,
	},
	password: {
		type: String,
		required: true,
		minlength: 8,
	},
	gender: {
		type: String,
		required: true,
	},
	profilPicture: {
		type: String,
	  default: 'defaultProfilePicture.png'
	},
	birthDate: {
		type: Date,
	},
	createAt: {
		type: Date,
		default: Date.now,
	},
	description: {
		type: String,
		maxlength: 40,
	},
	isAdmin: {
		type: Boolean,
		default: false,
	},
	isBanned: {
		type: Boolean,
		default: false,
	},
	follows: [
		{
			type: mongoose.Types.ObjectId,
			ref: 'User',
		},
	],
	followers: [
		{
			type: mongoose.Types.ObjectId,
			ref: 'User',
		},
	],
	articles: [
		{
			type: mongoose.Types.ObjectId,
			ref: 'Article',
		},
	],
	comments: [
		{
			type: mongoose.Types.ObjectId,
			ref: 'Comment',
		},
	],
	likes: [
		{
			type: mongoose.Types.ObjectId,
			ref: 'Like',
		},
	],
});

module.exports = mongoose.model('user', UserSchema);
