import Button from 'react-bootstrap/esm/Button';
import Modal from 'react-bootstrap/esm/Modal';
import Container from 'react-bootstrap/esm/Container';
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
					<h6>This cannot be undone.</h6>
					<Container className='button-container'>
						<Button
							onClick={() => {
								setRenderDialogBox(false);
								setConfirmAction(true);
							}}
							variant='danger'
							className='dialog-button'>
							Yes
						</Button>
						<Button
							onClick={() => {
								setRenderDialogBox(false);
								setConfirmAction(false);
							}}
							variant='secondary'
							className='dialog-button'>
							No
						</Button>
					</Container>
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
