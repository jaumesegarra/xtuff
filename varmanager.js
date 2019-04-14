module.exports = (vars) => new Promise((resolve, reject) => {
	if(/^\{.*\}$/.test(vars)){
		let o;

		try {
			o = JSON.parse(vars);
		}catch(err) { reject(err); };

		resolve(o);

	}else{
		reject('comming...');
	}
});