import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';

const Employee = ({ employee }) => {
	return (
		<ListGroup.Item
			className='flex-row flex'
			action
			as={Link}
			to={`/employees/profile/${employee.id}`}>
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
