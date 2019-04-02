const path = require('path');

const TEMPLATE_FOLDER_NAME = '_templates_';

const getPackageFolder = () => path.join(__dirname, '');
const getTemplatesFolder = () => path.join(getPackageFolder(), TEMPLATE_FOLDER_NAME);

module.exports = {
    getTemplatesFolder,
    TEMPLATE_FOLDER_NAME
}