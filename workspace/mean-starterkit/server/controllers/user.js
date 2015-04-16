/*jslint node: true */
'use strict';

/**
 * Module dependencies.
 */
var userLib = require('../user');

var userController = {};

userController.update = update;

function update(req, res) {
    console.log('Updating user...');
    userLib.update(function(resp) {
        return res.json(resp);
    });
}

module.exports = userController;