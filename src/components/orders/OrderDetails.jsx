import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import Utilities from '../../Utilities';
import AreYouSureDialog from '../dialogBoxes/AreYouSureDialog';

const OrderDetails = () => {
	const [order, setOrder] = useState({});

	const [renderDialogBox, setRenderDialogBox] = useState(false);
	const [confirmDelete, setConfirmDelete] = useState(false);

	const { orderId } = useParams();

	const crmUserObject = JSON.parse(localStorage.getItem('crm_user'));
	const navigate = useNavigate();

	useEffect(() => {
		fetch(`http://localhost:8088/orders/${orderId}`)
			.then((res) => res.json())
			.then((order) => {
				setOrder(order);
			});
	}, []);

	useEffect(() => {
		if (confirmDelete) {
			const deleteOptions = {
				method: 'DELETE',
			};

			fetch(
				`http://localhost:8088/orders/${orderId}`,
				deleteOptions
			).then(() => {
				navigate('/orders');
			});
		}
	}, [confirmDelete]);

	return (
		<div>
			<h3>#{order.id}</h3>
			{Utilities.isManager(crmUserObject) ? (
				<button
					onClick={() => {
						setRenderDialogBox(true);
					}}>
					Delete
				</button>
			) : (
				''
			)}
			<AreYouSureDialog
				isOpen={renderDialogBox}
				setRenderDialogBox={setRenderDialogBox}
				setConfirmAction={setConfirmDelete}
				action={'delete this order'}
			/>
		</div>
	);
};

export default OrderDetails;
