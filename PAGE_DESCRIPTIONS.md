# MarMed Onboard Clinic System - Page Descriptions

## 1. Dashboard (index.html)

The Dashboard serves as the central hub of the MarMed Onboard Clinic System, providing medical personnel with an immediate overview of the vessel's medical status upon login. This page is designed to give quick insights into current medical operations and facilitate rapid access to critical functions.

**Key Features:**
- **Real-Time Statistics Display:** Four metric cards show essential information including the number of patients seen today (12), ongoing treatments requiring follow-up (5), crew members under medical observation (3), and medicine stock alerts (7). These statistics allow medical staff to quickly assess the current workload and identify urgent issues.
- **7-Day Visit Trend Chart:** A visual representation of patient visits over the past week, enabling medical personnel to identify patterns, anticipate busy periods, and plan resource allocation accordingly.
- **Quick Actions Panel:** Provides immediate access to the two most frequently performed tasks - adding new patient visits and logging emergency cases - streamlining the workflow for medical staff during busy periods.

---

## 2. Crew Records (crew-records.html)

The Crew Records page functions as the comprehensive medical database for all personnel aboard the vessel. This module enables medical staff to maintain complete health profiles, track medical histories, and monitor the fitness status of every crew member, ensuring compliance with maritime health regulations.

**Key Features:**
- **Advanced Search Functionality:** A search bar allows medical personnel to quickly locate specific crew members by entering their name, rank, or crew ID number, facilitating rapid access to medical records during emergencies or routine consultations.
- **Comprehensive Medical Table:** Displays critical information for all crew members in an organized table format, including their name, rank/position, date of last medical visit, current health status (Fit for Duty or Under Observation), and vaccination status (Current or Due Soon). The system currently tracks 7 crew members ranging from the Captain to AB Seaman.
- **Interactive Crew Profile Panel:** When a crew member is selected, a dedicated panel on the right side provides access to detailed medical information organized into sections: Personal Information, Medical History, Vaccination Records, and Fitness Status. This panel also includes action buttons for adding visit records, uploading medical reports, and printing medical summaries for official documentation.

---

## 3. Visit Log (visit-log.html)

The Visit Log page is the primary interface for documenting routine medical consultations, treatments, and patient encounters. This module ensures that all medical interactions are properly recorded, creating a comprehensive medical history for each crew member and maintaining compliance with maritime medical record-keeping requirements.

**Key Features:**
- **Multi-Filter System:** Medical staff can refine the displayed records using three filter options: date range selection for viewing visits within specific timeframes, condition type filtering (Injury, Illness, Check-up), and medic filtering to view visits handled by specific medical personnel (Dr. Smith or Dr. Johnson). This filtering capability makes it easy to locate specific visits or analyze patterns.
- **Add New Visit Modal:** Clicking the "Add New Visit" button opens a comprehensive modal form where medical personnel can document patient encounters. The form includes fields for crew name, chief complaint, diagnosis, treatment given, and additional remarks. It also supports file attachments for lab results, prescriptions, or other supporting medical documents.
- **Complete Visit History Table:** All recorded visits are displayed in a chronological table showing the date, crew member name, presenting complaint, diagnosis, treatment provided, and attending medic. The current system contains 7 sample visits demonstrating various medical scenarios including seasickness, lacerations, respiratory infections, muscle strains, routine check-ups, dermatitis, and eye injuries.

---

## 4. Emergencies (emergencies.html)

The Emergencies page is a critical module designed specifically for documenting serious medical incidents that require immediate intervention, specialized treatment, or potential medical evacuation from the vessel. This page ensures that all emergency cases are thoroughly documented for medical, legal, and regulatory purposes.

**Key Features:**
- **Comprehensive Emergency Logging Form:** The form captures detailed information about each emergency incident, including the incident type (Cardiac Event, Severe Injury, Acute Illness, Burns, Fracture, or Other Emergency), precise date and time, affected crew member, location/vessel section where the incident occurred, detailed treatment provided, evacuation details if medical evacuation was necessary, and outcome/follow-up requirements.
- **Emergency Incident History:** All past emergency cases are displayed in a table format showing the date/time, incident type, affected crew member, location, and outcome. The system currently contains 4 documented emergencies including severe injuries, cardiac events, burns, and fractures, with outcomes ranging from onboard treatment to medical evacuation.
- **PDF Report Generation:** A dedicated button allows medical personnel to generate comprehensive PDF summary reports of emergency cases, which can be used for regulatory compliance, insurance claims, shore-based medical consultations, or legal documentation.

---

## 5. Medicine Inventory (medicine-inventory.html)

The Medicine Inventory page provides comprehensive pharmaceutical stock management capabilities, ensuring that the vessel maintains adequate medical supplies at all times. This module helps medical personnel track medication quantities, monitor expiration dates, and identify items requiring reordering before stock-outs occur.

