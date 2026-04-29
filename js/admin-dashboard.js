requireLogin();

const METRIC_STYLES = {
  blue: 'bg-blue-100 text-blue-600',
  emerald: 'bg-emerald-100 text-emerald-600',
  purple: 'bg-purple-100 text-purple-600',
  amber: 'bg-amber-100 text-amber-600',
  rose: 'bg-rose-100 text-rose-600',
  slate: 'bg-slate-100 text-slate-600'
};

async function loadDashboard() {
  const metricsGrid = document.getElementById('metricsGrid');
  const adminItemsList = document.getElementById('adminItemsList');
  const adminReportsList = document.getElementById('adminReportsList');

  try {
    const [summary, items, reports] = await Promise.all([
      apiCall('/admin/summary'),
      apiCall('/admin/items'),
      apiCall('/admin/reports')
    ]);

    metricsGrid.innerHTML = renderMetrics(summary);
    adminItemsList.innerHTML = renderAdminItems(items);
    adminReportsList.innerHTML = renderAdminReports(reports);
  } catch (error) {
    if (error.message === 'Admin access denied' || error.message === 'Admin access is not configured') {
      metricsGrid.innerHTML = `
        <div class="bg-amber-50 border border-amber-200 text-amber-800 rounded-2xl p-6 col-span-full">
          ${error.message}. Set <strong>ADMIN_EMAIL</strong> or <strong>ADMIN_EMAILS</strong> in the backend environment.
        </div>
      `;
      adminItemsList.innerHTML = '';
      adminReportsList.innerHTML = '';
      return;
    }

    metricsGrid.innerHTML = `
      <div class="bg-red-50 border border-red-200 text-red-700 rounded-2xl p-6 col-span-full">
        Failed to load dashboard metrics: ${error.message}
      </div>
    `;
    adminItemsList.innerHTML = '';
    adminReportsList.innerHTML = '';
  }
}

function renderMetrics(summary) {
  return [
    { label: 'Users', value: summary.users, icon: 'fa-users', tone: 'blue' },
    { label: 'Items', value: summary.items, icon: 'fa-box', tone: 'emerald' },
    { label: 'Skill Posts', value: summary.skills, icon: 'fa-star', tone: 'purple' },
    { label: 'Skill Exchanges', value: summary.skillExchanges, icon: 'fa-handshake', tone: 'amber' },
    { label: 'Interactions', value: summary.interactions, icon: 'fa-comments', tone: 'rose' },
    { label: 'Messages', value: summary.messages, icon: 'fa-envelope', tone: 'slate' }
  ].map((metric) => `
    <div class="metric-card bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
      <div class="flex items-start justify-between mb-4">
        <div>
          <p class="text-sm uppercase tracking-wide text-slate-500">${metric.label}</p>
          <h3 class="text-4xl font-bold text-slate-900 mt-2">${metric.value}</h3>
        </div>
        <div class="w-12 h-12 rounded-xl flex items-center justify-center ${METRIC_STYLES[metric.tone]}">
          <i class="fas ${metric.icon}"></i>
        </div>
      </div>
      <p class="text-sm text-slate-500">Live count from the backend summary endpoint.</p>
    </div>
  `).join('');
}

function renderAdminItems(items) {
  if (!items.length) {
    return '<div class="text-sm text-slate-500">No listings found.</div>';
  }

  return items.map((item) => `
    <div class="rounded-2xl border border-slate-200 p-4 bg-slate-50">
      <div class="flex items-start justify-between gap-4 mb-3">
        <div>
          <h4 class="font-bold text-slate-900">${item.title}</h4>
          <p class="text-sm text-slate-600">${item.first_name} ${item.last_name} · ${item.category}</p>
        </div>
        <span class="text-xs px-2 py-1 rounded-full ${statusBadge(item.status)}">${item.status}</span>
      </div>
      <p class="text-sm text-slate-600 mb-3">${item.description}</p>
      <div class="flex flex-wrap gap-2">
        <button onclick="approveItem(${item.id})" class="px-3 py-2 rounded-lg bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700">Approve</button>
        <button onclick="editItem(${item.id})" class="px-3 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700">Edit</button>
        <button onclick="deleteItem(${item.id})" class="px-3 py-2 rounded-lg bg-rose-600 text-white text-sm font-semibold hover:bg-rose-700">Delete</button>
      </div>
    </div>
  `).join('');
}

