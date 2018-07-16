import debug from 'debug';
import {bits2int, create2dArray} from "../lib";
import GA from "./GA";

const d = debug('app.Robot');

export default class Robot {
	constructor({
		map,
		options,
	            }) {
		this._geneLength = 2;
		this._map = map;
		this._ga = new GA({
			...options,
			geneLength: 2,
			perfectFitnessScore: 1,
			decodeFn: this.decodeGenome,
			testFitnessFn: this.walk,
		});
	}

	get complete() {return this._ga.complete;}

	reset() {
		this._ga.createStartPopulation();
	}

	bestDirections() {
		return this.decodeGenome(this._ga.fittestGenome);
	}

	epoch() {
		this._ga.epoch();
		d(`epoch: ${this._ga.generation} ${this._ga.bestFitnessScore}`);
		// d(`  bits: ${this._ga.fittestGenome.bits}`);
		d(this.bestDirections());
	}

	decodeGenome = genome => {
		let directions = [];
		for (let gene=0; gene<genome.length; gene += this._geneLength) {
			const thisGene = genome.slice(gene, this._geneLength);
			directions.push(bits2int(thisGene));
		}
		return directions;
	};

	move = (vec, pos) => {
		let newPos = {x: pos.x, y: pos.y};
		switch (vec) {
			case 0: // north
				if (this._map.at(newPos.x, newPos.y-1) === 1) break;
				newPos.y = newPos.y - 1;
				break;
			case 1: // south
				if (this._map.at(newPos.x, newPos.y+1) === 1) break;
				newPos.y = newPos.y + 1;
				break;
			case 2: // east
				if (this._map.at(newPos.x+1, newPos.y) === 1) break;
				newPos.x = newPos.x + 1;
				break;
			case 3: // west
				if (this._map.at(newPos.x-1, newPos.y) === 1) break;
				newPos.x = newPos.x - 1;
				break;
			default:
				return newPos;
		}
		return newPos;
	};

	walk = directions => {
		const {start, end} = this._map;
		const memory = create2dArray(this._map.width, this._map.height);

		let pos = {x: start.x, y: start.y};
		let foundFinish = false;
		let numCrossovers = 0;

		directions.forEach(vec => {
			if (!foundFinish) {
				pos = this.move(vec, pos);

				// if (memory[pos.x][pos.y]) numCrossovers++;
				// memory[pos.x][pos.y] = 1;

				if (pos.x === this._map.end.x && pos.y === this._map.end.y) {
					foundFinish = true;
				}
			}
		});

		if (foundFinish) return 1;

		// Calculate fitness score (0 to 1)
		const diff = {
			x: Math.abs(pos.x - end.x),
			y: Math.abs(pos.y - end.y),
		};

		// console.log(diff.x, diff.y, (diff.x + diff.y + 1), 1/(diff.x+diff.y+1), numCrossovers);

		return 1 / (diff.x + diff.y + numCrossovers + 1);
	};

	path = directions => {
		const {start} = this._map;
		let pos = {x: start.x, y: start.y};
		let path = [];
		directions.forEach(vec => {
			pos = this.move(vec, pos);
			if (pos.x !== this._map.end.x && pos.y !== this._map.end.y) {
				path.push(pos);
			}
		});
		return path;
	};
}
