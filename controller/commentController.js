//Models
const Comment = require('../Models/Comment');



//function area
const {addCommentToUser,addCommentToArticle,mathReactionPoint,removeCommentToArticle,removeCommentToUser} = require('./functionArea')

//mongoose
const mongoose = require('mongoose')

//create comment 
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



//get comments by article id 
const getCommentsByArticleId = async(req,res,next) => {
	try {
		const id = req.params.article_id
		const comments = await Comment.find({article_id:id}).sort({createAt:-1});
		res.status(200).json(comments);
	} catch (error) {
		console.log(error);
	}
}

//delete comment by comment id 
const deleteComment = async(req,res,next) => {
	const {comment_id,article_id,user_id} = req.body;
	try {
		const removedCommentArticle =  await removeCommentToArticle(comment_id,article_id);
		const removedCommentUser = await removeCommentToUser(comment_id,user_id);
		const removedComment = await Comment.findOneAndRemove(comment_id);
		const decrement = await mathReactionPoint(article_id,false);
		res.status(200).json({status:1});
	} catch (error) {
		console.log(error)
	}
}









module.exports = {
	createComment,
	getCommentsByArticleId,
	deleteComment
}