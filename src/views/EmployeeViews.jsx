import { Routes, Route, Outlet } from 'react-router';
import List from '../components/list/List';

// Forms
import LeadForm from '../components/leads/LeadForm';
import CustomerForm from '../components/customers/CustomerForm';
import EmployeeForm from '../components/employees/EmployeeForm';
import OrderFormContainer from '../components/orders/OrderFormContainer';
import ProductForm from '../components/products/ProductForm';

// Details
import EmployeeProfile from '../components/employees/EmployeeProfile';
import ProductDetails from '../components/products/ProductDetails';

import Dashboard from '../components/dashboard/Dashboard';
import OrderDetails from '../components/orders/OrderDetails';
import LeadDetails from '../components/leads/LeadDetails';
import CustomerDetails from '../components/customers/CustomerDetails';

const EmployeeViews = () => {
	return (
		<Routes>
			<Route path='/' element={<Outlet />}>
				<Route path='/dashboard' element={<Dashboard />} />

				{/* Customers */}
				<Route path='/customers' element={<List type='customers' />} />
				<Route path='/customers/form' element={<CustomerForm />} />
				<Route
					path='/customers/:customerId'
					element={<CustomerDetails />}
				/>
				<Route
					path='/customers/edit/:customerId'
					element={<CustomerForm />}
				/>

				{/* Leads */}
				<Route path='/leads' element={<List type='leads' />} />
				<Route path='/leads/form' element={<LeadForm />} />
				<Route path='/leads/:leadId' element={<LeadDetails />} />
				<Route path='/leads/edit/:leadId' element={<LeadForm />} />

				{/* Orders */}
				<Route path='/orders' element={<List type='orders' />} />
				<Route path='/orders/form' element={<OrderFormContainer />} />
				<Route path='/orders/:orderId' element={<OrderDetails />} />

				{/* Products */}
				<Route path='/products' element={<List type='products' />} />
				<Route path='/products/form' element={<ProductForm />} />
				<Route
					path='/products/:productId'
					element={<ProductDetails />}
				/>
				<Route
					path='/products/edit/:productId'
					element={<ProductForm />}
				/>

				{/* Employees */}
				<Route path='/employees' element={<List type='employees' />} />
				<Route path='/employees/form' element={<EmployeeForm />} />
				<Route
					path='/employees/edit/:userId/:payRate/:gender/:hireDate/:locationId/:employeeId'
					element={<EmployeeForm />}
				/>
				<Route
					path='/employees/profile/:employeeId'
					element={<EmployeeProfile />}
				/>

				<Route
					path='/profile/:employeeId'
					element={<EmployeeProfile />}
				/>
				<Route path='/logout' element={<></>} />
			</Route>
		</Routes>
	);
};

export default EmployeeViews;
