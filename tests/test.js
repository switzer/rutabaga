var sys = require("sys"),
    config = require('./settings').Config,
    db = require("./datastore").Datastore;


var binding = require("./matcher");

//console.log(sys.inspect(Matcher, true, 2));

var Rule = db.model("Rule");
var Request = db.model("Request");

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

var m = new binding.Matcher();
var rules = rule_fixtures;
for (i in rules) {
     console.log( "Processing rule -> " , rules[i].rule, " with bid: ", rules[i].bid, " Result ->", m.match(request_fixtures[0], user_fixtures[0], rules[i]));
}














Rule.remove({}, function(){
    console.log("All rules removed");
});

for (fixture in rule_fixtures) {
    new Rule(rule_fixtures[fixture]).save(function(){
    console.log("Saved " + rule_fixtures[fixture])})
}


Rule.find().sort("bid", 1).all(function(array){
    var rules = array.reverse();

    array.forEach(function(rule){
        console.log("Loaded " + rule + ". Bid " + rule.bid);
    });

    var match_condition = function(request, user, rule) {
        return eval(rule.rule);
    };


    // Test against rules
    for (i in rules) {
        //process rule
        //console.log([rules[i].rule, rules[i].bid]);
        if (match_condition(request_fixtures[0], user_fixtures[0], rules[i])) {
            console.log(rules[i].bid);
            return rules[i];
        }
    }
});

