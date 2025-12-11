/* ==========================================
   MarMed Onboard Clinic - JavaScript Functions
   ========================================== */

// ==========================================
// EmailJS Configuration - PASTE YOUR KEYS HERE
// ==========================================

const EMAILJS_CONFIG = {
    publicKey: 'LLCfs0h1qsRUJpEXN',      // Replace with your EmailJS Public Key
    serviceId: 'service_eyh110o',      // Replace with your EmailJS Service ID
    templateId: 'template_qk93xzu'     // Replace with your EmailJS Template ID
};

// ==========================================
// Visit Log Modal Functions
// ==========================================

function openModal() {
    const modal = document.getElementById('visitModal');
    if (modal) {
        modal.style.display = 'block';
    }
}

function closeModal() {
    const modal = document.getElementById('visitModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function saveVisit() {
    alert('Visit record saved successfully!');
    closeModal();
}

// Close modal when clicking outside of it
window.onclick = function (event) {
    const modal = document.getElementById('visitModal');
    if (modal && event.target == modal) {
        closeModal();
    }
}

// ==========================================
// Settings Page - Tab Navigation
// ==========================================

function openTab(evt, tabName) {
    // Hide all tab contents
    const tabContents = document.getElementsByClassName('tab-content');
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].classList.remove('active');
    }

    // Remove active class from all tabs
    const tabs = document.getElementsByClassName('tab');
    for (let i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove('active');
    }

    // Show the selected tab content and mark tab as active
    const selectedTab = document.getElementById(tabName);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }

    if (evt && evt.currentTarget) {
        evt.currentTarget.classList.add('active');
    }
}

// ==========================================
// Settings Page - Complaint Form Submission
// ==========================================

async function submitComplaint(event) {
    event.preventDefault();
    const form = event.target;
    const submitBtn = form.querySelector('.submit-btn');
    const successMessage = document.getElementById('successMessage');

    // Generate reference ID
    const refId = 'COMP-' + Math.floor(1000 + Math.random() * 9000);

    // Get form data from inputs
    const category = document.getElementById('categoryInput')?.value || form.querySelector('select')?.value || 'Not specified';
    const priority = document.getElementById('priorityInput')?.value || form.querySelector('select:nth-of-type(2)')?.value || 'Not specified';
    const subject = form.querySelector('input[type="text"]')?.value || 'No subject';
    const incidentDate = form.querySelector('input[type="date"]')?.value || 'Not specified';
    const fromEmail = form.querySelector('input[type="email"]')?.value || 'Not provided';
    const phone = form.querySelector('input[type="tel"]')?.value || 'Not provided';
    const description = form.querySelector('textarea')?.value || 'No description';

    const templateParams = {
        category: category,
        priority: priority,
        subject: subject,
        incident_date: incidentDate,
        from_email: fromEmail,
        phone: phone,
        description: description,
        reference_id: refId,
        submission_time: new Date().toLocaleString()
    };

    // Show loading state
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
    }

    try {
        // Check if EmailJS is loaded
        if (typeof emailjs === 'undefined') {
            throw new Error('EmailJS not loaded. Please refresh the page.');
        }

        // Send email via EmailJS
        await emailjs.send(
            EMAILJS_CONFIG.serviceId,
            EMAILJS_CONFIG.templateId,
            templateParams,
            EMAILJS_CONFIG.publicKey
        );

        // Show success message
        if (successMessage) {
            successMessage.innerHTML = `✓ Complaint submitted successfully!<br>Reference ID: <strong>${refId}</strong><br>Your complaint has been sent.`;
            successMessage.style.display = 'block';
            successMessage.style.background = 'linear-gradient(135deg, #f0fdf4 0%, #ffffff 100%)';
            successMessage.style.borderColor = '#16a34a';
            successMessage.style.color = '#16a34a';
        }

        // Reset form after delay
        setTimeout(function () {
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
        // Restore button
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = '📤 Submit Complaint';
        }
    }
}

// ==========================================
// Settings Page - Data Export
// ==========================================

function exportData() {
    alert('Exporting all clinic data...\n\nData export will be downloaded as a CSV file for backup and compliance purposes.');
}

// ==========================================
// Emergency Page - PDF Generation
// ==========================================

function generateEmergencyPDF() {
    alert('Generating PDF Report...');
}

// ==========================================
// Medicine Inventory - Add New Medicine
// ==========================================

function addNewMedicine() {
    alert('Opening form to add new medicine to inventory...');
}

// ==========================================
// Crew Records - Action Buttons
// ==========================================

function addVisitRecord() {
    alert('Opening form to add visit record for selected crew member...');
}

function uploadReport() {
    alert('Opening file upload dialog for medical report...');
}

function printSummary() {
    window.print();
}

// ==========================================
// Dashboard - Quick Action Navigation
// ==========================================

function navigateToVisitLog() {
    window.location.href = 'visit-log.html';
}

function navigateToEmergencies() {
    window.location.href = 'emergencies.html';
}

