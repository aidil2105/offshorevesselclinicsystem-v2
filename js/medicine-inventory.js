/* ==========================================
   MarMed Onboard Clinic - Medicine Inventory Page
   ========================================== */

function loadMedicineInventory() {
    applyMedicineFilters();
}

function applyMedicineFilters() {
    const medicines = utils.load(STORAGE_KEYS.MEDICINES) || [];
    
    // Get filter values - find dropdowns by their trigger text
    const stockWrapper = Array.from(document.querySelectorAll('.custom-select-wrapper')).find(w => {
        const span = w.querySelector('.custom-select-trigger span');
        return span && (span.textContent.includes('Stock Levels') || span.textContent.includes('All Stock'));
    });
    const expiryWrapper = Array.from(document.querySelectorAll('.custom-select-wrapper')).find(w => {
        const span = w.querySelector('.custom-select-trigger span');
        return span && (span.textContent.includes('Expiry') || span.textContent.includes('All Expiry'));
    });
    const categoryWrapper = Array.from(document.querySelectorAll('.custom-select-wrapper')).find(w => {
        const span = w.querySelector('.custom-select-trigger span');
        return span && (span.textContent.includes('Categories') || span.textContent.includes('All Categories'));
    });
    
    const stockFilter = stockWrapper?.querySelector('input[type="hidden"]')?.value || 'All Stock Levels';
    const expiryFilter = expiryWrapper?.querySelector('input[type="hidden"]')?.value || 'All Expiry Dates';
    const categoryFilter = categoryWrapper?.querySelector('input[type="hidden"]')?.value || 'All Categories';
    
    // Filter medicines
    let filteredMedicines = medicines;
    
    // Filter by stock level
    if (stockFilter !== 'All Stock Levels') {
        if (stockFilter === 'Critical (Below 10)') {
            filteredMedicines = filteredMedicines.filter(m => m.stock < 10);
        } else if (stockFilter === 'Low (10-25)') {
            filteredMedicines = filteredMedicines.filter(m => m.stock >= 10 && m.stock <= 25);
        } else if (stockFilter === 'Good (Above 25)') {
            filteredMedicines = filteredMedicines.filter(m => m.stock > 25);
        }
    }
    
    // Filter by expiry date
    if (expiryFilter !== 'All Expiry Dates') {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const thirtyDaysFromNow = new Date(today);
        thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
        
        filteredMedicines = filteredMedicines.filter(m => {
            const expiryDate = new Date(m.expiry);
            expiryDate.setHours(0, 0, 0, 0);
            
            if (expiryFilter === 'Expired') {
                return expiryDate < today;
            } else if (expiryFilter === 'Expiring Soon (30 days)') {
                return expiryDate >= today && expiryDate <= thirtyDaysFromNow;
            } else if (expiryFilter === 'Valid') {
                return expiryDate > thirtyDaysFromNow;
            }
            return true;
        });
    }
    
    // Filter by category
    if (categoryFilter !== 'All Categories') {
        filteredMedicines = filteredMedicines.filter(m => m.category === categoryFilter);
    }
    
    loadTable(filteredMedicines, [
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
            <button class="edit-btn" onclick="openMedicineModal('${m.id}')">Edit</button>
            <button class="delete-btn" onclick="deleteMedicine('${m.id}')">Delete</button>
        </td>`
    ]);
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
    applyMedicineFilters();
}

function deleteMedicine(medicineId) {
    if (!confirm('Are you sure you want to delete this medicine?')) return;
    const medicines = utils.load(STORAGE_KEYS.MEDICINES) || [];
    utils.save(STORAGE_KEYS.MEDICINES, medicines.filter(m => m.id !== medicineId));
    utils.showNotification('Medicine deleted successfully!', 'success');
    applyMedicineFilters();
}

// Initialize medicine inventory page
document.addEventListener('DOMContentLoaded', function () {
    if (window.location.pathname.split('/').pop() === 'medicine-inventory.html') {
        loadMedicineInventory();
        const addBtn = document.querySelector('.add-btn');
        if (addBtn) addBtn.onclick = () => openMedicineModal();
        
        // Add event listeners for filter dropdowns
        const filterInputs = document.querySelectorAll('.custom-select-wrapper input[type="hidden"]');
        filterInputs.forEach(input => {
            input.addEventListener('change', applyMedicineFilters);
            input.addEventListener('input', applyMedicineFilters);
        });
    }

    // Modal close on outside click
    window.onclick = function (event) {
        if (event.target.id === 'medicineModal') closeMedicineModal();
    };
});

