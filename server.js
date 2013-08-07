var express = require('express'),
	courses = require('./routes/courses');
var app = express();

// TODO multiple params in the same route, e.g. no-vids and searchterm
// with the correct actions

app.get('/courses', courses.findAll);
app.get('/courses/:youtube', courses.youtubeBool);

app.get('/courses/name/:searchterm', courses.filterName);
app.get('/courses/find/:searchterm', courses.findName);

app.get('/courses/creator/:namesearch', courses.findByCreator);

app.get('/courses/license/:license', courses.findByLicense);


app.get('/courses/:unit', courses.findByUnit)

app.listen(3000);
console.log("Listening on port 3000...");