import {random, create2dArray} from './lib';

export default class Map {
	constructor(width, height) {
		this._map = create2dArray(width, height);
		this._width = width;
		this._height = height;

		this._start = {x: 0, y: 0};
		this._end = {x: 0, y:0};
	}

	testRoute(vecPath) {
		let pos = {x: this._start.x, y: this._start.y};

		vecPath.forEach(vec => {
			switch (vec) {
				case 0: // north
					if (pos.y-1 < 0 || this.map[pos.x][pos.y-1] === 1) break;
					pos.y = pos.y - 1;
					break;
				case 1: // south
					if (pos.y+1 >= this._height || this.map[pos.x][pos.y+1] === 1) break;
					pos.y = pos.y + 1;
					break;
				case 2: // east
					if (pos.x+1 >= this._width || this.map[pos.x+1][pos.y] === 1) break;
					pos.x = pos.x + 1;
					break;
				case 3: // west
					if (pos.x-1 < 0 || this._map[pos.x-1][pos.y] === 1) break;
					pos.x = pos.x - 1;
					break;
			}
		});

		const diff = {
			x: Math.abs(pos.x - this._end.x),
			y: Math.abs(pos.y - this._end.y),
		};

		return 1 / (diff.x + diff.y + 1);
	}

	get width() {return this._width};
	get height() {return this._height};

	get map() {
		return this._map;
	}

	get renderMap() {
		let map = create2dArray(this._width, this._height);
		for (let x=0; x<this._width; x++) {
			for (let y=0; y<this._height; y++) {
				if (this._map[x][y]) map[x][y] = {fill: 'red'};
			}
		}

		map[this._start.x][this._start.y] = {fill: 'green'};
		map[this._end.x][this._end.y] = {fill: 'blue'};

		return map;
	}

	generateMap(percent=80) {
		for (let x=0; x<this._width; x++) {
			for (let y=0; y<this._height; y++) {
				if (random() > percent) {
					this._map[x][y] = 1;
				}
			}
		}

		this._start.x = random(0, this._width-1);
		this._start.y = random(0, this._height-1);

		this._end.x = random(0, this._width-1);
		this._end.y = random(0, this._height-1);
	}
}
