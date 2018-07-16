import debug from 'debug';
import {bits2int} from "../lib";
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

	bestDirections() {
		return this.decodeGenome(this._ga.fittestGenome);
	}

	epoch() {
		this._ga.epoch();
		d(`epoch: ${this._ga.generation} ${this._ga.bestFitnessScore}`);
		d(`  bits: ${this._ga.fittestGenome.bits}`);
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

		let pos = {x: start.x, y: start.y};

		directions.forEach(vec => {
			pos = this.move(vec, pos);
			// TODO Check if we already found the exit here.
		});

		// Calculate fitness score (0 to 1)
		const diff = {
			x: Math.abs(pos.x - end.x),
			y: Math.abs(pos.y - end.y),
		};
		return 1 / (diff.x + diff.y + 1);
	};

	path = directions => {
		const {start} = this._map;
		let pos = {x: start.x, y: start.y};
		let path = [];
		directions.forEach(vec => {
			pos = this.move(vec, pos);
			path.push(pos);
		});
		return path;
	};
}
