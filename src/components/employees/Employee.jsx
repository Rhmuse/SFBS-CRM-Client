import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/esm/Container';
import { Link } from 'react-router-dom';

const Employee = ({ employee }) => {
	return (
		<ListGroup.Item
			className='flex-row flex'
			action
			as={Link}
			to={`/employees/profile/${employee.id}`}>
			<Container className='flex-column'>
				<h4>
					{employee?.user?.firstName} {employee?.user?.lastName}
				</h4>
				<p>Email: {employee?.user?.email}</p>
				<p>Location: {employee?.location?.name}</p>
			</Container>
		</ListGroup.Item>
	);
};

export default Employee;
