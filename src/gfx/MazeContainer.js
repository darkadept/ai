import React from 'react';
import PropTypes from 'prop-types';
import {Container, Header, Button, Segment, Statistic} from 'semantic-ui-react';
import Grid from './Grid';
import Map from '../bitGa/Map';
import Robot from '../bitGa/Robot';

export default class MazeContainer extends React.Component {
	static contextTypes = {
		loop: PropTypes.object,
	};

	constructor(props) {
		super(props);

		const mapOptions = {width: 60, height: 40};
		const algOptions = {
			crossoverRate: 0.7,
			mutationRate: 0.001,
			populationSize: 240,
			chromoLength: 376, // 70
		};
		const sysOptions = {
			pixelSize: 10,
			speed: 250,
		};

		const map = new Map(mapOptions).generate(70);
		const robot = new Robot({map, options: algOptions});

		this.state = {
			map,
			robot,
			running: false,
			mapOptions,
			algOptions,
			sysOptions,
			bestPath: [],
			generation: 0,
			bestFitnessScore: 0,
		};

		this._prevTicks = window.performance.now();
	}

	update = () => {
		const {running, robot} = this.state;
		if (running && !robot.complete) {
			robot.epoch();
			if (robot.complete) {
				this.setState({
					running: false,
					bestPath: robot.path(robot.bestDirections()),
					bestFitnessScore: robot._ga.bestFitnessScore,
					generation: robot._ga.generation,
				});
			}
		}

		let curTicks = window.performance.now();
		if (curTicks - this._prevTicks >= this.state.sysOptions.speed) {
			this._prevTicks = curTicks;

			if (running) {
				this.setState({
					bestPath: robot.path(robot.bestDirections()),
					bestFitnessScore: robot._ga.bestFitnessScore,
					generation: robot._ga.generation,
				});
			}
		}
		this._prevTicks = this._prevTicks + 1;
	};

	handleRunningToggle = () => {
		if (!this.state.running) {
			this.state.robot.reset();
		}
		this.setState(state => ({
			running: !state.running,
		}));
	};

	componentDidMount() {
		this.context.loop.subscribe(this.update);
	}

	componentWillUnmount() {
		this.context.loop.unsubscribe(this.update);
	}

	render() {
		const {running, map, mapOptions, sysOptions, bestPath, generation, bestFitnessScore} = this.state;

		return (
			<Container text style={{marginTop: '2rem'}}>
				<Header as="h1">Genetic Algorithm</Header>
				<Segment basic>
					<Grid
						width={mapOptions.width}
						height={mapOptions.height}
						pixelSize={sysOptions.pixelSize}
						map={map}
						path={bestPath}
					>
					</Grid>
				</Segment>
				<Button color={running ? 'red' : 'green'}
				        onClick={this.handleRunningToggle}>{running ? 'Stop' : 'Start'}</Button>
				<Statistic.Group>
					<Statistic>
						<Statistic.Value>{generation}</Statistic.Value>
						<Statistic.Label>Generation</Statistic.Label>
					</Statistic>
					<Statistic>
						<Statistic.Value>{Math.round(bestFitnessScore*1000)/1000}</Statistic.Value>
						<Statistic.Label>Best Fitness</Statistic.Label>
					</Statistic>
				</Statistic.Group>
			</Container>
		);
	}
}
