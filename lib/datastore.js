var Db = require("mongodb").Db,
        Connection = require("mongodb").Connection,
        Server = require("mongodb").Server,
        BSON = require("mongodb").BSONNative,
        mongoose = require("mongoose").Mongoose;


mongoose.model('Request', {
    properties: [
        'type',
        'page',
        'user',
        'variables',
        'ad',
        'stats'
    ],
    static: {
        TYPE_AUCTION: 1,
        TYPE_ADSERVER: 2       
    }
});

mongoose.model('Rule', {
    properties: [
        'creative_id',
        'url',
        'rule',
        'bid',
        'html'
    ]
});

mongoose.model('User', {
    properties: [
        'visit_id',
        'exchanges', // {type, exchange_id}
        'capping', //{type, id,  num}
        'searches',
        'domains'
    ]
});

/*
mongoose.model('Page', {
    properties: [
        'page_id',
        'url',
        'referrer',
        'user',
        'variables',
        'ads'
    ]
});
*/
var get_database = function(config) {
    return mongoose.connect("mongodb://" + config.DATABASE_HOST + "/" + config.DATABASE_NAME);
};

exports.get_database = get_database;

var Config = require("../conf/settings").DefaultConfig;
exports.Datastore = get_database(new Config());
