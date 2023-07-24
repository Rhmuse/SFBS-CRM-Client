import { useEffect } from 'react';

const Employee = ({ employee, locations }) => {
	useEffect(() => {
		const foundLocation = locations.find(
			(l) => l.id === employee.locationId
		);

		employee.location = foundLocation;
	}, []);

	return (
		<div>
			<p>
				{employee?.user?.firstName} {employee?.user?.lastName}
			</p>
			<p>
				Email: {employee?.user?.email}
				Phone Number: {employee?.user?.phone}
				Gender: {employee.gender}
				Location: {employee?.location?.name}
			</p>
		</div>
	);
};

export default Employee;
