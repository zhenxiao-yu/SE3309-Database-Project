
-- Orders listing all the info in one
CREATE VIEW OrdersWithInfo (userID, createTime, deliveryFee, status, paymentStatus, Address)
AS SELECT o.userID, o.createTime, o.deliveryFee, os.orderStatus, pi.paymentStatus, si.recipientAddress 
FROM Orders o
JOIN OrderStatus os
JOIN PaymentInfo pi
JOIN ShippingInfo si
WITH CHECK OPTION;

DROP VIEW OrdersWithInfo;
SELECT * FROM OrdersWithInfo;
INSERT INTO OrdersWithInfo VALUES (2, 5, 'Arrived', 'Completed', '125 Street.');

-- price Range of a specific cateogry
CREATE VIEW PriceRangeOfSpecCat (product, price)
AS SELECT p.prodName, p.price 
FROM Product p
WHERE  p.price <= 10
AND p.price >=5
AND Category = "Category 1"
WITH CHECK OPTION;

DROP VIEW PriceRangeOfSpecCat;
SELECT * FROM PriceRangeOfSpecCat;
INSERT INTO PriceRangeOfSpecCat VALUES ("prodName", 2);

-- all products a specific seller is selling 
CREATE VIEW ProdUnderASeller(seller, product, price)
AS SELECT  s.username, prodName, price
FROM allaccount s, product p
WHERE s.id = 1 AND s.id = sellerID
ORDER BY price
WITH CHECK OPTION;

DROP VIEW ProdUnderASeller;
SELECT * FROM ProdUnderASeller;
INSERT INTO ProdUnderASeller VALUES ("seller1", "prod", 4);
