import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';
import Utilities from '../../Utilities';
import AreYouSureDialog from '../dialogBoxes/AreYouSureDialog';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/esm/Container';

const ProductDetails = () => {
	const [product, setProduct] = useState({});
	const [renderDialogBox, setRenderDialogBox] = useState(false);
	const [confirmDelete, setConfirmDelete] = useState(false);

	const { productId } = useParams();

	const crmUserObject = JSON.parse(localStorage.getItem('crm_user'));
	const navigate = useNavigate();

	useEffect(() => {
		fetch(`http://localhost:8088/products/${productId}`)
			.then((res) => res.json())
			.then((product) => {
				setProduct(product);
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (confirmDelete) {
			const deleteOptions = {
				method: 'DELETE',
			};

			fetch(
				`http://localhost:8088/products/${productId}`,
				deleteOptions
			).then(() => {
				navigate('/products');
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [confirmDelete]);

	return (
		<div>
			<h3>{product.name}</h3>
			<p>{product.description}</p>
			<p>Unit Price: {product.unitPrice}</p>
			<p>Quantity in Stock: {product.stockQuantity}</p>
			<p>Weight: {product.weightLbs}lbs</p>
			{Utilities.isManager(crmUserObject) ? (
				<Container className='edit-delete-container'>
					<Button
						onClick={() => {
							navigate(`/products/edit/${product.id}`);
						}}>
						Edit
					</Button>
					<Button
						onClick={() => {
							setRenderDialogBox(true);
						}}>
						Delete
					</Button>
				</Container>
			) : (
				''
			)}
			<AreYouSureDialog
				isOpen={renderDialogBox}
				setRenderDialogBox={setRenderDialogBox}
				setConfirmAction={setConfirmDelete}
				action={'delete this product'}
			/>
		</div>
	);
};

export default ProductDetails;
