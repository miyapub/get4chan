var fs = require('fs');
var request = require("request");
var cheerio = require("cheerio");
var mkdirp = require('mkdirp');


var dir = './images';

mkdirp(dir, function (err) {
    if (err) {
        console.log(err);
    }
});

var url='http://www.4chan.org';

request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        var $ = cheerio.load(body);
        $('#boards .boardlink').each(function () {
            var src = $(this).attr('href');
            console.log(src);
            //download(src, dir, Math.floor(Math.random() * 100000) + src.substr(-4, 4));
            //console.log('下载完成');
        });
    }
});

var download = function (url, dir, filename) {
    request.head(url, function (err, res, body) {
        request(url).pipe(fs.createWriteStream(dir + "/" + filename));
    });
};