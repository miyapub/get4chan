var fs = require('fs');
var request = require("request");
var cheerio = require("cheerio");
var mkdirp = require('mkdirp');
var hasha = require('hasha');

var dir_temp = './images/temp';
var dir = './images/mu';

mkdirp(dir, function (err) {
    if (err) {
        console.log(err);
    }
});
mkdirp(dir_temp, function (err) {
    if (err) {
        console.log(err);
    }
});

var url = 'http://boards.4chan.org/mu';

var urls = [];


urls.push(url);

for (var i = 2; i <= 10; i++) {
    var sub_url = url + '/' + i;
    urls.push(sub_url);

}




urls.map(function (url) {
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var $ = cheerio.load(body);
            $('.fileThumb').each(function () {
                var file = $(this).attr('href').replace('//', 'http://');
                //console.log(file);

                download(file);
                //console.log('下载完成');
            });
        }
    });
});

/*
request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        var $ = cheerio.load(body);
        $('a').each(function () {
            var src = $(this).attr('href');
            console.log(src);
            //download(src, dir, Math.floor(Math.random() * 100000) + src.substr(-4, 4));
            //console.log('下载完成');
        });
    }
});
*/

var download = function (url_file) {

    var tmp_array = url_file.split('.');
    var last = tmp_array.length - 1;
    var ext_name = tmp_array[last];


    var tmp_array = url_file.split('/');
    var last = tmp_array.length - 1;
    var file_name = tmp_array[last];

    var tmp_file = dir_temp + '/' + file_name;
    var stream = fs.createWriteStream(tmp_file);
    request(url_file).pipe(stream).on('close', function () {
        hasha.fromFile(tmp_file, {
            algorithm: 'md5'
        }).then(function (hash) {
            console.log(hash);
            fs.rename(tmp_file, dir + '/' + hash + '.' + ext_name, function (err) {
                if (err) {
                    throw err;
                }
                console.log('done!');
            });
        });
    });
    //console.log(file_name);
    /*
    request.head(url, function (err, res, body) {
        var temp_file = dir_temp + '/' + file_name;
        var writable = fs.createWriteStream(temp_file);
        request(url).pipe(writable);
        writable.on('finish', function () {
            console.log('write finished');
            hasha.fromFile(temp_file, {
                algorithm: 'md5'
            }).then(function (hash) {
                console.log(hash);
                fs.rename(temp_file,dir+'/'+hash+'.'+ext_name,function (err) {
                    if (err) {
                        throw err;
                    }
                    console.log('done!');
                });
            });
            //process.exit(0);
        });
        //request(url).pipe(fs.createWriteStream(dir + "/" + filename));
    });*/
};