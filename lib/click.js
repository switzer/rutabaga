var sys = require("sys"),
    http = require("http"),
    url = require("url");  


var Config = require("../conf/settings").DevelopmentConfig;
var config = new Config();

var ClickServer = http.createServer(function(request, response) {
    var parsed_url = url.parse(request.url, true);

    switch (parsed_url.pathname) {

        case '/ck':
            // TODO (exslim) Finish ClickTracking implementation
            //ck?rid={request_id}&cid={creative_id}&cu={click_url}
            var location = parsed_url.query.cu | '';
            response.writeHead(302, {'Locaion': location});
            response.end();
            break;

        default:
            response.writeHead(404, {'Content-Type': 'text/html'});
            response.end('<h1>Not Found</h1>');
            break;
    }
});


exports.ClickServer = ClickServer;