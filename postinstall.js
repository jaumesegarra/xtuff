#!/usr/bin/env node
'use strict';

const path = require('path');
const fs = require('fs-extra');
const utils = require('./utils.js');

const templateFolder = path.join(__dirname, utils.TEMPLATE_FOLDER_NAME);
const templateDestinyFolder = utils.getTemplatesFolder();

if (!fs.existsSync(templateDestinyFolder)) {
	fs.copy(templateFolder, templateDestinyFolder, err => {
    		if (err) return console.error(err);
	});
}