import { useEffect } from 'react';

import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';

const Employee = ({ employee, locations }) => {
	useEffect(() => {
		const foundLocation = locations.find(
			(l) => l.id === employee.locationId
		);

		employee.location = foundLocation;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<ListGroup.Item
			className='flex-row flex'
			action
			as={Link}
			to={`/employees/${employee.id}`}>
			<div className='flex-column'>
				<p>
					{employee?.user?.firstName} {employee?.user?.lastName}
				</p>
				<p>Email: {employee?.user?.email}</p>
				<p>Location: {employee?.location?.name}</p>
			</div>
		</ListGroup.Item>
	);
};

export default Employee;
