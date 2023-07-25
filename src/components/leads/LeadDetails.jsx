import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import Utilities from '../../Utilities';
import AreYouSureDialog from '../dialogBoxes/AreYouSureDialog';
import Button from 'react-bootstrap/esm/Button';

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
	}, [confirmDelete]);

	return (
		<div>
			<h3>{lead.companyName}</h3>
			{Utilities.isManager(crmUserObject) ||
			lead.assignedEmployeeId === crmUserObject.id ? (
				<>
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
				</>
			) : (
				''
			)}
			<AreYouSureDialog
				isOpen={renderDialogBox}
				setRenderDialogBox={setRenderDialogBox}
				setConfirmAction={setConfirmDelete}
				action={'delete this lead'}
			/>
		</div>
	);
};

export default LeadDetails;
