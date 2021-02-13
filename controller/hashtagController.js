//Models
const Hashtag = require('../Models/Hashtag');
const Article = require('../Models/Article');

const mongoose = require('mongoose');

const getHashtags = async (req,res,next) => {
	try {
		const hashtags = await Hashtag.find({});
		res.json(hashtags);
	} catch (error) {
		res.json(error);
	}
};

const createHashtag = async (req, res, next) => {
	try {
		const { body } = req.body;
		const hashtag = new Hashtag({
			body,
		});
		const createdHashtag = await hashtag.save();
		res.status(200).json(createdHashtag);
	} catch (error) {
		res.json(error);
	}
};

const getArticlesByHashtagId = async (req, res, next) => {
	const id= req.params.hashtag_id
	try {
		const result = await Hashtag.aggregate([
			{
				$match: {
					_id: mongoose.Types.ObjectId(id),
				},
			},
			{
				$lookup: {
					from: 'articles',
					localField: 'articles',
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
					_id: {
						_id: '$_id',
						body: '$body',
					},
					articles: {
						$push: '$articles',
					},
				},
			},
			{
				$project: {
					_id:0,
					articles: '$articles',
				},
			},
			{
				$sort: {
					createAt: -1,
				},
			},
		]);
		res.status(200).json(result);
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	getHashtags,
	createHashtag,
	getArticlesByHashtagId,
};
