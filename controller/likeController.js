//models
const Like = require('../Models/Like');
const Article = require('../Models/Article');

//mongoose
const mongoose = require('mongoose')

//functions
const {addLikeToArticle,addLikeToUser,removeLikeToUser,removeLikeToArticle} = require('./functionArea')

const getLikesByArticleId = async (req,res,next) => {
try {
	const id = req.params.article_id
	const likes = await Like.find({article_id:id});
	res.json(likes);
} catch (error) {
	res.json(error);
}
}

const isLike = async(req,res,next) => {
	try {
		const {user_id,article_id}=req.body
		const likes = await Like.find({user_id,article_id});
		console.log(likes);
		res.json(likes);
	} catch (error) {
		res.json(error);
	}
}

const getArticlesByUserId = async (req,res,next) => {
 try {
	const articles = await Like.aggregate([
		{
			$match:{
				user_id:mongoose.Types.ObjectId(req.params.user_id)
			}
		},
		{
			$lookup:{
				from:'articles',
				localField:'article_id',
				foreignField:'_id',
				as:'articles'
			}
		},
		{
			$unwind:{
				path:'$articles'
			}
		},
		{
			$group:{
				_id:{
					_id:'$_id',
					user_id:'$user_id'
				},
				article:{
					$push:'$articles'
				}
			}
		},
		{
			$project:{
				_id:'$_id._id',
				article:'$article'
			}
		}
	])
	res.status(200).json(articles);
 } catch (error) {
	 console.log(error)
 }
}



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
	deleteLike,
	getArticlesByUserId,
	getLikesByArticleId,
	isLike
};
