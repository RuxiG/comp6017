var apieasy = require('api-easy'),
	assert = require('assert'),
	utils = require('./utils.js');


apieasy.describe('REST API for /collections/')
	.use('localhost', 3000)
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
	.post('/collections', {name: 'test collection', author: 'test author'})
		.expect(201)
		.expect('respond with json', utils.assertJSON())
//		.expect('created collection', function (err, res, body) {
//			var bodyObj = JSON.parse(body);
//			
//			utils.assertCollection(bodyObj.collection);
//			console.log(res);
////			assert.equal(bodyObj.collection.name, 'test collection');
////			assert.equal(bodyObj.collection.author, 'test author');
//		})
.export(module);