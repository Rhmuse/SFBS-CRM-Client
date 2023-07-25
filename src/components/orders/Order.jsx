import { useNavigate } from 'react-router';

import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

const Order = ({ order }) => {
	const navigate = useNavigate();

	return (
		<ListGroup.Item className='flex flex-column'>
			<h5>{order?.customer?.companyName}</h5>
			<p>{order.orderDate}</p>
			<p>{order.staus}</p>
			<p>{order.totalAmount}</p>
			<Button
				onClick={() => {
					navigate(`/orders/${order.id}`);
				}}>
				Details
			</Button>
		</ListGroup.Item>
	);
};

export default Order;
