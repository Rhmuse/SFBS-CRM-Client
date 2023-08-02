import { useEffect, useRef, useState } from 'react';
import './ChatBar.css';

import OverLay from 'react-bootstrap/esm/Overlay';
import Button from 'react-bootstrap/esm/Button';
import Card from 'react-bootstrap/esm/Card';
import ListGroup from 'react-bootstrap/esm/ListGroup';
import Form from 'react-bootstrap/esm/Form';

import Chat from './Chat';

const ChatBar = () => {
	const crmUserObject = JSON.parse(localStorage.getItem('crm_user'));

	const [conversations, setConversations] = useState([]);
	const [selectedConversation, setSelectedCoversation] = useState(0);
	const [recipientName, setRecipientName] = useState('');
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
		fetch(`http://localhost:8088/users`)
			.then((res) => res.json())
			.then((u) => {
				setUsers(u);
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const findUserFullName = (id) => {
		const foundUser = users.find((u) => u.id === id);
		const fullName = `${foundUser.firstName} ${foundUser.lastName}`;
		return fullName;
	};
	return (
		<footer className='chatBar bg-body-secondary'>
			<Button
				ref={chatWindow}
				onClick={() => setShowChatWindow(!showChatWindow)}>
				Your Coversations
			</Button>
			<OverLay
				target={chatWindow.current}
				show={showChatWindow}
				placement='top'>
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
													setRecipientName(
														c.user_1 ===
															crmUserObject.id
															? findUserFullName(
																	c.user_2
															  )
															: findUserFullName(
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
													<Form.Select>
														<option>
															Select a user...
														</option>
														{users.map((u) => {
															return (
																<option
																	value={u}>
																	{findUserFullName(
																		u.id
																	)}
																</option>
															);
														})}
													</Form.Select>
													<Button
														onClick={() => {
															setShowSelectRecipientWindow(
																!showSelectRecipientWindow
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
										recipient={recipientName}
										key={`conversation-${recipientName}`}
									/>
								</ListGroup>
							</ListGroup.Item>
						</ListGroup>
					</Card>
				)}
			</OverLay>
		</footer>
	);
};

export default ChatBar;
