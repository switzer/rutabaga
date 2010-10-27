var sys = require("sys"),
    assert = require("assert"),
    fugue = require("fugue");

const DEFAULT_HTTP_PORT = 80;

var run_app = function(server, config) {
    var http = require("http");
    var settings = require("../conf/settings.js");

    assert.ok(server instanceof http.Server);
    assert.ok(config instanceof settings.BaseConfig);

    // Run
    if (config.WEBSERVER_SOCKET) {
        fugue.start(server, config.WEBSERVER_SOCKET, config.NUMBER_OF_HTTP_WORKERS, {});
    } else if(config.WEBSERVER_HOST) {
        var port = config.WEBSERVER_PORT || DEFAULT_HTTP_PORT;
        fugue.start(server, port, config.WEBSERVER_HOST, config.NUMBER_OF_HTTP_WORKERS, {});
    } else {
        throw new Erorr("Either WEBSERVER_SOCKET or WEBSERVER_HOST should be defined in config");
    }
};

exports.run_app = run_app;