var models = require('../models.js'),
	Collection = models.Collection,
	
	forms = require('../forms.js'),
	CollectionForm = forms.CollectionForm;


/**
 * Used for GET on "/".
 * List all collections.
 * 
 * @returns list of all collections.
 */
exports.index = {
	json: function (req, res) {
		Collection.find(function (err, results) {
			if (!err) {
				res.json(200, results.map(function (collection) {
					return collection.jsonFields;
				}));
			} else {
				console.error(err);
				res.json(503, {error: 'Could not find collections.'});
			}
		});
	}
};


/**
 * Used for POST on "/".
 * Create a new collection.
 * 
 * @returns created collection.
 */
exports.create = {
	json: function (req, res) {
		CollectionForm.handle(req, {
			success: function (form) {
				Collection.createFromForm(form).save(
					function (err, collection) {
						if (!err) {
							res.json(201, collection.jsonFields);
						} else {
							console.error(err);
							res.json(500,
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
 * Show only a specific collection.
 * 
 * @returns the requested collection.
 */
exports.show = {
	json: function (req, res) {
		res.json(200, req.collection.jsonFields);
	}
};


/**
 * Used for GET on "/:collection/edit".
 * Show the fields that can be edited for a collection.
 * 
 * @returns editable fields for the requested collection.
 */
exports.edit = {
	json: function (req, res) {
		res.json(200, req.collection.jsonFieldsEdit);
	}
};


/**
 * Used for PUT on "/:collection".
 * Update a collection.
 * 
 * @returns updated collection.
 */
exports.update = {
	json: function (req, res) {
		CollectionForm.handle(req, {
			success: function (form) {
				Collection.findByIdAndUpdate(req.collection._id,
					form.data,
					function (err, collection) {
						if (!err) {
							res.json(200, collection.jsonFields);
						} else {
							console.error(err);
							res.json(500,
								{error: 'Could not update collection.'});
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
 * Delete a collection.
 * 
 * @returns no content.
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