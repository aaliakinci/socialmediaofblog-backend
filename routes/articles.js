const express = require('express');
const router = express.Router();

//controller
const articleController = require('../controller/articleController')



//Get All Article
router.get('/',articleController.getAllArticle)

//Get All Sort By ReactionPoint
router.get('/reactionPoint',articleController.getAllArticleSortByReactionPoint)

//Get Follows Article 
router.get('/followsArticle',articleController.followsArticle)

//Get Articles by User Id 
router.get('/:user_id',articleController.getArticlesByUser_id)

//Create Article
router.post('/create',articleController.createArticle);


module.exports=router;