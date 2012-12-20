var models = require('../models.js'),
	Collection = models.Collection,
	
	forms = require('../forms.js'),
	CollectionForm = forms.CollectionForm;


/**
 * Used for GET on "/".
 */
exports.index = {
	json: function (req, res) {
		Collection.find(function (err, results) {
			if (!err) {
				res.json(200, {
					collections: results.map(function (collection) {
						return collection.jsonFields;
					})
				});
			} else {
				console.error(err);
				res.json(404, {error: 'Could not find collections.'});
			}
		});
	}
};


/**
 * Used for POST on "/".
 */
exports.create = {
	json: function (req, res) {
		CollectionForm.handle(req, {
			success: function (form) {
				Collection.createFromForm(form).save(
					function (err, collection) {
						if (!err) {
							res.json(201, {collection: collection.jsonFields});
						} else {
							console.error(err);
							res.json(406,
								{error: 'Could not create collection.'});
						}
				});
			},
			other: function (form) {
				res.json(406, {error: 'Provide a name and author.'});
			}
		});
	}
};


/**
 * Used for GET on "/:collection".
 */
exports.show = {
	json: function (req, res) {
		res.json(200, {collection: req.collection.jsonFields});
	}
};


/**
 * Used for GET on "/:collection/edit".
 */
exports.edit = {
	json: function (req, res) {
		res.json(200, {collection: req.collection.jsonFieldsEdit});
	}
};


/**
 * Used for PUT on "/:collection".
 */
exports.update = {
	json: function (req, res) {
		CollectionForm.handle(req, {
			success: function (form) {
				Collection.findByIdAndUpdate(req.collection._id,
					form.data,
					function (err, collection) {
						if (!err) {
							res.json(200, {collection: collection.jsonFields});
						} else {
							console.error(err);
							res.json(404, {error: 'Collection not found.'});
						}
				});
			},
			other: function (form) {
				res.json(406, {error: 'Invalid data supplied.'});
			}
		});
	}
};


/**
 * Used for DELETE on "/:collection".
 */
exports.destroy = {
	json: function (req, res) {
		Collection.findByIdAndRemove(req.collection._id,
			function (err, collection) {
				if (!err) {
					res.json(204);
				} else {
					console.error(err);
					res.json(404, {error: 'Collection not found.'});
				}
		});
	}
};