import { useState } from 'react';

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
			<button
				className='btn btn-primary'
				onClick={(e) => handleSaveButton(e)}>
				Save Customer
			</button>
		</form>
	);
};

export default CustomerForm;
