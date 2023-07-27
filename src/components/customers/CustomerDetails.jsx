/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';
import Utilities from '../../Utilities';
import AreYouSureDialog from '../dialogBoxes/AreYouSureDialog';
import Button from 'react-bootstrap/esm/Button';
import Container from 'react-bootstrap/esm/Container';

const CustomerDetails = () => {
	const [customer, setCustomer] = useState({});
	const [renderDialogBox, setRenderDialogBox] = useState(false);
	const [confirmDelete, setConfirmDelete] = useState(false);

	const { customerId } = useParams();

	const crmUserObject = JSON.parse(localStorage.getItem('crm_user'));
	const navigate = useNavigate();

	useEffect(() => {
		fetch(
			`http://localhost:8088/customers/${customerId}?_embed=user&_embed=lead`
		)
			.then((res) => res.json())
			.then((customer) => {
				setCustomer(customer);
			});
	}, []);

	useEffect(() => {
		if (confirmDelete) {
			const deleteOptions = {
				method: 'DELETE',
			};

			fetch(
				`http://localhost:8088/customers/${customerId}`,
				deleteOptions
			).then(() => {
				navigate('/customers');
			});
		}
	}, [confirmDelete]);

	return (
		<div>
			<h3>{customer.companyName}</h3>
			<p>{customer.address}</p>
			<p>{customer.companyPhone}</p>
			{Utilities.isManager(crmUserObject) ? (
				<Container className='edit-delete-container'>
					<Button
						onClick={() => {
							navigate(`/customers/edit/${customer.id}`);
						}}>
						Edit
					</Button>
					<Button
						onClick={() => {
							setRenderDialogBox(true);
						}}>
						Delete
					</Button>
				</Container>
			) : (
				''
			)}
			<AreYouSureDialog
				isOpen={renderDialogBox}
				setRenderDialogBox={setRenderDialogBox}
				setConfirmAction={setConfirmDelete}
				action={'delete this customer'}
			/>
		</div>
	);
};

export default CustomerDetails;
