import {randomFloat} from '../lib';

/**
 * Uses roulette wheel selection to select a genome from a population.
 * @param {number} totalFitnessScore - The current total fitness score.
 * @param {Genome[]} genomes - Array of bit genomes.
 * @return {Genome} The selected genome.
 */
export default function rouletteWheelSelection({
	totalFitnessScore,
	genomes,
}) {
	const slice = randomFloat() * totalFitnessScore;

	let total = 0.0;
	let selectedGenome = 0; // TODO picks first genome if none better, maybe should be random

	for (let i = 0; i < genomes.length; i++) {
		total += genomes[i].fitness;
		if (total > slice) {
			selectedGenome = i;
			break;
		}
	}
	return genomes[selectedGenome];
}
