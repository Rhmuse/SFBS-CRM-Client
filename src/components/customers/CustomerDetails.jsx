/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';
import Utilities from '../../Utilities';
import AreYouSureDialog from '../dialogBoxes/AreYouSureDialog';
import Button from 'react-bootstrap/esm/Button';
import ListGroup from 'react-bootstrap/esm/ListGroup';
import Order from '../orders/Order';
import Comments from '../comments/Comments';
import Container from 'react-bootstrap/esm/Container';
import Card from 'react-bootstrap/esm/Card';

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
		<Card>
			<Card.Body>
				<Card.Title>
					<h3>{customer.companyName}</h3>
				</Card.Title>
				<ListGroup variant='flush'>
					<ListGroup.Item>
						Address:
						{customer.address}
					</ListGroup.Item>
					<ListGroup.Item>
						Company Phone Number: {customer.companyPhone}
					</ListGroup.Item>
				</ListGroup>

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

				{Utilities.isManager(crmUserObject) ? (
					<ListGroup.Item>
						<Container className='edit-delete-container'>
							<Button
								variant='secondary'
								className='details-button'
								onClick={() => {
									navigate(`/customers/edit/${customer.id}`);
								}}>
								Edit
							</Button>
							<Button
								variant='tertiary'
								className='details-button'
								onClick={() => {
									setRenderDialogBox(true);
								}}>
								Delete
							</Button>
						</Container>
					</ListGroup.Item>
				) : (
					''
				)}
			</Card.Body>
			{customer.id ? (
				<Container>
					<Comments id={customer.id} table={'customers'} />
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
		</Card>
	);
};

export default CustomerDetails;
