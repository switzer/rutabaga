var Db = require("mongodb").Db,
        Connection = require("mongodb").Connection,
        Server = require("mongodb").Server,
        BSON = require("mongodb").BSONNative,
        mongoose = require("mongoose").Mongoose,
        config = require('../conf/settings').Config;


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

const REQUEST_TYPE_AUCTION = 1;
const REQUEST_TYPE_ADSERVER = 2;

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
        TYPE_AUCTION: function() {
            return REQUEST_TYPE_AUCTION;
        },
        TYPE_ADSERVER: function() {
            return REQUEST_TYPE_ADSERVER;
        }
    }
});

mongoose.model('Auction', {
    properties: [
        'exchange',
        'exchange_auction_id',
        'auction_id, ad_height',
        'ad_width',
        'user_id',
        'user_ip_address',
        'user_screen_height',
        'user_screen_width',
        'user_geo_country',
        'user_geo_state',
        'user_geo_dma',
        'user_agent',
        'user_lang',
        'url',
        'referrer',
        'category_1',
        'category_2',
        'restricted_ad_categories',
        'restricted_ad_content',
        'restricted_ad_types',
        'restricted_ad_urls',
        'response_ms',
        'creative_id',
        'bid',
        'winning_bid'
    ]
});

mongoose.model('User', {
    properties: [
        'user_id',
        'exchanges',
        'capping',
        'searches',
        'domains'
    ]
});

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

var db = mongoose.connect("mongodb://" + config.DATABASE_HOST + "/" + config.DATABASE_NAME);
exports.Datastore = db;