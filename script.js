/* ==========================================
   MarMed Onboard Clinic - JavaScript Functions
   ========================================== */

// ==========================================
// Configuration
// ==========================================

const EMAILJS_CONFIG = {
    publicKey: 'LLCfs0h1qsRUJpEXN',
    serviceId: 'service_eyh110o',
    templateId: 'template_qk93xzu'
};

const STORAGE_KEYS = {
    CREW: 'marmed_crew_records',
    VISITS: 'marmed_visit_logs',
    EMERGENCIES: 'marmed_emergencies',
    MEDICINES: 'marmed_medicines',
    CLINIC_INFO: 'marmed_clinic_info',
    COMPLAINTS: 'marmed_complaints'
};

// ==========================================
// Utilities
// ==========================================

const utils = {
    formatDate: (date) => {
        const d = new Date(date);
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    },
    
    formatDateTime: (date) => {
        const d = new Date(date);
        return `${utils.formatDate(d)} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
    },
    
    save: (key, data) => {
        try {
            localStorage.setItem(key, JSON.stringify(data));
            return true;
        } catch (e) {
            console.error('Error saving to localStorage:', e);
            return false;
        }
    },
    
    load: (key) => {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (e) {
            console.error('Error loading from localStorage:', e);
            return null;
        }
    },
    
    remove: (key) => {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (e) {
            console.error('Error removing from localStorage:', e);
            return false;
        }
    },
    
    showNotification: (message, type = 'success') => {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            position: fixed; top: 20px; right: 20px; padding: 20px 30px;
            background: ${type === 'success' ? 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)' : 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)'};
            color: white; border-radius: 12px; box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
            z-index: 10000; animation: slideInRight 0.3s ease; font-weight: 600;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => document.body.removeChild(notification), 300);
        }, 3000);
    },
    
    searchTable: (input, table) => {
        if (!input || !table) return;
        const filter = input.value.toUpperCase();
        const rows = table.getElementsByTagName('tr');
        for (let i = 1; i < rows.length; i++) {
            const row = rows[i];
            const cells = row.getElementsByTagName('td');
            let found = false;
            for (let j = 0; j < cells.length; j++) {
                if ((cells[j].textContent || cells[j].innerText).toUpperCase().indexOf(filter) > -1) {
                    found = true;
                    break;
                }
            }
            row.style.display = found ? '' : 'none';
        }
    }
};

// Add animation styles
if (!document.getElementById('notification-styles')) {
    const style = document.createElement('style');
    style.id = 'notification-styles';
    style.textContent = `
        @keyframes slideInRight { from { transform: translateX(400px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes slideOutRight { from { transform: translateX(0); opacity: 1; } to { transform: translateX(400px); opacity: 0; } }
    `;
    document.head.appendChild(style);
}

// ==========================================
// Data Initialization
// ==========================================

function initializeData() {
    const defaults = {
        [STORAGE_KEYS.CREW]: [
            { id: '1', name: 'James Anderson', rank: 'Captain', lastVisit: '2025-11-20', healthStatus: 'Fit for Duty', vaccination: 'Current', medicalHistory: [], vaccinationRecord: [] },
            { id: '2', name: 'Maria Santos', rank: 'Chief Engineer', lastVisit: '2025-11-18', healthStatus: 'Fit for Duty', vaccination: 'Current', medicalHistory: [], vaccinationRecord: [] },
            { id: '3', name: 'David Kim', rank: 'First Mate', lastVisit: '2025-11-15', healthStatus: 'Under Observation', vaccination: 'Current', medicalHistory: [], vaccinationRecord: [] },
            { id: '4', name: 'Sarah Thompson', rank: 'Second Engineer', lastVisit: '2025-11-10', healthStatus: 'Fit for Duty', vaccination: 'Due Soon', medicalHistory: [], vaccinationRecord: [] },
            { id: '5', name: 'Mohammed Ali', rank: 'Deck Officer', lastVisit: '2025-11-08', healthStatus: 'Fit for Duty', vaccination: 'Current', medicalHistory: [], vaccinationRecord: [] },
            { id: '6', name: 'Elena Rodriguez', rank: 'Cook', lastVisit: '2025-11-05', healthStatus: 'Fit for Duty', vaccination: 'Current', medicalHistory: [], vaccinationRecord: [] },
            { id: '7', name: 'John Peterson', rank: 'AB Seaman', lastVisit: '2025-10-28', healthStatus: 'Fit for Duty', vaccination: 'Current', medicalHistory: [], vaccinationRecord: [] }
        ],
        [STORAGE_KEYS.VISITS]: [
            { id: '1', date: '2025-11-25', crewName: 'James Anderson', complaint: 'Headache, Nausea', diagnosis: 'Seasickness', treatment: 'Antiemetic medication', medic: 'Dr. Smith', remarks: '', condition: 'Illness' },
            { id: '2', date: '2025-11-24', crewName: 'Maria Santos', complaint: 'Minor hand laceration', diagnosis: 'Superficial wound', treatment: 'Wound cleaning, bandaging', medic: 'Dr. Johnson', remarks: '', condition: 'Injury' },
            { id: '3', date: '2025-11-23', crewName: 'David Kim', complaint: 'Cough, Fever', diagnosis: 'Upper respiratory infection', treatment: 'Antibiotics, rest', medic: 'Dr. Smith', remarks: '', condition: 'Illness' },
            { id: '4', date: '2025-11-22', crewName: 'Sarah Thompson', complaint: 'Back pain', diagnosis: 'Muscle strain', treatment: 'Pain relief, physiotherapy', medic: 'Dr. Johnson', remarks: '', condition: 'Injury' },
            { id: '5', date: '2025-11-21', crewName: 'Mohammed Ali', complaint: 'Routine check-up', diagnosis: 'Healthy', treatment: 'No treatment needed', medic: 'Dr. Smith', remarks: '', condition: 'Check-up' },
            { id: '6', date: '2025-11-20', crewName: 'Elena Rodriguez', complaint: 'Skin rash', diagnosis: 'Contact dermatitis', treatment: 'Topical cream', medic: 'Dr. Johnson', remarks: '', condition: 'Illness' },
            { id: '7', date: '2025-11-19', crewName: 'John Peterson', complaint: 'Eye irritation', diagnosis: 'Foreign body in eye', treatment: 'Eye wash, antibiotic drops', medic: 'Dr. Smith', remarks: '', condition: 'Injury' }
        ],
        [STORAGE_KEYS.EMERGENCIES]: [
            { id: '1', dateTime: '2025-11-15T14:30', type: 'Severe Injury', crewName: 'John Peterson', location: 'Engine Room', treatment: 'Immediate first aid, stabilized', evacuation: 'Evacuated to shore hospital', outcome: 'Stabilized, Evacuated', timestamp: new Date('2025-11-15T14:30').getTime() },
            { id: '2', dateTime: '2025-10-28T08:15', type: 'Cardiac Event', crewName: 'Robert Chen', location: 'Bridge', treatment: 'CPR, defibrillation', evacuation: 'Medical evacuation arranged', outcome: 'Recovered, Under Observation', timestamp: new Date('2025-10-28T08:15').getTime() },
            { id: '3', dateTime: '2025-10-10T22:45', type: 'Burns', crewName: 'Maria Santos', location: 'Galley', treatment: 'Cooling, pain management', evacuation: 'None', outcome: 'Treated Onboard, Recovered', timestamp: new Date('2025-10-10T22:45').getTime() },
            { id: '4', dateTime: '2025-09-22T16:20', type: 'Fracture', crewName: 'David Kim', location: 'Deck', treatment: 'Immobilization, pain relief', evacuation: 'Evacuated for surgery', outcome: 'Stabilized, Evacuated', timestamp: new Date('2025-09-22T16:20').getTime() }
        ],
        [STORAGE_KEYS.MEDICINES]: [
            { id: '1', name: 'Paracetamol 500mg', stock: 150, unit: 'tablets', expiry: '2026-06-15', reorderLevel: 50, location: 'Main Clinic - Cabinet A', category: 'Analgesics' },
            { id: '2', name: 'Amoxicillin 250mg', stock: 8, unit: 'boxes', expiry: '2025-12-30', reorderLevel: 20, location: 'Main Clinic - Refrigerator', category: 'Antibiotics' },
            { id: '3', name: 'Ibuprofen 400mg', stock: 200, unit: 'tablets', expiry: '2026-03-20', reorderLevel: 75, location: 'Main Clinic - Cabinet A', category: 'Analgesics' },
            { id: '4', name: 'Epinephrine Auto-Injector', stock: 3, unit: 'units', expiry: '2025-12-01', reorderLevel: 5, location: 'Emergency Kit', category: 'Emergency' },
            { id: '5', name: 'Aspirin 300mg', stock: 22, unit: 'boxes', expiry: '2026-08-10', reorderLevel: 20, location: 'Main Clinic - Cabinet B', category: 'Cardiac' },
            { id: '6', name: 'Antihistamine Tablets', stock: 95, unit: 'tablets', expiry: '2026-01-28', reorderLevel: 30, location: 'Main Clinic - Cabinet A', category: 'Allergy' },
            { id: '7', name: 'Ciprofloxacin 500mg', stock: 12, unit: 'tablets', expiry: '2025-11-30', reorderLevel: 40, location: 'Main Clinic - Refrigerator', category: 'Antibiotics' },
            { id: '8', name: 'Omeprazole 20mg', stock: 80, unit: 'capsules', expiry: '2026-04-15', reorderLevel: 30, location: 'Main Clinic - Cabinet C', category: 'Gastric' },
            { id: '9', name: 'Nitroglycerin Spray', stock: 4, unit: 'bottles', expiry: '2026-02-20', reorderLevel: 3, location: 'Emergency Kit', category: 'Cardiac' },
            { id: '10', name: 'Antiemetic Tablets', stock: 120, unit: 'tablets', expiry: '2026-07-05', reorderLevel: 50, location: 'Main Clinic - Cabinet B', category: 'Anti-nausea' }
        ],
        [STORAGE_KEYS.CLINIC_INFO]: {
            vesselName: 'MV Ocean Navigator',
            vesselIMO: 'IMO 9876543',
            medicInCharge: 'Dr. Sarah Johnson',
            medicalLicense: 'ML-2025-456789'
        }
    };
    
    Object.keys(defaults).forEach(key => {
        if (!utils.load(key)) utils.save(key, defaults[key]);
    });
}

// ==========================================
// Generic Table Loader
// ==========================================

function loadTable(data, columns, tbodySelector = '.data-table tbody', options = {}) {
    const tbody = document.querySelector(tbodySelector);
    if (!tbody) return;
    
    tbody.innerHTML = '';
    data.forEach((item, idx) => {
        const row = document.createElement('tr');
        if (options.onRowClick) row.onclick = () => options.onRowClick(row, item);
        row.innerHTML = columns.map(col => {
            if (typeof col === 'function') return col(item, idx);
            return `<td>${item[col] || ''}</td>`;
        }).join('');
        tbody.appendChild(row);
    });
}

// ==========================================
// Page-Specific Loaders
// ==========================================

function loadCrewRecords() {
    const crew = utils.load(STORAGE_KEYS.CREW) || [];
    loadTable(crew, [
        (m) => `<td>${m.name}</td>`,
        (m) => `<td>${m.rank}</td>`,
        (m) => `<td>${m.lastVisit}</td>`,
        (m) => `<td>${m.healthStatus === 'Fit for Duty' ? '✓ Fit for Duty' : '⚠ ' + m.healthStatus}</td>`,
        (m) => `<td>${m.vaccination === 'Current' ? '✓ Current' : '⚠ ' + m.vaccination}</td>`
    ], '.data-table tbody', {
        onRowClick: (row) => {
            document.querySelectorAll('.data-table tbody tr').forEach(r => r.classList.remove('selected'));
            row.classList.add('selected');
        }
    });
}

function loadVisitLog() {
    const visits = utils.load(STORAGE_KEYS.VISITS) || [];
    loadTable(visits, ['date', 'crewName', 'complaint', 'diagnosis', 'treatment', 'medic']);
}

function loadEmergencies() {
    const emergencies = (utils.load(STORAGE_KEYS.EMERGENCIES) || []).sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
    loadTable(emergencies, ['dateTime', 'type', 'crewName', 'location', 'outcome']);
}

function loadMedicineInventory() {
    const medicines = utils.load(STORAGE_KEYS.MEDICINES) || [];
    loadTable(medicines, [
        (m) => `<td>${m.name}</td>`,
        (m) => {
            const stockClass = m.stock < m.reorderLevel ? 'stock-low' : m.stock < m.reorderLevel * 2 ? 'stock-medium' : 'stock-good';
            return `<td class="${stockClass}">${m.stock} ${m.unit}</td>`;
        },
        (m) => {
            const expiryDate = new Date(m.expiry);
            const daysUntilExpiry = Math.ceil((expiryDate - new Date()) / (1000 * 60 * 60 * 24));
            const expiryClass = daysUntilExpiry < 0 ? 'expiry-caution' : daysUntilExpiry <= 30 ? 'expiry-warning' : '';
            return `<td class="${expiryClass}">${m.expiry}</td>`;
        },
        (m) => `<td>${m.reorderLevel} ${m.unit}</td>`,
        (m) => `<td>${m.location}</td>`,
        (m) => `<td>${m.category}</td>`,
        (m) => `<td>
            <button onclick="openMedicineModal('${m.id}')" style="padding: 4px 8px; margin-right: 4px; cursor: pointer;">Edit</button>
            <button onclick="deleteMedicine('${m.id}')" style="padding: 4px 8px; cursor: pointer; background: #dc2626; color: white; border: none; border-radius: 4px;">Delete</button>
        </td>`
    ]);
}

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
        chartPlaceholder.innerHTML = `
            <div style="padding: 20px;">
                <div style="display: flex; align-items: flex-end; justify-content: space-around; height: 200px;">
                    ${last7Days.map(day => `
                        <div style="display: flex; flex-direction: column; align-items: center;">
                            <div style="background: #3B82F6; width: 30px; height: ${day.count * 20}px; margin-bottom: 5px; border-radius: 4px 4px 0 0;"></div>
                            <span style="font-size: 12px;">${day.count}</span>
                            <span style="font-size: 10px; color: #666;">${day.date.split('-')[2]}</span>
                        </div>
                    `).join('')}
                </div>
                <div style="text-align: center; margin-top: 10px; color: #0059b3;">7-Day Visit Trend</div>
            </div>
        `;
    }
}

function loadAnalytics() {
    const visits = utils.load(STORAGE_KEYS.VISITS) || [];
    const medicines = utils.load(STORAGE_KEYS.MEDICINES) || [];
    
    // Common Conditions
    const conditions = {};
    visits.forEach(v => {
        const condition = v.condition || 'Other';
        conditions[condition] = (conditions[condition] || 0) + 1;
    });
    
    const conditionsChart = document.querySelector('.chart-card:first-child .chart-placeholder');
    if (conditionsChart) {
        const sortedConditions = Object.entries(conditions).sort((a, b) => b[1] - a[1]).slice(0, 5);
        if (sortedConditions.length === 0) sortedConditions.push(['Illness', 3], ['Injury', 3], ['Check-up1', 1]);
        const maxCount = Math.max(...sortedConditions.map(c => c[1]), 1);
        conditionsChart.innerHTML = `
            <div style="padding: 20px; width: 100%;">
                ${sortedConditions.map(([condition, count]) => {
                    const barWidth = count > 0 ? Math.max(30, (count / maxCount) * 100) : 0;
                    return `
                    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 15px;">
                        <span style="font-size: 1rem; color: var(--text-main);">${condition}</span>
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <span style="font-weight: 600; color: var(--text-main);">${count}</span>
                            <div style="width: 60px; height: 8px; background: #E5E7EB; border-radius: 4px; position: relative; overflow: hidden; flex-shrink: 0;">
                                <div style="width: ${barWidth}%; height: 100%; background: #3B82F6; border-radius: 4px;"></div>
                            </div>
                        </div>
                    </div>
                `;
                }).join('')}
            </div>
        `;
    }
    
    // Weekly Visits
    const weeklyChart = document.querySelectorAll('.chart-card')[1]?.querySelector('.chart-placeholder');
    if (weeklyChart) {
        const now = new Date();
        const startOfYear = new Date(now.getFullYear(), 0, 1);
        const pastDaysOfYear = (now - startOfYear) / 86400000;
        const currentWeek = Math.ceil((pastDaysOfYear + startOfYear.getDay() + 1) / 7);
        const weekData = [];
        for (let i = 6; i >= 0; i--) {
            const weekNum = currentWeek - i;
            const weekStart = new Date(startOfYear);
            weekStart.setDate(startOfYear.getDate() + (weekNum - 1) * 7 - startOfYear.getDay());
            const weekEnd = new Date(weekStart);
            weekEnd.setDate(weekStart.getDate() + 6);
            const count = visits.filter(v => {
                const visitDate = new Date(v.date);
                return visitDate >= weekStart && visitDate <= weekEnd;
            }).length;
            weekData.push({ week: weekNum, count });
        }
        weeklyChart.innerHTML = `
            <div style="padding: 20px; width: 100%;">
                <div style="display: flex; justify-content: space-around; align-items: flex-end; margin-bottom: 10px;">
                    ${weekData.map(w => `<div style="display: flex; flex-direction: column; align-items: center;"><span style="font-size: 1.25rem; font-weight: 600; color: var(--text-main); margin-bottom: 8px;">${w.count}</span></div>`).join('')}
                </div>
                <div style="display: flex; justify-content: space-around; align-items: center;">
                    ${weekData.map(w => `<span style="font-size: 0.875rem; color: var(--text-muted);">${w.week}</span>`).join('')}
                </div>
            </div>
        `;
    }
    
    // Medicine Usage
    const medicineChart = document.querySelectorAll('.chart-card')[2]?.querySelector('.chart-placeholder');
    if (medicineChart) {
        const categories = {};
        medicines.forEach(m => {
            const category = m.category || 'Other';
            categories[category] = (categories[category] || 0) + 1;
        });
        if (Object.keys(categories).length === 0) {
            Object.assign(categories, { 'Analgesics': 2, 'Antibiotics': 2, 'Cardiac': 2, 'Emergency': 1, 'Allergy': 1, 'Gastric': 1, 'Anti-nausea': 1 });
        }
        const sortedCategories = Object.entries(categories).sort((a, b) => b[1] - a[1]);
        medicineChart.innerHTML = `
            <div style="padding: 20px; width: 100%;">
                <ul style="list-style: none; padding: 0; margin: 0;">
                    ${sortedCategories.map(([category, count]) => `
                        <li style="display: flex; align-items: center; margin-bottom: 12px;">
                            <span style="width: 8px; height: 8px; background: #3B82F6; border-radius: 50%; margin-right: 12px; flex-shrink: 0;"></span>
                            <span style="flex: 1; font-size: 1rem; color: var(--text-main);">${category}:</span>
                            <span style="font-weight: 600; color: var(--text-main);">${count}</span>
                        </li>
                    `).join('')}
                </ul>
            </div>
        `;
    }
    
    // Ship Route Map
    const mapChart = document.querySelectorAll('.chart-card')[3]?.querySelector('.chart-placeholder');
    if (mapChart) {
        mapChart.innerHTML = `
            <div style="padding: 20px; width: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%;">
                <div style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;">🗺️</div>
                <div style="font-size: 1rem; font-weight: 600; color: var(--text-main); margin-bottom: 0.5rem;">Geographic Map</div>
                <div style="font-size: 0.875rem; color: var(--text-muted);">Health Incidents by Location</div>
            </div>
        `;
    }
}

function loadSettings() {
    const clinicInfo = utils.load(STORAGE_KEYS.CLINIC_INFO) || {};
    const form = document.querySelector('#clinicInfo form');
    if (form) {
        ['vesselName', 'vesselIMO', 'medicInCharge', 'medicalLicense'].forEach((key, idx) => {
            const placeholders = ['Enter vessel name', 'Enter IMO number', 'Enter medic name', 'Enter license number'];
            const input = form.querySelector(`[placeholder="${placeholders[idx]}"]`);
            if (input) input.value = clinicInfo[key] || '';
        });
    }
}

// ==========================================
// Modal Functions
// ==========================================

function openModal() {
    const modal = document.getElementById('visitModal');
    if (modal) {
        modal.style.display = 'block';
        document.getElementById('visitForm')?.reset();
    }
}

function closeModal() {
    const modal = document.getElementById('visitModal');
    if (modal) modal.style.display = 'none';
}

function openMedicineModal(medicineId = null) {
    let modal = document.getElementById('medicineModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'medicineModal';
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2 class="modal-title">Add/Edit Medicine</h2>
                    <span class="close" onclick="closeMedicineModal()">&times;</span>
                </div>
                <div class="modal-body">
                    <form id="medicineForm">
                        <div class="form-group"><label class="form-label">Medicine Name</label><input type="text" name="name" class="form-input" placeholder="e.g., Paracetamol 500mg" required></div>
                        <div class="form-group"><label class="form-label">Stock Quantity</label><input type="number" name="stock" class="form-input" placeholder="Enter quantity" required></div>
                        <div class="form-group"><label class="form-label">Unit</label><input type="text" name="unit" class="form-input" placeholder="e.g., tablets, boxes, bottles" required></div>
                        <div class="form-group"><label class="form-label">Expiry Date</label><input type="date" name="expiry" class="form-input" required></div>
                        <div class="form-group"><label class="form-label">Reorder Level</label><input type="number" name="reorderLevel" class="form-input" placeholder="Minimum stock level" required></div>
                        <div class="form-group"><label class="form-label">Location</label><input type="text" name="location" class="form-input" placeholder="e.g., Main Clinic - Cabinet A" required></div>
                        <div class="form-group"><label class="form-label">Category</label><input type="text" name="category" class="form-input" placeholder="e.g., Analgesics, Antibiotics" required></div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button class="btn-cancel" onclick="closeMedicineModal()">Cancel</button>
                    <button class="btn-save" onclick="saveMedicine()">Save Medicine</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }
    modal.style.display = 'block';
    const form = document.getElementById('medicineForm');
    if (form) {
        form.reset();
        if (medicineId) {
            const medicines = utils.load(STORAGE_KEYS.MEDICINES) || [];
            const medicine = medicines.find(m => m.id === medicineId);
            if (medicine) {
                Object.keys(medicine).forEach(key => {
                    const input = form.querySelector(`[name="${key}"]`);
                    if (input) input.value = medicine[key];
                });
                form.dataset.editId = medicineId;
            }
        } else {
            delete form.dataset.editId;
        }
    }
}

function closeMedicineModal() {
    const modal = document.getElementById('medicineModal');
    if (modal) modal.style.display = 'none';
}

// ==========================================
// Form Handlers
// ==========================================

function saveVisit() {
    const form = document.getElementById('visitForm');
    if (!form) return;
    
    const data = {
        crewName: form.querySelector('[name="crewName"]')?.value.trim(),
        complaint: form.querySelector('[name="complaint"]')?.value.trim(),
        diagnosis: form.querySelector('[name="diagnosis"]')?.value.trim(),
        treatment: form.querySelector('[name="treatment"]')?.value.trim(),
        remarks: form.querySelector('[name="remarks"]')?.value.trim()
    };
    
    if (!data.crewName || !data.complaint || !data.diagnosis || !data.treatment) {
        utils.showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    const visits = utils.load(STORAGE_KEYS.VISITS) || [];
    const newVisit = {
        id: Date.now().toString(),
        date: utils.formatDate(new Date()),
        ...data,
        medic: 'Dr. Smith',
        condition: 'Illness'
    };
    
    visits.unshift(newVisit);
    utils.save(STORAGE_KEYS.VISITS, visits);
    
    const crew = utils.load(STORAGE_KEYS.CREW) || [];
    const crewMember = crew.find(c => c.name === data.crewName);
    if (crewMember) {
        crewMember.lastVisit = newVisit.date;
        utils.save(STORAGE_KEYS.CREW, crew);
    }
    
    utils.showNotification('Visit record saved successfully!', 'success');
    closeModal();
    loadVisitLog();
}

function saveMedicine() {
    const form = document.getElementById('medicineForm');
    if (!form) return;
    
    const data = {
        name: form.querySelector('[name="name"]')?.value.trim(),
        stock: parseInt(form.querySelector('[name="stock"]')?.value),
        unit: form.querySelector('[name="unit"]')?.value.trim(),
        expiry: form.querySelector('[name="expiry"]')?.value,
        reorderLevel: parseInt(form.querySelector('[name="reorderLevel"]')?.value),
        location: form.querySelector('[name="location"]')?.value.trim(),
        category: form.querySelector('[name="category"]')?.value.trim()
    };
    
    if (!data.name || !data.stock || !data.unit || !data.expiry || !data.reorderLevel || !data.location || !data.category) {
        utils.showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    const medicines = utils.load(STORAGE_KEYS.MEDICINES) || [];
    const editId = form.dataset.editId;
    
    if (editId) {
        const index = medicines.findIndex(m => m.id === editId);
        if (index !== -1) {
            medicines[index] = { ...medicines[index], ...data };
            utils.showNotification('Medicine updated successfully!', 'success');
        }
    } else {
        medicines.push({ id: Date.now().toString(), ...data });
        utils.showNotification('Medicine added successfully!', 'success');
    }
    
    utils.save(STORAGE_KEYS.MEDICINES, medicines);
    closeMedicineModal();
    loadMedicineInventory();
}

function deleteMedicine(medicineId) {
    if (!confirm('Are you sure you want to delete this medicine?')) return;
    const medicines = utils.load(STORAGE_KEYS.MEDICINES) || [];
    utils.save(STORAGE_KEYS.MEDICINES, medicines.filter(m => m.id !== medicineId));
    utils.showNotification('Medicine deleted successfully!', 'success');
    loadMedicineInventory();
}

function saveEmergency(event) {
    event.preventDefault();
    const form = document.getElementById('emergencyForm') || event.target;
    
    const data = {
        incidentType: document.getElementById('incidentTypeInput')?.value,
        dateTime: document.getElementById('emergencyDateTime')?.value,
        crewName: document.getElementById('emergencyCrewName')?.value.trim(),
        location: document.getElementById('emergencyLocation')?.value.trim(),
        treatment: document.getElementById('emergencyTreatment')?.value.trim(),
        evacuation: document.getElementById('emergencyEvacuation')?.value.trim(),
        outcome: document.getElementById('emergencyOutcome')?.value.trim()
    };
    
    if (!data.incidentType || !data.dateTime || !data.crewName || !data.location || !data.treatment) {
        utils.showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    const emergencies = utils.load(STORAGE_KEYS.EMERGENCIES) || [];
    emergencies.unshift({
        id: Date.now().toString(),
        dateTime: data.dateTime,
        type: data.incidentType,
        crewName: data.crewName,
        location: data.location,
        treatment: data.treatment,
        evacuation: data.evacuation || '',
        outcome: data.outcome || '',
        timestamp: new Date(data.dateTime).getTime()
    });
    
    utils.save(STORAGE_KEYS.EMERGENCIES, emergencies);
    utils.showNotification('Emergency case logged successfully!', 'success');
    form.reset();
    const incidentSelect = document.querySelector('#incident-type-select .custom-select-trigger span');
    if (incidentSelect) incidentSelect.textContent = 'Select type...';
    const incidentInput = document.getElementById('incidentTypeInput');
    if (incidentInput) incidentInput.value = '';
    loadEmergencies();
}

function saveClinicInfo(event) {
    const form = event.target;
    const data = {
        vesselName: form.querySelector('[placeholder="Enter vessel name"]')?.value.trim(),
        vesselIMO: form.querySelector('[placeholder="Enter IMO number"]')?.value.trim(),
        medicInCharge: form.querySelector('[placeholder="Enter medic name"]')?.value.trim(),
        medicalLicense: form.querySelector('[placeholder="Enter license number"]')?.value.trim()
    };
    
    if (!data.vesselName || !data.vesselIMO || !data.medicInCharge || !data.medicalLicense) {
        utils.showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    utils.save(STORAGE_KEYS.CLINIC_INFO, data);
    utils.showNotification('Clinic information saved successfully!', 'success');
}

async function submitComplaint(event) {
    event.preventDefault();
    const form = event.target;
    const submitBtn = form.querySelector('.submit-btn');
    const successMessage = document.getElementById('successMessage');
    
    const refId = 'COMP-' + Math.floor(1000 + Math.random() * 9000);
    const templateParams = {
        category: document.getElementById('categoryInput')?.value || 'Not specified',
        priority: document.getElementById('priorityInput')?.value || 'Not specified',
        subject: form.querySelector('input[type="text"]')?.value || 'No subject',
        incident_date: form.querySelector('input[type="date"]')?.value || 'Not specified',
        from_email: form.querySelector('input[type="email"]')?.value || 'Not provided',
        phone: form.querySelector('input[type="tel"]')?.value || 'Not provided',
        description: form.querySelector('textarea')?.value || 'No description',
        reference_id: refId,
        submission_time: new Date().toLocaleString()
    };
    
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
    }
    
    try {
        if (typeof emailjs === 'undefined') throw new Error('EmailJS not loaded. Please refresh the page.');
        await emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, templateParams, EMAILJS_CONFIG.publicKey);
        
        if (successMessage) {
            successMessage.innerHTML = `✓ Complaint submitted successfully!<br>Reference ID: <strong>${refId}</strong><br>Your complaint has been sent.`;
            successMessage.style.display = 'block';
            successMessage.style.background = 'linear-gradient(135deg, #f0fdf4 0%, #ffffff 100%)';
            successMessage.style.borderColor = '#16a34a';
            successMessage.style.color = '#16a34a';
        }
        
        setTimeout(() => {
            if (successMessage) successMessage.style.display = 'none';
            form.reset();
        }, 5000);
    } catch (error) {
        console.error('EmailJS Error:', error);
        if (successMessage) {
            successMessage.innerHTML = `✗ Failed to send complaint.<br>Error: ${error.text || error.message || 'Network error'}<br>Please try again or email support@marmed.com directly.`;
            successMessage.style.display = 'block';
            successMessage.style.background = 'linear-gradient(135deg, #fef2f2 0%, #ffffff 100%)';
            successMessage.style.borderColor = '#dc2626';
            successMessage.style.color = '#dc2626';
        }
    } finally {
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = '📤 Submit Complaint';
        }
    }
}

// ==========================================
// Crew Records Actions
// ==========================================

function getSelectedCrewMember() {
    const selectedRow = document.querySelector('.data-table tbody tr.selected');
    if (!selectedRow) return null;
    const name = selectedRow.cells[0]?.textContent.trim();
    const crew = utils.load(STORAGE_KEYS.CREW) || [];
    return crew.find(c => c.name === name);
}

function addVisitRecord() {
    if (!getSelectedCrewMember()) {
        utils.showNotification('Please select a crew member first', 'error');
        return;
    }
    window.location.href = 'visit-log.html';
}

function uploadReport() {
    const selectedCrew = getSelectedCrewMember();
    if (!selectedCrew) {
        utils.showNotification('Please select a crew member first', 'error');
        return;
    }
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.jpg,.jpeg,.png';
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const crew = utils.load(STORAGE_KEYS.CREW) || [];
                const crewMember = crew.find(c => c.id === selectedCrew.id);
                if (crewMember) {
                    if (!crewMember.reports) crewMember.reports = [];
                    crewMember.reports.push({
                        filename: file.name,
                        type: file.type,
                        size: file.size,
                        uploaded: new Date().toISOString(),
                        data: event.target.result
                    });
                    utils.save(STORAGE_KEYS.CREW, crew);
                    utils.showNotification('Report uploaded successfully!', 'success');
                }
            };
            reader.readAsDataURL(file);
        }
    };
    input.click();
}

function printSummary() {
    const selectedCrew = getSelectedCrewMember();
    if (!selectedCrew) {
        utils.showNotification('Please select a crew member first', 'error');
        return;
    }
    const visits = utils.load(STORAGE_KEYS.VISITS) || [];
    const crewVisits = visits.filter(v => v.crewName === selectedCrew.name);
    
    const htmlContent = `
        <!DOCTYPE html><html><head><title>Crew Medical Summary - ${selectedCrew.name}</title>
        <style>body { font-family: Arial, sans-serif; padding: 20px; } h1 { color: #003d82; }
        .info-section { margin: 20px 0; } table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #ddd; padding: 12px; text-align: left; } th { background-color: #003d82; color: white; }
        </style></head><body>
        <h1>Crew Medical Summary</h1>
        <div class="info-section">
            <h2>Personal Information</h2>
            <p><strong>Name:</strong> ${selectedCrew.name}</p>
            <p><strong>Rank:</strong> ${selectedCrew.rank}</p>
            <p><strong>Last Visit:</strong> ${selectedCrew.lastVisit}</p>
            <p><strong>Health Status:</strong> ${selectedCrew.healthStatus}</p>
            <p><strong>Vaccination:</strong> ${selectedCrew.vaccination}</p>
        </div>
        <h2>Visit History</h2>
        <table><thead><tr><th>Date</th><th>Complaint</th><th>Diagnosis</th><th>Treatment</th></tr></thead><tbody>
        ${crewVisits.map(v => `<tr><td>${v.date}</td><td>${v.complaint}</td><td>${v.diagnosis}</td><td>${v.treatment}</td></tr>`).join('')}
        </tbody></table></body></html>
    `;
    
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.print();
}

// ==========================================
// Export & Print
// ==========================================

function exportData() {
    const allData = {
        clinicInfo: utils.load(STORAGE_KEYS.CLINIC_INFO) || {},
        crew: utils.load(STORAGE_KEYS.CREW) || [],
        visits: utils.load(STORAGE_KEYS.VISITS) || [],
        emergencies: utils.load(STORAGE_KEYS.EMERGENCIES) || [],
        medicines: utils.load(STORAGE_KEYS.MEDICINES) || [],
        complaints: utils.load(STORAGE_KEYS.COMPLAINTS) || [],
        exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(allData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `marmed_export_${utils.formatDate(new Date())}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    utils.showNotification('Data exported successfully!', 'success');
}

function generateEmergencyPDF() {
    const emergencies = utils.load(STORAGE_KEYS.EMERGENCIES) || [];
    if (emergencies.length === 0) {
        utils.showNotification('No emergency records to export', 'error');
        return;
    }
    
    const htmlContent = `
        <!DOCTYPE html><html><head><title>Emergency Cases Report</title>
        <style>body { font-family: Arial, sans-serif; padding: 20px; } h1 { color: #003d82; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
        th { background-color: #003d82; color: white; } tr:nth-child(even) { background-color: #f2f2f2; }
        </style></head><body>
        <h1>Emergency Cases Report</h1>
        <p>Generated: ${new Date().toLocaleString()}</p>
        <table><thead><tr><th>Date & Time</th><th>Type</th><th>Crew</th><th>Location</th><th>Outcome</th></tr></thead><tbody>
        ${emergencies.map(e => `<tr><td>${e.dateTime}</td><td>${e.type}</td><td>${e.crewName}</td><td>${e.location}</td><td>${e.outcome}</td></tr>`).join('')}
        </tbody></table></body></html>
    `;
    
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.print();
}

// ==========================================
// Settings Tab Navigation
// ==========================================

function openTab(evt, tabName) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    const selectedTab = document.getElementById(tabName);
    if (selectedTab) selectedTab.classList.add('active');
    if (evt && evt.currentTarget) evt.currentTarget.classList.add('active');
}

// ==========================================
// Custom Dropdown Handler
// ==========================================

document.addEventListener('click', function(e) {
    const target = e.target;
    
    // Handle trigger click
    const trigger = target.closest('.custom-select-trigger');
    if (trigger) {
        const wrapper = trigger.closest('.custom-select-wrapper');
        if (wrapper) {
            document.querySelectorAll('.custom-select-wrapper').forEach(w => {
                if (w !== wrapper) w.classList.remove('open');
            });
            wrapper.classList.toggle('open');
            e.stopPropagation();
            return;
        }
    }
    
    // Handle option click
    const option = target.closest('.custom-option');
    if (option) {
        const wrapper = option.closest('.custom-select-wrapper');
        if (wrapper) {
            const trigger = wrapper.querySelector('.custom-select-trigger');
            let hiddenInput = wrapper.querySelector('input[type="hidden"]');
            if (!hiddenInput && wrapper.nextElementSibling?.tagName === 'INPUT' && wrapper.nextElementSibling.type === 'hidden') {
                hiddenInput = wrapper.nextElementSibling;
            }
            
            wrapper.querySelectorAll('.custom-option').forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
            
            const selectedText = option.textContent;
            const triggerSpan = trigger?.querySelector('span');
            if (triggerSpan) {
                triggerSpan.textContent = selectedText;
                triggerSpan.style.color = '#0F172A';
            }
            
            if (hiddenInput) {
                hiddenInput.value = option.dataset.value;
                hiddenInput.dispatchEvent(new Event('change', { bubbles: true }));
                hiddenInput.dispatchEvent(new Event('input', { bubbles: true }));
            }
            
            // Special handling for specific selects
            const wrapperId = wrapper.id;
            if (wrapperId === 'incident-type-select') {
                const incidentInput = document.getElementById('incidentTypeInput');
                if (incidentInput) incidentInput.value = option.dataset.value;
            } else if (wrapperId === 'category-select') {
                const categoryInput = document.getElementById('categoryInput');
                if (categoryInput) categoryInput.value = option.dataset.value;
            } else if (wrapperId === 'priority-select') {
                const priorityInput = document.getElementById('priorityInput');
                if (priorityInput) priorityInput.value = option.dataset.value;
            }
            
            wrapper.classList.remove('open');
            return;
        }
    }
    
    // Close dropdowns on outside click
    if (!target.closest('.custom-select-wrapper')) {
        document.querySelectorAll('.custom-select-wrapper').forEach(w => w.classList.remove('open'));
    }
});

// ==========================================
// Sidebar Toggle
// ==========================================

function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    if (sidebar && overlay) {
        const isActive = sidebar.classList.contains('active');
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
        // Prevent body scroll when sidebar is open on mobile
        if (window.innerWidth <= 768) {
            document.body.style.overflow = isActive ? '' : 'hidden';
        }
    }
}

function closeSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    if (sidebar && overlay) {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        // Restore body scroll
        document.body.style.overflow = '';
    }
}

// ==========================================
// Page Initialization
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('MarMed Onboard Clinic - System Initialized');
    initializeData();
    
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const pageHandlers = {
        'index.html': () => loadDashboard(),
        'crew-records.html': () => {
            loadCrewRecords();
            const actionBtns = document.querySelectorAll('.action-btn');
            if (actionBtns.length >= 3) {
                actionBtns[0].onclick = addVisitRecord;
                actionBtns[1].onclick = uploadReport;
                actionBtns[2].onclick = printSummary;
            }
        },
        'visit-log.html': () => {
            loadVisitLog();
            const visitForm = document.getElementById('visitForm');
            if (visitForm) visitForm.onsubmit = (e) => { e.preventDefault(); saveVisit(); };
        },
        'emergencies.html': () => {
            loadEmergencies();
            const emergencyForm = document.getElementById('emergencyForm');
            if (emergencyForm) emergencyForm.onsubmit = (e) => { e.preventDefault(); saveEmergency(e); };
            const pdfBtn = document.querySelector('.pdf-btn');
            if (pdfBtn) pdfBtn.onclick = generateEmergencyPDF;
        },
        'medicine-inventory.html': () => {
            loadMedicineInventory();
            const addBtn = document.querySelector('.add-btn');
            if (addBtn) addBtn.onclick = () => openMedicineModal();
        },
        'analytics.html': () => loadAnalytics(),
        'settings.html': () => {
            loadSettings();
            const clinicForm = document.querySelector('#clinicInfo form');
            if (clinicForm) clinicForm.onsubmit = (e) => { e.preventDefault(); saveClinicInfo(e); };
            if (typeof emailjs !== 'undefined') emailjs.init(EMAILJS_CONFIG.publicKey);
        }
    };
    
    if (pageHandlers[currentPage]) pageHandlers[currentPage]();
    
    // Search functionality
    document.querySelectorAll('.search-bar').forEach(searchBar => {
        searchBar.addEventListener('input', function() {
            const table = this.nextElementSibling?.querySelector('table');
            if (table) utils.searchTable(this, table);
        });
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close sidebar if open on mobile
            if (window.innerWidth <= 768) {
                const sidebar = document.querySelector('.sidebar');
                if (sidebar && sidebar.classList.contains('active')) {
                    closeSidebar();
                    return;
                }
            }
            // Close modals
            document.querySelectorAll('.modal').forEach(modal => {
                if (modal.style.display === 'block') modal.style.display = 'none';
            });
            closeModal();
            closeMedicineModal();
        }
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
            e.preventDefault();
            const activeForm = document.activeElement.closest('form');
            if (activeForm) activeForm.dispatchEvent(new Event('submit'));
        }
    });
    
    // Highlight current page in navigation
    document.querySelectorAll('.sidebar nav a').forEach(link => {
        if (link.getAttribute('href') === currentPage) link.classList.add('active');
    });
    
    // Sidebar interactions
    document.addEventListener('click', function(e) {
        if (e.target.closest('.hamburger-btn')) {
            toggleSidebar();
            e.stopPropagation();
        } else if (e.target.closest('.sidebar-close') || e.target.closest('.sidebar-overlay')) {
            closeSidebar();
        } else if (window.innerWidth <= 768 && e.target.closest('.sidebar a')) {
            closeSidebar();
        }
    });
    
    // Handle window resize - close sidebar and restore scroll on desktop
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if (window.innerWidth > 768) {
                closeSidebar();
            }
        }, 250);
    });
    
    // Modal close on outside click
    window.onclick = function(event) {
        if (event.target.id === 'visitModal') closeModal();
        if (event.target.id === 'medicineModal') closeMedicineModal();
    };
});
