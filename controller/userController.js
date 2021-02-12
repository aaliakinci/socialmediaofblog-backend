const User = require('../Models/User');
const bcrypt = require('bcryptjs');
const { findUserForLogin, createToken } = require('./functionArea');
const createError = require('http-errors');



//Get All User 
const getAllUser = async (req,res,next) => {
	try {
		const users = await User.find({})
		res.json(users)
	} catch (error) {
		res.json(error);
	}
}


//User Register Controller
const register = async (req, res, next) => {
	try {
		const {
			name,
			surname,
			username,
			phoneNumber,
			email,
			password,
			gender,
			profilPicture,
		} = req.body;
		bcrypt.hash(password, 8, async (err, hash) => {
			try {
				const user = new User({
					name,
					surname,
					username,
					phoneNumber,
					email,
					password: hash,
					gender,
					profilPicture:'http://167.99.132.119:4000/' + req.file.path
				});
				const createdUser = await user.save();
				const token = await createToken(createdUser);
				res.status(200).json({ token });
			} catch (err) {
				res.json(err);
			}
		});
	} catch (error) {
		res.json({ message: error.message });
	}
};
//Get User by Username
const getUserByUsername = async (req, res, next) => {
	try {
		const username = req.params.username;
		const user = await User.find({ username });
		res.json(user);
	} catch (error) {
		res.json(error);
	}
};

//User Login Controller
const login = async (req, res, next) => {
	try {
		const { username, password } = req.body;
		const user = await findUserForLogin(username, password);
		if (user.isBanned === true) {
			throw createError(403, 'Hesabınız askıya alınmıştır lütfen iletişime geçiniz.');
		}
		const token = await createToken(user);
		res.status(200).json({ token });
	} catch (error) {
		res.json(error);
	}
};
//User Update Controller
const updateUserByUserId = async (req, res, next) => {
	try {
		const user_id = req.params.user_id;
		if (req.user._id === user_id) {
			const updatedUser = await User.findByIdAndUpdate(user_id, req.body, { new: true });
			res.status(200).json(updatedUser);
		}
		console.log('yanlış');
	} catch (error) {
		res.json(error);
	}
};
// Ban User
const banUserByUserId = async (req, res, next) => {
	try {
		const { user_id } = req.body;
		const banUser = await User.findByIdAndUpdate(user_id, { isBanned: true }, { new: true });
		res.status(200).json(banUser);
	} catch (error) {
		res.json(error);
	}
};
// Ban User
const unBanUserByUserId = async (req, res, next) => {
	try {
		const { user_id } = req.body;
		const banUser = await User.findByIdAndUpdate(user_id, { isBanned: false }, { new: true });
		res.status(200).json(banUser);
	} catch (error) {
		res.json(error);
	}
};
// upgrade  User To Admin
const userToAdmin = async (req, res, next) => {
	try {
		const { user_id } = req.body;
		const userToAdmin = await User.findByIdAndUpdate(user_id, { isAdmin: true }, { new: true });
		res.status(200).json(userToAdmin);
	} catch (error) {
		res.json(error);
	}
};
// upgrade  Admin To User
const adminToUser = async (req, res, next) => {
	try {
		const { user_id } = req.body;
		const adminToUser = await User.findByIdAndUpdate(user_id, { isAdmin: false }, { new: true });
		res.status(200).json(adminToUser);
	} catch (error) {
		res.json(error);
	}
};

const isFollow = async (req,res,next) => {
	 try {
		const {cookie_user_id,user_id}=req.body
	  const user=await User.findById(cookie_user_id);
		const isFollowing=user.follows.indexOf(user_id);
		//isFollowwing is true ===0 , isFolowwing is false ===-1
		res.json(isFollowing)
	 } catch (error) {
		 console.log(error);
	 }
}



//User Follow Controller (follow a to b)
const follow = async (req, res, next) => {
	try {
		const { user_id_a, user_id_b } = req.body;
		const user_a = await User.findByIdAndUpdate(
			user_id_a,
			{ $push: { follows: user_id_b } },
			{ new: true },
		);
		const user_b = await User.findByIdAndUpdate(
			user_id_b,
			{ $push: { followers: user_id_a } },
			{ new: true },
		);
		res.status(200).json({ user_a, user_b });
	} catch (error) {
		res.json(error);
	}
};

//User unFollow Controller (unFollow a to b )
const unFollow = async (req, res, next) => {
	try {
		const { user_id_a, user_id_b } = req.body;
		const user_a = await User.findByIdAndUpdate(
			user_id_a,
			{ $pull: { follows: user_id_b } },
			{ new: true },
		);
		const user_b = await User.findByIdAndUpdate(
			user_id_b,
			{ $pull: { followers: user_id_a } },
			{ new: true },
		);
		res.status(200).json({ user_a, user_b });
	} catch (error) {
		res.json(error);
	}
};

module.exports = {
	getAllUser,
	register,
	login,
	follow,
	unFollow,
	updateUserByUserId,
	banUserByUserId,
	unBanUserByUserId,
	adminToUser,
	userToAdmin,
	getUserByUsername,
	isFollow
};
