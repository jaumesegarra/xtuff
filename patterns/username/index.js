const os = require('os');

let username = '';

try {
	username = os.userInfo().username;
}catch (err) { 
	console.error('Error trying to obtain username', err);
}

module.exports = username;