
//Models
const mongoose = require('mongoose');
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

//Get All Article Sort By ReactionPoint
const getAllArticleSortByReactionPoint = (req,res,next) => {
	const promise =Article.aggregate([
		{
			$lookup:{
				from:'users',
				localField:'user_id',
				foreignField:'_id',
				as:'user'
			}
		},
		{
			$unwind:{
				path:'$user'
			}
		},
		{
			$group:{
				_id:{
					_id:'$_id',
					title:'$title',
					description:'$description',
					createAt:'$createAt',
				},
				user:{
					$push:'$user'
				}
			}
		},
		{
			$project:{
				_id:'$_id._id',
				title:'$_id.title',
				description:'$_id.description',
				createAt:'$_id.createAt',
				user:'$user'
			}
		},
		{
			$sort:{
				reactionPoint:-1,
				createAt:-1
			}
		}
	]);
	promise.then((data)=>{
		res.status(200).json(data)
	}).catch((err)=>{
		res.json(err);
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
	getAllArticle,
	getAllArticleSortByReactionPoint
}