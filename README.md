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
@fugue (http://github.com/pgte/fugue)

2. Build @Matcher@ addon
Enter @matcher@ directory and run @node-waf configure && node-waf build@


# Configuration
See @settings.js@ file for examples.


# Deployment
Use nginx as frontend for node's instances.
See example of Nginx config located at @conf/nginx.conf@


# Spawning node processes
Just enter appropriate settings (@NUMBER_OF_HTTP_WORKERS@) in @conf/settings.js@ and @fugue@ will spawn it for you.
Optional. Take a look at @Fugue@ (http://github.com/pgte/fugue)


# Hints
1. Spawn one node process per CPU core.
2. Use Unix socket instead TCP connection for node process.