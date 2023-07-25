import { useNavigate } from 'react-router';

import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

const Customer = ({ customer }) => {
	const navigate = useNavigate();
	return (
		<ListGroup.Item>
			<h5>{customer.companyName}</h5>
			<p>{customer.address}</p>
			<p>{customer.companyPhone}</p>
			<Button
				onClick={() => {
					navigate(`/customers/${customer.id}`);
				}}>
				Details
			</Button>
		</ListGroup.Item>
	);
};

export default Customer;
