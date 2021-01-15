const express = require('express');
const router = express.Router();

//controller
const articleController = require('../controller/articleController')



//Get All Article
router.get('/',articleController.getAllArticle)

//Get All Sort By ReactionPoint
router.get('/reactionPoint',articleController.getAllArticleSortByReactionPoint)





//Create Article
router.post('/create',articleController.createArticle);


module.exports=router;