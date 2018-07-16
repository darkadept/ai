import Genome from '../Genome';
import crossover from '../crossover';

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

it('should cross over bits', () => {
	// const mum = new Genome({bits: [0, 1, 0, 1, 0, 0, 1, 1]});
	// const dad = new Genome({bits: [1, 1, 1, 0, 1, 0, 1, 0]});
	const mum = new Genome({bits: [0, 0, 0, 0, 1, 1, 1, 1]});
	const dad = new Genome({bits: [1, 1, 1, 1, 0, 0, 0, 0]});

	expect(mum.bits).toMatchSnapshot();
	expect(dad.bits).toMatchSnapshot();

	const babies = crossover({mum, dad, crossoverRate: 0.8});
	expect(babies).toMatchSnapshot();
});
