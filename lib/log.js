var sys = require("sys"),
    http = require("http"),
    url = require("url"),
    template = require("./template");


var Config = require("../conf/settings").DefaultConfig;
var config = new Config();


var LogServer = http.createServer(function(request, response) {
    var parsed_url = url.parse(request.url, true);

    switch (parsed_url.pathname) {
        // Returns 1px transparent gif
        case "/1px.gif":
            response.writeHead(200, {'Content-Type': 'image/gif'});
            response.end(new Buffer(config.GIF_BYTES));
            break;

        case "/log":
            // log?t={type}&r={auction_id}&p={placement_id}&c={creative_id}
            //             * type - the type of output (if = iframe, im = beacon)
            //             * auction_id - the ID of the auction
            //             * placement_id - the ID of the placement
            //             * creative_id - the ID of the creative that was shown
            // TODO (exslim) Implement logging
            request.on('end', function() {
                var log_type = parsed_url.query.t | "";
                if (log_type == LOG_TYPE_IFRAME) {
                    response.writeHead(200, {"Content-Type": "text/html"});
                    var cts = {
                        openx_cookie_map_url: null, //TODO (exslim) populate with valid value
                        google_cookie_map_url: null //TODO (exslim) populate with valid value
                    };
                    template.render_to_string("templates/log_iframe.html", ctx, function(rendered_html){
                        response.end(rendered_html);
                    });
                } else if (log_type == LOG_TYPE_BEACON) {
                    response.writeHead(200, {"Content-Type": "image/gif"});
                    response.end(new Buffer(config.GIF_BYTES));
                } else {
                    response.writeHead(400, {});
                    response.end();
                }
            });
            break;


        default:
            response.writeHead(404, {'Content-Type': 'text/html'});
            response.end('<h1>Not Found</h1>');
            break;
    }
});

exports.LogServer = LogServer;