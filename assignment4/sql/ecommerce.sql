-- TABLES
CREATE TABLE Category(
catName VARCHAR(32) NOT NULL,
PRIMARY KEY (catName)
);

CREATE TABLE AllAccount(
id INT NOT NULL AUTO_INCREMENT,
username VARCHAR(32) NOT NULL UNIQUE,
pass VARCHAR(32) NOT NULL 
	CHECK(CHAR_LENGTH(pass) > 6),
email VARCHAR(32) NOT NULL UNIQUE
	CHECK (email LIKE '%@%.%'),
phoneNum CHAR(10) NOT NULL UNIQUE
	CHECK (phoneNum NOT LIKE '%[^0-9]%'),
secureQ VARCHAR(128) NOT NULL,
secureA VARCHAR(32) NOT NULL,
storeName VARCHAR(64),
sellerFlag BOOL NOT NULL,
userFlag BOOL NOT NULL,
PRIMARY KEY (id)
);

CREATE TABLE Product(
id INT NOT NULL AUTO_INCREMENT,
prodName VARCHAR(32) NOT NULL,
sellerID INT NOT NULL,
subtitle VARCHAR(64),
image VARCHAR(512),
descr VARCHAR(512),
price DECIMAL(10, 2) NOT NULL
	CHECK (price >= 0),
stock INT NOT NULL DEFAULT 0
	CHECK (stock >= 0),
prodStatus VARCHAR(32) NOT NULL DEFAULT 'Normal'
	CHECK (prodStatus IN ('Normal', 'On Sale', 'Out of Stock')),
viewCount INT NOT NULL DEFAULT 0
	CHECK (viewCount >= 0),
category VARCHAR(32) NOT NULL,
PRIMARY KEY (id),
UNIQUE (prodName, sellerID),
FOREIGN KEY (sellerID) REFERENCES AllAccount(id)
	ON DELETE NO ACTION ON UPDATE CASCADE,
FOREIGN KEY (category) REFERENCES Category(catName)
	ON DELETE NO ACTION ON UPDATE CASCADE
);

