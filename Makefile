browserify := ./node_modules/.bin/browserify
standard := ./node_modules/.bin/standard

classlist.min.js: classlist.js
	$(browserify) -s ClassList $< -o $@

clean:
	rm -f classlist.min.js

test: classlist.min.js
	$(standard) classlist.js test.js
	node test.js

publish: classlist.min.js
	npm publish

.PHONY: clean test publish
