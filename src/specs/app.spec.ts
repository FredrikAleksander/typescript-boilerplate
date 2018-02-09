import { ILogger } from '../logger';
import { App } from '../app';
import { expect, use, should } from 'chai';
import { SinonSpy, spy } from 'sinon';
import 'mocha';
import * as sinonChai from 'sinon-chai';

should();
use(sinonChai);

class MockLogger implements ILogger {
	constructor(private callback: SinonSpy) {
	}

	write(level: number, message: string) {
		this.callback(level, message);
	}
}

describe('Application class', () => {
	it('should log `App starting...` at log level 0 when starting', () => {
		var callback = spy();
		var logger = new MockLogger(callback);
		var app = new App(logger);
		app.run();

		callback.should.have.been.calledOnce.calledWith(0, 'App starting...');
	});
});

