var hue = require('hue-module');
var Color = require("color");

var helper = {
  get_bravia_request: function(cmd) {
    return '<?xml version="1.0"?>' +
      '<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" SOAP-ENV:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">' +
      '<SOAP-ENV:Body>' + '<m:X_SendIRCC xmlns:m="urn:schemas-sony-com:service:IRCC:1">' +
      '<IRCCCode xmlns:dt="urn:schemas-microsoft-com:datatypes" dt:dt="string">' +
      bravia[cmd.toLowerCase()] +
      '</IRCCCode>' +
      '</m:X_SendIRCC>' +
      '</SOAP-ENV:Body>' +
      '</SOAP-ENV:Envelope>';
  },

  get_ir_code: function(value) {
    return getKeyByValue(remote, value);
  },

  set_hue_color: function(host, key, light, color) {
    hue.load(host, key);
    hue.light(parseInt(light), function(light){
        var c = Color(color);
        hue.change(light.set({"on": true, "rgb":[c.red(),c.green(),c.blue()]}));
    });
  },

  set_hue_power: function(host, key, light, state) {
    hue.load(host, key);
    hue.light(parseInt(light), function(light){
      switch(state) {
        case "on":
          hue.change(light.set({"on":true}));
          break;
        case "off":
          hue.change(light.set({"on":false}));
          break;
      }
    });
  }

};

var getKeyByValue = function(dict, value) {
  for( var prop in dict ) {
    if( dict.hasOwnProperty( prop ) ) {
       if( dict[ prop ] === value )
         return prop;
    }
  }
};

var remote = {
  "16": "1",
  "2064": "2",
  "1040": "3",
  "3088": "4",
  "528": "5",
  "2576": "6",
  "1552": "7",
  "3600": "8",
  "272": "9",
  "2320": "0",
  "1168": "V+",
  "3216": "V-",
  "144": "P+",
  "2192": "P-",
  "752": "UP",
  "3280": "RIGHT",
  "2800": "DOWN",
  "720": "LEFT",
  "2672": "OK",
  "656": "MUTE",
  "21225": "RED",
  "13033": "GREEN",
  "29417": "YELLOW",
  "4841": "BLUE"
};

