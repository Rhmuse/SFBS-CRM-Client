const Dashboard = () => {
	const crmUserObject = JSON.parse(localStorage.getItem('crm_user'));

	return <h2>Welcome, {crmUserObject.firstName}!</h2>;
};

export default Dashboard;
