/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';
import Utilities from '../../Utilities';
import AreYouSureDialog from '../dialogBoxes/AreYouSureDialog';
import Button from 'react-bootstrap/esm/Button';
import ListGroup from 'react-bootstrap/esm/ListGroup';
import Order from '../orders/Order';

const CustomerDetails = () => {
	const [customer, setCustomer] = useState({});
	const [orders, setOrders] = useState([]);
	const [user, setUser] = useState({});
	const [lead, setLead] = useState({});
	const [renderDialogBox, setRenderDialogBox] = useState(false);
	const [confirmDelete, setConfirmDelete] = useState(false);

	const { customerId } = useParams();

	const crmUserObject = JSON.parse(localStorage.getItem('crm_user'));
	const navigate = useNavigate();

	useEffect(() => {
		fetch(`http://localhost:8088/customers/${customerId}`)
			.then((res) => res.json())
			.then((customer) => {
				setCustomer(customer);
				fetch(`http://localhost:8088/users/${customer.userId}`)
					.then((res) => res.json())
					.then((u) => {
						setUser(u);
					});
			});
		fetch(`http://localhost:8088/orders?customerId=${customerId}`)
			.then((res) => res.json())
			.then((o) => {
				setOrders(o);
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
		<ListGroup>
			<ListGroup.Item>
				<h3>{customer.companyName}</h3>
				<p>{customer.address}</p>
				<p>{customer.companyPhone}</p>
			</ListGroup.Item>
			<ListGroup.Item>
				<ListGroup>
					{orders.map((order) => {
						return (
							<Order
								key={`orderItem--${order.id}`}
								order={order}
							/>
						);
					})}
				</ListGroup>
			</ListGroup.Item>
			{Utilities.isManager(crmUserObject) ? (
				<ListGroup.Item className='edit-delete-container'>
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
				</ListGroup.Item>
			) : (
				''
			)}
			<AreYouSureDialog
				isOpen={renderDialogBox}
				setRenderDialogBox={setRenderDialogBox}
				setConfirmAction={setConfirmDelete}
				action={'delete this customer'}
			/>
		</ListGroup>
	);
};

export default CustomerDetails;
