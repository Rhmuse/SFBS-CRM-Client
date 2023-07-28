import { Link, NavLink, useNavigate } from 'react-router-dom';
import './NavBar.css';
import Nav from 'react-bootstrap/Nav';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import Image from 'react-bootstrap/esm/Image';
import Navbar from 'react-bootstrap/esm/Navbar';
import NavDropdown from 'react-bootstrap/esm/NavDropdown';
import Container from 'react-bootstrap/esm/Container';

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
			<Navbar>
				<Container>
					<Navbar.Brand>
						<Image
							src='https://wallpaperaccess.com/full/2376875.png'
							alt='logo'
							className='logo'
						/>
					</Navbar.Brand>
					<Navbar.Toggle />
					<Navbar.Collapse>
						<Nav>
							<Nav.Link as={NavLink} to={'/dashboard'}>
								Dashboard
							</Nav.Link>
							<Nav.Link as={NavLink} to={'/customers'}>
								Customers
							</Nav.Link>
							<Nav.Link as={NavLink} to={'/leads'}>
								Leads
							</Nav.Link>
							<Nav.Link as={NavLink} to={'/orders'}>
								Orders
							</Nav.Link>
							<Nav.Link as={NavLink} to={'/products'}>
								Products
							</Nav.Link>
							<Nav.Link as={NavLink} to={'/employees'}>
								Employees
							</Nav.Link>
							<Nav.Link
								as={NavLink}
								to={`/profile/${crmUserObject.id}`}>
								Profile
							</Nav.Link>
							<NavDropdown>
								<NavDropdown.Item
									as={Link}
									to=''
									onClick={() => {
										localStorage.removeItem('crm_user');
										navigate('/', { replace: true });
									}}>
									Logout
								</NavDropdown.Item>
							</NavDropdown>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		);
	}
};

export default NavBar;
