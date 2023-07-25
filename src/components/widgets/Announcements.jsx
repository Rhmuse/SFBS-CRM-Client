import { useEffect, useState } from 'react';
import Utilities from '../../Utilities';

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
		<div>
			{announcements?.map((a) => {
				return (
					<div key={`announcement--${a.id}`}>
						<h4>{a.content}</h4>
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
					</div>
				);
			})}
			{Utilities.isManager(crmUserObject) ? (
				<div>
					<input
						type='text'
						onChange={(e) =>
							setNewAnnouncement({
								...newAnnouncement,
								content: e.target.value,
							})
						}
						value={newAnnouncement.content}
					/>
					<button onClick={() => handlePost()}>
						Post Announcement
					</button>
				</div>
			) : (
				''
			)}
		</div>
	);
};

export default Announcements;