function renderAdminReports(reports) {
  if (!reports.length) {
    return '<div class="text-sm text-slate-500">No reports in the moderation queue.</div>';
  }

  return reports.map((report) => `
    <div class="rounded-2xl border border-slate-200 p-4 bg-white">
      <div class="flex items-start justify-between gap-4 mb-2">
        <div>
          <h4 class="font-bold text-slate-900">Report #${report.id}</h4>
          <p class="text-sm text-slate-600">By ${report.reporter_first_name} ${report.reporter_last_name}</p>
        </div>
        <span class="text-xs px-2 py-1 rounded-full ${report.status === 'resolved' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}">${report.status}</span>
      </div>
      <p class="text-sm text-slate-600 mb-2">Reason: ${report.reason}</p>
      <p class="text-sm text-slate-600 mb-3">Target: ${report.item_title || `${report.reported_user_first_name} ${report.reported_user_last_name}`}</p>
      <div class="flex flex-wrap gap-2">
        ${report.reported_item_id ? `<button onclick="deleteReportedItem(${report.id}, ${report.reported_item_id})" class="px-3 py-2 rounded-lg bg-rose-600 text-white text-sm font-semibold hover:bg-rose-700">Remove Content</button>` : ''}
        <button onclick="resolveReport(${report.id})" class="px-3 py-2 rounded-lg bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700">Resolve</button>
        <button onclick="removeReport(${report.id})" class="px-3 py-2 rounded-lg bg-slate-700 text-white text-sm font-semibold hover:bg-slate-800">Delete Report</button>
      </div>
    </div>
  `).join('');
}

function statusBadge(status) {
  if (status === 'available') return 'bg-emerald-100 text-emerald-700';
  if (status === 'swapped') return 'bg-amber-100 text-amber-700';
  if (status === 'sold') return 'bg-slate-100 text-slate-700';
  return 'bg-blue-100 text-blue-700';
}

async function reloadDashboard() {
  await loadDashboard();
}

async function approveItem(itemId) {
  try {
    await apiCall(`/admin/items/${itemId}`, 'PUT', { status: 'available' });
    await reloadDashboard();
  } catch (error) {
    alert('Failed to approve item: ' + error.message);
  }
}

async function editItem(itemId) {
  const title = prompt('New title (leave blank to keep current):');
  const description = prompt('New description (leave blank to keep current):');
  const category = prompt('New category (leave blank to keep current):');
  const status = prompt('New status: available, swapped, or sold (leave blank to keep current):');
  const priceInput = prompt('New price (leave blank to keep current):');
  const image_url = prompt('New image URL (leave blank to keep current):');

  try {
    await apiCall(`/admin/items/${itemId}`, 'PUT', {
      title: title || null,
      description: description || null,
      category: category || null,
      status: status || null,
      price: priceInput ? Number(priceInput) : null,
      image_url: image_url || null
    });
    await reloadDashboard();
  } catch (error) {
    alert('Failed to edit item: ' + error.message);
  }
}

async function deleteItem(itemId) {
  if (!confirm('Delete this listing?')) {
    return;
  }

  try {
    await apiCall(`/admin/items/${itemId}`, 'DELETE');
    await reloadDashboard();
  } catch (error) {
    alert('Failed to delete item: ' + error.message);
  }
}

async function deleteReportedItem(reportId, itemId) {
  if (!confirm('Remove the reported content and resolve this report?')) {
    return;
  }

  try {
    await apiCall(`/admin/items/${itemId}`, 'DELETE');
    await apiCall(`/admin/reports/${reportId}`, 'PATCH', { status: 'resolved' });
    await reloadDashboard();
  } catch (error) {
    alert('Failed to remove reported content: ' + error.message);
  }
}

async function resolveReport(reportId) {
  try {
    await apiCall(`/admin/reports/${reportId}`, 'PATCH', { status: 'resolved' });
    await reloadDashboard();
  } catch (error) {
    alert('Failed to resolve report: ' + error.message);
  }
}

async function removeReport(reportId) {
  if (!confirm('Delete this report entry?')) {
    return;
  }

  try {
    await apiCall(`/admin/reports/${reportId}`, 'DELETE');
    await reloadDashboard();
  } catch (error) {
    alert('Failed to delete report: ' + error.message);
  }
}

document.addEventListener('DOMContentLoaded', loadDashboard);