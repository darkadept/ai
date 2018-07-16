import Genome from '../Genome';

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

it('should construct empty', () => {
	const g = new Genome();

	expect(g.fitness).toBe(0);
	expect(g.length).toBe(0);
});

it('should construct random', () => {
	const g = new Genome({numBits: 10});

	expect(g.fitness).toBe(0);
	expect(g.length).toBe(10);
	expect(g.bits).toMatchSnapshot();
});

it('should construct with fitness', () => {
	const g = new Genome({numBits: 10, fitness: 3});

	expect(g.fitness).toBe(3);
	expect(g.length).toBe(10);
});

it('should construct as a clone', () => {
	const g = new Genome({numBits: 10});
	const g2 = new Genome({bits: g.bits});

	expect(g2.length).toBe(10);
	expect(g2.bits).toMatchSnapshot();
});

it('should clone & push bits', () => {
	const g = new Genome({numBits: 10});
	const g2 = g.clone();
	g2.push(1);

	expect(g.length).toBe(10);
	expect(g).toMatchSnapshot();
	expect(g2.length).toBe(11);
	expect(g2).toMatchSnapshot();
});

it('should flip bits', () => {
	const g = new Genome({numBits: 10});
	g.flip(0);
	g.flip(2);
	g.flip(4);
	g.flip(6);
	g.flip(8);
	expect(g).toMatchSnapshot();
});

it('should slice', () => {
	const a = new Genome({numBits: 8});
	const b = a.slice(0, 4);
	const c = a.slice(4, 4);

	expect(b).toMatchSnapshot();
	expect(c).toMatchSnapshot();
});
