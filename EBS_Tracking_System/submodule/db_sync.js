const co = require('co');
const sql = require('co-mssql');
const fs = require('fs');

var _user = "";
var _password = "";
var _server = "";
var _database = "";

{
  fs.readFile('./properties/db.property', 'utf8', (err,data)=>{
    if(err) throw err;

    var configuration = JSON.parse( data );

    _user = configuration.user;
    _password = configuration.password;
    _server = configuration.server;
    _database = configuration.database;
  });
}

exports.syncGetInterfaceResult = co.wrap(function * (test) {
  var connection = new sql.Connection({
      user: _user,
      password: _password,
      server: _server,
      database: _database
  });
  var recordset;

  try {

      yield connection.connect();

      var request = new sql.Request(connection);
      recordset = yield request.query('select DateTime,InterfaceID,FromSystem,ToSystem,Method,Execution,Result,Message from TB_InterfaceResult');
      console.dir(recordset);

  } catch (ex) {
      console.log( ex );
  }
  return yield recordset;
});

//
// exports.getInterfaceResult = function( targetDate ){
//   var config = {
//     user:_user,
//     password:_password,
//     server:_server,
//     database:_database
//   };
//
//   sql.connect( config, (err)=>{
//     var request = new sql.Request();
//
//     request.query( "select DateTime,InterfaceID,FromSystem,ToSystem,Method,Execution,Result,Message from TB_InterfaceResult where DateTime >= '" + targetDate + "'", (err, recordset)=>{
//       if( err ) console.log( err );
//       else{
//         console.log( '------------------------' );
//         console.log( JSON.stringify(recordset, null, 2) );
//         console.log( '------------------------' );
//
//         fs.writeFile('./properties/result.json', JSON.stringify(recordset, null, 2), (err)=>{
//           if(err) throw err;
//           else console.log( 'Succeed to generate log file..' );
//         });
//
//         sql.close();
//       }
//     });
//   });
// }
//
// exports.setInterfaceResult = function( interfaceID, result, message ){
//   var config = {
//     user:_user,
//     password:_password,
//     server:_server,
//     database:_database
//   };
//
//   var query = "INSERT INTO rddb.dbo.TB_InterfaceResult"+
//               "(DateTime,InterfaceID,FromSystem,ToSystem,Method,Execution,Result,Message)"+
//               "select GETDATE() As DateTime, InterfaceID, FromSystem, ToSystem, Method, Execution, '"+ result +"' AS Result, '"+ message +"' As Message from TB_InterfaceList where InterfaceID = '" + interfaceID +"'" ;
//
//
//   sql.connect( config, (err)=>{
//     var request = new sql.Request();
//     request.query( query, (err, recordset)=>{
//       if( err ) console.log( err );
//       else{
//         console.log( "Insert Succeed" );
//
//         sql.close();
//       }
//     });
//   });
// }
