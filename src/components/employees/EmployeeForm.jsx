import { useEffect, useState } from 'react';
import './EmployeeForm.css';
import { useParams } from 'react-router';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

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

	const params = useParams();

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

		if (params['*'].includes('edit')) {
			fetch(`http://localhost:8088/userRoles?userId=${params.userId}`)
				.then((res) => res.json())
				.then((userRoles) => {
					let userRoleIdArr = [];
					for (const role of userRoles) {
						userRoleIdArr.push(role.roleId);
					}
					fetch(`http://localhost:8088/users/${params.userId}`)
						.then((res) => res.json())
						.then((data) => {
							setEmployeeForm({
								firstName: data.firstName,
								lastName: data.lastName,
								email: data.email,
								phone: data.phone,
								payRate: parseFloat(params.payRate),
								gender: params.gender,
								hireDate: params.hireDate,
								roles: userRoleIdArr,
								locationId: parseInt(params.locationId),
							});
						});
				});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
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

	const handleEditButton = (e) => {
		e.preventDefault();

		const userObj = {
			firstName: employeeForm.firstName,
			lastName: employeeForm.lastName,
			phone: employeeForm.phone,
			email: employeeForm.email,
		};

		const options = {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(userObj),
		};

		fetch(`http://localhost:8088/users/${params.userId}`, options)
			.then((res) => res.json())
			.then((data) => {
				const employeeObj = {
					userId: data.id,
					payRate: employeeForm.payRate,
					gender: employeeForm.gender,
					hireDate: employeeForm.hireDate,
					locationId: employeeForm.locationId,
				};

				const employeeOptions = {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(employeeObj),
				};

				fetch(
					`http://localhost:8088/employees/${params.employeeId}`,
					employeeOptions
				);

				fetch(`http://localhost:8088/userRoles?userId=${params.userId}`)
					.then((res) => res.json())
					.then((userRoles) => {
						for (const userRole of userRoles) {
							const userRolesDeleteOptions = {
								method: 'DELETE',
								headers: {
									'Content-Type': 'application/json',
								},
							};
							fetch(
								`http://localhost:8088/userRoles/${userRole.id}`,
								userRolesDeleteOptions
							);
						}
					})
					.then(() => {
						employeeForm.roles.forEach((r) => {
							const userRoleObj = {
								userId: parseInt(params.userId),
								roleId: r,
							};

							const userRoleOptions = {
								method: 'POST',
								headers: {
									'Content-Type': 'application/json',
								},
								body: JSON.stringify(userRoleObj),
							};

							fetch(
								'http://localhost:8088/userRoles',
								userRoleOptions
							);
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
			});
	};
	return (
		<Form>
			<Form.Label htmlFor='firstName-input'>First Name: </Form.Label>
			<Form.Control
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

			<Form.Label htmlFor='lastName-input'>Last Name: </Form.Label>
			<Form.Control
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

			<Form.Label htmlFor='email-input'>Email: </Form.Label>
			<Form.Control
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

			<Form.Label htmlFor='phone-input'>Phone Number: </Form.Label>
			<Form.Control
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

			<Form.Label htmlFor='payRate-input'>Pay Rate: </Form.Label>
			<Form.Control
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

			<Form.Label htmlFor='gender-input'>Gender: </Form.Label>
			<Form.Select
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
			</Form.Select>

			<Form.Label htmlFor='hireDate-input'>Hire Date: </Form.Label>
			<Form.Control
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

			<Form.Label htmlFor='location-input'>Location: </Form.Label>
			<Form.Select
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
			</Form.Select>

			<legend>Roles: </legend>
			<div className='role-input-container'>
				{/* TODO: Remove Customer as an option and clear checkboxs on send and populate checkboxes on redirect */}
				{roles.map((role) => {
					return (
						<div key={`role-${role.id}`}>
							<Form.Check
								id={`role-${role.id}`}
								value={role.id}
								type='checkbox'
								name='roles'
								label={role.name}
								className='role-input'
								onChange={(e) => {
									if (e.target.checked) {
										setEmployeeForm({
											...employeeForm,
											roles: [
												...employeeForm.roles,
												parseInt(e.target.value),
											],
										});
									} else {
										setEmployeeForm({
											...employeeForm,
											roles: employeeForm.roles.filter(
												(r) =>
													r !==
													parseInt(e.target.value)
											),
										});
									}
								}}
							/>
						</div>
					);
				})}
			</div>

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
					Save New Employee
				</Button>
			)}
		</Form>
	);
};

export default EmployeeForm;
