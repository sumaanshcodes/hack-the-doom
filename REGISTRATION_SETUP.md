# Hack The Doom V2 - Registration Setup Guide

This document explains exactly how the Hack4Tech technical team must configure the serverless Google Apps Script backend to receive registrations.

> [!CAUTION]
> The admin email `ydv.sumansh@gmail.com` is PRIVATE. Do NOT expose this email anywhere in the React codebase, UI, or GitHub repository.

## Architecture
`React Form -> JSON Payload -> fetch(text/plain) -> Google Apps Script Web App -> Google Sheet`

This architecture allows the frontend to be fully static while maintaining a secure, free, serverless database via Google Sheets.

---

## Step-by-Step Setup

### Step 1: Create the Google Sheet
1. Log into Google Drive using the private admin account (`ydv.sumansh@gmail.com`).
2. Create a new Google Sheet named **"Hack The Doom Registrations"**.

### Step 2: Configure Columns
In Row 1, create the following headers exactly (or adjust based on your needs, but they must match what your Apps Script parses):
- A: Timestamp
- B: Registration ID
- C: Team Name
- D: Captain Name
- E: Captain Email
- F: Captain Phone
- G: College
- H: Team Size
- I: Member 1 Name
- J: Member 1 Email
- K: Member 1 Phone
- L: Member 2 Name
- M: Member 2 Email
- N: Member 2 Phone
- O: Member 3 Name
- P: Member 3 Email
- Q: Member 3 Phone
- R: Domain
- S: Project Idea
- T: Technologies
- U: GitHub
- V: LinkedIn
- W: Consent

### Step 3: Create the Google Apps Script
1. In the Google Sheet, click **Extensions** > **Apps Script**.
2. Delete any existing code in the editor.
3. Paste the following script:

```javascript
function doPost(e) {
  // Set CORS headers for the response
  var headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json"
  };

  try {
    // Parse the JSON payload sent from the React frontend
    var data = JSON.parse(e.postData.contents);
    
    // Server-side validation example
    if (!data.captain || !data.captain.email) {
      return ContentService.createTextOutput(JSON.stringify({
        status: "error",
        message: "Invalid payload: Captain email is missing."
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Ensure arrays exist
    var members = data.team.members || [];
    var m1 = members[0] || {};
    var m2 = members[1] || {};
    var m3 = members[2] || {};
    
    // Construct the row array matching the columns in Step 2
    var rowData = [
      data.timestamp || new Date().toISOString(),
      data.registrationId,
      data.team.name || "Solo",
      data.captain.name,
      data.captain.email,
      data.captain.phone,
      data.captain.college,
      data.team.members.length + 1, // Total size including captain
      m1.name || "", m1.email || "", m1.phone || "",
      m2.name || "", m2.email || "", m2.phone || "",
      m3.name || "", m3.email || "", m3.phone || "",
      data.project.domain || "",
      data.project.idea || "",
      data.project.technologies || "",
      data.captain.github || "",
      data.captain.linkedin || "",
      data.consent ? "Yes" : "No"
    ];
    
    // Append to sheet
    sheet.appendRow(rowData);
    
    // Return success response to the frontend
    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "Registration recorded successfully."
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Return error response
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle CORS preflight if necessary
function doOptions(e) {
  return ContentService.createTextOutput("")
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeader("Access-Control-Allow-Origin", "*")
    .setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
    .setHeader("Access-Control-Allow-Headers", "Content-Type");
}
```

### Step 4: Deploy as Web App
1. Click the blue **Deploy** button in the top right.
2. Select **New deployment**.
3. Click the gear icon next to "Select type" and choose **Web app**.
4. Description: "Hack The Doom Registration API"
5. Execute as: **Me (`ydv.sumansh@gmail.com`)**
6. Who has access: **Anyone**
7. Click **Deploy**.
8. Click **Authorize access** and approve the permissions.
9. **Copy the generated Web app URL.**

### Step 5: Connect to the Frontend
1. Open `src/config/registrationConfig.js` in the frontend codebase.
2. Paste the copied URL into `GOOGLE_APPS_SCRIPT_URL`.

```javascript
export const registrationConfig = {
  GOOGLE_APPS_SCRIPT_URL: "https://script.google.com/macros/s/AKfycb.../exec", 
};
```

### Step 6: Test
1. Run the frontend development server (`npm run dev`).
2. Fill out a dummy registration.
3. Verify that the "REGISTRATION SUCCESSFUL" screen appears.
4. Verify that the data instantly appears in your Google Sheet.
