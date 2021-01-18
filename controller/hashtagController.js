//Models
const Hashtag = require('../Models/Hashtag');
const Article = require('../Models/Article');



const mongoose = require('mongoose');


const createHashtag = async (req, res, next) => {
	try {
		const { body } = req.body;
		const hashtag = new Hashtag({
			body,
		});
		const createdHashtag = await hashtag.save();
		res.status(200).json(createdHashtag);
	} catch (error) {
		res.json(error)
	}
};

const getArticlesByHashtagId = async (req, res, next) => {
	try {
		const result = await Article.find({ hashtags: req.params.hashtag_id });
		res.status(200).json(result);
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	createHashtag,
	getArticlesByHashtagId
};
