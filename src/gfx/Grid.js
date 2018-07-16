import React, {Component} from 'react';
import {Stage, Layer} from 'react-konva';
import {Line, Rect} from 'konva';

export default class Grid extends Component {
	drawBlock(x, y, color) {
		const {layer} = this.refs;
		const {pixelSize} = this.props;
		layer.add(new Rect({
			x: (x * pixelSize) + 1,
			y: (y * pixelSize) + 1,
			width: pixelSize - 2,
			height: pixelSize - 2,
			fill: color,
		}));
	}

	drawPath() {
		const {path} = this.props;

		path.forEach(({x, y}) => {
			this.drawBlock(x, y, 'purple');
		});
	}

	drawMap() {
		const {map, width, height} = this.props;

		for(let x=0; x<width; x++) {
			for(let y=0; y<height; y++) {
				if (map.at(x,y)) {
					this.drawBlock(x, y, 'red');
				}
			}
		}

		this.drawBlock(map.start.x, map.start.y, 'green');
		this.drawBlock(map.end.x, map.end.y, 'blue');
	}

	redraw() {
		const {layer} = this.refs;
		const {
			width,
			height,
			pixelSize,
		} = this.props;
		const pixelWidth = width * pixelSize;
		const pixelHeight = height * pixelSize;

		console.log('redrawing');

		// Grid pen definition
		const gridPen = {
			stroke: 'grey',
			strokeWidth: 0.7,
		};

		// Draw background
		layer.add(new Rect({
			width: pixelWidth,
			height: pixelHeight,
			fill: 'black'
		}));

		// Draw X grid
		for (let x = 0; x <= pixelWidth; x += pixelSize) {
			layer.add(new Line({
				points: [x, 0, x, pixelWidth],
				...gridPen,
			}));
		}

		// Draw Y grid
		for (let y = 0; y <= pixelWidth; y += pixelSize) {
			layer.add(new Line({
				points: [0, y, pixelWidth, y],
				...gridPen,
			}));
		}

		// Draw the map
		this.drawMap();
		this.drawPath();
	}

	shouldComponentUpdate(nProps) {
		const {width, height, map} = this.props;
		const doUpdate = nProps.width === width && nProps.height === height && nProps.map === map;
		return !doUpdate;
	}

	componentDidMount() {
		this.redraw();
	}

	componentDidUpdate() {
		const {layer} = this.refs;
		layer.clear().destroyChildren();
		this.redraw();
	}

	render() {
		const {width=40, height=20, pixelSize=30, x=0, y=0, map} = this.props;

		return (
			<Stage x={x} y={y} width={(width * pixelSize)+x+1} height={(height * pixelSize)+y+1}>
				<Layer ref="layer" hash={map.id}/>
			</Stage>
		);
	}
}
