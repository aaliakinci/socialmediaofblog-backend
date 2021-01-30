const User = require('../Models/User');
const bcrypt = require('bcryptjs');
const { findUserForLogin, createToken } = require('./functionArea');
const createError = require('http-errors');

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
	console.log(req.file.path);
	bcrypt.hash(password, 8, (err, hash) => {
		const user = new User({
			name,
			surname,
			username,
			phoneNumber,
			email,
			password: hash,
			gender,
			profilPicture: 'http://167.99.132.119:4000/'+ req.file.path,
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
		const { username, password } = req.body;
		const user = await findUserForLogin(username, password);
		if (user.isBanned === true) {
			throw createError(403, 'Hesabınız askıya alınmıştır lütfen iletişime geçiniz.');
		}
		const token = await createToken(user);
		res.status(200).json({ user, token });
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
		console.log(error);
	}
};
// Ban User
const banUserByUserId = async (req, res, next) => {
	try {
		const { user_id } = req.body;
		const banUser = await User.findByIdAndUpdate(user_id, { isBanned: true }, { new: true });
		res.status(200).json(banUser);
	} catch (error) {
		console.log(error);
	}
};
// Ban User
const unBanUserByUserId = async (req, res, next) => {
	try {
		const { user_id } = req.body;
		const banUser = await User.findByIdAndUpdate(user_id, { isBanned: false }, { new: true });
		res.status(200).json(banUser);
	} catch (error) {
		console.log(error);
	}
};
// upgrade  User To Admin
const userToAdmin = async (req, res, next) => {
	try {
		const { user_id } = req.body;
		const userToAdmin = await User.findByIdAndUpdate(user_id, { isAdmin: true }, { new: true });
		res.status(200).json(userToAdmin);
	} catch (error) {
		console.log(error);
	}
};
// upgrade  Admin To User
const adminToUser = async (req, res, next) => {
	try {
		const { user_id } = req.body;
		const adminToUser = await User.findByIdAndUpdate(user_id, { isAdmin: false }, { new: true });
		res.status(200).json(adminToUser);
	} catch (error) {
		console.log(error);
	}
};

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
		console.log(error);
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
		console.log(error);
	}
};

module.exports = {
	register,
	login,
	follow,
	unFollow,
	updateUserByUserId,
	banUserByUserId,
	unBanUserByUserId,
	adminToUser,
	userToAdmin
};
