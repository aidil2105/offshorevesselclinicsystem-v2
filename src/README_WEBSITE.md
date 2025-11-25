# MarMed Onboard Clinic - Maritime Medical Management Website

A professional, fully responsive maritime medical management application featuring a beautiful ocean-themed design with separate HTML pages for each functionality.

## 🌊 Project Overview

MarMed Onboard Clinic is a comprehensive medical management system designed for ships and offshore vessels. The application provides medical staff with tools to manage crew health records, log clinic visits, document emergencies, track medicine inventory, analyze health trends, and configure system settings.

## 📁 File Structure

```
/
├── index.html                 # Dashboard/Home page
├── crew-records.html          # Crew medical records management
├── visit-log.html             # Clinic visit logging with modal form
├── emergencies.html           # Emergency case documentation
├── medicine-inventory.html    # Medicine stock management
├── analytics.html             # Health analytics dashboard
├── settings.html              # Settings with tabbed interface
├── styles.css                 # Global stylesheet
└── script.js                  # JavaScript functions
```

## 🎨 Design Features

### Color Palette
- **Deep Blues**: #003d82, #0059b3 (Primary navigation, headers)
- **Ocean Accent**: #00a3e0 (Borders, highlights, hover states)
- **Crisp White**: #ffffff (Cards, backgrounds)
- **Light Ocean**: #f0f8ff, #e6f3ff (Subtle gradients, sidebar)

### Key Design Elements
- Professional maritime aesthetic with ocean gradients
- Consistent global layout across all 7 pages
- Modern glassmorphism effects on headers
- Smooth transitions and hover animations
- Responsive design for all device sizes
- Color-coded status indicators
- Box shadows and depth effects

## 📄 Page Descriptions

### 1. Dashboard (index.html)
**Purpose**: Main landing page providing overview of clinic operations

**Features**:
- 4 statistics cards (Patients Today, Ongoing Treatments, Crew Under Observation, Medicine Stock Alerts)
- 7-Day Visit Trend chart placeholder
- Quick Actions panel with buttons to add visits and log emergencies
- Real-time metrics display

### 2. Crew Records (crew-records.html)
**Purpose**: Central database for crew medical information

**Features**:
- Search functionality for crew members
- Comprehensive table with Name, Rank, Last Visit, Health Status, Vaccination
- Right sidebar Crew Profile Panel with action buttons
- Expandable sections for Personal Info, Medical History, Vaccination, Fitness Status
- Sample crew data included

### 3. Visit Log (visit-log.html)
**Purpose**: Chronological record of all clinic visits

**Features**:
- Filterable table by Date Range, Condition Type, and Medic
- 6-column table capturing visit essentials
- "Add New Visit" button triggering modal form
- Modal form with fields for Crew Name, Complaint, Diagnosis, Treatment, Remarks, File Attachments
- Sample visit records

### 4. Emergencies (emergencies.html)
**Purpose**: Dedicated page for serious medical emergency documentation

**Features**:
- Emergency Case Log Form at top (always visible)
- Fields for Incident Type, Date/Time, Crew Name, Location, Treatment, Evacuation Details, Outcome
- Past Emergencies table with historical records
- "Generate Emergency Summary PDF" button
- Red accent colors for urgency

### 5. Medicine Inventory (medicine-inventory.html)
**Purpose**: Manages vessel's medicine stock

**Features**:
- Filter by Stock Level, Expiry Date, and Category
- 6-column table: Medicine Name, Stock, Expiry, Reorder Level, Location, Category
- Color-coded stock indicators (Green=Good, Orange=Medium, Red=Low)
- Expiry date warnings
- "Add New Medicine" button

### 6. Analytics (analytics.html)
**Purpose**: Data-driven health insights

**Features**:
- Date Range and Voyage Duration filters
- 4 chart placeholders:
  - Common Conditions (Bar Chart)
  - Weekly Visits (Line Chart)
  - Medicine Usage (Pie Chart)
  - Ship Route Health Incidents (Map)
- Training Video section for medical protocols
- 2x2 grid layout for charts

### 7. Settings (settings.html)
**Purpose**: System configuration and administration

**Features**:
- 4 tabbed sections:
  - **Clinic Info**: Vessel Name, IMO Number, Medic in Charge, License Number
  - **User Roles**: 3 role types (Medic, Clinic Admin, Officer)
  - **Backup/Export**: One-click data export
  - **File Complaint**: Comprehensive complaint form with categories, priorities, and confirmation system

## 🎯 JavaScript Functions

