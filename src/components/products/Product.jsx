const Product = ({ product }) => {
	return (
		<div>
			<h3>{product.name}</h3>
			<p>{product.description}</p>
			<p>Available Quantity: {product.stockQuantity}</p>
			<p>${product.unitPrice}</p>
		</div>
	);
};

export default Product;
