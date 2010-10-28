h3. Module "core"
```text
var core = require("./lib/core");
```

*core.run_app(server, config)*
Run webserver instance according to config.

_server_ - instance of RtbServer(lib/rtb.js), LogServer(lib/log.js) or ClickServer(lib/click.js) class.
_config_ - instance of DevelopmentConfig(conf/webserver.js), ProductionConfig(conf/webserver.js) or other config class
inherited from BaseConfig(conf/webserver.js)

h4. Example

```text
var core = require("./lib/core"),
    path = require("path"),
    server = require("./lib/rtb").RtbServer,
    WebserverConfig = require("./conf/webserver").DevelopmentConfig;

// Debug information
console.log('Nodejs version: ' + process.version);
console.log('Platform: ' + process.platform);
console.log('PID: ' + process.pid);

//Instance of webserver config
var webserver_config = new WebserverConfig();

//Allow port customizing via command arguments
webserver_config.WEBSERVER_PORT = parseInt(process.argv[2]) || webserver_config.WEBSERVER_PORT;

console.log("Running " + path.basename(__filename) + " on " + webserver_config.WEBSERVER_PORT + " port ...");

// Run webserver instance
core.run_app(server, webserver_config);
```