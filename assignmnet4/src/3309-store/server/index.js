//get express package
const express = require("express");
//create express app instance
const app = express();
//using mysql
const mysql = require("mysql");

// //setup db connection
// const db = mysql.createConnection({
//   //your db credentials
//   user:'root',
//   host:'34.66.235.245',
//   password:'admin',
//   database:'SE3309'
// });

//setup db connection
const db = mysql.createConnection({
  //your db credentials
  user: "root",
  host: "localhost",
  password: "615615",
  database: "SE3309",
});

//connect
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySQL connection established");
});

const port = 3001; //port number
const server = `http://localhost:${port}`;
app.listen(port, () => console.log(`Server started. Running at: ${server}`));

//define apis below

//return list of all products
app.get("/products", function (req, res) {});

//insert into product
app.post("/products", (req, res) => {
  const prodName = req.body.prodName;
  const sellerId = req.body.sellerId
  const stock = req.body.stock;
  const price = req.body.price;
  const category = req.body.category;
  const image = req.body.image;
  const subtitle = req.body.subtitle;
  const descr = req.body.descr;
  const prodStatus = req.body.prodStatus;
  db.query(
    "INSERT INTO product (prodName, sellerID, subtitle, image, descr, price, stock, prodStatus) VALUES (?,?,?,?,?,?,?,?)",
    [prodName, sellerId, stock, price, category, image, subtitle, descr, prodStatus],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("values are properly inserted");
      }
    }
  );
});
