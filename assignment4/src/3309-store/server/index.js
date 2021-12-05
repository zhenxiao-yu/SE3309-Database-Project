//get express package
const express = require("express");
//create express app instance
const app = express();
//using mysql
const mysql = require("mysql");
//using cors
const cors = require("cors");

app.use(express.json());
app.use(cors());

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

//return list of all products in reverse order
app.get("/products", (req, res) => {
  db.query("SELECT * FROM product ORDER BY id DESC", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//insert into product
app.post("/newproduct", (req, res) => {
  console.log(req.body);
  const id = req.body.id;
  const prodName = req.body.prodName;
  const sellerID = req.body.sellerID;
  const subtitle = req.body.subtitle;
  const image = req.body.image;
  const descr = req.body.descr;
  const price = req.body.price;
  const stock = req.body.stock;
  const prodStatus = req.body.prodStatus;
  const viewCount = req.body.viewCount;
  const category = req.body.category;
  db.query(
    "INSERT INTO product (id, prodName, sellerID, subtitle, image, descr, price, stock, prodStatus, viewCount, category) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
    [
      id,
      prodName,
      sellerID,
      subtitle,
      image,
      descr,
      price,
      stock,
      prodStatus,
      viewCount,
      category,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("values are properly inserted");
      }
    }
  );
});

app.put("/updateproduct:id", (req, res) => {
  const id = req.body.id;
  const prodName = req.body.prodName;
  const sellerID = req.body.sellerID;
  const subtitle = req.body.subtitle;
  const image = req.body.image;
  const descr = req.body.descr;
  const price = req.body.price;
  const stock = req.body.stock;
  const prodStatus = req.body.prodStatus;
  const viewCount = req.body.viewCount;
  const category = req.body.category;
  db.query(
    "UPDATE SET product (prodName,sellerID,subtitle,image,descr,price,stock,prodStatus,viewCount,category) = (?,?,?,?,?,?,?,?,?,?,?) WHERE id = ?",
    [
      prodName,
      sellerID,
      subtitle,
      image,
      descr,
      price,
      stock,
      prodStatus,
      viewCount,
      category,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("values are updated");
      }
    }
  );
});

// app.delete()
