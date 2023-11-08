// const sql = require('mssql')

// const Connect2DB = async () => {
//     try {
//         await sql.connect('Server=MOEMENPC\\INSTANCE_2K19_1;Database=datatwo;User Id=sa;Password=First1717;Encrypt=false')
//         const result = await sql.query`select * from tbl_country`
//         console.dir(result)
//     } catch (err) {
//         console.log(err);
//     }
// }
// Connect2DB();

const sql = require('mssql')
const sqlConfig = {
  user: 'sa',
  password: 'First1717',
  database: 'datatwo',
  server: 'MOEMENPC\\INSTANCE_2K19_1',
  pool: {
    max: 10,  // how many connection at the same time will be coonect the database and will be serve 
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: false,
    trustServerCertificate: false // change to true for local dev / self-signed certs
  }
}

const connect2db = async () => {
 try {
  await sql.connect(sqlConfig)
  const result = await sql.query`select * from tbl_country`
  if (result != null) {
    if (result.recordset != null) {
        result.recordset .forEach(row => {
            console.log(row); //row.name or row.country_id
        });
    }
  }
  sql.close();
 } catch (err) {  // catch is ON just in the error mode 
    console.log(err);
 }
 finally{   // mode bye2ta3 fiyya 7atta law ma fi error 
  sql.close();
 }
}
connect2db();