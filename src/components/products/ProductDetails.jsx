import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';
import Utilities from '../../Utilities';
import AreYouSureDialog from '../dialogBoxes/AreYouSureDialog';

const ProductDetails = () => {
	const [product, setProduct] = useState({});
	const { productId } = useParams();
	const [renderDialogBox, setRenderDialogBox] = useState(false);
	const [confirmDelete, setConfirmDelete] = useState(false);

	const crmUserObject = JSON.parse(localStorage.getItem('crm_user'));
	const navigate = useNavigate();

	useEffect(() => {
		fetch(`http://localhost:8088/products/${productId}`)
			.then((res) => res.json())
			.then((product) => {
				setProduct(product);
			});
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
	}, [confirmDelete]);

	return (
		<div>
			<h3>{product.name}</h3>
			<p>{product.description}</p>
			{Utilities.isManager(crmUserObject) ? (
				<>
					<button
						onClick={() => {
							navigate(`/products/edit/${product.id}`);
						}}>
						Edit
					</button>
					<button
						onClick={() => {
							setRenderDialogBox(true);
						}}>
						Delete
					</button>
				</>
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
