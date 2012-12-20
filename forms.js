var forms = require('forms'),
	fields = forms.fields,
	validators = forms.validators;


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
 * Form for Comment model.
 */
var CommentForm = forms.create({
	author: fields.string({
		required: true,
		validators: [validators.minlength(3)]
	}),
	comment: fields.string({
		required: true,
		validators: [validators.minlength(3)]
	})
});


/**
 * Exports.
 */
exports.CollectionForm = CollectionForm;
exports.CommentForm = CommentForm;