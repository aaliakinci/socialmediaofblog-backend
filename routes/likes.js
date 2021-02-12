const router = require('express').Router();

const likeController = require('../controller/likeController')

router.get('/user/:user_id',likeController.getArticlesByUserId)


router.post('/isLike',likeController.isLike)


router.get('/:article_id',likeController.getLikesByArticleId)

router.post('/create',likeController.createLike);


router.delete('/delete',likeController.deleteLike);



module.exports=router