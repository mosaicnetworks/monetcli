#!/usr/bin/env node

import { ICLIConfig, init } from 'evm-lite-cli';
import { osdatadir } from 'evm-lite-datadir';

import {
	// accounts
	accountsCreate,
	accountsGet,
	accountsImport,
	accountsList,
	accountsUpdate,

	// config
	configSet,
	configView,

	// pos
	info,
	poaCheck,
	poaInfo,
	poaInit,
	poaNominate,
	poaNomineelist,
	poaVote,

	// misc
	poaWhitelist,
	transfer
} from 'evm-lite-cli';

// custom commands
import version from './cmd/version';

// babble
import block from './cmd/block';

const params: ICLIConfig = {
	name: 'Monet CLI',
	delimiter: 'monet',
	datadir: osdatadir('Monet'),
	config: 'monetcli',
	consensus: 'babble'
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

	// poa
	poaCheck,
	poaInfo,
	poaInit,
	poaNominate,
	poaNomineelist,
	poaVote,
	poaWhitelist,

	// misc
	transfer,
	info,

	// babble
	block,

	version
];

init(params, commands).catch(console.log);
