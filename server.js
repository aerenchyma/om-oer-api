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
// GET courses (more limited info) along with parent unit nid information [useful for crossreference, so far]
app.get('/units', courses.parentUnits);
// GET courses by path
app.get('courses/path/:path', courses.byPath);


//app.get('/courses/unit/:unit', courses.findByUnit)

app.listen(3000);
console.log("Listening on port 3000...");

// SELECT field_course_code_value, content_type_course.nid, field_parent_unit_nid FROM content_type_course INNER JOIN content_field_parent_unit ON content_type_course.nid LIKE content_field_parent_unit.nid WHERE field_course_code_value IS NOT NULL GROUP BY field_course_code_value
// SELECT field_course_code_value, content_type_course.nid, field_parent_unit_nid FROM content_type_course INNER JOIN content_field_parent_unit ON content_type_course.nid LIKE content_field_parent_unit.nid WHERE field_course_code_value IS NOT NULL AND field_parent_unit_id =  GROUP BY field_course_code_value