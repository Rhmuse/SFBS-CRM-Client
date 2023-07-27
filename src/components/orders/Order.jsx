import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';

const Order = ({ order }) => {
	return (
		<ListGroup.Item
			className='flex flex-column'
			action
			as={Link}
			to={`/orders/${order.id}`}>
			<h5>{order?.customer?.companyName}</h5>
			<p>Date Placed: {order.orderDate}</p>
			<p>Total: ${order.totalAmount}</p>
		</ListGroup.Item>
	);
};

export default Order;
