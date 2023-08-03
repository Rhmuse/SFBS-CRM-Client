import './Chat.css';

import Form from 'react-bootstrap/esm/Form';
import ListGroup from 'react-bootstrap/esm/ListGroup';
import Button from 'react-bootstrap/esm/Button';
import { useState } from 'react';

const Chat = ({ conversation, recipient, setConversation }) => {
	const crmUserObject = JSON.parse(localStorage.getItem('crm_user'));

	const [inputContent, setInputContent] = useState('');

	const handleSend = (e) => {
		e.preventDefault();

		const messageObj = {
			recipientId: recipient.id,
			senderId: crmUserObject.id,
			messageDate: Date.now(),
			content: inputContent,
			conversationId: conversation.id,
		};

		const messageOptions = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(messageObj),
		};

		fetch('http://localhost:8088/chatMessages', messageOptions)
			.then((res) => res.json())
			.then((m) => {
				setConversation({
					...conversation,
					messages: [...conversation.messages, m],
				});
				updateScroll();
				setInputContent('');
			});
	};

	const updateScroll = () => {
		let chatArea = document.getElementsByClassName('selected-chat');
		if (chatArea.length > 0)
			chatArea[0].scrollTop = chatArea[0].scrollHeight;
	};

	if (conversation.messages) {
		return (
			<>
				<ListGroup.Item>
					<h5>
						{recipient.firstName} {recipient.lastName}
					</h5>
				</ListGroup.Item>
				<ListGroup.Item>
					<ListGroup variant='flush' className='selected-chat'>
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
											{`${recipient.firstName} ${recipient.lastName}`}
										</p>
									</ListGroup.Item>
								);
							}
						})}
						{updateScroll()}
					</ListGroup>
				</ListGroup.Item>
				<ListGroup.Item className='flex flex-row'>
					<Form.Control
						type='text'
						value={inputContent}
						onChange={(e) => {
							setInputContent(e.target.value);
						}}
					/>
					<Button
						className='send-button'
						onClick={(e) => {
							handleSend(e);
						}}>
						Send
					</Button>
				</ListGroup.Item>
			</>
		);
	} else {
		return (
			<>
				<ListGroup.Item>
					<h5>Select a Conversation</h5>
				</ListGroup.Item>
				<ListGroup.Item className='flex flex-row'>
					<Form.Control type='text' />
					<Button disabled className='send-button'>
						Send
					</Button>
				</ListGroup.Item>
			</>
		);
	}
};

export default Chat;
