import { Navigate, useLocation } from 'react-router-dom';

const Authorized = ({ children }) => {
	const location = useLocation();

	if (localStorage.getItem('crm_user')) {
		return children;
	} else {
		return (
			<Navigate
				to={`/login/${location.search}`}
				replace
				state={{ location }}
			/>
		);
	}
};

export default Authorized;
