import slice from 'lodash/slice';
import {random} from '../lib';

export default class Genome {
	constructor(numBits) {
		this._bits = [];
		this._fitness = 0;

		for (let i=0; i<numBits; i++) {
			this._bits.push(random(0, 1));
		}
	}

	get fitness() {return this._fitness};
	set fitness(value) {this._fitness = value;}

	get length() {return this._bits.length};

	slice(start, numBits) {
		return slice(this._bits, start, start+numBits);
	}

	push(bit) {this._bits.push(bit); return this;}

	flip(index) {
		this._bits[index] = this._bits[index] ? 0 : 1;
		return this;
	}
}
