import { Link, NavLink, useNavigate } from 'react-router-dom';
import './NavBar.css';
import Nav from 'react-bootstrap/Nav';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import Image from 'react-bootstrap/esm/Image';
import Navbar from 'react-bootstrap/esm/Navbar';
import NavDropdown from 'react-bootstrap/esm/NavDropdown';
import Container from 'react-bootstrap/esm/Container';
import Offcanvas from 'react-bootstrap/esm/Offcanvas';
import { useState } from 'react';

const NavBar = () => {
	const crmUserObject = JSON.parse(localStorage.getItem('crm_user'));

	const [expanded, setExpanded] = useState(false);

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
			<Navbar expand='lg' expanded={expanded}>
				<Container fluid>
					<Navbar.Brand as={NavLink} to={'/dashboard'}>
						<Image
							src={require('./dm-logo.png')}
							alt='logo'
							className='logo'
						/>
					</Navbar.Brand>
					<Navbar.Toggle
						onClick={() =>
							setExpanded(expanded ? false : 'expanded')
						}
					/>
					<Navbar.Offcanvas
						className='nav-collapse-container bg-body-secondary'
						placement='end'>
						<Offcanvas.Header closeButton>
							<Offcanvas.Title>
								<b>Menu</b>
							</Offcanvas.Title>
						</Offcanvas.Header>
						<Offcanvas.Body>
							<Nav className='nav-container'>
								<Nav.Link
									as={NavLink}
									to={'/dashboard'}
									onClick={() => setExpanded(false)}>
									<b>Dashboard</b>
								</Nav.Link>
								<Nav.Link
									as={NavLink}
									to={'/customers'}
									onClick={() => setExpanded(false)}>
									<b>Customers</b>
								</Nav.Link>
								<Nav.Link
									as={NavLink}
									to={'/leads'}
									onClick={() => setExpanded(false)}>
									<b>Leads</b>
								</Nav.Link>
								<Nav.Link
									as={NavLink}
									to={'/orders'}
									onClick={() => setExpanded(false)}>
									<b>Orders</b>
								</Nav.Link>
								<Nav.Link
									as={NavLink}
									to={'/products'}
									onClick={() => setExpanded(false)}>
									<b>Products</b>
								</Nav.Link>
								<Nav.Link
									as={NavLink}
									to={'/employees'}
									onClick={() => setExpanded(false)}>
									<b>Employees</b>
								</Nav.Link>
								<Nav.Item className='nav-profile-container'>
									<Nav.Link
										as={NavLink}
										to={`/profile/${crmUserObject.id}`}
										onClick={() => setExpanded(false)}>
										<b>Profile</b>
									</Nav.Link>
									<NavDropdown align='end'>
										<NavDropdown.Item
											as={Link}
											to=''
											onClick={() => {
												localStorage.removeItem(
													'crm_user'
												);
												navigate('/', {
													replace: true,
												});
											}}>
											Logout
										</NavDropdown.Item>
									</NavDropdown>
								</Nav.Item>
							</Nav>
						</Offcanvas.Body>
						<hr />
					</Navbar.Offcanvas>
				</Container>
			</Navbar>
		);
	}
};

export default NavBar;
