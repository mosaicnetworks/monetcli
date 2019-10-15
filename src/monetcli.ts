#!/usr/bin/env node
import { CLIOptions, init } from 'evm-lite-cli';
import { osdatadir } from 'evm-lite-datadir';

import {
	// accounts
	accountsCreate,
	accountsGet,
	accountsImport,
	accountsList,
	accountsPrivateKey,
	accountsUpdate,

	// config
	configSet,
	configView,

	// pos
	info,
	poaCheck,
	poaEvicteeList,
	poaEvicteeNew,
	poaEvicteeVote,
	poaInit,
	poaNomineeList,
	poaNomineeNew,
	poaNomineeVote,

	// misc
	poaWhitelist,
	transfer
} from 'evm-lite-cli';

// custom commands
import block from './commands/block';
import history from './commands/history';
import validators from './commands/validators';
import version from './commands/version';

const options: CLIOptions = {
	name: 'Monet CLI',
	delimiter: 'monetcli',
	datadir: osdatadir('Monet'),
	config: 'monetcli'
};

const commands = [
	info,

	configSet,
	configView,

	accountsList,
	accountsGet,
	accountsCreate,
	accountsUpdate,
	accountsImport,
	accountsPrivateKey,

	transfer,

	poaInit,
	poaWhitelist,
	poaCheck,

	poaNomineeList,
	poaNomineeNew,
	poaNomineeVote,

	poaEvicteeList,
	poaEvicteeNew,
	poaEvicteeVote,

	block,
	validators,
	history,

	version
];

init(options, commands).catch(console.log);
