import Button from 'react-bootstrap/esm/Button';
import Modal from 'react-bootstrap/esm/Modal';
import './AreYouSureDialogBox.css';

const AreYouSureDialog = ({
	isOpen,
	setRenderDialogBox,
	setConfirmAction,
	action,
}) => {
	if (isOpen) {
		return (
			<Modal
				show={isOpen}
				onHide={() => {
					setRenderDialogBox(false);
				}}>
				<Modal.Header closeButton>
					<h4>Are you sure you want to {action}?</h4>
				</Modal.Header>
				<Modal.Body>
					<p>This cannot be undone.</p>
					<Button
						onClick={() => {
							setRenderDialogBox(false);
							setConfirmAction(true);
						}}>
						Yes
					</Button>
					<Button
						onClick={() => {
							setRenderDialogBox(false);
							setConfirmAction(false);
						}}>
						No
					</Button>
				</Modal.Body>
			</Modal>
		);
	} else {
		return (
			<dialog className='confirm-dialog'>
				u sure?
				<Button onClick={() => setRenderDialogBox(false)}>close</Button>
			</dialog>
		);
	}
};

export default AreYouSureDialog;
