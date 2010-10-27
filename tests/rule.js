var sys = require("sys"),
    config = require('../settings').Config,    
    fixtures = require("./_fixtures"),
    assert = require("assert");


var Matcher = function() {};
Matcher.prototype.match = function(request, user, rule) {
    return eval(rule.rule);
};

var m = new Matcher();

var request = fixtures.request_fixtures[0];
var user = fixtures.user_fixtures[0];
var rules = fixtures.rule_fixtures;

for (i in rules) {
    console.log("Rule -> (" , rules[i].rule, "), bid: ", rules[i].bid);
    console.log("Result -> ", m.match(request, user, rules[i]));
    console.log("\n");
}
