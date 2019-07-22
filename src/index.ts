#!/usr/bin/env node

import { osDataDir } from 'evm-lite-datadir';
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

const name = 'Monet CLI';
const delimiter = 'monet';
const datadir = osDataDir('Monet');
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
