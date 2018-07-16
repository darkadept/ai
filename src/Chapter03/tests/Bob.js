import Bob from '../Bob';
import Map from '../Map';

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

const map = new Map(5, 3);

const options = {
	crossoverRate: 0.7,
	mutationRate: 0.001,
	populationSize: 10,
	chromoLength: 70,
	geneLength: 2,
};

it('should construct a new population on initialize', () => {
	const bob = new Bob(options, map);
	expect(bob.genomes).toMatchSnapshot();
});

it('should update fitness scores', () => {
	const bob = new Bob(options, map);
	bob.updateFitnessScores();
	expect(bob.genomes).toMatchSnapshot();
	expect(bob.totalFitnessScore).toBeCloseTo(0.33333, 2);
});
