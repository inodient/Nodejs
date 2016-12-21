const express = require('express');
const bodyParser = require('body-parser');
const pug = require('pug');
const app = express();
const fs = require('fs');

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
      resolve( db.getInterfaceResult( new Date().toLocaleString().substring( 0, 10) ) );
    });
  };

  _promise().then( function( resultStr ){
    var html =  pug.renderFile( './views/trackingMail.pug', { resultArray: resultStr } );

    //sentGmail( html );

    var transport = mail.setTransport();
    var mailOptions = mail.setMailOptions( "changho1.kang@doosan.com", "Tracking Result", html );
    mail.sendMail( transport, mailOptions );

  }, function( error ){
    console.log( error );
  });
});
// Scheduler : END
// ******************************************* //

// ******************************************* //
// Scheduler Machine Learning : START
var scheduler_machineLearning = require('node-schedule');
var rule_machineLearning = new schedule.RecurrenceRule();

rule_machineLearning.minute = 22;
var j_machineLearning = schedule.scheduleJob( rule_machineLearning, function(){
  console.log( "Every 15 minutes...." );

  var exec = require('child_process').exec;
  var cmd = '"C:/Program Files/R/R-3.3.2/bin/R.exe" CMD BATCH --vanilla --slave "C:/__Repo.Workspace/R/EBS_Tracking_Machine_Learning.R"'

  var _promise = function(){
    return new Promise( function( resolve, reject) {
      console.log( "In promise Machine Learning...." );

      resolve( exec(cmd, function(error, stdout, stderr) {
          console.log( "error : " + error );
          console.log( "stdout : " + stdout );
          console.log( "stderr : " + stderr );
        })
      );
    });
  }

  _promise().then( function(){

    var lineReader = require('readline').createInterface({
      input: require('fs').createReadStream('./Tracking_Result/result.txt')
    });

    var lineStr = "";

    lineReader.on('line', function (line) {
      console.log('Line from file:', line);

      lineStr = lineStr + line + "<br />";

      if( line.indexOf("p_value : " ) > -1 ){
        line = line.replace( "p_value : ", "" );
        console.log( "P-VALUE : " + parseFloat( line ) );

        if( parseFloat( line ) >= 0.0 ){

          var transport = mail.setTransport();
          var mailOptions = mail.setMailOptionsWithAttachments( "changho1.kang@doosan.com", "Tracking Result", lineStr, "./views/result.jpg" );
          mail.sendMail( transport, mailOptions );

          /*
          changho1.kang@doosan.com
          hyeonuk.gwak@doosan.com
          kideok2.kim@doosan.com
          dongju.kim@doosan.com
          seok1.kim@doosan.com
          chulho.kim@doosan.com
          jonguk.byun@doosan.com
          jun.ahn@doosan.com
          minjae2.lee@doosan.com
          sanghan.lee@doosan.com
          woong.lee@doosan.com
          dohyun.jung@doosan.com
          changyong.jung@doosan.com
          sungjoon.chin@doosan.com
          kihun.choi@doosan.com
          mankyu.choi@doosan.com
          injun1.choi@doosan.com
          jongchan.han@doosan.com
          joungmin.hong@doosan.com
          hoon2.kang@doosan.com
          hongtae2.kim@doosan.com
          sinyeong.park@doosan.com
          chulwook.park@doosan.com
          kihoon2.lee@doosan.com
          seonghoon1.jeong@doosan.com
          jinchul.jung@doosan.com
          jungrim.choi@doosan.com
          hwal1.choi@doosan.com
          haksung.um@doosan.com
          kihyun.you@doosan.com
          sungjin2.lim@doosan.com
          yonghoon.jung@doosan.com
          */


          mailOptions = mail.setMailOptionsWithAttachments( "changho1.kang@doosan.com", "Tracking Result", lineStr, "./views/result.jpg" );
          mail.sendMail( transport, mailOptions );
          mailOptions = mail.setMailOptionsWithAttachments( "hyeonuk.gwak@doosan.com", "Tracking Result", lineStr, "./views/result.jpg" );
          mail.sendMail( transport, mailOptions );
          mailOptions = mail.setMailOptionsWithAttachments( "kideok2.kim@doosan.com", "Tracking Result", lineStr, "./views/result.jpg" );
          mail.sendMail( transport, mailOptions );
          mailOptions = mail.setMailOptionsWithAttachments( "dongju.kim@doosan.com", "Tracking Result", lineStr, "./views/result.jpg" );
          mail.sendMail( transport, mailOptions );
          mailOptions = mail.setMailOptionsWithAttachments( "seok1.kim@doosan.com", "Tracking Result", lineStr, "./views/result.jpg" );
          mail.sendMail( transport, mailOptions );
          mailOptions = mail.setMailOptionsWithAttachments( "chulho.kim@doosan.com", "Tracking Result", lineStr, "./views/result.jpg" );
          mail.sendMail( transport, mailOptions );
          mailOptions = mail.setMailOptionsWithAttachments( "jonguk.byun@doosan.com", "Tracking Result", lineStr, "./views/result.jpg" );
          mail.sendMail( transport, mailOptions );
          mailOptions = mail.setMailOptionsWithAttachments( "jun.ahn@doosan.com", "Tracking Result", lineStr, "./views/result.jpg" );
          mail.sendMail( transport, mailOptions );
          mailOptions = mail.setMailOptionsWithAttachments( "minjae2.lee@doosan.com", "Tracking Result", lineStr, "./views/result.jpg" );
          mail.sendMail( transport, mailOptions );
          mailOptions = mail.setMailOptionsWithAttachments( "sanghan.lee@doosan.com", "Tracking Result", lineStr, "./views/result.jpg" );
          mail.sendMail( transport, mailOptions );
          mailOptions = mail.setMailOptionsWithAttachments( "woong.lee@doosan.com", "Tracking Result", lineStr, "./views/result.jpg" );
          mail.sendMail( transport, mailOptions );
          mailOptions = mail.setMailOptionsWithAttachments( "dohyun.jung@doosan.com", "Tracking Result", lineStr, "./views/result.jpg" );
          mail.sendMail( transport, mailOptions );
          mailOptions = mail.setMailOptionsWithAttachments( "changyong.jung@doosan.com", "Tracking Result", lineStr, "./views/result.jpg" );
          mail.sendMail( transport, mailOptions );
          mailOptions = mail.setMailOptionsWithAttachments( "sungjoon.chin@doosan.com", "Tracking Result", lineStr, "./views/result.jpg" );
          mail.sendMail( transport, mailOptions );
          mailOptions = mail.setMailOptionsWithAttachments( "kihun.choi@doosan.com", "Tracking Result", lineStr, "./views/result.jpg" );
          mail.sendMail( transport, mailOptions );
          mailOptions = mail.setMailOptionsWithAttachments( "mankyu.choi@doosan.com", "Tracking Result", lineStr, "./views/result.jpg" );
          mail.sendMail( transport, mailOptions );
          mailOptions = mail.setMailOptionsWithAttachments( "injun1.choi@doosan.com", "Tracking Result", lineStr, "./views/result.jpg" );
          mail.sendMail( transport, mailOptions );
          mailOptions = mail.setMailOptionsWithAttachments( "jongchan.han@doosan.com", "Tracking Result", lineStr, "./views/result.jpg" );
          mail.sendMail( transport, mailOptions );
          mailOptions = mail.setMailOptionsWithAttachments( "joungmin.hong@doosan.com", "Tracking Result", lineStr, "./views/result.jpg" );
          mail.sendMail( transport, mailOptions );
          mailOptions = mail.setMailOptionsWithAttachments( "hoon2.kang@doosan.com", "Tracking Result", lineStr, "./views/result.jpg" );
          mail.sendMail( transport, mailOptions );
          mailOptions = mail.setMailOptionsWithAttachments( "hongtae2.kim@doosan.com", "Tracking Result", lineStr, "./views/result.jpg" );
          mail.sendMail( transport, mailOptions );
          mailOptions = mail.setMailOptionsWithAttachments( "sinyeong.park@doosan.com", "Tracking Result", lineStr, "./views/result.jpg" );
          mail.sendMail( transport, mailOptions );
          mailOptions = mail.setMailOptionsWithAttachments( "chulwook.park@doosan.com", "Tracking Result", lineStr, "./views/result.jpg" );
          mail.sendMail( transport, mailOptions );
          mailOptions = mail.setMailOptionsWithAttachments( "kihoon2.lee@doosan.com", "Tracking Result", lineStr, "./views/result.jpg" );
          mail.sendMail( transport, mailOptions );
          mailOptions = mail.setMailOptionsWithAttachments( "seonghoon1.jeong@doosan.com", "Tracking Result", lineStr, "./views/result.jpg" );
          mail.sendMail( transport, mailOptions );
          mailOptions = mail.setMailOptionsWithAttachments( "jinchul.jung@doosan.com", "Tracking Result", lineStr, "./views/result.jpg" );
          mail.sendMail( transport, mailOptions );
          mailOptions = mail.setMailOptionsWithAttachments( "jungrim.choi@doosan.com", "Tracking Result", lineStr, "./views/result.jpg" );
          mail.sendMail( transport, mailOptions );
          mailOptions = mail.setMailOptionsWithAttachments( "hwal1.choi@doosan.com", "Tracking Result", lineStr, "./views/result.jpg" );
          mail.sendMail( transport, mailOptions );
          mailOptions = mail.setMailOptionsWithAttachments( "haksung.um@doosan.com", "Tracking Result", lineStr, "./views/result.jpg" );
          mail.sendMail( transport, mailOptions );
          mailOptions = mail.setMailOptionsWithAttachments( "kihyun.you@doosan.com", "Tracking Result", lineStr, "./views/result.jpg" );
          mail.sendMail( transport, mailOptions );
          mailOptions = mail.setMailOptionsWithAttachments( "sungjin2.lim@doosan.com", "Tracking Result", lineStr, "./views/result.jpg" );
          mail.sendMail( transport, mailOptions );
          mailOptions = mail.setMailOptionsWithAttachments( "yonghoon.jung@doosan.com", "Tracking Result", lineStr, "./views/result.jpg" );
          mail.sendMail( transport, mailOptions );

        }
      }
    });
  }, function( error ){
    console.log( error );
  });
});
// Scheduler Machine Learning : END
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

