import { useNavigate } from 'react-router';

const Order = ({ order }) => {
	const navigate = useNavigate();

	return (
		<div className='flex flex-column'>
			<h5>{order?.customer?.companyName}</h5>
			<p>{order.orderDate}</p>
			<p>{order.staus}</p>
			<p>{order.totalAmount}</p>
			<button
				onClick={() => {
					navigate(`/orders/${order.id}`);
				}}>
				Details
			</button>
		</div>
	);
};

export default Order;
