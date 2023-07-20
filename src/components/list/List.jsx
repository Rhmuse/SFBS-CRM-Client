import { useState } from 'react';
import Order from '../orders/Order';
import Customer from '../customers/Customer';
import Lead from '../leads/Lead';
import Employee from '../employees/Employee';
import Product from '../products/Product';
import Invoice from '../invoices/Invoice';
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
		case 'employees':
			fetch('http://localhost:8088/employees')
				.then((res) => res.json())
				.then((e) => {
					const employees = e.map((employee) => {
						return (
							<Employee
								key={`employee--${employee.id}`}
								employee={employee}
							/>
						);
					});
					setList(employees);
				});
			break;
		case 'leads':
			fetch('http://localhost:8088/leads')
				.then((res) => res.json())
				.then((l) => {
					const leads = l.map((lead) => {
						return <Lead key={`lead--${lead.id}`} lead={lead} />;
					});
					setList(leads);
				});
			break;
		case 'products':
			fetch('http://localhost:8088/products')
				.then((res) => res.json())
				.then((p) => {
					const products = p.map((product) => {
						return (
							<Product
								key={`product--${product.id}`}
								product={product}
							/>
						);
					});
					setList(products);
				});
			break;
		case 'invoices':
			fetch('http://localhost:8088/invoices')
				.then((res) => res.json())
				.then((i) => {
					const invoices = i.map((invoice) => {
						return (
							<Invoice
								key={`invoice--${invoice.id}`}
								invoice={invoice}
							/>
						);
					});
					setList(invoices);
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
