const createError = require('http-errors');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

//Models
const User = require('../Models/User');
const Article = require('../Models/Article');
const Hashtag = require('../Models/Hashtag');

const { json } = require('express');

//----------------------USER FUNCTİONS -------------------------
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
	if(user.isBanned===true) throw createError(400,'Hesabınız askıya alınmıştır ! Lütfen iletişime geçiniz')
	const token = await jwt.sign(
		{ _id: user._id, username: user.username, isAdmin: user.isAdmin, isEditor: user.isEditor,isBanned:user.isBanned },
		process.env.JWT_SECRET_KEY,
		{ expiresIn: '2d' },
	);
	return token;
};
//createdArticle Add To User
const addArticleToUser = async (article_id, user_id) => {
	try {
		const user = await User.findByIdAndUpdate(
			user_id,
			{ $push: { articles: article_id } },
			{ new: true },
		);
		return user;
	} catch (error) {
		console.log(error);
	}
};
//createComment Add To User
const addCommentToUser = async (comment_id, user_id) => {
	try {
		const user = await User.findByIdAndUpdate(
			user_id,
			{ $push: { comments: comment_id } },
			{ new: true },
		);
		return user;
	} catch (error) {
		console.log(error);
	}
};
//Remove Comment To User
const removeCommentToUser = async (comment_id, user_id) => {
	try {
		const user = await User.findByIdAndUpdate(
			user_id,
			{ $pull: { comments: comment_id } },
			{ new: true },
		);
		return user;
	} catch (error) {
		console.log(error);
	}
};
//createLike Add To User
const addLikeToUser = async (like_id, user_id) => {
	try {
		const user = await User.findByIdAndUpdate(
			user_id,
			{ $push: { likes: like_id } },
			{ new: true },
		);
		return user;
	} catch (error) {
		console.log(error);
	}
};
//Remove Comment To User
const removeLikeToUser = async (like_id, user_id) => {
	try {
		const user = await User.findByIdAndUpdate(
			user_id,
			{ $pull: { likes: like_id } },
			{ new: true },
		);
		return user;
	} catch (error) {
		console.log(error);
	}
};

//----------------------------Article Function-----------------------------------------
//Comment Add To Article
const addCommentToArticle = async (comment_id, article_id) => {
	try {
		const article = await Article.findByIdAndUpdate(
			article_id,
			{ $push: { comments: comment_id } },
			{ new: true },
		);
		return article;
	} catch (error) {
		console.log(error);
	}
};
//Comment Remove To Article
const removeCommentToArticle = async (comment_id, article_id) => {
	try {
		const article = await Article.findByIdAndUpdate(
			article_id,
			{ $pull: { comments: comment_id } },
			{ new: true },
		);
		return article;
	} catch (error) {
		console.log(error);
	}
};
// Like Add To Article
const addLikeToArticle = async (like_id, article_id) => {
	try {
		const article = await Article.findByIdAndUpdate(
			article_id,
			{ $push: { likes: like_id } },
			{ new: true },
		);
		return article;
	} catch (error) {
		console.log(error);
	}
};
const removeLikeToArticle = async (like_id, article_id) => {
	try {
		const article = await Article.findByIdAndUpdate(
			article_id,
			{ $pull: { likes: like_id } },
			{ new: true },
		);
		return article;
	} catch (error) {
		console.log(error);
	}
};
//Article increment-decrement reactionPoint (need send boolean true or false increment(true) or decrement(false))
const mathReactionPoint = async (article_id, which) => {
	const { reactionPoint } = await Article.findById(article_id);
	if (which) {
		const updatedArticleReactionPoint = await Article.findByIdAndUpdate(article_id, {
			reactionPoint: reactionPoint + 1,
		});
		return updatedArticleReactionPoint;
	} else {
		const updatedArticleReactionPoint = await Article.findByIdAndUpdate(article_id, {
			reactionPoint: reactionPoint - 1,
		});
		return updatedArticleReactionPoint;
	}
};

// Add Article To Hashtags
const addArticleToHashtags = async (hashtag_id, article_id) => {
	try {
		const hashtag = await Hashtag.findByIdAndUpdate(
			hashtag_id,
			{ $push: { articles: article_id } },
			{ new: true },
		);
		return json(hashtag);
	} catch (error) {
		console.log(error)
	}
};

module.exports = {
	findUserForLogin,
	createToken,
	addArticleToUser,
	addCommentToUser,
	addCommentToArticle,
	mathReactionPoint,
	removeCommentToUser,
	removeCommentToArticle,
	addLikeToArticle,
	addLikeToUser,
	removeLikeToUser,
	removeLikeToArticle,
	addArticleToHashtags
};
