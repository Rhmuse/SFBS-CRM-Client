import { useEffect, useState } from 'react';
import Utilities from '../../Utilities';
import './Announcements.css';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/esm/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';

const Announcements = () => {
	const crmUserObject = JSON.parse(localStorage.getItem('crm_user'));

	const [announcements, setAnnouncements] = useState();
	const [newAnnouncement, setNewAnnouncement] = useState({
		posterId: crmUserObject.id,
		content: '',
	});

	useEffect(() => {
		fetch('http://localhost:8088/announcements')
			.then((res) => res.json())
			.then((announcements) => {
				fetch('http://localhost:8088/users')
					.then((res) => res.json())
					.then((users) => {
						for (const a of announcements) {
							const foundUser = users.find(
								(u) => u.id === a.posterId
							);
							a.posterName = `${foundUser.firstName} ${foundUser.lastName}`;
						}
						announcements.reverse();
						setAnnouncements(announcements.slice(0, 4));
					});
			});
	}, []);

	const handlePost = () => {
		const announcementObj = {
			posterId: newAnnouncement.posterId,
			announcementsDate: Date.now(),
			content: newAnnouncement.content,
		};

		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(announcementObj),
		};

		fetch('http://localhost:8088/announcements', options).then(() => {
			fetch('http://localhost:8088/announcements')
				.then((res) => res.json())
				.then((a) => {
					a.reverse();
					setAnnouncements(a.slice(0, 4));
				});
		});
	};

	return (
		<Card>
			<Card.Header>
				<Card.Title className='announcement-widget-title'>
					<h4>Announcements</h4>
				</Card.Title>
			</Card.Header>
			<Card.Body>
				<ListGroup className='announcement-list'>
					{announcements?.map((a) => {
						return (
							<ListGroup.Item key={`announcement--${a.id}`}>
								<h5 className='announcement-content'>
									{a.content}
								</h5>
								<p className='announcement-details'>
									{Utilities.dateFormatter(
										a.announcementDate
									)}
								</p>
								<p className='announcement-details'>
									Posted by: {a.posterName}
								</p>
							</ListGroup.Item>
						);
					})}
				</ListGroup>

				{Utilities.isManager(crmUserObject) ? (
					<Container>
						<Row className=''>
							<Col
								className='announcement-input-container flex'
								sm={6}>
								<Form.Control
									as='textarea'
									className='announcement-input'
									type='text'
									onChange={(e) =>
										setNewAnnouncement({
											...newAnnouncement,
											content: e.target.value,
										})
									}
									value={newAnnouncement.content}
								/>
							</Col>
							<Col></Col>
							<Col className='announcement-button-container flex'>
								<Button onClick={() => handlePost()}>
									Post Announcement
								</Button>
							</Col>
						</Row>
					</Container>
				) : (
					''
				)}
			</Card.Body>
		</Card>
	);
};

export default Announcements;
