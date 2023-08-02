import './Chat.css';

import Form from 'react-bootstrap/esm/Form';
import ListGroup from 'react-bootstrap/esm/ListGroup';
import Button from 'react-bootstrap/esm/Button';

const Chat = ({ conversation, recipient }) => {
	const crmUserObject = JSON.parse(localStorage.getItem('crm_user'));

	if (conversation) {
		return (
			<>
				<ListGroup.Item>
					<ListGroup variant='flush'>
						{conversation.messages.map((m) => {
							if (m.senderId === crmUserObject.id) {
								return (
									<ListGroup.Item
										className='sent'
										key={`message-${m.id}`}>
										{m.content}
										<p className='chat-attribution'>You</p>
									</ListGroup.Item>
								);
							} else {
								return (
									<ListGroup.Item
										className='recieved'
										key={`message-${m.id}`}>
										{m.content}
										<p className='chat-attribution'>
											{recipient}
										</p>
									</ListGroup.Item>
								);
							}
						})}
					</ListGroup>
				</ListGroup.Item>
				<ListGroup.Item className='flex flex-row'>
					<Form.Control type='text' />
					<Button>Send</Button>
				</ListGroup.Item>
			</>
		);
	} else {
		return (
			<>
				<ListGroup.Item>
					<ListGroup variant='flush'>Select a Conversation</ListGroup>
				</ListGroup.Item>
				<ListGroup.Item className='flex flex-row'>
					<Form.Control type='text' />
					<Button disabled>Send</Button>
				</ListGroup.Item>
			</>
		);
	}
};

export default Chat;
