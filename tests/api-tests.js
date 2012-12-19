var apieasy = require('api-easy'),
	assert = require('assert'),
	utils = require('./utils.js');


apieasy.describe('REST API')
	.use('localhost', 3000)
	.followRedirect(false)
	
	.discuss('Collections resource')
	.get('/collections')
		.expect(200)
		.expect('respond with json', utils.assertJSON())
		.expect('{collections: Array}', utils.assertArray('collections'))
		.expect('collection format', function (err, res, body) {
			var bodyObj = JSON.parse(body);
			
			for (var i = 0; i < bodyObj.collections.length; i += 1)
			{
				utils.assertCollection(bodyObj.collections[i]);
			}
		})
	.post('/collections')
		.expect(406)
		.expect('respond with json', utils.assertJSON())
		.expect('has error message', function (err, res, body) {
			var bodyObj = JSON.parse(body);
			
			assert.isString(bodyObj.error);
		})
.export(module);