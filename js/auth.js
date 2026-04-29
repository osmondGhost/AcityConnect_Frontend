// Authentication JS

function showLogin() {
  document.getElementById('loginForm').classList.remove('hidden');
  document.getElementById('registerForm').classList.add('hidden');
  document.getElementById('loginBtn').classList.add('bg-blue-600', 'text-white');
  document.getElementById('loginBtn').classList.remove('bg-gray-300', 'text-gray-700');
  document.getElementById('registerBtn').classList.add('bg-gray-300', 'text-gray-700');
  document.getElementById('registerBtn').classList.remove('bg-blue-600', 'text-white');
}

function showRegister() {
  document.getElementById('loginForm').classList.add('hidden');
  document.getElementById('registerForm').classList.remove('hidden');
  document.getElementById('registerBtn').classList.add('bg-blue-600', 'text-white');
  document.getElementById('registerBtn').classList.remove('bg-gray-300', 'text-gray-700');
  document.getElementById('loginBtn').classList.add('bg-gray-300', 'text-gray-700');
  document.getElementById('loginBtn').classList.remove('bg-blue-600', 'text-white');
}

// Login Handler
document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  try {
    const result = await apiCall('/users/login', 'POST', { email, password });
    localStorage.setItem('token', result.token);
    localStorage.setItem('userId', result.user.id);
    document.getElementById('loginMsg').textContent = 'Login successful! Redirecting...';
    document.getElementById('loginMsg').classList.add('text-green-600');
    setTimeout(() => {
      window.location.href = 'marketplace.html';
    }, 1000);
  } catch (error) {
    document.getElementById('loginMsg').textContent = 'Login failed: ' + error.message;
    document.getElementById('loginMsg').classList.add('text-red-600');
  }
});

// Register Handler
document.getElementById('registerForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const first_name = document.getElementById('firstName').value;
  const last_name = document.getElementById('lastName').value;
  const email = document.getElementById('registerEmail').value;
  const password = document.getElementById('registerPassword').value;
  const academic_email = document.getElementById('academicEmail').value;

  try {
    const result = await apiCall('/users/register', 'POST', {
      first_name,
      last_name,
      email,
      password,
      academic_email
    });
    localStorage.setItem('token', result.token);
    localStorage.setItem('userId', result.user.id);
    document.getElementById('registerMsg').textContent = 'Registration successful! Redirecting...';
    document.getElementById('registerMsg').classList.add('text-green-600');
    setTimeout(() => {
      window.location.href = 'marketplace.html';
    }, 1000);
  } catch (error) {
    document.getElementById('registerMsg').textContent = 'Registration failed: ' + error.message;
    document.getElementById('registerMsg').classList.add('text-red-600');
  }
});
