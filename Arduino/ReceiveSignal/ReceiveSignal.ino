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

int SERVO_PIN = 2;
int LIGHT_OF_BATH_ROOM = 4;
int LIGHT_OF_LIVING_ROOM = 5;
int LIGHT_OF_KITCHEN = 12;
int LIGHT_OF_GATE = 13;
int LIGHT_OF_BED_ROOM = 14;
int BELL_PIN = 15;

bool isDoorOpened = false;

/************************************************SETUP************************************************/
void setup() { 
  setupServo(myServo,SERVO_PIN);  
  pinMode(LIGHT_OF_BATH_ROOM,OUTPUT);
  pinMode(LIGHT_OF_LIVING_ROOM,OUTPUT);
  pinMode(LIGHT_OF_KITCHEN,OUTPUT);
  pinMode(LIGHT_OF_GATE,OUTPUT);
  pinMode(LIGHT_OF_BED_ROOM,OUTPUT);
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
    JsonObject& response_4 = getPinInJsonArray(data , LIGHT_OF_BATH_ROOM, KIT002); 
    JsonObject& response_5 = getPinInJsonArray(data , LIGHT_OF_LIVING_ROOM, KIT002); 
    JsonObject& response_12 = getPinInJsonArray(data , LIGHT_OF_KITCHEN, KIT002); 
    JsonObject& response_13 = getPinInJsonArray(data , LIGHT_OF_GATE, KIT002); 
    JsonObject& response_14 = getPinInJsonArray(data , LIGHT_OF_BED_ROOM, KIT002); 
    JsonObject& response_15 = getPinInJsonArray(data , BELL_PIN, KIT002); 
    
    int state_servo_pin = response_2["state"];  
    int light_of_bath_room  = response_4["state"];  
    int light_of_living_room = response_5["state"];  
    int light_of_kitchen_room = response_12["state"];  
    int light_of_gate_room = response_13["state"];  
    int light_of_bed_room = response_14["state"];  
    int state_bell = response_15["state"];  
    
    if(state_servo_pin == 1){ 
      isDoorOpened = openDoor(myServo,isDoorOpened);
    } else { 
      isDoorOpened = closeDoor(myServo,isDoorOpened);
                                                                                                                                                                                                                                                                                                                                                                                                 }
    if(light_of_bath_room == 1){ digitalWrite(LIGHT_OF_BATH_ROOM,HIGH);} else { digitalWrite(LIGHT_OF_BATH_ROOM,LOW);}
    
    if(light_of_living_room == 1){ digitalWrite(LIGHT_OF_LIVING_ROOM,HIGH);} else { digitalWrite(LIGHT_OF_LIVING_ROOM,LOW);}

    if(light_of_kitchen_room == 1){ digitalWrite(LIGHT_OF_KITCHEN,HIGH);} else { digitalWrite(LIGHT_OF_KITCHEN,LOW);}

    if(light_of_gate_room == 1){ digitalWrite(LIGHT_OF_GATE,HIGH);} else { digitalWrite(LIGHT_OF_GATE,LOW);}

    if(light_of_bed_room == 1){ digitalWrite(LIGHT_OF_BED_ROOM,HIGH);} else { digitalWrite(LIGHT_OF_BED_ROOM,LOW);}

    if(state_bell == 0){ digitalWrite(BELL_PIN,HIGH);} else { digitalWrite(BELL_PIN,LOW);}

    delay(5000); 
  }
  else{
    Serial.println("Connect to server Failed. Reconnecting...");    
    setupWifi(ssid,password);  
  }   
}

