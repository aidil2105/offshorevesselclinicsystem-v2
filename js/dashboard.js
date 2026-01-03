/* ==========================================
   MarMed Onboard Clinic - Dashboard Page
   ========================================== */

function loadDashboard() {
    const visits = utils.load(STORAGE_KEYS.VISITS) || [];
    const emergencies = utils.load(STORAGE_KEYS.EMERGENCIES) || [];
    const medicines = utils.load(STORAGE_KEYS.MEDICINES) || [];
    const crew = utils.load(STORAGE_KEYS.CREW) || [];

    const today = utils.formatDate(new Date());
    const stats = {
        todayVisits: visits.filter(v => v.date === today).length,
        ongoingTreatments: crew.filter(c => c.healthStatus === 'Under Observation').length,
        underObservation: crew.filter(c => c.healthStatus === 'Under Observation').length,
        lowStockMedicines: medicines.filter(m => m.stock < m.reorderLevel).length
    };

    document.querySelectorAll('.stat-value').forEach((el, idx) => {
        if (idx === 0) el.textContent = stats.todayVisits;
        else if (idx === 1) el.textContent = stats.ongoingTreatments;
        else if (idx === 2) el.textContent = stats.underObservation;
        else if (idx === 3) el.textContent = stats.lowStockMedicines;
    });

    const chartPlaceholder = document.querySelector('.chart-placeholder');
    if (chartPlaceholder) {
        const last7Days = [];
        for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const dateStr = utils.formatDate(date);
            const count = visits.filter(v => v.date === dateStr).length;
            last7Days.push({ date: dateStr, count });
        }
        const maxCount = Math.max(...last7Days.map(d => d.count), 1);
        const chartHeight = 150;
        const maxBarHeight = chartHeight - 30; // Leave space for labels
        const scaleFactor = maxCount === 1 ? 0.3 : 1;
        
        chartPlaceholder.innerHTML = `
            <div style="padding: 20px; width: 100%; height: 100%; display: flex; flex-direction: column;">
                <div style="flex: 1; display: flex; align-items: flex-end; justify-content: space-around; gap: 8px; padding-bottom: 0; border-bottom: 2px solid #E5E7EB; min-height: ${chartHeight}px;">
                    ${last7Days.map((day, idx) => {
            const barHeight = day.count > 0 ? Math.max(12, (day.count / maxCount) * maxBarHeight * scaleFactor) : 8;
            const isToday = idx === 6;
            return `
                        <div style="flex: 1; max-width: 50px; display: flex; flex-direction: column; align-items: center; height: 100%; justify-content: flex-end;">
                            <span style="font-size: 0.9rem; font-weight: 700; color: ${isToday ? '#3B82F6' : '#1E3A8A'}; margin-bottom: 6px; flex-shrink: 0;">${day.count}</span>
                            <div style="width: 100%; display: flex; align-items: flex-end; justify-content: center; height: ${chartHeight}px;">
                                <div style="width: 100%; height: ${barHeight}px; min-height: 10px; background: linear-gradient(180deg, ${isToday ? '#3B82F6' : '#60A5FA'} 0%, ${isToday ? '#1D4ED8' : '#3B82F6'} 100%); border-radius: 6px 6px 0 0; box-shadow: 0 -2px 6px ${isToday ? 'rgba(59, 130, 246, 0.3)' : 'rgba(59, 130, 246, 0.15)'}; align-self: flex-end;"></div>
                            </div>
                        </div>
                    `;
        }).join('')}
                </div>
                <div style="display: flex; justify-content: space-around; padding-top: 10px; border-top: 2px solid #E5E7EB; margin-top: 8px;">
                    ${last7Days.map((day, idx) => {
            const isToday = idx === 6;
            return `
                        <div style="flex: 1; max-width: 50px; text-align: center;">
                            <div style="font-size: 0.75rem; font-weight: ${isToday ? '700' : '500'}; color: ${isToday ? '#3B82F6' : '#64748B'};">${day.date.split('-')[2]}</div>
                        </div>
                    `;
        }).join('')}
                </div>
                <div style="text-align: center; margin-top: 12px; color: #1E3A8A; font-weight: 600; font-size: 0.85rem;">7-Day Visit Trend</div>
            </div>
        `;
    }
}

// Initialize dashboard when page loads
document.addEventListener('DOMContentLoaded', function () {
    if (window.location.pathname.split('/').pop() === 'index.html' || window.location.pathname.endsWith('/')) {
        loadDashboard();
    }
});

