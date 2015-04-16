/*jslint node: true */
'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: String,
    password: String
});

module.exports = mongoose.model('UserModel', UserSchema);