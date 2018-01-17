#!/usr/bin/env node
'use strict';
const meow = require('meow');
const werdinoCli = require('.');

const cli = meow(`
	Usage
	  $ werdino
`);

werdinoCli(cli.input[0] || '');
