import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './Login.css';

import Form from 'react-bootstrap/esm/Form';
import Card from 'react-bootstrap/esm/Card';
import Button from 'react-bootstrap/esm/Button';
import Container from 'react-bootstrap/esm/Container';

export const Login = () => {
	const [email, set] = useState('john.doe@example.com');
	const navigate = useNavigate();

	const handleLogin = (e) => {
		e.preventDefault();

		return fetch(
			`http://localhost:8088/users?email=${email}&_embed=userRoles`
		)
			.then((res) => res.json())
			.then((foundUsers) => {
				if (foundUsers.length === 1) {
					const user = foundUsers[0];
					let roles;
					fetch('http://localhost:8088/roles')
						.then((res) => res.json())
						.then((data) => (roles = data))
						.then(() => {
							user.roles = [];
							user.userRoles.forEach((role) => {
								user.roles.push(
									roles.find((r) => r.id === role.roleId).name
								);
							});
							localStorage.setItem(
								'crm_user',
								JSON.stringify({
									id: user.id,
									roles: user.roles,
									firstName: user.firstName,
								})
							);

							navigate('/dashboard');
						});
				} else {
					window.alert('Invalid login');
				}
			});
	};

	return (
		<Container className='login-container'>
			<Card className='login'>
				<Card.Header>
					<Card.Title className='logo-container'>
						<Card.Img
							src={require('./dm-logo.png')}
							alt='logo'
							className='login-logo'
						/>
					</Card.Title>
				</Card.Header>

				<Card.Body>
					<Form onSubmit={handleLogin}>
						<h2>Please sign in</h2>

						<Form.Label htmlFor='inputEmail'>
							{' '}
							Email address{' '}
						</Form.Label>
						<Form.Control
							type='email'
							value={email}
							onChange={(evt) => set(evt.target.value)}
							className='form-control'
							placeholder='Email address'
							required
							autoFocus
						/>
						<Container className='new-button-container'>
							{' '}
							<Button type='submit'>Sign in</Button>
						</Container>
					</Form>
				</Card.Body>
			</Card>
		</Container>
	);
};
