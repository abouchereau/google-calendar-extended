-- Adminer 4.8.1 MySQL 11.2.0-MariaDB dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

DROP TABLE IF EXISTS `cal`;
CREATE TABLE `cal` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cal_id` varchar(255) NOT NULL,
  `color_front` varchar(7) NOT NULL,
  `color_back` varchar(7) NOT NULL,
  `summary` varchar(255) NOT NULL,  
  PRIMARY KEY (`id`),
  UNIQUE KEY `cal_id` (`cal_id`) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


DROP TABLE IF EXISTS `event`;
CREATE TABLE `event` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `event_id` varchar(255) DEFAULT NULL,
  `cal_id` varchar(255) NOT NULL,
  `summary` varchar(255) DEFAULT NULL,
  `description` varchar(1024) DEFAULT NULL,
  `date_start` datetime DEFAULT NULL,
  `data` text DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `cal_id_event_id` (`cal_id`,`event_id`),
  CONSTRAINT `dates_ibfk_1` FOREIGN KEY (`cal_id`) REFERENCES `cal` (`cal_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- 2024-10-07 14:27:25
