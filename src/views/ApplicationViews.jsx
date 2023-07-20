import EmployeeViews from './EmployeeViews';

const ApplicationViews = () => {
	const crmUserObject = JSON.parse(localStorage.getItem('crm_user'));

	if (crmUserObject.roles.find((r) => r === 'Admin')) {
		return <EmployeeViews />;
	} else {
		return <>oops</>;
	}
};

export default ApplicationViews;
