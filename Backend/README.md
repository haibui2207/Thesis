

----------
# > TEST USING POSTMAN <br/>
----------
## # Pin API: http://localhost:xxxxx/api/pin <br/>
----------
### # Get all pin<br/>
>Method: GET <br/>
>URL: http://localhost:xxxxx/api/pin <br/>

### # Get pin number <br/>
>Method : GET <br/>
>URL : http://localhost:xxxxx/api/pin/getpinnumber?pin={PIN-NUMBER}&key={KEY} <br/>
>Example : http://localhost:xxxxx/api/pin/getpinnumber?pin=4&key=KIT002

### # Update pin number <br/>
>Method: POST <br/>
>URL: http://localhost:xxxxx/api/pin <br/>
>Content: 

	{
		"pin": 14,
		"key": "KIT001",
		"state": 0 or 1
	}

### # Reset all pin<br/>
>Method: POST <br/>
>URL: http://localhost:xxxxx/api/pin/resetallpin <br/>

----------
## # User API: http://localhost:xxxxx/api/user <br/>
----------
### # Get all user <br/>
>Method: GET <br/>
>URL: http://localhost:xxxxx/api/user<br/>

### # User login <br/>
>Method: POST <br/>
>URL: http://localhost:xxxxx/api/user/login <br/>
>Content:

	{
		"username": "admin",
		"password": "admin"
	}
 
### # Create new user <br/>
>Method: POST <br/>
>URL: http://localhost:xxxxx/api/user/create <br/>
>Content:

	{
		"name": "name",
		"username": "username",
		"password": "password"
	}

### # Get user info <br/>
>Method: GET <br/>
>URL: http://localhost:xxxxx/api/user/info/{userId} <br/>
>Example:  http://localhost:xxxxx/api/user/info/1

### # Get user by rfid <br/>
>Method: GET <br/>
>URL: http://localhost:xxxxx/api/user/rfid/{code} <br/>
>Example:  http://localhost:xxxxx/api/user/rfid/abcded21

### # Update user info <br/>
>Method: PUT <br/>
>URL: http://localhost:xxxxx/api/user <br/>
>Content: <br/>    

	{
		"id": 1,
		"username": "username can't change",
		"name": "new name",
		"password": "new password",
		"role": "Admin or User default",
		"rfid": "c213bcas"
	}

### # Delete user <br/>
>Method: DELETE <br/>
>URL: http://localhost:xxxxx/api/user/{userid} <br/>
>Example:  http://localhost:xxxxx/api/user/1

### # Delete all user <br/>
>Method: DELETE <br/>
>URL: http://localhost:xxxxx/api/user

----------
## # DHTController :http://localhost:xxxxx/api/dht <br/>
----------
### # Get all data <br/>
>Method: GET <br/>
>URL: http://localhost:xxxxx/api/dht

### # Get lastest record <br/>
>Method: GET <br/>
>URL: http://localhost:xxxxx/api/dht/lastestrecord

### # Add new data <br/>
>Method: POST <br/>
>URL: http://localhost:xxxxx/api/dht <br/>
>Content:

	{
		"temperature": 32,
		"humidity": 40,
		"key": "KIT001",
	}
 
### # Remove all data <br/>
>Method: DELETE <br/>
>URL: http://localhost:xxxxx/api/dht <br/>
