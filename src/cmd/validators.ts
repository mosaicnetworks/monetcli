import Vorpal, { Args, Command } from 'vorpal';

import { execute, IOptions, Session, Staging } from 'evm-lite-cli';
import { Babble, IBabbleBlock } from 'evm-lite-consensus';

import { BLOCK } from '../errors/babble';

interface Options extends IOptions {
	host?: string;
	port?: number;
}

export interface Arguments extends Args<Options> {
	round?: number;
	options: Options;
}

export default (monetcli: Vorpal, session: Session<Babble>): Command => {
	const description = 'Get validators by round';

	return monetcli
		.command('validators [round]')
		.option('-d, --debug', 'show debug output')
		.option('-h, --host <ip>', 'override config host value')
		.option('-p, --port <port>', 'override config port value')
		.description(description)
		.action((args: Arguments) => execute(stage, args, session));
};

export const stage = async (args: Arguments, session: Session<Babble>) => {
	const staging = new Staging<Arguments, string>(args);

	// args
	const { options } = args;

	// handlers
	const { debug, success, error } = staging.handlers(session.debug);

	// hooks
	const { connect } = staging.genericHooks(session);

	// config
	const config = session.datadir.config;

	// command execution
	const host = options.host || config.connection.host;
	const port = options.port || config.connection.port;

	await connect(
		host,
		port
	);

	if (args.round === null || args.round === undefined) {
		return Promise.reject(
			error(BLOCK.INDEX_EMPTY, 'A round number must be specified')
		);
	}

	let validators;
	try {
		validators = await session.node.consensus!.getValidators(args.round);
	} catch (e) {
		debug(e);

		return Promise.reject(error(BLOCK.INDEX_EMPTY, 'Validators not found'));
	}

	return success(JSON.stringify(validators, null, 2));
};
