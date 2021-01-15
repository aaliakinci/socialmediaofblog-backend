const User = require('../Models/User');
const bcrypt = require('bcryptjs');




//User Register Controller
const register = (req, res, next) => {
	const {
		name,
		surname,
		username,
		phoneNumber,
		email,
		password,
		gender,
		profilPicture,
		birtDate,
	} = req.body;
	bcrypt.hash(password, 8, (err, hash) => {
		const user = new User({
			name,
			surname,
			username,
			phoneNumber,
			email,
			password: hash,
			gender,
			profilPicture: process.env.POST_URL + req.file.path,
			birtDate,
		});
		const promise = user.save();
		promise
			.then((data) => {
				res.json(data);
			})
			.catch((err) => {
				res.json(err);
			});
	});
};


//User Login Controller 
const login = (req,res,next) =>{
	const {username,password} = req.body
	


} 





module.exports = {
	register,
};
