var http = require('http');
var url = require('url');
http.createServer(function (req, res) {
 res.writeHead(200, {'Content-Type': 'text/html'});
 var parsedUrl = url.parse(req.url, true);
 var pathname = parsedUrl.pathname;
 if (pathname === '/student') {
        res.end('This is Student Page');
    }
 if (pathname === '/student') {
        res.end('This is Student Page');
    }
 if (pathname === '/admin') {
        res.end('This is admin Page');
    }
 if (pathname === '/data') {
        res.end('{"Hello World JSON"}');
    }
 if (pathname === '/') {
        res.end('This is Home Page');
    }
    else {
        res.end('404 not found');
    }

}).listen(8000);