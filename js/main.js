// Main JS - placeholder for future features

console.log('ACity Connect Frontend Loaded');

document.addEventListener('DOMContentLoaded', () => {
	const adminLink = document.getElementById('adminDashboardLink');
	if (!adminLink || typeof isCurrentUserAdmin !== 'function') {
		return;
	}

	if (isCurrentUserAdmin()) {
		adminLink.hidden = false;
	}
});
