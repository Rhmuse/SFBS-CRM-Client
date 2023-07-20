import { Routes, Route, Outlet } from 'react-router';

const CustomerViews = () => {
	return (
		<Routes>
			<Route path='/' element={<Outlet />}>
				<Route path='/orders/:customerId' element={<></>} />
				<Route path='/logout' element={<></>} />
			</Route>
		</Routes>
	);
};

export default CustomerViews;
