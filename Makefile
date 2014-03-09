w:
	node_modules/.bin/jade src/index.jade -o public -w

s:
	node app.js

pv:
	$(foreach file, $(shell find originals/photos -name '*' | cut -d '/' -f 3), \
		convert originals/photos/$(file) -quality 80 -resize 1000x1000 public/pv/$(file); \
	)

deploy:
	git add .
	git commit -a
	git push git@heroku.com:rachelpigott.git master
	open http://rachelpigott.com