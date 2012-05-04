
/*
 * GET home page.
 */

var mu = require('mu2')
  , util = require('util');

exports.index = function(req, res){
  var stream = mu.compileAndRender('index.mustasche');
  util.pump(stream, res);
};
