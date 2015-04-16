/**
 * IMPORTANT DO NOT COMMIT || IMPORTANT DO NOT COMMIT
 *
 * Do not commit this to git - this is only here
 * as an example
 *
 * Add this to .gitignore and git rm -rf config/secrets.js
 *
 * Store your API keys here
 */

module.exports = {
	db: process.env.MONGODB || 'mongodb://localhost:27017/mean',
	port: process.env.port || 9001
};