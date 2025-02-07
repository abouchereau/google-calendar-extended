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
  `summary` varchar(1024) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `date_start` datetime DEFAULT NULL,
  `data` text DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `cal_id_event_id` (`cal_id`,`event_id`),
  CONSTRAINT `dates_ibfk_1` FOREIGN KEY (`cal_id`) REFERENCES `cal` (`cal_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- Adminer 4.8.1 MySQL 11.2.0-MariaDB dump


DROP TABLE IF EXISTS `formule`;
CREATE TABLE `formule` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `label` varchar(255) NOT NULL,
  `cal_id` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `cal_id` (`cal_id`),
  CONSTRAINT `formule_ibfk_1` FOREIGN KEY (`cal_id`) REFERENCES `cal` (`cal_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `formule` (`id`, `label`, `cal_id`) VALUES
(1,	'SDH Rue',	'e7a3ctp5d5kvrng1ik9tfka9a8@group.calendar.google.com'),
(2,	'SDH Robe',	'e7a3ctp5d5kvrng1ik9tfka9a8@group.calendar.google.com'),
(3,	'SDH Wya',	'e7a3ctp5d5kvrng1ik9tfka9a8@group.calendar.google.com'),
(4,	'BSS',	'2vkcao20bundgjo8v3hrcorteg@group.calendar.google.com'),
(5,	'BSS carav',	'2vkcao20bundgjo8v3hrcorteg@group.calendar.google.com'),
(6,	'GOM',	'2vkcao20bundgjo8v3hrcorteg@group.calendar.google.com'),
(7,	'GOM Carav',	'2vkcao20bundgjo8v3hrcorteg@group.calendar.google.com'),
(8,	'BSS',	'je0pf3nio1rqfb7dl8j71l9aco@group.calendar.google.com'),
(9,	'BSS carav',	'je0pf3nio1rqfb7dl8j71l9aco@group.calendar.google.com'),
(10,	'GOM',	'je0pf3nio1rqfb7dl8j71l9aco@group.calendar.google.com'),
(11,	'GOM Carav',	'je0pf3nio1rqfb7dl8j71l9aco@group.calendar.google.com');

DROP TABLE IF EXISTS `job`;
CREATE TABLE `job` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `label` varchar(100) NOT NULL,
  `cal_id` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),  
  CONSTRAINT `job_cal_ibfk_1` FOREIGN KEY (`cal_id`) REFERENCES `cal` (`cal_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


DROP TABLE IF EXISTS `person`;
CREATE TABLE `person` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstname` varchar(100) NOT NULL,
  `lastname` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `person` (`id`, `firstname`, `lastname`) VALUES
(1,	'Alois',	'Vallade'),
(2,	'Alexandre',	'Zellner'),
(3,	'Adrien',	'Colas'),
(4,	'Basile',	'Conand'),
(5,	'Quentin',	'Longépé'),
(6,	'Rémi',	'Bonnemains'),
(7,	'Pascal',	'Laurière'),
(8,	'Simon',	'Dupire'),
(9,	'Martin',	''),
(10,	'François',	'Julien'),
(11,	'Matthias',	''),
(12,	'Samuel',	'Durand'),
(13,	'Karim',	'Alamichel'),
(14,	'Sylvain',	'Roudier'),
(15,	'Thomas Rempla',	''),
(16,	'Martin Rempla',	''),
(17,	'Ben Rempla',	''),
(18,	'Geoffroy Rempla',	''),
(19,	'Paul Rempla',	''),
(20,	'Charles Rempla',	''),
(21,	'Rempla',	''),
(22,	'Paul B Rempla',	''),
(23,	'Théo Rempla',	''),
(24,	'Gilles',	'Chauprade'),
(25,	'Maeva',	'Frémont'),
(26,	'Paul ',	'Gélébart'),
(27,	'Maxime',	'Berriau'),
(28,	'Mathieu',	'Dubois'),
(29,	'Guillaume',	'Trocmé'),
(30,	'Sébastien',	'Lalange'),
(31,	'Sacha',	''),
(32,	'Aurélia',	''),
(33,	'Mathieu',	'Bolcato'),
(34,	'Jean-Baptiste',	'Réhaud'),
(35,	'Mickey',	''),
(36,	'Léo',	''),
(37,	'Florent',	'Sepchat'),
(38,	'Jean-François',	'Caire'),
(39,	'Océane',	'Halpert'),
(40,	'Matthieu',	'Torsat'),
(41,	'Jean',	'Guyomarch'),
(42,	'Pierre',	'Mager'),
(43,	'Bertrand ',	'Hurault'),
(44,	'Mogane',	'Cornebert'),
(45,	'Jean-Marc',	'Herbreteau'),
(46,	'Benoist',	'Pasquier'),
(47,	'Paul',	'Cadier'),
(48,	'Cédric',	'Piromalli'),
(49,	'Mathias',	'Dragomirovic'),
(50,	'Renaud',	'Detruit');

DROP TABLE IF EXISTS `person_cal`;
CREATE TABLE `person_cal` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `person_id` int(11) NOT NULL,
  `cal_id` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `person_id` (`person_id`),
  KEY `cal_id` (`cal_id`),
  CONSTRAINT `person_cal_ibfk_1` FOREIGN KEY (`person_id`) REFERENCES `person` (`id`),
  CONSTRAINT `person_cal_ibfk_2` FOREIGN KEY (`cal_id`) REFERENCES `cal` (`cal_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `person_cal` (`id`, `person_id`, `cal_id`) VALUES
(1,	1,	'e7a3ctp5d5kvrng1ik9tfka9a8@group.calendar.google.com'),
(2,	2,	'e7a3ctp5d5kvrng1ik9tfka9a8@group.calendar.google.com'),
(3,	3,	'e7a3ctp5d5kvrng1ik9tfka9a8@group.calendar.google.com'),
(4,	4,	'e7a3ctp5d5kvrng1ik9tfka9a8@group.calendar.google.com'),
(5,	5,	'e7a3ctp5d5kvrng1ik9tfka9a8@group.calendar.google.com'),
(6,	6,	'e7a3ctp5d5kvrng1ik9tfka9a8@group.calendar.google.com'),
(7,	7,	'e7a3ctp5d5kvrng1ik9tfka9a8@group.calendar.google.com'),
(8,	8,	'e7a3ctp5d5kvrng1ik9tfka9a8@group.calendar.google.com'),
(9,	9,	'e7a3ctp5d5kvrng1ik9tfka9a8@group.calendar.google.com'),
(10,	10,	'e7a3ctp5d5kvrng1ik9tfka9a8@group.calendar.google.com'),
(11,	11,	'e7a3ctp5d5kvrng1ik9tfka9a8@group.calendar.google.com'),
(12,	12,	'e7a3ctp5d5kvrng1ik9tfka9a8@group.calendar.google.com'),
(13,	13,	'e7a3ctp5d5kvrng1ik9tfka9a8@group.calendar.google.com'),
(14,	14,	'e7a3ctp5d5kvrng1ik9tfka9a8@group.calendar.google.com'),
(15,	15,	'e7a3ctp5d5kvrng1ik9tfka9a8@group.calendar.google.com'),
(16,	16,	'e7a3ctp5d5kvrng1ik9tfka9a8@group.calendar.google.com'),
(17,	17,	'e7a3ctp5d5kvrng1ik9tfka9a8@group.calendar.google.com'),
(18,	18,	'e7a3ctp5d5kvrng1ik9tfka9a8@group.calendar.google.com'),
(19,	19,	'e7a3ctp5d5kvrng1ik9tfka9a8@group.calendar.google.com'),
(20,	20,	'e7a3ctp5d5kvrng1ik9tfka9a8@group.calendar.google.com'),
(21,	21,	'e7a3ctp5d5kvrng1ik9tfka9a8@group.calendar.google.com'),
(22,	22,	'e7a3ctp5d5kvrng1ik9tfka9a8@group.calendar.google.com'),
(23,	23,	'e7a3ctp5d5kvrng1ik9tfka9a8@group.calendar.google.com'),
(24,	24,	'tfcb4r1u9mu389qi41oo1nlsek@group.calendar.google.com'),
(25,	24,	'to11pvq2q69m27am45fjggvkpk@group.calendar.google.com'),
(26,	24,	'ulko40cvplhevbmssqv2kjder4@group.calendar.google.com'),
(27,	25,	'tfcb4r1u9mu389qi41oo1nlsek@group.calendar.google.com'),
(28,	25,	'to11pvq2q69m27am45fjggvkpk@group.calendar.google.com'),
(29,	26,	'tfcb4r1u9mu389qi41oo1nlsek@group.calendar.google.com'),
(30,	26,	'to11pvq2q69m27am45fjggvkpk@group.calendar.google.com'),
(31,	27,	'tfcb4r1u9mu389qi41oo1nlsek@group.calendar.google.com'),
(32,	27,	'to11pvq2q69m27am45fjggvkpk@group.calendar.google.com'),
(33,	28,	'tfcb4r1u9mu389qi41oo1nlsek@group.calendar.google.com'),
(34,	28,	'to11pvq2q69m27am45fjggvkpk@group.calendar.google.com'),
(35,	28,	'je0pf3nio1rqfb7dl8j71l9aco@group.calendar.google.com'),
(36,	29,	'tfcb4r1u9mu389qi41oo1nlsek@group.calendar.google.com'),
(37,	29,	'to11pvq2q69m27am45fjggvkpk@group.calendar.google.com'),
(38,	30,	'tfcb4r1u9mu389qi41oo1nlsek@group.calendar.google.com'),
(39,	30,	'to11pvq2q69m27am45fjggvkpk@group.calendar.google.com'),
(40,	30,	'je0pf3nio1rqfb7dl8j71l9aco@group.calendar.google.com'),
(41,	31,	'tfcb4r1u9mu389qi41oo1nlsek@group.calendar.google.com'),
(42,	31,	'to11pvq2q69m27am45fjggvkpk@group.calendar.google.com'),
(43,	32,	'tfcb4r1u9mu389qi41oo1nlsek@group.calendar.google.com'),
(44,	32,	'to11pvq2q69m27am45fjggvkpk@group.calendar.google.com'),
(45,	33,	'tfcb4r1u9mu389qi41oo1nlsek@group.calendar.google.com'),
(46,	33,	'to11pvq2q69m27am45fjggvkpk@group.calendar.google.com'),
(47,	34,	'tfcb4r1u9mu389qi41oo1nlsek@group.calendar.google.com'),
(48,	34,	'to11pvq2q69m27am45fjggvkpk@group.calendar.google.com'),
(49,	35,	'tfcb4r1u9mu389qi41oo1nlsek@group.calendar.google.com'),
(50,	35,	'to11pvq2q69m27am45fjggvkpk@group.calendar.google.com'),
(51,	36,	'tfcb4r1u9mu389qi41oo1nlsek@group.calendar.google.com'),
(52,	36,	'to11pvq2q69m27am45fjggvkpk@group.calendar.google.com'),
(53,	37,	'to11pvq2q69m27am45fjggvkpk@group.calendar.google.com'),
(54,	37,	'2vkcao20bundgjo8v3hrcorteg@group.calendar.google.com'),
(55,	37,	'gqma0kkiiqu2p1q1sgn4dmv5k8@group.calendar.google.com'),
(56,	37,	'ulko40cvplhevbmssqv2kjder4@group.calendar.google.com'),
(57,	38,	'to11pvq2q69m27am45fjggvkpk@group.calendar.google.com'),
(58,	38,	'2vkcao20bundgjo8v3hrcorteg@group.calendar.google.com'),
(59,	39,	'to11pvq2q69m27am45fjggvkpk@group.calendar.google.com'),
(60,	39,	'2vkcao20bundgjo8v3hrcorteg@group.calendar.google.com'),
(61,	40,	'to11pvq2q69m27am45fjggvkpk@group.calendar.google.com'),
(62,	40,	'2vkcao20bundgjo8v3hrcorteg@group.calendar.google.com'),
(63,	41,	'to11pvq2q69m27am45fjggvkpk@group.calendar.google.com'),
(64,	41,	'2vkcao20bundgjo8v3hrcorteg@group.calendar.google.com'),
(65,	42,	'to11pvq2q69m27am45fjggvkpk@group.calendar.google.com'),
(66,	42,	'2vkcao20bundgjo8v3hrcorteg@group.calendar.google.com'),
(67,	43,	'gqma0kkiiqu2p1q1sgn4dmv5k8@group.calendar.google.com'),
(68,	44,	'gqma0kkiiqu2p1q1sgn4dmv5k8@group.calendar.google.com'),
(69,	45,	'gqma0kkiiqu2p1q1sgn4dmv5k8@group.calendar.google.com'),
(70,	46,	'gqma0kkiiqu2p1q1sgn4dmv5k8@group.calendar.google.com'),
(71,	47,	'gqma0kkiiqu2p1q1sgn4dmv5k8@group.calendar.google.com'),
(72,	48,	'gqma0kkiiqu2p1q1sgn4dmv5k8@group.calendar.google.com'),
(73,	49,	'ulko40cvplhevbmssqv2kjder4@group.calendar.google.com'),
(74,	50,	'kmg2oeur0qi64r1c12qaki7d7k@group.calendar.google.com');

DROP TABLE IF EXISTS `person_job`;
CREATE TABLE `person_job` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `person_id` int(11) NOT NULL,
  `job_id` int(11) NOT NULL,
  `is_holder` tinyint(4) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  KEY `person_id` (`person_id`),
  KEY `job_id` (`job_id`),
  CONSTRAINT `person_job_ibfk_1` FOREIGN KEY (`person_id`) REFERENCES `person` (`id`),
  CONSTRAINT `person_job_ibfk_2` FOREIGN KEY (`job_id`) REFERENCES `job` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

ALTER TABLE `event`
ADD `sync_google` tinyint NULL DEFAULT '1';
-- 2025-01-08 14:16:30
