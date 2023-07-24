import { useState } from 'react';

const ProductForm = () => {
	const [productForm, setProductForm] = useState({
		name: '',
		description: '',
		unitPrice: 0,
		stockQuantity: 0,
		weightLbs: 0,
	});

	return <></>;
};

export default ProductForm;
