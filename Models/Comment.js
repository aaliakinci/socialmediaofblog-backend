const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
	description:{
		type:string,
		maxlength:150,
		required:true
	},
	createAt:{
		type:Date,
		default:Date.now
	},
	user_id:{
		type:mongoose.Types.ObjectId,
		ref:'users'
	},
	article_id:{
		type:mongoose.Types.ObjectId,
		ref:'articles'
	}
	
})

module.exports=mongoose.model('comment',CommentSchema)