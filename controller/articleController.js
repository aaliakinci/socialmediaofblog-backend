
//Models
const Article = require('../Models/Article');

//functions
const {addArticleToUser} = require('./functionArea');


//Get All Article
const getAllArticle = (req,res,next) => {
const promise = Article.find({})
promise.then((data)=>{
	res.json(data);
}).catch((err)=>{
	console.log(err);
})
}








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
		const importUser = await addArticleToUser(createdArticle._id,user_id)
		res.status(200).json({createdArticle})
	} catch (error) {
		console.log(error);
	}
};

module.exports= {
	createArticle,
	getAllArticle
}