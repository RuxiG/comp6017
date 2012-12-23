var models = require('../models.js'),
	Collection = models.Collection,
	Comment = models.Comment,
	
	forms = require('../forms.js'),
	CollectionForm = forms.CollectionForm,
	CommentForm = forms.CommentForm;


/**
 * Used for GET on "/".
 */
exports.index = {
	json: function (req, res) {
		res.json(200, req.collection.comments.map(function (comment) {
			return comment.jsonFields;
		}));
	}
};


/**
 * Used for POST on "/".
 */
exports.create = {
	json: function (req, res) {
		CommentForm.handle(req, {
			success: function (form) {
				req.collection.comments.push(Comment.createFromForm(form));
				req.collection.save(
					function (err, collection) {
						if (!err) {
							res.json(201, collection.jsonFields);
						} else {
							console.error(err);
							res.json(406,
								{error: 'Could not create comment.'});
						}
				});
			},
			other: function (form) {
				res.json(406, {error: 'Provide an author and comment.'});
			}
		});
	}
};


/**
 * Used for GET on "/:comment".
 */
exports.show = {
	json: function (req, res) {
		res.json(200, req.collection.comments.id(req.param('comment'))
			.jsonFields);
	}
};


/**
 * Used for GET on "/:comment/edit".
 */
exports.edit = {
	json: function (req, res) {
		res.json(200, req.collection.comments.id(req.param('comment'))
			.jsonFieldsEdit);
	}
};


/**
 * Used for PUT on "/:comment".
 */
exports.update = {
	json: function (req, res) {
		CommentForm.handle(req, {
			success: function (form) {
				// values to update using nested named keys
				var toUpdate = {};
				for (var key in form.data) {
					if (form.data.hasOwnProperty(key)) {
						toUpdate['comments.$.' + key] = form.data[key];
					}
				}
				
				Collection.update(
					{
						_id: req.collection._id,
						'comments._id': req.param('comment')
					},
					toUpdate,
					function (err, numberAffected, raw) {
						if (!err) {
							Collection.findById(req.collection._id,
								function (err, collection) {
									res.json(200, collection.comments
										.id(req.param('comment'))
										.jsonFields);
							});
						} else {
							console.error(err);
							res.json(404, {error: 'Comment not found.'});
						}
					}
				);
			},
			other: function (form) {
				res.json(406, {error: 'Invalid data supplied.'});
			}
		});
	}
};


/**
 * Used for DELETE on "/:comment".
 */
exports.destroy = {
	json: function (req, res) {
		req.collection.comments.id(req.param('comment')).remove();
		req.collection.save(function (err) {
			if (!err) {
				res.json(204);
			} else {
				console.error(err);
				res.json(404, {error: 'Comment not found.'});
			}
		});
	}
};