import React, {Component} from 'react';
import Grid from './Grid';
import Map from './Map';
import Genome from './Genome';

class App extends Component {
	constructor(props) {
		super(props);

		const width = 20;
		const height = 20;
		const map = new Map(width, height);
		map.generateMap();

		this.state = {
			map,
			width,
			height,
		};

		const g = new Genome(10);
		console.log(g._vecBits);
	}

	render() {
		return (
			<Grid
				width={this.state.width}
				height={this.state.height}
				pixelSize={25}
				map={this.state.map.renderMap}
			>
			</Grid>
		);
	}
}

export default App;
