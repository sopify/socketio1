
/**
 * Module dependencies.
 */

var express = require('express')
  , app = module.exports = express.createServer()
  , routes = require('./routes')
  , io = require('socket.io').listen(app)
  , mu = require('mu2')
  , util = require('util');

// Configuration

app.configure(function(){
  mu.root = __dirname + '/views';
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);

// socket.io
io.sockets.on('connection', function(socket){
  socket.emit('hello', { text: 'hello' });
  socket.on('hellothere', function(data){
    console.log(data);
  });
});

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
