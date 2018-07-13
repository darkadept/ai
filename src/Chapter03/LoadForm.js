import React from 'react';
import {Form} from 'semantic-ui-react';

export default function LoadForm({values, handleChange, handleSubmit}) {
	return (
		<Form onSubmit={handleSubmit}>
			<Form.Field>
				<label>Save</label>
				<Form.TextArea name="text" onChange={handleChange} value={values.text}/>
			</Form.Field>
			<Form.Button>Load</Form.Button>
		</Form>
	);
}
