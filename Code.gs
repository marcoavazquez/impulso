const SHEET_NAME = 'Projects';

const doPost = (e) => {
    const lock = LockService.getScriptLock();
    lock.tryLock(10000);

    try {
        const doc = SpreadsheetApp.getActiveSpreadsheet();
        let sheet = doc.getSheetByName(SHEET_NAME);

        if (!sheet) {
            sheet = doc.insertSheet(SHEET_NAME);
            sheet.appendRow(['Timestamp', 'Name', 'Email', 'Repository URL', 'Project Description']);
        }

        const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
        const nextRow = sheet.getLastRow() + 1;

        const { name, email, repoUrl, description, timestamp } = e.parameter;

        const row = [
            timestamp || new Date().toISOString(),
            name,
            email,
            repoUrl,
            description
        ];

        sheet.getRange(nextRow, 1, 1, row.length).setValues([row]);

        return ContentService
            .createTextOutput(JSON.stringify({ 'result': 'success', 'row': nextRow }))
            .setMimeType(ContentService.MimeType.JSON);
    }

    catch (e) {
        return ContentService
            .createTextOutput(JSON.stringify({ 'result': 'error', 'error': e }))
            .setMimeType(ContentService.MimeType.JSON);
    }

    finally {
        lock.releaseLock();
    }
};

const doGet = () => {
    return ContentService
        .createTextOutput('VibeFinish Google Apps Script is running. Use POST to submit form data.')
        .setMimeType(ContentService.MimeType.TEXT);
};
