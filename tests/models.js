var vows = require('vows'),
	assert = require('assert'),
	models = require('./models');


vows.describe('Collection model').addBatch({
	'has correct fields': {
		topic: function () {
			return 10;
		},
		'has name': function (topic) {
			assert.equal(topic, 10);
		}
	}
}).export(module);