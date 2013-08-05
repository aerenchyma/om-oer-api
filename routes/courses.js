ab = 105; // testing

exports.findAll = function(req,res) {
	res.send([{name:ab,description:"fake super intro class", professor:"Dr. OM"}, {name:'200'}, {name:'300'}]);
};

exports.findByUnit = function(req, res) {
	res.send({unit:req.params.unit, name: "SI 101", description: "a fake intro class"});
};