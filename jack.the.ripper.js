var utils = require('utils');
var casper = require('casper').create();

/*
	https://www.vfiles.com/vfiles/835
	http://imgserv.vfiles.com/api/file/mc5wECu7QT6JZW8GUqCw
*/

var _img_test = "http://imgserv.vfiles.com/api/file/mc5wECu7QT6JZW8GUqCw";

var _url = casper.cli.get("url");

function pad(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}

casper.start(_url, function() {
	this.echo(this.getTitle());

	var img_selector = 'img[class="ng-scope"]';
	var imgs = this.getElementsInfo(img_selector); // an array of object literals

	var img_urls = [];
	for (var i = 0; i < imgs.length; i++) {
		var src = imgs[i].attributes.src;
		var parts = src.split("?");

		img_urls.push(parts[0]);
	}

	utils.dump(img_urls);

	for (var i = 0; i < img_urls.length; i++) {
		this.download( img_urls[i], "cool_"+pad(i,3)+".png" );
	}
});

casper.run();