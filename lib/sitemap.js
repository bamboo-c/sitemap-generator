'use strict';

var fs   = require("fs");
var path = require("path");

var Main = {

	results : null,

	init : function() {

	},

	//-------------------------------------------------
	// ファイルを解析
	//-------------------------------------------------
	walk : function( i_p, i_cb ) {

		var results = [];
		var walk;

		// ファイルを解析
		fs.readdir( i_p, function ( i_err, i_files ) {

			if ( i_err ) throw err;

			// ファイル数を取得
			var pending = i_files.length;

			// 全てのファイルを取得後にコールバックを呼ぶ
			if ( !pending ) return i_cb( null, results );

			i_files.map( function ( i_file ) {

				return path.join( i_p, i_file );

			}).filter( function ( i_file ) {

				if( fs.statSync( i_file ).isDirectory() ) {

					Main.walk( i_file, function( i_err, i_res ) {

						results.push({

							folder : path.basename( i_file ),
							children : i_res

						});

						if ( !--pending ) i_cb( null, results );

					});

				}

				return fs.statSync( i_file ).isFile();

			}).forEach( function ( i_file ) {

				results.push({

					file : path.basename( i_file )

				});

				if ( !--pending ) i_cb( null, results );

			});

		});

	}

};

// module.exports
module.exports = Main.walk;
