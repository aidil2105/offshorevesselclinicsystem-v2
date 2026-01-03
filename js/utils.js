/* ==========================================
   MarMed Onboard Clinic - Shared Utilities
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
        [STORAGE_KEYS.CREW]: (() => {
            // Generate dates between Dec 29, 2025 and Jan 4, 2026 for crew lastVisit
            const formatDate = (date) => {
                const d = new Date(date);
                return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
            };
            const startDate = new Date('2025-12-29');
            const dates = [];
            for (let i = 0; i < 7; i++) {
                const date = new Date(startDate);
                date.setDate(date.getDate() + i); // Spread from Dec 29 to Jan 4
                dates.push(formatDate(date));
            }
            return [
                { id: '1', name: 'James Anderson', rank: 'Captain', lastVisit: dates[0], healthStatus: 'Fit for Duty', vaccination: 'Current', medicalHistory: [], vaccinationRecord: [] },
                { id: '2', name: 'Maria Santos', rank: 'Chief Engineer', lastVisit: dates[1], healthStatus: 'Fit for Duty', vaccination: 'Current', medicalHistory: [], vaccinationRecord: [] },
                { id: '3', name: 'David Kim', rank: 'First Mate', lastVisit: dates[2], healthStatus: 'Under Observation', vaccination: 'Current', medicalHistory: [], vaccinationRecord: [] },
                { id: '4', name: 'Sarah Thompson', rank: 'Second Engineer', lastVisit: dates[3], healthStatus: 'Fit for Duty', vaccination: 'Due Soon', medicalHistory: [], vaccinationRecord: [] },
                { id: '5', name: 'Mohammed Ali', rank: 'Deck Officer', lastVisit: dates[4], healthStatus: 'Fit for Duty', vaccination: 'Current', medicalHistory: [], vaccinationRecord: [] },
                { id: '6', name: 'Elena Rodriguez', rank: 'Cook', lastVisit: dates[5], healthStatus: 'Fit for Duty', vaccination: 'Current', medicalHistory: [], vaccinationRecord: [] },
                { id: '7', name: 'John Peterson', rank: 'AB Seaman', lastVisit: dates[6], healthStatus: 'Fit for Duty', vaccination: 'Current', medicalHistory: [], vaccinationRecord: [] }
            ];
        })(),
        [STORAGE_KEYS.VISITS]: (() => {
            // Generate random distribution of visits between Dec 29, 2025 and Jan 4, 2026
            const formatDate = (date) => {
                const d = new Date(date);
                return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
            };
            
            const startDate = new Date('2025-12-29');
            const crewNames = ['James Anderson', 'Maria Santos', 'David Kim', 'Sarah Thompson', 'Mohammed Ali', 'Elena Rodriguez', 'John Peterson'];
            const complaints = [
                { complaint: 'Headache, Nausea', diagnosis: 'Seasickness', treatment: 'Antiemetic medication', medic: 'Dr. Smith', condition: 'Illness' },
                { complaint: 'Minor hand laceration', diagnosis: 'Superficial wound', treatment: 'Wound cleaning, bandaging', medic: 'Dr. Johnson', condition: 'Injury' },
                { complaint: 'Cough, Fever', diagnosis: 'Upper respiratory infection', treatment: 'Antibiotics, rest', medic: 'Dr. Smith', condition: 'Illness' },
                { complaint: 'Back pain', diagnosis: 'Muscle strain', treatment: 'Pain relief, physiotherapy', medic: 'Dr. Johnson', condition: 'Injury' },
                { complaint: 'Routine check-up', diagnosis: 'Healthy', treatment: 'No treatment needed', medic: 'Dr. Smith', condition: 'Check-up' },
                { complaint: 'Skin rash', diagnosis: 'Contact dermatitis', treatment: 'Topical cream', medic: 'Dr. Johnson', condition: 'Illness' },
                { complaint: 'Eye irritation', diagnosis: 'Foreign body in eye', treatment: 'Eye wash, antibiotic drops', medic: 'Dr. Smith', condition: 'Injury' },
                { complaint: 'Dizziness', diagnosis: 'Dehydration', treatment: 'Fluid replacement, rest', medic: 'Dr. Johnson', condition: 'Illness' },
                { complaint: 'Ankle sprain', diagnosis: 'Ligament strain', treatment: 'RICE protocol, support bandage', medic: 'Dr. Smith', condition: 'Injury' },
                { complaint: 'Insomnia', diagnosis: 'Sleep disturbance', treatment: 'Sleep hygiene advice', medic: 'Dr. Johnson', condition: 'Check-up' },
                { complaint: 'Sore throat', diagnosis: 'Pharyngitis', treatment: 'Throat lozenges, hydration', medic: 'Dr. Smith', condition: 'Illness' },
                { complaint: 'Minor burn', diagnosis: 'First degree burn', treatment: 'Cooling, aloe vera', medic: 'Dr. Johnson', condition: 'Injury' }
            ];
            
            // Generate 12-15 visits randomly distributed across the 7 days
            const totalVisits = 12 + Math.floor(Math.random() * 4); // 12-15 visits
            const visits = [];
            
            for (let i = 0; i < totalVisits; i++) {
                // Random day (0-6 for Dec 29 to Jan 4)
                const dayOffset = Math.floor(Math.random() * 7);
                const date = new Date(startDate);
                date.setDate(date.getDate() + dayOffset);
                
                // Random crew member
                const crewName = crewNames[Math.floor(Math.random() * crewNames.length)];
                
                // Random complaint
                const complaintData = complaints[Math.floor(Math.random() * complaints.length)];
                
                visits.push({
                    id: String(i + 1),
                    date: formatDate(date),
                    crewName: crewName,
                    complaint: complaintData.complaint,
                    diagnosis: complaintData.diagnosis,
                    treatment: complaintData.treatment,
                    medic: complaintData.medic,
                    remarks: '',
                    condition: complaintData.condition
                });
            }
            
            // Sort by date to keep them organized
            visits.sort((a, b) => {
                const dateA = new Date(a.date + 'T00:00:00');
                const dateB = new Date(b.date + 'T00:00:00');
                return dateA - dateB;
            });
            
            // Reassign IDs sequentially
            visits.forEach((visit, index) => {
                visit.id = String(index + 1);
            });
            
            return visits;
        })(),
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
// Update Visit Log Dates to Recent Dates
// ==========================================

function updateVisitLogDates() {
    const visits = utils.load(STORAGE_KEYS.VISITS) || [];
    if (visits.length === 0) return;

    const startDate = new Date('2025-12-29');
    const endDate = new Date('2026-01-04');
    let updated = false;

    // Check if any visit date is outside the range Dec 29, 2025 - Jan 4, 2026
    visits.forEach((visit, index) => {
        if (!visit.date) return;
        
        const visitDate = new Date(visit.date + 'T00:00:00');
        
        // Update if date is outside the target range
        if (visitDate < startDate || visitDate > endDate) {
            // Spread dates from Dec 29, 2025 to Jan 4, 2026
            const newDate = new Date(startDate);
            newDate.setDate(newDate.getDate() + (index % 7)); // Distribute over 7 days
            visit.date = utils.formatDate(newDate);
            updated = true;
        }
    });

    if (updated) {
        utils.save(STORAGE_KEYS.VISITS, visits);
        
        // Also update crew lastVisit dates if they match old visit dates
        const crew = utils.load(STORAGE_KEYS.CREW) || [];
        crew.forEach(crewMember => {
            const memberVisits = visits.filter(v => v.crewName === crewMember.name);
            if (memberVisits.length > 0) {
                // Update to most recent visit date for this crew member
                const mostRecentVisit = memberVisits.sort((a, b) => 
                    new Date(b.date + 'T00:00:00') - new Date(a.date + 'T00:00:00')
                )[0];
                if (mostRecentVisit) {
                    crewMember.lastVisit = mostRecentVisit.date;
                }
            }
        });
        utils.save(STORAGE_KEYS.CREW, crew);
    }
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
// Sidebar Functions
// ==========================================

function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    if (sidebar && overlay) {
        const isActive = sidebar.classList.contains('active');
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
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
        document.body.style.overflow = '';
    }
}

// ==========================================
// Custom Dropdown Handler
// ==========================================

document.addEventListener('click', function (e) {
    const target = e.target;

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

    if (!target.closest('.custom-select-wrapper')) {
        document.querySelectorAll('.custom-select-wrapper').forEach(w => w.classList.remove('open'));
    }
});

// ==========================================
// Common Initialization
// ==========================================

document.addEventListener('DOMContentLoaded', function () {
    console.log('MarMed Onboard Clinic - System Initialized');
    initializeData();
    updateVisitLogDates(); // Update visit log dates to recent dates for graphs

    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    // Search functionality
    document.querySelectorAll('.search-bar').forEach(searchBar => {
        searchBar.addEventListener('input', function () {
            const table = this.nextElementSibling?.querySelector('table');
            if (table) utils.searchTable(this, table);
        });
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            if (window.innerWidth <= 768) {
                const sidebar = document.querySelector('.sidebar');
                if (sidebar && sidebar.classList.contains('active')) {
                    closeSidebar();
                    return;
                }
            }
            document.querySelectorAll('.modal').forEach(modal => {
                if (modal.style.display === 'block') modal.style.display = 'none';
            });
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
    document.addEventListener('click', function (e) {
        if (e.target.closest('.hamburger-btn')) {
            toggleSidebar();
            e.stopPropagation();
        } else if (e.target.closest('.sidebar-close') || e.target.closest('.sidebar-overlay')) {
            closeSidebar();
        } else if (window.innerWidth <= 768 && e.target.closest('.sidebar a')) {
            closeSidebar();
        }
    });

    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
            if (window.innerWidth > 768) {
                closeSidebar();
            }
        }, 250);
    });
});

