import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';

const Lead = ({ lead }) => {
	return (
		<ListGroup.Item action as={Link} to={`/leads/${lead.id}`}>
			<h3>{lead.companyName}</h3>
		</ListGroup.Item>
	);
};

export default Lead;
