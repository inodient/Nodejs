const mssql = require('mssql');
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

exports.mssqlCreateConnection = function(){
  var connection = new mssql.Connection({
    user: _user,
    password: _password,
    server: _server,
    database: _database
  });

  // connection.connect( function(err){
  //   console.log( "Connection Succeed" );
  //   if( err ){
  //     console.log( err );
  //   }
  // });

  return connection;
}

exports.mssqlOpenConnection = function( _connection ){
  console.log( "Connection Succeed - 1" );
  _connection.connect( function(err){
    console.log( "Connection Succeed - 2" );
    if( err ){
      console.log( err );
    }
  });
  console.log( "Connection Succeed - 3" );
  return _connection;
}


exports.mssqlCloseConnection = function( _connection ){
  _connection.close();
  console.log( "Disconnect DB" );
}
