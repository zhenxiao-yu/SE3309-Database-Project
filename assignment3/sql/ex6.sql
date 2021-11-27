-- Updating the price and status of products under a certain category by a certain seller
UPDATE Product
SET price = price*0.7, prodStatus = 'On Sale'
WHERE sellerID = 101
AND category = 'Category 5';

-- Deleting products from the cart if the purchase amount is greater than 5
DELETE FROM CartItem 
WHERE userId = 4
AND purchaseAmount > 5;

-- Adding products from a previous order into a certain user's cart
INSERT INTO CartItem (userID, prodID,purchaseAmount)
(SELECT 30,prodID,1 FROM OrderItem WHERE orderID = 
(SELECT id FROM ORDERS WHERE createTime = '2021-06-26'));

