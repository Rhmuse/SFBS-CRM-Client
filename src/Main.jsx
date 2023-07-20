import { Routes, Route } from 'react-router-dom';
import Authorized from './views/Authorized';
import NavBar from './components/nav/NavBar';
import ApplicationViews from './views/ApplicationViews';
import { Login } from './components/auth/Login';

const Main = () => {
	return (
		<Routes>
			<Route path='/login' element={<Login />} />

			<Route
				path='*'
				element={
					<Authorized>
						<>
							<NavBar />
							<ApplicationViews />
						</>
					</Authorized>
				}
			/>
		</Routes>
	);
};

export default Main;
