import debug from 'debug';
import Genome from './Genome';
import mutate from './mutate';
import rouletteWheelSelection from './rouletteWheelSelection';
import crossover from './crossover';

const d = debug('app.GA');

export default class GA {
	constructor({
		crossoverRate = 0.7,
		mutationRate = 0.001,
		populationSize = 140,
		chromoLength = 70,
		geneLength,
		perfectFitnessScore,
		decodeFn,
		testFitnessFn,
	            }) {
		// Options
		this._crossoverRate = crossoverRate;
		this._mutationRate = mutationRate;
		this._populationSize = populationSize;
		this._chromoLength = chromoLength;
		this._geneLength = geneLength;
		this._perfectFitnessScore = perfectFitnessScore;
		this._decodeFn = decodeFn;
		this._testFitnessFn = testFitnessFn;

		// Population
		this._genomes = [];

		// Internal flags
		this._complete = false;
		this._generation = 0;
		this._fittestGenome = null;
		this._bestFitnessScore = 0;
		this._totalFitnessScore = 0;

		// Create a start population
		this.createStartPopulation();
	}

	get complete() {return this._complete;}
	get bestFitnessScore() {return this._bestFitnessScore;}
	get fittestGenome() {return this._fittestGenome;}
	get generation() {return this._generation;}

	/**
	 * Resets and creates a starting population
	 */
	createStartPopulation() {
		this._genomes = [];

		// Add a new population of random genomes
		for (let i = 0; i < this._populationSize; i++) {
			this._genomes.push(new Genome({numBits: this._chromoLength}));
		}

		// Reset variables
		this._complete = false;
		this._generation = 0;
		this._fittestGenome = null;
		this._bestFitnessScore = 0;
		this._totalFitnessScore = 0;

		d(`Created start population of: ${this._populationSize}`);
		d(this._genomes);
	}

	epoch() {
		this.updateFitnessScores();

		let newBabies = 0;
		let babyGenomes = [];
		while (newBabies < this._populationSize) {
			const mum = rouletteWheelSelection({totalFitnessScore: this._totalFitnessScore, genomes: this._genomes});
			const dad = rouletteWheelSelection({totalFitnessScore: this._totalFitnessScore, genomes: this._genomes});

			let {baby1, baby2} = crossover({mum, dad, crossoverRate: this._crossoverRate});

			baby1 = mutate({genome: baby1, mutationRate: this._mutationRate});
			baby2 = mutate({genome: baby2, mutationRate: this._mutationRate});

			babyGenomes.push(baby1);
			babyGenomes.push(baby2);

			newBabies += 2;
		}

		this._genomes = babyGenomes;
		this._generation += 1;
	}

	/**
	 * Update fitness scores for this generation
	 */
	updateFitnessScores() {
		this._fittestGenome = null;
		this._bestFitnessScore = 0;
		this._totalFitnessScore = 0;

		this._genomes.forEach(genome => {
			const decodedValues = this._decodeFn(genome);
			genome.fitness = this._testFitnessFn(decodedValues);

			this._totalFitnessScore += genome.fitness;

			if (genome.fitness > this._bestFitnessScore) {
				this._bestFitnessScore = genome.fitness;
				this._fittestGenome = genome.clone();

				if (genome.fitness === this._perfectFitnessScore) {
					this._complete = true;
				}
			}
		});
	}
}
