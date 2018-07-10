import React, {Component} from 'react';
import {Stage, Layer} from 'react-konva';
import {Line, Rect} from 'konva';

export default class Grid extends Component {
	drawMap() {
		const {layer} = this.refs;
		const {map, width, height, pixelSize} = this.props;

		for(let x=0; x<width; x++) {
			for(let y=0; y<height; y++) {
				if (map[x][y]) {
					layer.add(new Rect({
						x: (x * pixelSize) + 1,
						y: (y * pixelSize) + 1,
						width: pixelSize - 2,
						height: pixelSize - 2,
						...map[x][y],
					}));
				}
			}
		}
	}

	componentDidMount() {
		const {layer} = this.refs;
		const {
			width,
			height,
			pixelSize,
		} = this.props;
		const pixelWidth = width * pixelSize;
		const pixelHeight = height * pixelSize;


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
		for (let x=0; x<pixelWidth; x+=pixelSize) {
			layer.add(new Line({
				points: [x, 0, x, pixelWidth],
				...gridPen,
			}));
		}

		// Draw Y grid
		for (let y = 0; y < pixelWidth; y += pixelSize) {
			layer.add(new Line({
				points: [0, y, pixelWidth, y],
				...gridPen,
			}));
		}

		layer.add(new Line({
			points: [
				0, pixelHeight, pixelWidth, pixelHeight,
				pixelWidth, 0, pixelWidth, pixelHeight,
			],
			...gridPen,
		}));

		this.drawMap();
	}

	render() {
		const {width=40, height=20, pixelSize=30, x=50, y=50} = this.props;

		return (
			<Stage x={x} y={y} width={(width * pixelSize)+x+1} height={(height * pixelSize)+y+1}>
				<Layer ref="layer"/>
			</Stage>
		);
	}
}
