const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");
const app = express();

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Vineet@@013",
    database: "cruddatabase"
});


app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/api/insert', (req, res) => { 
        const sqlInsert = "SELECT * FROM  movieReview;"
        db.query(sqlInsert, [movieName, movieReview], (err, result) => {
        res.send(result);
    });
})


app.post("/api/insert", (req, res) => {
    
    const movieName = req.body.movieName;
    const movieReview = req.body.movieReview;
    
    const sqlInsert = "INSERT INTO movie_reviews(movieName, movieReview) VALUES(?,?);"
    db.query(sqlInsert, [movieName, movieReview], (err, result) => {
        res.send(result);
    });
});

app.delete('/api/delete:movieName', (req, res) => { 
    const name = req.params.movieName;
        const sqlDelete = "DELETE * FROM  movie_reviews WHERE movieName = ?;"
        db.query(sqlDelete, name, (err, result) => {
       if(err) console.log(err);
    });
})


app.put('/api/update', (req, res) => { 
    const name = req.body.movieName;
    const review = req.body.movieReview;
        const sqlUpdate = "UPDATE SET movies = ? WHERE movieName = ?"
        db.query(sqlUpdate,[review, name], (err, result) => {
        if(err) console.log(err);
    });
})




const PORT = 3001;
app.listen(PORT, () => {
    console.log(`server run on ${PORT}`);
})