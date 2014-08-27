var fs   = require('fs');
var path = require('path');

// ディレクトリかチェック
var isDir = function( i_path ) {
	if ( /\/$/.test( i_path ) ) {
		i_path = i_path.substr( 0, i_path.lastIndexOf('/') - 1 );
	}

	return ( path.existsSync( i_path ) && fs.statSync( i_path ).isDirectory() );
};

var walk = function( i_path, callback ) {
	fs.readdir( i_path, function( err, files ){
		if ( err ) throw err;
		var pending = files.length;
		files.map( function( file ){
			// リスト取得
			return path.join( i_path, file );
		})
		.filter(function( file ){
			if ( fs.statSync(file).isDirectory() ) {
				walk( file, function( err, res ){
					if ( err ) throw err;
				});
			}
			else {
				console.log( file );
			}
		})
	});
};

walk("./html", function( err, results ){
	if ( err ) throw err;
});
