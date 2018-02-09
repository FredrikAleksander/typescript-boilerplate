import { inject, injectable } from './di';
import { ILogger } from './logger';

export interface IApp {
	run();
}
export const IApp = 'IApp';

@injectable()
export class App implements IApp {
	constructor(@inject(ILogger) private logger: ILogger)
	{
	}

	run() {
		this.logger.write(0, `App starting...`);
	}
}
