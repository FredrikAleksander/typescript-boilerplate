import { Container, injectable, inject } from '../di';
import { expect, use, should } from 'chai';
import { SinonSpy, spy } from 'sinon';
import 'mocha';
import * as sinonChai from 'sinon-chai';

should();
use(sinonChai);

interface IMockService {
	doSomething()
}
const IMockService = 'IMockService';

@injectable()
class MockService implements IMockService {
	doSomething() {

	}
}

describe('Container class', () => {
	it('should resolve new instances for transient services', () => {
		var container = new Container();
		container.registerTransient(MockService, MockService);
		var obj1 = container.resolve<MockService>(MockService);
		var obj2 = container.resolve<MockService>(MockService);
		expect(obj1).to.not.be.equal(obj2);
	});

	it('should resolve the same instance for singleton services', () => {
		var container = new Container();
		container.registerSingleton(MockService, MockService);
		var obj1 = container.resolve<MockService>(MockService);
		var obj2 = container.resolve<MockService>(MockService);
		expect(obj1).to.be.equal(obj2);
	});

	it('should return the correct instance for instance services', () => {
		var service = new MockService();
		var container = new Container();
		container.registerInstance(MockService, service);
		var obj = container.resolve<MockService>(MockService);
		expect(obj).to.be.equal(service);
	});

	it('should resolve using the factory function for factory services', () => {
		var callback = spy();
		var container = new Container();
		container.registerFactory(MockService, <any>callback);
		container.resolve(MockService);
		container.resolve(MockService);
		container.resolve(MockService);
		callback.should.have.been.calledThrice.calledWith(container);
	});

	it('should resolve the same instance across types for singleton registrations for multiple types', () => {
		var container = new Container();
		container.registerSingleton([MockService, IMockService], MockService);
		var obj1 = container.resolve(MockService);
		var obj2 = container.resolve(IMockService);
		expect(obj1).to.be.equal(obj2);
	});
});

