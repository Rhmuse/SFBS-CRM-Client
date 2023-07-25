import { useNavigate } from 'react-router';

import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

const Lead = ({ lead }) => {
	const navigate = useNavigate();

	return (
		<ListGroup.Item>
			<h3>{lead.companyName}</h3>
			<Button
				onClick={() => {
					navigate(`/leads/${lead.id}`);
				}}>
				Details
			</Button>
		</ListGroup.Item>
	);
};

export default Lead;
