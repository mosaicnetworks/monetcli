import Vorpal from 'vorpal';

import { color, Command, IArgs, IOptions, Session } from 'evm-lite-cli';
import { Babble } from 'evm-lite-consensus';
import { Monet } from 'evm-lite-core';

interface Opts extends IOptions {
	host: string;
	port: number;
}

export interface Args extends IArgs<Opts> {}

export default (monetcli: Vorpal, session: Session) => {
	const description = 'Show validator history';

	return monetcli
		.command('history')
		.alias('h')
		.option('-h, --host <ip>', 'override config host value')
		.option('-p, --port <port>', 'override config port value')
		.description(description)
		.action((args: Args) =>
			new ValidatorHistoryCommand(session, args).run()
		);
};

class ValidatorHistoryCommand extends Command<Args, Babble> {
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
		return;
	}

	protected async exec(): Promise<void> {
		const { host, port } = this.args.options;
		this.log.http('GET', `${host}:${port}/history`);

		const history = await this.node!.consensus!.getValidatorHistory();

		return color.green(JSON.stringify(history, null, 2));
	}
}

export const ValidatorHistory = ValidatorHistoryCommand;
