import { useEffect, useRef, useState } from 'react';
import './ChatBar.css';

import OverLay from 'react-bootstrap/esm/Overlay';
import Button from 'react-bootstrap/esm/Button';
import Card from 'react-bootstrap/esm/Card';
import ListGroup from 'react-bootstrap/esm/ListGroup';
import Form from 'react-bootstrap/esm/Form';

import Chat from './Chat';
import Container from 'react-bootstrap/esm/Container';

const ChatBar = () => {
	const crmUserObject = JSON.parse(localStorage.getItem('crm_user'));

	const [conversations, setConversations] = useState([]);
	const [selectedConversation, setSelectedCoversation] = useState({});
	const [recipient, setRecipient] = useState({});
	const [newConversationRecipientId, setNewConversationRecipientId] =
		useState({});
	const [users, setUsers] = useState([]);
	const [showChatWindow, setShowChatWindow] = useState(false);
	const [showSelectRecipientWindow, setShowSelectRecipientWindow] =
		useState(false);

	const chatWindow = useRef(null);
	const selectRecipent = useRef(null);

	useEffect(() => {
		fetch(`http://localhost:8088/conversations?user_1=${crmUserObject.id}`)
			.then((res) => res.json())
			.then((convo1) => {
				fetch(
					`http://localhost:8088/conversations?user_2=${crmUserObject.id}`
				)
					.then((res) => res.json())
					.then((convo2) => {
						let allConvos = [...convo1, ...convo2];
						if (conversations.length !== allConvos)
							allConvos.forEach((c) => {
								fetch(
									`http://localhost:8088/chatMessages?conversationId=${c.id}`
								)
									.then((res) => res.json())
									.then((messages) => {
										c.messages = messages;
									});
							});
						setConversations(allConvos);
					});
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedConversation]);

	useEffect(() => {
		fetch(`http://localhost:8088/users`)
			.then((res) => res.json())
			.then((u) => {
				setUsers(u);
			});
	}, []);

	const handleNewConversation = (e) => {
		e.preventDefault();

		const convoObj = {
			user_1: crmUserObject.id,
			user_2: newConversationRecipientId,
		};

		const newConvoOptions = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(convoObj),
		};

		fetch('http://localhost:8088/conversations', newConvoOptions)
			.then((res) => res.json())
			.then((c) => {
				c.messages = [];
				setSelectedCoversation(c);
			});
	};

	const findUserFullName = (id) => {
		const foundUser = users.find((u) => u.id === id);
		if (foundUser) {
			const fullName = `${foundUser.firstName} ${foundUser.lastName}`;
			return fullName;
		} else {
			return '';
		}
	};
	return (
		<Container className='chatBar'>
			{!showChatWindow ? (
				<Button
					ref={chatWindow}
					onClick={() => setShowChatWindow(!showChatWindow)}>
					Your Conversations
				</Button>
			) : (
				<Button
					ref={chatWindow}
					onClick={() => setShowChatWindow(!showChatWindow)}>
					Close Conversations
				</Button>
			)}

			<OverLay
				target={chatWindow.current}
				show={showChatWindow}
				placement='top-start'>
				{({
					placement: _placement,
					arrowProps: _arrowProps,
					show: _show,
					popper: _popper,
					hasDoneInitialMeasure: _hasDoneInitialMeasure,
					...props
				}) => (
					<Card {...props} className='chat-card'>
						<ListGroup horizontal>
							<ListGroup.Item>
								<ListGroup
									variant='flush'
									className='conversation-options'>
									{conversations.map((c) => {
										return (
											<ListGroup.Item
												key={`conversation-${c.id}`}
												action
												className='conversation-item'
												onClick={() => {
													setSelectedCoversation(c);
													setRecipient(
														c.user_1 ===
															crmUserObject.id
															? users.find(
																	(u) =>
																		u.id ===
																		c.user_2
															  )
															: users.find(
																	(u) =>
																		u.id ===
																		c.user_1
															  )
													);
												}}>
												{c.user_1 === crmUserObject.id
													? findUserFullName(c.user_2)
													: findUserFullName(
															c.user_1
													  )}
											</ListGroup.Item>
										);
									})}
									<Button
										variant='secondary'
										ref={selectRecipent}
										onClick={() =>
											setShowSelectRecipientWindow(
												!showSelectRecipientWindow
											)
										}>
										New Conversation
									</Button>
									<OverLay
										rootClose={true}
										onHide={() => {
											setShowSelectRecipientWindow(
												!showSelectRecipientWindow
											);
										}}
										target={selectRecipent.current}
										show={showSelectRecipientWindow}
										placement='top'>
										{({
											placement: _placement,
											arrowProps: _arrowProps,
											show: _show,
											popper: _popper,
											hasDoneInitialMeasure:
												_hasDoneInitialMeasure,
											...props
										}) => (
											<Card
												{...props}
												className='select-recipient'>
												<Card.Body>
													<Form.Select
														onChange={(e) => {
															setNewConversationRecipientId(
																parseInt(
																	e.target
																		.value
																)
															);
														}}>
														<option>
															Select a user...
														</option>
														{/*eslint-disable-next-line array-callback-return*/}
														{users.map((u) => {
															if (
																u.id ===
																crmUserObject.id
															) {
															} else {
																return (
																	<option
																		key={`user-option-${u.id}`}
																		value={
																			u.id
																		}>
																		{findUserFullName(
																			u.id
																		)}
																	</option>
																);
															}
														})}
													</Form.Select>
													<Button
														variant='secondary'
														onClick={(e) => {
															setShowSelectRecipientWindow(
																!showSelectRecipientWindow
															);
															handleNewConversation(
																e
															);
														}}>
														Start Conversation
													</Button>
												</Card.Body>
											</Card>
										)}
									</OverLay>
								</ListGroup>
							</ListGroup.Item>
							<ListGroup.Item>
								<ListGroup>
									<Chat
										conversation={selectedConversation}
										setConversation={setSelectedCoversation}
										recipient={recipient}
										key={`conversation-${recipient.id}`}
									/>
								</ListGroup>
							</ListGroup.Item>
						</ListGroup>
					</Card>
				)}
			</OverLay>
		</Container>
	);
};

export default ChatBar;
