// globals
var mysql = require('mysql');
var DATABASE = 'oerpublish';
var conn = mysql.createConnection({
	user: 'oerpublisher',
	password: 'iamone2',
	host: '127.0.0.1',
	port: "3306",
});
conn.connect();


/*****/


exports.findAll = function(req,res) {
	var course_details = new Array();
	var results, courseamt;
	//console.log(conn);
	conn.query('USE ' + DATABASE);
	conn.query("SELECT content_type_course.field_course_code_value AS name, content_type_course.nid AS nid, url_alias.dst AS path, creativecommons_node.license_uri as license, creativecommons_node.attributionName as creator, oer_analytics_courses.totalviews as course_views, oer_analytics_youtube.totalviews as youtube_views FROM content_type_course LEFT OUTER JOIN oer_analytics_courses ON content_type_course.nid = oer_analytics_courses.nid LEFT OUTER JOIN creativecommons_node ON content_type_course.nid = creativecommons_node.nid LEFT OUTER JOIN url_alias ON url_alias.src LIKE CONCAT('node/', content_type_course.nid) LEFT OUTER JOIN oer_analytics_youtube ON content_type_course.nid = oer_analytics_youtube.course_nid WHERE field_course_code_value IS NOT NULL GROUP BY content_type_course.field_course_code_value",

		function(err, rows, fields) {
			if (err) throw err;
			courseamt = rows.length;
			results = rows;
			console.log(results);
			for (row in results) {
				course_details.push(results[row]);
			}
			res.send({number_of_courses: courseamt, course_details: course_details}); 
		}
	);
};

exports.byPath = function(req,res) {
	var course_details = new Array();
	var results, courseamt;
	var pt = req.params.path;
	//console.log(conn);
	conn.query('USE ' + DATABASE);
	conn.query("SELECT content_type_course.field_course_code_value AS name, content_type_course.nid AS nid, url_alias.dst AS path, creativecommons_node.license_uri as license, creativecommons_node.attributionName as creator, oer_analytics_courses.totalviews as course_views, oer_analytics_youtube.totalviews as youtube_views FROM content_type_course LEFT OUTER JOIN oer_analytics_courses ON content_type_course.nid = oer_analytics_courses.nid LEFT OUTER JOIN creativecommons_node ON content_type_course.nid = creativecommons_node.nid LEFT OUTER JOIN url_alias ON url_alias.src LIKE CONCAT('node/', content_type_course.nid) LEFT OUTER JOIN oer_analytics_youtube ON content_type_course.nid = oer_analytics_youtube.course_nid WHERE url_alias.dst LIKE '" + pt + "' AND field_course_code_value IS NOT NULL GROUP BY content_type_course.field_course_code_value",

		function(err, rows, fields) {
			if (err) throw err;
			courseamt = rows.length;
			results = rows;
			console.log(results);
			for (row in results) {
				course_details.push(results[row]);
			}
			res.send({course_details: course_details}); 
		}
	);
};

exports.youtubeBool = function(req, res) { // issue -- the param in this REST URL is unlike usual request/params structure.
	var course_details = new Array();
	var results, courseamt;
	var yt = req.params.youtube;
	//yt = yt.slice(1,).replace('%2F','/');
	conn.query('USE ' + DATABASE);
	if (yt == 'vids') {
		conn.query("SELECT content_type_course.field_course_code_value AS name, content_type_course.nid AS nid, url_alias.dst as path, creativecommons_node.license_uri as license, creativecommons_node.attributionName as creator, oer_analytics_youtube.totalviews as youtube_views FROM content_type_course LEFT OUTER JOIN url_alias ON url_alias.src LIKE CONCAT('node/', content_type_course.nid) LEFT OUTER JOIN creativecommons_node ON content_type_course.nid = creativecommons_node.nid RIGHT OUTER JOIN oer_analytics_youtube ON oer_analytics_youtube.course_nid LIKE content_type_course.nid WHERE field_course_code_value IS NOT NULL GROUP BY content_type_course.field_course_code_value",
			function(err, rows, fields) {
				if (err) throw err;
				courseamt = rows.length;
				results = rows;
				console.log(results);
				for (row in results) {
					course_details.push(results[row]);
				}
				res.send({courses_with_youtube: courseamt, course_details: course_details});
			}
		);
	}
	else if (yt == 'no-vids') {
		conn.query("SELECT content_type_course.field_course_code_value AS name, content_type_course.nid AS nid, url_alias.dst as path, creativecommons_node.license_uri as license, creativecommons_node.attributionName as creator, oer_analytics_youtube.totalviews as youtube_views FROM content_type_course LEFT OUTER JOIN url_alias ON url_alias.src LIKE CONCAT('node/', content_type_course.nid) LEFT OUTER JOIN creativecommons_node ON content_type_course.nid = creativecommons_node.nid LEFT OUTER JOIN oer_analytics_youtube ON oer_analytics_youtube.course_nid = content_type_course.nid WHERE oer_analytics_youtube.course_nid IS null AND field_course_code_value IS NOT NULL GROUP BY content_type_course.field_course_code_value",
			function(err, rows, fields) {
				if (err) throw err;
				courseamt = rows.length;
				results = rows;
				console.log(results);
				for (row in results) {
					course_details.push(results[row]);
				}
				res.send({courses_without_youtube: courseamt, course_details: course_details});
			}
		);
	}

}

