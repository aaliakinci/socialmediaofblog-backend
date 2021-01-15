const User = require('../Models/User');
const bcrypt = require('bcryptjs');
const { findUserForLogin,createToken } = require('./functionArea');

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
				res.status(200).json(data);
			})
			.catch((err) => {
				res.json(err);
			});
	});
};

//User Login Controller
const login = async (req, res, next) => {
	try {
		const {username,password} = req.body
		const user = await findUserForLogin(username, password);
		const token = await createToken(user);
		res.status(200).json({user,token});
	} catch (error) {
		console.log(error);
	}
};

//User Follow Controller (follow a to b)
const follow = async(req,res,next) => {
try {
	const {user_id_a,user_id_b} = req.body;
	const user_a =  await User.findByIdAndUpdate(user_id_a,{$push:{follows:user_id_b}},{new:true});
	const user_b =  await User.findByIdAndUpdate(user_id_b,{$push:{followers:user_id_a}},{new:true});
	res.status(200).json({user_a,user_b})
} catch (error) {
	console.log(error);
}
}

//User unFollow Controller (unFollow a to b )
const unFollow = async(req,res,next) => {
	try {
		const {user_id_a,user_id_b} = req.body
		const user_a = await User.findByIdAndUpdate(user_id_a,{$pull:{follows:user_id_b}},{new:true});
		const user_b = await User.findByIdAndUpdate(user_id_b,{$pull:{followers:user_id_a}},{new:true});
		res.status(200).json({user_a,user_b});
	} catch (error) {
		console.log(error)
	}
}

module.exports = {
	register,
	login,
	follow,
	unFollow
};
