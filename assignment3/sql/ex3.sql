-- 1

-- Inserts targeted advertisements for all users for all the products which share the same category of a previously purchased product
INSERT INTO TargetedAdvertisement (userID, prodID, amountToShow)
SELECT a.id, p.id, 10
FROM AllAccount a, Product p
-- Where there exists a product that the user has purchased which has the same category as product p.
WHERE EXISTS   (SELECT *
				FROM OrderItem oi, Orders o, product p2
                WHERE o.userID = a.id -- get only the users orders
					AND oi.orderID = o.id  -- group the order and the order items
					AND oi.prodID = p2.id -- group the product and the order item
                    AND p.category = p2.category) -- only select the products which have the same cateogry of a previously purchased product
;

-- run this statement to see inserted things
SELECT * FROM TargetedAdvertisement;

-- 2

-- turn cart into an order (assuming order 1 was just creating (realisticlaly we'd create before inserting))
INSERT INTO OrderItem (orderID, prodID, purchaseAmount)
SELECT 1, ci.prodID, 1
FROM CartItem ci
-- the cart items are owned by the same user as the order
WHERE ci.userID IN (SELECT o.userID
					FROM Orders o
					WHERE o.id = 1)
;

-- run these two commands to view the inserted things
DELETE FROM  OrderItem WHERE orderID = 1;
SELECT * FROM  OrderItem WHERE orderID = 1;


-- 3

-- insert every product under a certain category into a wishlist
INSERT INTO WishlistItem(userID, prodID)
SELECT 1, p.id
FROM Product p
WHERE p.category = 'Category 0';

-- run these two commands to view inserted things
DELETE FROM WishlistItem WHERE userID = 1;
SELECT * FROM WishlistItem WHERE userID = 1;
