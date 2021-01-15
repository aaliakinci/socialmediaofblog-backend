//Models
const { json } = require('express');
const mongoose = require('mongoose');
const Article = require('../Models/Article');
const User = require('../Models/User');

//functions
const { addArticleToUser } = require('./functionArea');

//Get All Article
const getAllArticle = (req, res, next) => {
	const promise = Article.find({});
	promise
		.then((data) => {
			res.json(data);
		})
		.catch((err) => {
			console.log(err);
		});
};

//Get All Article Sort By ReactionPoint
const getAllArticleSortByReactionPoint = (req, res, next) => {
	const promise = Article.aggregate([
		{
			$lookup: {
				from: 'users',
				localField: 'user_id',
				foreignField: '_id',
				as: 'user',
			},
		},
		{
			$unwind: {
				path: '$user',
			},
		},
		{
			$group: {
				_id: {
					_id: '$_id',
					title: '$title',
					description: '$description',
					createAt: '$createAt',
				},
				user: {
					$push: '$user',
				},
			},
		},
		{
			$project: {
				_id: '$_id._id',
				title: '$_id.title',
				description: '$_id.description',
				createAt: '$_id.createAt',
				user: '$user',
			},
		},
		{
			$sort: {
				reactionPoint: -1,
				createAt: -1,
			},
		},
	]);
	promise
		.then((data) => {
			res.status(200).json(data);
		})
		.catch((err) => {
			res.json(err);
		});
};

//Get Articles by user_id
const getArticlesByUser_id = async(req,res,next) => {
	const id = req.params.user_id;
 
	const promise = Article.aggregate([
		{
			$match:{
				user_id:mongoose.Types.ObjectId(id)
			}
		},
		{
			$lookup: {
				from: 'users',
				localField: 'user_id',
				foreignField: '_id',
				as: 'user',
			},
		},
		{
			$unwind: {
				path: '$user',
			},
		},
		{
			$group: {
				_id: {
					_id: '$_id',
					title: '$title',
					description: '$description',
					createAt: '$createAt',
				},
				user: {
					$push: '$user',
				},
			},
		},
		{
			$project: {
				_id: '$_id._id',
				title: '$_id.title',
				description: '$_id.description',
				createAt: '$_id.createAt',
				user: '$user',
			},
		},
		{
			$sort: {
				createAt: -1,
			},
		},
	]);
	promise.then((data)=>{
	 res.status(200).json(data);
	}).catch((err)=>{
		console.log(err);
	})
}


//Get Article by Article id 
const getArticleByArticle_id = (req,res,next) => {
	const id = req.params.article_id;
 
	const promise = Article.aggregate([
		{
			$match:{
				_id:mongoose.Types.ObjectId(id)
			}
		},
		{
			$lookup: {
				from: 'users',
				localField: 'user_id',
				foreignField: '_id',
				as: 'user',
			},
		},
		{
			$unwind: {
				path: '$user',
			},
		},
		{
			$lookup:{
				from:'comments',
				localField:'comments',
				foreignField:'_id',
				as:'comments'
			}
		},
		{
			$unwind:{
				path:'$comments',
				preserveNullAndEmptyArrays:true
			}
		},
		{
			$group:{
				_id: {
					_id: '$_id',
					title: '$title',
					description: '$description',
					createAt: '$createAt',
				},
				user:{
					$push:'$user'
				},
				comments:{
					$push:'$comments'
				
				}
			}
		},
		{
			$project: {
				_id: '$_id._id',
				title: '$_id.title',
				description: '$_id.description',
				createAt: '$_id.createAt',
				user: '$user',
				comments:'$comments'
			},
		}
	]);
	promise.then((data)=>{
	 res.status(200).json(data);
	}).catch((err)=>{
		console.log(err);
	})
}





//Get All follows Article sort by lastTime
const followsArticle = async (req, res, next) => {
	
	try {
		const { user_id } = req.body;
		const user = await User.findById(user_id);
	  // const output = user.follows.map((item) => {
		//  const promise = Article.find({ user_id: item });
   	// 	 promise.then((data)=>{
		//  }).catch((err)=>{
		// 	 console.log(err);
		//  })
		// }) 
	} catch (error) {
		console.log(error);
	}
};







//Create Article
const createArticle = async (req, res, next) => {
	try {
		const { title, description, content, user_id, hashtags } = req.body;
		const article = new Article({
			title,
			description,
			content,
			user_id,
			hashtags,
		});
		const createdArticle = await article.save();
		const importUser = await addArticleToUser(createdArticle._id, user_id);
		res.status(200).json({ createdArticle });
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	createArticle,
	getAllArticle,
	getAllArticleSortByReactionPoint,
	followsArticle,
	getArticlesByUser_id,
	getArticleByArticle_id
};
