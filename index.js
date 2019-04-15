#!/usr/bin/env node
'use strict';

const cmd = require('commander');
const pkg = require('./package.json');

const varmanager = require('./varmanager');
const generator = require('./generator');

process.bin = pkg.name;

cmd.version(pkg.version)
	.option('--vars [data]', 'Use custom variables')
    .usage("<command> [options]");

cmd.command("g <name> <path> [vars]")
    .description("Generate a new stuff")
    .action((name, path, vars) => {
    	const v = vars || cmd.vars;

    	if(v)
    		return varmanager(v).then(o => generator(name, path, o)).catch(err => console.error('ERROR:', err));

    	return generator(name, path);
    });

cmd.on('*', opt => {
    cmd.help();
});

cmd.parse(process.argv);

// Handle case where no command is passed (`$ xtuff`)
if (!process.argv.slice(2).length) {
    cmd.help();
}