import Form from 'react-bootstrap/esm/Form';

const StatusSelector = ({ statuses, item, handleChange }) => {
	return (
		<Form.Select
			onChange={(e) => {
				handleChange(e);
			}}>
			{statuses.map((s) => {
				return (
					<option key={`status-${item.id}-${s.id}`} value={s.id}>
						{s.current}
					</option>
				);
			})}
		</Form.Select>
	);
};

export default StatusSelector;
