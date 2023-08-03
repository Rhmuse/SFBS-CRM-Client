import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import Utilities from '../../Utilities';
import AreYouSureDialog from '../dialogBoxes/AreYouSureDialog';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/esm/ListGroup';
import Card from 'react-bootstrap/esm/Card';
import Image from 'react-bootstrap/esm/Image';

const EmployeeProfile = () => {
	const { employeeId } = useParams();
	const [employee, setEmployee] = useState({});
	const [employeeRoles, setEmployeeRoles] = useState([]);
	const [renderDialogBox, setRenderDialogBox] = useState(false);
	const [confirmDelete, setConfirmDelete] = useState(false);

	const crmUserObject = JSON.parse(localStorage.getItem('crm_user'));
	const navigate = useNavigate();

	useEffect(() => {
		fetch(
			`http://localhost:8088/employees/${employeeId}?_expand=user&_expand=location`
		)
			.then((res) => res.json())
			.then((data) => {
				setEmployee(data);
				fetch(
					`http://localhost:8088/userRoles?userId=${data.user.id}&_expand=role`
				)
					.then((res) => res.json())
					.then((data) => {
						const roles = [];
						for (const r of data) {
							roles.push(r.role.name);
						}
						setEmployeeRoles(roles);
					});
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (confirmDelete) {
			const deleteOptions = {
				method: 'DELETE',
			};

			fetch(
				`http://localhost:8088/employees/${employeeId}`,
				deleteOptions
			).then(() => {
				navigate('/employees');
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [confirmDelete]);

	return (
		<Card>
			<Card.Header>
				<Card.Title className='flex flex-row'>
					<Image variant='roundedCircle' src='#' alt='Profile' />
					<h3>
						{employee?.user?.firstName} {employee?.user?.lastName}
					</h3>
				</Card.Title>
			</Card.Header>
			<Card.Body>
				<ListGroup variant='flush'>
					<ListGroup.Item>
						User Id: {employee?.user?.id}
					</ListGroup.Item>
					<ListGroup.Item>
						Email: {employee?.user?.email}
					</ListGroup.Item>
					<ListGroup.Item>
						Phone Number: {employee?.user?.phone}
					</ListGroup.Item>
					<ListGroup.Item>Gender: {employee.gender}</ListGroup.Item>
					<ListGroup.Item>
						Roles:
						<ListGroup>
							{employeeRoles.map((role) => {
								return (
									<ListGroup.Item key={`role--${role}`}>
										{role}
									</ListGroup.Item>
								);
							})}
						</ListGroup>
					</ListGroup.Item>
					{Utilities.isManager(crmUserObject) ? (
						<>
							<ListGroup.Item>
								Pay Rate: ${employee.payRate}
							</ListGroup.Item>
							<ListGroup.Item>
								Hire Date: {employee.hireDate}
							</ListGroup.Item>
							<Container className='edit-delete-container'>
								<Button
									variant='secondary'
									onClick={() => {
										navigate(
											`/employees/edit/${employee?.user?.id}/${employee.payRate}/${employee.gender}/${employee.hireDate}/${employee.locationId}/${employee.id}`
										);
									}}>
									Edit
								</Button>
								<Button
									variant='tertiary'
									onClick={() => setRenderDialogBox(true)}>
									Delete
								</Button>
							</Container>
						</>
					) : (
						''
					)}{' '}
				</ListGroup>
			</Card.Body>
			<AreYouSureDialog
				isOpen={renderDialogBox}
				setRenderDialogBox={setRenderDialogBox}
				setConfirmAction={setConfirmDelete}
				action={'delete this employee'}
			/>
		</Card>
	);
};

export default EmployeeProfile;
