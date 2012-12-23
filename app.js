
/**
 * Module dependencies.
 */

var express = require('express'),
	http = require('http'),
	path = require('path'),
	cons = require('consolidate'),
	swig = require('swig'),
	mongoose = require('mongoose'),
	resource = require('express-resource'),
	models = require('./models.js');

var app = express();

app.configure(function () {
	app.set('port', process.env.PORT || 3000);
	
	// asign the swig engine to html files
	app.engine('html', cons.swig);
	// set .html as the default template extension
	app.set('view engine', 'html');
	// location of views directory
	swig.init({
		root: __dirname + '/views',
		allowErrors: true,
		cache: false
	});
	app.set('views', __dirname + '/views');
	
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	
	app.use(app.router);
	
	app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function () {
	app.use(express.errorHandler({dumpExceptions: true, showStack: true}));
	
	mongoose.connect('mongodb://localhost/comp6017');
});

app.configure('production', function () {
	app.use(express.errorHandler());
	
	mongoose.connect('mongodb://localhost/comp6017');
});

// resources
function resourceLoad (model) {
	return function (req, id, fn) {
		model.findById(id, function (err, doc) {
			fn(null, (!err) ? doc : err);
		});
	};
}

var collections = app.resource('collections', require('./routes/collection'),
		{load: resourceLoad(models.Collection)});
var comments = app.resource('comments', require('./routes/comment'));
collections.add(comments);

http.createServer(app).listen(app.get('port'), function () {
	console.log('Express server listening on port ' + app.get('port'));
});
