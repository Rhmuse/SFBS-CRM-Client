import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const Employee = ({ employee, locations }) => {
	const navigate = useNavigate();

	useEffect(() => {
		const foundLocation = locations.find(
			(l) => l.id === employee.locationId
		);

		employee.location = foundLocation;
	}, []);

	const handleClick = (e) => {
		e.preventDefault();
		navigate(`/employees/profile/${employee.id}`);
	};

	return (
		<div className='flex-row flex'>
			<div className='flex-column'>
				<p>
					{employee?.user?.firstName} {employee?.user?.lastName}
				</p>
				<p>Email: {employee?.user?.email}</p>
				<p>Location: {employee?.location?.name}</p>
			</div>
			<button onClick={(e) => handleClick(e)}>Employee Details</button>
		</div>
	);
};

export default Employee;
