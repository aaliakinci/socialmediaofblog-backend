
const Comment = require('../Models/Comment');

//function area
const {addCommentToUser,addCommentToArticle} = require('./functionArea')



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
		res.status(200).json(createdComment)
	} catch (error) {
		console.log(error);	
	}
}

module.exports = {
	createComment,
}