import Vorpal, { Args, Command } from 'vorpal';

import { execute, IOptions, Session, Staging } from 'evm-lite-cli';

import Babble, { IBabbleBlock } from 'evm-lite-babble';

import { BABBLE_BLOCK } from '../errors/babble';

interface Options extends IOptions {
	host?: string;
	port?: number;
}

export interface Arguments extends Args<Options> {
	block?: number;
	options: Options;
}

export default function command(
	monetcli: Vorpal,
	session: Session<Babble>
): Command {
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

export const stage = async (args: Arguments, session: Session<Babble>) => {
	const staging = new Staging<Arguments, string>(args);

	// args
	const { options } = args;

	// frames
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

	if (!args.block) {
		return error(
			BABBLE_BLOCK.BLOCK_INDEX_EMPTY,
			'A block number must be specified'
		);
	}

	let block;

	try {
		block = await session.node.consensus.getBlock(args.block);
	} catch (e) {
		debug(e);
		return error(BABBLE_BLOCK.BLOCK_INDEX_EMPTY, e.toString());
	}

	const parseTx = (tx: string): string => {
		const buf = Buffer.from(tx, 'base64');

		return buf.toString();
	};

	const b: IBabbleBlock = {
		...block,
		Body: {
			...block.Body,
			Transactions: block.Body.Transactions.map(parseTx)
		}
	};

	return Promise.resolve(success(JSON.stringify(b, null, 2)));
};
