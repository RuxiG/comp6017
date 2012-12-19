var mongoose = require('mongoose'),
	utils = require('./utils.js');


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
		required: true,
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
		created_on: utils.date2string(this.created_on)
	};
});

/**
 * Create a Collection instance from the form's data.
 * 
 * @param CollectionForm form.
 * @returns Collection or null if form has errors;
 * does not save the instance to the DB.
 */
CollectionSchema.statics.createFromForm = function (form) {
	if (!form.isValid()) {
		return null;
	}
	
	var collection = this.model('Collection')({
		name: form.data.name,
		author: form.data.author
	});
	
	return collection;
};


/**
 * Collection model.
 */
var Collection = mongoose.model('Collection', CollectionSchema);


/**
 * Exports.
 */
exports.Collection = Collection;