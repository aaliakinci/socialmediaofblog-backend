const mongoose = require('mongoose');

module.exports = () =>{
	mongoose.connect('mongodb://localhost:27017/socialofblog',{useNewUrlParser: true, useUnifiedTopology: true});
	mongoose.connection.on('open',()=>{
			console.log('MongoDB Connected')
	});
	mongoose.connection.on('error',(err)=>{
			console.log('MongoDB Not Connected'+err)
	});
	mongoose.Promise = global.Promise;
	};