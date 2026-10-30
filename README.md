# 2026 快樂公司員工旅遊河內行

活動報名網站，部署於 GitHub Pages。`spec/` 僅供專案製作參考，不納入網站儲存庫。

## 網站

GitHub Pages 網址：https://clairechan-works.github.io/2026_-/

## 報名資料

報名欄位依序為姓名、Email、單位、電話、職稱。Google Apps Script 會在 Google Drive 建立或使用名為 `2026_公司旅遊` 的試算表，第一列為標題，並將電話欄設定為純文字。

Apps Script 部署為網頁應用程式後，將部署網址填入 `index.html` 的 `SCRIPT_URL` 常數即可啟用報名送出。