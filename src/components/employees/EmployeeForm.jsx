import { useEffect, useState } from 'react';
import './EmployeeForm.css';

const genderArr = ['Female', 'Male', 'Nonbinary', 'N/A'];

const EmployeeForm = () => {
	const [employeeForm, setEmployeeForm] = useState({
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
		payRate: 0,
		gender: '',
		hireDate: '',
		roles: [],
		locationId: 0,
	});
	const [locations, setLocations] = useState([]);
	const [roles, setRoles] = useState([]);

	useEffect(() => {
		fetch('http://localhost:8088/locations')
			.then((res) => res.json())
			.then((data) => {
				setLocations(data);
			});
		fetch('http://localhost:8088/roles')
			.then((res) => res.json())
			.then((data) => {
				setRoles(data);
			});
	}, []);

	const handleSaveButton = (e) => {
		e.preventDefault();

		const userObj = {
			firstName: employeeForm.firstName,
			lastName: employeeForm.lastName,
			phone: employeeForm.phone,
			email: employeeForm.email,
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
				const employeeObj = {
					userId: data.id,
					payRate: employeeForm.payRate,
					gender: employeeForm.gender,
					hireDate: employeeForm.hireDate,
					locationId: employeeForm.locationId,
				};

				const options = {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(employeeObj),
				};

				fetch('http://localhost:8088/employees', options);

				employeeForm.roles.forEach((r) => {
					const userRoleObj = {
						userId: data.id,
						roleId: r,
					};

					const options = {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(userRoleObj),
					};

					fetch('http://localhost:8088/userRoles', options);
				});
			})
			.then(() => {
				setEmployeeForm({
					firstName: '',
					lastName: '',
					email: '',
					phone: '',
					payRate: 0,
					gender: '',
					hireDate: '',
					roles: [],
					locationId: 0,
				});
			});
	};
	return (
		<form>
			<fieldset>
				<div className='form-group'>
					<label htmlFor='firstName-input'>First Name: </label>
					<input
						type='text'
						id='firstName-input'
						value={employeeForm.firstName}
						onChange={(e) => {
							setEmployeeForm({
								...employeeForm,
								firstName: e.target.value,
							});
						}}
					/>
				</div>
			</fieldset>
			<fieldset>
				<div className='form-group'>
					<label htmlFor='lastName-input'>Last Name: </label>
					<input
						type='text'
						id='lastName-input'
						value={employeeForm.lastName}
						onChange={(e) => {
							setEmployeeForm({
								...employeeForm,
								lastName: e.target.value,
							});
						}}
					/>
				</div>
			</fieldset>
			<fieldset>
				<div className='form-group'>
					<label htmlFor='email-input'>Email: </label>
					<input
						type='text'
						id='email-input'
						value={employeeForm.email}
						onChange={(e) => {
							setEmployeeForm({
								...employeeForm,
								email: e.target.value,
							});
						}}
					/>
				</div>
			</fieldset>
			<fieldset>
				<div className='form-group'>
					<label htmlFor='phone-input'>Phone Number: </label>
					<input
						type='text'
						id='phone-input'
						value={employeeForm.phone}
						onChange={(e) => {
							setEmployeeForm({
								...employeeForm,
								phone: e.target.value,
							});
						}}
					/>
				</div>
			</fieldset>
			<fieldset>
				<div className='form-group'>
					<label htmlFor='payRate-input'>Pay Rate: </label>
					<input
						type='number'
						id='payRate-input'
						value={employeeForm.payRate}
						onChange={(e) => {
							setEmployeeForm({
								...employeeForm,
								payRate: parseFloat(e.target.value),
							});
						}}
					/>
				</div>
			</fieldset>
			<fieldset>
				<div className='form-group'>
					<label htmlFor='gender-input'>Gender: </label>
					<select
						id='gender-input'
						value={employeeForm.gender}
						onChange={(e) => {
							setEmployeeForm({
								...employeeForm,
								gender: e.target.value,
							});
						}}>
						<option value={''}>Select a gender...</option>
						{genderArr.map((g) => {
							return (
								<option key={`gender-${g}`} value={g}>
									{g}
								</option>
							);
						})}
					</select>
				</div>
			</fieldset>
			<fieldset>
				<div className='form-group'>
					<label htmlFor='hireDate-input'>Hire Date: </label>
					<input
						type='date'
						id='hireDate-input'
						value={employeeForm.hireDate}
						onChange={(e) => {
							setEmployeeForm({
								...employeeForm,
								hireDate: e.target.value,
							});
						}}
					/>
				</div>
			</fieldset>
			<fieldset>
				<div className='form-group'>
					<label htmlFor='location-input'>Location: </label>
					<select
						id='location-input'
						value={employeeForm.locationId}
						onChange={(e) => {
							setEmployeeForm({
								...employeeForm,
								locationId: parseInt(e.target.value),
							});
						}}>
						<option value={''}>Select a location...</option>
						{locations.map((l) => {
							return (
								<option key={`location-${l.id}`} value={l.id}>
									{l.name}
								</option>
							);
						})}
					</select>
				</div>
			</fieldset>
			<fieldset>
				<div className='form-group'>
					<legend>Roles: </legend>
					<div className='role-input-container'>
						{/* TODO: Remove Customer as an option and clear checkboxs on send */}
						{roles.map((role) => {
							return (
								<div key={`role-${role.id}`}>
									<input
										id={`role-${role.id}`}
										value={role.id}
										type='checkbox'
										name='roles'
										className='role-input'
										onChange={(e) => {
											if (e.target.checked) {
												setEmployeeForm({
													...employeeForm,
													roles: [
														...employeeForm.roles,
														parseInt(
															e.target.value
														),
													],
												});
											} else {
												setEmployeeForm({
													...employeeForm,
													roles: employeeForm.roles.filter(
														(r) =>
															r !==
															parseInt(
																e.target.value
															)
													),
												});
											}
										}}
									/>
									<label htmlFor={`role-${role.id}`}>
										{role.name}
									</label>
								</div>
							);
						})}
					</div>
				</div>
			</fieldset>
			<button
				className='btn btn-primary'
				onClick={(e) => handleSaveButton(e)}>
				Save Employee
			</button>
		</form>
	);
};

export default EmployeeForm;