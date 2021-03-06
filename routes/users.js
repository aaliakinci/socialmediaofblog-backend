const express = require('express');
const router = express.Router();




//Controllers
const userController = require('../controller/userController');

//Middlewares
const upload = require('../middleware/uploadImageMiddleware');
const authorizationMiddleware = require('../middleware/authorizationMiddleware');
const adminAuthentication = require('../middleware/adminAuthorizationMiddleware');


//Get All Users 
router.get('/',userController.getAllUser)


router.post('/userFollowers',userController.userFollowers);

router.post('/userFollows',userController.userFollows);

//Get User by UserName
router.get('/:username',userController.getUserByUsername)

/* Register User */
router.post('/register', upload.single('profilPicture'), userController.register);

router.post('/isFollow',userController.isFollow)

/* Login User */
router.post('/login', userController.login);

//Follow
router.post('/follow', userController.follow);

//unFollow 
router.post('/unFollow',userController.unFollow);

//update user
router.post('/update/:user_id',authorizationMiddleware,userController.updateUserByUserId);

router.post('/banUser',adminAuthentication,userController.banUserByUserId);
router.post('/unBanUser',adminAuthentication,userController.unBanUserByUserId);
router.post('/userToAdmin',userController.userToAdmin);
router.post('/adminToUser',userController.adminToUser);



module.exports = router;
