/* ==========================================
   MarMed Onboard Clinic - Visit Log Page
   ========================================== */

function loadVisitLog() {
    const visits = utils.load(STORAGE_KEYS.VISITS) || [];
    loadTable(visits, ['date', 'crewName', 'complaint', 'diagnosis', 'treatment', 'medic']);
}

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

// Initialize visit log page
document.addEventListener('DOMContentLoaded', function () {
    if (window.location.pathname.split('/').pop() === 'visit-log.html') {
        loadVisitLog();
        const visitForm = document.getElementById('visitForm');
        if (visitForm) visitForm.onsubmit = (e) => { e.preventDefault(); saveVisit(); };
    }

    // Modal close on outside click
    window.onclick = function (event) {
        if (event.target.id === 'visitModal') closeModal();
    };
});

