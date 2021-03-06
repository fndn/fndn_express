var express	= require('express');
var pack 	= require('../../package.json');
var chalk 	= require('chalk');

var app 	= express();

module.exports = function(){

	console.log( chalk.green('Starting ')+ pack.name +' v.'+ pack.version );

	app.disable('x-powered-by');
	app.set('etag', 'strong');

	app.use(function(req, res, next){
		// ignore favicon
		if (req.path === '/favicon.ico') {
			res.writeHead(200, {'Content-Type': 'image/x-icon'} );
			res.end();
			return;
		}

		// separate requests in the log
		if( req.url.indexOf('nonce=') > -1 ){
			// reach pings
			console.log('> ping', req.url);

		}else{
			// all other requests
			console.log(" ");
			console.log('---------------------------------------------------------------------');
			console.log("> req:", req.method, req.url );
		}

		next();
	});

	app.get('/version', function(req, res){
		res.json({'status':'ok', 'code':'VERSION', 'message': pack.name +' v.'+ pack.version});
	});

	return app;
}

module.exports.static = express.static;
