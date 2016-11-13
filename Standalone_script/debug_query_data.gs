function debug() {

  var result;
  
  result = doPost(
    {
      "parameter":{"email":"ABC@gmail.com"} 
    }
  );
  
  Logger.log("Result: %s", result );
 
}