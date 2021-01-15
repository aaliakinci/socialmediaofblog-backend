const createError = require('http-errors');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

//Models
const User = require('../Models/User');
const Article = require('../Models/Article');
const { json } = require('express');

//Login User Control Function
const findUserForLogin = async (username, password) => {
	const user = await User.findOne({ username });
	if (!user) {
		console.log('kullanıcı bulamadım');
		throw createError(400, 'Girilen kullanıcı adı ya da parola hatalı');
	}
	const checkPassword = bcrypt.compare(password, user.password);
	if (!checkPassword) {
		throw createError(400, 'Girilen email/şifre hatalı');
	}
	return user;
};

//Login Create JsonWebToken
const createToken = async (user) => {
	const token = await jwt.sign(
		{ _id: user._id, username: user.username, isAdmin: user.isAdmin, isEditor: user.isEditor },
		process.env.JWT_SECRET_KEY,
		{ expiresIn: '2d' },
	);
	return token;
};

//createdArticle Add To User
const addArticleToUser = async (article_id, user_id) => {
	try {
		const user = User.findByIdAndUpdate(user_id, { $push: { articles: article_id } },{new:true});
		return user
	} catch (error) {
		console.log(error);
	}
};


module.exports = {
	findUserForLogin,
	createToken,
	addArticleToUser,
};
