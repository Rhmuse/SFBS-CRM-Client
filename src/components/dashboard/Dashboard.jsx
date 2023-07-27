import Row from 'react-bootstrap/esm/Row';
import Utilities from '../../Utilities';
import Announcements from '../dashBoardWidgets/Announcements';

import Container from 'react-bootstrap/esm/Container';
import Col from 'react-bootstrap/esm/Col';

const Dashboard = () => {
	const crmUserObject = JSON.parse(localStorage.getItem('crm_user'));

	if (Utilities.isSalesperson(crmUserObject)) {
		return (
			<Container>
				<Row>
					<h2>Welcome, {crmUserObject.firstName}!</h2>
				</Row>
				<Row>
					<Col>
						<Announcements />
					</Col>
					<Col></Col>
				</Row>
				<Row>
					<Col></Col>
					<Col></Col>
				</Row>
			</Container>
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