The `script.js` file includes:

### Modal Functions
- `openModal()` - Opens the visit log modal
- `closeModal()` - Closes the modal
- `saveVisit()` - Saves visit data

### Tab Navigation
- `openTab(evt, tabName)` - Switches between settings tabs

### Form Handling
- `submitComplaint(event)` - Handles complaint form submission with reference ID
- `exportData()` - Triggers data export
- `validateForm(formId)` - Form validation helper

### Search & Filter
- `searchTable(inputId, tableId)` - Real-time table search
- `filterTable(selectId, tableId, columnIndex)` - Filter table by dropdown

### Utilities
- `showNotification(message, type)` - Display toast notifications
- `formatDate(date)` - Date formatting
- `formatDateTime(date)` - DateTime formatting
- `saveToLocalStorage(key, data)` - Save data locally
- `loadFromLocalStorage(key)` - Load saved data
- `printPage()` - Print current page
- `exportTableToCSV(tableId, filename)` - Export table to CSV
- `confirmAction(message, callback)` - Confirmation dialog
- `enableAutoSave(formId, storageKey)` - Auto-save draft functionality

### Event Listeners
- DOMContentLoaded initialization
- Automatic search bar functionality
- Keyboard shortcuts (Escape to close modals, Ctrl+S to save)
- Automatic navigation highlighting

## 💻 Technology Stack

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with Flexbox and Grid
- **JavaScript (ES6+)**: Interactive functionality
- **Tailwind CSS CDN**: Utility-first CSS framework
- **SVG**: Logo graphics
- **LocalStorage API**: Client-side data persistence

## 📱 Responsive Design

### Breakpoints
- **Desktop**: 1024px and above (full layout)
- **Tablet**: 768px - 1023px (stacked sidebar, single column grids)
- **Mobile**: 767px and below (vertical layout, simplified navigation)

### Responsive Features
- Flexible grid systems
- Collapsible sidebar navigation
- Stacked form layouts on mobile
- Touch-friendly button sizes
- Optimized font sizes for readability

## 🚀 Getting Started

### Setup
1. Place all files in the same directory
2. Ensure `styles.css` and `script.js` are in the root directory
3. Open `index.html` in a web browser

### Navigation
- Use the left sidebar to navigate between pages
- Click navigation links to switch pages
- Each page maintains consistent header, sidebar, and footer

### Interactive Elements
- **Dashboard**: Click quick action buttons to navigate
- **Visit Log**: Click "+ Add New Visit" to open modal form
- **Settings**: Click tabs to switch between settings sections
- **Search Bars**: Type to filter table results in real-time
- **Tables**: Click rows for selection (where applicable)

## 🎨 Customization

### Changing Colors
Edit the CSS variables in `styles.css`:
- Primary Blue: `#003d82`
- Secondary Blue: `#0059b3`
- Accent Blue: `#00a3e0`
- Light Background: `#f0f8ff`

### Adding New Pages
1. Copy the structure from an existing HTML file
2. Update the `<title>` tag
3. Modify the main content area
4. Update navigation active state

### Extending JavaScript
Add new functions to `script.js` following the existing structure:
```javascript
// ==========================================
// Your Feature Name
// ==========================================

function yourFunction() {
    // Implementation
}
```

## 📊 Sample Data

All pages include realistic sample data:
- 7 crew members with varied medical statuses
- 7 recent visit records
- 4 emergency incidents
- 10 medicines in inventory
- Chart placeholders for analytics

## 🔒 Security Considerations

This is a **client-side only** application. For production use:
- Implement server-side authentication
- Use HTTPS for all connections
- Sanitize all user inputs
- Implement proper session management
- Add database backend for data persistence
- Encrypt sensitive medical data
- Implement role-based access control

## 📖 Browser Compatibility

Tested and compatible with:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📝 License

© 2025 MarMed Onboard Clinic – For Authorized Medical Use Only

## 🛠️ Maintenance

### Adding Features
- JavaScript functions are modular and easy to extend
- CSS follows BEM-like naming conventions
- HTML structure is semantic and accessible

### Updating Styles
- Global styles in `styles.css`
- Page-specific styles can be added inline if needed
- Tailwind CDN can be upgraded by changing the script tag

## 📞 Support

For technical support or inquiries:
- Email: support@marmed.com
- Reference: Maritime Health Portal

---

**Note**: This is a university assignment/prototype. Not intended for production medical use without proper backend infrastructure, security measures, and compliance with medical data regulations (HIPAA, GDPR, etc.).