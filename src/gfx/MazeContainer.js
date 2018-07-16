import React from 'react';
import {Container, Header, Button, Segment} from 'semantic-ui-react';
import Grid from './Grid';
import Map from '../bitGa/Map';
import Robot from '../bitGa/Robot';

export default class MazeContainer extends React.Component {
	constructor(props) {
		super(props);

		const mapOptions = {width: 60, height: 40};
		const algOptions = {
			crossoverRate: 0.7,
			mutationRate: 0.001,
			populationSize: 140,
			chromoLength: 70,
		};
		const sysOptions = {
			pixelSize: 10,
			speed: 1000,
		};

		const map = new Map(mapOptions).generate();
		const robot = new Robot({map, options: algOptions});

		console.log(robot);

		this.state = {
			map,
			robot,
			running: false,
			mapOptions,
			algOptions,
			sysOptions,
			bestPath: [],
		};
	}

	loop = () => {
		const {running, robot, sysOptions} = this.state;
		if (running) {
			robot.epoch();
			this.setState({bestPath: robot.path(robot.bestDirections())});

			if (robot.complete) {
				this.setState({running: false});
			} else {
				setTimeout(() => this.loop(), sysOptions.speed);
			}
		}
	};

	handleRunningToggle = () => {
		this.setState(state => ({
			running: !state.running,
		}), () => {
			if (this.state.running) this.loop();
		});
	};

	render() {
		const {running, map, mapOptions, sysOptions, bestPath} = this.state;

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
				<Button color={running ? 'red' : 'green'} onClick={this.handleRunningToggle}>{running ? 'Stop' : 'Start'}</Button>
			</Container>
		);
	}
}
