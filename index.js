var fs = require("fs");
var path = require("path");
var dir = process.argv[2] || '.';

var Main = {

	Walk : null,

	init : function() {

		Main.Walk = new Walk(dir, function( i_err, results ) {

			console.log("ok")
			if ( i_err) throw i_err;
			var data = {
				name:'root', children:results
			};
			console.log(JSON.stringify( data, null, 2 )); //一覧出力

		});

		Main.Walk._run();

	}

};

var Walk = function( i_p, i_cb ) {

	this.i_p = i_p;
	this.i_cb = i_cb;

	this._init.apply( this );

}
Walk.prototype = {

	_init : function() {

		this.results = [];

	},
	_run : function() {

		console.log(this.i_cb);

		return

		fs.readdir( this.i_p, function ( i_err, i_files ) {
			if ( i_err) throw i_err;

			var pending = i_files.length;

			if (!pending) return this.i_cb( null, results ); //全てのファイル取得が終わったらコールバックを呼び出す

			i_files.map(function ( i_file) { //リスト取得
				return path.join( this.i_p, i_file);
			}).filter(function ( i_file) {
				if( fs.statSync( i_file).isDirectory() ) walk( i_file, function( i_err, res ) { //ディレクトリだったら再帰
					results.push({name:path.basename( i_file), children:res}); //子ディレクトリをchildrenインデックス配下に保存
					if (!--pending) this.i_cb(null, results );
				 });
				return fs.statSync( i_file).isFile();
			}).forEach(function ( i_file) { //ファイル名を保存
				var stat = fs.statSync( i_file);
				results.push({name:path.basename( i_file)});
				if (!--pending) this.i_cb(null, results );
			});

		});

	}

}

Main.init();
