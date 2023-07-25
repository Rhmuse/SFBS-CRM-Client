import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

const Employee = ({ employee, locations }) => {
	const navigate = useNavigate();

	useEffect(() => {
		const foundLocation = locations.find(
			(l) => l.id === employee.locationId
		);

		employee.location = foundLocation;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleClick = (e) => {
		e.preventDefault();
		navigate(`/employees/profile/${employee.id}`);
	};

	return (
		<ListGroup.Item className='flex-row flex'>
			<div className='flex-column'>
				<p>
					{employee?.user?.firstName} {employee?.user?.lastName}
				</p>
				<p>Email: {employee?.user?.email}</p>
				<p>Location: {employee?.location?.name}</p>
			</div>
			<Button onClick={(e) => handleClick(e)}>Employee Details</Button>
		</ListGroup.Item>
	);
};

export default Employee;
