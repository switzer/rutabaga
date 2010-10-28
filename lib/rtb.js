var sys = require("sys"),
    http = require("http"),
    fs = require("fs"),
    url = require("url"),
    Schema = require("protobuf_for_node").Schema,
    Config = require("../conf/settings").DevelopmentConfig,
    template = require("./template"),
    core = require("./core.js");

var config = new Config();
var db = require("./datastore").get_database(config);

var Request = db.model('Request');
var schema = new Schema(fs.readFileSync('./proto/openx.desc'));

var RtbServer = http.createServer(function(request, response) {
    var parsed_url = url.parse(request.url, true);
    console.log(parsed_url.pathname);

    switch (parsed_url.pathname) {
        // Handle protobuf-packed request from OpenX
        case '/bid':
            var _bid_request;
            var request_doc = new Request();
            request.on('data', function(chunk) {
                try {
                    _bid_request = schema['openx.BidRequest'].parse(chunk);
                } catch (e){
                    // TODO (exslim) Fallback when message is malformed
                }
                sys.puts(sys.inspect(request_doc));
                request_doc.type = Request.TYPE_AUCTION;
                request_doc.user = {
                    id: _bid_request['user_cookie_id'],
                    visit_id: 0,
                    ip_address: _bid_request['user_ip_address'],
                    geo: {
                        country: _bid_request['user_geo_country'],
                        city: "NOT_DEFINED", //TODO (exslim) Implement async city lookup if needed
                        state: _bid_request['user_geo_state'],
                        dma: _bid_request['user_geo_dma']
                    },
                    location: {
                        longitude: "NOT_DEFINED",
                        latitude: "NOT_DEFINED",
                        type: "NOT_DEFINED"
                    },
                    environment: {
                        user_agent: _bid_request['user_agent'],
                        os: "", //TODO (exslim) Parse from user agent if needed
                        browser: "", //TODO (exslim) Parse from user agent if needed
                        hardware: "", //TODO (exslim) Parse from user agent if needed
                        carrier: "" //TODO (exslim) Implement async revese IP lookup if needed
                    }
                };
                request_doc.save();
            });

            request.on('end', function() {
                response.writeHead(200, {'Content-Type': 'text/html'});
                var ctx = {
                    click_url: "http://" + config.DOMAIN + "/ck?rid=" + request_doc._id.toHexString() + "&cid={{creative_id}}&cu={{click_url}}",
                    media_url: "TODO_media_url", //TODO (exslim) Populate with valid value
                    log_url_iframe: "http://" + config.DOMAIN + "/log?t=if&r={auction_id}&p={placement_id}&c={creative_id}",
                    log_url_beacon: "http://" + config.DOMAIN + "/log?t=im&r={auction_id}&p={placement_id}&c={creative_id}"
                };
                template.render_to_string('templates/media.html', ctx, function(rendered_html) {
                    var _bid_response = {
                        api_version: _bid_request['api_version'],
                        auction_id: _bid_request['auction_id'],
                        matching_ad_id: _bid_request['matching_ad_ids'][0],
                        cpm_bid_micros: 0.10 * 10000, //TODO (exslim) Separate multiplier
                        ad_code: rendered_html,
                        click_url: "TODO_click_url"
                    };
                    response.end(schema['openx.BidResponse'].serialize(_bid_response));
                });
            });
            break;

        default:
            response.writeHead(404, {'Content-Type': 'text/html'});
            response.end('<h1>Not Found</h1>');
            break;
    }
});

exports.RtbServer = RtbServer;