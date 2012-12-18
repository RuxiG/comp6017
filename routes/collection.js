var models = require('../models.js'),
	Collection = models.Collection;


/**
 * Used for GET on "/".
 */
exports.index = {
	json: function (req, res)
	{
		Collection.find({}, function (err, results) {
			// TODO: handle errors, if any
			res.send({
				collections: results.map(function (collection) {
					return collection.jsonFields;
				})
			});
		});
	}
};


/**
 * Used for POST on "/".
 */
exports.create = {
	json: function (req, res)
	{
		res.send({message: 'Create new collection.'});
	}
};


/**
 * Used for GET on "/:id".
 */
exports.show = {
	json: function (req, res)
	{
		res.send({message: 'Show a collection'});
	}
};


/**
 * Used for GET on "/:id/edit".
 */
exports.edit = {
	json: function (req, res)
	{
		res.send({message: 'Edit a collection'});
	}
};


/**
 * Used for PUT on "/:id".
 */
exports.update = {
	json: function (req, res)
	{
		res.send({message: 'Update a collection'});
	}
};


/**
 * Used for DELETE on "/:id".
 */
exports.destroy = {
	json: function (req, res)
	{
		res.send({message: 'Delete a collection'});
	}
};