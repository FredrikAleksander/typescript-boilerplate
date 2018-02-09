import { injectable } from './di';

// Generates a Type Symbol ILogger
export interface ILogger {
	write(level: number, message: string);
}
export const ILogger = 'ILogger'; // Generates Value Symbol ILogger
// When ILogger is used as a type annotation, the interface is used,
// when a value ILogger is requested, the string 'ILogger' is returned,
// which may be used as a type id

@injectable()
export class ConsoleLogger implements ILogger {
	constructor() {
	}
	write(level: number, message: string) {
		console.log(message);
	}
}