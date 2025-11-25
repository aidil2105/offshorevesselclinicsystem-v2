# MarMed Onboard Clinic - Page Descriptions

## 1. Home (Dashboard)
The dashboard provides an at-a-glance overview of clinic operations. It displays four key statistics boxes showing Patients Today, Ongoing Treatments, Crew Under Observation, and Medicine Stock Alerts. The main area features a 7-Day Visit Trend chart placeholder and a Quick Actions panel with buttons to Add New Visit and Log Emergency Case.

**Purpose**: This is the first page medical staff see when logging in. It gives them immediate visibility into the current state of the clinic's operations without having to navigate through multiple pages.

**Key Features**:
- **Statistics Row**: Four prominent boxes at the top display real-time metrics that help the medic quickly assess workload and urgent issues
- **7-Day Visit Trend Chart**: A visual representation showing patient visit patterns over the past week, helping identify busy periods and trends
- **Quick Actions Panel**: Provides one-click access to the most common tasks (logging new visits and emergencies) without navigating to other pages
- **Layout**: Uses a grid layout with the chart taking up 2/3 of the width and quick actions in the remaining 1/3, optimizing screen space for the most important information

## 2. Crew Records
A comprehensive crew medical records management page featuring a searchable table listing all crew members with their Name, Rank, Last Visit date, Health Status, and Vaccination information. The right sidebar contains a Crew Profile Panel with action buttons (Add Visit Record, Upload Report, Print Summary) and expandable sections for Personal Information, Medical History, Vaccination Record, and Fitness Status.

**Purpose**: Serves as the central database for all crew medical information. The medic can view health status of all crew members, access individual medical histories, and maintain up-to-date records essential for maritime health compliance.

**Key Features**:
- **Search Functionality**: Allows quick lookup of crew members by name or other criteria, essential when dealing with larger crews
- **Comprehensive Table**: Displays 5 critical data points (Name, Rank, Last Visit, Health Status, Vaccination) in a scannable format
- **Crew Profile Panel**: Right sidebar that becomes contextually active when a crew member is selected from the table
- **Action Buttons**: Three key actions (Add Visit Record, Upload Report, Print Summary) allow the medic to update records, attach medical documents, or generate compliance reports
- **Profile Sections**: Four expandable information blocks covering Personal Information, Medical History, Vaccination Record, and Fitness Status provide detailed medical background
- **Layout**: Two-column layout with the main table taking 2/3 width and the profile panel in 1/3, keeping records visible while viewing details

## 3. Visit Log
The clinic visit log tracks all medical visits with filterable columns for Date, Crew Name, Complaint, Diagnosis, Treatment, and Medic. Filter options include Date Range, Condition Type, and Medic. An "Add New Visit" button opens a modal form where users can input visit details including crew name, complaint, diagnosis, treatment, remarks, and file attachments.

**Purpose**: Maintains a chronological record of all clinic visits. This is crucial for tracking treatment histories, identifying health trends, and maintaining regulatory compliance with maritime medical documentation requirements.

**Key Features**:
- **Filterable Table**: Three filter inputs (Date Range, Condition Type, Medic) allow filtering through potentially hundreds of visit records to find specific entries
- **Comprehensive Visit Data**: Six columns capture the essential information about each clinic visit in a single row
- **Add New Visit Modal**: Clicking the button opens an overlay form that doesn't navigate away from the current page, making data entry efficient
- **Visit Form Fields**: The modal captures Crew Name, Complaint (chief complaint/symptoms), Diagnosis, Treatment Given, Remarks (for additional notes), and supports file uploads for attaching lab results, prescriptions, or medical images
- **Form Actions**: Save Visit button commits the data, Cancel button closes without saving, maintaining user control
- **Layout**: Full-width table maximizes visible records; modal appears centered over the page with a semi-transparent backdrop

## 4. Emergencies
Emergency case documentation page with a comprehensive form to log incidents including Incident Type, Date & Time, Crew Name, Location/Vessel Section, Treatment Given, Evacuation Details, and Outcome/Follow-up. Below the form is a Past Emergencies table displaying previous incidents with columns for Date, Type, Crew, and Outcome. Includes functionality to Generate Emergency Summary PDF.

**Purpose**: Dedicated page for logging and tracking serious medical emergencies that require detailed documentation. Separate from routine visits, this ensures critical incidents are properly recorded for legal, insurance, and safety analysis purposes.

**Key Features**:
- **Emergency Case Log Form**: Always visible at the top for immediate access during critical situations
- **Incident Classification**: Fields for Incident Type (e.g., cardiac event, injury, acute illness) and exact Date & Time for precise documentation
- **Location Tracking**: Records where on the vessel the incident occurred, important for safety analysis and evacuation logistics
- **Treatment Documentation**: Three textarea fields capture Treatment Given (immediate care), Evacuation Details (if medical evacuation was needed), and Outcome/Follow-up (patient status and ongoing care needs)
- **Past Emergencies Table**: Historical record of all emergencies with quick-view columns showing Date, Type, Crew, and Outcome
- **PDF Export**: Generate Emergency Summary PDF button allows creating official reports for fleet management, insurance claims, or regulatory authorities
- **Layout**: Form at top ensures immediate access during crises; table below provides historical context; PDF button prominently placed for easy access

