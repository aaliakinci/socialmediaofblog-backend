const router = require('express').Router();
const commentController = require('../controller/commentController')


//Create comment
router.post('/create',commentController.createComment);




module.exports=router;