**Key Features:**
- **Advanced Triple Filter System:** The inventory can be filtered using three independent criteria: stock level (All, Critical below 10, Low 10-25, Good above 25), expiry date status (All, Expired, Expiring Soon within 30 days, Valid), and medication category (All, Analgesics, Antibiotics, Cardiac, Emergency). These filters enable medical staff to quickly identify medications requiring immediate attention.
- **Color-Coded Inventory Table:** The comprehensive table displays all medications with their current stock quantity, expiration date, reorder level threshold, physical storage location (e.g., Main Clinic Cabinet A, Refrigerator, Emergency Kit), and category. Stock levels are color-coded for quick visual assessment: green for good stock, yellow for medium, orange for low stock, and red for items expiring soon or expired.
- **Inventory Management:** The system currently tracks 10 different medications including common analgesics (Paracetamol, Ibuprofen), antibiotics (Amoxicillin, Ciprofloxacin), cardiac medications (Aspirin, Nitroglycerin), emergency supplies (Epinephrine Auto-Injector), and other essential medications. An "Add New Medicine" button allows medical personnel to add newly acquired pharmaceuticals to the inventory.

---

## 6. Analytics (analytics.html)

The Analytics page provides data visualization and business intelligence capabilities, transforming raw medical data into actionable insights. This module enables medical personnel and vessel management to identify health trends, monitor resource utilization, and make informed decisions about medical operations and preventive care.

**Key Features:**
- **Flexible Data Filtering:** Users can customize the displayed analytics by selecting specific date ranges or voyage periods (All Voyages, Current Voyage, Last Voyage, Last 3/6 Months, Year to Date), allowing for both short-term operational analysis and long-term trend identification.
- **Four Analytical Visualizations:**
  - **Common Conditions Bar Chart:** Displays the frequency of different medical conditions, helping identify the most prevalent health issues aboard the vessel and informing preventive health strategies.
  - **Weekly Visits Line Chart:** Shows patient visit trends over time, enabling medical staff to anticipate workload patterns, identify seasonal variations, and plan resource allocation.
  - **Medicine Usage Pie Chart:** Illustrates the distribution of medication consumption, supporting inventory optimization and identifying high-usage pharmaceuticals that may require larger stock levels.
  - **Ship Route Health Incidents Map:** Correlates health incidents with geographic locations along the vessel's route, helping identify region-specific health risks such as tropical diseases or environmental hazards.
- **Medical Training Resources:** The page includes a dedicated section for accessing training videos covering maritime medical procedures and protocols, supporting continuous professional development for medical personnel.

---

## 7. Settings (settings.html)

The Settings page serves as the administrative control center for the MarMed Onboard Clinic System. This module provides system configuration options, user management capabilities, data export functionality, and a complaint filing system for reporting technical or operational issues.

**Key Features:**

**Clinic Information Tab:**
Allows administrators to configure essential vessel and clinic identification details including vessel name (MV Ocean Navigator), vessel IMO number (IMO 9876543), medic in charge (Dr. Sarah Johnson), and medical license number (ML-2025-456789). This information appears on all generated reports and ensures proper identification for regulatory compliance.

**User Roles Tab:**
Displays the three user role levels within the system: Medic (full access to medical records with ability to log visits and emergencies), Clinic Admin (manages settings, user roles, and system configuration), and Officer (view-only access to analytics and crew health status). This role-based access control ensures appropriate security and data protection.

**Backup/Export Tab:**
Provides comprehensive data export functionality, allowing administrators to export all clinic data including crew records, visit logs, emergency cases, and medicine inventory. This feature supports regulatory compliance, data backup for disaster recovery, and transfer of medical records when crew members change vessels.

**File Complaint Tab:**
Enables users to submit detailed complaints about system issues, equipment problems, or safety concerns. The form captures the complaint category (Medical Equipment Issue, Medicine/Supply Shortage, System Technical Issue, Protocol/Procedure Concern, Safety Concern, Other), priority level (Critical, High, Medium, Low), incident date, contact information, and detailed description. Upon submission, the complaint is automatically emailed to support@marmed.com and assigned a reference ID for tracking purposes.

---

## System Overview

### Purpose
The MarMed Onboard Clinic System is a comprehensive web-based medical management platform specifically designed for maritime vessels. It enables medical personnel to maintain complete electronic health records, track medical supplies, document emergency incidents, and ensure compliance with international maritime health regulations while operating at sea.

### Target Users
- **Ship Medical Officers:** Primary users who conduct medical consultations, manage emergencies, and maintain crew health records
- **Clinic Administrators:** Personnel responsible for system configuration, user management, and regulatory compliance
- **Vessel Officers:** Management staff requiring oversight of crew health status and medical operations
- **Shore-Based Medical Support:** Remote medical consultants who may review exported data for telemedicine consultations

### Technical Implementation
The system is built using modern web technologies including HTML5, CSS3, and JavaScript, with Tailwind CSS for responsive styling and Phosphor Icons for visual elements. The application features a fully responsive design that works on desktop computers, tablets, and mobile devices, ensuring accessibility in various shipboard environments. Data can be stored locally and exported for backup or regulatory compliance purposes.

### Common Navigation Elements
All pages share a consistent navigation structure including a header with the MarMed logo and system title, a responsive sidebar menu providing access to all seven modules, user profile and logout options, and a footer containing copyright information, contact details (support@marmed.com), and the system disclaimer "For Authorized Medical Use Only." The navigation automatically adapts to mobile devices using a hamburger menu interface.

---

*Document prepared for MarMed Onboard Clinic System*  
*Version 1.0 - 2025*
