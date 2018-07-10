import Genome from './Genome';
import Map from './Map';

export default class Bob {
	constructor() {
		this._genomes = [];
		this._population = 0;
		this._crossoverRate = 0;
		this._mutationRate = 0;
		this._chromoLength = 0;
		this._fittestGenome = null;
		this._bestFitnessScore = 0;
		this._totalFitnessSCore = 0;
		this._generation = 0;

		// this._map = new Map()
	}
}
