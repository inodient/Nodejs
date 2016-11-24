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

rule.second = 10;
var j = schedule.scheduleJob( rule, function(){
  console.log( "Every 10 second...." );

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
  console.log( pug.renderFile( './views/naver.html' ) );
  res.send( 'Completed..' );
});

app.listen(3000, ()=>{
  console.log('Opened At Port 3000....')
});









app.get( '/gmail', (req,res)=>{

  var smtpTransport = nodemailer.createTransport("SMTP", {
	   service: 'Gmail',
  	  auth: {
    		user: 'inodient',
    		pass: 'fern3829@'
  	   }
  });

  var mailOptions = {
  	from: 'changho1.kang@gmail.com',
  	to: 'changho1.kang@gmail.com',
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
