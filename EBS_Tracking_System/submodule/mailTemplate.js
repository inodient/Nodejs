const fs = require( 'fs' );

var result;

exports.getInterfaceResultFromLogFile = function(){

  fs.readFile('./properties/result.json', 'utf8', (err,data)=>{
    if(err) throw err;
    console.log( data );
    return data;
  });
}
