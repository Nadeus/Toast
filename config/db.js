var mysql = require('mysql');
var util = require( 'util' );
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'mdp',
  database : 'mydb'
});

connection.query = util.promisify(connection.query)
 
connection.connect();

module.exports = connection