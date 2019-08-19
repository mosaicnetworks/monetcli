import Vorpal, { Args, Command } from 'vorpal';

import {
	execute,
	Frames,
	IOptions,
	IStagingFunction,
	Session
} from 'evm-lite-cli';

const pkg = require('../../package.json');

interface Options extends IOptions {
	value: any;
}

export interface Arguments extends Args<Options> {
	options: Options;
}

export default function command(monetcli: Vorpal, session: Session): Command {
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

export const stage: IStagingFunction<Arguments, string, string> = async (
	args: Arguments,
	session: Session
) => {
	const frames = new Frames<Arguments, string, string>(session, args);

	const { debug, success } = frames.staging();

	debug(`evm-lite-core: ${pkg.dependencies[`evm-lite-core`]}`);
	debug(`evm-lite-keystore: ${pkg.dependencies[`evm-lite-keystore`]}`);
	debug(`evm-lite-datadir: ${pkg.dependencies[`evm-lite-datadir`]}`);
	debug(`evm-lite-cli: ${pkg.dependencies[`evm-lite-cli`]}`);

	return Promise.resolve(success(`monetcli ${pkg.version}`));
};
