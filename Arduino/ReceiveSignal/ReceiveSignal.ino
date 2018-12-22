#include "wifi_info.h"
#include "myHttpClient.h"
#include "myServo.h"
#include "myBell.h"

/*
    ////////////////////////////////////////////
    //                                        //
    // Code using ESP8266 only receive signal //
    //                                        //
    ////////////////////////////////////////////
*/

const char* KIT002 = KIT_002; // Only receive signal 
const char* ssid = WIFI_SSID;
const char* password = WIFI_PASS;
const char* host = PIN_API;

Servo myServo;

int SERVO_PIN = 2; // 5V
int LIGHT_OF_LIVING_ROOM_1 = 4; // Led living room stage 1
int LIGHT_OF_BEDROOM_1 = 5; // Led bed room stage 1
int LIGHT_OF_BEDROOM_2 = 14; // Led bed room stage 2
int LIGHT_OF_LIVING_ROOM_2 = 12; // Led living room stage 2
int BELL_PIN = 13;

bool isDoorOpened = false;

/************************************************SETUP************************************************/
void setup() { 
  setupServo(myServo,SERVO_PIN);  
  pinMode(LIGHT_OF_LIVING_ROOM_1,OUTPUT);
  pinMode(LIGHT_OF_BEDROOM_1,OUTPUT);
  pinMode(LIGHT_OF_BEDROOM_2,OUTPUT);
  pinMode(LIGHT_OF_LIVING_ROOM_2,OUTPUT);
  pinMode(BELL_PIN,OUTPUT);
  //Set Baurate
  Serial.begin(115200);  
  setupWifi(ssid,password);  
}


/************************************************ LOOP ************************************************/
void loop() { 
  if (WiFi.status() == WL_CONNECTED) 
  {       
    String data = getHttpRespone(host);
    Serial.println(data);
    JsonObject& response_2 = getPinInJsonArray(data , SERVO_PIN, KIT002);    
    JsonObject& response_4 = getPinInJsonArray(data , LIGHT_OF_LIVING_ROOM_1, KIT002); 
    JsonObject& response_5 = getPinInJsonArray(data , LIGHT_OF_BEDROOM_1, KIT002); 
    JsonObject& response_12 = getPinInJsonArray(data , LIGHT_OF_BEDROOM_2, KIT002); 
    JsonObject& response_14 = getPinInJsonArray(data , LIGHT_OF_LIVING_ROOM_2, KIT002); 
    JsonObject& response_15 = getPinInJsonArray(data , BELL_PIN, KIT002); 
    
    int state_servo_pin = response_2["state"];  
    int light_of_bath_room  = response_4["state"];  
    int light_of_living_room = response_5["state"];  
    int light_of_kitchen_room = response_12["state"];  
    int light_of_bed_room = response_14["state"];  
    int state_bell = response_15["state"];  
    
    if(state_servo_pin == 1){ 
      isDoorOpened = openDoor(myServo,isDoorOpened);
    } else { 
      isDoorOpened = closeDoor(myServo,isDoorOpened);
                                                                                                                                                                                                                                                                                                                                                                                                 }
    if(light_of_bath_room == 1){ digitalWrite(LIGHT_OF_LIVING_ROOM_1,HIGH);} else { digitalWrite(LIGHT_OF_LIVING_ROOM_1,LOW);}
    
    if(light_of_living_room == 1){ digitalWrite(LIGHT_OF_BEDROOM_1,HIGH);} else { digitalWrite(LIGHT_OF_BEDROOM_1,LOW);}

    if(light_of_kitchen_room == 1){ digitalWrite(LIGHT_OF_BEDROOM_2,HIGH);} else { digitalWrite(LIGHT_OF_BEDROOM_2,LOW);}

    if(light_of_bed_room == 1){ digitalWrite(LIGHT_OF_LIVING_ROOM_2,HIGH);} else { digitalWrite(LIGHT_OF_LIVING_ROOM_2,LOW);}

    if(state_bell == 0){ digitalWrite(BELL_PIN,HIGH);} else { digitalWrite(BELL_PIN,LOW);}

    delay(1500); 
  }
  else{
    Serial.println("Connect to server Failed. Reconnecting...");    
    setupWifi(ssid,password);  
  }   
}

