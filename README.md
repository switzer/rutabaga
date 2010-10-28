# Overview

Rutabaga is an open source framework for responding to ad exchanges, like OpenX and AdX. The purpose of Rutabaga is to build infrastructure to communicate directly with ad exchanges, so that advertisers, ad networks, DSP’s, and other bidders can easily build functionality on top, rather than building a scalable, low level stack. Rutabags is written in Javascript using Node.js, with a MongoDB back end.


# Installation

0. Install nodejs and mongodb as usual.

1. Ensure that you have following node libraries in NODE_PATH (http://nodejs.org/api.html#module-resolving-325):
@node-mongodb-native@ (http://github.com/christkv/node-mongodb-native)
@mongoose@ (http://github.com/LearnBoost/mongoose)
@node-protobuf@ (http://github.com/exslim/node-protobuf)
@Mu@ (http://github.com/raycmorgan/Mu)
@hashlib@ (http://github.com/brainfucker/hashlib)

2. Build @Matcher@ addon
Enter @matcher@ directory and run @node-waf configure && node-waf build@

# Configuration
See @conf/settings.js@ and @conf/webserver.js@ files for examples.

# Run
Don't forget to run mongodb before rutabaga app.
See @tests@ directory.

# Deployment
Use nginx as frontend for node's instances.
See example of Nginx config located at @conf/nginx.conf@


# Spawning node processes
See @docs/api.md@ for examples.
Optional. Take a look at @Fugue@ (http://github.com/pgte/fugue)


# Hints
1. Spawn one node process per CPU core.
2. Use Unix socket instead TCP connection for node process if possible.