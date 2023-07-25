import { useNavigate } from 'react-router';

const Lead = ({ lead }) => {
	const navigate = useNavigate();

	return (
		<div>
			<h3>{lead.companyName}</h3>
			<button
				onClick={() => {
					navigate(`/leads/${lead.id}`);
				}}>
				Details
			</button>
		</div>
	);
};

export default Lead;
