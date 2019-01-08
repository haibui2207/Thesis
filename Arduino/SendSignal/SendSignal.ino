#include "wifi_info.h"
#include "myHttpClient.h"
#include "DHT.h"  

/*
    ////////////////////////////////////////////
    //                                        //
    //   Code using ESP8266 send signal       //
    //                                        //
    ////////////////////////////////////////////
*/

const char* KIT002 = KIT_002; // Send signal to kit only receive signal 
const char* ssid = WIFI_SSID;
const char* password = WIFI_PASS;
const char* pinAPI = PIN_API;
const char* dhtAPI = DHT_API;

// GPIO of kit receive
int LIGHT_OF_LIVING_ROOM_1 = 4; // Led living room stage 1
int LIGHT_OF_BEDROOM_1 = 5; // Led bed room stage 1
int LIGHT_OF_LIVING_ROOM_2 = 12; // Led living room stage 2
int LIGHT_OF_BEDROOM_2 = 14; // Led bed room stage 2
int BELL_PIN = 13;

// GPIO of kit send signal
int SENSOR_FIRE = 4;
int SENSOR_LIGHT = 5;
int DHTPIN = 10; 
int DHTTYPE = DHT11;
//int SENSOR_RAIN = 12;

DHT dht(DHTPIN, DHTTYPE);
/************************************************SETUP************************************************/
void setup() { 
  dht.begin();
  pinMode(DHTPIN,INPUT);
  pinMode(SENSOR_LIGHT,INPUT);
  pinMode(SENSOR_FIRE,INPUT);
  //Set Baurate
  Serial.begin(115200);  
  setupWifi(ssid,password);  
}


/************************************************ LOOP ************************************************/
void loop() { 
  if (WiFi.status() == WL_CONNECTED) 
  {       
     int sensor_light_status = digitalRead(SENSOR_LIGHT);
     int sensor_fire_status = digitalRead(SENSOR_FIRE);
     float h = dht.readHumidity();    //Đọc độ ẩm
     float t = dht.readTemperature(); //Đọc nhiệt độ
       Serial.print("nhiet do: ");
     Serial.println(t);
     Serial.print("do am: ");
     Serial.println(h);
     static char humi[10];
     static char temp[10];
     dtostrf(h,6,2,humi);
     dtostrf(t,6,2,temp);
   
   
     String data = getHttpRespone(pinAPI);
////     Serial.println(data);
     JsonObject& enable_automation_response = getPinInJsonArray(data , 1, KIT002);
     JsonObject& response_4 = getPinInJsonArray(data , LIGHT_OF_LIVING_ROOM_1, KIT002); 
     JsonObject& response_5 = getPinInJsonArray(data , LIGHT_OF_BEDROOM_1, KIT002);   
     JsonObject& response_12 = getPinInJsonArray(data , LIGHT_OF_LIVING_ROOM_2, KIT002); 
     JsonObject& response_14 = getPinInJsonArray(data , LIGHT_OF_BEDROOM_2, KIT002); 
//     
     int enable_automation_state = enable_automation_response["state"]; 
     int light_of_living_room_1  = response_4["state"];  
     int light_of_bedroom_1 = response_5["state"];  
     int light_of_living_room_2 = response_12["state"];  
     int light_of_bedroom_2 = response_14["state"];  
     
     if(enable_automation_state == 1) {
       if (sensor_light_status == HIGH){
         if(light_of_living_room_1 == 0) postData(pinAPI,"{\"pin\":" + String(LIGHT_OF_LIVING_ROOM_1) + ",\"state\":1,\"key\":\"" + String(KIT002) + "\"}");    
         if(light_of_bedroom_1 == 0) postData(pinAPI,"{\"pin\":" + String(LIGHT_OF_BEDROOM_1) + ",\"state\":1,\"key\":\"" + String(KIT002) + "\"}");   
         if(light_of_living_room_2 == 0) postData(pinAPI,"{\"pin\":" + String(LIGHT_OF_LIVING_ROOM_2) + ",\"state\":1,\"key\":\"" + String(KIT002) + "\"}");     
         if(light_of_bedroom_2 == 0) postData(pinAPI,"{\"pin\":" + String(LIGHT_OF_BEDROOM_2) + ",\"state\":1,\"key\":\"" + String(KIT002) + "\"}");   
       } else {
         if(light_of_living_room_1 == 1) postData(pinAPI,"{\"pin\":" + String(LIGHT_OF_LIVING_ROOM_1) + ",\"state\":0,\"key\":\"" + String(KIT002) + "\"}");     
         if(light_of_bedroom_1 == 1) postData(pinAPI,"{\"pin\":" + String(LIGHT_OF_BEDROOM_1) + ",\"state\":0,\"key\":\"" + String(KIT002) + "\"}");   
         if(light_of_living_room_2 == 1) postData(pinAPI,"{\"pin\":" + String(LIGHT_OF_LIVING_ROOM_2) + ",\"state\":0,\"key\":\"" + String(KIT002) + "\"}");     
         if(light_of_bedroom_2 == 1) postData(pinAPI,"{\"pin\":" + String(LIGHT_OF_BEDROOM_2) + ",\"state\":0,\"key\":\"" + String(KIT002) + "\"}");    
       }
     }

     if (sensor_fire_status == LOW){
       postData(pinAPI,"{\"pin\":" + String(BELL_PIN) + ",\"state\":1,\"key\":\"" + String(KIT002) + "\"}");     // Open BELL_PIN
     } else if (isnan(t) == false){
        if(t >= 35 || t <= 20){
          postData(pinAPI,"{\"pin\":" + String(BELL_PIN) + ",\"state\":1,\"key\":\"" + String(KIT002) + "\"}");     // Open BELL_PIN
        } else {
          postData(pinAPI,"{\"pin\":" + String(BELL_PIN) + ",\"state\":0,\"key\":\"" + String(KIT002) + "\"}");     // Close BELL_PIN
        }
     } else {
        postData(pinAPI,"{\"pin\":" + String(BELL_PIN) + ",\"state\":0,\"key\":\"" + String(KIT002) + "\"}");     // Close BELL_PIN
     }


     postData(dhtAPI,"{\"temperature\":" + String(t) + ",\"humidity\":" + String(h) + ",\"key\":\"" + String(KIT002) + "\"}");
    
//     delay(2000); 
  }
  else{
    Serial.println("Connect to server Failed. Reconnecting...");    
    setupWifi(ssid,password);  
  }   
}

