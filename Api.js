const express = require('express')
const app = express()
const sql = require('mssql')
const bodyParser = require('body-parser')
app.use(bodyParser.json()) 


const _PORT = 3000
const sqlConfig = {
    user: 'sa',
    password: 'First1717$',
    database: 'DataPerson',
    server: 'MOEMENPC\\INSTANCE_2K19_1',
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000
    },
    options: {
      encrypt: false,
      trustServerCertificate: false
    }
  }



//end point to get person 
app.get('/GetPersons',async function (req, res) {
        res.send(await GetPersonsFromDb())
})

//end point to add person 
app.post('/AddPersons',async function (req, res) {
    var data = await AddPersonsToDb(req.body);
    res.send(data)
})

//function to get data from db
const GetPersonsFromDb = async () => {
    try {
     await sql.connect(sqlConfig)
     const result = await sql.query`SELECT
     TBL_PERSON.NAME 'person',
     TBL_COUNTRY.NAME 'country',
     TBL_GENDER.NAME 'Gender'
FROM TBL_PERSON	
     INNER JOIN TBL_COUNTRY  ON TBL_PERSON.COUNTRY_ID = TBL_COUNTRY.COUNTRY_ID
     INNER JOIN TBL_GENDER  ON TBL_PERSON.GENDER_ID = TBL_GENDER.GENDER_ID`
     return result.recordset;
    } catch (err) {
       console.log(err);
    }
    finally{
     sql.close();
    }
   }

//function to post data to db
   const AddPersonsToDb = async (person) => {
      const _INSERT_QUERY = ```INSERT INTO 
                              [TBL_PERSON] ([NAME],[COUNTRY_ID],[GENDER_ID]) 
                              VALUES ('${person.NAME}',${person.COUNTRY_ID},${person.GENDER_ID})```
    try {
     await sql.connect(sqlConfig)
     const result = await sql.query(_INSERT_QUERY);
     sql.close();
    } catch (err) {
       console.log(err);
    }
    finally{
     sql.close();
    }
   }

app.listen(3000)