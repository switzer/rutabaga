var rule_fixtures = [
    {creative_id: 11, url: "url1", rule: "1 < 2", bid: 23, html: "html1"},
    {creative_id: 22, url: "url2", rule: "2 < 1", bid: 53, html: "html2"},
    {creative_id: 33, url: "url3", rule: "1", bid: 112, html: "html3"},
    {creative_id: 44, url: "url4", rule: "0", bid: 234, html: "html4"},
    {creative_id: 44, url: "url4", rule: "user.searches.keyword == \"shoes\"", bid: 234, html: "html4"} // Complex one :)
];
var request_fixtures = [
    {type: 1, user: 1}
];
var user_fixtures = [
    {user: 1, searches: {keyword: "shoes", timestamp: new Date()}}
];

exports.rule_fixtures = rule_fixtures;
exports.request_fixtures = request_fixtures;
exports.user_fixtures = user_fixtures;