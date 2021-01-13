const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HashtagSchema = new Schema({
	body:{
		type:String,
		maxlength:20,
		require:true,
	},
	usePoint:{
		type:Number,
		default:0
	},
	article_id:{
		type:mongoose.Types.ObjectId,
		ref:'articles',
		require:true
	}
})