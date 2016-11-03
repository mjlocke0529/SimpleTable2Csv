var sql = require('mssql');
var csvWriter = require('csv-write-stream')
var fs = require('fs');
var writer = csvWriter()
writer.pipe(fs.createWriteStream('output.csv'))


sql.connect('mssql://Username:password@SERVER/Database', function(err) {
    // ... error checks 
    var request = new sql.Request();
    request.stream = true; // You can set streaming differently for each request 
    request.query('select * from Tablename'); // table you would like to pull 

    request.on('row', function(row) {       
        writer.write(row) 
    });
 
    request.on('error', function(err) {
        console.log(err)
    });   
});
 
sql.on('error', function(err) {
    console.log(err)
});