import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const ProductForm = () => {
	const [productForm, setProductForm] = useState({
		name: '',
		description: '',
		unitPrice: 0,
		stockQuantity: 0,
		weightLbs: 0,
	});

	const params = useParams();
	const navigate = useNavigate();

	const handleSaveButton = (e) => {
		e.preventDefault();

		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(productForm),
		};

		fetch('http://localhost:8088/products', options).then(() => {
			setProductForm({
				name: '',
				description: '',
				unitPrice: 0,
				stockQuantity: 0,
				weightLbs: 0,
			});
		});
	};

	const handleEditButton = (e) => {
		e.preventDefault();

		const options = {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(productForm),
		};

		fetch(
			`http://localhost:8088/products/${params.productId}`,
			options
		).then(() => {
			navigate('/products');
		});
	};

	useEffect(() => {
		if (params['*'].includes('edit')) {
			fetch(`http://localhost:8088/products/${params.productId}`)
				.then((res) => res.json())
				.then((product) => {
					setProductForm({
						name: product.name,
						description: product.description,
						unitPrice: product.unitPrice,
						stockQuantity: product.stockQuantity,
						weightLbs: product.weightLbs,
					});
				});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Form>
			<h2>New Product</h2>
			<Form.Label htmlFor='product-input'>Product Name:</Form.Label>
			<Form.Control
				type='text'
				id='productName-input'
				value={productForm.name}
				onChange={(e) => {
					setProductForm({
						...productForm,
						name: e.target.value,
					});
				}}
			/>

			<Form.Label htmlFor='product-input'>
				Product Description:
			</Form.Label>
			<Form.Control
				type='text'
				id='productDescription-input'
				value={productForm.description}
				onChange={(e) => {
					setProductForm({
						...productForm,
						description: e.target.value,
					});
				}}
			/>

			<Form.Label htmlFor='productUnitPrice-input'>
				Product Price Per Unit:
			</Form.Label>
			<Form.Control
				type='number'
				id='productUnitPrice-input'
				step='.01'
				value={productForm.unitPrice}
				onChange={(e) => {
					setProductForm({
						...productForm,
						unitPrice: parseFloat(e.target.value),
					});
				}}
			/>

			<Form.Label htmlFor='productStockQuantity-input'>
				Stock Quantity:
			</Form.Label>
			<Form.Control
				type='number'
				id='productStockQuantity-input'
				value={productForm.stockQuantity}
				onChange={(e) => {
					setProductForm({
						...productForm,
						stockQuantity: parseInt(e.target.value),
					});
				}}
			/>

			<Form.Label htmlFor='product-input'>
				Product Weight in Pounds:
			</Form.Label>
			<Form.Control
				type='number'
				id='product-input'
				step='.01'
				value={productForm.weightLbs}
				onChange={(e) => {
					setProductForm({
						...productForm,
						weightLbs: parseFloat(e.target.value),
					});
				}}
			/>

			{params['*'].includes('edit') ? (
				<Button
					className='btn btn-primary'
					onClick={(e) => handleEditButton(e)}>
					Save Changes
				</Button>
			) : (
				<Button
					className='btn btn-primary'
					onClick={(e) => handleSaveButton(e)}>
					Save New Product
				</Button>
			)}
		</Form>
	);
};

export default ProductForm;
