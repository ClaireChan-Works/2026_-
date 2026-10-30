function doGet() {
  return ContentService.createTextOutput('報名系統已就緒，請透過活動頁面提交報名。');
}

function doPost(event) {
  try {
    var data = event.parameter;
    var spreadsheet = getOrCreateSpreadsheet_();
    var sheet = spreadsheet.getSheets()[0];

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['姓名', 'Email', '單位', '電話', '職稱', '報名時間']);
      sheet.setFrozenRows(1);
    }

    var row = sheet.getLastRow() + 1;
    sheet.getRange(row, 4).setNumberFormat('@');
    sheet.getRange(row, 1, 1, 6).setValues([[
      data.name || '',
      data.email || '',
      data.department || '',
      String(data.phone || ''),
      data.title || '',
      new Date()
    ]]);

    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function getOrCreateSpreadsheet_() {
  var properties = PropertiesService.getScriptProperties();
  var spreadsheetId = properties.getProperty('SPREADSHEET_ID');
  if (spreadsheetId) {
    return SpreadsheetApp.openById(spreadsheetId);
  }

  var files = DriveApp.getFilesByName('2026_公司旅遊');
  var spreadsheet;
  if (files.hasNext()) {
    spreadsheet = SpreadsheetApp.open(files.next());
  } else {
    spreadsheet = SpreadsheetApp.create('2026_公司旅遊');
  }
  properties.setProperty('SPREADSHEET_ID', spreadsheet.getId());
  return spreadsheet;
}