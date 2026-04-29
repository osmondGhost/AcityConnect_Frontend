// Create Skill JS

requireLogin();

document.getElementById('skillForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const skill_offered = document.getElementById('skillOffered').value || null;
  const skill_needed = document.getElementById('skillNeeded').value || null;
  const description = document.getElementById('description').value;

  if (!skill_offered && !skill_needed) {
    document.getElementById('formMsg').textContent = 'Please specify either a skill to offer or a skill you need';
    document.getElementById('formMsg').classList.add('text-red-600');
    return;
  }

  try {
    const result = await apiCall('/skills', 'POST', {
      skill_offered,
      skill_needed,
      description
    });

    document.getElementById('formMsg').textContent = 'Skill exchange posted successfully! Redirecting...';
    document.getElementById('formMsg').classList.add('text-green-600');
    setTimeout(() => {
      window.location.href = 'skills.html';
    }, 1500);
  } catch (error) {
    document.getElementById('formMsg').textContent = 'Failed to post skill: ' + error.message;
    document.getElementById('formMsg').classList.add('text-red-600');
  }
});
