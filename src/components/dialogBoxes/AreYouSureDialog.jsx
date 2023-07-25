import './AreYouSureDialogBox.css';

const AreYouSureDialog = ({
	isOpen,
	setRenderDialogBox,
	setConfirmAction,
	action,
}) => {
	if (isOpen) {
		return (
			<dialog open autoFocus className='confirm-dialog'>
				Are you sure you want to {action}? This cannot be undone.
				<button
					onClick={() => {
						setRenderDialogBox(false);
						setConfirmAction(true);
					}}>
					Yes
				</button>
				<button
					onClick={() => {
						setRenderDialogBox(false);
						setConfirmAction(false);
					}}>
					No
				</button>
			</dialog>
		);
	} else {
		return (
			<dialog className='confirm-dialog'>
				u sure?
				<button onClick={() => setRenderDialogBox(false)}>close</button>
			</dialog>
		);
	}
};

export default AreYouSureDialog;
