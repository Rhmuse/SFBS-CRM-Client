import { useContext, useEffect, useState } from 'react';
import LineItem from './LineItem';
import Utilities from '../../Utilities';
import { OrderFormContext } from './OrderFormContainer';
import { useNavigate } from 'react-router';
import './OrderForm.css';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/esm/Container';

const Utility = new Utilities();
const generator = Utility.iteratorGenerator();
const formatter = Utilities.moneyFormatter;

const OrderForm = () => {
	const crmUserObject = JSON.parse(localStorage.getItem('crm_user'));
	const navigate = useNavigate();

	const [customers, setCustomers] = useState([]);
	const [products, setProducts] = useState([]);
	const [orderForm, setOrderForm] = useState({
		employeeId: crmUserObject.id,
		customerId: 0,
		orderDate: Date.now(),
	});
	const [orderTotal, setOrderTotal] = useState(0);
	const { orderItems } = useContext(OrderFormContext);
	const [lineItemListChildren, setLineItemListChildren] = useState([]);

	useEffect(() => {
		fetch('http://localhost:8088/customers')
			.then((res) => res.json())
			.then((data) => {
				setCustomers(data);
			});
		fetch('http://localhost:8088/products')
			.then((res) => res.json())
			.then((data) => {
				setProducts(data);
			});
	}, []);

	useEffect(() => {
		let total = 0;
		if (orderItems.length > 0) {
			for (const item of orderItems) {
				total += item.lineTotal;
			}
		}
		setOrderTotal(total);
	}, [orderItems]);

	const addLineItem = (e) => {
		e.preventDefault();

		let childrenCopy = [...lineItemListChildren];

		childrenCopy.push(
			<LineItem
				key={`lineItemKey-${generator.next().value}`}
				products={products}
				itemKey={`lineItem-${generator.next().value}`}
			/>
		);
		setLineItemListChildren(childrenCopy);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const orderObj = {
			employeeId: orderForm.employeeId,
			customerId: orderForm.customerId,
			orderDate: orderForm.orderDate,
			orderStatusId: 1,
			totalAmount: orderTotal,
		};

		const orderOptions = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(orderObj),
		};

		fetch('http://localhost:8088/orders', orderOptions)
			.then((res) => res.json())
			.then((data) => {
				for (const item of orderItems) {
					const itemObj = {
						orderId: data.id,
						productId: item.productId,
						quantity: item.quantity,
						lineTotal: item.lineTotal,
					};

					const itemOptions = {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(itemObj),
					};

					fetch('http://localhost:8088/orderItems', itemOptions).then(
						() => {
							fetch('http://localhost:8088/products')
								.then((res) => res.json())
								.then((data) => {
									const foundProduct = data.find(
										(p) => p.id === item.productId
									);

									const productUpdatObj = {
										...foundProduct,
										stockQuantity:
											foundProduct.stockQuantity -
											item.quantity,
									};

									const productOptions = {
										method: 'PUT',
										headers: {
											'Content-Type': 'application/json',
										},
										body: JSON.stringify(productUpdatObj),
									};

									fetch(
										`http://localhost:8088/products/${item.productId}`,
										productOptions
									);
									navigate('/orders');
								});
						}
					);
				}
			});
	};

	return (
		<Form>
			<h2>New Order</h2>
			<div className='customer-select-container'>
				<Form.Select
					id='customer-input'
					value={orderForm.customerId}
					onChange={(e) => {
						setOrderForm({
							...orderForm,
							customerId: parseInt(e.target.value),
						});
					}}>
					<option value={''}>Select a customer...</option>
					{customers.map((c) => {
						return (
							<option key={`customer-${c.id}`} value={c.id}>
								{c.companyName}
							</option>
						);
					})}
				</Form.Select>
				<Button
					onClick={(e) => {
						addLineItem(e);
					}}>
					Add Line Item
				</Button>
			</div>
			<div className='lineItemList' key={`lineItemList}`}>
				{lineItemListChildren}
			</div>
			<Container className='order-total-container'>
				<p>
					<b>Order Total: {formatter.format(orderTotal)}</b>
				</p>
			</Container>
			<Container className='new-button-container'>
				<Button
					onClick={(e) => {
						handleSubmit(e);
					}}>
					Submit Order
				</Button>
			</Container>
		</Form>
	);
};

export default OrderForm;
