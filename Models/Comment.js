const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
	description:{
		type:String,
		maxlength:150,
		required:true
	},
	createAt:{
		type:Date,
		default:Date.now
	},
	user_id:{
		type:mongoose.Types.ObjectId,
		ref:'User'
	},
	article_id:{
		type:mongoose.Types.ObjectId,
		ref:'Article'
	}
	
})

module.exports=mongoose.model('comment',CommentSchema)