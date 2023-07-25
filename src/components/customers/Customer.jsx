import { useNavigate } from 'react-router';

const Customer = ({ customer }) => {
	const navigate = useNavigate();
	return (
		<div>
			<h5>{customer.companyName}</h5>
			<p>{customer.address}</p>
			<p>{customer.companyPhone}</p>
			<button
				onClick={() => {
					navigate(`/customers/${customer.id}`);
				}}>
				Details
			</button>
		</div>
	);
};

export default Customer;
