
/**
 * Module dependencies.
 */

var express = require('express'),
	routes = require('./routes'),
	user = require('./routes/user'),
	http = require('http'),
	path = require('path'),
	cons = require('consolidate'),
	swig = require('swig');

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
	app.use(express.errorHandler());
});

// routes
app.get('/', routes.index);
app.get('/users/', user.list);

http.createServer(app).listen(app.get('port'), function () {
	console.log('Express server listening on port ' + app.get('port'));
});
