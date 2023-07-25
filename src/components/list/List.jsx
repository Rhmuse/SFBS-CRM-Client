import { useEffect, useState } from 'react';
import Order from '../orders/Order';
import Customer from '../customers/Customer';
import Lead from '../leads/Lead';
import Employee from '../employees/Employee';
import Product from '../products/Product';
import Invoice from '../invoices/Invoice';
import NewEntryButton from '../buttons/NewEntryButton';
import './List.css';
import Utilities from '../../Utilities';

//BootStrap
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const List = ({ type }) => {
	const [list, setList] = useState([]);
	const [formButton, setFormButton] = useState();

	const crmUserObject = JSON.parse(localStorage.getItem('crm_user'));

	useEffect(() => {
		switch (type) {
			case 'orders':
				fetch('http://localhost:8088/orders?_expand=customer')
					.then((res) => res.json())
					.then((o) => {
						const orders = o.map((order) => {
							return (
								<Order
									key={`order--${order.id}`}
									order={order}
								/>
							);
						});
						setList(orders);
						setFormButton(<NewEntryButton type={type} />);
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
						setFormButton(<NewEntryButton type={type} />);
					});
				break;
			case 'employees':
				fetch('http://localhost:8088/locations')
					.then((res) => res.json())
					.then((data) => {
						const locations = data;
						fetch('http://localhost:8088/employees/?_expand=user')
							.then((res) => res.json())
							.then((e) => {
								const employees = e.map((employee) => {
									return (
										<Employee
											key={`employee--${employee.id}`}
											employee={employee}
											locations={locations}
										/>
									);
								});
								setList(employees);
								if (Utilities.isManager(crmUserObject))
									setFormButton(
										<NewEntryButton type={type} />
									);
								else setFormButton('');
							});
					});
				break;
			case 'leads':
				fetch('http://localhost:8088/leads')
					.then((res) => res.json())
					.then((l) => {
						const leads = l.map((lead) => {
							return (
								<Lead key={`lead--${lead.id}`} lead={lead} />
							);
						});
						setList(leads);
						setFormButton(<NewEntryButton type={type} />);
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
						setFormButton(<NewEntryButton type={type} />);
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
						setFormButton(<NewEntryButton type={type} />);
					});
				break;
			default:
				break;
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [type]);

	return (
		<Container key='list' fluid>
			<Row>
				<Col>
					<Form.Control
						type='text'
						id='searchBar'
						placeholder='Search'
					/>
				</Col>
				<Col></Col>
				<Col>{formButton}</Col>
			</Row>
			<Card>
				<ListGroup>{list}</ListGroup>
			</Card>
		</Container>
	);
};

export default List;
