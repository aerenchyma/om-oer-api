exports.findAll = function(req,res) {
	res.send([{name:'100'}, {name:'200'}, {name:'300'}]);
};

exports.findByUnit = function(req, res) {
	res.send({unit:req.params.unit, name: "SI 101", description: "a fake intro class"});
};