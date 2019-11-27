function myFunction() {
	var APIkey = 'YOUR API KEY';
	var id = "YOUR SPREADSHEET ID";
	var spreadSheet = SpreadsheetApp.openById(id); 
	var sheet = spreadSheet.getSheetByName("YOUR SPREADSHEET NAME");

	// parameters for data in google spreadsheet
	var row = 1;
	var cell = 1;
	var search;

	while(true){
		search = sheet.getRange(row,cell).getValue();
		if(search != ''){
			var data;
			data = getData(search , APIkey);
			Logger.log(data);
			sheet.getRange(row,cell+3).setValue(data['add']);
			sheet.getRange(row,cell+4).setValue(data['location']);
			row++;
		}else{
		  break;
		}
	  }
	}

function getData(search, key) {
	var data = {add: null, name: null};
	var url = 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input='+ search + '&inputtype=textquery&fields=formatted_address,name&language=ja&key=' + key;

	var response = UrlFetchApp.fetch(url);
	var json = JSON.parse(response.getContentText());
	Logger.log(json);

	try{
		var result = json.candidates[0];
		data['add'] = result.formatted_address;
		data['location'] = result.name;
		}
	catch(e){
		Logger.log(e.toString());
	  }
	return data;
}
