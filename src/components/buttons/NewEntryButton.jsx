import { useNavigate } from 'react-router';
import Utilities from '../../Utilities';

const NewEntryButton = ({ type }) => {
	const navigate = useNavigate();

	const handleClick = (e) => {
		e.preventDefault();

		navigate(`/${type}/form`);
	};

	return (
		<button onClick={(e) => handleClick(e)}>
			New {Utilities.capitalize(type)}
		</button>
	);
};

export default NewEntryButton;
