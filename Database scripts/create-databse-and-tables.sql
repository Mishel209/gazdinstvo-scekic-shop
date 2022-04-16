CREATE DATABASE  IF NOT EXISTS `gazdinstvo_scekic` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `gazdinstvo_scekic`;
-- MySQL dump 10.13  Distrib 8.0.26, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: gazdinstvo_scekic
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.22-MariaDB

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
-- Table structure for table `cjenovnik`
--

DROP TABLE IF EXISTS `cjenovnik`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cjenovnik` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `datum_od` date DEFAULT NULL,
  `datum_do` date DEFAULT NULL,
  `cijena` varchar(35) DEFAULT NULL,
  `popust` varchar(35) DEFAULT NULL,
  `proizvod_id` bigint(20) NOT NULL,
  `velicina_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `proizvod_id_cjenovnik_idx` (`proizvod_id`),
  KEY `velicina_id_cjenovnik_idx` (`velicina_id`),
  CONSTRAINT `proizvod_id_cjenovnik` FOREIGN KEY (`proizvod_id`) REFERENCES `gazdinstvo_šćekić`.`proizvod` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `velicina_id_cjenovnik` FOREIGN KEY (`velicina_id`) REFERENCES `velicina` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cjenovnik`
--

LOCK TABLES `cjenovnik` WRITE;
/*!40000 ALTER TABLE `cjenovnik` DISABLE KEYS */;
/*!40000 ALTER TABLE `cjenovnik` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `drzava`
--

DROP TABLE IF EXISTS `drzava`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `drzava` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `naziv` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `drzava`
--

LOCK TABLES `drzava` WRITE;
/*!40000 ALTER TABLE `drzava` DISABLE KEYS */;
/*!40000 ALTER TABLE `drzava` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `grad`
--

DROP TABLE IF EXISTS `grad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `grad` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `postanski_broj` varchar(50) DEFAULT NULL,
  `naziv_grada` varchar(50) DEFAULT NULL,
  `drzava_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `drzava_id_grad_idx` (`drzava_id`),
  CONSTRAINT `drzava_id_grad` FOREIGN KEY (`drzava_id`) REFERENCES `drzava` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grad`
--

