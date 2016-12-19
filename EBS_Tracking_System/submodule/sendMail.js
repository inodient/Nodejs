const nodemailer = require( 'nodemailer' );
const smtpTransport = require( 'nodemailer-smtp-transport' );
const jsonfile = require( 'jsonfile' );
const fs = require( 'fs' );


var _host = "";
var _secureConnection = false;
var _port = 0;
var _adminAddr = "";

{
  fs.readFile('./properties/mail.property', 'utf8', (err,data)=>{
    if(err) throw err;

    var configuration = JSON.parse( data );

    _host = configuration.host;
    _secureConnection = configuration.secureConnection;
    _port = configuration.port;
    _adminAddr = configuration.adminAddr;
  });
}

/////////////// gmail test ///////////////////////////////////////////
// exports.setTransport = function(){
//   var transport = nodemailer.createTransport( smtpTransport({
//       transportMethod: "SMTP",
//       host: "smtp.gmail.com",
//       secureConnection: false,
//       port: 587,
//       requiresAuth: true,
//       domains: ["gmail.com", "googlemail.com"],
//       auth: {
//         user: 'inodient@gmail.com',
//         pass: 'fern3829@'
//     }
//   }));
//
//   return transport;
// }
/////////////// gmail test ///////////////////////////////////////////

exports.setTransport = function(){
  var transport = nodemailer.createTransport( smtpTransport({
    host : _host,
    secureConnection : _secureConnection,
    port : _port
  }));

  return transport;
}

exports.setMailOptions = function( _mailTo, _subject, _html ){
  var mailOptions = {
    from : _adminAddr,
    to : _mailTo,
    subject : _subject,
    html : _html
  }

  return mailOptions;
}

exports.setMailOptionsWithAttachments = function( _mailTo, _subject, _html, _path ){
  var mailOptions = {
    from : _adminAddr,
    to : _mailTo,
    subject : _subject,
    html : _html,
    attachments : [{
      path : _path
    }]
  }

  return mailOptions;
}

exports.sendMail = function( _transport, _mailOptions ){

  _transport.sendMail( _mailOptions, function( error, response ){
    if(error){
        console.log(error);
    }else{
        console.log("Message sent: " + response.message);
    }
    _transport.close();
  });
}
