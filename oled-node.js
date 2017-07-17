/**
* Node script for showing one image from a json file containing:
* [{'content': '01001100','columns': 4}]
* on an Onion Omega2 Plus oled
*
* https://github.com/lisa-fehr/onion-microcontroller
**/

var url = "https://warfehr.com/oled-msg";

var oledExp = require("/usr/bin/node-oled-exp");
var interval = 10 * 1000;
var screen_max = 7; // max pages/rows on the oled

//Initialize
oledExp.init();
// Set mode for pages
oledExp.setMemoryMode(2);
// Set columns to show images vs text
oledExp.setImageColumns();

console.log("Updating message every " + interval + " milliseconds.");
                                                                     
var showPicture = () => {                                            
  return new Promise ( function(resolve, reject) {                   
    setInterval( () => {                                             
      console.log("Loading message");                               
      oledExp.clear();                                               
      var request = require("request");                              
      request(url, function (err, response, data) {                  
                                                                     
        // catch errors                                              
        if (err) {                                                   
          console.log(err);                                          
          return;                                                    
        }                                                            
        if (response.statusCode !== 200) {                           
          console.log('Error. Status code: ' + response.statusCode); 
          return;                                                    
        }                                                           
                                                                    
        // parse the json contents                                   
        var jsonContent = JSON.parse(data);                          
        var item = jsonContent[0];                                   
        var content = item.content;                                  
        var digits = content.split("");                              
                                                                     
        // split the 0s and 1s by the max columns                    
        var max = item.columns;                                      
                                                                     
        var y = 0;                                                   
        var x = 0;                                                   
                                                                     
        digits.forEach(function(digit) {                             
                                                                     
          if (digit == 1) {                                          
                                                                     
            oledExp.writeByte(0xff);                                 
            oledExp.writeByte(0xff);                                 
            oledExp.writeByte(0xff);                                 
                                                                     
          } else {                                                  
                                                                    
            oledExp.writeByte(0x00);                                 
            oledExp.writeByte(0x00);                                 
            oledExp.writeByte(0x00);                                 
          }                                                          
                                                                     
          x+=1;                                                      
                                                                     
          // reset the colums, then advance the row count and cursor position
          if (x == max) {                                                    
            x = 0;                                                           
            y+=1;                                                            
            oledExp.setCursorByPixel(y,0);                                   
          }                                                                  
          // prevent errors if the image doesn't fit the screen              
          if (y == screen_max) {                                             
            return;                                                          
          }                                                                  
        });                                                                  
      });                                                                    
                                                                             
      resolve();                                                             
                                                                             
    }, interval);                                                        
  });                                                                        
};                                                                           
                                                                             
showPicture();   
