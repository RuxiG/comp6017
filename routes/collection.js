/*
 * Collection related routes.
 */


/**
 * Used for GET on "/".
 */
exports.index = {
	json: function (req, res)
	{
		res.send({one: 1, two: 2, three: 3});
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