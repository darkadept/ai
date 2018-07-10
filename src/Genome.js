import {random} from './lib';

export default class Genome {
	constructor(numBits) {
		this._vecBits = [];
		this._fitness = 0;

		for (let i=0; i<numBits; i++) {
			this._vecBits.push(random(0, 1));
		}
	}

	get fitness() {return this._fitness};
	set fitness(value) {this._fitness = value;}
	get vector() {return this._vecBits;}
}
