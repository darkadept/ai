import React, {Component} from 'react';
import {Loop} from 'react-game-kit';
import MazeContainer from './gfx/MazeContainer';

export default class App extends Component {
	render() {
		return (
			<Loop>
				<MazeContainer/>
			</Loop>
		);
	}
}
