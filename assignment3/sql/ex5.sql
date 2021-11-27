SELECT COUNT(*) AS count, a.username AS storeName 
FROM Product p, AllAccount a
WHERE p.sellerID = a.id AND p.category = 'Category 1'
GROUP BY a.username
ORDER BY count DESC;

SELECT COUNT(*) AS count, p.prodName as Product
FROM Product p, WishListItem w
WHERE w.prodID = p.id
GROUP BY p.prodName
ORDER BY count DESC;

SELECT SUM(p.price) AS TotalRevenue, AVG(p.price) AS AverageRevenue
FROM Product p
JOIN OrderItem oi ON oi.prodID = p.id
JOIN Orders o ON oi.orderID = o.id
JOIN OrderStatus os ON o.statusID = os.id
WHERE os.orderStatus = 'Arrived';


SELECT AVG(DATEDIFF(os.finishedTime, os.shippedTime)) AS AverageDaysToArrive, a.username
FROM OrderStatus os, AllAccount a
WHERE os.userID = a.id
GROUP BY a.username
ORDER BY AverageDaysToArrive DESC;


SELECT COUNT(*) AS NumOfReviews, AVG(c.prodRating) AS Rating, p.prodName AS Product
FROM Comment c
JOIN Product p ON c.prodID = p.id
GROUP BY p.prodName
HAVING Rating > 5
ORDER BY Rating DESC;

SELECT p.price - (SELECT AVG(p2.price) FROM Product p2 WHERE p2.category = 'Category 1') AS Difference, p.prodName as Product
FROM Product p
WHERE p.category = 'Category 1'
ORDER BY Difference DESC;

SELECT a.username
FROM AllAccount a, TargetedAdvertisement t
WHERE a.id = t.userID AND t.amountToShow = 10;

