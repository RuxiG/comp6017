var forms = require('forms'),
	fields = forms.fields,
	validators = forms.validators,
	
	models = require('./models.js');


/**
 * Form for Collection model.
 */
var CollectionForm = forms.create({
	name: fields.string({
		required: true,
		validators: [validators.minlength(5)]
	}),
	author: fields.string({
		required: true,
		validators: [validators.minlength(3)]
	})
});


/**
 * Exports.
 */
exports.CollectionForm = CollectionForm;