exports.filterName = function(req, res) {
	var results;
	var course_details = new Array();
	conn.query('USE ' + DATABASE);
	var filter = req.params.searchterm;
	conn.query("SELECT content_type_course.field_course_code_value AS name, content_type_course.nid AS nid, url_alias.dst as path, creativecommons_node.license_uri as license, creativecommons_node.attributionName as creator, oer_analytics_youtube.totalviews as youtube_views FROM content_type_course LEFT OUTER JOIN url_alias ON url_alias.src LIKE CONCAT('node/', content_type_course.nid) LEFT OUTER JOIN creativecommons_node ON content_type_course.nid = creativecommons_node.nid LEFT OUTER JOIN oer_analytics_youtube ON oer_analytics_youtube.course_nid LIKE content_type_course.nid WHERE field_course_code_value LIKE '" + filter + "%' GROUP BY content_type_course.field_course_code_value",
		function(err, rows, fields) {
			if (err) throw err;
			results = rows;
			console.log(results);
			for (row in results) {
				course_details.push(results[row]);
			}
			res.send({course_details:course_details});
		}
	);
}


exports.findName = function(req, res) {
	var results;
	var course_details = new Array();
	conn.query('USE ' + DATABASE);
	var filter = req.params.searchterm;
	conn.query("SELECT content_type_course.field_course_code_value AS name, content_type_course.nid AS nid, url_alias.dst as path, creativecommons_node.license_uri as license, creativecommons_node.attributionName as creator, oer_analytics_youtube.totalviews as youtube_views FROM content_type_course LEFT OUTER JOIN url_alias ON url_alias.src LIKE CONCAT('node/', content_type_course.nid) LEFT OUTER JOIN creativecommons_node ON content_type_course.nid = creativecommons_node.nid LEFT OUTER JOIN oer_analytics_youtube ON oer_analytics_youtube.course_nid LIKE content_type_course.nid WHERE field_course_code_value LIKE '" + filter + "' GROUP BY content_type_course.field_course_code_value",
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

exports.findByCreator = function(req, res) {
	var results, courseamt;
	var course_details = new Array();
	conn.query('USE ' + DATABASE);
	var crName = req.params.namesearch;
	conn.query("SELECT content_type_course.field_course_code_value AS name, content_type_course.nid AS nid, url_alias.dst as path, creativecommons_node.license_uri as license, creativecommons_node.attributionName as creator, oer_analytics_youtube.totalviews as youtube_views FROM content_type_course LEFT OUTER JOIN url_alias ON url_alias.src LIKE CONCAT('node/', content_type_course.nid) LEFT OUTER JOIN creativecommons_node ON content_type_course.nid = creativecommons_node.nid LEFT OUTER JOIN oer_analytics_youtube ON oer_analytics_youtube.course_nid LIKE content_type_course.nid WHERE attributionName LIKE '" + crName + "%' GROUP BY content_type_course.field_course_code_value",
		function(err, rows, fields) {
			if (err) throw err;
			results = rows;
			courseamt = rows.length;
			console.log(results);
			for (row in results) {
				course_details.push(results[row]);
			}
			res.send({number_of_courses: courseamt, course_details:course_details});
		}
	);
}

exports.parentUnits = function(req, res) {
	var results;
	var course_details = new Array();
	conn.query('USE ' + DATABASE);
	//var unitNID = req.params.unit;
	conn.query("SELECT field_course_code_value as name, content_type_course.nid as nid, field_parent_unit_nid as parent_nid, search_node_links.caption as parent FROM content_type_course INNER JOIN content_field_parent_unit ON content_type_course.nid LIKE content_field_parent_unit.nid LEFT OUTER JOIN search_node_links ON search_node_links.nid = field_parent_unit_nid WHERE field_course_code_value IS NOT NULL GROUP BY field_course_code_value",
		function(err, rows, fields) {
			if (err) throw err;
			results = rows;
			console.log(results);
			for (row in results) {
				course_details.push(results[row]);
			}
			res.send({course_details: course_details});
		}	
	);

}

exports.findByLicense = function(req, res) {
	var results, courseamt;
	var course_details = new Array();
	conn.query('USE ' + DATABASE);
	var lic = req.params.license;
	if (lic == "by") {
		conn.query("SELECT content_type_course.field_course_code_value AS name, content_type_course.nid AS nid, url_alias.dst as path, creativecommons_node.license_uri as license, oer_analytics_youtube.totalviews as youtube_views FROM content_type_course LEFT OUTER JOIN url_alias ON url_alias.src LIKE CONCAT('node/', content_type_course.nid) LEFT OUTER JOIN creativecommons_node ON content_type_course.nid = creativecommons_node.nid LEFT OUTER JOIN oer_analytics_youtube ON content_type_course.nid = oer_analytics_youtube.course_nid WHERE field_course_code_value IS NOT NULL AND license_uri LIKE 'http://creativecommons.org/licenses/by/3.0/' GROUP BY content_type_course.field_course_code_value",
			function(err, rows, fields) {
				if (err) throw err;
				courseamt = rows.length;
				results = rows;
				console.log(results);
				for (row in results) {
					course_details.push(results[row]);
				}
				res.send({number_courses: courseamt, course_details:course_details});
			}
		);
	} else if (lic == "by-sa") {
		conn.query("SELECT content_type_course.field_course_code_value AS name, content_type_course.nid AS nid, url_alias.dst as path, creativecommons_node.license_uri as license, oer_analytics_youtube.totalviews as youtube_views FROM content_type_course LEFT OUTER JOIN url_alias ON url_alias.src LIKE CONCAT('node/', content_type_course.nid) LEFT OUTER JOIN creativecommons_node ON content_type_course.nid = creativecommons_node.nid LEFT OUTER JOIN oer_analytics_youtube ON content_type_course.nid = oer_analytics_youtube.course_nid WHERE field_course_code_value IS NOT NULL AND license_uri LIKE 'http://creativecommons.org/licenses/by-sa/3.0/' GROUP BY content_type_course.field_course_code_value",
			function(err, rows, fields) {
				if (err) throw err;
				courseamt = rows.length;
				results = rows;
				console.log(results);
				for (row in results) {
					course_details.push(results[row]);
				}
				res.send({number_courses: courseamt, course_details:course_details});
			}
		);
	} else if (lic == "by-nc-sa") {
		conn.query("SELECT content_type_course.field_course_code_value AS name, content_type_course.nid AS nid, url_alias.dst as path, creativecommons_node.license_uri as license, oer_analytics_youtube.totalviews as youtube_views FROM content_type_course LEFT OUTER JOIN url_alias ON url_alias.src LIKE CONCAT('node/', content_type_course.nid) LEFT OUTER JOIN creativecommons_node ON content_type_course.nid = creativecommons_node.nid LEFT OUTER JOIN oer_analytics_youtube ON content_type_course.nid = oer_analytics_youtube.course_nid WHERE field_course_code_value IS NOT NULL AND license_uri LIKE 'http://creativecommons.org/licenses/by-nc-sa/3.0/' GROUP BY content_type_course.field_course_code_value",
			function(err, rows, fields) {
				if (err) throw err;
				courseamt = rows.length;
				results = rows;
				console.log(results);
				for (row in results) {
					course_details.push(results[row]);
				}
				res.send({number_courses: courseamt, course_details:course_details});
			}
		);
	} else if (lic == "by-nc") {
		conn.query("SELECT content_type_course.field_course_code_value AS name, content_type_course.nid AS nid, url_alias.dst as path, creativecommons_node.license_uri as license, oer_analytics_youtube.totalviews as youtube_views FROM content_type_course LEFT OUTER JOIN url_alias ON url_alias.src LIKE CONCAT('node/', content_type_course.nid) LEFT OUTER JOIN creativecommons_node ON content_type_course.nid = creativecommons_node.nid LEFT OUTER JOIN oer_analytics_youtube ON content_type_course.nid = oer_analytics_youtube.course_nid WHERE field_course_code_value IS NOT NULL AND license_uri LIKE 'http://creativecommons.org/licenses/by-nc/3.0/' GROUP BY content_type_course.field_course_code_value",
			function(err, rows, fields) {
				if (err) throw err;
				courseamt = rows.length;
				results = rows;
				console.log(results);
				for (row in results) {
					course_details.push(results[row]);
				}
				res.send({number_courses: courseamt, course_details:course_details});
			}
		);
	} else if (lic == "by-nc-nd") {
		conn.query("SELECT content_type_course.field_course_code_value AS name, content_type_course.nid AS nid, url_alias.dst as path, creativecommons_node.license_uri as license, oer_analytics_youtube.totalviews as youtube_views FROM content_type_course LEFT OUTER JOIN url_alias ON url_alias.src LIKE CONCAT('node/', content_type_course.nid) LEFT OUTER JOIN creativecommons_node ON content_type_course.nid = creativecommons_node.nid LEFT OUTER JOIN oer_analytics_youtube ON content_type_course.nid = oer_analytics_youtube.course_nid WHERE field_course_code_value IS NOT NULL AND license_uri LIKE 'http://creativecommons.org/licenses/by-nc-nd/3.0/' GROUP BY content_type_course.field_course_code_value",
			function(err, rows, fields) {
				if (err) throw err;
				courseamt = rows.length;
				results = rows;
				console.log(results);
				for (row in results) {
					course_details.push(results[row]);
				}
				res.send({number_courses: courseamt, course_details:course_details});
			}
		);
	} else if (lic == "publicDomain") {
		conn.query("SELECT content_type_course.field_course_code_value AS name, content_type_course.nid AS nid, url_alias.dst as path, creativecommons_node.license_uri as license, oer_analytics_youtube.totalviews as youtube_views FROM content_type_course LEFT OUTER JOIN url_alias ON url_alias.src LIKE CONCAT('node/', content_type_course.nid) LEFT OUTER JOIN creativecommons_node ON content_type_course.nid = creativecommons_node.nid LEFT OUTER JOIN oer_analytics_youtube ON content_type_course.nid = oer_analytics_youtube.course_nid WHERE field_course_code_value IS NOT NULL AND license_uri LIKE 'http://creativecommons.org/publicdomain/zero/1.0/' GROUP BY content_type_course.field_course_code_value",
			function(err, rows, fields) {
				if (err) throw err;
				courseamt = rows.length;
				results = rows;
				console.log(results);
				for (row in results) {
					course_details.push(results[row]);
				}
				res.send({number_courses: courseamt, course_details:course_details});
			}
		);
	} else if (lic == "none") {
		conn.query("SELECT content_type_course.field_course_code_value AS name, content_type_course.nid AS nid, url_alias.dst AS path, creativecommons_node.license_uri as license, oer_analytics_youtube.totalviews as youtube_views FROM content_type_course LEFT OUTER JOIN url_alias ON url_alias.src LIKE CONCAT('node/', content_type_course.nid) LEFT OUTER JOIN creativecommons_node ON content_type_course.nid = creativecommons_node.nid LEFT OUTER JOIN oer_analytics_youtube ON content_type_course.nid = oer_analytics_youtube.course_nid WHERE field_course_code_value IS NOT NULL AND license_uri LIKE '' GROUP BY content_type_course.field_course_code_value",
			function(err, rows, fields) {
				if (err) throw err;
				courseamt = rows.length;
				results = rows;
				console.log(results);
				for (row in results) {
					course_details.push(results[row]);
				}
				res.send({number_courses: courseamt, course_details:course_details});
			}
		);
	}
}


//find by unit -- not real impl atm
// exports.findByUnit = function(req, res) {
// 	res.send({unit:req.params.unit, name: "SI 101", description: "a fake intro class"});
// };

// end