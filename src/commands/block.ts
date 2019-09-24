import Vorpal from 'vorpal';

import { Arguments, Command, Options, Session } from 'evm-lite-cli';
import { Babble } from 'evm-lite-consensus';
import { Monet } from 'evm-lite-core';

type Opts = Options & {
	host: string;
	port: number;
};

export type Args = Arguments<Opts> & {
	block: number;
};

export default (monetcli: Vorpal, session: Session) => {
	const description = 'Display details of a block by index';

	return monetcli
		.command('block [block]')
		.alias('b')
		.option('-h, --host <ip>', 'override config host value')
		.option('-p, --port <port>', 'override config port value')
		.description(description)
		.action((args: Args) => new BlockCommand(session, args).run());
};

class BlockCommand extends Command<Args, Babble> {
	protected async init(): Promise<boolean> {
		this.args.options.host =
			this.args.options.host || this.config.connection.host;
		this.args.options.port =
			this.args.options.port || this.config.connection.port;

		this.node = new Monet(this.args.options.host, this.args.options.port);

		return false;
	}

	protected async prompt(): Promise<void> {
		return;
	}

	protected async check(): Promise<void> {
		if (this.args.block === null || this.args.block === undefined) {
			throw Error('A block number must be specified');
		}

		return;
	}

	protected async exec(): Promise<string> {
		const { host, port } = this.args.options;
		this.log.http('GET', `${host}:${port}/block/${this.args.block}`);

		const block = await this.node!.consensus!.getBlock(this.args.block);

		return JSON.stringify(block, null, 2);
	}
}

export const Block = BlockCommand;
