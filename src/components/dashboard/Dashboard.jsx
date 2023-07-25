import Utilities from '../../Utilities';
import Announcements from '../widgets/Announcements';

const Dashboard = () => {
	const crmUserObject = JSON.parse(localStorage.getItem('crm_user'));

	if (Utilities.isSalesperson(crmUserObject)) {
		return (
			<div>
				<h2>Welcome, {crmUserObject.firstName}!</h2>
				<div>
					<Announcements />
				</div>
			</div>
		);
	}

	if (Utilities.isManager(crmUserObject)) {
		return (
			<div>
				<h2>Welcome, {crmUserObject.firstName}!</h2>
				<div>
					<Announcements />
				</div>
			</div>
		);
	}

	return (
		<div>
			<h2>Welcome, {crmUserObject.firstName}!</h2>
		</div>
	);
};

export default Dashboard;
