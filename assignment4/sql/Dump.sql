CREATE DATABASE  IF NOT EXISTS `ecommerce` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `ecommerce`;
-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: localhost    Database: ecommerce
-- ------------------------------------------------------
-- Server version	8.0.27

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `allaccount`
--

DROP TABLE IF EXISTS `allaccount`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `allaccount` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(32) NOT NULL,
  `pass` varchar(32) NOT NULL,
  `email` varchar(32) NOT NULL,
  `phoneNum` char(10) NOT NULL,
  `secureQ` varchar(128) NOT NULL,
  `secureA` varchar(32) NOT NULL,
  `storeName` varchar(64) DEFAULT NULL,
  `sellerFlag` tinyint(1) NOT NULL,
  `userFlag` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `phoneNum` (`phoneNum`),
  CONSTRAINT `allaccount_chk_1` CHECK ((char_length(`pass`) > 6)),
  CONSTRAINT `allaccount_chk_2` CHECK ((`email` like _utf8mb4'%@%.%')),
  CONSTRAINT `allaccount_chk_3` CHECK ((not((`phoneNum` like _utf8mb4'%[^0-9]%'))))
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `allaccount`
--

LOCK TABLES `allaccount` WRITE;
/*!40000 ALTER TABLE `allaccount` DISABLE KEYS */;
INSERT INTO `allaccount` VALUES (1,'user','password','user@gmail.com','1233321234','question','answer',NULL,0,1),(2,'seller','password','seller@gmail.com','1233321235','question','answer','store',1,0);
/*!40000 ALTER TABLE `allaccount` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cartitem`
--

DROP TABLE IF EXISTS `cartitem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cartitem` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userID` int NOT NULL,
  `prodID` int NOT NULL,
  `purchaseAmount` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `userID` (`userID`,`prodID`),
  KEY `prodID` (`prodID`),
  CONSTRAINT `cartitem_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `allaccount` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `cartitem_ibfk_2` FOREIGN KEY (`prodID`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `cartitem_chk_1` CHECK ((`purchaseAmount` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cartitem`
--

LOCK TABLES `cartitem` WRITE;
/*!40000 ALTER TABLE `cartitem` DISABLE KEYS */;
/*!40000 ALTER TABLE `cartitem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `catName` varchar(32) NOT NULL,
  PRIMARY KEY (`catName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES ('Computer Mice'),('Computers'),('Furniture'),('Game Consoles'),('Monitors'),('Phones');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userID` int NOT NULL,
  `prodID` int NOT NULL,
  `prodRating` int NOT NULL DEFAULT '5',
  `content` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `userID` (`userID`,`prodID`),
  KEY `prodID` (`prodID`),
  CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `allaccount` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`prodID`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `comment_chk_1` CHECK ((`prodRating` between 0 and 10))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orderitem`
--

DROP TABLE IF EXISTS `orderitem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orderitem` (
  `id` int NOT NULL AUTO_INCREMENT,
  `orderID` int NOT NULL,
  `prodID` int NOT NULL,
  `purchaseAmount` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `orderID` (`orderID`,`prodID`),
  KEY `prodID` (`prodID`),
  CONSTRAINT `orderitem_ibfk_1` FOREIGN KEY (`orderID`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `orderitem_ibfk_2` FOREIGN KEY (`prodID`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `orderitem_chk_1` CHECK ((`purchaseAmount` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderitem`
--

LOCK TABLES `orderitem` WRITE;
/*!40000 ALTER TABLE `orderitem` DISABLE KEYS */;
/*!40000 ALTER TABLE `orderitem` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `addAds` AFTER INSERT ON `orderitem` FOR EACH ROW BEGIN
	INSERT INTO TargetedAdvertisement(userID, prodID, amountToShow)
    SELECT o.userID, p2.id, 10
    FROM Orders o, product p1, product p2
    WHERE o.id = NEW.orderID
		AND NEW.prodID = p1.id	
        AND p2.category = p1.category;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userID` int NOT NULL,
  `createTime` date NOT NULL DEFAULT (curdate()),
  `deliveryFee` int NOT NULL DEFAULT '0',
  `statusID` int NOT NULL,
  `paymentID` int NOT NULL,
  `shippingID` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userID` (`userID`),
  KEY `statusID` (`statusID`),
  KEY `paymentID` (`paymentID`),
  KEY `shippingID` (`shippingID`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `allaccount` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`statusID`) REFERENCES `orderstatus` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`paymentID`) REFERENCES `paymentinfo` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `orders_ibfk_4` FOREIGN KEY (`shippingID`) REFERENCES `shippinginfo` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `orders_chk_1` CHECK ((`deliveryFee` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orderstatus`
--

DROP TABLE IF EXISTS `orderstatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orderstatus` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userID` int NOT NULL,
  `shippedTime` date DEFAULT NULL,
  `finishedTime` date DEFAULT NULL,
  `orderStatus` varchar(32) NOT NULL DEFAULT 'Processing',
  PRIMARY KEY (`id`),
  KEY `userID` (`userID`),
  CONSTRAINT `orderstatus_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `allaccount` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `orderstatus_chk_1` CHECK ((`orderStatus` in (_utf8mb4'Processing',_utf8mb4'Shipped',_utf8mb4'En route',_utf8mb4'delayed',_utf8mb4'Arrived')))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderstatus`
--

LOCK TABLES `orderstatus` WRITE;
/*!40000 ALTER TABLE `orderstatus` DISABLE KEYS */;
/*!40000 ALTER TABLE `orderstatus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `orderswithinfo`
--

DROP TABLE IF EXISTS `orderswithinfo`;
/*!50001 DROP VIEW IF EXISTS `orderswithinfo`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `orderswithinfo` AS SELECT 
 1 AS `userID`,
 1 AS `createTime`,
 1 AS `deliveryFee`,
 1 AS `status`,
 1 AS `paymentStatus`,
 1 AS `Address`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `paymentinfo`
--

DROP TABLE IF EXISTS `paymentinfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `paymentinfo` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userID` int NOT NULL,
  `paymentMethod` varchar(32) NOT NULL,
  `paymentStatus` varchar(32) NOT NULL DEFAULT 'Processing',
  PRIMARY KEY (`id`),
  UNIQUE KEY `userID` (`userID`,`paymentMethod`),
  CONSTRAINT `paymentinfo_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `allaccount` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `paymentinfo_chk_1` CHECK ((`paymentStatus` in (_utf8mb4'Completed',_utf8mb4'Processing',_utf8mb4'Rejected')))
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paymentinfo`
--

LOCK TABLES `paymentinfo` WRITE;
/*!40000 ALTER TABLE `paymentinfo` DISABLE KEYS */;
INSERT INTO `paymentinfo` VALUES (1,1,'Credit Card','Processing'),(2,1,'Debit Card','Processing');
/*!40000 ALTER TABLE `paymentinfo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `pricerangeofspeccat`
--

DROP TABLE IF EXISTS `pricerangeofspeccat`;
/*!50001 DROP VIEW IF EXISTS `pricerangeofspeccat`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `pricerangeofspeccat` AS SELECT 
 1 AS `product`,
 1 AS `price`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `prodName` varchar(32) NOT NULL,
  `sellerID` int NOT NULL,
  `subtitle` varchar(64) DEFAULT NULL,
  `image` varchar(512) DEFAULT NULL,
  `descr` varchar(512) DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `stock` int NOT NULL DEFAULT '0',
  `prodStatus` varchar(32) NOT NULL DEFAULT 'Normal',
  `viewCount` int NOT NULL DEFAULT '0',
  `category` varchar(32) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `prodName` (`prodName`,`sellerID`),
  KEY `sellerID` (`sellerID`),
  KEY `category` (`category`),
  CONSTRAINT `product_ibfk_1` FOREIGN KEY (`sellerID`) REFERENCES `allaccount` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `product_ibfk_2` FOREIGN KEY (`category`) REFERENCES `category` (`catName`) ON UPDATE CASCADE,
  CONSTRAINT `product_chk_1` CHECK ((`price` >= 0)),
  CONSTRAINT `product_chk_2` CHECK ((`stock` >= 0)),
  CONSTRAINT `product_chk_3` CHECK ((`prodStatus` in (_utf8mb4'Normal',_utf8mb4'On Sale',_utf8mb4'Out of Stock'))),
  CONSTRAINT `product_chk_4` CHECK ((`viewCount` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'Samsung Galaxy A12',2,'Samsung Galaxy','https://m.media-amazon.com/images/I/91OIsbTx3RL._AC_SX522_.jpg','This is a good phone',257.18,20,'Normal',200,'Phones'),(2,'Vtech Dect 6.0',2,'Vtech Dect 6.0','https://m.media-amazon.com/images/I/71pgneKyxhL._AC_SX679_.jpg','This is a bad phone',25.28,5,'On Sale',10,'Phones'),(3,'Apple iPhone 8',2,'Apple iPhone 8','https://m.media-amazon.com/images/I/61pRPj+-IYL._AC_SX425_.jpg','This is a good phone',100.28,5,'Normal',100,'Phones'),(4,'Apple iPhone 11',2,'Apple iPhone 11','https://m.media-amazon.com/images/I/81x9I9qXbmL._AC_SY679_.jpg','This is a good phone',1000.28,5,'Normal',1000,'Phones'),(5,'SAMSUNG T350',2,'SAMSUNG T350','https://m.media-amazon.com/images/I/61B8Lq5NXmL._AC_SX679_.jpg','A monitor',100.15,100,'Normal',100,'Monitors'),(6,'LG UltraWide',2,'LG UltraWide','https://m.media-amazon.com/images/I/71IW2e-PTYS._AC_SX679_.jpg','A monitor',300.15,0,'Out of Stock',100,'Monitors'),(7,'AOC C24G1A 24',2,'AOC C24G1A 24','https://m.media-amazon.com/images/I/81GJkTKuLnL._AC_SX679_.jpg','A monitor',300.15,25,'Normal',155,'Monitors'),(8,'Samsung LC24F390FHNXZA',2,'Samsung LC24F390FHNXZA','https://m.media-amazon.com/images/I/81vT0S30GML._AC_SX679_.jpg','A monitor',200.15,255,'Normal',1552,'Monitors'),(9,'Asus Full HD 1080P IPS ',2,'Asus Full HD 1080P IPS ','https://m.media-amazon.com/images/I/81qGehoKOgL._AC_SX679_.jpg','A monitor',100.15,255,'Normal',152,'Monitors'),(10,'Logitech MX Master 3',2,'Logitech MX Master 3','https://m.media-amazon.com/images/I/614w3LuZTYL._AC_SX679_.jpg','A mouse',120.15,15,'On Sale',1000,'Computer Mice'),(11,'Logitech M100',2,'Logitech M100','https://m.media-amazon.com/images/I/61hzuoXwjqL._AC_SX679_.jpg','A mouse',10.25,25,'Normal',5,'Computer Mice'),(12,'Razer DeathAdder',2,'Razer DeathAdder','https://m.media-amazon.com/images/I/51XM+ldQ7JS._AC_SX425_.jpg','A Razer DeathAdder',70.25,25,'Normal',5,'Computer Mice'),(13,'Logitech Ergo M575',2,'Logitech Ergo M575','https://m.media-amazon.com/images/I/61XGs1IK3NL._AC_SX679_.jpg','A Logitech Ergo M575',50.25,25,'On Sale',52,'Computer Mice'),(14,'FelixKing Ergonomic Desk Chair',2,'FelixKing Ergonomic Desk Chair','https://m.media-amazon.com/images/I/71a6B5GHDcL._AC_SX679_.jpg','A chair',125.25,25,'Normal',5,'Furniture'),(15,'Winsome Wood Hamilton',2,'Winsome Wood Hamilton','https://m.media-amazon.com/images/I/81vLvcHIVXL._AC_SX679_.jpg','A chair',15.25,25,'Normal',55,'Furniture'),(16,'3-Shelf Bookcase',2,'Sauder Beginnings 3-Shelf Bookcase','https://m.media-amazon.com/images/I/81HDAAJfYqL._AC_SX679_.jpg','A bookcase',52.25,0,'Out of Stock',35,'Furniture'),(17,'Gaming Chair',2,'Gaming Chair','https://m.media-amazon.com/images/I/61PYga8-p1L._AC_SX679_.jpg','A Gaming Chair',52.25,0,'Out of Stock',355,'Furniture'),(18,'Office Chair',2,'Office Chair','https://m.media-amazon.com/images/I/51e6ordpUyL._AC_SX679_.jpg','A Office Chair',152.25,25,'Normal',355,'Furniture'),(19,'Zinus Contemporary Sofa',2,'Zinus Contemporary Sofa','https://m.media-amazon.com/images/I/710+ofWuGOL._AC_SX679_.jpg','A Zinus Contemporary Sofa',452.25,25,'Normal',355,'Furniture'),(20,'Aerys Sectional Sofa',2,'Aerys Sectional Sofa','https://m.media-amazon.com/images/I/71Vd+YEmceL._AC_SX679_.jpg','A Aerys Sectional Sofa',1052.25,10,'Normal',3555,'Furniture'),(21,'HOMCOM Computer Office Desk',2,'HOMCOM Computer Office Desk','https://m.media-amazon.com/images/I/71BdIqFft3L._AC_SX679_.jpg','A HOMCOM Computer Office Desk',252.25,25,'Normal',355,'Furniture'),(22,'PlayStation 5',2,'PlayStation 5','https://m.media-amazon.com/images/I/619BkvKW35L._AC_SX679_.jpg','A ps5',525.25,0,'Out of Stock',3555,'Game Consoles'),(23,'PlayStation 4',2,'PlayStation 4','https://m.media-amazon.com/images/I/715RBdgZtHL._AC_SX679_.jpg','A ps4',255.25,25,'On Sale',125,'Game Consoles'),(24,'Xbox One',2,'Xbox One','https://m.media-amazon.com/images/I/61CnOKdmBeL._AC_SX522_.jpg','A xbox one',255.25,25,'On Sale',125,'Game Consoles'),(25,'Nintendo Switch',2,'Nintendo Switch','https://m.media-amazon.com/images/I/61-PblYntsL._AC_SX679_.jpg','A Nintendo Switch',355.25,225,'Normal',1255,'Game Consoles'),(26,'Dell Optiplex',2,'Dell Optiplex','https://m.media-amazon.com/images/I/61Zp2XEDwxL._AC_SX679_.jpg','A Dell Optiplex',25.25,22,'Normal',255,'Computers'),(27,'ASUS Laptop L210',2,'ASUS Laptop L210','https://m.media-amazon.com/images/I/71yFS5NECmL._AC_SX679_.jpg','A ASUS Laptop L210',252.25,22,'Normal',255,'Computers'),(28,'CyberpowerPC CYBERRPOWERPC',2,'CyberpowerPC CYBERRPOWERPC','https://m.media-amazon.com/images/I/71xAEV4zifL._AC_SX679_.jpg','A CyberpowerPC CYBERRPOWERPC',2522.25,222,'Normal',2555,'Computers'),(29,'Samsung Galaxy Book',2,'Samsung Galaxy Book','https://m.media-amazon.com/images/I/71lx9CwnP-L._AC_SX679_.jpg','A Samsung Galaxy Book',800.25,22,'On Sale',255,'Computers'),(30,'HP Elite 8300',2,'HP Elite 8300','https://m.media-amazon.com/images/I/71ElgLTErrL._AC_SX679_.jpg','A HP Elite 8300',900.25,22,'On Sale',25,'Computers');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `produnderaseller`
--

DROP TABLE IF EXISTS `produnderaseller`;
/*!50001 DROP VIEW IF EXISTS `produnderaseller`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `produnderaseller` AS SELECT 
 1 AS `seller`,
 1 AS `product`,
 1 AS `price`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `shippinginfo`
--

DROP TABLE IF EXISTS `shippinginfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shippinginfo` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userID` int NOT NULL,
  `recipientAddress` varchar(64) NOT NULL,
  `recipientName` varchar(64) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `userID` (`userID`,`recipientAddress`),
  KEY `recipientAddress` (`recipientAddress`),
  CONSTRAINT `shippinginfo_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `allaccount` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `shippinginfo_ibfk_2` FOREIGN KEY (`recipientAddress`) REFERENCES `userlocation` (`recipientAddress`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shippinginfo`
--

LOCK TABLES `shippinginfo` WRITE;
/*!40000 ALTER TABLE `shippinginfo` DISABLE KEYS */;
INSERT INTO `shippinginfo` VALUES (1,1,'124 Richmond St.','Andrew Blommestyn'),(2,1,'522 Western St.','Andrew Blommestyn');
/*!40000 ALTER TABLE `shippinginfo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `targetedadvertisement`
--

DROP TABLE IF EXISTS `targetedadvertisement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `targetedadvertisement` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userID` int NOT NULL,
  `prodID` int NOT NULL,
  `amountToShow` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `userID` (`userID`),
  KEY `prodID` (`prodID`),
  CONSTRAINT `targetedadvertisement_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `allaccount` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `targetedadvertisement_ibfk_2` FOREIGN KEY (`prodID`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `targetedadvertisement_chk_1` CHECK ((`amountToShow` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `targetedadvertisement`
--

LOCK TABLES `targetedadvertisement` WRITE;
/*!40000 ALTER TABLE `targetedadvertisement` DISABLE KEYS */;
/*!40000 ALTER TABLE `targetedadvertisement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userlocation`
--

DROP TABLE IF EXISTS `userlocation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userlocation` (
  `recipientAddress` varchar(64) NOT NULL,
  `recipientZIP` char(5) NOT NULL,
  PRIMARY KEY (`recipientAddress`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userlocation`
--

LOCK TABLES `userlocation` WRITE;
/*!40000 ALTER TABLE `userlocation` DISABLE KEYS */;
INSERT INTO `userlocation` VALUES ('124 Richmond St.','25234'),('522 Western St.','24234');
/*!40000 ALTER TABLE `userlocation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wishlistitem`
--

DROP TABLE IF EXISTS `wishlistitem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wishlistitem` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userID` int NOT NULL,
  `prodID` int NOT NULL,
  `priceChanged` tinyint(1) NOT NULL DEFAULT '0',
  `priceChangedTime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `userID` (`userID`,`prodID`),
  KEY `prodID` (`prodID`),
  CONSTRAINT `wishlistitem_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `allaccount` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `wishlistitem_ibfk_2` FOREIGN KEY (`prodID`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wishlistitem`
--

LOCK TABLES `wishlistitem` WRITE;
/*!40000 ALTER TABLE `wishlistitem` DISABLE KEYS */;
/*!40000 ALTER TABLE `wishlistitem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'ecommerce'
--

--
-- Dumping routines for database 'ecommerce'
--

--
-- Final view structure for view `orderswithinfo`
--

/*!50001 DROP VIEW IF EXISTS `orderswithinfo`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `orderswithinfo` (`userID`,`createTime`,`deliveryFee`,`status`,`paymentStatus`,`Address`) AS select `o`.`userID` AS `userID`,`o`.`createTime` AS `createTime`,`o`.`deliveryFee` AS `deliveryFee`,`os`.`orderStatus` AS `orderStatus`,`pi`.`paymentStatus` AS `paymentStatus`,`si`.`recipientAddress` AS `recipientAddress` from (((`orders` `o` join `orderstatus` `os`) join `paymentinfo` `pi`) join `shippinginfo` `si`) */
/*!50002 WITH CASCADED CHECK OPTION */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `pricerangeofspeccat`
--

/*!50001 DROP VIEW IF EXISTS `pricerangeofspeccat`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `pricerangeofspeccat` (`product`,`price`) AS select `p`.`prodName` AS `prodName`,`p`.`price` AS `price` from `product` `p` where ((`p`.`price` <= 10) and (`p`.`price` >= 5) and (`p`.`category` = 'Category 1')) */
/*!50002 WITH CASCADED CHECK OPTION */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `produnderaseller`
--

/*!50001 DROP VIEW IF EXISTS `produnderaseller`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `produnderaseller` (`seller`,`product`,`price`) AS select `s`.`username` AS `username`,`p`.`prodName` AS `prodName`,`p`.`price` AS `price` from (`allaccount` `s` join `product` `p`) where ((`s`.`id` = 1) and (`s`.`id` = `p`.`sellerID`)) order by `p`.`price` */
/*!50002 WITH CASCADED CHECK OPTION */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-12-06 19:27:39
