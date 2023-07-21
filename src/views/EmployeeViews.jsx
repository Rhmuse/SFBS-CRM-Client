import { Routes, Route, Outlet } from 'react-router';
import List from '../components/list/List';

// Forms
import LeadForm from '../components/leads/LeadForm';
import CustomerForm from '../components/customers/CustomerForm';
import EmployeeForm from '../components/employees/EmployeeFrom';
import OrderForm from '../components/orders/OrderForm';

const EmployeeViews = () => {
	return (
		<Routes>
			<Route path='/' element={<Outlet />}>
				<Route path='/dashboard' element={<></>} />

				<Route path='/customers' element={<List type='customers' />} />
				<Route path='/customers/form' element={<CustomerForm />} />

				<Route path='/leads' element={<List type='leads' />} />
				<Route path='/leads/form' element={<LeadForm />} />

				<Route path='/orders' element={<List type='orders' />} />
				<Route path='/orders/form' element={<OrderForm />} />

				<Route path='/invoices' element={<List type='invoices' />} />

				<Route path='/products' element={<List type='products' />} />

				<Route path='/employees' element={<List type='employees' />} />
				<Route path='/employees/form' element={<EmployeeForm />} />

				<Route path='/profile' element={<></>} />
				<Route path='/logout' element={<></>} />
			</Route>
		</Routes>
	);
};

export default EmployeeViews;
