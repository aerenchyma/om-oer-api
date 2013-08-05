// globals (?)
var mysql = require('mysql');

var DATABASE = 'oerpublish';
var conn = mysql.createConnection({
	user: 'USR',
	password: 'PWD',
	host: '127.0.0.1',
	port: "3306",
});
conn.connect();

var course_details;
// exports.findAll = function(req,res) {
// 	res.send([{name:ab,description:"fake super intro class", professor:"Dr. OM"}, {name:'200'}, {name:'300'}]);
// };


exports.findAll = function(req,res) {
	var course_details = new Array();
	var courseamt;
	var results, stats_res;
	//console.log(conn);
	conn.query('USE ' + DATABASE);
	conn.query("SELECT content_type_course.field_course_code_value AS name, content_type_course.nid as nid FROM content_type_course WHERE field_course_code_value IS NOT NULL AND content_type_course.field_content_type_value LIKE 'course' GROUP BY field_course_code_value",
		function(err, rows, fields) {
			if (err) throw err;

			courseamt = rows.length;
			results = rows;
			console.log(results);

			for (row in results) {
				course_details.push(results[row]);
			}
			//res.send(course_details);
		}
	);

	//conn.query("SELECT totalviews AS views, nid as nid FROM oer_analytics_courses WHERE ")

	for (x in course_details) {
		x["views"] = 
	}
};



exports.findByUnit = function(req, res) {
	res.send({unit:req.params.unit, name: "SI 101", description: "a fake intro class"});
};