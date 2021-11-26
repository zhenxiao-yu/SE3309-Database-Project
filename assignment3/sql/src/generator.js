// Import mysql connector library 
const mysql = require('mysql');

// Database connection info 
// Variables are substituted with actual values
// Did not include info for security reasons 
const db = mysql.createConnection({
    user: DATABASE_USER,
    host: DATABASE_IP,
    password: DATABASE_PASSWORD,
    database: DATABASE_NAME
});

//Function to add accounts
//Does not reference any other table 
function addAccounts(start,end){
    for(let i = start; i<end; i++){
        const username = `username${i}`;
        const pass = `password${i}`;
        const email = `user${i}@email.com`;
        const phoneNum = `1234${i}`;
        const secureQ = `question${i}`;
        const secureA = `answer${i}`;
        const storeName = i%2==0?`storename${i}`:`no store`;
        const sellerFlag = i%2==0?1:0;
        const userFlag = i%2!==0?1:0;

        db.query('INSERT INTO AllAccount (username, pass, email, phoneNum, secureQ, secureA, storeName, sellerFlag, userFlag) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',[username, pass, email, phoneNum, secureQ, secureA, storeName, sellerFlag, userFlag],
    (err,res)=>{
        if(err){
            console.log(err);
        }else{
            console.log(res);
        }
    });
    }
}

// Function to add categories 
//Does not refence any other table 
function addCategory(start,end){
    for(let i = start; i<end; i++){
        const catName = `Category ${i}`;

        db.query('INSERT INTO Category (catName) VALUES (?)',[catName],
        (err,res)=>{
            if(err){
                console.log(err);
            }else{
                console.log(res);
            }
        });
    }
}
// Function to add products 
// Product references AllAccount and Category tables 
function addProduct(start,end) {
    for (let i = start; i < end; i++) {
        let randNum = Math.ceil(Math.random() * 10)+1;
        let randPrice = Math.random() * 10;
        randPrice = randPrice.toFixed(2);
        const prodName = `product${i}`;
        const sellerID = 100 + i;
        const subtitle = `subtitle${i}`;
        const image = `img${i}.jpg`;
        const descr = `description${i}`;
        const price = randPrice;
        const stock = randNum;
        const prodStatus = 'status';
        const viewCount = i;
        const category = `Category ${randNum}`;
        db.query('INSERT INTO Product (prodName, sellerID, subtitle, image, descr, price, stock, prodStatus, viewCount, category) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [prodName, sellerID, subtitle, image, descr, price, stock, prodStatus, viewCount, category],
            (err, res) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(res);
                }
            });
    }

}

// Function for CartItem references AllAccount(userID) and Product(prodID)
function addCartItem(start,end) {
    for (let i = start; i < end; i++) {
        const userID = i;
        const prodID = i;
        const purchaseAmount = Math.ceil(Math.random()*10);

        db.query('INSERT INTO CartItem (userID, prodID, purchaseAmount) VALUES (?, ?, ?)', [userID, prodID, purchaseAmount],
            (err, res) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(res);
                }
            });
    }
}

// Function for Comment references AllAccount(userID) and Product(prodID)
function addComment(start,end) {
    for (let i = start; i < end; i++) {
        const randomNum = Math.random()*10;
        const userID = i;
        const prodID = i;
        const prodRating = Math.ceil(randomNum);
        const content = `Random comment${i}`;
        db.query('INSERT INTO Comment (userID, prodID, prodRating, content) VALUES (?, ?, ?, ?)', [userID, prodID, prodRating, content],
            (err, res) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(res);
                }
            });
    }

}

// Function for OrderStatus references AllAccount(userID)
function addOrderStatus(start,end) {
    for (let i = start; i < end; i++) {
        const userID = i;
        const shippedTime = `2021-11-20 12:23:40`;
        const finishedTime = '2021-11-21 12:30:39';
        const orderStatus = i%2==0?'Delivered':'Packaging';
        db.query('INSERT INTO OrderStatus (userID, shippedTime, finishedTime, orderStatus) VALUES (?, ?, ?, ?)', [userID, shippedTime, finishedTime, orderStatus],
            (err, res) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(res);
                }
            });
    }

}

// Function for PaymentInfo references AllAccount(userID)
function addPaymentInfo(start,end) {
    for (let i = start; i < end; i++) {
        const userID = i;
        const paymentMethod = 'Creditcard';
        const paymentStatus = 'Complete';
        db.query('INSERT INTO PaymentInfo (userID, paymentMethod, paymentStatus) VALUES (?, ?, ?)', [userID, paymentMethod, paymentStatus],
            (err, res) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(res);
                }
            });
    }

}

// Function for TargetedAd references AllAccount(userID) and Product(prodID)
function addTargetedAd(start,end) {
    for (let i = start; i < end; i++) {
        const randomNum = Math.random()*100;
        const userID = i;
        const prodID = i;
        const amountToShow = Math.ceil(randomNum);
        db.query('INSERT INTO TargetedAdvertisement (userID, prodID, amountToShow) VALUES (?, ?, ?)', [userID, prodID, amountToShow],
            (err, res) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(res);
                }
            });
    }

}
// Function for UserLocation references NONE
function UserLocation(start,end) {
    for (let i = start; i < end; i++) {
        const randomNum = Math.random()*1000;
        const recipientAddress = `${Math.ceil(randomNum)} Random St`;
        const recipientZIP = `12${Math.ceil(randomNum)}`;
        db.query('INSERT INTO UserLocation (recipientAddress, recipientZIP) VALUES (?, ?)', [recipientAddress,recipientZIP],
            (err, res) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(res);
                }
            });
    }

}
// Function for WishlistItem references AllAccount(userID) and Product(prodID)
function addWishListItem(start,end) {
    for (let i = start; i < end; i++) {
        const randomNum = Math.floor(Math.random() * (59 - 1 + 1) + 1);
        const userID = i;
        const prodID = i;
        const priceChanged = 1;
        const priceChangedTime = `2021-11-20 12:${randomNum}:${randomNum}`;
        db.query('INSERT INTO WishlistItem (userID,prodID,priceChanged,priceChangedTime) VALUES (?, ?, ?, ?)', [userID, prodID, priceChanged, priceChangedTime],
            (err, res) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(res);
                }
            });
    }

}

// Runs the functions 
// Can enter an arbitrary value for starting and ending value 
//addAccounts();
//addCategory();
//addProduct();
//addCartItem(1,200); 
//addComment(1,200); 
//addOrderStatus(1,200); 
//addPaymentInfo(1,200); 
//addTargetedAd(1,200);
//UserLocation(1,200);
//addWishListItem(1,200);
