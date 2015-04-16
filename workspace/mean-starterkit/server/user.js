/*jslint node: true */
'use strict';

/**
 * User object that acts as a library for all
 * user related actions. Some functions are private
 * others are exposed to the controller
 */
(function(User) {
    require('./user/account')(User);

    User.getUser = getUser;

    function getUser(id, callback) {
        console.log('Utility function: returning to return user');
    }
}(exports));