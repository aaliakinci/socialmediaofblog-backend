const router = require('express').Router();
const commentController = require('../controller/commentController')


//Create comment
router.post('/create',commentController.createComment);

//Delete comment
router.post('/delete',commentController.deleteComment);


//Get Comments by Article id
router.get('/:article_id',commentController.getCommentsByArticleId);




module.exports=router;