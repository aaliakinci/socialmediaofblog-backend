const express = require('express');
const router = express.Router();

//controller
const articleController = require('../controller/articleController')

const upload = require('../middleware/uploadImageArticleMiddileware')


//Get All Article
router.get('/',articleController.getAllArticle)

//Get Follows Article 
router.post('/followsArticle',articleController.followsArticle)

//Get All Sort By ReactionPoint
router.get('/reactionPoint',articleController.getAllArticleSortByReactionPoint)
//Get Articles by Article Id 
router.get('/:article_id',articleController.getArticleByArticle_id)

// router.post('/delete',articleController.deleteArticle)

//Get Articles by User Id 
router.get('/byUser/:user_id',articleController.getArticlesByUser_id)


//Create Article
router.post('/create',upload.single('contentImage'),articleController.createArticle);


module.exports=router;