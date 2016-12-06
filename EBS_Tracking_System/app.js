const express = require('express');
const bodyParser = require('body-parser');
const pug = require('pug');
const app = express();

var mail = require( './submodule/sendMail.js' );
var db = require( './submodule/accessDB.js');
app.locals.pretty = true;

app.set('view engine', 'pug');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extenstion:false}));
app.use(express.static('public'));
app.use(express.static('css'));

// ******************************************* //
// Scheduler : START
var schedule = require('node-schedule');
var rule = new schedule.RecurrenceRule();

rule.minute = 30;
var j = schedule.scheduleJob( rule, function(){
  console.log( "Every 10 seconds...." );

  var _promise = function(){
    return new Promise( function( resolve, reject) {
      console.log( "In Promise..." );
      resolve( db.getInterfaceResult( new Date().toLocaleString().substring( 0, 10) ) );
    });
  };

  _promise().then( function( resultStr ){
    console.log( resultStr );

    var html =  pug.renderFile( './views/trackingMail.pug', { resultArray: resultStr } );
    console.log( html );

    //sentGmail( html );

    var transport = mail.setTransport();
    var mailOptions = mail.setMailOptions( "changho1.kang@doosan.com", "Tracking Result", html );
    mail.sendMail( transport, mailOptions );
    res.send("Context Root..");

    console.log( new Date().toLocaleString() );
  }, function( error ){
    console.log( error );
  });
});
// Scheduler : END
// ******************************************* //

app.get('/mail', (req,res)=>{

  var transport = mail.setTransport();
  var mailOptions = mail.setMailOptions( "changho1.kang@doosan.com", "mail module test", "<h1>Have a nice Day~</h1>" );
  mail.sendMail( transport, mailOptions );
  res.send("Context Root..");
});

app.get( '/tracking', (req,res)=>{
  var interfaceID = req.query.interfaceID;
  var result = req.query.result;
  var message = req.query.message;

  db.setInterfaceResult( interfaceID, result, message );
  res.send( '<h1>Succeed to Track</h1>' );
});

app.get( '/htmlFile', (req,res)=>{
  //console.log( pug.renderFile( './views/0109_110406-0879T-C.htm' ) );
  var fs = require('fs');
  var Iconv = require('iconv-x64').Iconv;
  var iconv = new Iconv('euc-kr', 'utf-8//translit//ignore');

  fs.readFile('C:/Users/student/Documents/Nodejs/EBS_Tracking_System/views/0109_110406-0879T-C.htm', 'EUC-KR', (err,data)=>{
    if(err) throw err;

    var htmlStr = data;
    iconv.convert(htmlStr);


    res.send( htmlStr );
    console.log( data );
  });

});

app.listen(3000, ()=>{
  console.log('Opened At Port 3000....')
});




app.get('/mailingTemplate', (req,res)=>{
  var _promise = function(){
    return new Promise( function( resolve, reject) {
      console.log( "In Promise..." );
      resolve( db.getInterfaceResult( new Date().toLocaleString().substring( 0, 10) ) );
    });
  };

  _promise().then( function( resultStr ){
    console.log( resultStr );

    var html =  pug.renderFile( './views/trackingMail.pug', { resultArray: resultStr } );
    console.log( html );

    //sentGmail( html );
    res.send( html );
    console.log( new Date().toLocaleString() );
  }, function( error ){
    console.log( error );
  });
});




function sentGmail( htmlStr ){
  var nodemailer = require('nodemailer');

  var smtpTransport = nodemailer.createTransport("SMTP", {
	   service: 'Gmail',
  	  auth: {
    		user: 'inodient@gmail.com',
    		pass: 'fern3829@'
  	   }
  });

  var mailOptions = {
  	from: 'inodient@gmail.com',
  	to: 'inodient@gmail.com',
  	subject: 'Nodemailer 테스트',
  	text: '평문 보내기 테스트 ',
    html: htmlStr
  };

  smtpTransport.sendMail(mailOptions, function(error, response){

  	if (error){
  		console.log(error);
  	} else {
  		console.log("Message sent : " + response.message);
  	}
  	smtpTransport.close();
  });
}


app.get( '/gmail', (req,res)=>{

  var nodemailer = require('nodemailer');

  var smtpTransport = nodemailer.createTransport("SMTP", {
	   service: 'Gmail',
  	  auth: {
    		user: 'inodient@gmail.com',
    		pass: 'fern3829@'
  	   }
  });

  var mailOptions = {
  	from: 'inodient@gmail.com',
  	to: 'inodient@gmail.com',
  	subject: 'Nodemailer 테스트',
  	text: '평문 보내기 테스트 '
  };

  smtpTransport.sendMail(mailOptions, function(error, response){

  	if (error){
  		console.log(error);
  	} else {
  		console.log("Message sent : " + response.message);
  	}
  	smtpTransport.close();
  });

  res.send( "Gmail Sent" );
});
