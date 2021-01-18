const router = require('express').Router();

const likeController = require('../controller/likeController')


router.post('/create',likeController.createLike);

router.delete('/delete',likeController.deleteLike);

module.exports=router