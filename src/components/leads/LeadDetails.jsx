import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import Utilities from '../../Utilities';
import AreYouSureDialog from '../dialogBoxes/AreYouSureDialog';
import Button from 'react-bootstrap/esm/Button';
import Container from 'react-bootstrap/Container';
import Comments from '../comments/Comments';
import Card from 'react-bootstrap/esm/Card';
import ListGroup from 'react-bootstrap/esm/ListGroup';

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
		<Card>
			<Card.Body>
				<Card.Title>
					<h3>{lead.companyName}</h3>
				</Card.Title>
				<ListGroup variant='flush'>
					<ListGroup.Item>
						Company Phone Number: {lead.companyPhone}
					</ListGroup.Item>
					<ListGroup.Item>
						Contact: {lead.contactFirstName} {lead.contactLastName}
					</ListGroup.Item>
					<ListGroup.Item>
						Contact Phone Number: {lead.contactPhone}
					</ListGroup.Item>
					<ListGroup.Item>
						Contact Email: {lead.contactEmail}
					</ListGroup.Item>
					<ListGroup.Item>Address: {lead.address}</ListGroup.Item>
				</ListGroup>
			</Card.Body>
			{Utilities.isManager(crmUserObject) ||
			lead.assignedEmployeeId === crmUserObject.id ? (
				<>
					<Container className='edit-delete-container'>
						<Button
							variant='secondary'
							onClick={() => {
								navigate(`/leads/edit/${lead.id}`);
							}}>
							Edit
						</Button>
						<Button
							variant='tertiary'
							onClick={() => {
								setRenderDialogBox(true);
							}}>
							Delete
						</Button>
					</Container>
					{lead.id ? (
						<Container>
							<Comments id={lead.id} table={'leads'} />
						</Container>
					) : (
						''
					)}
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
		</Card>
	);
};

export default LeadDetails;
