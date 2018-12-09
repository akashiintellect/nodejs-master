// start point for node master API

// dependencies
var http = require('http');
var url = require('url');

// Server response
var Server = http.createServer(function (req, res) {

    // Get the url and parse it
    var parseurl = url.parse(req.url, true);

    // Get the path
    var path = parseurl.pathname;
    var trimmedPath = path.replace(/^\/+|\/+$/g, '');
    var queryString = parseurl.query;

    var headers = req.headers;
    // Get the http method
    var method = req.method.toLowerCase();
    console.log(queryString);
    console.log("\nrequest recieve the path " + trimmedPath + " with method " + method);
    // Send the responce 
    // res.end(JSON.stringify(trimmedPath));

    //log the headers
    console.log("header of the request is ", headers);
    var choseHandler = typeof(router[trimmedPath]) !== "undefined" ? router[trimmedPath]:handler.notFound;

    var data={
        'trimmedPath':trimmedPath,
        'queryString': queryString,
        'method':method,
        'headers':headers
    }

    choseHandler(data,function (statusCode,payload) {
        statusCode=typeof (statusCode) === 'number' ? statusCode:200;
        payload = typeof (payload) === 'object' ? payload:{};
        const payLoadString = JSON.stringify(payload);
        res.writeHead(statusCode);
        res.end(payLoadString);
    })
});


//server lestening port

Server.listen(3000, function () {
    console.log("Server is listening on port 3000");
});

var handler = {};

handler.sample = function (data, callback) {
    callback(200, {'name': 'sample handler'});
}

handler.notFound = function (data, callback) {
    callback(404);

}

var router = {
    'sample': handler.sample
}