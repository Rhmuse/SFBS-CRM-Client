import { useContext, useState } from 'react';
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
		orderStatusId: 1,
	});
	const { orderItems } = useContext(OrderFormContext);
	const [lineItemListChildren, setLineItemListChildren] = useState([]);

	useState(() => {
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
		</form>
	);
};

export default OrderForm;
