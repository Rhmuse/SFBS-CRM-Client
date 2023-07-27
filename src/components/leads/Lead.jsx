import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';

const Lead = ({ lead }) => {
	return (
		<ListGroup.Item action as={Link} to={`/leads/${lead.id}`}>
			<h3>{lead.companyName}</h3>
			<p>Company Phone Number: {lead.companyPhone}</p>
			<p>
				Contact: {lead.contactFirstName} {lead.contactLastName}
			</p>
			<p>Contact Phone Number: {lead.contactPhone}</p>
		</ListGroup.Item>
	);
};

export default Lead;
