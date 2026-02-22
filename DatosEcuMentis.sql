-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         8.0.41 - MySQL Community Server - GPL
-- SO del servidor:              Win64
-- HeidiSQL Versión:             10.2.0.5599
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Volcando estructura para tabla pp.datos_usuario
CREATE TABLE IF NOT EXISTS `datos_usuario` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` char(50) DEFAULT NULL,
  `middle_name` char(50) DEFAULT NULL,
  `last_name` char(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT '',
  `username` varchar(50) DEFAULT '',
  `age` int DEFAULT '0',
  `grade` int DEFAULT '0',
  `takes_math` int NOT NULL DEFAULT '0',
  `takes_lenguage` int NOT NULL DEFAULT '0',
  `science_score` int NOT NULL DEFAULT '0',
  `social_score` int NOT NULL DEFAULT '0',
  `tech_score` int NOT NULL DEFAULT '0',
  `finance_score` int NOT NULL DEFAULT '0',
  `logic_score` int NOT NULL DEFAULT '0',
  `math_score` int NOT NULL DEFAULT '0',
  `language_score` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=106 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla pp.learning_blocks
CREATE TABLE IF NOT EXISTS `learning_blocks` (
  `id` int NOT NULL,
  `subject` tinytext,
  `grade_min` tinyint DEFAULT NULL,
  `grade_max` tinyint DEFAULT NULL,
  `level` tinyint DEFAULT NULL,
  `title` tinytext,
  `summary` text,
  `content_json` json DEFAULT NULL,
  `tags_json` json DEFAULT NULL,
  `estimated_minutes` smallint DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla pp.user_learning_progress
CREATE TABLE IF NOT EXISTS `user_learning_progress` (
  `user_id` int DEFAULT NULL,
  `block_id` int DEFAULT NULL,
  `status` int DEFAULT NULL,
  `progress` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- La exportación de datos fue deseleccionada.

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
