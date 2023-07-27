import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';

const Product = ({ product }) => {
	return (
		<ListGroup.Item action as={Link} to={`/products/${product.id}`}>
			<h3>{product.name}</h3>
			<p>{product.description}</p>
			<p>Available Quantity: {product.stockQuantity}</p>
			<p>Unit Price: ${product.unitPrice}</p>
		</ListGroup.Item>
	);
};

export default Product;
