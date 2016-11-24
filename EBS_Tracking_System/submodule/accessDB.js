const sql = require('mssql');
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

exports.getInterfaceResult = function( today ){
  var config = {
    user:_user,
    password:_password,
    server:_server,
    database:_database
  };

  return sql.connect( config ).then( function(){
    var request = new sql.Request();
    return request.query( "select convert(varchar(16), DateTime, 120) AS DateTime,InterfaceID,FromSystem,ToSystem,Method,Execution,Result,Message from TB_InterfaceResult where dateTime >='" + today + "' order by DateTime" );
  });
}

exports.setInterfaceResult = function( interfaceID, result, message ){
  var config = {
    user:_user,
    password:_password,
    server:_server,
    database:_database
  };

  var query = "INSERT INTO rddb.dbo.TB_InterfaceResult"+
              "(DateTime,InterfaceID,FromSystem,ToSystem,Method,Execution,Result,Message)"+
              "select convert(varchar(16), getdate(), 120) As DateTime, InterfaceID, FromSystem, ToSystem, Method, Execution, '"+ result +"' AS Result, '"+ message +"' As Message from TB_InterfaceList where InterfaceID = '" + interfaceID +"'" ;


  sql.connect( config, (err)=>{
    var request = new sql.Request();
    request.query( query, (err, recordset)=>{
      if( err ) console.log( err );
      else{
        console.log( "Insert Succeed" );

        sql.close();
      }
    });
  });
}

exports.mngInterfaceResult = function( interfaceID, result, message ){
  var config = {
    user:_user,
    password:_password,
    server:_server,
    database:_database
  };

  var insertQuery = "INSERT INTO rddb.dbo.TB_InterfaceResult"+
                    "(DateTime,InterfaceID,FromSystem,ToSystem,Method,Execution,Result,Message)"+
                    "select convert(varchar(16), getdate(), 120) As DateTime, InterfaceID, FromSystem, ToSystem, Method, Execution, '"+ result +"' AS Result, '"+ message +"' As Message from TB_InterfaceList where InterfaceID = '" + interfaceID +"'" ;
  var selectQuery = "select DateTime,InterfaceID,FromSystem,ToSystem,Method,Execution,Result,Message from TB_InterfaceResult order by DateTime"


  return sql.connect( config ).then( function(){
    var request = new sql.Request();
    request.query( insertQuery, (err, recordset)=>{
      if( err ) console.log( err );
      else{
        console.log( "Insert Succeed" );
      }
    });

    return request.query( selectQuery );
  });
}
