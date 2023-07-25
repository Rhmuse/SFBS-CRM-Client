import { useEffect, useState } from 'react';
import Utilities from '../../Utilities';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/esm/Button';
import Card from 'react-bootstrap/Card';

const Announcements = () => {
	const crmUserObject = JSON.parse(localStorage.getItem('crm_user'));

	const [announcements, setAnnouncements] = useState();
	const [newAnnouncement, setNewAnnouncement] = useState({
		posterId: crmUserObject.id,
		announcementDate: Date.now(),
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
						setAnnouncements(announcements);
					});
			});
	}, []);

	const handlePost = () => {
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newAnnouncement),
		};

		fetch('http://localhost:8088/announcements', options);
	};

	return (
		<Card>
			<Card.Body>
				<Card.Title>Announcements</Card.Title>
				<ListGroup>
					{announcements?.map((a) => {
						return (
							<ListGroup.Item key={`announcement--${a.id}`}>
								<h6>{a.content}</h6>
								<p>
									{new Date(
										Date(a.announcementDate)
									).toLocaleDateString('en-US', {
										weekday: 'long',
										year: 'numeric',
										month: 'long',
										day: 'numeric',
										time: 'numeric',
									})}{' '}
									at{' '}
									{new Date(
										Date(a.announcementDate)
									).toLocaleTimeString('en-US')}
								</p>
								<p>Posted by: {a.posterName}</p>
							</ListGroup.Item>
						);
					})}
				</ListGroup>
				{Utilities.isManager(crmUserObject) ? (
					<Container>
						<Form.Control
							type='text'
							onChange={(e) =>
								setNewAnnouncement({
									...newAnnouncement,
									content: e.target.value,
								})
							}
							value={newAnnouncement.content}
						/>
						<Button onClick={() => handlePost()}>
							Post Announcement
						</Button>
					</Container>
				) : (
					''
				)}
			</Card.Body>
		</Card>
	);
};

export default Announcements;
