# VibeFinish Landing Page

A frontend-only landing page for a company that completes and deploys vibe-coded applications. Hosted on GitHub Pages.

## Features

- Dark/Light theme toggle with persistence
- Orange color scheme as primary accent
- Responsive design for all devices
- Form submission to Google Sheets (no backend required)
- Smooth animations and transitions

## Project Structure

```
fvtp/
├── index.html          # Main landing page
├── styles.css          # All styles with theme support
├── script.js           # Form handling and theme toggle
├── Code.gs             # Google Apps Script for Sheets integration
├── appsscript.json    # Google Apps Script configuration
└── README.md           # This file
```

## Setting Up Google Sheets Integration

### Step 1: Create a Google Spreadsheet

1. Go to [sheets.google.com](https://sheets.google.com)
2. Create a new spreadsheet
3. Name the first sheet tab "Projects"
4. Add these headers in row 1:
   - Column A: Timestamp
   - Column B: Name
   - Column C: Email
   - Column D: Repository URL
   - Column E: Project Description

### Step 2: Set Up Google Apps Script

1. In your Google Spreadsheet, go to **Extensions** > **Apps Script**
2. Delete any existing code in the editor
3. Copy the content from `Code.gs` and paste it into the editor
4. Click the **Save** icon (or press Ctrl+S)
5. Click the **Deploy** button > **New deployment**
6. Click the **Select type** gear icon > **Web app**
7. Configure:
   - Description: "VibeFinish Form"
   - Execute as: "Me"
   - Who has access: "Anyone" (important!)
8. Click **Deploy**
9. Copy the **Web app URL** (you'll need this)

### Step 3: Connect Frontend to Google Apps Script

1. Open `script.js` in your project
2. Find this line:
   ```javascript
   const SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL';
   ```
3. Replace `YOUR_GOOGLE_APPS_SCRIPT_URL` with your web app URL from Step 2

### Step 4: Test the Form

1. Open your landing page
2. Fill out the form
3. Submit and check your Google Sheet for new data

## Deploying to GitHub Pages

1. Create a new repository on GitHub (or use an existing one)
2. Push all files to the repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/your-repo.git
   git push -u origin main
   ```
3. Go to repository **Settings** > **Pages**
4. Under "Build and deployment":
   - Source: Select **Deploy from a branch**
   - Branch: Select **main** (or **master**)
   - Folder: Select **/(root)**
5. Click **Save**
6. Wait 1-2 minutes and your site will be live at `https://yourusername.github.io/your-repo/`

## Customization

### Changing Colors

All colors are defined in `styles.css` under the `:root` selector. The primary orange color is:

```css
--primary: #ff6b2c;
--primary-hover: #e55a1f;
```

Change these values to match your brand.

### Updating Logo

Edit the logo text in `index.html`:
- Line ~56: `<div class="logo">Vibe<span>Finish</span></div>`

### Updating Service Text

Edit the service cards in `index.html` starting around line ~95.

## Troubleshooting

### Form Not Submitting
- Make sure the Google Apps Script is deployed with "Anyone" access
- Verify the URL in `script.js` matches exactly (no extra spaces)
- Check browser console for errors

### Google Sheets Not Receiving Data
- Open Apps Script and check the Execution log
- Make sure the sheet name matches exactly (`Projects`)

### Theme Not Persisting
- Check that localStorage is not blocked in the browser

## License

MIT License - Feel free to use this for your own projects!
