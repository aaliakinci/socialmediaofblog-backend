//Models
const Hashtag = require('../Models/Hashtag');

const createHashtag = async (req, res, next) => {
	try {
		const { body } = req.body;
		const hashtag = new Hashtag({
			body,
		});
		const createdHashtag = await hashtag.save();
		res.status(200).json(createdHashtag);
	} catch (error) {
		console.log(error);
	}
};

module.exports={
	createHashtag,
}
