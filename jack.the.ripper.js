var casper = require('casper').create();
var system = require('system');
var utils = require('utils');
/*
	https://www.vfiles.com/vfiles/835
	http://imgserv.vfiles.com/api/file/mc5wECu7QT6JZW8GUqCw
*/

var _url = "https://www.vfiles.com/vfiles/835";

function pad(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}

system.stdout.write('url to rip: ');
var new_url = system.stdin.readLine();
if( new_url != "" ) {
	_url = new_url;
}

casper.echo( "scraping site for image URLS..." );

casper.start(_url,function() {
	casper.then(function() {
		casper.repeat( 5, function(){
			casper.then(function(){
				casper.scrollToBottom();
			});

			casper.then(function(){
				casper.wait( 1000 );

				var img_selector = 'img[class="ng-scope"]';
				var imgs = this.getElementsInfo(img_selector);

				casper.echo("found " + imgs.length + " images!" );
			});
		});
	});

	casper.then(function() {
		casper.echo( "downloading..." );

		var img_selector = 'img[class="ng-scope"]';
		var imgs = this.getElementsInfo(img_selector);

		var img_urls = [];
		for (var i = 0; i < imgs.length; i++) {
			var src = imgs[i].attributes.src;
			var parts = src.split("?");

			img_urls.push(parts[0]);
		}

		for (var i = 0; i < img_urls.length; i++) {
			this.download( img_urls[i], "cool_"+pad(i,3)+".png" );
		}
	});

	casper.then(function(){
		casper.echo( "done." );
	});
});

casper.run(function(){
	casper.exit();
});