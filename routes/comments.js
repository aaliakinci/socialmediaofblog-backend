const router = require('express').Router();
const commentController = require('../controller/commentController')


//Create comment
router.post('/create',commentController.createComment);

//Get Comments by Article id
router.get('/:article_id',commentController.getCommentsByArticleId);


module.exports=router;