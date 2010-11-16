var binding = require("./matcher/build/default/matcher");

var PureMatcher = function() {};
PureMatcher.prototype.match = function(request, user, rule) {
    return eval(rule.rule);
};

exports.Matcher = binding.Matcher;
exports.PureMatcher = PureMatcher;