-- MySQL dump 10.13  Distrib 8.0.22, for macos10.15 (x86_64)
--
-- Host: localhost    Database: high-street-gym-2024
-- ------------------------------------------------------
-- Server version	8.0.25

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
-- Table structure for table `activities`
--

DROP TABLE IF EXISTS `activities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `activities` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` varchar(500) DEFAULT NULL,
  `duration` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activities`
--

LOCK TABLES `activities` WRITE;
/*!40000 ALTER TABLE `activities` DISABLE KEYS */;
INSERT INTO `activities` VALUES (1,'Yoga',NULL,60),(2,'Pilates',NULL,45),(3,'Abs',NULL,30),(4,'HIIT',NULL,30),(5,'Indoor Cycling',NULL,30),(6,'Boxing',NULL,45),(7,'Zumba',NULL,60);
/*!40000 ALTER TABLE `activities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `blog_posts`
--

DROP TABLE IF EXISTS `blog_posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blog_posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `datetime` datetime NOT NULL,
  `user_id` int NOT NULL,
  `title` varchar(100) NOT NULL,
  `content` varchar(10000) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_blog_posts_users_idx` (`user_id`),
  CONSTRAINT `fk_blog_posts_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blog_posts`
--

LOCK TABLES `blog_posts` WRITE;
/*!40000 ALTER TABLE `blog_posts` DISABLE KEYS */;
INSERT INTO `blog_posts` VALUES (13,'2024-04-25 18:58:28',2,'my first blog','hello everybody\n'),(14,'2024-04-25 22:28:08',3,'Hello I\'m Jane','Hi everyone, hope you are enjoying your day!'),(15,'2024-04-25 22:29:38',3,'I love Yoga','The Yoga class is amazing!'),(16,'2024-04-25 22:30:28',3,'I love Pilate','The Pilate class is awesome!'),(17,'2024-04-25 22:31:28',2,'Jack is here','Say hi to everyone!'),(18,'2024-04-25 22:33:07',2,'Guess what','I nearly hit my goal!'),(19,'2024-04-26 19:12:28',34,'Hi ','Hi everyone, I just signed up the new account!'),(20,'2024-04-26 22:25:06',2,'Try a new blog','If it can lead back to list'),(21,'2024-05-01 12:52:18',34,'I changed my name','I changed my name from Member to Olive.'),(22,'2024-05-01 14:23:58',43,'this is new','new blog'),(23,'2024-05-10 13:29:50',34,'Testing','Test a new blog'),(24,'2024-05-10 21:32:22',34,'Test2','Test macbook chrome'),(25,'2024-05-10 21:55:22',34,'test3-firefox','Firefox-Galaxy Note 20');
/*!40000 ALTER TABLE `blog_posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bookings`
--

DROP TABLE IF EXISTS `bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `class_id` int NOT NULL,
  `created_datetime` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_bookings_users_idx` (`user_id`),
  KEY `fk_bookings_classes_idx` (`class_id`),
  CONSTRAINT `fk_bookings_classes` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_bookings_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookings`
--

LOCK TABLES `bookings` WRITE;
/*!40000 ALTER TABLE `bookings` DISABLE KEYS */;
INSERT INTO `bookings` VALUES (1,7,1,'2024-04-12 07:27:44'),(2,7,2,'2024-04-12 17:33:20'),(3,2,3,'2024-04-19 16:47:58'),(4,2,2,'2024-04-19 17:03:39'),(5,2,19,'2024-04-19 17:05:40'),(6,2,15,'2024-04-19 17:06:09'),(12,2,8,'2024-04-20 23:03:56'),(15,1,28,'2024-04-23 17:35:55'),(16,2,5,'2024-04-23 17:58:55'),(19,2,29,'2024-04-24 17:00:05'),(23,1,81,'2024-04-26 19:15:51'),(25,2,24,'2024-04-26 22:25:36'),(26,34,94,'2024-04-26 22:55:15'),(35,34,138,'2024-05-10 21:52:39'),(36,1,170,'2024-05-29 15:31:40'),(37,2,187,'2024-05-30 14:45:00'),(41,1,243,'2024-06-05 10:15:35'),(42,1,195,'2024-06-05 10:16:31'),(43,2,243,'2024-06-05 12:59:36');
/*!40000 ALTER TABLE `bookings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `classes`
--

DROP TABLE IF EXISTS `classes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `classes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `datetime` datetime NOT NULL,
  `location_id` int NOT NULL,
  `activity_id` int NOT NULL,
  `trainer_user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_classes_location_idx` (`location_id`),
  KEY `fk_classes_activities_idx` (`activity_id`),
  KEY `fk_classes_users_idx` (`trainer_user_id`),
  CONSTRAINT `fk_classes_activities` FOREIGN KEY (`activity_id`) REFERENCES `activities` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_classes_location` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_classes_users` FOREIGN KEY (`trainer_user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=301 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `classes`
--

LOCK TABLES `classes` WRITE;
/*!40000 ALTER TABLE `classes` DISABLE KEYS */;
INSERT INTO `classes` VALUES (1,'2024-04-25 05:30:00',2,5,5),(2,'2024-04-25 06:20:00',2,2,6),(3,'2024-04-25 06:20:00',2,1,2),(4,'2024-04-25 09:45:00',2,1,2),(5,'2024-04-25 05:15:00',2,6,5),(6,'2024-04-25 09:40:00',2,3,6),(7,'2024-04-26 08:00:00',2,4,3),(8,'2024-04-29 09:00:00',2,7,4),(9,'2024-04-30 10:00:00',2,1,2),(10,'2024-04-25 05:30:00',2,5,6),(11,'2024-04-25 06:20:00',2,2,5),(12,'2024-04-25 08:30:00',2,1,5),(13,'2024-04-25 09:45:00',2,1,5),(14,'2024-04-26 05:15:00',2,6,6),(15,'2024-04-26 09:40:00',2,3,5),(16,'2024-04-29 08:00:00',2,4,4),(17,'2024-04-30 09:00:00',2,7,3),(18,'2024-05-01 10:00:00',2,1,5),(19,'2024-04-25 05:30:00',1,5,3),(20,'2024-04-25 06:20:00',1,2,4),(21,'2024-04-25 08:30:00',1,1,3),(22,'2024-04-25 09:45:00',1,1,3),(23,'2024-04-26 05:15:00',1,6,3),(24,'2024-04-26 09:40:00',1,3,4),(25,'2024-04-29 08:00:00',1,4,5),(26,'2024-04-30 09:00:00',1,7,6),(27,'2024-05-01 10:00:00',1,1,5),(28,'2024-04-25 05:30:00',1,5,4),(29,'2024-04-25 06:20:00',1,2,3),(30,'2024-04-25 08:30:00',1,1,4),(31,'2024-04-25 09:45:00',1,1,4),(32,'2024-04-26 05:15:00',1,6,4),(33,'2024-04-26 09:40:00',1,3,3),(34,'2024-04-29 08:00:00',1,4,6),(35,'2024-04-30 09:00:00',1,7,5),(36,'2024-05-01 10:00:00',1,1,6),(43,'2024-05-06 05:30:00',2,5,5),(44,'2024-05-06 06:20:00',2,2,6),(45,'2024-05-06 06:20:00',2,1,2),(46,'2024-05-06 09:45:00',2,1,2),(47,'2024-05-06 05:15:00',2,6,5),(48,'2024-05-06 09:40:00',2,3,6),(49,'2024-04-27 06:20:00',2,1,2),(50,'2024-04-27 05:15:00',2,6,5),(51,'2024-04-27 06:20:00',2,2,6),(52,'2024-04-27 09:45:00',2,1,2),(53,'2024-04-27 05:30:00',2,5,5),(54,'2024-04-27 09:40:00',2,3,6),(55,'2024-04-28 05:30:00',2,5,5),(56,'2024-04-28 06:20:00',2,1,2),(57,'2024-04-28 06:20:00',2,2,6),(58,'2024-04-28 09:45:00',2,1,2),(59,'2024-04-28 05:15:00',2,6,5),(60,'2024-04-28 09:40:00',2,3,6),(61,'2024-05-02 05:30:00',2,5,5),(62,'2024-05-02 06:20:00',2,2,6),(63,'2024-05-02 06:20:00',2,1,2),(64,'2024-05-02 09:45:00',2,1,2),(65,'2024-05-02 05:15:00',2,6,5),(66,'2024-05-02 09:40:00',2,3,6),(67,'2024-05-03 05:30:00',2,5,5),(68,'2024-05-03 06:20:00',2,1,2),(69,'2024-05-03 06:20:00',2,2,6),(70,'2024-05-03 09:45:00',2,1,2),(71,'2024-05-03 09:40:00',2,3,6),(72,'2024-05-03 05:15:00',2,6,5),(73,'2024-05-07 06:20:00',2,2,6),(74,'2024-05-07 05:30:00',2,5,5),(75,'2024-05-07 09:45:00',2,1,2),(76,'2024-05-07 06:20:00',2,1,2),(77,'2024-05-07 09:40:00',2,3,6),(78,'2024-05-07 05:15:00',2,6,5),(79,'2024-05-04 05:30:00',2,5,5),(80,'2024-05-04 06:20:00',2,2,6),(81,'2024-05-04 06:20:00',2,1,2),(82,'2024-05-04 09:45:00',2,1,2),(83,'2024-05-04 05:15:00',2,6,5),(84,'2024-05-04 09:40:00',2,3,6),(85,'2024-05-04 05:15:00',1,6,5),(86,'2024-05-04 09:40:00',1,3,6),(87,'2024-05-04 06:20:00',1,2,6),(88,'2024-05-04 05:30:00',1,5,5),(89,'2024-05-04 06:20:00',1,1,2),(90,'2024-05-04 09:45:00',1,1,2),(91,'2024-05-02 05:30:00',1,5,6),(92,'2024-05-02 06:20:00',1,2,5),(93,'2024-05-02 06:20:00',1,1,3),(94,'2024-05-02 09:45:00',1,1,3),(95,'2024-05-02 05:15:00',1,6,6),(96,'2024-05-02 09:40:00',1,3,5),(97,'2024-05-05 06:20:00',2,2,6),(98,'2024-05-05 05:30:00',2,5,5),(99,'2024-05-05 09:45:00',2,1,2),(100,'2024-05-05 06:20:00',2,1,2),(101,'2024-05-05 05:15:00',2,6,5),(102,'2024-05-05 09:40:00',2,3,6),(103,'2024-05-05 05:30:00',1,5,5),(104,'2024-05-05 06:20:00',1,2,6),(105,'2024-05-05 06:20:00',1,1,2),(106,'2024-05-05 09:45:00',1,1,2),(107,'2024-05-05 05:15:00',1,6,5),(108,'2024-05-05 09:40:00',1,3,6),(109,'2024-05-10 09:45:00',2,1,2),(110,'2024-05-10 06:20:00',2,1,2),(111,'2024-05-10 06:20:00',2,2,6),(112,'2024-05-10 09:40:00',2,3,6),(113,'2024-05-10 05:15:00',2,6,5),(114,'2024-05-10 05:30:00',2,5,5),(115,'2024-05-10 05:30:00',1,5,5),(116,'2024-05-10 06:20:00',1,2,6),(117,'2024-05-10 06:20:00',1,1,2),(118,'2024-05-10 09:45:00',1,1,2),(119,'2024-05-10 05:15:00',1,6,5),(120,'2024-05-10 09:40:00',1,3,6),(121,'2024-05-11 05:30:00',2,5,5),(122,'2024-05-11 06:20:00',2,2,6),(123,'2024-05-11 06:20:00',2,1,2),(124,'2024-05-11 09:45:00',2,1,2),(125,'2024-05-11 05:15:00',2,6,5),(126,'2024-05-11 09:40:00',2,3,6),(127,'2024-05-11 05:30:00',1,5,5),(128,'2024-05-11 06:20:00',1,2,6),(129,'2024-05-11 06:20:00',1,1,2),(130,'2024-05-11 09:45:00',1,1,2),(131,'2024-05-11 05:15:00',1,6,5),(132,'2024-05-11 09:40:00',1,3,6),(133,'2024-05-12 05:30:00',2,5,5),(134,'2024-05-12 06:20:00',2,2,6),(135,'2024-05-12 06:20:00',2,1,2),(136,'2024-05-12 09:45:00',2,1,2),(137,'2024-05-12 05:15:00',2,6,5),(138,'2024-05-12 09:40:00',2,3,6),(139,'2024-05-12 09:40:00',1,3,6),(140,'2024-05-12 05:15:00',1,6,5),(141,'2024-05-12 06:20:00',1,2,6),(142,'2024-05-12 05:30:00',1,5,5),(143,'2024-05-12 06:20:00',1,1,2),(144,'2024-05-12 09:45:00',1,1,2),(145,'2024-05-13 05:30:00',2,5,5),(146,'2024-05-13 06:20:00',1,2,6),(147,'2024-05-13 06:20:00',2,2,6),(148,'2024-05-13 06:20:00',1,1,2),(149,'2024-05-13 06:20:00',2,1,2),(150,'2024-05-13 09:40:00',2,3,6),(151,'2024-05-13 05:15:00',2,6,5),(152,'2024-05-13 09:45:00',2,1,2),(153,'2024-05-13 05:30:00',1,5,5),(154,'2024-05-13 09:45:00',1,1,2),(155,'2024-05-13 05:15:00',1,6,5),(156,'2024-05-13 09:40:00',1,3,6),(157,'2024-05-14 06:20:00',2,1,2),(158,'2024-05-14 06:20:00',2,2,6),(159,'2024-05-14 09:45:00',2,1,2),(160,'2024-05-14 05:30:00',2,5,5),(161,'2024-05-14 05:15:00',2,6,5),(162,'2024-05-14 09:40:00',2,3,6),(163,'2024-05-14 06:20:00',1,2,6),(164,'2024-05-14 06:20:00',1,1,2),(165,'2024-05-14 05:30:00',1,5,5),(166,'2024-05-14 09:45:00',1,1,2),(167,'2024-05-14 05:15:00',1,6,5),(168,'2024-05-14 09:40:00',1,3,6),(169,'2024-05-30 09:40:00',2,3,6),(170,'2024-05-30 06:20:00',2,2,6),(171,'2024-05-30 09:45:00',2,1,2),(172,'2024-05-30 05:15:00',2,6,5),(173,'2024-05-30 06:20:00',2,1,2),(174,'2024-05-30 05:30:00',2,5,5),(175,'2024-05-30 05:30:00',1,5,5),(176,'2024-05-30 06:20:00',1,2,6),(177,'2024-05-30 06:20:00',1,1,2),(178,'2024-05-30 09:45:00',1,1,2),(179,'2024-05-30 05:15:00',1,6,5),(180,'2024-05-30 09:40:00',1,3,6),(181,'2024-05-31 05:30:00',2,5,5),(182,'2024-05-31 06:20:00',2,2,6),(183,'2024-05-31 06:20:00',2,1,2),(184,'2024-05-31 09:45:00',2,1,2),(185,'2024-05-31 05:15:00',2,6,5),(186,'2024-05-31 05:30:00',1,5,5),(187,'2024-05-31 09:40:00',2,3,6),(188,'2024-05-31 06:20:00',1,2,6),(189,'2024-05-31 06:20:00',1,1,2),(190,'2024-05-31 09:45:00',1,1,2),(191,'2024-05-31 05:15:00',1,6,5),(192,'2024-05-31 09:40:00',1,3,6),(195,'2024-06-06 06:20:00',2,1,4),(201,'2024-06-06 05:30:00',1,5,5),(203,'2024-06-06 09:40:00',1,3,6),(205,'2024-06-06 05:30:00',2,5,6),(207,'2024-06-06 09:45:00',2,1,4),(209,'2024-06-06 06:20:00',2,1,6),(211,'2024-06-06 06:20:00',1,1,7),(212,'2024-06-06 05:30:00',1,5,2),(214,'2024-06-06 09:40:00',2,3,5),(216,'2024-06-06 09:40:00',1,3,2),(218,'2024-06-07 05:30:00',2,5,6),(220,'2024-06-07 09:45:00',2,1,4),(222,'2024-06-07 09:40:00',2,3,5),(223,'2024-06-07 06:20:00',1,2,3),(225,'2024-06-07 05:30:00',1,5,2),(228,'2024-06-07 09:40:00',1,3,2),(229,'2024-06-08 05:30:00',1,1,2),(231,'2024-06-08 06:20:00',1,1,7),(235,'2024-06-08 05:30:00',1,3,7),(236,'2024-06-08 06:20:00',1,2,2),(237,'2024-06-08 06:20:00',2,1,5),(238,'2024-06-08 09:45:00',2,1,5),(240,'2024-06-08 09:40:00',2,1,6),(243,'2024-06-05 06:20:00',1,1,7),(244,'2024-06-05 09:45:00',1,1,2),(246,'2024-06-05 09:40:00',1,2,3),(247,'2024-06-05 05:30:00',1,3,7),(249,'2024-06-05 06:20:00',2,1,5),(251,'2024-06-05 09:40:00',2,1,6),(254,'2024-06-09 05:30:00',1,1,2),(255,'2024-06-09 06:20:00',1,1,7),(256,'2024-06-09 09:45:00',1,1,2),(257,'2024-06-09 09:40:00',1,2,3),(259,'2024-06-09 05:30:00',1,3,7),(260,'2024-06-09 06:20:00',1,2,2),(263,'2024-06-09 15:15:00',2,1,5),(264,'2024-06-09 09:40:00',2,1,6),(265,'2024-06-09 05:30:00',2,1,4),(266,'2024-06-09 06:20:00',2,1,5),(267,'2024-06-09 06:20:00',2,1,6),(268,'2024-06-09 09:45:00',2,1,4),(270,'2024-06-09 09:40:00',2,2,5),(271,'2024-06-09 05:30:00',2,3,6),(272,'2024-06-09 06:20:00',2,2,4),(273,'2024-06-09 06:20:00',1,1,3),(275,'2024-06-09 15:15:00',1,1,3),(276,'2024-06-09 09:40:00',1,1,7),(277,'2024-06-11 05:30:00',2,1,4),(278,'2024-06-11 05:30:00',2,3,6),(279,'2024-06-11 06:20:00',2,1,5),(280,'2024-06-11 06:20:00',2,2,4),(281,'2024-06-11 06:20:00',2,1,6),(282,'2024-06-11 09:45:00',2,1,4),(283,'2024-06-11 15:15:00',2,2,5),(284,'2024-06-11 06:20:00',1,1,3),(285,'2024-06-11 09:45:00',1,1,3),(286,'2024-06-11 19:40:00',2,2,5),(287,'2024-06-11 15:15:00',1,1,3),(288,'2024-06-11 19:40:00',1,1,7),(289,'2024-06-10 05:30:00',2,1,4),(290,'2024-06-10 06:20:00',2,1,5),(291,'2024-06-10 05:30:00',2,3,6),(292,'2024-06-10 06:20:00',2,2,4),(293,'2024-06-10 06:20:00',2,1,6),(294,'2024-06-10 09:45:00',2,1,4),(295,'2024-06-10 19:40:00',2,2,5),(296,'2024-06-10 15:15:00',2,2,5),(297,'2024-06-10 09:45:00',1,1,3),(298,'2024-06-10 06:20:00',1,1,3),(299,'2024-06-10 15:15:00',1,1,3),(300,'2024-06-10 19:40:00',1,1,7);
/*!40000 ALTER TABLE `classes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `locations`
--

DROP TABLE IF EXISTS `locations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `locations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `locations`
--

LOCK TABLES `locations` WRITE;
/*!40000 ALTER TABLE `locations` DISABLE KEYS */;
INSERT INTO `locations` VALUES (1,'Brisbane City'),(2,'Coorparoo'),(3,'Chermside');
/*!40000 ALTER TABLE `locations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role` enum('member','trainer','manager') NOT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `first_name` varchar(70) DEFAULT NULL,
  `last_name` varchar(70) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `authentication_key` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id_UNIQUE` (`id`),
  UNIQUE KEY `user_email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'cecilia@gmail.com','$2a$10$bWdpw2PMypVXfabbSAe3EePh8P8.HQTLwb.gDlyzUsLj7VZ/AVTe.','manager','0400123456','Cecilia','Zhang','South Brisbane, 4001','4d841c9d-c149-4880-9aec-9a792b07bd7f'),(2,'jack@gmail.com','$2a$10$vtVH.9JHIyidWptMQNsOVOHhKh0KRB6sZr.NAE0P1jI9XmfSFaEWS','trainer','0400000002','Jack','Doe','Brisbane City 4000',NULL),(3,'jane@gmail.com','$2a$10$qqIUtwW7kz9lrKlo/AR9leanYx2jwqhr/x3uiYSZubXyjyk5keAh6','trainer',NULL,'Jane','',NULL,NULL),(4,'jess@gmail.com','$2a$10$uEpodYzTI9g88TGzmeLVIeyR3X4aN4n//EForHmHqrVGWGL.B/3qu','trainer',NULL,'Jess','Smith',NULL,NULL),(5,'olivia@gmail.com','$2a$10$HNlhZyj7G73FOnuwmzHq3ebpGk7OS5t9CtLey5qYhOWdp1/T.lf8G','trainer',NULL,'Olivia',NULL,NULL,NULL),(6,'sharon@gmail.com','$2a$10$xGFN0hgyD4H0B4bmj5YwvO3kXjawToddWEKQvBwfmcyyA7q.Cu5c.','trainer',NULL,'Sharon',NULL,NULL,NULL),(7,'jill1@gmail.com','$2a$10$rFOldrG.t2hzCt6f6HJAwOuyWe.LXxGZHXKdkQt826rQnuXtdCd9a','trainer',NULL,'Jill','Doe',NULL,NULL),(9,'jill2@gmail.com','$2a$10$8MJw4nLQHzktpC8t7gzx9uLYpbeH02PuxjYkvutkU7dNkQFWuKYTO','member',NULL,'Jill','Smith',NULL,NULL),(12,'jack2@gmail.com','$2a$10$G3.y4fXonH1r2FxNQ.om3.DAB0RJ0gl/zaHVgFxdmt59FUyIwA35e','member',NULL,NULL,NULL,NULL,NULL),(13,'jack3@gmail.com','$2a$10$ZmfOQHm3MzOI4clPOeooo.Y6K4GWt.rW27KcDnUcKrMB6makij4Qu','member',NULL,NULL,NULL,NULL,''),(14,'jack4@gmail.com','$2a$10$73RFInddqcAky7Q1gfu/E.CDVBIcXsQo3iJX5wIhJLgyZx5PSOzW6','member',NULL,NULL,NULL,NULL,''),(15,'jack5@gmail.com','$2a$10$sxWM5c506VdmMWIGMXw2vuvfkt7TTvP/yxmHv.lA2QAAQtFGefmDK','member',NULL,NULL,NULL,NULL,NULL),(20,'test@gmail.com','$2a$10$CM5eavOLOhuJlx.1ccHsS.JSzWx6dVaP6PMafak0EaNdYvCDZ2q0O','member',NULL,'test','',NULL,NULL),(27,'register@gmail.com','$2a$10$FiKukq3BWzyjhqEFJKHeZ.s8SAJoUCXnGbmpoQKeT/TY6wa4FdEg6','member',NULL,NULL,NULL,NULL,NULL),(28,'register2@gmail.com','$2a$10$REfgzMpS8u.zbGQtFf9BSOK0Pa1d9eE1dDR6muBRxgTdCNO8hpUUq','member',NULL,NULL,NULL,NULL,NULL),(29,'register3@gmail.com','$2a$10$YWP6RMVF1KvWy7/i8EATXOBAz2ruJR18AoMgkpAnlgVd/SrTALZci','member',NULL,NULL,NULL,NULL,'cb0ebea8-e0c7-46a2-ad6c-fc68beeeac8a'),(34,'olive@gmail.com','$2a$10$vT83ELQCPsv.7t3QuJsYw.i6pJPqwLqTaaRaU6e53qTffjJjJSk4a','member','0400123456','Olive','Doe','Brisbane',NULL),(36,'member2@gmail.com','$2a$10$pwQ7EjfeWQpZCK6Lg8aYSOEQFjqg82OULa.4b2Y8tQODYHU9melXS','member',NULL,'Member2','Two',NULL,NULL),(37,'member3@gmail.com','$2a$10$LVKEGjm83vmD3XYbzeIVcuXZzgojOSZl0v2M7txTgKnkdxft/xnui','member',NULL,'Member3','Three',NULL,NULL),(42,'jessica1@gmail.com','$2a$10$8JgRZWw2c4TE1N/WRGyH6OZDzX0TlNxA1YHsgmw5ZxfpU55zhbxpO','member',NULL,NULL,NULL,NULL,NULL),(43,'try@gmail.com','$2a$10$PCyQivk7TwV6TXNtl/IX7OpRQcx..U8qgf.GzMmTbshSrurRk./Nq','member',NULL,'Jasper',NULL,NULL,NULL),(55,'test-bug-1@gmail.com','$2a$10$w9WroKrpWDZOgYbRkC.8reyX.y5PxU5e5Q7ZB9wRKXJtakVozXXve','member',NULL,NULL,NULL,NULL,NULL),(56,'test-bug-2@gmail.com','$2a$10$Ja14GNmEhWK0NbB3Q4sZ0e5TCrRlGzxvNHqZXiJFE2BP5Mw31iQFK','member',NULL,NULL,NULL,NULL,NULL),(57,'test-bug-3@gmail.com','$2a$10$jzlI1i3DCvS7abJWHCePheJdHmDmTT4oIEYY5PTJB/NXAMdKqzrxq','member',NULL,NULL,NULL,NULL,NULL),(58,'test1@gmail.com','$2a$10$JpmCEi4VrMVXiPNgW33CE.JW1bpbL9zgz1Sp6H6g7FvtCxGNyiBQy','member',NULL,NULL,NULL,NULL,NULL),(59,'test2@gmail.com','$2a$10$x8igKKBGuoWUT/l/bKT5YOqLAJ85juRkraUB7ysuEJ6GDriLs8zdu','member',NULL,NULL,NULL,NULL,NULL),(64,'test3@gmail.com','$2a$10$.V7GUVdsOOqdG/.RNwYt5./6z5QOQmWrIUudUdyCQ2B9j6b2wWaHi','member',NULL,NULL,NULL,NULL,NULL);
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

-- Dump completed on 2024-06-05 13:44:32
