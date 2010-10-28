var BaseConfig = function() {};
BaseConfig.prototype.REQUEST_TYPE_AUCTION = 1;
BaseConfig.prototype.REQUEST_TYPE_ADSERVER = 2;
BaseConfig.prototype.LOG_TYPE_IFRAME = 'if';
BaseConfig.prototype.LOG_TYPE_BEACON = 'im';
BaseConfig.prototype.GIF_BYTES = [71, 73, 70, 56, 57, 97, 1, 0, 1, 0, 128, 0, 0, 255, 255, 255, 0, 0, 0, 33, 249, 4, 1, 0, 0, 0, 0, 44, 0, 0, 0, 0, 1, 0, 1, 0, 0, 2, 2, 68, 1, 0, 59];

var DevelopmentConfig = function() {};
DevelopmentConfig.prototype = new BaseConfig();
DevelopmentConfig.prototype.DOMAIN = "localhost";
DevelopmentConfig.prototype.DATABASE_HOST = "127.0.0.1";
DevelopmentConfig.prototype.DATABASE_PORT = 27017;
DevelopmentConfig.prototype.DATABASE_NAME =  "dev";

var ProductionConfig = function() {};
ProductionConfig.prototype = new BaseConfig();
ProductionConfig.prototype.DOMAIN = "rtb.co";
ProductionConfig.prototype.DATABASE_HOST = "127.0.0.1";
ProductionConfig.prototype.DATABASE_PORT = 27017;
ProductionConfig.prototype.DATABASE_NAME =  "rtb";


exports.BaseConfig = BaseConfig;
exports.DevelopmentConfig = DevelopmentConfig;
exports.ProductionConfig = ProductionConfig;


