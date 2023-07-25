import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

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

	useEffect(() => {
		if (params['*'].includes('edit')) {
			fetch(`http://localhost:8088/customers/${params.customerId}`)
				.then((res) => res.json())
				.then((customer) => {
					setCustomerForm({
						companyName: customer.companyName,
						address: customer.address,
						companyPhone: customer.companyPhone,
						contactFirstName: '',
						contactLastName: '',
						contactEmail: '',
						contactPhone: '',
						userId: customer.userId,
						leadId: customer.leadId,
					});

					fetch(`http://localhost:8088/users/${customerForm.userId}`)
						.then((res) => res.json())
						.then((user) => {
							setCustomerForm({
								...customerForm,
								contactFirstName: user.firstName,
								contactLastName: user.lastName,
								contactEmail: user.email,
								contactPhone: user.phone,
							});
						});
				});
		}
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
			compnayPhone: customerForm.companyPhone,
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
	};

	return (
		<form>
			<fieldset>
				<div className='form-group'>
					<label htmlFor='companyName-input'>Company Name: </label>
					<input
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
				</div>
			</fieldset>
			<fieldset>
				<div className='form-group'>
					<label htmlFor='contactFirstName-input'>
						Contact First Name:{' '}
					</label>
					<input
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
				</div>
			</fieldset>
			<fieldset>
				<div className='form-group'>
					<label htmlFor='contactLastName-input'>
						Contact Last Name:{' '}
					</label>
					<input
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
				</div>
			</fieldset>
			<fieldset>
				<div className='form-group'>
					<label htmlFor='contactEmail-input'>Email: </label>
					<input
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
				</div>
			</fieldset>
			<fieldset>
				<div className='form-group'>
					<label htmlFor='contactPhone-input'>
						Contact Phone Number:{' '}
					</label>
					<input
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
				</div>
			</fieldset>
			<fieldset>
				<div className='form-group'>
					<label htmlFor='address-input'>Address: </label>
					<input
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
				</div>
			</fieldset>
			<fieldset>
				<div className='form-group'>
					<label htmlFor='companyPhone-input'>
						Company Phone Number:
					</label>
					<input
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
				</div>
			</fieldset>
			{params['*'].includes('edit') ? (
				<button
					className='btn btn-primary'
					onClick={(e) => handleEditButton(e)}>
					Save Changes
				</button>
			) : (
				<button
					className='btn btn-primary'
					onClick={(e) => handleSaveButton(e)}>
					Save New Customer
				</button>
			)}
		</form>
	);
};

export default CustomerForm;
