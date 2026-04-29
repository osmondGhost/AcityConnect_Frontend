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

  try {
    const summary = await apiCall('/admin/summary');

    metricsGrid.innerHTML = [
      {
        label: 'Users',
        value: summary.users,
        icon: 'fa-users',
        tone: 'blue'
      },
      {
        label: 'Items',
        value: summary.items,
        icon: 'fa-box',
        tone: 'emerald'
      },
      {
        label: 'Skill Posts',
        value: summary.skills,
        icon: 'fa-star',
        tone: 'purple'
      },
      {
        label: 'Skill Exchanges',
        value: summary.skillExchanges,
        icon: 'fa-handshake',
        tone: 'amber'
      },
      {
        label: 'Interactions',
        value: summary.interactions,
        icon: 'fa-comments',
        tone: 'rose'
      },
      {
        label: 'Messages',
        value: summary.messages,
        icon: 'fa-envelope',
        tone: 'slate'
      }
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
  } catch (error) {
    metricsGrid.innerHTML = `
      <div class="bg-red-50 border border-red-200 text-red-700 rounded-2xl p-6 col-span-full">
        Failed to load dashboard metrics: ${error.message}
      </div>
    `;
  }
}

document.addEventListener('DOMContentLoaded', loadDashboard);