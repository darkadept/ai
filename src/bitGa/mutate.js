import {randomFloat} from '../lib';

/**
 * Mutate a genome. Does not alter the genome.
 * @param {Genome} genome - The genome to mutate.
 * @param {number} mutationRate - The mutation rate.
 * @returns {Genome} The new mutated genome.
 */
export default function mutate({
	genome,
	mutationRate,
}) {
	const newGenome = genome.clone();
	for (let curBit=0; curBit<newGenome.length; curBit++) {
		if (randomFloat() < mutationRate) {
			newGenome.flip(curBit);
		}
	}
	return newGenome;
}
