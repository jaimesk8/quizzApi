const port = 3000;
const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');
app.use(cors())


//converter data to json como resposta á nossa aplicação
app.use(express.json());
//para obter os dados submetidos no post
app.use(express.urlencoded({extended: true}));

app.use(express.static('public'))

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "quiz"
});

//converter data to json como resposta á nossa aplicação
app.use(express.json());
//para obter os dados submetidos no post
app.use(express.urlencoded({extended: true}));

app.use(express.static('public'))

//select data order by tables 
app.get('/table', (req,res) => {
    connection.query('SELECT * FROM quiz order by nota desc, tempo asc', (error, results, fields) => {
      if(error)
      res.json(error);
       else
      res.json(results);
       console.log("Query Done");
   });
});

// handle POST request to /save endpoint
app.post('/save', (req, res) => {
  // get name and email from request body
  const name = req.body.name;
  const nota = req.body.nota;
  const tempo = req.body.tempo;

  // create MySQL query
  const query = `INSERT INTO quiz (name, nota, tempo) VALUES (?, ?, ?)`;

  // execute query with user input as parameters
  connection.query(query, [name, nota, tempo], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error saving data to MySQL database');
    } else {
      res.send('Data saved to MySQL database');
    }
  });
});

app.get('/get', (req,res) => {

  

});


app.listen(port,'192.168.1.11');

