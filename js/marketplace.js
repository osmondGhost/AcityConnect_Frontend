// Marketplace JS

async function loadItems() {
  try {
    const response = await apiCall('/items');
    displayItems(response);
  } catch (error) {
    document.getElementById('itemsContainer').innerHTML = '<div class="col-span-full text-center text-red-500">Failed to load items</div>';
  }
}

function displayItems(items) {
  const container = document.getElementById('itemsContainer');

  if (items.length === 0) {
    container.innerHTML = '<div class="col-span-full text-center text-gray-500">No items found</div>';
    return;
  }

  container.innerHTML = items.map(item => `
    <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
      <div class="bg-gray-300 h-48 flex items-center justify-center">
        ${item.image_url ? `<img src="${item.image_url}" alt="${item.title}" class="w-full h-full object-cover">` : '<div class="text-gray-500">No image</div>'}
      </div>
      <div class="p-4">
        <h3 class="text-lg font-bold mb-2">${item.title}</h3>
        <p class="text-gray-600 mb-2">${item.description.substring(0, 100)}...</p>
        <div class="flex justify-between items-center mb-4">
          <span class="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded">${item.category}</span>
          <span class="text-sm font-bold text-gray-700">${item.price ? '$' + item.price : 'No price'}</span>
        </div>
        <button onclick="viewItem(${item.id})" class="w-full bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700">
          View Details
        </button>
      </div>
    </div>
  `).join('');
}

function filterItems() {
  const search = document.getElementById('searchInput').value;
  const category = document.getElementById('categoryFilter').value;
  const status = document.getElementById('statusFilter').value;

  let query = '/items?';
  if (search) query += `search=${search}&`;
  if (category) query += `category=${category}&`;
  if (status) query += `status=${status}&`;

  apiCall(query)
    .then(displayItems)
    .catch(error => {
      document.getElementById('itemsContainer').innerHTML = '<div class="col-span-full text-center text-red-500">Failed to filter items</div>';
    });
}

function viewItem(id) {
  window.location.href = `marketplace-item.html?id=${id}`;
}

// Load items on page load
document.addEventListener('DOMContentLoaded', loadItems);
