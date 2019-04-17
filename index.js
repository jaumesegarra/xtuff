#!/usr/bin/env node
'use strict';

const cmd = require('commander');
const pkg = require('./package.json');

const varmanager = require('./varmanager');
const generator = require('./generator');

process.bin = pkg.name;

cmd.version(pkg.version)
	.option('--vars [data]', 'Use custom variables')
	.option('--delimiter [d]', 'Use another delimiter instead of #')
    .usage("<command> [options]");

cmd.command("g <name> <path> [vars]")
    .description("Generate a new stuff")
    .action((name, path, vars) => {
    	const v = vars || cmd.vars;

    	const delimiter = cmd.delimiter;
    	let patterns;

    	const gen = () => generator(name, path, delimiter, patterns);

    	if(v)
    		return varmanager(v).then(o => {
    			patterns = o;

    			gen();
    		}).catch(err => console.error('ERROR:', err));

    	return gen();
    });

cmd.on('*', opt => {
    cmd.help();
});

cmd.parse(process.argv);

// Handle case where no command is passed (`$ xtuff`)
if (!process.argv.slice(2).length) {
    cmd.help();
}