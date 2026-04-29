// Main JS - placeholder for future features

console.log('ACity Connect Frontend Loaded');

function formatHomepageCount(value) {
	if (value >= 1000) {
		return `${(value / 1000).toFixed(value >= 10000 ? 0 : 1)}K+`;
	}

	return String(value);
}

async function loadHomepageStats() {
	const activeUsersStat = document.getElementById('activeUsersStat');
	const itemsListedStat = document.getElementById('itemsListedStat');
	const skillsSharedStat = document.getElementById('skillsSharedStat');

	if (!activeUsersStat || !itemsListedStat || !skillsSharedStat || typeof apiCall !== 'function') {
		return;
	}

	try {
		const stats = await apiCall('/stats');
		activeUsersStat.textContent = formatHomepageCount(stats.activeUsers);
		itemsListedStat.textContent = formatHomepageCount(stats.itemsListed);
		skillsSharedStat.textContent = formatHomepageCount(stats.skillsShared);
	} catch (error) {
		console.error('Failed to load homepage stats:', error);
		activeUsersStat.textContent = '0';
		itemsListedStat.textContent = '0';
		skillsSharedStat.textContent = '0';
	}
}

document.addEventListener('DOMContentLoaded', () => {
	const adminLink = document.getElementById('adminDashboardLink');
	if (!adminLink || typeof isCurrentUserAdmin !== 'function') {
		loadHomepageStats();
		return;
	}

	if (isCurrentUserAdmin()) {
		adminLink.hidden = false;
	}

	loadHomepageStats();
});
