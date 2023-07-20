const Order = ({ order }) => {
	return (
		<div className='flex flex-column'>
			<h5>{order?.customer?.companyName}</h5>
			<p>{order.orderDate}</p>
			<p>{order.staus}</p>
			<p>{order.totalAmount}</p>
		</div>
	);
};

export default Order;
