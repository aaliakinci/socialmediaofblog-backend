const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
	title:{
		type:String,
		maxlength:50,
		required:true
	},
	description:{
		type:String,
		required:true
	},
	content:{
		type:String,
		required:true
	},
	contentImage:{
		type:String,
	},
	createAt:{
		type:Date,
		default:Date.now
	},
	reactionPoint:{
		type:Number,
		default:0
	},
	hashtag:{
		type:mongoose.Types.ObjectId,
		ref:'hashtags'
	},
	user_id:{
		type:mongoose.Types.ObjectId,
		ref:'users'
	},
	comments:{
		type:mongoose.Types.ObjectId,
		ref:'comments'
	},
	likes:{
		type:mongoose.Types.ObjectId,
		ref:'likes'
	}
})
module.exports=mongoose.model('article',ArticleSchema)