// Skills JS

async function loadSkills() {
  try {
    const response = await apiCall('/skills');
    displayOfferedSkills(response.filter(s => s.skill_offered));
    displayNeededSkills(response.filter(s => s.skill_needed));
  } catch (error) {
    console.error('Failed to load skills:', error);
  }
}

function displayOfferedSkills(skills) {
  const container = document.getElementById('offered-section');

  if (skills.length === 0) {
    container.innerHTML = '<div class="col-span-full text-center text-gray-500">No skills being offered</div>';
    return;
  }

  container.innerHTML = skills.map(skill => `
    <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
      <h3 class="text-lg font-bold mb-2 text-green-600">${skill.skill_offered}</h3>
      <p class="text-gray-600 mb-4">${skill.description || 'No description provided'}</p>
      <div class="flex justify-between items-center">
        <span class="text-sm text-gray-500">Posted: ${new Date(skill.created_at).toLocaleDateString()}</span>
        <button onclick="contactUser(${skill.user_id})" class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Contact
        </button>
      </div>
    </div>
  `).join('');
}

function displayNeededSkills(skills) {
  const container = document.getElementById('needed-section').querySelector('div');

  if (skills.length === 0) {
    container.innerHTML = '<div class="col-span-full text-center text-gray-500">No skills being requested</div>';
    return;
  }

  container.innerHTML = skills.map(skill => `
    <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
      <h3 class="text-lg font-bold mb-2 text-blue-600">${skill.skill_needed}</h3>
      <p class="text-gray-600 mb-4">${skill.description || 'No description provided'}</p>
      <div class="flex justify-between items-center">
        <span class="text-sm text-gray-500">Posted: ${new Date(skill.created_at).toLocaleDateString()}</span>
        <button onclick="contactUser(${skill.user_id})" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Contact
        </button>
      </div>
    </div>
  `).join('');
}

function showTab(tab) {
  document.getElementById('offered-section').classList.add('hidden');
  document.getElementById('needed-section').classList.add('hidden');

  if (tab === 'offered') {
    document.getElementById('offered-section').classList.remove('hidden');
  } else {
    document.getElementById('needed-section').classList.remove('hidden');
  }
}

function contactUser(userId) {
  if (!isLoggedIn()) {
    window.location.href = 'auth.html';
    return;
  }
  alert('Messaging user ' + userId + ' - coming soon!');
}

// Load skills on page load
document.addEventListener('DOMContentLoaded', loadSkills);
