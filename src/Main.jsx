import { Routes, Route } from 'react-router-dom';
import Authorized from './views/Authorized';
import NavBar from './components/nav/NavBar';
import ApplicationViews from './views/ApplicationViews';
import { Login } from './components/auth/Login';
import ChatBar from './components/chat/ChatBar';

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
							<ChatBar />
						</>
					</Authorized>
				}
			/>
		</Routes>
	);
};

export default Main;
