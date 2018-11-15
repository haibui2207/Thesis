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
// SERVO_PIN = 2;
// LIGHT_OF_BATH_ROOM = 4;
// LIGHT_OF_LIVING_ROOM = 5;
// LIGHT_OF_KITCHEN = 12;
// LIGHT_OF_GATE = 13;
// LIGHT_OF_BED_ROOM = 14;
// BELL_PIN = 15;

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
     static char humi[10];
     static char temp[10];
     dtostrf(h,6,2,humi);
     dtostrf(t,6,2,temp);
    
     String data = getHttpRespone(pinAPI);
//     Serial.println(data);
     JsonObject& enable_automation_response = getPinInJsonArray(data , 1, KIT002);
     JsonObject& response_4 = getPinInJsonArray(data , 4, KIT002); 
     JsonObject& response_5 = getPinInJsonArray(data , 5, KIT002);   
     JsonObject& response_12 = getPinInJsonArray(data , 12, KIT002); 
     JsonObject& response_13 = getPinInJsonArray(data , 13, KIT002); 
     JsonObject& response_14 = getPinInJsonArray(data , 14, KIT002); 
     
     int enable_automation_state = enable_automation_response["state"]; 
     int light_of_bath_room  = response_4["state"];  
     int light_of_living_room = response_5["state"];  
     int light_of_kitchen_room = response_12["state"];  
     int light_of_gate_room = response_13["state"];  
     int light_of_bed_room = response_14["state"]; 
     
     if(enable_automation_state == 1) {
       if (sensor_light_status == HIGH){
         if(light_of_living_room == 0) postData(pinAPI,"{\"pin\":5,\"state\":1,\"key\":\"" + String(KIT002) + "\"}");    
         if(light_of_kitchen_room == 0) postData(pinAPI,"{\"pin\":12,\"state\":1,\"key\":\"" + String(KIT002) + "\"}");   
         if(light_of_gate_room == 0) postData(pinAPI,"{\"pin\":13,\"state\":1,\"key\":\"" + String(KIT002) + "\"}");     
         if(light_of_bath_room == 1) postData(pinAPI,"{\"pin\":4,\"state\":0,\"key\":\"" + String(KIT002) + "\"}");   
         if(light_of_bed_room == 1) postData(pinAPI,"{\"pin\":14,\"state\":0,\"key\":\"" + String(KIT002) + "\"}");    
       } else {
         if(light_of_living_room == 1) postData(pinAPI,"{\"pin\":5,\"state\":0,\"key\":\"" + String(KIT002) + "\"}");     
         if(light_of_kitchen_room == 1) postData(pinAPI,"{\"pin\":12,\"state\":0,\"key\":\"" + String(KIT002) + "\"}");   
         if(light_of_gate_room == 1) postData(pinAPI,"{\"pin\":13,\"state\":0,\"key\":\"" + String(KIT002) + "\"}");     
         if(light_of_bath_room == 1) postData(pinAPI,"{\"pin\":4,\"state\":0,\"key\":\"" + String(KIT002) + "\"}");     
         if(light_of_bed_room == 1) postData(pinAPI,"{\"pin\":14,\"state\":0,\"key\":\"" + String(KIT002) + "\"}"); 
       }
     }

     if (sensor_fire_status == LOW || t >= 35 || t <= 20){
       postData(pinAPI,"{\"pin\":15,\"state\":1,\"key\":\"" + String(KIT002) + "\"}");     // Open BELL_PIN
     } else {
        postData(pinAPI,"{\"pin\":15,\"state\":0,\"key\":\"" + String(KIT002) + "\"}");     // Close BELL_PIN
     }

     postData(dhtAPI,"{\"temperature\":" + String(t) + ",\"humidity\":" + String(h) + ",\"key\":\"" + String(KIT002) + "\"}");
    
     delay(2000); 
  }
  else{
    Serial.println("Connect to server Failed. Reconnecting...");    
    setupWifi(ssid,password);  
  }   
}

