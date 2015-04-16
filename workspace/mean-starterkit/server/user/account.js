module.exports = function(User) {
    User.update = update;

    function update(callback) {
        return callback({
            status: true,
            message: 'User account has been updated'
        });
    }
};