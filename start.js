var webPage = require('webpage');
//var cheerio = require('cheerio');
var page = webPage.create();


var site_url = 'http://www.4chan.org';
var jquery_url = 'https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js';
var jquery_file = 'jquery-3.2.1.min.js';

page.open(site_url, function (status) {
    if (status === "success") {
        var content = page.content;
        var title = page.title;
        
        if (page.injectJs(jquery_file)) {
            //var title = page.evaluate(function () {
            // returnTitle is a function loaded from our do.js file - see below
            //return returnTitle();
            //});
            page.evaluate(function () {
                var boards = $('#boards .boardlink');
                boards.each(function () {
                    console.dir($(this).attr('href'));
                });
            });
            phantom.exit();
        }
    }
});

page.onConsoleMessage = function (msg) {
    console.log(msg);
};