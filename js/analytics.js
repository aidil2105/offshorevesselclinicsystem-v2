/* ==========================================
   MarMed Onboard Clinic - Analytics Page
   ========================================== */

function loadAnalytics() {
    const visits = utils.load(STORAGE_KEYS.VISITS) || [];
    const medicines = utils.load(STORAGE_KEYS.MEDICINES) || [];
    const emergencies = utils.load(STORAGE_KEYS.EMERGENCIES) || [];

    // Color palette for charts
    const chartColors = [
        '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6',
        '#EC4899', '#06B6D4', '#84CC16', '#F97316', '#6366F1'
    ];

    // Chart 1: Common Conditions (Horizontal Bar Chart)
    const conditions = {};
    visits.forEach(v => {
        const condition = v.condition || 'Other';
        conditions[condition] = (conditions[condition] || 0) + 1;
    });

    const conditionsChart = document.querySelector('.chart-card:first-child .chart-placeholder');
    if (conditionsChart) {
        let sortedConditions = Object.entries(conditions).sort((a, b) => b[1] - a[1]).slice(0, 5);
        if (sortedConditions.length === 0) {
            sortedConditions = [['Illness', 3], ['Injury', 3], ['Check-up', 1]];
        }
        const maxCount = Math.max(...sortedConditions.map(c => c[1]), 1);

        conditionsChart.innerHTML = `
            <div style="padding: 24px; width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: center;">
                ${sortedConditions.map(([condition, count], idx) => {
            const barWidth = count > 0 ? Math.max(20, (count / maxCount) * 100) : 0;
            const color = chartColors[idx % chartColors.length];
            return `
                    <div style="display: flex; align-items: center; margin-bottom: 18px;">
                        <span style="flex: 0 0 90px; font-size: 0.9rem; color: #1E3A8A; font-weight: 600;">${condition}</span>
                        <div style="flex: 1; display: flex; align-items: center; gap: 12px;">
                            <div style="flex: 1; height: 28px; background: #E5E7EB; border-radius: 8px; overflow: hidden;">
                                <div style="width: ${barWidth}%; height: 100%; background: linear-gradient(90deg, ${color}, ${color}cc); border-radius: 8px; animation: barGrow 0.8s ease-out;"></div>
                            </div>
                            <span style="flex: 0 0 35px; font-weight: 700; color: ${color}; font-size: 1.2rem; text-align: right;">${count}</span>
                        </div>
                    </div>
                `;
        }).join('')}
            </div>
            <style>
                @keyframes barGrow { from { width: 0%; } }
            </style>
        `;
    }

    // Chart 2: Weekly Visits (Vertical Bar Chart with Gradient)
    const weeklyChart = document.querySelectorAll('.chart-card')[1]?.querySelector('.chart-placeholder');
    if (weeklyChart) {
        const weekData = [];
        
        // Get the most recent week from visit data, or use current week
        let startDate = new Date();
        if (visits.length > 0) {
            // Find the most recent visit date
            const visitDates = visits.map(v => new Date(v.date + 'T00:00:00')).sort((a, b) => b - a);
            if (visitDates.length > 0) {
                startDate = visitDates[0];
            }
        }
        
        // Get last 7 days starting from the most recent date
        for (let i = 6; i >= 0; i--) {
            const date = new Date(startDate);
            date.setDate(date.getDate() - i);
            const dateStr = utils.formatDate(date);
            // Normalize date strings for comparison (remove time component if any)
            const count = visits.filter(v => {
                const visitDate = v.date ? v.date.split('T')[0] : '';
                return visitDate === dateStr;
            }).length;
            const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
            weekData.push({ day: dayName, date: date.getDate(), count });
        }

        const maxCount = Math.max(...weekData.map(w => w.count), 1);
        const chartHeight = 140;
        // Use 85% of chart height as max to leave some headroom, and add padding for single values
        const maxBarHeight = chartHeight * 0.85;
        // When maxCount is 1, use a smaller scale so single visits look proportional
        const scaleFactor = maxCount === 1 ? 0.3 : 1;

        weeklyChart.innerHTML = `
            <div style="padding: 20px; width: 100%; height: 100%; display: flex; flex-direction: column;">
                <div style="flex: 1; display: flex; align-items: flex-end; justify-content: space-between; gap: 8px; padding-bottom: 0; border-bottom: 2px solid #E5E7EB; min-height: ${chartHeight}px;">
                    ${weekData.map((w, idx) => {
            const barHeight = w.count > 0 ? Math.max(12, (w.count / maxCount) * maxBarHeight * scaleFactor) : 8;
            const isToday = idx === 6;
            return `
                        <div style="flex: 1; max-width: 50px; display: flex; flex-direction: column; align-items: center; height: 100%; justify-content: flex-end;">
                            <span style="font-size: 0.9rem; font-weight: 700; color: ${isToday ? '#3B82F6' : '#1E3A8A'}; margin-bottom: 6px; flex-shrink: 0;">${w.count}</span>
                            <div style="width: 100%; display: flex; align-items: flex-end; justify-content: center; height: ${chartHeight}px;">
                                <div style="width: 100%; height: ${barHeight}px; min-height: 10px; background: linear-gradient(180deg, ${isToday ? '#3B82F6' : '#60A5FA'} 0%, ${isToday ? '#1D4ED8' : '#3B82F6'} 100%); border-radius: 6px 6px 0 0; box-shadow: 0 -2px 6px ${isToday ? 'rgba(59, 130, 246, 0.3)' : 'rgba(59, 130, 246, 0.15)'}; align-self: flex-end;"></div>
                            </div>
                        </div>
                    `;
        }).join('')}
                </div>
                <div style="display: flex; justify-content: space-between; padding-top: 10px;">
                    ${weekData.map((w, idx) => {
            const isToday = idx === 6;
            return `
                        <div style="flex: 1; text-align: center;">
                            <div style="font-size: 0.75rem; font-weight: ${isToday ? '700' : '500'}; color: ${isToday ? '#3B82F6' : 'var(--text-muted)'};">${w.day}</div>
                        </div>
                    `;
        }).join('')}
                </div>
            </div>
            <style>
                @keyframes barRise { from { height: 0; } }
            </style>
        `;
    }

    // Chart 3: Medicine Usage (Donut Chart with Legend)
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
        const total = sortedCategories.reduce((sum, [, count]) => sum + count, 0);

        const size = 120;
        const strokeWidth = 20;
        const radius = (size - strokeWidth) / 2;
        const circumference = 2 * Math.PI * radius;

        let cumulativePercent = 0;
        const segments = sortedCategories.map(([category, count], idx) => {
            const percent = count / total;
            const offset = circumference * cumulativePercent;
            const length = circumference * percent;
            cumulativePercent += percent;
            return { category, count, percent, offset, length, color: chartColors[idx % chartColors.length] };
        });

        medicineChart.innerHTML = `
            <div style="padding: 20px; width: 100%; height: 100%; display: flex; gap: 24px; align-items: center; justify-content: center;">
                <div style="flex: 0 0 auto; position: relative;">
                    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" style="transform: rotate(-90deg);">
                        <circle cx="${size / 2}" cy="${size / 2}" r="${radius}" fill="none" stroke="#E5E7EB" stroke-width="${strokeWidth}"/>
                        ${segments.map((seg, idx) => `
                            <circle 
                                cx="${size / 2}" 
                                cy="${size / 2}" 
                                r="${radius}" 
                                fill="none" 
                                stroke="${seg.color}" 
                                stroke-width="${strokeWidth}"
                                stroke-dasharray="${seg.length} ${circumference - seg.length}"
                                stroke-dashoffset="-${seg.offset}"
                                style="animation: donutSegment 1s ease-out ${idx * 0.1}s both;"
                            />
                        `).join('')}
                    </svg>
                    <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center;">
                        <div style="font-size: 1.5rem; font-weight: 700; color: var(--text-main);">${total}</div>
                        <div style="font-size: 0.65rem; color: var(--text-muted); text-transform: uppercase;">Total</div>
                    </div>
                </div>
                <div style="flex: 1; display: flex; flex-direction: column; gap: 6px; max-height: 160px; overflow-y: auto;">
                    ${segments.slice(0, 6).map(seg => `
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <span style="width: 10px; height: 10px; background: ${seg.color}; border-radius: 3px; flex-shrink: 0;"></span>
                            <span style="flex: 1; font-size: 0.8rem; color: var(--text-main); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${seg.category}</span>
                            <span style="font-size: 0.8rem; font-weight: 600; color: var(--text-muted);">${seg.count}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
            <style>
                @keyframes donutSegment { 
                    from { stroke-dasharray: 0 ${circumference}; } 
                }
            </style>
        `;
    }

    // Chart 4: Ship Route Health Incidents (Interactive Map)
    const mapChart = document.querySelectorAll('.chart-card')[3]?.querySelector('.chart-placeholder');
    if (mapChart) {
        // Define route locations
        const routeLocations = [
            { name: 'Singapore Port', x: 72, y: 58, incidents: 0, type: 'port' },
            { name: 'Mumbai', x: 55, y: 48, incidents: 0, type: 'port' },
            { name: 'Suez Canal', x: 45, y: 42, incidents: 0, type: 'transit' },
            { name: 'Mediterranean', x: 38, y: 38, incidents: 0, type: 'sea' },
            { name: 'Rotterdam', x: 32, y: 28, incidents: 0, type: 'port' },
            { name: 'Atlantic Ocean', x: 22, y: 45, incidents: 0, type: 'sea' }
        ];

        // Map emergency locations to route locations
        const locationMap = {
            'Engine Room': 'Rotterdam',
            'Bridge': 'Mediterranean',
            'Galley': 'Mumbai',
            'Deck': 'Singapore Port'
        };

        // Distribute emergencies across locations
        const ports = routeLocations.filter(loc => loc.type === 'port');
        emergencies.forEach((emergency, idx) => {
            const mappedLocation = locationMap[emergency.location] || null;
            if (mappedLocation) {
                const routeLoc = routeLocations.find(loc => loc.name === mappedLocation);
                if (routeLoc) {
                    routeLoc.incidents++;
                }
            } else {
                // If no mapping, distribute deterministically across ports
                if (ports.length > 0) {
                    const portIndex = idx % ports.length;
                    ports[portIndex].incidents++;
                }
            }
        });

        // If no emergencies mapped, use a default distribution for demo
        if (emergencies.length === 0 || routeLocations.every(loc => loc.incidents === 0)) {
            routeLocations[0].incidents = 2; // Singapore Port
            routeLocations[1].incidents = 1; // Mumbai
            routeLocations[3].incidents = 1; // Mediterranean
            routeLocations[4].incidents = 2; // Rotterdam
        }

        const totalIncidents = emergencies.length || routeLocations.reduce((sum, loc) => sum + loc.incidents, 0);

        // Sort locations by route order for proper path drawing (east to west)
        const sortedLocations = [...routeLocations].sort((a, b) => {
            return b.x - a.x || a.y - b.y;
        });

        // Build route path connecting all locations
        let routePath = '';
        sortedLocations.forEach((loc, idx) => {
            if (idx === 0) {
                routePath = `M${loc.x},${loc.y}`;
            } else {
                const prev = sortedLocations[idx - 1];
                const midX = (prev.x + loc.x) / 2;
                const midY = (prev.y + loc.y) / 2;
                routePath += ` Q${prev.x},${prev.y} ${midX},${midY} T${loc.x},${loc.y}`;
            }
        });

        mapChart.innerHTML = `
            <div style="padding: 20px; width: 100%; height: 100%; display: flex; flex-direction: column; gap: 16px;">
                <!-- Map Container -->
                <div style="flex: 1; position: relative; background: linear-gradient(135deg, #E0F2FE 0%, #BAE6FD 50%, #7DD3FC 100%); border-radius: 16px; overflow: hidden; min-height: 180px; box-shadow: inset 0 2px 8px rgba(0,0,0,0.1); border: 2px solid rgba(59, 130, 246, 0.2);">
                    <svg viewBox="0 0 100 60" style="width: 100%; height: 100%; position: absolute; top: 0; left: 0;">
                        <!-- Ocean background with depth effect -->
                        <defs>
                            <linearGradient id="oceanGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" style="stop-color:#BAE6FD;stop-opacity:1" />
                                <stop offset="100%" style="stop-color:#7DD3FC;stop-opacity:1" />
                            </linearGradient>
                            <filter id="glow">
                                <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
                                <feMerge>
                                    <feMergeNode in="coloredBlur"/>
                                    <feMergeNode in="SourceGraphic"/>
                                </feMerge>
                            </filter>
                        </defs>
                        <rect x="0" y="0" width="100" height="60" fill="url(#oceanGrad)"/>
                        
                        <!-- Enhanced continents with better styling -->
                        <path d="M15,15 Q20,12 28,14 L32,18 Q35,22 30,28 L22,32 Q18,30 15,25 Z" fill="#86EFAC" opacity="0.75" stroke="#4ADE80" stroke-width="0.3"/>
                        <path d="M35,25 Q42,22 50,24 L55,30 Q52,38 45,42 L38,40 Q32,35 35,25 Z" fill="#86EFAC" opacity="0.75" stroke="#4ADE80" stroke-width="0.3"/>
                        <path d="M48,18 Q58,15 68,18 L72,25 Q70,35 60,38 L50,35 Q45,28 48,18 Z" fill="#86EFAC" opacity="0.75" stroke="#4ADE80" stroke-width="0.3"/>
                        <path d="M70,35 Q78,32 85,38 L88,48 Q85,55 75,55 L68,50 Q65,42 70,35 Z" fill="#86EFAC" opacity="0.75" stroke="#4ADE80" stroke-width="0.3"/>
                        
                        <!-- Enhanced Ship Route Line -->
                        <path d="${routePath}" 
                              fill="none" 
                              stroke="#3B82F6" 
                              stroke-width="1.5" 
                              stroke-dasharray="4,3"
                              opacity="0.85"
                              stroke-linecap="round"
                              filter="url(#glow)"/>
                        
                        <!-- Location markers with enhanced styling -->
                        ${routeLocations.map((loc, idx) => {
            const color = loc.incidents > 2 ? '#EF4444' : loc.incidents > 0 ? '#F59E0B' : '#10B981';
            const colorDark = loc.incidents > 2 ? '#DC2626' : loc.incidents > 0 ? '#D97706' : '#059669';
            const baseSize = loc.type === 'port' ? 2.8 : 2.5;
            const markerSize = loc.incidents > 0 ? baseSize + 0.5 : baseSize;
            const hasIncidents = loc.incidents > 0;
            return `
                                <g class="map-marker" data-location="${loc.name}" style="cursor: pointer; transition: transform 0.2s;">
                                    <!-- Outer glow ring for incidents -->
                                    ${hasIncidents ? `
                                    <circle cx="${loc.x}" cy="${loc.y}" r="${markerSize + 0.8}" fill="${color}" opacity="0.2">
                                        <animate attributeName="r" values="${markerSize + 0.8};${markerSize + 1.8};${markerSize + 0.8}" dur="3s" repeatCount="indefinite"/>
                                        <animate attributeName="opacity" values="0.2;0.05;0.2" dur="3s" repeatCount="indefinite"/>
                                    </circle>
                                    ` : ''}
                                    <!-- Shadow for depth -->
                                    <circle cx="${loc.x + 0.2}" cy="${loc.y + 0.2}" r="${markerSize}" fill="rgba(0,0,0,0.15)" opacity="0.4"/>
                                    <!-- Main marker circle with gradient effect -->
                                    <circle cx="${loc.x}" cy="${loc.y}" r="${markerSize}" fill="${color}" stroke="white" stroke-width="0.8" opacity="1" filter="url(#glow)"/>
                                    <!-- Inner highlight -->
                                    <circle cx="${loc.x - 0.6}" cy="${loc.y - 0.6}" r="${markerSize * 0.35}" fill="rgba(255,255,255,0.6)"/>
                                    ${hasIncidents ? `
                                    <text x="${loc.x}" y="${loc.y + 0.7}" font-size="2" fill="white" text-anchor="middle" font-weight="800" style="text-shadow: 0 1px 3px rgba(0,0,0,0.5); filter: drop-shadow(0 0 2px rgba(0,0,0,0.3));">${loc.incidents}</text>
                                    ` : ''}
                                    <!-- Location label -->
                                    <text x="${loc.x}" y="${loc.y + markerSize + 2.5}" font-size="2" fill="#1E3A8A" text-anchor="middle" font-weight="600" opacity="0.9">${loc.name.split(' ')[0]}</text>
                                </g>
                            `;
        }).join('')}
                    </svg>
                </div>
                
                <!-- Enhanced Legend -->
                <div style="display: flex; justify-content: center; gap: 20px; flex-wrap: wrap; padding: 12px; background: linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%); border-radius: 12px; border: 1px solid #E2E8F0;">
                    <div style="display: flex; align-items: center; gap: 8px; padding: 6px 12px; background: white; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                        <span style="width: 14px; height: 14px; background: linear-gradient(135deg, #10B981 0%, #059669 100%); border-radius: 50%; box-shadow: 0 2px 4px rgba(16, 185, 129, 0.3);"></span>
                        <span style="font-size: 0.75rem; color: #475569; font-weight: 600;">No Incidents</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 8px; padding: 6px 12px; background: white; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                        <span style="width: 14px; height: 14px; background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%); border-radius: 50%; box-shadow: 0 2px 4px rgba(245, 158, 11, 0.3);"></span>
                        <span style="font-size: 0.75rem; color: #475569; font-weight: 600;">1-2 Incidents</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 8px; padding: 6px 12px; background: white; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                        <span style="width: 14px; height: 14px; background: linear-gradient(135deg, #EF4444 0%, #DC2626 100%); border-radius: 50%; box-shadow: 0 2px 4px rgba(239, 68, 68, 0.3);"></span>
                        <span style="font-size: 0.75rem; color: #475569; font-weight: 600;">3+ Incidents</span>
                    </div>
                </div>
                
                <!-- Enhanced Stats Summary -->
                <div style="display: flex; justify-content: space-around; gap: 16px; padding: 16px; background: linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%); border-radius: 12px; border: 1px solid #E2E8F0; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                    <div style="text-align: center; flex: 1; padding: 12px; background: linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%); border-radius: 10px; border: 1px solid #BFDBFE;">
                        <div style="font-size: 2rem; font-weight: 800; color: #1E40AF; line-height: 1.2; margin-bottom: 4px; text-shadow: 0 1px 2px rgba(30, 64, 175, 0.2);">${totalIncidents}</div>
                        <div style="font-size: 0.7rem; color: #64748B; text-transform: uppercase; letter-spacing: 0.8px; font-weight: 600;">TOTAL INCIDENTS</div>
                    </div>
                    <div style="text-align: center; flex: 1; padding: 12px; background: linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%); border-radius: 10px; border: 1px solid #A7F3D0;">
                        <div style="font-size: 2rem; font-weight: 800; color: #047857; line-height: 1.2; margin-bottom: 4px; text-shadow: 0 1px 2px rgba(4, 120, 87, 0.2);">${routeLocations.length}</div>
                        <div style="font-size: 0.7rem; color: #64748B; text-transform: uppercase; letter-spacing: 0.8px; font-weight: 600;">LOCATIONS</div>
                    </div>
                </div>
            </div>
            <style>
                .map-marker:hover {
                    transform: scale(1.15);
                    transition: transform 0.2s ease;
                }
                .map-marker circle:first-of-type {
                    transition: all 0.2s ease;
                }
            </style>
        `;
    }
}

// Initialize analytics page
document.addEventListener('DOMContentLoaded', function () {
    if (window.location.pathname.split('/').pop() === 'analytics.html') {
        loadAnalytics();
        
        // Add event listener for voyage filter dropdown
        const voyageFilterInput = document.querySelector('.custom-select-wrapper input[type="hidden"]');
        if (voyageFilterInput) {
            voyageFilterInput.addEventListener('change', loadAnalytics);
            voyageFilterInput.addEventListener('input', loadAnalytics);
        }
    }
});

