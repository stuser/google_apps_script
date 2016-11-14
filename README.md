# Google Apps Script 三種寫法:

1.Standalone script
● Google Drive > Create > More > Script
範例:提供查詢問卷結果頁面(data source: google sheet)
https://gist.github.com/stuser/5d492204bd6cbaf4e39543f52c7eeed1

2.Spreadsheet-bound script
● Tools >Script Editor
範例:在問卷表單送出後,寄發結果到填卷者e-mail信箱
https://gist.github.com/stuser/b14bcd18b657371b1cdc312d306e6e2a
*bound script的缺點：無法與form sheet儲存格的函數同時作用，因為trigger event (ex. OnCommit)觸發時，儲存格函數尚未更新新資料。

3.Sites-bound script
● More > Manage Site > Apps Scripts > Add new script
