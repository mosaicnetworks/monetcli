#!/usr/bin/env node

import * as path from 'path';

import { init } from 'evm-lite-cli';

import {
	// accounts
	accountsCreate,
	accountsGet,
	accountsList,
	accountsUpdate,
	accountsImport,

	// config
	configSet,
	configView,

	// pos
	poaCheck,
	poaInfo,
	poaInit,
	poaNominate,
	poaNomineelist,
	poaVote,
	poaWhitelist,

	// misc
	clear,
	interactive,
	transfer,
	info
} from 'evm-lite-cli';

// custom commands
import version from './cmd/version';

function getDataDir(dir: string): string {
	const os = require('os')
		.type()
		.toLowerCase();

	switch (os) {
		case 'windows_nt':
			return path.join(
				require('os').homedir(),
				'AppData',
				'Roaming',
				dir
			);
		case 'darwin':
			return path.join(require('os').homedir(), 'Library', dir);

		default:
			return path.join(require('os').homedir(), `.${dir.toLowerCase()}`);
	}
}

const name = 'Monet CLI';
const delimiter = 'monet';
const datadir = getDataDir('Monet');
const commands = [
	// accounts
	accountsCreate,
	accountsGet,
	accountsList,
	accountsUpdate,
	accountsImport,

	// config
	configSet,
	configView,

	// pos
	poaCheck,
	poaInfo,
	poaInit,
	poaNominate,
	poaNomineelist,
	poaVote,
	poaWhitelist,

	// misc
	clear,
	interactive,
	transfer,
	info,

	version
];

init(name, delimiter, datadir, commands).catch(console.log);
