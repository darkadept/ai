import {random, create2dArray} from '../lib';

export default class Map {
	constructor({
    width,
    height,
		map = null,
		start = {x: 0, y: 0},
		end = {x: 0, y: 0},
	}) {
		this._map = map || create2dArray(width, height);
		this._width = width;
		this._height = height;

		this._start = start;
		this._end = end;

		this._id = random(0, 999999);
	}

	get start() {return this._start;}
	get end() {return this._end;}
	get id() {return this._id;}

	at(x, y) {
		// Check bounds
		if (x < 0 || y < 0 || x >= this._width || y >= this._height) return 1;
		// Return what is at the postition
		return this._map[x][y];
	}

	/**
	 * Randomly generate a map and start and end points.
	 * @param percentFill
	 * @returns {Map}
	 */
	generate(percentFill=80) {
		for (let x=0; x<this._width; x++) {
			for (let y=0; y<this._height; y++) {
				if (random() > percentFill) {
					this._map[x][y] = 1;
				}
			}
		}

		this._start.x = random(0, this._width-1);
		this._start.y = random(0, this._height-1);
		this._map[this._start.x][this._start.y] = 0; // Make sure the start is accessible

		this._end.x = random(0, this._width-1);
		this._end.y = random(0, this._height-1);
		this._map[this._end.x][this._end.y] = 0; // Make sure the end is accessible

		return this;
	}

	/**
	 * Returns the map data as a single structure.
	 * @returns {{map: *, width: *, height: *, start: *, end: *}}
	 */
	save() {
		return {
			map: this._map,
			width: this._width,
			height: this._height,
			start: this._start,
			end: this._end,
		};
	}
}
