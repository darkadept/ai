import {randomFloat, random} from '../lib';
import Genome from './Genome';

/**
 * Crossover bits of a mum and dad genome. Returns two babies.
 * @param mum
 * @param dad
 * @param crossoverRate
 * @returns {*}
 */
export default function crossover({mum, dad, crossoverRate}) {
	if (mum === dad || randomFloat() > crossoverRate) {
		return {
			baby1: mum,
			baby2: dad,
		};
	}

	let baby1 = new Genome();
	let baby2 = new Genome();

	const cp = random(0, mum.length - 1);

	// Swap bits
		for (let i=0; i<cp; i++) {
			baby1.push(mum[i]);
			baby2.push(dad[i]);
		}
		for (let i=cp; i<mum.length; i++) {
			baby1.push(dad[i]);
			baby2.push(mum[i]);
		}

		return {baby1, baby2};
}
