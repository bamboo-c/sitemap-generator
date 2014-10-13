'use strict';

var sitemap = require("./lib/sitemap.js");
var dir  = process.argv[2] || '.';

sitemap( dir, function( i_err, i_results ) {

	if ( i_err ) throw err;
	var data = {
		name : 'project-sitemap',
		children : i_results
	};
	console.log( JSON.stringify( data ) ); //一覧出力

});