## 5. Medicine Inventory
Manages the vessel's medicine stock with a filterable table showing Medicine Name, Stock quantity, Expiry date, Reorder Level, Location, and Category. Filter options include Stock Level, Expiry Date, and Category. An "Add New Medicine" button allows adding new items to the inventory for tracking and reorder management.

**Purpose**: Critical inventory management tool ensuring the vessel maintains adequate medical supplies. Tracks stock levels, expiration dates, and storage locations to prevent shortages and ensure medications remain safe and effective.

**Key Features**:
- **Filter Options**: Three filters (Stock Level, Expiry Date, Category) help identify medicines that are running low, expiring soon, or need reordering
- **Comprehensive Table**: Six columns provide complete medicine information including Name, Stock (current quantity), Expiry (expiration date), Reorder Level (minimum quantity threshold), Location (where it's stored on vessel), and Category (drug classification)
- **Add New Medicine**: Button opens a form to add newly received medicines to the inventory system
- **Stock Monitoring**: The Reorder Level column helps identify when supplies need replenishment before they run out
- **Expiry Tracking**: Prevents use of expired medications and helps plan for replacements
- **Storage Location**: Important on vessels where medicines may be stored in multiple locations (main clinic, emergency kits, bridge supplies)
- **Layout**: Full-width table displays 8 rows at a time, showing substantial inventory without scrolling; filters above save space while remaining accessible

## 6. Analytics
Health analytics dashboard with date range and voyage duration filters. Displays four chart placeholders: Common Conditions (bar chart), Weekly Visits (line chart), Medicine Usage (pie chart), and Ship Route Health Incidents (map). Also includes a Training Video section with a YouTube placeholder for medical training content.

**Purpose**: Provides data-driven insights into health patterns and trends aboard the vessel. Helps medics and management identify recurring health issues, plan for medical supply needs, and make informed decisions about crew health and safety protocols.

**Key Features**:
- **Time-Based Filtering**: Date Range and Voyage Duration filters allow analyzing health data for specific periods or voyages
- **Common Conditions Chart**: Bar chart showing frequency of different medical conditions, helping identify what health issues are most prevalent (e.g., seasickness, injuries, infections)
- **Weekly Visits Chart**: Line chart tracking visit volume over time, showing busy periods and helping with resource planning
- **Medicine Usage Chart**: Pie chart displaying which medications are used most frequently, informing inventory decisions
- **Ship Route Health Incidents Map**: Geographic visualization showing where along the voyage route health incidents occurred, potentially revealing environmental or operational factors
- **Training Video Section**: Dedicated area for embedding medical training videos, supporting ongoing education and protocol updates for the medical team
- **Layout**: 2x2 grid of charts maximizes screen space while maintaining readability; training video below gets full width for optimal viewing

## 7. Settings
Multi-tabbed settings page with four sections:
- **Clinic Info**: Vessel-specific information including Vessel Name, Vessel IMO Number, Medic in Charge, and Medical License Number
- **User Roles**: Displays three role types (Medic, Clinic Admin, Officer) for access management
- **Backup/Export**: Simple export functionality with an Export Data button
- **File Complaint**: Comprehensive complaint submission form with Category selection, Priority Level, Subject/Title, Date of Incident, Detailed Description, Contact Email, and Phone Number. Complaints are sent to support@marmed.com with a confirmation reference number.

**Purpose**: Central configuration hub for clinic administration, user management, data backup, and communication with MarMed support. This page handles all administrative tasks that don't involve direct patient care.

**Key Features**:

**Clinic Info Tab**:
- **Vessel Identification**: Records Vessel Name and IMO Number for official documentation and compliance
- **Medical Staff Details**: Tracks who is the Medic in Charge and their Medical License Number for legal and regulatory purposes
- **Single-Vessel Focus**: Unlike multi-clinic systems, this focuses on one vessel's clinic, simplifying the interface

**User Roles Tab**:
- **Role Management**: Shows three access levels (Medic, Clinic Admin, Officer) that control what different users can see and do
- **Access Control**: Ensures sensitive medical data is only accessible to authorized personnel

**Backup/Export Tab**:
- **Data Export**: One-click button to export all clinic data for backup purposes
- **Compliance**: Essential for maintaining backup copies for regulatory compliance and disaster recovery

**File Complaint Tab**:
- **Complaint Categories**: Six predefined categories (Medical Equipment Issue, Medicine/Supply Shortage, System Technical Issue, Protocol/Procedure Concern, Safety Concern, Other) help route complaints appropriately
- **Priority Levels**: Four levels (Critical, High, Medium, Low) ensure urgent issues get immediate attention
- **Comprehensive Form**: Captures Subject/Title, Date of Incident, Detailed Description, Contact Email, and Phone Number for complete documentation
- **Confirmation System**: After submission, displays a success message with a unique Reference ID (e.g., COMP-1234) for tracking
- **Support Integration**: Complaints are sent to support@marmed.com, providing a direct communication channel to MarMed headquarters

**Layout**: Horizontal tabs at top allow quick switching between sections; each tab's content fills the main area with appropriate form fields or information displays