import { useEffect, useState } from 'react';
import './LeadForm.css';
import { useNavigate, useParams } from 'react-router';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/esm/Container';

const LeadForm = () => {
	const [leadForm, setLeadForm] = useState({
		companyName: '',
		contactFirstName: '',
		contactLastName: '',
		contactEmail: '',
		contactPhone: '',
		address: '',
		companyPhone: '',
		leadStatusId: 1,
	});

	const params = useParams();
	const navigate = useNavigate();

	const handleSaveButton = (e) => {
		e.preventDefault();

		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(leadForm),
		};

		fetch('http://localhost:8088/leads', options).then(() => {
			setLeadForm({
				companyName: '',
				contactFirstName: '',
				contactLastName: '',
				contactEmail: '',
				contactPhone: '',
				address: '',
				companyPhone: '',
				leadStatusId: 1,
			});
		});
	};

	const handleEditButton = (e) => {
		e.preventDefault();

		const options = {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(leadForm),
		};

		fetch(`http://localhost:8088/leads/${params.leadId}`, options).then(
			() => {
				navigate('/leads');
			}
		);
	};

	useEffect(() => {
		if (params['*'].includes('edit')) {
			fetch(`http://localhost:8088/leads/${params.leadId}`)
				.then((res) => res.json())
				.then((lead) => {
					setLeadForm({
						companyName: lead.companyName,
						contactFirstName: lead.contactFirstName,
						contactLastName: lead.contactLastName,
						contactEmail: lead.contactEmail,
						contactPhone: lead.contactPhone,
						address: lead.address,
						companyPhone: lead.companyPhone,
						leadStatusId: lead.leadStatusId,
					});
				});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<Form>
			<h2>New Lead</h2>

			<Form.Label htmlFor='companyName-input'>Company Name: </Form.Label>
			<Form.Control
				type='text'
				id='companyName-input'
				value={leadForm.companyName}
				onChange={(e) => {
					setLeadForm({
						...leadForm,
						companyName: e.target.value,
					});
				}}
			/>

			<Form.Label htmlFor='contactFirstName-input'>
				Contact First Name:{' '}
			</Form.Label>
			<Form.Control
				type='text'
				id='contactFirstName-input'
				value={leadForm.contactFirstName}
				onChange={(e) => {
					setLeadForm({
						...leadForm,
						contactFirstName: e.target.value,
					});
				}}
			/>

			<Form.Label htmlFor='contactLastName-input'>
				Contact Last Name:{' '}
			</Form.Label>
			<Form.Control
				type='text'
				id='contactLastName-input'
				value={leadForm.contactLastName}
				onChange={(e) => {
					setLeadForm({
						...leadForm,
						contactLastName: e.target.value,
					});
				}}
			/>

			<Form.Label htmlFor='contactEmail-input'>Email: </Form.Label>
			<Form.Control
				type='text'
				id='contactEmail-input'
				value={leadForm.contactEmail}
				onChange={(e) => {
					setLeadForm({
						...leadForm,
						contactEmail: e.target.value,
					});
				}}
			/>

			<Form.Label htmlFor='contactPhone-input'>
				Contact Phone Number:{' '}
			</Form.Label>
			<Form.Control
				type='text'
				id='contactPhone-input'
				value={leadForm.contactPhone}
				onChange={(e) => {
					setLeadForm({
						...leadForm,
						contactPhone: e.target.value,
					});
				}}
			/>

			<Form.Label htmlFor='address-input'>Address: </Form.Label>
			<Form.Control
				type='text'
				id='address-input'
				value={leadForm.address}
				onChange={(e) => {
					setLeadForm({
						...leadForm,
						address: e.target.value,
					});
				}}
			/>

			<Form.Label htmlFor='companyPhone-input'>
				Company Phone Number:
			</Form.Label>
			<Form.Control
				type='text'
				id='companyPhone-input'
				value={leadForm.companyPhone}
				onChange={(e) => {
					setLeadForm({
						...leadForm,
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
						Save New Lead
					</Button>
				)}
			</Container>
		</Form>
	);
};

export default LeadForm;
