import { Link, NavLink, useNavigate } from 'react-router-dom';
import './NavBar.css';
import Nav from 'react-bootstrap/Nav';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';

const NavBar = () => {
	const crmUserObject = JSON.parse(localStorage.getItem('crm_user'));

	const navigate = useNavigate();

	if (crmUserObject.roles.find((r) => r === 'Customer')) {
		return (
			<Nav>
				<Row className='nav-container'>
					<Col>
						<img alt='logo' />
					</Col>

					<Col>
						{' '}
						<Link to='/orders'>My Orders</Link>
					</Col>
					<Col></Col>
					<Col></Col>
					<Col>
						<Link to='/logout'>Logout</Link>
					</Col>
				</Row>
			</Nav>
		);
	} else if (crmUserObject.roles.find((r) => r === 'Employee')) {
		return (
			<Row>
				<Nav
					activeKey='/dashboard'
					className='flex flex-row nav-container'>
					<Col>
						<Nav.Item>
							<Nav.Link
								as={NavLink}
								to={'/dashboard'}
								className='nav-item'>
								Dashboard
							</Nav.Link>
						</Nav.Item>
					</Col>
					<Col>
						<Nav.Item>
							<Nav.Link
								as={NavLink}
								to={'/customers'}
								className='nav-item'>
								Customers
							</Nav.Link>
						</Nav.Item>
					</Col>
					<Col>
						<Nav.Item>
							<Nav.Link
								as={NavLink}
								to={'/leads'}
								className='nav-item'>
								Leads
							</Nav.Link>
						</Nav.Item>
					</Col>
					<Col>
						<Nav.Item>
							<Nav.Link
								as={NavLink}
								to={'/orders'}
								className='nav-item'>
								Orders
							</Nav.Link>
						</Nav.Item>
					</Col>
					<Col>
						<Nav.Item>
							<Nav.Link
								as={NavLink}
								to={'/invoices'}
								className='nav-item'>
								Invoices
							</Nav.Link>
						</Nav.Item>
					</Col>
					<Col>
						<Nav.Item>
							<Nav.Link
								as={NavLink}
								to={'/products'}
								className='nav-item'>
								Products
							</Nav.Link>
						</Nav.Item>
					</Col>
					<Col>
						<Nav.Item>
							<Nav.Link
								as={NavLink}
								to={'/employees'}
								className='nav-item'>
								Employees
							</Nav.Link>
						</Nav.Item>
					</Col>
					<Col></Col>
					<Col>
						<Nav.Item className='flex flex-row profile'>
							<Nav.Item>
								<Nav.Link
									as={NavLink}
									to={'/profile'}
									className='nav-item'>
									Profile
								</Nav.Link>
							</Nav.Item>
							{localStorage.getItem('crm_user') ? (
								<Nav.Link
									className='nav-item'
									as={Link}
									to=''
									onClick={() => {
										localStorage.removeItem('crm_user');
										navigate('/', { replace: true });
									}}>
									Logout
								</Nav.Link>
							) : (
								''
							)}
						</Nav.Item>
					</Col>
				</Nav>
			</Row>
			// <nav className='flex flex-row nav-container space-between'>
			// 	<img alt='logo' />
			// 	<div className='flex flex-row space-between'>
			// 		<Link to='/dashboard' className='nav-link'>
			// 			Dashboard
			// 		</Link>
			// 		<Link to='/customers' className='nav-link'>
			// 			Customers
			// 		</Link>
			// 		<Link to='/leads' className='nav-link'>
			// 			Leads
			// 		</Link>
			// 		<Link to='/orders' className='nav-link'>
			// 			Orders
			// 		</Link>
			// 		<Link to='/invoices' className='nav-link'>
			// 			Invoices
			// 		</Link>
			// 		<Link to='/products' className='nav-link'>
			// 			Products
			// 		</Link>
			// 		<Link to='/employees' className='nav-link'>
			// 			Employees
			// 		</Link>
			// 		<div className='flex flex-row profile'>
			// 			<Link to='/profile' className='nav-link'>
			// 				Profile
			// 			</Link>
			// 			{localStorage.getItem('crm_user') ? (
			// 				<div className='nav-logout'>
			// 					<Link
			// 						className='nav-link'
			// 						to=''
			// 						onClick={() => {
			// 							localStorage.removeItem('crm_user');
			// 							navigate('/', { replace: true });
			// 						}}>
			// 						Logout
			// 					</Link>
			// 				</div>
			// 			) : (
			// 				''
			// 			)}
			// 		</div>
			// 	</div>
			// </nav>
		);
	}
};

export default NavBar;
