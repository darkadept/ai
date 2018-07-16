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

	const cp = random(0, mum.length - 1);

	let baby1 = new Genome({bits: [
			...mum.slice(0, cp),
			...dad.slice(cp, dad.length - cp),
	]});
	let baby2 = new Genome({
		bits: [
			...dad.slice(0, cp),
			...mum.slice(cp, mum.length - cp),
		]
	});

	return {baby1, baby2};
}
