/* ==========================================
   MarMed Onboard Clinic - Settings Page
   ========================================== */

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

function openTab(evt, tabName) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    const selectedTab = document.getElementById(tabName);
    if (selectedTab) selectedTab.classList.add('active');
    if (evt && evt.currentTarget) evt.currentTarget.classList.add('active');
}

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

// Initialize settings page
document.addEventListener('DOMContentLoaded', function () {
    if (window.location.pathname.split('/').pop() === 'settings.html') {
        loadSettings();
        const clinicForm = document.querySelector('#clinicInfo form');
        if (clinicForm) clinicForm.onsubmit = (e) => { e.preventDefault(); saveClinicInfo(e); };
        if (typeof emailjs !== 'undefined') emailjs.init(EMAILJS_CONFIG.publicKey);
    }
});

