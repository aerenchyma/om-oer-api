var express = require('express'),
	courses = require('./routes/courses');
var app = express();

// TODO multiple params in the same route
// TODO expected design of request URI

// GET all courses
app.get('/courses', courses.findAll);
// GET courses with and without YT videos
app.get('/courses/:youtube', courses.youtubeBool);
// GET courses by approximate (searched) name, starting with {param}
app.get('/courses/name/:searchterm', courses.filterName);
// GET courses by exact name
app.get('/courses/find/:searchterm', courses.findName);
// GET courses by creator/copyrightholder (name to attribute, starting with {param}) // no use case for find as opposed to search (?)
app.get('/courses/creator/:namesearch', courses.findByCreator);
// GET courses by license (all cc-by-* formats, publicDomain, none == All Rights Reserved)
app.get('/courses/license/:license', courses.findByLicense);


//app.get('/courses/:unit', courses.findByUnit)

app.listen(3000);
console.log("Listening on port 3000...");