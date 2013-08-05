var express = require('express'),
	courses = require('./routes/courses');
var app = express();

app.get('/courses', courses.findAll);
app.get('/courses/:date', courses.findByUnit)

app.listen(3000);
console.log("Listening on port 3000...");