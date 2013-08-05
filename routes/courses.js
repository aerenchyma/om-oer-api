// globals
var mysql = require('mysql');
var DATABASE = 'oerpublish';
var conn = mysql.createConnection({
	user: 'USR',
	password: 'PWD',
	host: '127.0.0.1',
	port: "3306",
});
conn.connect();

exports.findAll = function(req,res) {
	var course_details = new Array();
	var results, courseamt;
	//console.log(conn);
	conn.query('USE ' + DATABASE);
	conn.query('SELECT content_type_course.field_course_code_value AS name, content_type_course.nid AS nid, oer_analytics_youtube.totalviews AS youtube_views FROM content_type_course LEFT OUTER JOIN oer_analytics_youtube ON oer_analytics_youtube.course_nid LIKE content_type_course.nid WHERE field_course_code_value IS NOT NULL GROUP BY content_type_course.field_course_code_value',
		function(err, rows, fields) {
			if (err) throw err;
			// console.log('Result is: ', rows[0].solution);
			// console.log('There are ', rows.length, 'nodes of type course');
			courseamt = rows.length;
			results = rows;
			console.log(results);

			for (row in results) {
				course_details.push(results[row]);
			}
			res.send(course_details);
		}
	);
};

//reminder for other piece -- possible exp to diff file
exports.findByUnit = function(req, res) {
	res.send({unit:req.params.unit, name: "SI 101", description: "a fake intro class"});
};