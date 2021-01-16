const express = require('express');
const router = express.Router();

//controller
const articleController = require('../controller/articleController')



//Get All Article
router.get('/',articleController.getAllArticle)

//Get Follows Article 
router.get('/followsArticle',articleController.followsArticle)

//Get All Sort By ReactionPoint
router.get('/reactionPoint',articleController.getAllArticleSortByReactionPoint)
//Get Articles by Article Id 
router.get('/:article_id',articleController.getArticleByArticle_id)



//Get Articles by User Id 
router.get('/byUser/:user_id',articleController.getArticlesByUser_id)


//Create Article
router.post('/create',articleController.createArticle);


module.exports=router;