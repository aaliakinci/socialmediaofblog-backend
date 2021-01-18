const router = require('express').Router();

const likeController = require('../controller/likeController')


router.post('/create',likeController.createLike);



module.exports=router