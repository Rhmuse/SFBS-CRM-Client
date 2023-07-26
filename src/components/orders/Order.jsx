import { useNavigate } from 'react-router';

import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';

const Order = ({ order }) => {
	const navigate = useNavigate();

	return (
		<ListGroup.Item
			className='flex flex-column'
			action
			as={Link}
			to={`/employees/${order.id}`}>
			<h5>{order?.customer?.companyName}</h5>
			<p>{order.orderDate}</p>
			<p>{order.staus}</p>
			<p>{order.totalAmount}</p>
		</ListGroup.Item>
	);
};

export default Order;
