var assert = require('assert');


/**
 * Assert JSON response.
 * 
 * @returns Function.
 */
function assertJSON () {
	return function (err, res, body) {
		assert.equal(res.headers['content-type'], 'application/json');
	};
}


function assertArray (name) {
	return function (err, res, body) {
		var bodyObj = JSON.parse(body);
		
		assert.isArray(bodyObj[name]);
	};
}


/**
 * Validate a collection.
 * 
 * @param Collection collection.
 */
function assertCollection (collection) {
	assert.lengthOf(collection, 4);
	assert.isString(collection.id);
	assert.isString(collection.name);
	assert.isString(collection.author);
	assert.isString(collection.created_on);
}


/**
 * Exports.
 */
exports.assertJSON = assertJSON;
exports.assertCollection = assertCollection;
exports.assertArray = assertArray;