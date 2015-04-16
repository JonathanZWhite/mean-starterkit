/*jslint node: true */
'use strict';

/**
 * Dependencies
 */
var secrets = require('./config/secrets');
var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var app = express();

/**
 * Express configuration
 */
app.set('port', secrets.port);

// Controllers
var userController = require('./controllers/user');

// DB connection
var db = mongoose.connect(secrets.db, function(err) {
	if (err) {
		console.error('Could not establish connection with MongoDB' + err);
	}
});

// API routes
var router = express.Router();

// Assets
app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(express.static(path.join(__dirname, '../client/dist/assets')));
app.use(express.static(path.join(__dirname, '../client/user'))); // Exposes upload folder - refactor nameing

// CORS
router.all('*', function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'X-Requested-With, Authorization, Content-Type, Username, Password');
	next();
});

router.put('/api/user/update', userController.update);
router.get('/*', function(req, res) {
	res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});


// Server
app.use('/', router);

app.listen(app.get('port'), function() {
	console.log('Express listening to port', app.get('port'));
});

module.exports = app;
