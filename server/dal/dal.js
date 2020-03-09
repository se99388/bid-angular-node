
const mysql = require("mysql");

// const connection = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "BID"
// });

// connection.connect(err=>{
//     if(err) {
//         console.log("Ofir Error", err);
//         return;
//     }
//     console.log("We are connceted to MySQL");
// });

let db_config = {
    host: 'localhost',
      user: 'root',
      password: '',
      database: 'BID'
  };
  
  let connection;
  
  function handleDisconnect() {
    connection = mysql.createConnection(db_config); // Recreate the connection, since
                                                    // the old one cannot be reused.
  
    connection.connect(function(err) {              // The server is either down
      if(err) {                                     // or restarting (takes a while sometimes).
        console.log('error when connecting to db:', err);
        setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
      }  
      else{
        console.log("We are connceted to MySQL");
      }                                   // to avoid a hot loop, and to allow our node script to
    });                                     // process asynchronous requests in the meantime.
                                            // If you're also serving http, display a 503 error.
    connection.on('error', function(err) {
      console.log('db error', err);
      if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
        handleDisconnect();                         // lost due to either server restart, or a
      } else {                                      // connnection idle timeout (the wait_timeout
        throw err;                                  // server variable configures this)
      }
    });
  }
  
  handleDisconnect();

function execute(sql) {
    return new Promise ((resolve, reject)=>{
        connection.query(sql,(err,result)=>{
            if (err){
                reject(err);
            }
            else{
                resolve(result);
            }
        });
    });
}

module.exports = {
    execute
}