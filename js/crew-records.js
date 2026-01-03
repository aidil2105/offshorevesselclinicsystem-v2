/* ==========================================
   MarMed Onboard Clinic - Crew Records Page
   ========================================== */

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
    input.onchange = function (e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (event) {
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

// Initialize crew records page
document.addEventListener('DOMContentLoaded', function () {
    if (window.location.pathname.split('/').pop() === 'crew-records.html') {
        loadCrewRecords();
        const actionBtns = document.querySelectorAll('.action-btn');
        if (actionBtns.length >= 3) {
            actionBtns[0].onclick = addVisitRecord;
            actionBtns[1].onclick = uploadReport;
            actionBtns[2].onclick = printSummary;
        }
    }
});

