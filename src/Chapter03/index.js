import React, {Component} from 'react';
import {Container, Header, Button, Segment} from 'semantic-ui-react';
import {TForm} from '@thx/controls';
import lz from 'lzutf8';
import Grid from './Grid';
import Map from './Map';
import Bob from './Bob';
import OptionsForm from './OptionsForm';
import LoadForm from './LoadForm';

function saveMap(map, options) {
	const str = JSON.stringify({
		map: map.map,
		start: map.start,
		end: map.end,
		options,
	});
	return lz.compress(str, {outputEncoding: 'Base64'});
}

function loadMap(str) {
	const x = lz.decompress(str, {inputEncoding: 'Base64'});
	return JSON.parse(x);
}

export default class Chapter03 extends Component {
	constructor(props) {
		super(props);

		// Default options
		const options = {
			width: 60,
			height: 40,
			crossoverRate: 0.7,
			mutationRate: 0.001,
			populationSize: 140,
			chromoLength: 70,
			geneLength: 2,
			speed: 5000,
		};

		// Generate new map
		const map = new Map(options.width, options.height).generateMap();

		// Create bob
		const bob = new Bob(options, map);

		// Initialize state
		this.state = {
			pixelSize: 10,
			map,
			running: false,
			options,
			bob,
			saveText: saveMap(map, options),
		};
	}

	/**
	 * Toggle running
	 */
	handleRunningToggle = () => {
		this.setState(state => ({
			running: !state.running,
		}), () => {
			if (this.state.running) this.loop();
		});
	};

	/**
	 * Called when option values change
	 * @param values
	 */
	handleSubmit = values => {
		// If width and height change, reset and build a new map.
		const {options: {width, height}} = this.state;
		if (values.width === width && values.height === height) {
			const bob = new Bob(values, this.state.map);
			this.setState(state => ({
				bob,
				options: values,
				saveText: saveMap(state.map, values),
			}));
		} else {
			const map = new Map(values.width, values.height).generateMap();
			const bob = new Bob(values, map);
			this.setState({
				map,
				bob,
				running: false,
				options: values,
				saveText: saveMap(map, values),
			});
		}
	};

	/**
	 * Called when loading a saved level
	 * @param values
	 */
	handleLoad = values => {
		const loaded = loadMap(values.text);
		const map = new Map(loaded.options.width, loaded.options.height).loadMap(loaded.map, loaded.start, loaded.end);
		const bob = new Bob(loaded.options, map);
		this.setState({
			map,
			bob,
			running: false,
			options: loaded.options,
		});
	};

	/**
	 * Run loop
	 */
	loop() {
		if (this.state.running) {
			this.state.bob.epoch();
			if (!this.state.bob.running) {
				this.setState({running: false});
			} else {
				setTimeout(() => {
					this.loop();
				}, this.state.options.speed);
			}
		}
	}

	render() {
		const {options, map, running, pixelSize} = this.state;

		return (
			<Container text style={{marginTop: '2rem'}}>
				<Header as="h1">Genetic Algorithm</Header>
				<Segment basic>
					<Grid
						width={options.width}
						height={options.height}
						pixelSize={pixelSize}
						map={map}
					>
					</Grid>
				</Segment>
				<Button color={running ? 'red' : 'green'} onClick={this.handleRunningToggle}>{running ? 'Stop' : 'Start'}</Button>
				<Segment basic>
					<Header>Options</Header>
					<TForm
						render={OptionsForm}
						initialValues={options}
						enableReinitialize={true}
						onSubmit={this.handleSubmit}
					/>
				</Segment>
				<Segment basic>
					<TForm
						render={LoadForm}
						initialValues={{text: this.state.saveText}}
						enableReinitialize={true}
						onSubmit={this.handleLoad}
					/>
				</Segment>
			</Container>
		);
	}
}
