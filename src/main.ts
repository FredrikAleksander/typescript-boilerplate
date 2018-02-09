import { Container } from './di';
import { ILogger, ConsoleLogger } from './logger';
import { IApp, App } from './app';

var services = new Container()
	.registerTransient(ILogger, ConsoleLogger)
	.registerSingleton(IApp, App)
	.resolve<IApp>(IApp)
	.run();
