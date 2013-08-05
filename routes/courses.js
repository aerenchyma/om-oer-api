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

// exports.findAll = function(req,res) {
// 	res.send([{name:ab,description:"fake super intro class", professor:"Dr. OM"}, {name:'200'}, {name:'300'}]);
// };


exports.findAll = function(req,res) {
	var course_details = new Array();
	var results, courseamt;
	//console.log(conn);
	conn.query('USE ' + DATABASE);
	conn.query('SELECT field_course_code_value AS name FROM content_type_course WHERE field_course_code_value IS NOT NULL GROUP BY field_course_code_value',
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

exports.findByUnit = function(req, res) {
	res.send({unit:req.params.unit, name: "SI 101", description: "a fake intro class"});
};