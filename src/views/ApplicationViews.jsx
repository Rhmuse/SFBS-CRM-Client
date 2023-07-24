import Utilities from '../Utilities';
import EmployeeViews from './EmployeeViews';

const ApplicationViews = () => {
	const crmUserObject = JSON.parse(localStorage.getItem('crm_user'));

	if (Utilities.isEmployee(crmUserObject)) {
		return <EmployeeViews />;
	} else {
		return <>oops</>;
	}
};

export default ApplicationViews;
