var fs   = require('fs');
var path = require('path');

// ディレクトリかチェック
var isDir = function(filepath) {
	if (/\/$/.test(filepath)) {
		filepath = filepath.substr(0, filepath.lastIndexOf('/') - 1);
	}
	return (path.existsSync(filepath) && fs.statSync(filepath).isDirectory());
};


var walk = function(p, callback) {
	fs.readdir(p, function(err, files){
	if (err) throw err;
	var pending = files.length;
	files.map(function(file){
		// リスト取得
		return path.join(p, file);
	})
	.filter(function(file){
		if (fs.statSync(file).isDirectory()) {
			walk(file, function(err, res){
				if (err) throw err;
			});
		}
		else {
		console.log(file);
		}
	})
	});
};

walk('./html', function(err, results){
	if (err) throw err;
});
