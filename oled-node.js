var oledExp = require("/usr/bin/node-oled-exp");
var timeout = 300;

//Initialize
oledExp.init();
oledExp.setMemoryMode(2);
oledExp.setImageColumns();

var showPicture = () => {
  return new Promise ( function(resolve, reject) {
    setTimeout( () => {

      var request = require("request");
      var url = "https://warfehr.com/oled-msg";
      request(url, function (err, response, data) {

        if (!err && response.statusCode === 200){

          var jsonContent = JSON.parse(data);
          var item = jsonContent[0];
          var content = item.content;
          var digits = content.split("");
          var max = item.columns;
          var y = 0;
          var x = 0;

          digits.forEach(function(digit){

            if(digit == 1){

              oledExp.writeByte(0xff);
              oledExp.writeByte(0xff);
              oledExp.writeByte(0xff);

            }else{

              oledExp.writeByte(0x00);
              oledExp.writeByte(0x00);
              oledExp.writeByte(0x00);
            }

            x+=1;

            if(x == max){
              x = 0;
              y+=1;
              oledExp.setCursorByPixel(y,0);
            }
          });
        }else{

          console.log(err);
        }
      });

      resolve();

    }, timeout);
  });           
};              

showPicture().then(() => {console.log('done'); });
