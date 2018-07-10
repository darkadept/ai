import fill from 'lodash/fill';

export const random = (from=1, to=100) => Math.floor((Math.random() * (to+1)) + from);
export const randomFloat = (from=0.0, to=1.0) => Math.random() * (to - from) + from;

export const create2dArray = (width, height) => {
	let arr = new Array(height);
	for (let i=0; i<width; i++) {
		arr[i] = new fill(Array(width), 0);
	}
	return arr;
};

/**
 * Convert array of bits to an integer
 * @param bits
 */
export const bits2int = (bits) => {
	let val = 0;
	let multiplier = 1;
	for (let bit=bits.length; bit>0; bit--) {
		val += bits[bit-1] * multiplier;
		multiplier *= 2;
	}
	return val;
};
