const express = require('express');
const router = express.Router();




//Controllers
const userController = require('../controller/userController');

//Middlewares
const upload = require('../middleware/uploadImageMiddleware');
const authorizationMiddleware = require('../middleware/authorizationMiddleware');
const adminAuthentication = require('../middleware/adminAuthorizationMiddleware');

/* Register User */
router.post('/register', upload.single('profilPicture'), userController.register);

/* Login User */
router.post('/login', userController.login);

//Follow
router.post('/follow', userController.follow);

//unFollow 
router.post('/unFollow',userController.unFollow);

//update user
router.put('/:user_id',authorizationMiddleware,userController.updateUserByUserId)

router.post('/banUser',userController.banUserByUserId)
router.post('/unBanUser',userController.unBanUserByUserId)



module.exports = router;
