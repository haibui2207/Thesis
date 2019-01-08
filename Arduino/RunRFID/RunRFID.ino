#include "wifi_info.h"
#include "myHttpClient.h"
#include "myRFID.h"
#include "myOLED.h"

/*
    ////////////////////////////////////////////
    //                                        //
    //   Code using ESP8266 Running RFID      //
    //                                        //
    ////////////////////////////////////////////
*/

const char* KIT002 = KIT_002; // Only receive signal 
const char* ssid = WIFI_SSID;
const char* password = WIFI_PASS;
const char* userAPI = USER_API;
const char* pinAPI = PIN_API;

bool isDoorOpen = false;
int led = 10;

// used pin : 4, 5, 2, 12,13,14,15
/************************************************ SETUP ************************************************/
void setup() {  
  pinMode(led,OUTPUT);
  //Set Baurate
  Serial.begin(115200);  
  setupWifi(ssid,password);
  setupOled();  
  setupRfid();   
}

/************************************************LOOP************************************************/
void loop() { 
  if (WiFi.status() == WL_CONNECTED) 
  {         
    String rfid_content = startRFID();  
    if(rfid_content == "") {
      startOled(35, 25, "WELCOME"); 
      delay(2000); //important
      return;
    }
    Serial.print("RFID content : ");
    Serial.println(rfid_content);

    //GET 
    String URL = String(userAPI) + "/rfid/"; 
    URL.concat(rfid_content);
    Serial.print("URL : ");
    Serial.println(URL);
    String data = getHttpRespone(URL); 
    if(data == ""){
      Serial.println("No data response");
      startOled(35, 25, "INVALID USER");
      delay(2000);
      return;
    }
    JsonObject& control = convertStringToJson(data); 
//    control.prettyPrintTo(Serial);
//    Serial.println();
    String rfid_response = control["rfid"];
    if(rfid_response == rfid_content){
      String username = control["name"];
      startOled(35, 15, "WELCOME",35, 35, String(username));  
      digitalWrite(led,HIGH);
      if(isDoorOpen == true){
        postData(pinAPI,"{\"pin\":2,\"state\":0,\"key\":\"" + String(KIT002) + "\"}");     // Close door
        isDoorOpen = false;
      } 
      else {
        postData(pinAPI,"{\"pin\":2,\"state\":1,\"key\":\"" + String(KIT002) + "\"}");     // Open door
        isDoorOpen = true;
      }
      delay(2000);
    }
    else{
      display.clear();
      display.drawString(35, 25, "INVALID USER");
      display.display();
      Serial.println("Invalid USER");
      delay(2000);
    }  
    digitalWrite(led,LOW);
  }
  else{
    Serial.println("Connect to server Failed. Reconnecting...");    
    setupWifi(ssid,password);  
  }   
}


