const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();

app.use(cors());
app.use(bodyparser.json());

// connect Mysql database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "ag_ecart",
  port: "3306",
});

// check database connection
db.connect((err) => {
  if (err) {
    console.log(err);
  }
  console.log("Database connected successful!");
});

// get all users
app.get("/users", (req, res) => {
  console.log("get all users");
  let sql = `SELECT * FROM users`;
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    }
    if (result.length > 0) {
      res.send({
        message: "All users Data",
        data: result,
      });
    }
  });
});

// get user by ID
app.get("/users/:id", (req, res) => {
  let userId = req.params.id;
  let sql = `SELECT * FROM users WHERE id=${userId}`;
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    }
    if (result.length > 0) {
      res.send({
        message: "All users Data",
        data: result,
      });
    } else {
      res.send({
        message: "Sorry User not found!",
        data: [],
      });
    }
  });
});
// create data
app.post("/users/create", (req, res) => {
  console.log(req.body);
  let fullname = req.body.fullname;
  let email = req.body.email;
  let password = req.body.password;

  let sql = `insert into users(fullname, email, password) value('${fullname}', '${email}', '${password}')`;

  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send({
        message: "Data added success",
      });
    }
  });
});

// Update user
app.put("/users/:id", (req, res) => {
  let userId = req.params.id;
  let fullname = req.body.fullname;
  let email = req.body.email;
  let password = req.body.password;

  let sql = `UPDATE users SET fullname = '${fullname}', email = '${email}', password='${password}' WHERE id=${userId}`;

  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
  });
});

// delete user
app.delete("/users/:id", (req, res) => {
  let userId = req.params.id;

  let sql = `delete from users where id=${userId}`;

  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send({
        message: "Delete success",
      });
    }
  });
});

app.listen(5000, () => {
  console.log("Server is runing on 5000 Port");
});
