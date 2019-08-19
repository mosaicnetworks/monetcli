import Vorpal, { Args, Command } from 'vorpal';

import {
	execute,
	Frames,
	IOptions,
	IStagingFunction,
	Session
} from 'evm-lite-cli';

import { BABBLE_BLOCK } from '../errors/babble';

interface Options extends IOptions {
	host?: string;
	port?: number;
}

export interface Arguments extends Args<Options> {
	block?: number;
	options: Options;
}

export default function command(monetcli: Vorpal, session: Session): Command {
	const description = 'Get a block from Babble';

	return monetcli
		.command('block [block]')
		.alias('b')
		.option('-d, --debug', 'show debug output')
		.option('-h, --host <ip>', 'override config host value')
		.option('-p, --port <port>', 'override config port value')
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

	// args
	const { options } = args;

	// frames
	const { debug, success, error } = frames.staging();
	const { connect } = frames.generics();

	// config
	const config = session.datadir.config;

	// command execution
	const host = options.host || config.connection.host;
	const port = options.port || config.connection.port;

	await connect(
		host,
		port
	);

	if (!args.block) {
		return error(
			BABBLE_BLOCK.BLOCK_INDEX_EMPTY,
			'A block number must be specified'
		);
	}

	let block;

	console.log(session.node.consensus);

	try {
		block = await session.node.consensus.getBlock(args.block);
	} catch (e) {
		debug(e);
		return error(BABBLE_BLOCK.BLOCK_INDEX_EMPTY, e.toString());
	}

	return Promise.resolve(success(`${JSON.stringify(block)}`));
};
