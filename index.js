#!/usr/bin/env node
'use strict';

const cmd = require('commander');
const pkg = require('./package.json');

const generator = require('./generator');
const utils = require('./utils');

process.bin = pkg.name;

cmd.version(pkg.version)
    .option('--vars [data]', 'Use custom variables')
	.option('--delimiter [d]', 'Use another delimiter instead of #')
    .option('--package-folder [pck]', 'Set the package folder')
    .usage("<command> [options]");

cmd.command("g <name> <path> [vars]")
    .description("Generate a new stuff")
    .action((name, path, vars) => {

        if(cmd.packageFolder) 
            global.CUSTOM_PACKAGE_FOLDER = cmd.packageFolder;

        // Trying obtain xtuff config from project package.json (xtuff)
        utils.getXtuffPackageConfig().then((pckConfig) => {
            let v = vars || cmd.vars || pckConfig.vars;
            console.log(v);
            
            if(v && typeof v === 'string')
               try{ v = JSON.parse(v); } catch (err) { v = {}; console.info('INVALID VARIABLES PASSED', err); }

            const delimiter = cmd.delimiter || pckConfig.delimiter;

            generator(name, path, delimiter, v);
        });
    });

cmd.on('*', opt => {
    cmd.help();
});

cmd.parse(process.argv);

// Handle case where no command is passed (`$ xtuff`)
if (!process.argv.slice(2).length) {
    cmd.help();
}