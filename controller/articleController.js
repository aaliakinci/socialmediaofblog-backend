//Models
const { json } = require('express');
const mongoose = require('mongoose');
const Article = require('../Models/Article');
const User = require('../Models/User');

//functions
const { addArticleToUser, addArticleToHashtags } = require('./functionArea');

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
const getArticlesByUser_id = async (req, res, next) => {
	const id = req.params.user_id;

	const promise = Article.aggregate([
		{
			$match: {
				user_id: mongoose.Types.ObjectId(id),
			},
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
	promise
		.then((data) => {
			res.status(200).json(data);
		})
		.catch((err) => {
			res.json(err);
		});
};

//Get Article by Article id
const getArticleByArticle_id = (req, res, next) => {
	const id = req.params.article_id;

	const promise = Article.aggregate([
		{
			$match: {
				_id: mongoose.Types.ObjectId(id),
			},
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
			$lookup: {
				from: 'comments',
				localField: 'comments',
				foreignField: '_id',
				as: 'comments',
			},
		},
		{
			$unwind: {
				path: '$comments',
				preserveNullAndEmptyArrays: true,
			},
		},
		{
			$group: {
				_id: {
					_id: '$_id',
					title: '$title',
					description: '$description',
					content:'$content',
					createAt: '$createAt',
				},
				user: {
					$push: '$user',
				},
				comments: {
					$push: '$comments',
				},
			},
		},
		{
			$project: {
				_id: '$_id._id',
				title: '$_id.title',
				description: '$_id.description',
				content:'$_id.content',
				createAt: '$_id.createAt',
				user: '$user',
				comments: '$comments',
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

//Get All follows Article sort by lastTime
const followsArticle = async (req, res, next) => {
	try {
		const { user_id } = req.body;
		const userFollows = await User.aggregate([
			{
				$match: {
					_id: mongoose.Types.ObjectId(user_id),
				},
			},
			{
				$lookup: {
					from: 'users',
					localField: 'follows',
					foreignField: '_id',
					as: 'follows',
				},
			},
			{
				$unwind: {
					path: '$follows',
				},
			},
			{
				$lookup: {
					from: 'articles',
					localField: 'follows.articles',
					foreignField: '_id',
					as: 'articles',
				},
			},
			{
				$unwind: {
					path: '$articles',
				},
			},
			{
				$group: {
					_id: { _id: '$_id' },
					articles: {
						$push: '$articles',
					},
				},
			},
			{
				$project: {
					_id: '$_id._id',
					articles: '$articles',
				},
			},
		]);
		//Need Sort
		res.json(userFollows[0].articles);
	} catch (error) {
		res.json(error);
	}
};

//Create Article
const createArticle = async (req, res, next) => {
	try {
		const { title, description, content, user_id, hashtags, contentImage } = req.body;
		const article = new Article({
			title,
			description,
			content,
			user_id,
			hashtags,
			contentImage: 'http://167.99.132.119:4000/' + req.file.path,
		});
		console.log(contentImage);
		const createdArticle = await article.save();
		const importUser = await addArticleToUser(createdArticle._id, user_id);
		createdArticle.hashtags.forEach(async (element) => {
			await addArticleToHashtags(element, createdArticle._id);
		});
		res.status(200).json({ createdArticle });
	} catch (error) {
		res.json(error);
	}
};

module.exports = {
	createArticle,
	getAllArticle,
	getAllArticleSortByReactionPoint,
	followsArticle,
	getArticlesByUser_id,
	getArticleByArticle_id,
};
