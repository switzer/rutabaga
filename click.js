var core = require("./lib/core"),
    path = require("path"),
    server = require("./lib/click").ClickServer,
    WebserverConfig = require("./conf/webserver").DevelopmentConfig;

console.log('Nodejs version: ' + process.version);
console.log('Platform: ' + process.platform);
console.log('PID: ' + process.pid);

var webserver_config = new WebserverConfig();
webserver_config.WEBSERVER_PORT = parseInt(process.argv[2]) || webserver_config.WEBSERVER_PORT;

console.log("Running " + path.basename(__filename) + " on " + webserver_config.WEBSERVER_PORT + " port ...");
core.run_app(server, webserver_config);