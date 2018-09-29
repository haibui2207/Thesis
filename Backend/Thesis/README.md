

# TUTORIAL USING SERVER API REQUIRE SQL<br/>
----------

----------

# > TEST USING POSTMAN <br/>

----------

----------
## # PinController :http://localhost:xxxxx/api/pin <br/>
----------
>PinModel <br/> 

    {
    	int pin; // 1 to 20 
    	int state;  // 0 or 1 default 0 
        string key; // KIT001 || KIT002
    } 

### # GET ALL PIN<br/>
>URL : http://localhost:xxxxx/api/pin <br/>
Method : GET <br/>

### # RESET ALL PIN<br/>
>URL : http://localhost:xxxxx/api/pin/resetallpin <br/>
Method : POST <br/>

### #GET A PIN ( example pin = 15 ) <br/>
>URL : http://localhost:xxxxx/api/pin/15 <br/>
Method : GET <br/>

### #CHANGE STATE OF PIN <br/>
>URL : http://localhost:xxxxx/api/pin <br/>
Method : POST <br/>
BODY: <br/>

    {     	
        "pin": 16, 
    	"state": 1,
        "key": "KIT001"
    } 

----------
## # UserController :http://localhost:xxxxx/api/user <br/>
----------
>PinModel <br/>

    { 
    	int id; 
    	string name; 
    	string rfid; 
    } 

### # GET A User Using RFID Code <br/>
>URL : http://localhost:xxxxx/api/user/{RFID Code} <br/>
Method : GET <br/>

### #ADD NEW USER <br/>
>URL : http://localhost:xxxxx/api/user <br/>
Method : POST <br/>
BODY: <br/>

	{ 
		"name": "ABC",
		"rfid": "CODE"
	} 
 
### #REMOVE A USER <br/>
>URL : http://localhost:xxxxx/api/user <br/>
Method : DELETE <br/>
BODY: <br/>

    { 
    	"name": "ABC", 
    	"rfid": "CODE" 
    } 

----------
## # DHTController :http://localhost:xxxxx/api/dht <br/>
----------
>PinModel <br/>

    { 
        string temperature; 
        string humidity; 
    } 

### # GET DATA <br/>
>URL : http://localhost:xxxxx/api/dht <br/>
Method : GET <br/>

### #ADD NEW DATA <br/>
>URL : http://localhost:xxxxx/api/dht <br/>
Method : POST <br/>
BODY: <br/>

    { 
        "temperature": 32,
        "humidity": 40
    } 
 
### #REMOVE A USER <br/>
>URL : http://localhost:xxxxx/api/dht <br/>
Method : DELETE <br/>