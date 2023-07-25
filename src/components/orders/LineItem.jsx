import { useContext, useEffect, useState } from 'react';
import { OrderFormContext } from './OrderFormContainer';

import Form from 'react-bootstrap/Form';

const LineItem = ({ products, itemKey }) => {
	// TODO: Add search feature
	const [productId, setProductId] = useState(0);
	const [product, setProduct] = useState({
		id: 0,
		name: '',
		description: '',
		unitPrice: 0,
		stockQuantity: 0,
		weightLbs: 0,
	});
	const [quantity, setQuantity] = useState(0);
	const [maxQuantity, setMaxQuantity] = useState(0);
	const [lineTotal, setLineTotal] = useState(0);
	const { orderItems } = useContext(OrderFormContext);
	const { setOrderItems } = useContext(OrderFormContext);

	useEffect(() => {
		const foundItemIndex = orderItems.findIndex(
			(i) => i.itemKey === itemKey
		);
		if (foundItemIndex > -1) {
			let copy = [...orderItems];
			copy[foundItemIndex] = {
				...copy[foundItemIndex],
				productId: productId,
			};
			setOrderItems(copy);
		} else {
			setOrderItems([
				...orderItems,
				{
					productId: productId,
					itemKey: itemKey,
					quantity: 0,
					lineTotal: 0,
				},
			]);
		}
		const foundProduct = products.find((p) => p.id === productId);
		setProduct(foundProduct);
		setMaxQuantity(foundProduct?.stockQuantity);
		setQuantity(0);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [productId]);

	useEffect(() => {
		const foundItemIndex = orderItems.findIndex(
			(i) => i.itemKey === itemKey
		);
		if (foundItemIndex > -1) {
			let copy = [...orderItems];
			copy[foundItemIndex] = {
				...copy[foundItemIndex],
				quantity: quantity,
				lineTotal: lineTotal,
			};
			setOrderItems(copy);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [quantity, lineTotal]);

	useEffect(() => {
		if (product?.unitPrice) {
			setLineTotal(product?.unitPrice * quantity);
		} else {
			setLineTotal(0);
		}
	}, [quantity, productId, product]);

	return (
		<div key={itemKey} className='flex-row flex'>
			<Form.Select
				onChange={(e) => setProductId(parseInt(e.target.value))}>
				<option>Select a product...</option>
				{products.map((p) => {
					return (
						<option
							key={`product-${itemKey}-${p.id}`}
							value={parseInt(p.id)}>
							{p.name}
						</option>
					);
				})}
			</Form.Select>
			<Form.Label htmlFor={`quantity-input-${itemKey}`}>
				Quantity:{' '}
			</Form.Label>
			<Form.Control
				id={`quantity-input-${itemKey}`}
				type='number'
				max={maxQuantity}
				min={0}
				value={quantity}
				onChange={(e) => setQuantity(parseInt(e.target.value))}
			/>
			<div>
				<p>Unit Price: {product?.unitPrice}</p>
				<p>Line Total: {lineTotal}</p>
			</div>
		</div>
	);
};

export default LineItem;
