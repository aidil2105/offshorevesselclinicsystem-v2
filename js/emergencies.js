/* ==========================================
   MarMed Onboard Clinic - Emergencies Page
   ========================================== */

function loadEmergencies() {
    const emergencies = (utils.load(STORAGE_KEYS.EMERGENCIES) || []).sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
    loadTable(emergencies, ['dateTime', 'type', 'crewName', 'location', 'outcome']);
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

// Initialize emergencies page
document.addEventListener('DOMContentLoaded', function () {
    if (window.location.pathname.split('/').pop() === 'emergencies.html') {
        loadEmergencies();
        const emergencyForm = document.getElementById('emergencyForm');
        if (emergencyForm) emergencyForm.onsubmit = (e) => { e.preventDefault(); saveEmergency(e); };
        const pdfBtn = document.querySelector('.pdf-btn');
        if (pdfBtn) pdfBtn.onclick = generateEmergencyPDF;
    }
});

