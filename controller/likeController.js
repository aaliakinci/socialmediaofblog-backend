//models
const Like = require('../Models/Like');

//functions
const {addLikeToArticle,addLikeToUser,removeLikeToUser,removeLikeToArticle} = require('./functionArea')


const createLike = async (req, res, next) => {
	try {
		const { user_id, article_id } = req.body;
		const like = new Like({
			user_id,
			article_id,
		});
		const createdLike = await like.save();
		const addLikeArticle = await addLikeToArticle(createdLike._id,article_id);
		const addLikeUser = await addLikeToUser(createdLike._id,user_id);
		res.status(200).json(createdLike);
	} catch (error) {
		console.log(error);
	}
};

const deleteLike = async (req, res, next) => {
	try {
		const { user_id, article_id,like_id} = req.body;
		const removeLikeArticle = await removeLikeToArticle(like_id,article_id);
		const removeLikeUser = await removeLikeToUser(like_id,user_id);
		console.log(removeLikeArticle,removeLikeUser)
		const deletedLike = await Like.findOneAndRemove(like_id);
		res.status(200).json({status:1});
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	createLike,
	deleteLike
};
