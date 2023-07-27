import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import Utilities from '../../Utilities';
import AreYouSureDialog from '../dialogBoxes/AreYouSureDialog';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

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
		<Container>
			<div>
				<img src='#' alt='Profile' />
			</div>
			<div>
				<h3>
					{employee?.user?.firstName} {employee?.user?.lastName}
				</h3>
				<p>Email: {employee?.user?.email}</p>
				<p>Phone Number: {employee?.user?.phone}</p>
				<p>Gender: {employee.gender}</p>
				<p>Roles:</p>
				{employeeRoles.map((role) => {
					return <p key={`role--${role}`}>{role}</p>;
				})}
				{Utilities.isManager(crmUserObject) ? (
					<>
						<p>Pay Rate: ${employee.payRate}</p>
						<p>Hire Date: {employee.hireDate}</p>
						<Container className='edit-delete-container'>
							<Button
								onClick={() => {
									navigate(
										`/employees/edit/${employee?.user?.id}/${employee.payRate}/${employee.gender}/${employee.hireDate}/${employee.locationId}/${employee.id}`
									);
								}}>
								Edit
							</Button>
							<Button onClick={() => setRenderDialogBox(true)}>
								Delete
							</Button>
						</Container>
					</>
				) : (
					''
				)}
				<AreYouSureDialog
					isOpen={renderDialogBox}
					setRenderDialogBox={setRenderDialogBox}
					setConfirmAction={setConfirmDelete}
					action={'delete this employee'}
				/>
			</div>
		</Container>
	);
};

export default EmployeeProfile;
