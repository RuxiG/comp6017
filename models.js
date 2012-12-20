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
	},
	comments: {
		type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
		required: false
	}
});

/**
 * JSON representation of all fields (that the user can see).
 * 
 * @returns Object.
 */
CollectionSchema.virtual('jsonFields').get(function () {
	// replace list of ObjectIds with actual Comment instances
	this.populate('comments');
	
	return {
		id: this._id,
		name: this.name,
		author: this.author,
		created_on: utils.date2string(this.created_on),
		comments: this.comments.map(function (comment) {
			return comment.jsonFields;
		})
	};
});

/**
 * JSON representation of all fields that can be edited.
 * 
 * @returns Object.
 */
CollectionSchema.virtual('jsonFieldsEdit').get(function () {
	// replace list of ObjectIds with actual Comment instances
	this.populate('comments');
	
	return {
		id: this._id,
		name: this.name,
		author: this.author,
		comments: this.comments.map(function (comment) {
			return comment.jsonFieldsEdit;
		})
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
 * Schema for Comment model.
 */
var CommentSchema = new mongoose.Schema({
	author: {
		type: String,
		required: true,
		trim: true
	},
	comment: {
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

/**
 * JSON representation of all fields (that the user can see).
 * 
 * @returns Object.
 */
CommentSchema.virtual('jsonFields').get(function () {
	return {
		id: this._id,
		author: this.author,
		comment: this.comment,
		created_on: utils.date2string(this.created_on)
	};
});

/**
 * JSON representation of all fields that can be edited.
 * 
 * @returns Object.
 */
CommentSchema.virtual('jsonFieldsEdit').get(function () {
	return {
		id: this._id,
		author: this.author,
		comment: this.comment
	};
});

/**
 * Create a Comment instance from the form's data.
 * 
 * @param CommentForm form.
 * @returns Comment or null if form has errors;
 * does not save the instance to the DB.
 */
CommentSchema.statics.createFromForm = function (form) {
	if (!form.isValid()) {
		return null;
	}
	
	var comment = this.model('Comment')({
		author: form.data.author,
		comment: form.data.comment
	});
	
	return comment;
};


/**
 * Comment model.
 */
var Comment = mongoose.model('Comment', CommentSchema);


/**
 * Exports.
 */
exports.Collection = Collection;
exports.Comment = Comment;