import slice from 'lodash/slice';
import {random} from '../lib';

/**
 * Genome that is represent by binary bits
 */
export default class BitGenome {
	/**
	 * Construct a new binary bit genome.
	 * @param {number} numBits - Will randomly initialize this many bits in the genome (0 or 1). Default 0.
	 * @param {number} fitness - Initialize with fitness score. Default 0.
	 * @param {number[]} bits - Initialize bit array with predefined bit array. Bits are copied. Default [].
	 */
	constructor({fitness, bits, numBits} = {fitness: 0, bits: [], numBits: 0}) {
		this._bits = bits.slice(0);
		this._fitness = fitness;

		// Initialize with random bits
		for (let i = 0; i < numBits; i++) {
			this._bits.push(random(0, 1));
		}
	}

	get fitness() {
		return this._fitness
	};

	set fitness(value) {
		this._fitness = value;
	}

	get length() {
		return this._bits.length
	};

	get bits() {
		return this._bits;
	}

	/**
	 * Return an array of numBits bits starting start.
	 * @param start - Index to start at
	 * @param numBits - Number of bits to return
	 * @return {number[]} - Sliced portion of the bits.
	 */
	slice(start, numBits) {
		return slice(this._bits, start, start + numBits);
	}

	/**
	 * Add a bit to the end of the genome.
	 * @param {number} bit - Bit (0 or 1) to add
	 * @return {BitGenome} - Returns the genome
	 */
	push(bit) {
		this._bits.push(bit);
		return this;
	}

	/**
	 * Flip a specific bit in the genome.
	 * @param {number} index - Index of bit to flip.
	 * @return {BitGenome} - Returns the genome.
	 */
	flip(index) {
		this._bits[index] = this._bits[index] ? 0 : 1;
		return this;
	}
}
