// Profile JS

requireLogin();

const userId = getCurrentUserId();

async function loadProfile() {
  try {
    const userProfile = await apiCall(`/users/profile/${userId}`);
    displayProfile(userProfile);
  } catch (error) {
    console.error('Failed to load profile:', error);
  }
}

function displayProfile(user) {
  document.getElementById('profileName').textContent = `${user.first_name} ${user.last_name}`;
  document.getElementById('profileEmail').textContent = user.email;
  document.getElementById('phone').textContent = user.phone || '-';
  document.getElementById('bio').textContent = user.bio || '-';
  document.getElementById('joined').textContent = new Date(user.created_at).toLocaleDateString();
  
  if (user.avatar_url) {
    document.getElementById('avatar').src = user.avatar_url;
  }
}

async function loadUserItems() {
  try {
    const items = await apiCall(`/items/user/${userId}`);
    const container = document.getElementById('itemsList');

    if (items.length === 0) {
      container.innerHTML = '<div class="text-center text-gray-500">You haven\'t posted any items yet</div>';
      return;
    }

    container.innerHTML = items.map(item => `
      <div class="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
        <div>
          <h4 class="font-bold">${item.title}</h4>
          <p class="text-sm text-gray-600">${item.category}</p>
        </div>
        <div class="flex gap-2">
          <button onclick="editItem(${item.id})" class="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">Edit</button>
          <button onclick="deleteItem(${item.id})" class="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700">Delete</button>
        </div>
      </div>
    `).join('');
  } catch (error) {
    console.error('Failed to load items:', error);
  }
}

async function loadUserSkills() {
  try {
    const skills = await apiCall(`/users/${userId}/skills`);
    const container = document.getElementById('skillsList');

    if (skills.length === 0) {
      container.innerHTML = '<div class="text-center text-gray-500">You haven\'t added any skills yet</div>';
      return;
    }

    container.innerHTML = skills.map(skill => `
      <div class="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
        <div>
          <h4 class="font-bold">${skill.skill_name}</h4>
          <p class="text-sm text-gray-600">${skill.proficiency_level || 'Not specified'}</p>
        </div>
        <button onclick="deleteSkill(${skill.id})" class="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700">Delete</button>
      </div>
    `).join('');
  } catch (error) {
    console.error('Failed to load skills:', error);
  }
}

async function loadMessages() {
  try {
    const messages = await apiCall(`/interactions/messages/${userId}`);
    const container = document.getElementById('messagesList');

    if (messages.length === 0) {
      container.innerHTML = '<div class="text-center text-gray-500">No messages yet</div>';
      return;
    }

    container.innerHTML = messages.map(msg => `
      <div class="bg-white p-4 rounded-lg shadow-md">
        <div class="flex justify-between items-start mb-2">
          <strong>${msg.first_name} ${msg.last_name}</strong>
          <span class="text-sm text-gray-500">${new Date(msg.created_at).toLocaleDateString()}</span>
        </div>
        <p class="text-gray-700">${msg.message_text}</p>
      </div>
    `).join('');
  } catch (error) {
    console.error('Failed to load messages:', error);
  }
}

function showProfileTab(tab) {
  // Hide all tabs
  document.getElementById('about-tab').classList.add('hidden');
  document.getElementById('items-tab').classList.add('hidden');
  document.getElementById('skills-tab').classList.add('hidden');
  document.getElementById('messages-tab').classList.add('hidden');

  // Show selected tab
  if (tab === 'about') {
    document.getElementById('about-tab').classList.remove('hidden');
  } else if (tab === 'items') {
    document.getElementById('items-tab').classList.remove('hidden');
    loadUserItems();
  } else if (tab === 'skills') {
    document.getElementById('skills-tab').classList.remove('hidden');
    loadUserSkills();
  } else if (tab === 'messages') {
    document.getElementById('messages-tab').classList.remove('hidden');
    loadMessages();
  }
}

function editProfile() {
  const newBio = prompt('Enter your new bio:');
  if (newBio !== null) {
    apiCall(`/users/profile/${userId}`, 'PUT', { bio: newBio })
      .then(() => loadProfile())
      .catch(error => alert('Failed to update profile: ' + error.message));
  }
}

function deleteItem(itemId) {
  if (confirm('Are you sure you want to delete this item?')) {
    apiCall(`/items/${itemId}`, 'DELETE')
      .then(() => loadUserItems())
      .catch(error => alert('Failed to delete item: ' + error.message));
  }
}

function deleteSkill(skillId) {
  if (confirm('Are you sure you want to delete this skill?')) {
    apiCall(`/users/skills/${skillId}`, 'DELETE')
      .then(() => loadUserSkills())
      .catch(error => alert('Failed to delete skill: ' + error.message));
  }
}

function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  window.location.href = 'index.html';
}

// Load profile on page load
document.addEventListener('DOMContentLoaded', loadProfile);
