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
  database: "se3309",
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

//return list of targeted advertisements for a specific user
app.get("/ads", (req, res) => {
  db.query(
    `SELECT p.* FROM Product p, TargetedAdvertisement ta WHERE ta.userID = ${req.query.userID} AND ta.prodID = p.id  AND p.prodStatus <> "Out of Stock"`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

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

//update product
app.put("/updateproduct/:id", (req, res) => {
  let productID = req.params.id;
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
  let sql = `UPDATE product SET prodName = ?, sellerID = ?, subtitle = ?, image = ?, descr = ?, price = ?, stock =?, prodStatus = ?, viewCount = ?, category = ? WHERE id = ?`;
  db.query(sql, [prodName, sellerID, subtitle, image, descr, price, stock, prodStatus, viewCount, category, productID], (err, result)=> {
    if (err) {
      console.log(err);
    } else {
      res.send("values are properly updated");
    }
  });
});

//verify that the given username and password are correct
app.get("/verifylogin", (req, res) => {
  db.query(
    `SELECT id, pass FROM AllAccount WHERE username = "${req.query.username}"`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        if (result[0] != null && result[0].pass == req.query.password) {
          res.send(result[0]);
        } else {
          res.send(false);
        }
      }
    }
  );
});

//get all products in order history given a userid
app.get("/orderItems", (req, res) => {
  db.query(
    `SELECT * FROM Product WHERE Product.id IN (SELECT prodID FROM Orders JOIN Orderitem ON Orders.userID = "${req.query.userID}" AND Orders.id = Orderitem.orderID)`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//get all cart items from a given user id
app.get("/cart", (req, res) => {
  db.query(
    `SELECT p.* FROM Product p, CartItem ci WHERE ci.userID = ${req.query.userID} AND ci.prodID = p.id`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//add to cart given user id, product id
app.get("/addToCart", (req, res) => {
  db.query(
    `INSERT INTO CartItem(userID, prodID, purchaseAmount) VALUES (${req.query.userID}, ${req.query.prodID}, 1)`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("values are properly inserted");
      }
    }
  );
});

//remove a cart item given user id, product id
app.get("/removeCartItem", (req, res) => {
  db.query(
    `DELETE FROM CartItem WHERE userID = ${req.query.userID} AND prodID = ${req.query.prodID}`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("values are properly removed");
      }
    }
  );
});

//get list of payment methods and ids
app.get("/paymentInfo", (req, res) => {
  db.query(
    `SELECT id, paymentMethod FROM PaymentInfo WHERE userID = ${req.query.userID}`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//get list of shipping infos and ids
app.get("/shippingInfo", (req, res) => {
  db.query(
    `SELECT id, recipientAddress FROM ShippingInfo WHERE userID = ${req.query.userID}`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/addOrder", (req, res) => {
  db.query(
    `INSERT INTO OrderStatus(userID) VALUES (${req.body.userID})`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        db.query(`SELECT LAST_INSERT_ID() AS id`, (err2, result2) => {
          if (err2) {
            console.log(err2);
          } else {
            db.query(
              `INSERT INTO Orders(userID, statusID, paymentID, shippingID) VALUES(${req.body.userID}, ${result2[0].id}, ${req.body.paymentID}, ${req.body.shippingID})`,
              (err3, result3) => {
                if (err3) {
                  console.log(err3);
                } else {
                  db.query(`SELECT LAST_INSERT_ID() AS id`, (err4, result4) => {
                    if (err4) {
                      console.log(err4);
                    } else {
                      db.query(
                        `INSERT INTO OrderItem(orderID, prodID, purchaseAmount) SELECT ${result4[0].id}, prodID, 1 FROM CartItem WHERE userID = ${req.body.userID}`,
                        (err4, result4) => {
                          if (err4) {
                            console.log(err4);
                          } else {
                            db.query(
                              `DELETE FROM CartItem WHERE userID = ${req.body.userID}`,
                              (err5, result5) => {
                                if (err5) {
                                  console.log(err5);
                                } else {
                                  res.send("values are properly inserted");
                                }
                              }
                            );
                          }
                        }
                      );
                    }
                  });
                }
              }
            );
          }
        });
      }
    }
  );
});

// app.delete()
