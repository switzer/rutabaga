var path = require("path"),
        Mu = require('Mu');

// Override original settings
//Mu.templateRoot = '';
//Mu.templateExtension = '';

var render_to_string = function(template_path, context, callback) {
    Mu.render(template_path, context, {}, function (err, output) {
        if (err) {
            throw err;
        }
        var buffer = '';
        output.addListener('data', function (c) {buffer += c; })
                .addListener('end', function () { callback(buffer); });
    });
};

exports.render_to_string = render_to_string;
