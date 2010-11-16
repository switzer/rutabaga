# Overview

Rutabaga is an open source framework for responding to ad exchanges, like OpenX and AdX. The purpose of Rutabaga is to build infrastructure to communicate directly with ad exchanges, so that advertisers, ad networks, DSP’s, and other bidders can easily build functionality on top, rather than building a scalable, low level stack. Rutabags is written in Javascript using Node.js, with a MongoDB back end.

# Requirements
nodejs, mongodb


# Installation
1. Install dependencies with npm:
```
npm install mongodb mongoose https://github.com/exslim/node-protobuf/tarball/master https://github.com/exslim/Mu/tarball/master https://github.com/exslim/hashlib/tarball/master
```

2. Pull the *dev* branch of repo and run:
```
make
```

3. See *Run* section.

# Configuration
See `conf/settings.js and` `conf/webserver.js` files for examples.

# Run
```node rtb.js```

Optionally you may pass port as an argument

```node rtb.js 8080```

# Deployment
Use nginx as frontend for node's instances.
See example of Nginx config located at `conf/nginx.conf`

# Hints
1. Spawn one node process per CPU core.
2. Use Unix socket instead TCP connection for node process if possible.