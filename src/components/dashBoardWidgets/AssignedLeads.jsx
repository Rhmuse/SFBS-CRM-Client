import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/esm/Card';
import ListGroup from 'react-bootstrap/esm/ListGroup';

import './AssignedLeads.css';

const AssignedLeads = () => {
	const crmUserObject = JSON.parse(localStorage.getItem('crm_user'));

	const [leads, setLeads] = useState([]);

	useEffect(() => {
		fetch(
			`http://localhost:8088/leads?assignedEmployeeId=${crmUserObject.id}`
		)
			.then((res) => res.json())
			.then((l) => {
				setLeads(l);
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Card>
			<Card.Header>
				<Card.Title>
					<h4 className='lead-widget-title'>Your Assigned Leads</h4>
				</Card.Title>
			</Card.Header>
			<Card.Body>
				<ListGroup className='assigned-leads-list'>
					{leads.map((l) => {
						return (
							<ListGroup.Item
								action
								as={Link}
								to={`/leads/${l.id}`}
								key={`assigned-lead-${l.id}`}>
								<h6>{l.companyName}</h6>
								<p>
									Contact: {l.contactFirstName}{' '}
									{l.contactLastName}
								</p>
								<p>Contact Phone Number: {l.contactPhone}</p>
							</ListGroup.Item>
						);
					})}
				</ListGroup>
			</Card.Body>
		</Card>
	);
};

export default AssignedLeads;
