import { useEffect, useState } from 'react';

const Announcements = () => {
	const [announcements, setAnnouncements] = useState();

	const crmUserObject = JSON.parse(localStorage.getItem('crm_user'));

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

	return (
		<div>
			{announcements?.map((a) => {
				return (
					<div key={`announcement--${a.id}`}>
						<h4>{a.content}</h4>
						<p>Date Posted: {a.announcementDate}</p>
						<p>Posted by: {a.posterName}</p>
					</div>
				);
			})}
			{}
		</div>
	);
};

export default Announcements;
