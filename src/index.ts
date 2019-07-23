#!/usr/bin/env node

import { osDataDir } from 'evm-lite-datadir';
import { init, IInit } from 'evm-lite-cli';

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

const params: IInit = {
	name: 'Monet CLI',
	delimiter: 'monet',
	datadir: osDataDir('Monet'),
	config: 'monetcli'
};

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

init(params, commands).catch(console.log);
