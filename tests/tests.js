var sys = require("sys"),
    config = require('../conf/settings').Config,
    db = require("../lib/datastore").Datastore,
    fixtures = require("./_fixtures");

var binding = require("../lib/matcher");
var Rule = db.model("Rule");
var Request = db.model("Request");

var rule_fixtures = fixtures.rule_fixtures;
var request_fixtures = fixtures.request_fixtures;
var user_fixtures = fixtures.user_fixtures;


// Native(C++ extension matcher)
var matcher_native = new binding.Matcher();
// Pure(Js) matcher
var matcher_pure = new binding.PureMatcher();

// Remove all existing rules from database
Rule.remove({}, function(){
    console.log("All rules removed");
});

// Save fixtures in database
for (fixture in rule_fixtures) {
    new Rule(rule_fixtures[fixture]).save(function(){
    console.log("Saved " + rule_fixtures[fixture])})
}

// Fetch  all rules from database
// and test for matching
Rule.find().sort("bid", 1).all(function(array){
    var rules = array.reverse();

    array.forEach(function(rule){
        console.log("Loaded " + rule + ". Bid " + rule.bid);
    });

    // Testing pure matcher implementation
    console.log("Testing pure matcher");
    for (i in rules) {
        console.log("Rule -> (" , rules[i].rule, "), bid: ", rules[i].bid);
        if (matcher_pure.match(request_fixtures[0], user_fixtures[0], rules[i])) {
            console.log("True");
        }
    }

    console.log("Testing native matcher");
    for (i in rules) {
        console.log("Rule -> (" , rules[i].rule, "), bid: ", rules[i].bid);
        if (matcher_native.match(request_fixtures[0], user_fixtures[0], rules[i])) {
            console.log("True");            
        }
    }
});