// ==========================================
// Table Row Click Handlers
// ==========================================

function selectCrewMember(row) {
    // Remove selection from all rows
    const rows = document.querySelectorAll('.data-table tbody tr');
    rows.forEach(r => r.classList.remove('selected'));

    // Add selection to clicked row
    if (row) {
        row.classList.add('selected');
    }
}

// ==========================================
// Form Validation Helper
// ==========================================

function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return false;

    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#dc2626';

            // Handle custom dropdown validation styling
            if (input.type === 'hidden' && input.previousElementSibling && input.previousElementSibling.classList.contains('custom-select-wrapper')) {
                const trigger = input.previousElementSibling.querySelector('.custom-select-trigger');
                if (trigger) trigger.style.borderColor = '#dc2626';
            }

            isValid = false;
        } else {
            input.style.borderColor = '#00a3e0'; // Or var(--border-color) if available via JS, but sticking to hardcoded for now to match existing style

            // Handle custom dropdown validation styling (reset)
            if (input.type === 'hidden' && input.previousElementSibling && input.previousElementSibling.classList.contains('custom-select-wrapper')) {
                const trigger = input.previousElementSibling.querySelector('.custom-select-trigger');
                if (trigger) trigger.style.borderColor = ''; // Reset to CSS default
            }
        }
    });

    return isValid;
}

// ==========================================
// Search Functionality
// ==========================================

function searchTable(inputId, tableId) {
    const input = document.getElementById(inputId);
    const table = document.getElementById(tableId);

    if (!input || !table) return;

    const filter = input.value.toUpperCase();
    const rows = table.getElementsByTagName('tr');

    for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        const cells = row.getElementsByTagName('td');
        let found = false;

        for (let j = 0; j < cells.length; j++) {
            const cell = cells[j];
            if (cell) {
                const textValue = cell.textContent || cell.innerText;
                if (textValue.toUpperCase().indexOf(filter) > -1) {
                    found = true;
                    break;
                }
            }
        }

        row.style.display = found ? '' : 'none';
    }
}

// ==========================================
// Filter Table by Select Dropdown
// ==========================================

function filterTable(selectId, tableId, columnIndex) {
    const select = document.getElementById(selectId);
    const table = document.getElementById(tableId);

    if (!select || !table) return;

    const filter = select.value.toUpperCase();
    const rows = table.getElementsByTagName('tr');

    for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        const cell = row.getElementsByTagName('td')[columnIndex];

        if (cell) {
            const textValue = cell.textContent || cell.innerText;
            if (filter === '' || filter === 'ALL' || textValue.toUpperCase().indexOf(filter) > -1) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        }
    }
}

// ==========================================
// Date/Time Utilities
// ==========================================

function formatDate(date) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function formatDateTime(date) {
    const d = new Date(date);
    const dateStr = formatDate(d);
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    return `${dateStr} ${hours}:${minutes}`;
}

// ==========================================
// Notification System
// ==========================================

