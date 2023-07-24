import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import Utilities from '../../Utilities';

const EmployeeProfile = () => {
	const { employeeId } = useParams();
	const [employee, setEmployee] = useState({});
	const [employeeRoles, setEmployeeRoles] = useState([]);

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
	}, []);

	const handleDelete = (e) => {
		e.preventDefault();

		// TODO: add dialog box popup to confirm delete and actually delete
	};

	return (
		<div className='flex flex-column'>
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
						<p>Pay Rate: {employee.payRate}</p>
						<p>Hire Date: {employee.hireDate}</p>
						<button
							onClick={() => {
								navigate(
									`/employees/edit/${employee?.user?.id}/${employee.payRate}/${employee.gender}/${employee.hireDate}/${employee.locationId}/${employee.id}`
								);
							}}>
							Edit
						</button>
						<button onClick={(e) => handleDelete(e)}>Delete</button>
					</>
				) : (
					''
				)}
			</div>
		</div>
	);
};

export default EmployeeProfile;
