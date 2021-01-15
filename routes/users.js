const express = require('express');
const router = express.Router();


//Controllers
const userController = require('../controller/userController');



//Middlewares
const upload = require('../middleware/uploadImageMiddleware');




/* Register User */
router.post('/register',upload.single('profilPicture'), userController.register);

/* Login User */
router.post('/login',userController.login)





module.exports = router;
