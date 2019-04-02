#!/usr/bin/env node
'use strict';

const cmd = require('commander');
const pkg = require('./package.json');

const generator = require('./generator.js');

process.bin = pkg.name;

cmd.version(pkg.version)
    .usage("<command> [options]");

cmd.command("g <name> <path>")
    .description("Generate a new stuff")
    .action((name, path) => generator(name, path));

cmd.on('*', opt => {
    cmd.help();
});

cmd.parse(process.argv);

// Handle case where no command is passed (`$ xtuff`)
if (!process.argv.slice(2).length) {
    cmd.help();
}