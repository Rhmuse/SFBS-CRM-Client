import { useEffect, useState } from 'react';

import ListGroup from 'react-bootstrap/esm/ListGroup';
import Form from 'react-bootstrap/esm/Form';
import Button from 'react-bootstrap/esm/Button';
import Utilities from '../../Utilities';
import Card from 'react-bootstrap/esm/Card';

import './Comments.css';

const Comments = ({ table, id }) => {
	const [comments, setComments] = useState([]);
	const [inputText, setInputText] = useState('');

	const crmUserObject = JSON.parse(localStorage.getItem('crm_user'));

	useEffect(() => {
		fetch(
			`http://localhost:8088/comments?refTable=${table}&refId=${id}&_expand=user`
		)
			.then((res) => res.json())
			.then((c) => {
				setComments(c);
			});

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [inputText]);

	const saveComment = (e) => {
		e.preventDefault();

		const commentObj = {
			userId: crmUserObject.id,
			noteDate: Date.now(),
			content: inputText,
			refTable: table,
			refId: id,
		};

		const commentOptions = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(commentObj),
		};

		fetch('http://localhost:8088/comments', commentOptions)
			.then((res) => res.json())
			.then(() => {
				setInputText('');
			});
	};

	if (comments.length > 0) {
		return (
			<Card>
				<Card.Header>
					<Card.Title>
						<h3>Comments</h3>
					</Card.Title>
				</Card.Header>
				<Card.Body>
					<ListGroup className='comment-container' variant='flush'>
						{comments.map((c) => {
							return (
								<ListGroup.Item key={`comment--${c.id}`}>
									<ListGroup>
										<ListGroup.Item>
											<p>{c.content}</p>
											<p className='commenter'>
												{`by ${c.user.firstName} ${c.user.lastName}`}{' '}
												on{' '}
												{Utilities.dateFormatter(
													c.noteDate
												)}
											</p>
										</ListGroup.Item>
									</ListGroup>
								</ListGroup.Item>
							);
						})}
						<ListGroup.Item>
							<Form.Label htmlFor='comment-input'>
								<b>New Comment</b>
							</Form.Label>
							<Form.Control
								type='text'
								value={inputText}
								id='comment-input'
								onChange={(e) => {
									setInputText(e.target.value);
								}}
							/>
							<div className='save-button-container'>
								<Button
									variant='secondary'
									onClick={(e) => saveComment(e)}>
									Save
								</Button>
							</div>
						</ListGroup.Item>
					</ListGroup>
				</Card.Body>
			</Card>
		);
	} else {
		return (
			<Card>
				<Card.Header>
					<Card.Title>
						<h3>Comments</h3>
					</Card.Title>
				</Card.Header>
				<Card.Body>
					<ListGroup variant='flush'>
						{' '}
						<ListGroup.Item>
							<Form.Label htmlFor='comment-input'>
								New Comment
							</Form.Label>
							<Form.Control
								type='text'
								value={inputText}
								id='comment-input'
								onChange={(e) => {
									setInputText(e.target.value);
								}}
							/>
							<div className='save-button-container'>
								<Button
									variant='secondary'
									onClick={(e) => saveComment(e)}>
									Save
								</Button>
							</div>
						</ListGroup.Item>
					</ListGroup>
				</Card.Body>
			</Card>
		);
	}
};

export default Comments;
