import {create2dArray, bits2int} from '../lib';

const mockMath = Object.create(global.Math);
let randomFlip = true;
mockMath.random = () => {
	if (randomFlip) {
		randomFlip = false;
		return 0.3;
	}
	randomFlip = true;
	return 0.6;
};
global.Math = mockMath;

it('should create a 2d array', () => {
	const a = create2dArray(10, 10);
	expect(a).toHaveLength(10);
	expect(a[0]).toHaveLength(10);
	expect(a).toMatchSnapshot();
});

it('should convert arrays of bits to integers', () => {
	const a = bits2int([1,1,1,1,1,1,1,1]);
	const b = bits2int([0, 0, 0, 0, 0, 0, 0, 0]);
	const c = bits2int([0, 1, 0, 1, 0, 0, 1, 1]);

	expect(a).toBe(255);
	expect(b).toBe(0);
	expect(c).toBe(83);
});
