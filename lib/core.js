var sys = require("sys"),
    assert = require("assert");

var run_app = function(server, config) {
    var http = require("http");
    var settings = require("../conf/webserver.js");

    assert.ok(server instanceof http.Server, "\"server\" is not an instance of http.Server");
    assert.ok(config instanceof settings.BaseConfig);

    // Run
    if (config.WEBSERVER_SOCKET) {        
        server.listen(config.WEBSERVER_SOCKET);
    } else if(config.WEBSERVER_HOST) {
        server.listen(config.WEBSERVER_PORT, config.WEBSERVER_HOST);
    } else {
        throw new Erorr("Either WEBSERVER_SOCKET or WEBSERVER_HOST should be defined in config");
    }
};

exports.run_app = run_app;