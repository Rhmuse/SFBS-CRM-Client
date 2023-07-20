import { useState } from 'react';
import Order from '../orders/Order';
import Customer from '../customers/Customer';
import './List.css';

const List = ({ type }) => {
	const [list, setList] = useState([]);
	switch (type) {
		case 'orders':
			fetch('http://localhost:8088/orders?_expand=customer')
				.then((res) => res.json())
				.then((o) => {
					const orders = o.map((order) => {
						return (
							<Order key={`order--${order.id}`} order={order} />
						);
					});
					setList(orders);
				});
			break;
		case 'customers':
			fetch('http://localhost:8088/customers')
				.then((res) => res.json())
				.then((c) => {
					const customers = c.map((customer) => {
						return (
							<Customer
								key={`customer--${customer.id}`}
								customer={customer}
							/>
						);
					});
					setList(customers);
				});
			break;
		default:
			break;
	}
	return (
		<div className='flex'>
			<div>Search Bar</div>
			<div className='flex flex-column list-item'>{list}</div>
		</div>
	);
};

export default List;
