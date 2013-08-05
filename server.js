var express = require('express'),
	courses = require('./routes/courses');
var app = express();

app.get('/courses', courses.findAll);
app.get('/courses/:date', courses.findByUnit)

// at first, get this result from localhost:3000/bsl/20130726 for example:
// {
//   "date": "20130726",
//   "name": "101",
//   "description": "fake description text"
// }

app.listen(3000);
console.log("Listening on port 3000...");