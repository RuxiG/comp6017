var mongoose = require('mongoose');


/**
 * Schema for Collection model.
 */
var CollectionSchema = new mongoose.Schema(
	{
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
	},
	{
		// other options
	}
);

/**
 * Collection model.
 */
var Collection = mongoose.model('Collection', CollectionSchema);


/**
 * Exports.
 */
exports.Collection = Collection;