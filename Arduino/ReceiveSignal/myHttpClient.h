#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>


void setupWifi(const char* ssid,const char* password);
void displayStringAsJson(String data);                              //just show data
void displayStringAsJsonArray(String data);                         //just show data as Array
JsonObject& convertStringToJson(String data);                       //get data
JsonObject& getIndexAtJsonArray(String data , int index);           //get data in Array
JsonObject& getPinInJsonArray(String data, int pin, const char* kitKey); //get data in array base on pin number and kit key
String getHttpRespone(String URL);                                  //get response as String
String getDataByPinAndKey(String URL ,int pin, const char* key);          //get data base on pin number and kit key
void postData(const char* host,String data);                        //post 


/************************************************SETUP WIFI************************************************/
void setupWifi(const char* ssid,const char* password){
  Serial.println();
  Serial.print("Connecting to ");                             
  Serial.println(ssid);
  
  //Connect to Wifi
  WiFi.begin(ssid,password);  
                  
  //Check if connect fail
  while(WiFi.status()!= WL_CONNECTED){                                  
    delay(1000);
    Serial.println("Can't connect. Reconnecting...\n");
  }
  
  //If connect success
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());                                 
}

/***************************FUNCTION DISPLAY AND CONVERT STRING TO JSONOBJECT***************************/
void displayStringAsJson(String data){
  int len = data.length() + 1;
  char buf[len];
  data.toCharArray(buf, len);  
  
  const size_t bufferSize = JSON_ARRAY_SIZE(20) + 20*JSON_OBJECT_SIZE(2);
  DynamicJsonBuffer jsonBuffer(bufferSize);
  JsonObject& obj = jsonBuffer.parseObject(data);  
  //check parse
  if (!obj.success()) Serial.println("parseObject() failed");
    
  obj.prettyPrintTo(Serial);
  Serial.println();
}

void displayStringAsJsonArray(String data){
  int len = data.length() + 1;
  char buf[len];
  data.toCharArray(buf, len);   
  
  const size_t bufferSize = JSON_ARRAY_SIZE(20) + 20*JSON_OBJECT_SIZE(2);
  DynamicJsonBuffer jsonBuffer(bufferSize);
  JsonArray& root = jsonBuffer.parseArray(data);  
  //check parse
  if (!root.success()) Serial.println("parseObject() failed");
  
  root.prettyPrintTo(Serial);
  Serial.println();
}

JsonObject& convertStringToJson(String data){
  int len = data.length() + 1;
  char buf[len];
  data.toCharArray(buf, len);  
  
  const size_t bufferSize = JSON_ARRAY_SIZE(20) + 20*JSON_OBJECT_SIZE(2);
  DynamicJsonBuffer jsonBuffer(bufferSize);
  JsonObject& obj = jsonBuffer.parseObject(data);  
  //check parse
  if (!obj.success()) Serial.println("parseObject() failed");
    
  return obj;
}

JsonObject& getIndexAtJsonArray(String data , int index){
  int len = data.length() + 1;
  char buf[len];
  data.toCharArray(buf, len);   
  
  const size_t bufferSize = JSON_ARRAY_SIZE(20) + 20*JSON_OBJECT_SIZE(2);
  DynamicJsonBuffer jsonBuffer(bufferSize);
  JsonArray& root = jsonBuffer.parseArray(data);  
  //check parse
  if (!root.success()) Serial.println("parseObject() failed");
    
  JsonObject& obj = root[index];   
  return obj;
}

JsonObject& getPinInJsonArray(String data, int pin, const char* kitKey){
  int len = data.length() + 1;
  int i = 0;
  char buf[len];
  data.toCharArray(buf, len);   
  
  const size_t bufferSize = JSON_ARRAY_SIZE(20) + 20*JSON_OBJECT_SIZE(2);
  DynamicJsonBuffer jsonBuffer(bufferSize);
  JsonArray& root = jsonBuffer.parseArray(data);  
  //check parse
  if (!root.success()) Serial.println("parseObject() failed");
  int rootLength = root.measureLength();
  Serial.println(rootLength);
  for(i; i < rootLength ; i++ ){
    int pinSelected = root[i]["pin"];
    const char* keySelected = root[i]["key"];
    if(pinSelected == pin && String(keySelected) == String(kitKey)) break;
  }
  JsonObject& obj = root[i];
  return obj;
}

/************************************************GET DATA************************************************/
String getHttpRespone(String URL){
  String data; 
  Serial.print("Connecting to host: ");
  Serial.println(URL); 
  HTTPClient http;  
  http.begin(URL);  
  int httpCode = http.GET();    
  if (httpCode > 0) {         
    data = http.getString();        
  } 
  http.end(); 
  return data;
}

/************************************************GET DATA BY PIN AND KITKEY************************************************/
String getDataByPinAndKey(String URL ,int pin,const char* key){
  String data; 
  String newURL = URL + "/getpinnumber?pin=" + String(pin) + "&key=" + String(key) ;
  Serial.print("Connecting to host: ");
  Serial.println(newURL); 
  HTTPClient http;  
  http.begin(newURL);  
  int httpCode = http.GET();    
  if (httpCode > 0) {         
    data = http.getString();        
  } 
  http.end(); 
  return data;
}

/************************************************POSST DATA************************************************/
void postData(const char* host,String data){
  HTTPClient http;  
  http.begin(host);
  http.addHeader("Content-Type", "application/json");
  int httpCode = http.POST(data);   
  String payload = http.getString(); 
  http.end();  
}

