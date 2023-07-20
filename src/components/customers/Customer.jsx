const Customer = ({ customer }) => {
	return (
		<div>
			<h5>{customer.companyName}</h5>
			<p>{customer.address}</p>
			<p>{customer.companyPhone}</p>
		</div>
	);
};

export default Customer;
