import { useState } from 'react';

const ProductForm = () => {
	const [productForm, setProductForm] = useState({
		name: '',
		description: '',
		unitPrice: 0,
		stockQuantity: 0,
		weightLbs: 0,
	});

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

	return (
		<form>
			<h2>New Product</h2>
			<fieldset>
				<div className='form-group'>
					<label htmlFor='product-input'>Product Name:</label>
					<input
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
				</div>
			</fieldset>
			<fieldset>
				<div className='form-group'>
					<label htmlFor='product-input'>Product Description:</label>
					<input
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
				</div>
			</fieldset>
			<fieldset>
				<div className='form-group'>
					<label htmlFor='productUnitPrice-input'>
						Product Price Per Unit:
					</label>
					<input
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
				</div>
			</fieldset>
			<fieldset>
				<div className='form-group'>
					<label htmlFor='productStockQuantity-input'>
						Stock Quantity:
					</label>
					<input
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
				</div>
			</fieldset>
			<fieldset>
				<div className='form-group'>
					<label htmlFor='product-input'>
						Product Weight in Pounds:
					</label>
					<input
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
				</div>
			</fieldset>
			<button
				className='btn btn-primary'
				onClick={(e) => handleSaveButton(e)}>
				Save Product
			</button>
		</form>
	);
};

export default ProductForm;
