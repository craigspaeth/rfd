var express = require('express'),
    fs = require('fs'),
    port = process.env.PORT || 4000,
    app = express();

app.locals.logoCaptions = [
  "Logo design for business that provides serviced apartment accommodation to both corporate and leisure guests",
  "Logo design for dairy company in Wisconsin",
  "Logo design for children's ski company in Vail, Colorado",
  "Logo design for skateboarding company in Salt Lake City, UT",
  "Logo and skateboard design for skateboarding company in Salt Lake City, UT",
  "Logo design for a new backyard beanbag-toss game company based in Saskatoon, Saskatchewan, Canada",
  "Logo design for artisan jewelry design company",
  "Logo design for a health coaching company",
  "Logo design for naturopathic clinic specializing in digestive health",
  "Logo design for makeup brand that fills scars and deep pores",
  "Logo design for aftermarket auto parts dealer in Singapore",
  "T-shirt design for startup company that sells guidance to other start-ups"
];

app.locals.filmCaptions = [
  "HBO Documentary: Reagan, Assistant Online Editor, Film Credit",
  "Alex Gibney Documentary: Magic Trip, Second Assistant Online Editor",
  "HBO Television Show: TREME (Season Two), DI Conform- Main Titles",
  "HBO Television Show: TREME (Season One), Dailies Assistant",
  "Winner, Set to Screen Series Contest from Director Baz Luhrmann, Fox, & Apple, 2008"
];

app.set('views', __dirname + '/src');
app.set('view engine', 'jade');
app.get('/', function(req, res) {
  res.render('index');
});
app.get('/design', function(req, res) {
  res.render('design');
});
app.get('/video', function(req, res) {
  res.render('video');
});
app.use(express.static(__dirname + '/public'));
app.use(express.favicon(__dirname + "/public/images/favicon.ico")); 
app.listen(port, function() {
  console.log('Listening on ' + port);
});