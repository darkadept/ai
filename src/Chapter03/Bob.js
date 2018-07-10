import Genome from './Genome';
import {randomFloat, random, bits2int} from '../lib';

export default class Bob {
	constructor({
		crossoverRate,
		mutationRate,
		populationSize,
		chromoLength,
		geneLength,
	            },
	            map) {

		this._options = {
			populationSize,
			crossoverRate,
			mutationRate,
			chromoLength,
			geneLength,
		};

		this.genomes = [];
		this.generation = 0;
		this.fittestGenomeIndex = 0;
		this.bestFitnessScore = 0;
		this.totalFitnessScore = 0;
		this._running = true;

		this.map = map;

		this.createStartPopulation();
	}

	get running() {return this._running;}

	/**
	 * Select member of population by using roulette wheel selection
	 * @return {*}
	 */
	rouletteWheelSelection() {
		const {populationSize} = this._options;
		const slice = randomFloat() * this.totalFitnessScore;
		let total = 0.0;
		let selectedGenome = 0; // TODO picks first genome if none better, maybe should be random
		for (let i=0; i<populationSize; i++) {
			total += this.genomes[i].fitness;
			if (total > slice) {
				selectedGenome = i;
				break;
			}
		}
		return this.genomes[selectedGenome];
	}

	mutate(vecBits) {
		for (let curBit=0; curBit<vecBits.length; curBit++) {
			if (randomFloat() < this._mutationRate) {
				// modify vecBits
			}
		}
	}

	crossover(mum, dad) {
		if (randomFloat() > this._crossoverRate || mum.equals(dad)) {
			return {
				baby1: mum,
				baby2: dad,
			}
		}

		const cp = random(0, this._chromoLength - 1);

		// for (let i=0; i<cp; i++) {
		// 	baby1.
		// }


	}

	createStartPopulation() {
		const {populationSize, chromoLength} = this._options;

		// Clear the current population
		this.genomes = [];

		// Add a new population of random genomes
		for (let i = 0; i < populationSize; i++) {
			this.genomes.push(new Genome(chromoLength));
		}

		// Reset variables
		this.generation = 0;
		this.fittestGenome = 0;
		this.bestFitnessScore = 0;
		this.totalFitnessScore = 0;
	}

	epoch() {
		console.log('Epoch');
		const {populationSize} = this._options;

		this.updateFitnessScores();

		let newBabies = 0;
		let babyGenomes = [];
		while (newBabies < populationSize) {
			const mum = this.rouletteWheelSelection();
			const dad = this.rouletteWheelSelection();

		// 	let {baby1, baby2} = this.crossover(mum, dad);

		// 	baby1 = this.mutate(baby1);
		// 	baby2 = this.mutate(baby2);

		// 	babyGenomes.push(baby1);
		// 	babyGenomes.push(baby2);

			newBabies += 2;
		}
		//
		// this._genomes = babyGenomes;
		// this._generation += 1;
	}

	updateFitnessScores() {
		const {populationSize} = this._options;

		this.fittestGenome = 0;
		this.bestFitnessScore = 0;
		this.totalFitnessScore = 0;

		for (let i=0; i<populationSize; i++) {
			// Generate array of direction codes from the genome bits
			const directions = this.decode(this.genomes[i]);

			// Test the directions against the map, storing the fitness value
			this.genomes[i].fitness = this.map.testRoute(directions);

			// Add total fitness
			this.totalFitnessScore += this.genomes[i].fitness;

			// If this is the fittest genome, store result
			if (this.genomes[i].fitness > this.bestFitnessScore) {
				this.bestFitnessScore = this.genomes[i].fitness;
				this.fittestGenome = i;

				// store temp memory from testing route

				// Check for exit
				if (this.genomes[i].fitness === 1) {
					this._running = false;
				}
			}
		}

		// reset temp memory
	}

	/**
	 * Decode genome bits to array of direction codes
 	 * @param genome - The genome to decode
	 * @return {Array} - An array of directions 0,1,2,3
	 */
	decode(genome) {
		const {geneLength} = this._options;
		let directions = [];

		// Jump through genome bits by gene length
		for (let gene=0; gene<genome.length; gene += geneLength) {
			// Get slice of the genome and convert bits to integer code
			const thisGene = genome.slice(gene, geneLength);
			directions.push(bits2int(thisGene));
		}
		return directions;
	}
}
