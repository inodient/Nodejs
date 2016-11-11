const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const jsonfile = require('jsonfile');
const mssql = require('mssql');

const nodemailer = require( "nodemailer" );
const smtpTransport = require( "nodemailer-smtp-transport" );


const app = express();

app.locals.pretty = true;

app.set('view engine', 'pug');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extenstion:false}));
app.use(express.static('public'));
app.use(express.static('css'));

var myTransport = nodemailer.createTransport(smtpTransport({
  host: "krrelay.corp.doosan.com", // hostname
  secureConnection: false, // use SSL
  port: 25 // port for secure SMTP
  // auth: {
  //     user: "changho1.kang@doosan.com",
  //     pass: "Update123"
  // }
}));

function mssqlConnection(){
  var connection = new mssql.Connection({
    user: 'sa',
    password: '123456!',
    server: '10.32.32.34:1433',
    database: 'rddb'
  });

  connection.connect( function(err){
    console.log( "Connection Succeed" );
    if( err ){
      console.log( err );
    }
  });

  // var transaction = new mssql.Transaction( connection );
  //
  // transaction.begin(function(err){
  //   var rolledback = false;
  //
  //   transaction.on('rollback', function(aborted){
  //     rolledback = true;
  //   });
  //
  //   var request = new mssql.Request( transaction );
  //   request.query('insert into TB_LoginDB (UserID, UserDept, UserIP, ConnectTime, UserName )values ("inodient","TEAM","0.0.0.0","2016-11-01","Changho Kang")', function(err,recordset){
  //     if(err){
  //       if( !rolledback ){
  //         transaction.rollback(function(err){
  //           console.log( "Failed to Rollback" );
  //         });
  //       }
  //     } else{
  //       transaction.commit(function(err){
  //         console.log( "Failed to Commit" );
  //       })
  //     }
  //   });
  //
  // });

  connection.close();
}


// function mssqlConnection(){
//   mssql.connect( "mssql://sa:123456!@10.32.32.34/rddb" ).then( function(){
//     console.log( "Connection Succeed.." );
//
//     new mssql.Request().query('select * from TB_dProject').then(function(recordset) {
//       console.dir(recordset);
//     }).catch(function(err) {
//       console.log(err);
//     });
//   });
//
//
// }

var mail = require( './submodule/mail.js' );

app.get('/', (req,res)=>{
  var transport = mail.setTransport();
  var mailOptions = mail.setMailOptions( "changho1.kang@doosan.com", "mail module test", "<h1>Have a nice Day~</h1>" );
  mail.sendMail( transport, mailOptions );
  res.send("Context Root..");
});

var db = require( './submodule/db.js' );
//var Futures = require( 'futures' );
var Sequence = require( 'sequence' ).Sequence;
var sequence = Sequence.create();
var err;
var connection;

app.get( '/db', (req,res)=>{

  sequence
  .then( function(next){
    console.log( "Synchronous Function - 1" );
    connection = db.mssqlCreateConnection();
    next( err );
  })
  .then( function(next, err){
    console.log( "Synchronous Function - 2" );
    db.mssqlOpenConnection( connection );
    next( err );
  })
  .then( function(next, err){
    console.log( "Synchronous Function - 3" );
    db.mssqlCloseConnection( connection );
    next( err );
  })

  res.send( "DB" );
});

app.listen(3000, ()=>{
  console.log('Opened At Port 3000....')
});
