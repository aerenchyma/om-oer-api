var express = require('express'),
	courses = require('./routes/courses');
var app = express();

app.get('/courses', courses.findAll);
app.get('/courses/:youtube', courses.youtubeBool);

app.get('/courses/:unit', courses.findByUnit)

app.listen(3000);
console.log("Listening on port 3000...");