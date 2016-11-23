const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const jsonfile = require('jsonfile');
const mssql = require('mssql');

const app = express();
app.locals.pretty = true;

app.set('view engine', 'pug');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extenstion:false}));
app.use(express.static('public'));
app.use(express.static('css'));

var mail = require( './submodule/mail.js' );
app.get('/', (req,res)=>{
  var transport = mail.setTransport();
  var mailOptions = mail.setMailOptions( "changho1.kang@doosan.com", "mail module test", "<h1>Have a nice Day~</h1>" );
  mail.sendMail( transport, mailOptions );
  res.send("Context Root..");
});

var db = require( './submodule/db.js' );
function interfaceTracking( interfaceID, result, message ){
  // 1. Insert I/F result
  db.setInterfaceResult( interfaceID, result, message );

  // 2. Get I/F result
  db.getInterfaceResult( new Date().toJSON().slice(0,10) );

  // 3. Generate Mail Template
  var mailTemplate = require( './submodule/mailTemplate.js' );
  mailTemplate.getInterfaceResultFromLogFile();

  // 4. Get Receiver list
  // 5. Send Mail
}

app.get( '/tracking', (req,res)=>{

  var interfaceID = req.query.interfaceID;
  var result = req.query.result;
  var message = req.query.message;

  interfaceTracking( interfaceID, result, message );

  res.send("tracking : " + interfaceID);
});

app.listen(3000, ()=>{
  console.log('Opened At Port 3000....')
});
