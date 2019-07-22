declare module 'ascii-table' {
	export = class ASCIITable {
		constructor(title?: string);
		public setHeading(...headings: string[]): this;
		public addRow(...headings: any[]): this;
	};
}
