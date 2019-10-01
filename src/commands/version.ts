import Vorpal from 'vorpal';

import { Arguments, Command, Options, Session } from 'evm-lite-cli';

const pkg = require('../../package.json');

export default (monetcli: Vorpal, session: Session): Command => {
	const description = 'Display current version of cli';

	return monetcli
		.command('version')
		.alias('v')
		.option('-d, --debug', 'show debug output')
		.description(description)
		.types({
			string: []
		})
		.action((args: Arguments<Options>) =>
			new VersionCommand(session, args).run()
		);
};

class VersionCommand extends Command {
	protected async init(): Promise<boolean> {
		return false;
	}

	protected async prompt(): Promise<void> {
		return;
	}

	protected async check(): Promise<void> {
		return;
	}

	protected async exec(): Promise<string> {
		const modules: string[] = [
			'evm-lite-core',
			'evm-lite-datadir',
			'evm-lite-keystore',
			'evm-lite-consensus',
			'evm-lite-client',
			'evm-lite-cli'
		];

		for (const mod of modules) {
			this.debug(`${mod}: ${pkg.dependencies[mod]}`, 'version');
		}

		return `v${pkg.version}`;
	}
}

export const Version = VersionCommand;