CREATE TABLE Comment(
id INT NOT NULL AUTO_INCREMENT,
userID INT NOT NULL,
prodID INT NOT NULL,
prodRating INT NOT NULL DEFAULT 5
	CHECK (prodRating BETWEEN 0 AND 10),
content VARCHAR(128),
PRIMARY KEY (id),
UNIQUE (userID, prodID),
FOREIGN KEY (userID) REFERENCES AllAccount(id)
	ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (prodID) REFERENCES Product(id)
	ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE UserLocation(
recipientAddress VARCHAR(64) NOT NULL,
recipientZIP CHAR(5) NOT NULL,
PRIMARY KEY (recipientAddress) 
);

CREATE TABLE ShippingInfo(
id INT NOT NULL AUTO_INCREMENT,
userID INT NOT NULL,
recipientAddress VARCHAR(64) NOT NULL,
recipientName VARCHAR(64) NOT NULL,
PRIMARY KEY (id),
UNIQUE (userID, recipientAddress),
FOREIGN KEY (userID) REFERENCES AllAccount(id)
	ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (recipientAddress) REFERENCES userLocation (recipientAddress)
	ON DELETE NO ACTION ON UPDATE CASCADE
);

CREATE TABLE PaymentInfo(
id INT NOT NULL AUTO_INCREMENT,
userID INT NOT NULL,
paymentMethod VARCHAR(32) NOT NULL,
paymentStatus VARCHAR(32) NOT NULL DEFAULT 'Processing'
	CHECK (paymentStatus IN ('Completed', 'Processing', 'Rejected')),
PRIMARY KEY (id),
UNIQUE (userID, paymentMethod),
FOREIGN KEY (userID) REFERENCES AllAccount (id)
	ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE OrderStatus(
id INT NOT NULL AUTO_INCREMENT,
userID INT NOT NULL,
shippedTime DATE,
finishedTime DATE,
orderStatus VARCHAR(32) NOT NULL DEFAULT 'Processing'
	CHECK (orderStatus IN ('Processing', 'Shipped', 'En route', 'delayed', 'Arrived')),
PRIMARY KEY (id),
FOREIGN KEY (userID) REFERENCES AllAccount (id)
	ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Orders(
id INT NOT NULL AUTO_INCREMENT,
userID INT NOT NULL,
createTime DATE NOT NULL DEFAULT (CURRENT_DATE),
deliveryFee INT NOT NULL DEFAULT 0
	CHECK (deliveryFee >= 0),
statusID INT NOT NULL,
paymentID INT NOT NULL,
shippingID INT NOT NULL,
PRIMARY KEY (id),
FOREIGN KEY (userID) REFERENCES AllAccount (id)
	ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (statusID) REFERENCES OrderStatus (id)
	ON DELETE NO ACTION ON UPDATE CASCADE,
FOREIGN KEY (paymentID) REFERENCES PaymentInfo (id)
	ON DELETE NO ACTION ON UPDATE CASCADE,
FOREIGN KEY (shippingID) REFERENCES ShippingInfo (id)
	ON DELETE NO ACTION ON UPDATE CASCADE
);

CREATE TABLE OrderItem(
id INT NOT NULL AUTO_INCREMENT,
orderID INT NOT NULL,
prodID INT NOT NULL,
purchaseAmount INT NOT NULL DEFAULT 0
	CHECK (purchaseAmount >= 0),
PRIMARY KEY (id),
UNIQUE (orderID, prodID),
FOREIGN KEY (orderID) REFERENCES Orders (id)
	ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (prodID) REFERENCES Product (id)
	ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE CartItem(
id INT NOT NULL AUTO_INCREMENT,
userID INT NOT NULL,
prodID INT NOT NULL,
purchaseAmount INT NOT NULL DEFAULT 0
	CHECK (purchaseAmount >= 0),
PRIMARY KEY (id),
UNIQUE (userID, prodID),
FOREIGN KEY (userID) REFERENCES AllAccount (id)
	ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (prodID) REFERENCES Product (id)
	ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE WishlistItem(
id INT NOT NULL AUTO_INCREMENT,
userID INT NOT NULL,
prodID INT NOT NULL,
priceChanged BOOL NOT NULL DEFAULT FALSE,
priceChangedTime DATETIME,
PRIMARY KEY (id),
UNIQUE (userID, prodID),
FOREIGN KEY (userID) REFERENCES AllAccount (id)
	ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (prodID) REFERENCES Product (id)
	ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE TargetedAdvertisement (
id INT NOT NULL AUTO_INCREMENT,
userID INT NOT NULL,
prodID INT NOT NULL,
amountToShow INT NOT NULL DEFAULT 0
	CHECK (amountToShow >= 0),
PRIMARY KEY (id),
FOREIGN KEY (userID) REFERENCES AllAccount (id)
	ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (prodID) REFERENCES Product (id)
	ON DELETE CASCADE ON UPDATE CASCADE
);

-- VIEWS

-- Orders listing all the info in one
CREATE VIEW OrdersWithInfo (userID, createTime, deliveryFee, status, paymentStatus, Address)
AS SELECT o.userID, o.createTime, o.deliveryFee, os.orderStatus, pi.paymentStatus, si.recipientAddress 
FROM Orders o
JOIN OrderStatus os
JOIN PaymentInfo pi
JOIN ShippingInfo si
WITH CHECK OPTION;

-- price Range of a specific cateogry
CREATE VIEW PriceRangeOfSpecCat (product, price)
AS SELECT p.prodName, p.price 
FROM Product p
WHERE  p.price <= 10
AND p.price >=5
AND Category = "Category 1"
WITH CHECK OPTION;

-- all products a specific seller is selling 
CREATE VIEW ProdUnderASeller(seller, product, price)
AS SELECT  s.username, prodName, price
FROM allaccount s, product p
WHERE s.id = 1 AND s.id = sellerID
ORDER BY price
WITH CHECK OPTION;


-- TRIGGERS
DELIMITER $$

CREATE TRIGGER addAds
AFTER INSERT
ON orderItem FOR EACH ROW
BEGIN
	INSERT INTO TargetedAdvertisement(userID, prodID, amountToShow)
    SELECT o.userID, p2.id, 10
    FROM Orders o, product p1, product p2
    WHERE o.id = NEW.orderID
		AND NEW.prodID = p1.id	
        AND p2.category = p1.category;
END$$

DELIMITER ;

-- INSERTS

INSERT INTO AllAccount (username, pass, email, phoneNum, secureQ, secureA, storeName, sellerFlag, userFlag)
	VALUES ("user", "password", "user@gmail.com", "1233321234", "question", "answer", NULL, 0, 1);

INSERT INTO AllAccount (username, pass, email, phoneNum, secureQ, secureA, storeName, sellerFlag, userFlag)
	VALUES ("seller", "password", "seller@gmail.com", "1233321235", "question", "answer", "store", 1, 0);
    
    
INSERT INTO PaymentInfo(userID, paymentMethod, paymentStatus)
	VALUES (1, "Credit Card", "Processing");
    
INSERT INTO PaymentInfo(userID, paymentMethod, paymentStatus)
	VALUES (1, "Debit Card", "Processing");
    
INSERT INTO UserLocation(recipientAddress, recipientZIP)
	VALUES ("124 Richmond St.", "25234");
    
INSERT INTO UserLocation(recipientAddress, recipientZIP)
	VALUES ("522 Western St.", "24234");

INSERT INTO ShippingInfo(userID, recipientAddress, recipientName)
	VALUES (1, "124 Richmond St.", "Andrew Blommestyn");

INSERT INTO ShippingInfo(userID, recipientAddress, recipientName)
	VALUES (1, "522 Western St.", "Andrew Blommestyn");

    
INSERT INTO Category (catname)
	VALUES ("Monitors");
    
INSERT INTO Category (catname)
	VALUES ("Computers");

INSERT INTO Category (catname)
	VALUES ("Phones");
    
INSERT INTO Category (catname)
	VALUES ("Furniture");

INSERT INTO Category (catname)
	VALUES ("Game Consoles");
    
INSERT INTO Category(catname)
	VALUES ("Computer Mice");
    
    
INSERT INTO Product(prodName, sellerID, subtitle, image, descr, price, stock, prodStatus, viewCount, category)
	VALUES ("Samsung Galaxy A12", 2, "Samsung Galaxy", "https://m.media-amazon.com/images/I/91OIsbTx3RL._AC_SX522_.jpg", "This is a good phone", 257.18, 20, "Normal", 200, "Phones");
    
INSERT INTO Product(prodName, sellerID, subtitle, image, descr, price, stock, prodStatus, viewCount, category)
	VALUES ("Vtech Dect 6.0", 2, "Vtech Dect 6.0", "https://m.media-amazon.com/images/I/71pgneKyxhL._AC_SX679_.jpg", "This is a bad phone", 25.28, 5, "On Sale", 10, "Phones");
    
INSERT INTO Product(prodName, sellerID, subtitle, image, descr, price, stock, prodStatus, viewCount, category)
	VALUES ("Apple iPhone 8", 2, "Apple iPhone 8", "https://m.media-amazon.com/images/I/61pRPj+-IYL._AC_SX425_.jpg", "This is a good phone", 100.28, 5, "Normal", 100, "Phones");
    
INSERT INTO Product(prodName, sellerID, subtitle, image, descr, price, stock, prodStatus, viewCount, category)
	VALUES ("Apple iPhone 11", 2, "Apple iPhone 11", "https://m.media-amazon.com/images/I/81x9I9qXbmL._AC_SY679_.jpg", "This is a good phone", 1000.28, 5, "Normal", 1000, "Phones");
    
INSERT INTO Product(prodName, sellerID, subtitle, image, descr, price, stock, prodStatus, viewCount, category)
	VALUES ("SAMSUNG T350", 2, "SAMSUNG T350", "https://m.media-amazon.com/images/I/61B8Lq5NXmL._AC_SX679_.jpg", "A monitor", 100.15, 100, "Normal", 100, "Monitors");
    
INSERT INTO Product(prodName, sellerID, subtitle, image, descr, price, stock, prodStatus, viewCount, category)
	VALUES ("LG UltraWide", 2, "LG UltraWide", "https://m.media-amazon.com/images/I/71IW2e-PTYS._AC_SX679_.jpg", "A monitor", 300.15, 0, "Out of Stock", 100, "Monitors");
    
INSERT INTO Product(prodName, sellerID, subtitle, image, descr, price, stock, prodStatus, viewCount, category)
	VALUES ("AOC C24G1A 24", 2, "AOC C24G1A 24", "https://m.media-amazon.com/images/I/81GJkTKuLnL._AC_SX679_.jpg", "A monitor", 300.15, 25, "Normal", 155, "Monitors");

INSERT INTO Product(prodName, sellerID, subtitle, image, descr, price, stock, prodStatus, viewCount, category)
	VALUES ("Samsung LC24F390FHNXZA", 2, "Samsung LC24F390FHNXZA", "https://m.media-amazon.com/images/I/81vT0S30GML._AC_SX679_.jpg", "A monitor", 200.15, 255, "Normal", 1552, "Monitors");

INSERT INTO Product(prodName, sellerID, subtitle, image, descr, price, stock, prodStatus, viewCount, category)
	VALUES ("Asus Full HD 1080P IPS ", 2, "Asus Full HD 1080P IPS ", "https://m.media-amazon.com/images/I/81qGehoKOgL._AC_SX679_.jpg", "A monitor", 100.15, 255, "Normal", 152, "Monitors");

INSERT INTO Product(prodName, sellerID, subtitle, image, descr, price, stock, prodStatus, viewCount, category)
	VALUES ("Logitech MX Master 3", 2, "Logitech MX Master 3", "https://m.media-amazon.com/images/I/614w3LuZTYL._AC_SX679_.jpg", "A mouse", 120.15, 15, "On Sale", 1000, "Computer Mice");
    
INSERT INTO Product(prodName, sellerID, subtitle, image, descr, price, stock, prodStatus, viewCount, category)
	VALUES ("Logitech M100", 2, "Logitech M100", "https://m.media-amazon.com/images/I/61hzuoXwjqL._AC_SX679_.jpg", "A mouse", 10.25, 25, "Normal", 5, "Computer Mice");
    
INSERT INTO Product(prodName, sellerID, subtitle, image, descr, price, stock, prodStatus, viewCount, category)
	VALUES ("Razer DeathAdder", 2, "Razer DeathAdder", "https://m.media-amazon.com/images/I/51XM+ldQ7JS._AC_SX425_.jpg", "A Razer DeathAdder", 70.25, 25, "Normal", 5, "Computer Mice");
    
INSERT INTO Product(prodName, sellerID, subtitle, image, descr, price, stock, prodStatus, viewCount, category)
	VALUES ("Logitech Ergo M575", 2, "Logitech Ergo M575", "https://m.media-amazon.com/images/I/61XGs1IK3NL._AC_SX679_.jpg", "A Logitech Ergo M575", 50.25, 25, "On Sale", 52, "Computer Mice");
    
INSERT INTO Product(prodName, sellerID, subtitle, image, descr, price, stock, prodStatus, viewCount, category)
	VALUES ("FelixKing Ergonomic Desk Chair", 2, "FelixKing Ergonomic Desk Chair", "https://m.media-amazon.com/images/I/71a6B5GHDcL._AC_SX679_.jpg", "A chair", 125.25, 25, "Normal", 5, "Furniture");
    
INSERT INTO Product(prodName, sellerID, subtitle, image, descr, price, stock, prodStatus, viewCount, category)
	VALUES ("Winsome Wood Hamilton", 2, "Winsome Wood Hamilton", "https://m.media-amazon.com/images/I/81vLvcHIVXL._AC_SX679_.jpg", "A chair", 15.25, 25, "Normal", 55, "Furniture");
    
INSERT INTO Product(prodName, sellerID, subtitle, image, descr, price, stock, prodStatus, viewCount, category)
	VALUES ("3-Shelf Bookcase", 2, "Sauder Beginnings 3-Shelf Bookcase", "https://m.media-amazon.com/images/I/81HDAAJfYqL._AC_SX679_.jpg", "A bookcase", 52.25, 0, "Out of Stock", 35, "Furniture");
    
INSERT INTO Product(prodName, sellerID, subtitle, image, descr, price, stock, prodStatus, viewCount, category)
	VALUES ("Gaming Chair", 2, "Gaming Chair", "https://m.media-amazon.com/images/I/61PYga8-p1L._AC_SX679_.jpg", "A Gaming Chair", 52.25, 0, "Out of Stock", 355, "Furniture");
    
INSERT INTO Product(prodName, sellerID, subtitle, image, descr, price, stock, prodStatus, viewCount, category)
	VALUES ("Office Chair", 2, "Office Chair", "https://m.media-amazon.com/images/I/51e6ordpUyL._AC_SX679_.jpg", "A Office Chair", 152.25, 25, "Normal", 355, "Furniture");
    
INSERT INTO Product(prodName, sellerID, subtitle, image, descr, price, stock, prodStatus, viewCount, category)
	VALUES ("Zinus Contemporary Sofa", 2, "Zinus Contemporary Sofa", "https://m.media-amazon.com/images/I/710+ofWuGOL._AC_SX679_.jpg", "A Zinus Contemporary Sofa", 452.25, 25, "Normal", 355, "Furniture");
    
INSERT INTO Product(prodName, sellerID, subtitle, image, descr, price, stock, prodStatus, viewCount, category)
	VALUES ("Aerys Sectional Sofa", 2, "Aerys Sectional Sofa", "https://m.media-amazon.com/images/I/71Vd+YEmceL._AC_SX679_.jpg", "A Aerys Sectional Sofa", 1052.25, 10, "Normal", 3555, "Furniture");
    
INSERT INTO Product(prodName, sellerID, subtitle, image, descr, price, stock, prodStatus, viewCount, category)
	VALUES ("HOMCOM Computer Office Desk", 2, "HOMCOM Computer Office Desk", "https://m.media-amazon.com/images/I/71BdIqFft3L._AC_SX679_.jpg", "A HOMCOM Computer Office Desk", 252.25, 25, "Normal", 355, "Furniture");
    
INSERT INTO Product(prodName, sellerID, subtitle, image, descr, price, stock, prodStatus, viewCount, category)
	VALUES ("PlayStation 5", 2, "PlayStation 5", "https://m.media-amazon.com/images/I/619BkvKW35L._AC_SX679_.jpg", "A ps5", 525.25, 0, "Out of Stock", 3555, "Game Consoles");
    
INSERT INTO Product(prodName, sellerID, subtitle, image, descr, price, stock, prodStatus, viewCount, category)
	VALUES ("PlayStation 4", 2, "PlayStation 4", "https://m.media-amazon.com/images/I/715RBdgZtHL._AC_SX679_.jpg", "A ps4", 255.25, 25, "On Sale", 125, "Game Consoles");

INSERT INTO Product(prodName, sellerID, subtitle, image, descr, price, stock, prodStatus, viewCount, category)
	VALUES ("Xbox One", 2, "Xbox One", "https://m.media-amazon.com/images/I/61CnOKdmBeL._AC_SX522_.jpg", "A xbox one", 255.25, 25, "On Sale", 125, "Game Consoles");

INSERT INTO Product(prodName, sellerID, subtitle, image, descr, price, stock, prodStatus, viewCount, category)
	VALUES ("Nintendo Switch", 2, "Nintendo Switch", "https://m.media-amazon.com/images/I/61-PblYntsL._AC_SX679_.jpg", "A Nintendo Switch", 355.25, 225, "Normal", 1255, "Game Consoles");

INSERT INTO Product(prodName, sellerID, subtitle, image, descr, price, stock, prodStatus, viewCount, category)
	VALUES ("Dell Optiplex", 2, "Dell Optiplex", "https://m.media-amazon.com/images/I/61Zp2XEDwxL._AC_SX679_.jpg", "A Dell Optiplex", 25.25, 22, "Normal", 255, "Computers");

INSERT INTO Product(prodName, sellerID, subtitle, image, descr, price, stock, prodStatus, viewCount, category)
	VALUES ("ASUS Laptop L210", 2, "ASUS Laptop L210", "https://m.media-amazon.com/images/I/71yFS5NECmL._AC_SX679_.jpg", "A ASUS Laptop L210", 252.25, 22, "Normal", 255, "Computers");
    
INSERT INTO Product(prodName, sellerID, subtitle, image, descr, price, stock, prodStatus, viewCount, category)
	VALUES ("CyberpowerPC CYBERRPOWERPC", 2, "CyberpowerPC CYBERRPOWERPC", "https://m.media-amazon.com/images/I/71xAEV4zifL._AC_SX679_.jpg", "A CyberpowerPC CYBERRPOWERPC", 2522.25, 222, "Normal", 2555, "Computers");
    
INSERT INTO Product(prodName, sellerID, subtitle, image, descr, price, stock, prodStatus, viewCount, category)
	VALUES ("Samsung Galaxy Book", 2, "Samsung Galaxy Book", "https://m.media-amazon.com/images/I/71lx9CwnP-L._AC_SX679_.jpg", "A Samsung Galaxy Book", 800.25, 22, "On Sale", 255, "Computers");
    
INSERT INTO Product(prodName, sellerID, subtitle, image, descr, price, stock, prodStatus, viewCount, category)
	VALUES ("HP Elite 8300", 2, "HP Elite 8300", "https://m.media-amazon.com/images/I/71ElgLTErrL._AC_SX679_.jpg", "A HP Elite 8300", 900.25, 22, "On Sale", 25, "Computers");
