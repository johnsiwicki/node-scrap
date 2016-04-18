var request = require('request')
var cheerio = require('cheerio')
var fs = require('fs')

var images = [];

request('https://unsplash.com/', function(err, res, body) {
	if(!err && res.statusCode === 200) {
		var $ = cheerio.load(body);
		//find images that are wrapped in photo-grid div
		$('img', 'div.photo-grid').each(function() {
			var img = $(this).attr('src');
			images.push(img);
		});
		for (var i = 0; i < images.length; i++) {
		 	request(images[i]).pipe(fs.createWriteStream('images/cat' + i + '.jpg'));
		}
	}

});