import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import Utilities from '../../Utilities';
import AreYouSureDialog from '../dialogBoxes/AreYouSureDialog';
import Button from 'react-bootstrap/esm/Button';
import Container from 'react-bootstrap/Container';

const LeadDetails = () => {
	const [lead, setLead] = useState({});

	const [renderDialogBox, setRenderDialogBox] = useState(false);
	const [confirmDelete, setConfirmDelete] = useState(false);

	const { leadId } = useParams();

	const crmUserObject = JSON.parse(localStorage.getItem('crm_user'));
	const navigate = useNavigate();

	useEffect(() => {
		fetch(`http://localhost:8088/leads/${leadId}`)
			.then((res) => res.json())
			.then((lead) => {
				setLead(lead);
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (confirmDelete) {
			const deleteOptions = {
				method: 'DELETE',
			};

			fetch(`http://localhost:8088/leads/${leadId}`, deleteOptions).then(
				() => {
					navigate('/leads');
				}
			);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [confirmDelete]);

	return (
		<Container>
			<h3>{lead.companyName}</h3>
			<p>Company Phone Number: {lead.companyPhone}</p>
			<p>
				Contact: {lead.contactFirstName} {lead.contactLastName}
			</p>
			<p>Contact Phone Number: {lead.contactPhone}</p>
			<p>Contact Email: {lead.contactEmail}</p>
			<p>Address: {lead.address}</p>
			{Utilities.isManager(crmUserObject) ||
			lead.assignedEmployeeId === crmUserObject.id ? (
				<Container className='edit-delete-container'>
					<Button
						onClick={() => {
							navigate(`/leads/edit/${lead.id}`);
						}}>
						Edit
					</Button>
					<Button
						onClick={() => {
							setRenderDialogBox(true);
						}}>
						Delete
					</Button>
				</Container>
			) : (
				''
			)}
			<AreYouSureDialog
				isOpen={renderDialogBox}
				setRenderDialogBox={setRenderDialogBox}
				setConfirmAction={setConfirmDelete}
				action={'delete this lead'}
			/>
		</Container>
	);
};

export default LeadDetails;
