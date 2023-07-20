import { Routes, Route, Outlet } from 'react-router';
import List from '../components/list/List';

const EmployeeViews = () => {
	return (
		<Routes>
			<Route path='/' element={<Outlet />}>
				<Route path='/dashboard' element={<></>} />
				<Route path='/customers' element={<List type='customers' />} />
				<Route path='/leads' element={<List type='leads' />} />
				<Route path='/orders' element={<List type='orders' />} />
				<Route path='/invoices' element={<List type='invoices' />} />
				<Route path='/products' element={<List type='products' />} />
				<Route path='/employees' element={<List type='employees' />} />
				<Route path='/profile' element={<></>} />
				<Route path='/logout' element={<></>} />
			</Route>
		</Routes>
	);
};

export default EmployeeViews;
