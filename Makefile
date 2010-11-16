.PHONY: all

all:
	cd ./lib/matcher && node-waf configure && node-waf build
