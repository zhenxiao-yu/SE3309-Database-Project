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
  // password: "615615",
  // database: "se3309",

  password: "password",
  database: "ecommerce"
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
//insert into allaccount
app.post("/newUser", (req, res) => {
  
  console.log(req.query);
  const username = req.body.username;
  const pass = req.body.pass;
  const email = req.body.email;
  const phoneNum = req.body.phoneNum;
  const secureQ = req.body.secureQ;
  const secureA = req.body.secureA;
  const storeName= req.body.storeName;
  const sellerFlag = req.body.sellerFlag;
  const userFlag = req.body.userFlag;
  db.query(
    "INSERT INTO AllAccount (username, pass, email, phoneNum, secureQ, secureA, storeName, sellerFlag, userFlag) VALUES (?,?,?,?,?,?,?,?,?)",
    [
      username,
      pass,
      email,
      phoneNum,
      secureQ,
      secureA,
      storeName,
      sellerFlag,
      userFlag,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send(false);
      } else {
        res.send("values are properly inserted");
      }
    }
  );
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
  db.query(
    sql,
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
      productID,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("values are properly updated");
      }
    }
  );
});

//delete product
app.get("/deleteproduct/:id", (req, res) => {
  let productID = req.params.id;
  let sql = `DELETE FROM product WHERE id =?`;
  db.query(sql, [productID], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send("values are properly deleted");
    }
  });
});

// GET all products in specified category 
app.get('/filter-products/',(req, res)=>{
  // Using a query string 
  // Example: .../filter-products/?category=category 1
  // Retrieve query string 
  let category = req.query;
  category = category['category'];
  // Query to get all products in specified category 
  try{
   db.query(`SELECT * FROM product WHERE category="${category}"`,(err, result)=>{
     res.send(result);
   });
  }catch(err){
    if(err){
      res.send(err);
    }
  }
  
});

// Get a product from each category with the most views 
app.get('/most-viewed-product-category/',(req,res)=>{
  try{
    db.query('SELECT * FROM Product WHERE viewCount IN (SELECT MAX(viewCount) FROM Product GROUP BY category)', (err,result)=>{
      res.send(result);
    });
  }catch(err){
    if(err){
      res.send(err);
    }
  }
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

//get all product information and order numbers in order history given a userid
app.get("/orderItems", (req, res) => {
  db.query(
    `SELECT Product.id, prodName, sellerID,subtitle,image,descr,price,stock,prodStatus,viewCount,category, orderID FROM Product JOIN (SELECT orderID,prodID FROM Orders JOIN Orderitem ON Orders.userID = ${req.query.userID} AND Orders.id = Orderitem.orderID) AS T ON Product.id = T.prodID
    `,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//get order date given a userid
app.get("/orderInfo", (req, res) => {
  db.query(`SELECT DISTINCT Orders.id from Orders JOIN Orderitem ON (Orders.id = Orderitem.orderID) WHERE Orders.userID = "${req.query.userID}"`, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//add ordered products to cart given an order id
app.get("/addOrderCart", (req, res) => {
  db.query(`INSERT INTO CartItem (userID,prodID,purchaseAmount) (SELECT ${req.query.userID}, prodID, purchaseAmount FROM OrderItem WHERE orderID = ${req.query.orderNum})`, (err, result) => {
    if (err) {
      console.log(err);
      if (err.code = 'ER_DUP_ENTRY')
        res.send("Duplicate Entry! Please checkout before reordering.");
    } else {
      res.send("Products Added to Cart");
    }
  });
})

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
  db.query(`START TRANSACTION`, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      db.query(`INSERT INTO OrderStatus(userID) VALUES (${req.body.userID})`, (err, result) => {
        if (err) {
          console.log(err);
          Rollback(res);
        } else {
          db.query(`SELECT LAST_INSERT_ID() AS id`, (err2, result2) => {
            if (err2) {
              console.log(err2);
              Rollback(res);
            } else {
              db.query(`INSERT INTO Orders(userID, statusID, paymentID, shippingID) VALUES(${req.body.userID}, ${result2[0].id}, ${req.body.paymentID}, ${req.body.shippingID})`, (err3, result3) => {
                if (err3) {
                  console.log(err3);
                  Rollback(res);
                } else {

                  db.query(`SELECT LAST_INSERT_ID() AS id`, (err4, result4) => {
                    if (err4) {
                      console.log(err4);
                      Rollback(res);
                    } else {
                      db.query(`INSERT INTO OrderItem(orderID, prodID, purchaseAmount) SELECT ${result4[0].id}, prodID, 1 FROM CartItem WHERE userID = ${req.body.userID}`, (err4, result4) => {
                        if (err4) {
                          console.log(err4);
                          Rollback(res);
                        } else {
                          db.query(`DELETE FROM CartItem WHERE userID = ${req.body.userID}`, (err5, result5) => {
                            if (err5) {
                              console.log(err5);
                              Rollback(res);
                            } else {
                              db.query(`COMMIT`, (err6, result6) => {
                                if (err6) {
                                  console.log(err6);
                                } else {
                                  res.send("values are properly inserted");
                                }
                              });

                            }
                          });

                        }
                      });


                    }
                  });
                }
              });


            }
          });


        }
      });
    }
  });



})

function Rollback(res) {
  db.query(`ROLLBACK`, (err6, result6) => {
    if (err6) {
      console.log(err6);
    } else {
      res.send("ERROR - Rolledback");
    }
  });
}


// app.delete()
