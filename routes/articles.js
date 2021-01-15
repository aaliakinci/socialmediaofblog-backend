const express = require('express');
const router = express.Router();

//controller
const articleController = require('../controller/articleController')



//Get All Article
router.get('/',articleController.getAllArticle)






//Create Article
router.post('/create',articleController.createArticle);


module.exports=router;