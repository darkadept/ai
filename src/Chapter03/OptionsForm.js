import React from 'react';
import {Form, Input} from 'semantic-ui-react';

export default function OptionsForm({values, handleChange, handleSubmit}) {
	return (
		<Form onSubmit={handleSubmit}>
			<Form.Group widths={1}>
				<Form.Field>
					<label>Width</label>
					<Input name="width" onChange={handleChange} value={values.width} type="number"/>
				</Form.Field>
				<Form.Field>
					<label>Height</label>
					<Input name="height" onChange={handleChange} value={values.height} type="number"/>
				</Form.Field>
			</Form.Group>
			<Form.Group widths={1}>
				<Form.Field>
					<label>Crossover Rate</label>
					<Input name="crossoverRate" onChange={handleChange} value={values.crossoverRate} type="number"/>
				</Form.Field>
				<Form.Field>
					<label>Mutation Rate</label>
					<Input name="mutationRate" onChange={handleChange} value={values.mutationRate} type="number"/>
				</Form.Field>
				<Form.Field>
					<label>Population Size</label>
					<Input name="populationSize" onChange={handleChange} value={values.populationSize} type="number"/>
				</Form.Field>
			</Form.Group>
			<Form.Group widths={1}>
				<Form.Field>
					<label>Chromosome Length</label>
					<Input name="chromoLength" onChange={handleChange} value={values.chromoLength} type="number"/>
				</Form.Field>
				<Form.Field>
					<label>Gene Length</label>
					<Input name="geneLength" onChange={handleChange} value={values.geneLength} type="number"/>
				</Form.Field>
				<Form.Field>
					<label>Speed (ms)</label>
					<Input name="speed" onChange={handleChange} value={values.speed} type="number"/>
				</Form.Field>
			</Form.Group>
			<Form.Button>Save</Form.Button>
		</Form>
	);
}
