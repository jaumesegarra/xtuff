const jsonizer = (data, reject) => {
	let json = null;

	try {
		json = JSON.parse(data);
	}catch(err) { reject(err); };

	return json;
}

module.exports = (vars) => new Promise((resolve, reject) => {
	if(/^\{.*\}$/.test(vars)){
		let o = jsonizer(vars, reject);

		resolve(o);

	}else{
		reject('not supported yet...');
	}
});