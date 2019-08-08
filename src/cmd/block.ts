import Vorpal, { Command, Args } from 'vorpal';

import {
	Session,
	IStagingFunction,
	IOptions,
	execute,
	Frames
} from 'evm-lite-cli';

interface Options extends IOptions {}

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

	const { debug, success, error } = frames.staging();

	if (!args.block) {
		return error('', 'A block number must be specified');
	}

	try {
		const block = await session.node.babble.getBlock(args.block);
	} catch (e) {
		// pass
	}

	return Promise.resolve(success(`${args.block}`));
};
