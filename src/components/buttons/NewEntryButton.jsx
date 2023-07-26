import { useNavigate } from 'react-router';
import Utilities from '../../Utilities';

import Button from 'react-bootstrap/Button';

const NewEntryButton = ({ type }) => {
	const navigate = useNavigate();

	const handleClick = (e) => {
		e.preventDefault();

		navigate(`/${type}/form`);
	};

	return (
		<Button onClick={(e) => handleClick(e)}>
			New {Utilities.capitalize(type).substring(0, type.length - 1)}
		</Button>
	);
};

export default NewEntryButton;
