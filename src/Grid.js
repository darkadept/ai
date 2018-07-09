import React, {Component} from 'react';
import {Stage, Layer} from 'react-konva';
import {Line, Rect} from 'konva';

export default class Grid extends Component {
	componentDidMount() {
		const {layer} = this.refs;
		const {width, height, pixelSize} = this.props;
		const pixelWidth = width * pixelSize;
		const pixelHeight = height * pixelSize;

		layer.add(new Rect({
			width: pixelWidth,
			height: pixelHeight,
			fill: 'grey'
		}));

		for (let x=0; x<pixelWidth; x+=pixelSize) {
			layer.add(new Line({
				points: [x, 0, x, pixelWidth],
				stroke: 'black',
			}));
		}
		for (let y = 0; y < pixelWidth; y += pixelSize) {
			layer.add(new Line({
				points: [0, y, pixelWidth, y],
				stroke: 'black',
			}));
		}
	}

	render() {
		const {width, height, pixelSize} = this.props;

		return (
			<Stage width={width * pixelSize} height={height * pixelSize}>
				<Layer ref="layer"/>
			</Stage>
		);
	}
}
