import { useContext, useEffect, useState } from 'react';
import LineItem from './LineItem';
import Utilities from '../../Utilities';
import { OrderFormContext } from './OrderFormContainer';

const Utility = new Utilities();
const generator = Utility.iteratorGenerator();

const OrderForm = () => {
	const crmUserObject = JSON.parse(localStorage.getItem('crm_user'));

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
			<fieldset key={`lineItemKey-${generator.next().value}`}>
				{
					<LineItem
						products={products}
						itemKey={`lineItem-${generator.next().value}`}
					/>
				}
			</fieldset>
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
								});
						}
					);
				}
			});
	};

	return (
		<form>
			<fieldset>
				<div className='form-group'>
					<label htmlFor='customer-input'>Customer: </label>
					<select
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
					</select>
				</div>
			</fieldset>
			<button
				onClick={(e) => {
					addLineItem(e);
				}}>
				Add Line Item
			</button>
			<div className='lineItemList' key={`lineItemList}`}>
				{lineItemListChildren}
			</div>
			<div>Order Total: {orderTotal}</div>
			<button
				onClick={(e) => {
					handleSubmit(e);
				}}>
				Submit Order
			</button>
		</form>
	);
};

export default OrderForm;
