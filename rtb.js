// This source code is for development purposes only

var sys = require("sys"),
    http = require("http"),
    fs = require("fs"),
    Schema = require('protobuf_for_node').Schema;

// Loading descriptor
var schema = new Schema(fs.readFileSync('openx.desc'));

const HOST = "0.0.0.0";
const PORT = 80;

var server = http.createServer(function(request, response){
  switch (request.url) {
    case '/':
      var _request;
      request.on('data', function(chunk){
        sys.puts("Request received, size: " + chunk.length + " bytes. Dump ->");
        var bidRequest = schema['openx.BidRequest'];
        _request = bidRequest.parse(chunk);
        sys.puts(sys.inspect(_request));
      });
      request.on('end', function(){
        response.writeHead(200, {'Content-Type': 'text/html'});
        var _response = {
          api_version: _request['api_version'],
          auction_id: _request['auction_id'],
          matching_ad_id: _request['matching_ad_ids'][0],
          cpm_bid_micros: 12345
        };
        var bidResponse = schema['openx.BidResponse'];
	response.end(bidResponse.serialize(_response));
	sys.puts("Responded with -> " + sys.inspect(_response));
      });
      break;
    default:
        response.writeHead(404, {'Content-Type': 'text/html'});
	response.end('<h1>Not Found</h1>\n');
      break;
  }
}).listen(PORT, HOST);

console.log("Server listening " + HOST + " on " + PORT + " port");
