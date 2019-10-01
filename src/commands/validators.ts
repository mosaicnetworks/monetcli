import Vorpal from 'vorpal';

import { Arguments, Command, Options, Session, Table } from 'evm-lite-cli';
import { Babble } from 'evm-lite-consensus';
import { Monet } from 'evm-lite-core';

type Opts = Options & {
	formatted?: boolean;
	host: string;
	port: number;
};

export type Args = Arguments<Opts> & {
	round: number;
};

export default (monetcli: Vorpal, session: Session) => {
	const description = 'Get validators by consensus round';

	return monetcli
		.command('validators [round]')
		.option('-f, --formatted', 'format output')
		.option('-h, --host <ip>', 'override config host value')
		.option('-p, --port <port>', 'override config port value')
		.description(description)
		.action((args: Args) => new Validators(session, args).run());
};

class ValidatorsCommand extends Command<Args, Babble> {
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
		if (this.args.round === null || this.args.round === undefined) {
			throw Error('A round number must be specified');
		}

		return;
	}

	protected async exec(): Promise<string> {
		this.debug(`Fetching validators for round -> ${this.args.round}`);

		const { host, port } = this.args.options;
		this.log.http('GET', `${host}:${port}/validators/${this.args.round}`);

		const validators = await this.node!.consensus!.getValidators(
			this.args.round
		);

		if (!this.args.options.formatted) {
			return JSON.stringify(validators, null, 2);
		}

		const table = new Table(['Moniker', 'Net Address', 'Public Key Hex']);

		for (const val of validators) {
			table.push([val.Moniker, val.NetAddr, val.PubKeyHex]);
		}

		return table.toString();
	}
}

export const Validators = ValidatorsCommand;
