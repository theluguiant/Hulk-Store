-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: hulk_store
-- ------------------------------------------------------
-- Server version	5.5.5-10.1.34-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'carros55','I generally try to adhere to a frameworks conventions','dfb31db840a8a4ac96a36ebe56cd00ab',1,NULL,'2018-07-22 19:15:41',1),(2,'Motorllantas','4444','83af91bfeaf3caead8fbe4cffb93715b',1,'2018-07-22 16:46:52','2018-07-22 18:00:52',0),(3,'Motorllantas2','4444','2b23122b715a753fcc1758e875eb8d83',1,'2018-07-22 16:48:35','2018-07-22 17:50:01',1),(4,'Mauricio','4444','6fff29fef4724dccda44da6179fe329e',1,'2018-07-22 16:51:29','2018-07-22 17:54:54',1),(5,'jeronimo','autogestion','1fe93de6b78d890255fa147c9a666931',1,'2018-07-22 16:53:55','2018-07-22 18:00:53',0),(6,'emprendimiento','autogestion','9d64227c236bfe0b2f853b5b6156f14b',1,'2018-07-22 16:54:29','2018-07-22 17:54:52',1),(7,'El meridiano (Digital newspaper)','autogestion','87bbcda7b6fe2607d0cde2f2a3d74db0',1,'2018-07-22 16:56:57','2018-07-22 17:54:57',1),(8,'Mauricio56','autogestion','1dc0ae939713fafdc7d0a2a5f9c7f638',1,'2018-07-22 16:59:19','2018-07-22 17:54:58',1);
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'2014_10_11_000000_create_roles_table',1),(2,'2014_10_12_000000_create_users_table',1),(3,'2014_10_12_100000_create_password_resets_table',1),(4,'2018_07_20_143101_create_order_table',1),(5,'2018_07_20_143114_create_category_table',1),(6,'2018_07_20_143131_create_products_table',1),(7,'2018_07_20_143152_create_order_detail_table',1);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `order_detail`
--

LOCK TABLES `order_detail` WRITE;
/*!40000 ALTER TABLE `order_detail` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `password_resets`
--

LOCK TABLES `password_resets` WRITE;
/*!40000 ALTER TABLE `password_resets` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_resets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,1,'Motorllantas','I generally try to adhere to a frameworks conventions','314596c6db71f232d20539a878eeba1b','Marvel',55000,5,50,'1',0,'Talla L','CBS00018','2018-07-23 01:22:33','2018-07-23 02:46:46'),(2,1,'El meridiano medellin','I gen','6657ee91a9c43440ab676769c27c3069','Dc Comics',55300,5,50,'5',1,'Talla L','CBS00019','2018-07-23 02:27:03','2018-07-23 02:48:30'),(3,1,'Kinema','I generally try to adhere to a frameworks conventions','1d1b2f9add25a3bc57f134d5368ef767','Marvel',20000,5,530,'2',0,'Talla L','CBS00020','2018-07-23 02:33:55','2018-07-23 02:48:16'),(4,1,'carros','I generally try to adhere to a frameworks conventions','df4de60ffde045a70f272f5c0da8cb8d','Marvel',50000,5,50,'3',0,'Talla XL','CBS00017','2018-07-23 02:34:27','2018-07-23 02:48:24');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'administrator',1,NULL,NULL),(2,'user',2,NULL,NULL);
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Admin','Admin','admin.system','admin@system.com','Cr 51 A # 4 sur 57',3115478984,8421674826,1,'dfb31db840a8a4ac96a36ebe56cd00ab',1,'$2y$10$qQItWQgFLyX9V52oT0n3ReddvOU6vXBSbcv4b2Zs47Jb5A89DblDy',NULL,'2018-07-21 09:11:10','2018-07-21 09:11:10'),(2,'Jhon','Doe','jdoe','jdoe@gmail.com','Cr 51 A # 4 sur 57',3113693636,8467856987,1,'0860bc13c057ca9e413d6ff46539f83f',2,'$2y$10$nD9a2w7RDCiDuqadYNZNd.1rKadvna6Junv3z5Kx1tZj15/ya2awy',NULL,'2018-07-22 05:51:21','2018-07-23 00:56:45');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-07-22 22:30:04