function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 20px 30px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)' : 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)'};
        color: white;
        border-radius: 12px;
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        font-weight: 600;
    `;
    notification.textContent = message;

    // Add to document
    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ==========================================
// Local Storage Utilities
// ==========================================

function saveToLocalStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (e) {
        console.error('Error saving to localStorage:', e);
        return false;
    }
}

function loadFromLocalStorage(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (e) {
        console.error('Error loading from localStorage:', e);
        return null;
    }
}

function removeFromLocalStorage(key) {
    try {
        localStorage.removeItem(key);
        return true;
    } catch (e) {
        console.error('Error removing from localStorage:', e);
        return false;
    }
}

// ==========================================
// Initialize on Page Load
// ==========================================

document.addEventListener('DOMContentLoaded', function () {
    console.log('MarMed Onboard Clinic - System Initialized');

    // Add search functionality to search bars
    const searchBars = document.querySelectorAll('.search-bar');
    searchBars.forEach(searchBar => {
        searchBar.addEventListener('input', function () {
            const tableContainer = this.nextElementSibling;
            if (tableContainer) {
                const table = tableContainer.querySelector('table');
                if (table) {
                    const filter = this.value.toUpperCase();
                    const rows = table.getElementsByTagName('tr');

                    for (let i = 1; i < rows.length; i++) {
                        const row = rows[i];
                        const cells = row.getElementsByTagName('td');
                        let found = false;

                        for (let j = 0; j < cells.length; j++) {
                            const cell = cells[j];
                            if (cell) {
                                const textValue = cell.textContent || cell.innerText;
                                if (textValue.toUpperCase().indexOf(filter) > -1) {
                                    found = true;
                                    break;
                                }
                            }
                        }

                        row.style.display = found ? '' : 'none';
                    }
                }
            }
        });
    });

    // Add keyboard shortcuts
    document.addEventListener('keydown', function (e) {
        // Escape key closes modals
        if (e.key === 'Escape') {
            const modal = document.getElementById('visitModal');
            if (modal && modal.style.display === 'block') {
                closeModal();
            }
        }

        // Ctrl/Cmd + S to save forms
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
            e.preventDefault();
            const activeForm = document.activeElement.closest('form');
            if (activeForm) {
                activeForm.dispatchEvent(new Event('submit'));
            }
        }
    });

    // Highlight current page in navigation
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.sidebar nav a');
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });
});

// ==========================================
// Print Functionality
// ==========================================

function printPage() {
    window.print();
}

function printTable(tableId) {
    const table = document.getElementById(tableId);
    if (!table) return;

    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write('<html><head><title>Print</title>');
    printWindow.document.write('<style>');
    printWindow.document.write('body { font-family: Arial, sans-serif; }');
    printWindow.document.write('table { border-collapse: collapse; width: 100%; }');
    printWindow.document.write('th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }');
    printWindow.document.write('th { background-color: #003d82; color: white; }');
    printWindow.document.write('</style>');
    printWindow.document.write('</head><body>');
    printWindow.document.write(table.outerHTML);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
}

// ==========================================
// Export to CSV
// ==========================================

function exportTableToCSV(tableId, filename) {
    const table = document.getElementById(tableId);
    if (!table) return;

    let csv = [];
    const rows = table.querySelectorAll('tr');

    rows.forEach(row => {
        const cols = row.querySelectorAll('td, th');
        const csvRow = [];
        cols.forEach(col => {
            csvRow.push('"' + col.textContent.trim() + '"');
        });
        csv.push(csvRow.join(','));
    });

    const csvContent = csv.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', filename || 'export.csv');
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// ==========================================
// Confirmation Dialog
// ==========================================

function confirmAction(message, callback) {
    if (confirm(message)) {
        if (typeof callback === 'function') {
            callback();
        }
        return true;
    }
    return false;
}

// ==========================================
// Auto-save Draft Functionality
// ==========================================

function enableAutoSave(formId, storageKey) {
    const form = document.getElementById(formId);
    if (!form) return;

    // Load saved draft
    const savedData = loadFromLocalStorage(storageKey);
    if (savedData) {
        Object.keys(savedData).forEach(key => {
            const input = form.elements[key];
            if (input) {
                input.value = savedData[key];
            }
        });
    }

    // Save on input change
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', function () {
            const formData = {};
            inputs.forEach(inp => {
                if (inp.name) {
                    formData[inp.name] = inp.value;
                }
            });
            saveToLocalStorage(storageKey, formData);
        });
    });

    // Clear draft on successful submit
    form.addEventListener('submit', function () {
        removeFromLocalStorage(storageKey);
    });
}

// ==========================================
// Custom Dropdown Initialization (Event Delegation)
// ==========================================

// Use event delegation to handle clicks for all custom dropdowns, 
// ensuring it works regardless of when the elements are loaded.
document.addEventListener('click', function (e) {
    const target = e.target;

    // 1. Handle Trigger Click
    const trigger = target.closest('.custom-select-trigger');
    if (trigger) {
        const wrapper = trigger.closest('.custom-select-wrapper');
        if (wrapper) {
            // Close all other dropdowns
            document.querySelectorAll('.custom-select-wrapper').forEach(w => {
                if (w !== wrapper) w.classList.remove('open');
            });

            // Toggle current
            wrapper.classList.toggle('open');
            e.stopPropagation(); // Prevent immediate closing by the document listener
            return;
        }
    }

    // 2. Handle Option Click
    const option = target.closest('.custom-option');
    if (option) {
        const wrapper = option.closest('.custom-select-wrapper');
        if (wrapper) {
            const trigger = wrapper.querySelector('.custom-select-trigger');

            // Find hidden input (inside or next sibling)
            let hiddenInput = wrapper.querySelector('input[type="hidden"]');
            if (!hiddenInput && wrapper.nextElementSibling && wrapper.nextElementSibling.tagName === 'INPUT' && wrapper.nextElementSibling.type === 'hidden') {
                hiddenInput = wrapper.nextElementSibling;
            }

            // Remove selected class from sibling options
            wrapper.querySelectorAll('.custom-option').forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');

            // Update trigger text
            const selectedText = option.textContent;
            const triggerSpan = trigger.querySelector('span');
            if (triggerSpan) {
                triggerSpan.textContent = selectedText;
                triggerSpan.style.color = '#0F172A'; // Set text color to main
            }

            // Update hidden input
            if (hiddenInput) {
                hiddenInput.value = option.dataset.value;
                hiddenInput.dispatchEvent(new Event('change', { bubbles: true }));
                hiddenInput.dispatchEvent(new Event('input', { bubbles: true }));
            }

            // Close dropdown
            wrapper.classList.remove('open');
            return;
        }
    }

    // 3. Handle Click Outside
    // If we clicked anywhere else (not a trigger, not an option), close all dropdowns
    if (!target.closest('.custom-select-wrapper')) {
        document.querySelectorAll('.custom-select-wrapper').forEach(w => {
            w.classList.remove('open');
        });
    }
});