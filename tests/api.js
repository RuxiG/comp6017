var apieasy = require('api-easy'),
	assert = require('assert');


apieasy.describe('REST API for /collections/')
	.use('localhost', 3000)
	.discuss('Collections resource')
	.get('/collections')
		.expect(200)
		.expect('{collections: [collection*]}', function (err, res, body) {
			assert.equal(res.headers['content-type'], 'application/json');
			
			var bodyObj = JSON.parse(body);
			
			assert.isArray(bodyObj.collections);
		})
		.expect('collection format', function (err, res, body) {
			var bodyObj = JSON.parse(body);
			
			for (var i = 0; i < bodyObj.collections.length; i += 1)
			{
				var collection = bodyObj.collections[i];
				
				assert.lengthOf(collection, 4);
				assert.isString(collection.id);
				assert.isString(collection.name);
				assert.isString(collection.author);
				assert.isString(collection.created_on);
			}
		})
	.post('/collections')
		.expect(200, {message: 'Create new collection.'})
.export(module);