var bravia = {
  "poweroff":"AAAAAQAAAAEAAAAvAw==",
  "input":"AAAAAQAAAAEAAAAlAw==",
  "gguide":"AAAAAQAAAAEAAAAOAw==",
  "epg":"AAAAAgAAAKQAAABbAw==",
  "favorites":"AAAAAgAAAHcAAAB2Aw==",
  "display":"AAAAAQAAAAEAAAA6Aw==",
  "home":"AAAAAQAAAAEAAABgAw==",
  "options":"AAAAAgAAAJcAAAA2Aw==",
  "return":"AAAAAgAAAJcAAAAjAw==",
  "up":"AAAAAQAAAAEAAAB0Aw==",
  "down":"AAAAAQAAAAEAAAB1Aw==",
  "right":"AAAAAQAAAAEAAAAzAw==",
  "left":"AAAAAQAAAAEAAAA0Aw==",
  "confirm":"AAAAAQAAAAEAAABlAw==",
  "red":"AAAAAgAAAJcAAAAlAw==",
  "green":"AAAAAgAAAJcAAAAmAw==",
  "yellow":"AAAAAgAAAJcAAAAnAw==",
  "blue":"AAAAAgAAAJcAAAAkAw==",
  "num1":"AAAAAQAAAAEAAAAAAw==",
  "num2":"AAAAAQAAAAEAAAABAw==",
  "num3":"AAAAAQAAAAEAAAACAw==",
  "num4":"AAAAAQAAAAEAAAADAw==",
  "num5":"AAAAAQAAAAEAAAAEAw==",
  "num6":"AAAAAQAAAAEAAAAFAw==",
  "num7":"AAAAAQAAAAEAAAAGAw==",
  "num8":"AAAAAQAAAAEAAAAHAw==",
  "num9":"AAAAAQAAAAEAAAAIAw==",
  "num0":"AAAAAQAAAAEAAAAJAw==",
  "num11":"AAAAAQAAAAEAAAAKAw==",
  "num12":"AAAAAQAAAAEAAAALAw==",
  "volumeup":"AAAAAQAAAAEAAAASAw==",
  "volumedown":"AAAAAQAAAAEAAAATAw==",
  "mute":"AAAAAQAAAAEAAAAUAw==",
  "channelup":"AAAAAQAAAAEAAAAQAw==",
  "channeldown":"AAAAAQAAAAEAAAARAw==",
  "subtitle":"AAAAAgAAAJcAAAAoAw==",
  "closedcaption":"AAAAAgAAAKQAAAAQAw==",
  "enter":"AAAAAQAAAAEAAAALAw==",
  "dot":"AAAAAgAAAJcAAAAdAw==",
  "analog":"AAAAAgAAAHcAAAANAw==",
  "teletext":"AAAAAQAAAAEAAAA/Aw==",
  "exit":"AAAAAQAAAAEAAABjAw==",
  "analog2":"AAAAAQAAAAEAAAA4Aw==",
  "*ad":"AAAAAgAAABoAAAA7Aw==",
  "digital":"AAAAAgAAAJcAAAAyAw==",
  "analog?":"AAAAAgAAAJcAAAAuAw==",
  "bs":"AAAAAgAAAJcAAAAsAw==",
  "cs":"AAAAAgAAAJcAAAArAw==",
  "bscs":"AAAAAgAAAJcAAAAQAw==",
  "ddata":"AAAAAgAAAJcAAAAVAw==",
  "picoff":"AAAAAQAAAAEAAAA+Aw==",
  "tv_radio":"AAAAAgAAABoAAABXAw==",
  "theater":"AAAAAgAAAHcAAABgAw==",
  "sen":"AAAAAgAAABoAAAB9Aw==",
  "internetwidgets":"AAAAAgAAABoAAAB6Aw==",
  "internetvideo":"AAAAAgAAABoAAAB5Aw==",
  "netflix":"AAAAAgAAABoAAAB8Aw==",
  "sceneselect":"AAAAAgAAABoAAAB4Aw==",
  "mode3d":"AAAAAgAAAHcAAABNAw==",
  "imanual":"AAAAAgAAABoAAAB7Aw==",
  "audio":"AAAAAQAAAAEAAAAXAw==",
  "wide":"AAAAAgAAAKQAAAA9Aw==",
  "jump":"AAAAAQAAAAEAAAA7Aw==",
  "pap":"AAAAAgAAAKQAAAB3Aw==",
  "myepg":"AAAAAgAAAHcAAABrAw==",
  "programdescription":"AAAAAgAAAJcAAAAWAw==",
  "writechapter":"AAAAAgAAAHcAAABsAw==",
  "trackid":"AAAAAgAAABoAAAB+Aw==",
  "tenkey":"AAAAAgAAAJcAAAAMAw==",
  "applicast":"AAAAAgAAABoAAABvAw==",
  "actvila":"AAAAAgAAABoAAAByAw==",
  "deletevideo":"AAAAAgAAAHcAAAAfAw==",
  "photoframe":"AAAAAgAAABoAAABVAw==",
  "tvpause":"AAAAAgAAABoAAABnAw==",
  "keypad":"AAAAAgAAABoAAAB1Aw==",
  "media":"AAAAAgAAAJcAAAA4Aw==",
  "syncmenu":"AAAAAgAAABoAAABYAw==",
  "forward":"AAAAAgAAAJcAAAAcAw==",
  "play":"AAAAAgAAAJcAAAAaAw==",
  "rewind":"AAAAAgAAAJcAAAAbAw==",
  "prev":"AAAAAgAAAJcAAAA8Aw==",
  "stop":"AAAAAgAAAJcAAAAYAw==",
  "next":"AAAAAgAAAJcAAAA9Aw==",
  "rec":"AAAAAgAAAJcAAAAgAw==",
  "pause":"AAAAAgAAAJcAAAAZAw==",
  "eject":"AAAAAgAAAJcAAABIAw==",
  "flashplus":"AAAAAgAAAJcAAAB4Aw==",
  "flashminus":"AAAAAgAAAJcAAAB5Aw==",
  "topmenu":"AAAAAgAAABoAAABgAw==",
  "popupmenu":"AAAAAgAAABoAAABhAw==",
  "rakurakustart":"AAAAAgAAAHcAAABqAw==",
  "onetouchtimerec":"AAAAAgAAABoAAABkAw==",
  "onetouchview":"AAAAAgAAABoAAABlAw==",
  "onetouchrec":"AAAAAgAAABoAAABiAw==",
  "onetouchstop":"AAAAAgAAABoAAABjAw==",
  "dux":"AAAAAgAAABoAAABzAw==",
  "footballmode":"AAAAAgAAABoAAAB2Aw==",
  "social":"AAAAAgAAABoAAAB0Aw=="
};


module.exports = helper;
