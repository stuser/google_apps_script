function onCommit(){
 
  var SpreadSheet = SpreadsheetApp.openById("xxxxxxx your sheet key xxxxxxxxxxxxxxx");
  var Sheet = SpreadSheet.getSheetByName("raw1");
  var Lastrow = Sheet.getLastRow(); 
  var query_data = Sheet.getRange( Lastrow, 1, 1, 6).getValues(); //colum: A~H ; getRange(row, column, numRows, numColumns)

  var EMAIL_SENT = "EMAIL_SENT"; //email sent flag, Prevents sending duplicates.
  
//欄位順序: 時間戳記, User e-mail, 1.問題一?, 2.問題二?, 3.問題三?, email_sent
  var timestamp = getFormatDate(new Date(query_data[0][0]));  
  var to_email  = query_data[0][1];
  var q1        = query_data[0][2];
  var q2        = query_data[0][3];
  var q3        = query_data[0][4];
  var emailSent= query_data[0][5];

  var htmlBody = getHtmlBody(timestamp,to_email,q1,q2,q3);
  
  //generate HTML
  var temp = HtmlService.createTemplateFromFile("email_template");
  temp.htmlBody = htmlBody;
  var htmlcontext = temp.evaluate().getContent();
  
    if (emailSent != EMAIL_SENT) {  // Prevents sending duplicates
      var subject = "Sending emails from a Spreadsheet";
      var message = "google form last result record.";
      MailApp.sendEmail(to_email, subject, message,{from: 'stuser.tc@gmail.com', htmlBody:htmlcontext});
      
      Sheet.getRange(Lastrow, 6).setValue(EMAIL_SENT);
      // Make sure the cell is updated right away in case the script is interrupted
      SpreadsheetApp.flush();
    }  
}

function getFormatDate(date) {
  return Utilities.formatDate(date, "GMT+8", "yyyy/MM/dd HH:mm:ss"); //台北時區 GMT+8小時
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function getHtmlBody(timestamp,to_email,q1,q2,q3){
   var htmlBody = "sending email test: <br/>";
       htmlBody += "<table class='datalist'>";
       htmlBody += "<thead>";
       htmlBody += "<th>時間戳記</th><th>e-mail</th><th>問題一</th><th>問題二</th><th>問題三</th>";
       htmlBody += "</thead>";
       htmlBody += "<tbody>";
       htmlBody += "<tr><td>"+timestamp+"</td><td>"+to_email+"</td><td>"+q1+"</td><td>"+q2+"</td><td>"+q3+"</td></tr>";
       htmlBody += "</tbody>";
       htmlBody += "</table>";

  return htmlBody;
}