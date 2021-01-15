const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LikeSchema = new Schema({
	user_id:{
		type:mongoose.Types.ObjectId,
		ref:'User',
		require:true
	},
	article_id:{
		type:mongoose.Types.ObjectId,
		ref:'Article',
		require:true
	}
})
module.exports=mongoose.model('like',LikeSchema)