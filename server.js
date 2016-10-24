var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//initial variables
var th_e;
var th_w;
var e = 'Electricity';
var w = 'Water';
var f_phone = false;

//added for data retrive
var fs = require('fs')
//var data = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:loc="http://www.csapi.org/schema/parlayx/terminal_location/v2_3/local"><soapenv:Header/><soapenv:Body><loc:getLocation><loc:address>tel:6048427146</loc:address><loc:requestedAccuracy>5000</loc:requestedAccuracy> <loc:acceptableAccuracy>5000</loc:acceptableAccuracy> </loc:getLocation> </soapenv:Body></soapenv:Envelope>';
var generated_msg = '';
var phone;
var data;
var w_msg;
var data1 = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:loc="http://www.csapi.org/schema/parlayx/sms/send/v2_3/local"><soapenv:Header/><soapenv:Body><loc:sendSms><!--1 or more repetitions:--><loc:addresses>tel:'
var data2 = '</loc:addresses><loc:senderName></loc:senderName><loc:message>'
var data3 = '</loc:message><!-- Optional --></loc:sendSms></soapenv:Body></soapenv:Envelope>'
var https = require('https');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

/*
var object = [];
function createObject(){
    object = [{ name: 'Alice', phoneNo: '16049102945',waterUsuage:'',electricityUsuage:'',dateTime: ''},
                    { name: 'Alice', phoneNo: '16049102945',waterUsuage:'',electricityUsuage:'',dateTime: '1'},
                    { name: 'Alice', phoneNo: '16049102945',waterUsuage:'',electricityUsuage:'',dateTime: '2'},
                    { name: 'Alice', phoneNo: '16049102945',waterUsuage:'',electricityUsuage:'',dateTime: '3'},
                    { name: 'Alice', phoneNo: '16049102945',waterUsuage:'',electricityUsuage:'',dateTime: '4'},
                    { name: 'Alice', phoneNo: '16049102945',waterUsuage:'',electricityUsuage:'',dateTime: '5'}];
       /*Get each object and loop through it to get the properties
      object.forEach(function(arrayItem){
          console.log(arrayItem);
          for (var prop in arrayItem) {
        console.log("obj." + prop + " = " + arrayItem[prop]);
      }
      });
}
function addObject(){
    var newObject = { name: 'Bob', phoneNo: '16049102945',waterUsuage:'',electricityUsuage:'',dateTime: ''};
    object.push(newObject);
    object.forEach(function(arrayItem){
          console.log(arrayItem);
          for (var prop in arrayItem) {
          console.log("obj." + prop + " = " + arrayItem[prop]);
    }
    });
}
*/

app.use(express.static(__dirname));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  console.log('a user connected');
  socket.on('disconnect', function() {
      console.log('user disconnected');
  });

  socket.on('get phone number', function(msg){
      phone = msg.p;
      console.log(phone);
      if(phone != '16049102945'){
          f_phone = false;
          console.log('not equal');
      }
  });

  socket.on('which phone', function(msg){
      console.log('Got msg!');
      socket.emit('which phone done', {p: f_phone});
  });

  socket.on('start', function(msg){
      console.log(phone);
  });

  socket.on('phone', function(msg){
      console.log(phone);
  });

  socket.on('Notification', function(msg){
      console.log('Button is clicked.');
      //let count = 0;
      //phone = msg.p;
      /*
      if(msg.e > th_e){
          count += 1;
          generated_msg += e + ' ';
      }
      if(msg.w > th_w){
          count += 1;
          generated_msg += w + ' ';
      }
      */

      //if(count >= 1){
          /*
          if(count == 1)
              data = data1 + phone + data2 + 'Oops! The following ( ' + generated_msg + ') is out of control!' + data3;
          else {
              data = data1 + phone + data2 + 'Oops! The following ( ' + generated_msg + ') are out of control!' + data3;
          }
          */
          data = data1 + phone + data2 + 'Hey there! you are getting a little sidetracked from meeting your energy savings goal. But no worries, try out these energy saving tips http://bit.ly/2dSxDnZ to get back on track' + data3;
          console.log(data);

          var buf = fs.readFileSync('telus.p12');
          var options = { host: 'webservices.telus.com',
              port: 443,
              path: '/SendSmsService/services/SendSms',
              method: 'POST',
              headers:
               { 'Content-Type': 'text/xml; charset=utf-8',
                 'Content-Length': data.length } ,
              pfx: buf,
              passphrase: 'secret'
          };

          var req = https.request(options, (res) => {
            console.log('statusCode:', res.statusCode);
            console.log('headers:', res.headers);
            var msg = '';

            res.on('data', (chunk) => {
              msg+=chunk;
            });
            res.on('end', function() {
              console.log(msg);
            });
          });

          req.on('error', (e) => {
            console.error(e);
          });

          req.write(data);
          req.end();
          //console.log(data);
      //}

    });
    /*
    socket.on('Weekly Note', function(msg){
          w_msg = data1 + phone + data2 + 'Your weekly usage is ' + msg.test + data3;

          var buf = fs.readFileSync('telus.p12');
          var options = { host: 'webservices.telus.com',
              port: 443,
              path: '/SendSmsService/services/SendSms',
              method: 'POST',
              headers:
               { 'Content-Type': 'text/xml; charset=utf-8',
                 'Content-Length': w_msg.length } ,
              pfx: buf,
              passphrase: 'secret'
          };

          var req = https.request(options, (res) => {
            console.log('statusCode:', res.statusCode);
            console.log('headers:', res.headers);
            var msg = '';

            res.on('data', (chunk) => {
              msg+=chunk;
            });
            res.on('end', function() {
              console.log(msg);
            });
          });

          req.on('error', (e) => {
            console.error(e);
          });

          req.write(w_msg);
          req.end();
    });
    */
});

http.listen(8080, function() {
    console.log('listen on *:8080')
});