LOCK TABLES `grad` WRITE;
/*!40000 ALTER TABLE `grad` DISABLE KEYS */;
/*!40000 ALTER TABLE `grad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `korpa`
--

DROP TABLE IF EXISTS `korpa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `korpa` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `ukupna_cijena` varchar(50) DEFAULT NULL,
  `datum_porudzbine` date DEFAULT NULL,
  `kupac_id` bigint(20) NOT NULL,
  `tip_statusa_korpe_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `kupac_id_korpa_idx` (`kupac_id`),
  KEY `tip_statusa_korpe_id_korpa_idx` (`tip_statusa_korpe_id`),
  CONSTRAINT `kupac_id_korpa` FOREIGN KEY (`kupac_id`) REFERENCES `kupac` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `tip_statusa_korpe_id_korpa` FOREIGN KEY (`tip_statusa_korpe_id`) REFERENCES `gazdinstvo_šćekić`.`tip_statusa_korpe` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `korpa`
--

LOCK TABLES `korpa` WRITE;
/*!40000 ALTER TABLE `korpa` DISABLE KEYS */;
/*!40000 ALTER TABLE `korpa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kupac`
--

DROP TABLE IF EXISTS `kupac`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kupac` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `ime` varchar(50) DEFAULT NULL,
  `prezime` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `broj_telefona` varchar(20) DEFAULT NULL,
  `grad_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `grad_id_kupac_idx` (`grad_id`),
  CONSTRAINT `grad_id_kupac` FOREIGN KEY (`grad_id`) REFERENCES `grad` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kupac`
--

LOCK TABLES `kupac` WRITE;
/*!40000 ALTER TABLE `kupac` DISABLE KEYS */;
/*!40000 ALTER TABLE `kupac` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `porudzbina`
--

DROP TABLE IF EXISTS `porudzbina`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `porudzbina` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `kolicina` varchar(50) DEFAULT NULL,
  `proizvod_id` bigint(20) NOT NULL,
  `korpa_id` bigint(20) NOT NULL,
  `cjenovnik_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `proizvod_id_porudzbina_idx` (`proizvod_id`),
  KEY `korpa_id_porudzbina_idx` (`korpa_id`),
  KEY `cjenovnik_id_porudzbina_idx` (`cjenovnik_id`),
  CONSTRAINT `cjenovnik_id_porudzbina` FOREIGN KEY (`cjenovnik_id`) REFERENCES `cjenovnik` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `korpa_id_porudzbina` FOREIGN KEY (`korpa_id`) REFERENCES `korpa` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `proizvod_id_porudzbina` FOREIGN KEY (`proizvod_id`) REFERENCES `proizvod` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `porudzbina`
--

LOCK TABLES `porudzbina` WRITE;
/*!40000 ALTER TABLE `porudzbina` DISABLE KEYS */;
/*!40000 ALTER TABLE `porudzbina` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proizvod`
--

DROP TABLE IF EXISTS `proizvod`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proizvod` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `naziv` varchar(50) DEFAULT NULL,
  `opis` varchar(50) DEFAULT NULL,
  `tip_proizvoda_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `tip_proizvoda_id_proizvod_idx` (`tip_proizvoda_id`),
  CONSTRAINT `tip_proizvoda_id_proizvod` FOREIGN KEY (`tip_proizvoda_id`) REFERENCES `tip_proizvoda` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proizvod`
--

LOCK TABLES `proizvod` WRITE;
/*!40000 ALTER TABLE `proizvod` DISABLE KEYS */;
/*!40000 ALTER TABLE `proizvod` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `slika`
--

DROP TABLE IF EXISTS `slika`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `slika` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `putanja` varchar(50) DEFAULT NULL,
  `tip_slike_id` bigint(20) NOT NULL,
  `proizvod_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `tip_slike_id_slika_idx` (`tip_slike_id`),
  KEY `proizvod_id_slika_idx` (`proizvod_id`),
  CONSTRAINT `proizvod_id_slika` FOREIGN KEY (`proizvod_id`) REFERENCES `gazdinstvo_šćekić`.`proizvod` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `tip_slike_id_slika` FOREIGN KEY (`tip_slike_id`) REFERENCES `tip_slike` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `slika`
--

LOCK TABLES `slika` WRITE;
/*!40000 ALTER TABLE `slika` DISABLE KEYS */;
/*!40000 ALTER TABLE `slika` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tip_proizvoda`
--

DROP TABLE IF EXISTS `tip_proizvoda`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tip_proizvoda` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `naziv` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tip_proizvoda`
--

LOCK TABLES `tip_proizvoda` WRITE;
/*!40000 ALTER TABLE `tip_proizvoda` DISABLE KEYS */;
/*!40000 ALTER TABLE `tip_proizvoda` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tip_slike`
--

DROP TABLE IF EXISTS `tip_slike`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tip_slike` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `naziv` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tip_slike`
--

LOCK TABLES `tip_slike` WRITE;
/*!40000 ALTER TABLE `tip_slike` DISABLE KEYS */;
/*!40000 ALTER TABLE `tip_slike` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tip_statusa_korpe`
--

DROP TABLE IF EXISTS `tip_statusa_korpe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tip_statusa_korpe` (
  `id` bigint(20) NOT NULL,
  `naziv` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tip_statusa_korpe`
--

LOCK TABLES `tip_statusa_korpe` WRITE;
/*!40000 ALTER TABLE `tip_statusa_korpe` DISABLE KEYS */;
/*!40000 ALTER TABLE `tip_statusa_korpe` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tip_velicine`
--

DROP TABLE IF EXISTS `tip_velicine`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tip_velicine` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `naziv_tipa` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tip_velicine`
--

LOCK TABLES `tip_velicine` WRITE;
/*!40000 ALTER TABLE `tip_velicine` DISABLE KEYS */;
/*!40000 ALTER TABLE `tip_velicine` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `velicina`
--

DROP TABLE IF EXISTS `velicina`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `velicina` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `naziv` varchar(50) DEFAULT NULL,
  `opis` varchar(50) DEFAULT NULL,
  `tip_velicine_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `tip_velicine_id_velicina_idx` (`tip_velicine_id`),
  CONSTRAINT `tip_velicine_id_velicina` FOREIGN KEY (`tip_velicine_id`) REFERENCES `tip_velicine` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `velicina`
--

LOCK TABLES `velicina` WRITE;
/*!40000 ALTER TABLE `velicina` DISABLE KEYS */;
/*!40000 ALTER TABLE `velicina` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `zalihe`
--

DROP TABLE IF EXISTS `zalihe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `zalihe` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `kolicina` varchar(50) DEFAULT NULL,
  `velicina_id` bigint(20) NOT NULL,
  `proizvod_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `proizvod_id_zalihe_idx` (`proizvod_id`),
  KEY `velicina_id_zalihe_idx` (`velicina_id`),
  CONSTRAINT `proizvod_id_zalihe` FOREIGN KEY (`proizvod_id`) REFERENCES `proizvod` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `velicina_id_zalihe` FOREIGN KEY (`velicina_id`) REFERENCES `velicina` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `zalihe`
--

LOCK TABLES `zalihe` WRITE;
/*!40000 ALTER TABLE `zalihe` DISABLE KEYS */;
/*!40000 ALTER TABLE `zalihe` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-06 20:40:06
