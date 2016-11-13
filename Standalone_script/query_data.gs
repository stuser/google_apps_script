function doGet(e) {
  return doPost(e);
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

/*----------------------------------------------------------------------------------------------
 問卷調查表_範例一
 sheet key: XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
 URL: https://script.google.com/macros/s/XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/exec
-----------------------------------------------------------------------------------------------*/

function doPost(e) {
  var query_email = e.parameter.email;
  var SpreadSheet = SpreadsheetApp.openById("xxxxxxxxxxxxx your sheet key xxxxxxxxxxxxxxxxxx");
  var Sheet = SpreadSheet.getSheetByName("raw1");
  var Lastrow = Sheet.getLastRow();
  
  if(query_email=="" || query_email== null){
    query_email = "abc@gmail.com";
  }
  
  var query_data = Sheet.getRange( 1, 1, Lastrow, 6).getValues(); //getRange(row, column, numRows, numColumns)
  
  //取query_data[0]產生欄位
  var col_row = query_data[0];
  var col_keys = Object.keys(col_row); //colums number: keys:0~5
  
  var thead ="<thead>";
  for(var c = 0 ; c < col_keys.length ; c++) {
    thead += "<th>"+col_row[c]+"</th>";
  }
  thead += "</thead>";
   
  var tbody = "<tbody>";
  for(var i = 1 ; i< query_data.length ; i++){ //i:row number => row 0 為欄位名稱
    var row = query_data[i];
    var keys = Object.keys(row); //colums number: keys:0~5
    
    var debug_str = "row[keys[1]]: " + row[keys[1]].toString().trim() + " ; query_email: " + query_email.toString().trim();
    
    if(row[keys[1]].toString().trim()==query_email.toString().trim()){
      tbody += "<tr>";    
      for(var j = 0 ; j < keys.length ; j++) {
        var rowvalue = row[keys[j]];
        tbody += ("<td>" + rowvalue + "</td>" );
      }
      tbody += "</tr>";
    }//end if
    
  }//for i loop
  tbody += "</tbody>";
  
  var query_table = "<table class='datalist'>";
      query_table += thead;
      query_table += tbody;
      query_table += "</table>";
    
  var temp = HtmlService.createTemplateFromFile("index");
  //temp.query_email = query_email;
  temp.query_table = query_table;
  temp.debug_str = debug_str;
  return temp.evaluate();
}