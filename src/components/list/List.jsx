import { useEffect, useState } from 'react';
import Order from '../orders/Order';
import Customer from '../customers/Customer';
import Lead from '../leads/Lead';
import Employee from '../employees/Employee';
import Product from '../products/Product';
import NewEntryButton from '../buttons/NewEntryButton';
import './List.css';
import Utilities from '../../Utilities';

//BootStrap
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const List = ({ type }) => {
	const [list, setList] = useState([]);
	const [filteredList, setFilteredList] = useState([]);
	const [newEntryButton, setNewEntryButton] = useState();
	const [searchTerm, setSearchTerm] = useState('');

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
						setFilteredList(orders);
						setNewEntryButton(<NewEntryButton type={type} />);
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
						setFilteredList(customers);
						setNewEntryButton(<NewEntryButton type={type} />);
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
									const foundLocation = locations.find(
										(l) => l.id === employee.locationId
									);

									employee.location = foundLocation;
									return (
										<Employee
											key={`employee--${employee.id}`}
											employee={employee}
										/>
									);
								});
								setList(employees);
								setFilteredList(employees);
								if (Utilities.isManager(crmUserObject))
									setNewEntryButton(
										<NewEntryButton type={type} />
									);
								else setNewEntryButton('');
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
						setFilteredList(leads);
						setNewEntryButton(<NewEntryButton type={type} />);
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
						setFilteredList(products);
						setNewEntryButton(<NewEntryButton type={type} />);
					});
				break;
			default:
				break;
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [type]);

	useEffect(() => {
		const listCopy = [...list];
		let filtered;
		switch (type) {
			case 'customers':
				filtered = listCopy.filter((i) =>
					i.props.customer.companyName
						.toLowerCase()
						.includes(searchTerm.toLowerCase())
				);
				setFilteredList(filtered);
				break;
			case 'leads':
				filtered = listCopy.filter(
					(i) =>
						i.props.lead.companyName
							.toLowerCase()
							.includes(searchTerm.toLowerCase()) ||
						i.props.lead.contactFirstName
							.toLowerCase()
							.includes(searchTerm.toLowerCase()) ||
						i.props.lead.contactLastName
							.toLowerCase()
							.includes(searchTerm.toLowerCase())
				);
				setFilteredList(filtered);
				break;
			case 'orders':
				filtered = listCopy.filter(
					(i) =>
						i.props.order.customer.companyName
							.toLowerCase()
							.includes(searchTerm.toLowerCase()) ||
						i.props.order.id.toString().includes(searchTerm)
				);
				setFilteredList(filtered);
				break;
			case 'products':
				filtered = listCopy.filter(
					(i) =>
						i.props.product.name
							.toLowerCase()
							.includes(searchTerm.toLowerCase()) ||
						i.props.product.id.toString().includes(searchTerm)
				);
				setFilteredList(filtered);
				break;
			case 'employees':
				filtered = listCopy.filter(
					(i) =>
						i.props.employee.user.firstName
							.concat(` ${i.props.employee.user.lastName}`)
							.toLowerCase()
							.includes(searchTerm.toLowerCase()) ||
						i.props.employee.id.toString().includes(searchTerm)
				);
				setFilteredList(filtered);
				break;
			default:
				break;
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchTerm]);

	return (
		<Container key='list' fluid>
			<Row className='search-row'>
				<Col className='search-col'>
					<Form.Control
						type='text'
						id='searchBar'
						placeholder='Search'
						value={searchTerm}
						onChange={(e) => {
							setSearchTerm(e.target.value);
						}}
					/>
				</Col>
				<Col className='search-col'></Col>
				<Col className='newEntry-button search-col'>
					{newEntryButton}
				</Col>
			</Row>
			<Container className=''>
				<ListGroup>{filteredList}</ListGroup>
			</Container>
		</Container>
	);
};

export default List;
