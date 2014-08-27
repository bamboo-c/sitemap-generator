var fs = require('fs');


fs.readdir( './html', function( i_error, i_files ) {

	if( i_error ) {
		throw i_error;
	}

	var fileList = [];

	i_files.filter( function( i_file ) {

		return fs.statSync( i_file ).isFile().test( i_file ); //絞り込み
		console.log(fs.statSync( i_file ).isFile().test( i_file ));
	}).forEach( function( i_file ) {

		fileList.push( i_file );

	});

	console.log(fileList);

});
