const path = require('path');
const relative = require('relative');

const utils = require('../../utils');
const WINDOWS = 'win32';

module.exports = (v) => {
	const _this = utils.getCurrentEJSFileContext();

	let relativePath = '';

	try {
		const filePath = path.join(utils.getPackageFolder(), v);

		relativePath = relative(_this.absoluteStuffPath, filePath, false);

		let separatorExp = /\//g;
		if(process.platform === WINDOWS){
            relativePath = relativePath.replace(/\\/g, '/'); // Fix windows path 
            separatorExp = /\\/g;
        }

        /* Relative with stuff subfolders: */
        let subfoldersNumber = 0;
        const subfolders = _this.destinyPath.replace(_this.cacheStuffFolderPath, '').match(separatorExp);
        if(subfolders) subfoldersNumber = subfolders.length-1;

        for(let i = 0; i < subfoldersNumber; i++)
        	relativePath = '../'+relativePath;
    }catch (err) {
    	console.info(`Error obtain the relative path for ${filePath}`, err);
    }

    return relativePath;
}