import { useEffect, useState } from 'react';
import './LeadForm.css';
import { useNavigate, useParams } from 'react-router';

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
	}, []);
	return (
		<form>
			<h2>New Lead</h2>
			<fieldset>
				<div className='form-group'>
					<label htmlFor='companyName-input'>Company Name: </label>
					<input
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
						value={leadForm.contactFirstName}
						onChange={(e) => {
							setLeadForm({
								...leadForm,
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
						value={leadForm.contactLastName}
						onChange={(e) => {
							setLeadForm({
								...leadForm,
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
						value={leadForm.contactEmail}
						onChange={(e) => {
							setLeadForm({
								...leadForm,
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
						value={leadForm.contactPhone}
						onChange={(e) => {
							setLeadForm({
								...leadForm,
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
						value={leadForm.address}
						onChange={(e) => {
							setLeadForm({
								...leadForm,
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
						value={leadForm.companyPhone}
						onChange={(e) => {
							setLeadForm({
								...leadForm,
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
					Save New Lead
				</button>
			)}
		</form>
	);
};

export default LeadForm;
