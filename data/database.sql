DROP TABLE IF EXISTS `dates`;
CREATE TABLE `dates` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `event_id` varchar(255) DEFAULT NULL,
  `cal_id` varchar(255) DEFAULT NULL,
  `cal_name` varchar(255) DEFAULT NULL,
  `summary` varchar(255) DEFAULT NULL,
  `date_start` datetime DEFAULT NULL,
  `data` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
