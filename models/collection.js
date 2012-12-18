var mongoose = require('mongoose'),
	date = require('../utils/date.js');


/**
 * Schema for Collection model.
 */
var CollectionSchema = new mongoose.Schema({
	// fields
	name: {
		type: String,
		required: true,
		index: true,
		unique: true,
		trim: true
	},
	author: {
		type: String,
		required: false,
		trim: true
	},
	created_on: {
		type: Date,
		'default': Date.now,
		required: true
	}
});

CollectionSchema.virtual('jsonFields').get(function () {
	return {
		id: this._id,
		name: this.name,
		author: this.author,
		created_on: date.date2string(this.created_on)
	};
});


/**
 * Collection model.
 */
var Collection = mongoose.model('Collection', CollectionSchema);


/**
 * Exports.
 */
exports.Collection = Collection;