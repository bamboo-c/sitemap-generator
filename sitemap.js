'use strict';

var fs   = require("fs");
var path = require("path");

// 引数無かったらカレントを返す
var dir  = process.argv[2] || '.';

var Walk = function ( i_p, i_cb ) {

	// ファイルを格納する配列を作成
	var results = [];

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

			if( fs.statSync( i_file ).isDirectory() ) Walk( i_file, function( i_err, i_res ) {

				results.push({

					folder : path.basename( i_file ),
					children : i_res

				});

				if ( !--pending ) i_cb( null, results );

			});

			return fs.statSync( i_file ).isFile();

		}).forEach( function ( i_file ) {

			results.push({

				file : path.basename( i_file )

			});

			if ( !--pending ) i_cb( null, results );

		});

	});

}

Walk( dir, function( i_err, i_results ) {

	if ( i_err ) throw err;
	var data = {
		name : 'project-sitemap',
		children : i_results
	};
	console.log( JSON.stringify( data ) ); //一覧出力

});
