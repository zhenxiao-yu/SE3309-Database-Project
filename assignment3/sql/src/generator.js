// Import mysql connector library 
const mysql = require('mysql');

// Database connection info 
// Variables are substituted with actual values
// Did not include info for security reasons 
const db = mysql.createConnection({
    user: 'root',
    host: '127.0.0.1',
    password: 'password',
    database: 'ecommerce'
});

//return promise to a query (used with async to get list of query)
function query(...query) {

    return new Promise(function (resolve, reject) {

        db.query(...query, (err, rows, fields) => {
            if (err) {
                reject(err);
            }

            resolve(rows);

        });
    });
}

//return random element in the list
function randelement(list) {
    return list[Math.floor(Math.random() * list.length)]
}

function randomDate(start, end) {
    var d = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}



//Function to add accounts
//Does not reference any other table 
async function addAccounts(start, end) {
    console.log("creating Accounts...")

    for (let i = start; i < end; i++) {
        const username = `username${i}`;
        const pass = `password${i}`;
        const email = `user${i}@email.com`;
        const phoneNum = `1234${i}`;
        const secureQ = `question${i}`;
        const secureA = `answer${i}`;
        const storeName = i % 2 == 0 ? `storename${i}` : `no store`;
        const sellerFlag = i % 2 == 0 ? 1 : 0;
        const userFlag = i % 2 !== 0 ? 1 : 0;

        await query('INSERT INTO AllAccount (username, pass, email, phoneNum, secureQ, secureA, storeName, sellerFlag, userFlag) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [username, pass, email, phoneNum, secureQ, secureA, storeName, sellerFlag, userFlag])
    }
}

// Function to add categories 
//Does not refence any other table 
async function addCategory(start, end) {
    console.log("creating Categories...")

    for (let i = start; i < end; i++) {
        const catName = `Category ${i}`;



        await query('INSERT INTO Category (catName) VALUES (?)', [catName])
    }
}



// Function to add products 
// Product references AllAccount and Category tables 
async function addProduct(start, end, rows) {
    console.log("creating Products...")

    let sellers = await query(`SELECT id FROM AllAccount WHERE sellerFlag = "1"`);
    let categories = await query(`SELECT catName FROM Category`);
    let statuses = ['Normal', 'On Sale', 'Out of Stock']

    for (let i = start; i < end; i++) {

        let randNum = Math.ceil(Math.random() * 10) + 1;
        let randPrice = Math.random() * 10;
        randPrice = randPrice.toFixed(2);

        const prodName = `product${i}`;
        const sellerID = randelement(sellers).id;
        const subtitle = `subtitle${i}`;
        const image = `img${i}.jpg`;
        const descr = `description${i}`;
        const price = randPrice;
        const prodStatus = randelement(statuses);
        const stock = (prodStatus === 'Out of Stock') ? 0 : randNum;

        const viewCount = i;
        const category = randelement(categories).catName;
        await query('INSERT INTO Product (prodName, sellerID, subtitle, image, descr, price, stock, prodStatus, viewCount, category) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [prodName, sellerID, subtitle, image, descr, price, stock, prodStatus, viewCount, category])
    }

}

// Function for CartItem references AllAccount(userID) and Product(prodID)
async function addCartItem(start, end) {
    console.log("creating CartItems...")
    let users = await query(`SELECT id FROM AllAccount WHERE userFlag = 1`);
    let products = await query(`SELECT id FROM Product`);

    for (let i = start; i < end; i++) {

        const purchaseAmount = Math.ceil(Math.random() * 10);

        //continue to try if there was a duplicate entry
        while (true) {
            try {
                const userID = randelement(users).id;
                const prodID = randelement(products).id;
                await query('INSERT INTO CartItem (userID, prodID, purchaseAmount) VALUES (?, ?, ?)', [userID, prodID, purchaseAmount])
                break;
            }
            catch (e) {
            }
        }
    }
}

// Function for Comment references AllAccount(userID) and Product(prodID)
async function addComment(start, end) {
    console.log("creating Comments...")

    let users = await query(`SELECT id FROM AllAccount WHERE userFlag = 1`);
    let products = await query(`SELECT id FROM Product`);


    for (let i = start; i < end; i++) {
        const randomNum = Math.random() * 10;
        const prodRating = Math.ceil(randomNum);
        const content = `Random comment${i}`;
        while (true) {
            try {
                const userID = randelement(users).id;
                const prodID = randelement(products).id;
                await query('INSERT INTO Comment (userID, prodID, prodRating, content) VALUES (?, ?, ?, ?)', [userID, prodID, prodRating, content])
                break;
            }
            catch (e) {
            }
        }
    }
}



// Function for OrderStatus references AllAccount(userID)
async function addOrderStatus(start, end) {
    console.log("creating OrderStatuses...")

    let users = await query(`SELECT id FROM AllAccount WHERE userFlag = 1`);

    let statuses = ['Processing', 'Shipped', 'En route', 'delayed', 'Arrived'];


    for (let i = start; i < end; i++) {



        let date1 = randomDate(new Date(2010, 0, 1), new Date());
        let date2 = randomDate(new Date(2010, 0, 1), new Date());

        if (Date.parse(date1) > Date.parse(date2)) {
            let tempdate = date1;
            date1 = date2;
            date2 = tempdate;
        }


        const shippedTime = `${date1} 12:23:40`;
        const finishedTime = `${date2} 12:30:39`;
        const orderStatus = randelement(statuses);

        while (true) {
            try {
                const userID = randelement(users).id;
                await query('INSERT INTO OrderStatus (userID, shippedTime, finishedTime, orderStatus) VALUES (?, ?, ?, ?)', [userID, shippedTime, finishedTime, orderStatus])
                break;
            }
            catch (e) {

            }
        }
    }
}

// Function for PaymentInfo references AllAccount(userID)
async function addPaymentInfo(start, end) {
    console.log("creating PaymentInfos...")

    let users = await query(`SELECT id FROM AllAccount WHERE userFlag = 1`);
    let paymentMethods = ['Creditcard', 'Debitcard']
    let statuses = ['Completed', 'Processing', 'Rejected']

    for (let i = start; i < end; i++) {
        const paymentMethod = randelement(paymentMethods);
        const paymentStatus = randelement(statuses);

        while (true) {
            try {
                const userID = randelement(users).id;
                await query('INSERT INTO PaymentInfo (userID, paymentMethod, paymentStatus) VALUES (?, ?, ?)', [userID, paymentMethod, paymentStatus])
                break;
            }
            catch (e) {

            }
        }
    }

}

// Function for UserLocation references NONE
async function UserLocation(start, end) {
    console.log("creating UserLocations...")

    for (let i = start; i < end; i++) {
        while (true) {
            try {
                let randomNum = Math.random() * 99999;
                randomNum = Math.ceil(randomNum);
                const recipientAddress = `${randomNum} Random St`;
                const recipientZIP = `${randomNum.toString().padStart(5, "0")}`;
                await query('INSERT INTO UserLocation (recipientAddress, recipientZIP) VALUES (?, ?)', [recipientAddress, recipientZIP])
                break;
            } catch (e) { }
        }
    }

}
// Function for WishlistItem references AllAccount(userID) and Product(prodID)
async function addWishListItem(start, end) {
    console.log("creating WishListItems...")

    let users = await query(`SELECT id FROM AllAccount WHERE userFlag = 1`);
    let products = await query(`SELECT id FROM Product`);

    for (let i = start; i < end; i++) {
        const randomNum = Math.floor(Math.random() * (59 - 1 + 1) + 1);
        const priceChanged = 0;
        while (true) {
            try {
                const userID = randelement(users).id;
                const prodID = randelement(products).id;
                await query('INSERT INTO WishlistItem (userID,prodID,priceChanged) VALUES (?, ?, ?)', [userID, prodID, priceChanged])
                break;
            }
            catch (e) {

            }
        }
    }
}

async function addShippingInfos(start, end) {
    console.log("creating ShippingInfos...")
    let users = await query(`SELECT id FROM AllAccount WHERE userFlag = 1`);
    let addresses = await query(`SELECT recipientAddress FROM UserLocation`)

    for (let i = start; i < end; i++) {

        while (true) {
            let name = `name${i}`
            try {
                let userID = randelement(users).id;
                let address = randelement(addresses).recipientAddress;
                await query('INSERT INTO ShippingInfo (userID,recipientAddress,recipientName) VALUES (?, ?, ?)', [userID, address, name])
                break;
            }
            catch (e) {
            }
        }
    }

}

async function addOrders(start, end) {
    console.log("creating Orders...")

    let users = await query(`SELECT id FROM AllAccount WHERE userFlag = 1`);
    for (let i = start; i < end; i++) {

        let orderStatuses, paymentInfos, shippingInfos, user;
        while (true) {
            user = randelement(users).id;
            orderStatuses = await query(`SELECT id FROM OrderStatus WHERE userID = ${user}`);
            paymentInfos = await query(`SELECT id FROM PaymentInfo WHERE userID = ${user}`);
            shippingInfos = await query(`SELECT id from ShippingInfo WHERE userID = ${user}`);

            if (orderStatuses.length != 0 && paymentInfos.length != 0 && shippingInfos.length != 0) {
                break;
            }
        }

        let status = randelement(orderStatuses).id;
        let paymentInfo = randelement(paymentInfos).id;
        let shippingInfo = randelement(shippingInfos).id;



        let randNum = Math.floor(Math.random() * 10);

        while (true) {
            try {
                let date = randomDate(new Date(2010, 0, 1), new Date());
                await query('INSERT INTO Orders (userID,createTime,deliveryFee, statusID, paymentID, shippingID) VALUES (?, ?, ?, ?, ?, ?)', [user, date, randNum, status, paymentInfo, shippingInfo])
                break;
            }
            catch (e) {
            }
        }
    }
}

async function addOrderItems(start, end) {
    console.log("creating OrderItems...")

    let orders = await query(`SELECT id FROM Orders`);
    let products = await query(`SELECT id FROM Product`);

    for (let i = start; i < end; i++) {
        let randNum = Math.ceil(Math.random() * 10);

        while (true) {
            try {
                let order = randelement(orders).id;
                let product = randelement(products).id;
                await query('INSERT INTO OrderItem (orderID,prodID,purchaseAmount) VALUES (?, ?, ?)', [order, product, randNum])
                break;
            }
            catch (e) {

            }
        }
    }
}

// Runs the functions 
// Can enter an arbitrary value for starting and ending value 
setTimeout(() => addAccounts(0, 100), 0)
setTimeout(() => addCategory(0, 500), 500)
setTimeout(() => addProduct(0, 100), 1000)
setTimeout(() => addCartItem(1, 200), 1500)
setTimeout(() => addComment(1, 200), 2000)
setTimeout(() => addOrderStatus(1, 200), 2500)
setTimeout(() => addPaymentInfo(1, 200), 3000)
setTimeout(() => UserLocation(1, 200), 3500)
setTimeout(() => addWishListItem(1, 200), 4000)
setTimeout(() => addShippingInfos(1, 200), 4500)
setTimeout(() => addOrders(1, 200), 10000)
setTimeout(() => addOrderItems(1, 200), 10500)
