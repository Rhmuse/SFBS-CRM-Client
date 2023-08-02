import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/esm/Container';
import Card from 'react-bootstrap/esm/Card';

const CustomerForm = () => {
	const [customerForm, setCustomerForm] = useState({
		companyName: '',
		address: '',
		companyPhone: '',
		contactFirstName: '',
		contactLastName: '',
		contactEmail: '',
		contactPhone: '',
		userId: 0,
	});

	const params = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		if (params['*'].includes('edit')) {
			fetch(`http://localhost:8088/customers/${params.customerId}`)
				.then((res) => res.json())
				.then((customer) => {
					fetch(`http://localhost:8088/users/${customer.userId}`)
						.then((res) => res.json())
						.then((user) => {
							setCustomerForm({
								companyName: customer.companyName,
								address: customer.address,
								companyPhone: customer.companyPhone,
								contactFirstName: user.firstName,
								contactLastName: user.lastName,
								contactEmail: user.email,
								contactPhone: user.phone,
								userId: customer.userId,
								leadId: customer.leadId,
							});
						});
				});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleSaveButton = (e) => {
		e.preventDefault();

		const userObj = {
			firstName: customerForm.contactFirstName,
			lastName: customerForm.contactLastName,
			phone: customerForm.contactPhone,
			email: customerForm.email,
		};

		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(userObj),
		};

		fetch('http://localhost:8088/users', options)
			.then((res) => res.json())
			.then((data) => {
				const options = {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(customerForm),
				};

				fetch('http://localhost:8088/customers', options).then(() => {
					setCustomerForm({
						companyName: '',
						address: '',
						companyPhone: '',
						contactFirstName: '',
						contactLastName: '',
						contactEmail: '',
						contactPhone: '',
						userId: data.id,
					});
				});
			});
		navigate('/customers');
	};

	const handleEditButton = (e) => {
		e.preventDefault();

		const userObj = {
			id: customerForm.userId,
			firstName: customerForm.contactFirstName,
			lastName: customerForm.contactLastName,
			phone: customerForm.contactPhone,
			email: customerForm.contactEmail,
		};

		const userOptions = {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(userObj),
		};

		fetch(
			`http://localhost:8088/users/${customerForm.userId}`,
			userOptions
		);

		const customerObj = {
			companyName: customerForm.companyName,
			address: customerForm.address,
			companyPhone: customerForm.companyPhone,
			userId: customerForm.userId,
			leadId: customerForm.leadId,
		};

		const customerOptions = {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(customerObj),
		};

		fetch(
			`http://localhost:8088/customers/${params.customerId}`,
			customerOptions
		);
		navigate('/customers');
	};

	return (
		<Card>
			<Card.Header>
				<Card.Title>
					<h3>Customer Form</h3>
				</Card.Title>
			</Card.Header>
			<Card.Body>
				<Form>
					<Form.Label htmlFor='companyName-input'>
						Company Name:{' '}
					</Form.Label>
					<Form.Control
						type='text'
						id='companyName-input'
						value={customerForm.companyName}
						onChange={(e) => {
							setCustomerForm({
								...customerForm,
								companyName: e.target.value,
							});
						}}
					/>
					<hr />
					<Form.Label htmlFor='contactFirstName-input'>
						Contact First Name:{' '}
					</Form.Label>
					<Form.Control
						type='text'
						id='contactFirstName-input'
						value={customerForm.contactFirstName}
						onChange={(e) => {
							setCustomerForm({
								...customerForm,
								contactFirstName: e.target.value,
							});
						}}
					/>
					<hr />
					<Form.Label htmlFor='contactLastName-input'>
						Contact Last Name:{' '}
					</Form.Label>
					<Form.Control
						type='text'
						id='contactLastName-input'
						value={customerForm.contactLastName}
						onChange={(e) => {
							setCustomerForm({
								...customerForm,
								contactLastName: e.target.value,
							});
						}}
					/>
					<hr />
					<Form.Label htmlFor='contactEmail-input'>
						Email:{' '}
					</Form.Label>
					<Form.Control
						type='text'
						id='contactEmail-input'
						value={customerForm.contactEmail}
						onChange={(e) => {
							setCustomerForm({
								...customerForm,
								contactEmail: e.target.value,
							});
						}}
					/>
					<hr />
					<Form.Label htmlFor='contactPhone-input'>
						Contact Phone Number:{' '}
					</Form.Label>
					<Form.Control
						type='text'
						id='contactPhone-input'
						value={customerForm.contactPhone}
						onChange={(e) => {
							setCustomerForm({
								...customerForm,
								contactPhone: e.target.value,
							});
						}}
					/>
					<hr />
					<Form.Label htmlFor='address-input'>Address: </Form.Label>
					<Form.Control
						type='text'
						id='address-input'
						value={customerForm.address}
						onChange={(e) => {
							setCustomerForm({
								...customerForm,
								address: e.target.value,
							});
						}}
					/>
					<hr />
					<Form.Label htmlFor='companyPhone-input'>
						Company Phone Number:
					</Form.Label>
					<Form.Control
						type='text'
						id='companyPhone-input'
						value={customerForm.companyPhone}
						onChange={(e) => {
							setCustomerForm({
								...customerForm,
								companyPhone: e.target.value,
							});
						}}
					/>
					<Container className='new-button-container'>
						{params['*'].includes('edit') ? (
							<Button
								className='btn btn-primary'
								onClick={(e) => handleEditButton(e)}>
								Save Changes
							</Button>
						) : (
							<Button
								className='btn btn-primary'
								onClick={(e) => handleSaveButton(e)}>
								Save New Customer
							</Button>
						)}
					</Container>
				</Form>
			</Card.Body>
		</Card>
	);
};

export default CustomerForm;
