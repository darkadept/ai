import Genome from '../Genome';

const mockMath = Object.create(global.Math);
mockMath.random = () => 0.5;
global.Math = mockMath;

it('should construct to a random value', () => {
	const g = new Genome(10);

	expect(g._bits).toMatchSnapshot();
	expect(g.length).toBe(10);
	expect(g.slice(0, 5)).toMatchSnapshot();
});

it('should be able to be built on', () => {
	const g = new Genome(0);

	expect(g.length).toBe(0);
	g.push(0).push(0).push(1).push(1);
	expect(g.length).toBe(4);
	expect(g._bits).toMatchSnapshot();
});

it('should flip bits', () => {
	const g = new Genome(10);
	g.flip(1).flip(3).flip(5);

	expect(g._bits).toMatchSnapshot();
});

it('should set and get fitness values', () => {
	const g = new Genome(10);
	g.fitness = 5.3;
	expect(g.fitness).toBe(5.3);
});
