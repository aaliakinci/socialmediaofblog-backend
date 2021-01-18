const router = require('express').Router();

const hashtagController =require('../controller/hashtagController');

router.post('/create',hashtagController.createHashtag)

router.get('/:hashtag_id',hashtagController.getArticlesByHashtagId)


module.exports=router