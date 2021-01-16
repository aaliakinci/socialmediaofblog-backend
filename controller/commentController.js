//Models
const Comment = require('../Models/Comment');



//function area
const {addCommentToUser,addCommentToArticle,mathReactionPoint} = require('./functionArea')

//mongoose
const mongoose = require('mongoose')

const createComment = async(req,res,next) => {
	try {
		const {user_id,article_id,description} = req.body
		const comment = new Comment({
			user_id,
			article_id,
			description
		});
		const createdComment = await comment.save()
		const importUser = await addCommentToUser(createdComment._id,user_id);
		const importArticle = await addCommentToArticle(createdComment._id,article_id);
		const updatedArticle = await mathReactionPoint(article_id,true);
		res.status(200).json(createdComment)
	} catch (error) {
		console.log(error);	
	}
}
const getCommentsByArticleId = async(req,res,next) => {
	try {
		const id = req.params.article_id
		const comments = await Comment.find({article_id:id}).sort({createAt:-1});
		res.status(200).json(comments);
	} catch (error) {
		console.log(error);
	}
}










module.exports = {
	createComment,
	getCommentsByArticleId
}