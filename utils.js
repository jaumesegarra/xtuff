const path = require('path');
const fs = require('fs');

const TEMPLATE_FOLDER_NAME = '_templates_';

const getPackageFolder = () => path.join(__dirname, '../../');
const getTemplatesFolder = () => path.join(getPackageFolder(), TEMPLATE_FOLDER_NAME);

const getXtuffPackageConfig = () => new Promise((resolve, reject) => {
	const pkgPath = path.join(getPackageFolder(), 'package.json');
	if(fs.existsSync(pkgPath)){ // Check if the project has a package.json
		const pkg = require('../../package.json');

		const config = pkg.xtuff || {};

		resolve(config);

	} else resolve({});
});

module.exports = {
	getPackageFolder,
    getTemplatesFolder,
    getXtuffPackageConfig,
    TEMPLATE_FOLDER_NAME
}