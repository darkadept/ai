import fill from 'lodash/fill';

export const random = (from=1, to=100) => Math.floor((Math.random() * (to+1)) + from);

export const create2dArray = (width, height) => {
	let arr = new Array(height);
	for (let i=0; i<width; i++) {
		arr[i] = new fill(Array(width), 0);
	}
	return arr;
};
