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

/* TODOS */
// 1st priority
// TODO: add license to course details
// TODO: add instructor, creator/maybe dscribe? info to course details
// TODO: filter by instructor
// TODO: filter by license
// TODO: filter by department, unit
// TODO: filter by tag
// 2nd priority
// TODO: filter by number of materials
// TODO: filter by type of materials
// 3rd priority:
// TODO change db s.t. it grabs G.A. info, YT comments
//   and allow for queries for those
// TODO poss grab other useful U-M info about courses, or even direct from materials where appropriate (latter unlikely)


exports.findAll = function(req,res) {
	var course_details = new Array();
	var results, courseamt;
	//console.log(conn);
	conn.query('USE ' + DATABASE);
	conn.query('SELECT content_type_course.field_course_code_value AS name, content_type_course.nid AS nid, oer_analytics_youtube.totalviews AS youtube_views FROM content_type_course LEFT OUTER JOIN oer_analytics_youtube ON oer_analytics_youtube.course_nid LIKE content_type_course.nid WHERE field_course_code_value IS NOT NULL GROUP BY content_type_course.field_course_code_value',
		function(err, rows, fields) {
			if (err) throw err;
			courseamt = rows.length;
			results = rows;
			console.log(results);
			for (row in results) {
				course_details.push(results[row]);
			}
			res.send({number_of_courses: courseamt, courses: course_details}); 
		}
	);
};

exports.youtubeBool = function(req, res) { // issue -- the param in this REST URL does not look like your usual request/params structure. should test with app or something.
	var course_details = new Array();
	var results, courseamt;
	var yt = req.params.youtube;
	conn.query('USE ' + DATABASE);
	if (yt == 'vids') {
		conn.query('SELECT content_type_course.field_course_code_value AS name, content_type_course.nid AS nid, oer_analytics_youtube.totalviews AS youtube_views FROM content_type_course RIGHT OUTER JOIN oer_analytics_youtube ON oer_analytics_youtube.course_nid LIKE content_type_course.nid WHERE field_course_code_value IS NOT NULL GROUP BY content_type_course.field_course_code_value',
			function(err, rows, fields) {
				if (err) throw err;
				// console.log('Result is: ', rows[0].solution);
				// console.log('There are ', rows.length, 'nodes of type course');
				courseamt = rows.length;
				results = rows;
				console.log(results);
				//course_details.push({number_of_courses:courseamt}); // hmm
				for (row in results) {
					course_details.push(results[row]);
				}
				res.send({courses_with_youtube: courseamt, courses: course_details});
			}
		);
	}
	else if (yt == 'no-vids') {
		conn.query('SELECT content_type_course.field_course_code_value AS name, content_type_course.nid AS nid, oer_analytics_youtube.totalviews AS youtube_views FROM content_type_course LEFT OUTER JOIN oer_analytics_youtube ON oer_analytics_youtube.course_nid = content_type_course.nid WHERE oer_analytics_youtube.course_nid IS null AND field_course_code_value IS NOT NULL GROUP BY content_type_course.field_course_code_value',
			function(err, rows, fields) {
				if (err) throw err;
				courseamt = rows.length;
				results = rows;
				console.log(results);
				for (row in results) {
					course_details.push(results[row]);
				}
				res.send({courses_without_youtube: courseamt, courses: course_details});
			}
		);
	}

}

exports.filterName = function(req, res) {
	var results;
	var course_details = new Array();
	conn.query('USE ' + DATABASE);
	var filter = req.params.searchterm;
	conn.query("SELECT content_type_course.field_course_code_value AS name, content_type_course.nid AS nid, oer_analytics_youtube.totalviews AS youtube_views FROM content_type_course LEFT OUTER JOIN oer_analytics_youtube ON oer_analytics_youtube.course_nid LIKE content_type_course.nid WHERE field_course_code_value LIKE '" + filter + "%' GROUP BY content_type_course.field_course_code_value",
		function(err, rows, fields) {
			if (err) throw err;
			results = rows;
			console.log(results);
			for (row in results) {
				course_details.push(results[row]);
			}
			res.send({course_details:course_details});
		}
	)
}


exports.findName = function(req, res) {
	var results;
	var course_details = new Array();
	conn.query('USE ' + DATABASE);
	var filter = req.params.searchterm;
	conn.query("SELECT content_type_course.field_course_code_value AS name, content_type_course.nid AS nid, oer_analytics_youtube.totalviews AS youtube_views FROM content_type_course LEFT OUTER JOIN oer_analytics_youtube ON oer_analytics_youtube.course_nid LIKE content_type_course.nid WHERE field_course_code_value LIKE '" + filter + "' GROUP BY content_type_course.field_course_code_value",
		function(err, rows, fields) {
			if (err) throw err;
			results = rows;
			console.log(results);
			for (row in results) {
				course_details.push(results[row]);
			}
			res.send({course_details:course_details});
		}
	)
}

//reminder for other piece -- possible exp to diff file
//find in a certain way
exports.findByUnit = function(req, res) {
	res.send({unit:req.params.unit, name: "SI 101", description: "a fake intro class"});
};


// also need larger aggregation.