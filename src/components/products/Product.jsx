import { useNavigate } from 'react-router';

import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

const Product = ({ product }) => {
	const navigate = useNavigate();
	return (
		<ListGroup.Item>
			<h3>{product.name}</h3>
			<p>{product.description}</p>
			<p>Available Quantity: {product.stockQuantity}</p>
			<p>${product.unitPrice}</p>
			<Button
				onClick={() => {
					navigate(`/products/${product.id}`);
				}}>
				Details
			</Button>
		</ListGroup.Item>
	);
};

export default Product;
