// Create Item JS

requireLogin();

document.getElementById('itemForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const category = document.getElementById('category').value;
  const status = document.getElementById('status').value;
  const price = document.getElementById('price').value || null;
  const image_url = document.getElementById('imageUrl').value || null;

  try {
    const result = await apiCall('/items', 'POST', {
      title,
      description,
      category,
      status,
      price: price ? parseFloat(price) : null,
      image_url
    });

    document.getElementById('formMsg').textContent = 'Item posted successfully! Redirecting...';
    document.getElementById('formMsg').classList.add('text-green-600');
    setTimeout(() => {
      window.location.href = 'marketplace.html';
    }, 1500);
  } catch (error) {
    document.getElementById('formMsg').textContent = 'Failed to post item: ' + error.message;
    document.getElementById('formMsg').classList.add('text-red-600');
  }
});
