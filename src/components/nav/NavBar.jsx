import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
	const crmUserObject = JSON.parse(localStorage.getItem('crm_user'));

	const navigate = useNavigate();

	if (crmUserObject.roles.find((r) => r === 'Customer')) {
		return (
			<nav className='flex flex-row nav-container'>
				<img alt='logo' />
				<div className='flex flex-row space-between'>
					<Link to='/orders'>My Orders</Link>
					<Link to='/logout'>Logout</Link>
				</div>
			</nav>
		);
	} else if (crmUserObject.roles.find((r) => r === 'Employee')) {
		return (
			<nav className='flex flex-row nav-container space-between'>
				<img alt='logo' />
				<div className='flex flex-row space-between'>
					<Link to='/dashboard' className='nav-link'>
						Dashboard
					</Link>
					<Link to='/customers' className='nav-link'>
						Customers
					</Link>
					<Link to='/leads' className='nav-link'>
						Leads
					</Link>
					<Link to='/orders' className='nav-link'>
						Orders
					</Link>
					<Link to='/invoices' className='nav-link'>
						Invoices
					</Link>
					<Link to='/products' className='nav-link'>
						Products
					</Link>
					<Link to='/employees' className='nav-link'>
						Employees
					</Link>
					<div className='flex flex-row profile'>
						<Link to='/profile' className='nav-link'>
							Profile
						</Link>
						{localStorage.getItem('crm_user') ? (
							<div className='nav-logout'>
								<Link
									className='nav-link'
									to=''
									onClick={() => {
										localStorage.removeItem('crm_user');
										navigate('/', { replace: true });
									}}>
									Logout
								</Link>
							</div>
						) : (
							''
						)}
					</div>
				</div>
			</nav>
		);
	}
};

export default NavBar;
