#!/usr/bin/env node
'use strict';

const { program } = require('commander');
const pkg = require('./package.json');

const generator = require('./generator');
const utils = require('./utils');

process.bin = pkg.name;

program.version(pkg.version)
    .option('--vars [data]', 'Use custom variables')
	.option('--delimiter [d]', 'Use another delimiter instead of #')
    .option('--package-folder [pck]', 'Set the package folder')
    .usage("<command> [options]");

program.command("g <name> <path> [vars]")
    .description("Generate a new stuff")
    .action((name, path, vars) => {

        if(program.packageFolder) 
            global.CUSTOM_PACKAGE_FOLDER = program.packageFolder;

        // Trying obtain xtuff config from project package.json (xtuff)
        utils.getXtuffPackageConfig().then((pckConfig) => {
            let v = vars || program.vars || pckConfig.vars;
            
            if(v && typeof v === 'string')
               try{ v = JSON.parse(v); } catch (err) { v = {}; console.info('INVALID VARIABLES PASSED', err); }

            const delimiter = program.delimiter || pckConfig.delimiter;

            generator(name, path, delimiter, v);
        });
    });

program.on('*', opt => {
    cmd.help();
});

program.parse(process.argv);

// Handle case where no command is passed (`$ xtuff`)
if (!process.argv.slice(2).length) {
    program.help();
}