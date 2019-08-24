import Vorpal, { Args, Command } from 'vorpal';

import Babble from 'evm-lite-babble';

import { execute, IOptions, Session, Staging } from 'evm-lite-cli';

const pkg = require('../../package.json');

interface Options extends IOptions {
	value: any;
}

export interface Arguments extends Args<Options> {
	options: Options;
}

export default function command(
	monetcli: Vorpal,
	session: Session<Babble>
): Command {
	const description = 'Display current version of cli';

	return monetcli
		.command('version')
		.alias('v')
		.option('-d, --debug', 'show debug output')
		.description(description)
		.types({
			string: []
		})
		.action((args: Arguments) => execute(stage, args, session));
}

export const stage = async (args: Arguments, session: Session<Babble>) => {
	const staging = new Staging<Arguments, string>(args);

	const { debug, success } = staging.handlers(session.debug);

	debug(`evm-lite-core: ${pkg.dependencies[`evm-lite-core`]}`);
	debug(`evm-lite-keystore: ${pkg.dependencies[`evm-lite-keystore`]}`);
	debug(`evm-lite-datadir: ${pkg.dependencies[`evm-lite-datadir`]}`);
	debug(`evm-lite-cli: ${pkg.dependencies[`evm-lite-cli`]}`);

	return Promise.resolve(success(`monetcli ${pkg.version}`));
};
