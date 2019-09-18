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
	poaInit,
	poaNominate,
	poaNomineelist,
	poaVote,

	// misc
	poaWhitelist,
	transfer
} from 'evm-lite-cli';

// custom commands
import block from './commands/block';
import validators from './commands/validators';
import version from './commands/version';

const params: ICLIConfig = {
	name: 'Monet CLI',
	delimiter: 'monetcli',
	datadir: osdatadir('Monet'),
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

	// poa
	poaCheck,
	poaInit,
	poaNominate,
	poaNomineelist,
	poaVote,
	poaWhitelist,

	// misc
	transfer,
	info,

	// custom
	version,
	block,
	validators
];

init(params, commands).catch(console.log);
