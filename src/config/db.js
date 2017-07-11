import mysql from 'mysql';
const connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : '',
  database : 'ticketing'
});

connection.connect(err => {
  if (err) {
    console.error(`error connecting: ${err.stack}`);
    return;
  }
 
  console.log(`connected as id ${connection.threadId}`);
});