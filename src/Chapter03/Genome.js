import slice from 'lodash/slice';
import {random} from '../lib';

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

	get length() {return this._vecBits.length};
	slice(start, numBits) {
		return slice(this._vecBits, start, start+numBits);
	}
	// get bits() {return this._vecBits;}

	// equals(b) {
	// 	return this._vecBits.join('') === b._vecBits.join('');
	// }
}
