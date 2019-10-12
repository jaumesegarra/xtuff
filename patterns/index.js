const username = require('./username');
const cc = require('./cc');
const sc = require('./sc');
const kc = require('./kc');
const uc = require('./uc');
const lc = require('./lc');
const cz = require('./cz');
const ls = require('./ls');
const now = require('./now');
const replace = require('./replace');
const path = require('./path');

const lettercasePatterns = {
	cc,
	sc,
	kc,
	uc,
	lc,
	cz,
	ls
};

const infoPatterns = {
	username,
	now
};

module.exports = {
	notAvailableOnFilenames: ['path', 'replace'],
	list: {
		...lettercasePatterns,
		...infoPatterns,
		path,
		replace
	}
}