app.get( '/machineLearningResult', (req,res)=>{

  var exec = require('child_process').exec;
  //var cmd = 'notepad.exe';
  var cmd = '"C:/Program Files/R/R-3.3.2/bin/R.exe" CMD BATCH --vanilla --slave "C:/__Repo.Workspace/R/EBS_Tracking_Machine_Learning.R"'

  exec(cmd, function(error, stdout, stderr) {
    // command output is in stdout
    console.log( error );
    console.log( stderr );
  });


  var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./Tracking_Result/result.txt')
  });

  var lineStr = "";

  lineReader.on('line', function (line) {
    console.log('Line from file:', line);
    console.log( line.indexOf("p_value : ") );

    lineStr = lineStr + line + "<br />";

    if( line.indexOf("p_value : " ) > -1 ){
      line = line.replace( "p_value : ", "" );
      console.log( "VALUE : " + parseFloat( line ) );



      if( parseFloat( line ) >= 0.0 ){
        console.log( "Machine Learning Succeed" );

        var transport = mail.setTransport();
        var mailOptions = mail.setMailOptionsWithAttachments( "changho1.kang@doosan.com", "Tracking Result", lineStr, "./views/result.jpg" );
        mail.sendMail( transport, mailOptions );

        // mailOptions = mail.setMailOptionsWithAttachments( "kihun.choi@doosan.com", "Tracking Result", lineStr, "./views/result.jpg" );
        // mail.sendMail( transport, mailOptions );
      }
    }
  });

  res.send ( "Success" );
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
