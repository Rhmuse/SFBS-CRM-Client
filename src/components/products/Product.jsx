import { useNavigate } from 'react-router';

const Product = ({ product }) => {
	const navigate = useNavigate();
	return (
		<div>
			<h3>{product.name}</h3>
			<p>{product.description}</p>
			<p>Available Quantity: {product.stockQuantity}</p>
			<p>${product.unitPrice}</p>
			<button
				onClick={() => {
					navigate(`/products/${product.id}`);
				}}>
				Details
			</button>
		</div>
	);
};

export default Product;
