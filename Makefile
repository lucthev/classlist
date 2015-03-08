# Various programs
browserify := ./node_modules/.bin/browserify
karma := ./node_modules/.bin/karma

classlist.min.js: classlist.js
	$(browserify) -s ClassList $< -o $@

clean:
	rm -rf classlist.min.js node_modules

test: classlist.min.js
	$(karma) start

publish: classlist.min.js
	npm publish

.PHONY: clean lint test publish
