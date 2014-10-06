'use strict';

var fs     = require("fs");
var path   = require("path");

// 引数無かったらカレントを返す
var dir  = process.argv[2] || '.';

module.exports = {

	// initialize
	init : function ( i_p, i_cb ) {

		var self = this;
		var results = [];

		self.read( i_p, i_cb );

	},
	// 解析
	read : function( i_p, i_cb ) {

		console.log(i_p)

		fs.readdir( i_p, function ( i_err, i_files ) {

			if ( i_err ) throw err;

			// ファイル数を取得
			var pending = i_files.length;

			// 全てのファイルを取得後にコールバックを呼ぶ
			if ( !pending ) return i_cb( null, results );

			i_files.map( function ( i_file ) {

				return path.join( i_p, i_file );

			}).filter( function ( i_file ) {

				// ディレクトリだったら再帰
				if( fs.statSync( i_file ).isDirectory() ) self.update( i_file, function( i_err, i_res ) {

					results.push({

						folder : path.basename( i_file ),
						children : i_res

					}); //子ディレクトリをchildrenインデックス配下に保存

					if ( !--pending ) i_cb( null, results );

				});

				return fs.statSync( i_file ).isFile();

			}).forEach( function ( i_file ) { //ファイル名を保存

				results.push({

					file : path.basename( i_file )

				});

				if ( !--pending ) i_cb( null, results );

			});

		});

	}
	update : function( i_err, i_results ) {
		if ( i_err ) throw err;
		var data = {
			name:'project-sitemap',
			children:i_results
		};
		// 出力
		console.log( JSON.stringify( data ) );
	}

};
