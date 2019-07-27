const moment = require('moment');

module.exports = (format) => {
	let value = '';

    try{
        const momm = moment();
        value = momm.format(format);
    }catch (err){
        console.info('Not a valid format for the date!', err);
    }

    return value;
}