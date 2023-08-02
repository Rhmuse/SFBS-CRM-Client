import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import Utilities from '../../Utilities';
import AreYouSureDialog from '../dialogBoxes/AreYouSureDialog';
import Button from 'react-bootstrap/esm/Button';
import ListGroup from 'react-bootstrap/esm/ListGroup';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import Card from 'react-bootstrap/esm/Card';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/esm/Container';
import { createInvoice as downloadPdf } from '../invoices/createInvoice';
import Comments from '../comments/Comments';

const OrderDetails = () => {
	const [order, setOrder] = useState({});
	const [lineItems, setLineItems] = useState();
	const [customer, setCustomer] = useState();

	const [renderDialogBox, setRenderDialogBox] = useState(false);
	const [confirmDelete, setConfirmDelete] = useState(false);

	const { orderId } = useParams();

	const crmUserObject = JSON.parse(localStorage.getItem('crm_user'));
	const navigate = useNavigate();
	const formatter = Utilities.moneyFormatter;

	useEffect(() => {
		fetch(`http://localhost:8088/orders/${orderId}`)
			.then((res) => res.json())
			.then((order) => {
				setOrder(order);
				fetch(`http://localhost:8088/customers?id=${order.customerId}`)
					.then((res) => res.json())
					.then((customer) => {
						setCustomer(customer[0]);
					});
			});
		fetch(`http://localhost:8088/orderItems?orderId=${orderId}`)
			.then((res) => res.json())
			.then((items) => {
				fetch(`http://localhost:8088/products`)
					.then((res) => res.json())
					.then((products) => {
						for (const item of items) {
							const foundProduct = products.find(
								(p) => p.id === item.productId
							);
							item.product = foundProduct;
						}

						setLineItems(items);
					});
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (confirmDelete) {
			const deleteOptions = {
				method: 'DELETE',
			};

			fetch(
				`http://localhost:8088/orders/${orderId}`,
				deleteOptions
			).then(() => {
				navigate('/orders');
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [confirmDelete]);

	return (
		<Card>
			<Card.Header>
				<Card.Title>
					<h3>Order #{order.id}</h3>
				</Card.Title>
			</Card.Header>
			<Card.Body>
				<ListGroup variant='flush'>
					<ListGroup.Item>{customer?.companyName}</ListGroup.Item>
					<ListGroup.Item>
						Delivery Address: {customer?.address}
					</ListGroup.Item>
					<ListGroup.Item>
						Phone Number: {customer?.companyPhone}
					</ListGroup.Item>
					<ListGroup.Item>
						<h5>Line Items: </h5>
						<ListGroup>
							{lineItems?.map((item) => {
								return (
									<ListGroup.Item
										action
										as={Link}
										to={`/products/${item?.productId}`}
										key={`lineitem--${item.id}`}>
										<Row>
											<Col>{item?.product?.name}</Col>
											<Col></Col>
											<Col>Quantity: {item.quantity}</Col>
											<Col>
												UnitPrice:{' '}
												{formatter.format(
													item?.product?.unitPrice
												)}
											</Col>
											<Col>
												Line Total:{' '}
												{formatter.format(
													item.lineTotal
												)}
											</Col>
										</Row>
									</ListGroup.Item>
								);
							})}
							<ListGroup.Item>
								<Row>
									<Col></Col>
									<Col></Col>
									<Col></Col>
									<Col></Col>
									<Col>
										Order Total:{' '}
										{formatter.format(order.totalAmount)}
									</Col>
								</Row>
							</ListGroup.Item>
						</ListGroup>
					</ListGroup.Item>
				</ListGroup>
				{Utilities.isManager(crmUserObject) ? (
					<Container className='edit-delete-container'>
						<Button
							onClick={() => {
								downloadPdf(order.id);
							}}>
							Download Invoice
						</Button>
						<Button
							variant='tertiary'
							onClick={() => {
								setRenderDialogBox(true);
							}}>
							Delete
						</Button>
					</Container>
				) : (
					''
				)}
			</Card.Body>
			{order.id ? (
				<Container>
					<Comments id={order.id} table={'orders'} />
				</Container>
			) : (
				''
			)}
			<AreYouSureDialog
				isOpen={renderDialogBox}
				setRenderDialogBox={setRenderDialogBox}
				setConfirmAction={setConfirmDelete}
				action={'delete this order'}
			/>
		</Card>
	);
};

export default OrderDetails;
