import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';

const Customer = ({ customer }) => {
	return (
		<ListGroup.Item action as={Link} to={`/customers/${customer.id}`}>
			<h5>{customer.companyName}</h5>
			<p>{customer.address}</p>
			<p>{customer.companyPhone}</p>
		</ListGroup.Item>
	);
};

export default Customer;
