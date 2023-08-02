import Utilities from '../Utilities';
import EmployeeViews from './EmployeeViews';

import Container from 'react-bootstrap/esm/Container';

const ApplicationViews = () => {
	const crmUserObject = JSON.parse(localStorage.getItem('crm_user'));

	if (Utilities.isEmployee(crmUserObject)) {
		return (
			<Container className='main-view-container'>
				<EmployeeViews />
			</Container>
		);
	} else {
		return <>oops</>;
	}
};

export default ApplicationViews;
