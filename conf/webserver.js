var BaseConfig = function() {};

var DevelopmentConfig = function() {};
DevelopmentConfig.prototype = new BaseConfig();
DevelopmentConfig.prototype.WEBSERVER_HOST = "0.0.0.0";
DevelopmentConfig.prototype.WEBSERVER_PORT = 8000;

var ProductionConfig = function() {};
ProductionConfig.prototype = new BaseConfig();
ProductionConfig.prototype.WEBSERVER_SOCKET = "\tmp\node.sock";


exports.BaseConfig = BaseConfig;
exports.DevelopmentConfig = DevelopmentConfig;
exports.ProductionConfig = ProductionConfig;


