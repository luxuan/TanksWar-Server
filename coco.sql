/*
 Navicat MySQL Data Transfer

 Source Server         : myself
 Source Server Version : 50528
 Source Host           : localhost
 Source Database       : coco

 Target Server Version : 50528
 File Encoding         : utf-8

 Date: 01/19/2013 19:17:07 PM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `architecture`
-- ----------------------------
DROP TABLE IF EXISTS `architecture`;
CREATE TABLE `architecture` (
  `id` int(4) NOT NULL AUTO_INCREMENT,
  `pointx` double(4,0) DEFAULT NULL,
  `pointy` double(4,0) DEFAULT NULL,
  `png` varchar(50) DEFAULT NULL,
  `category` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `architecture`
-- ----------------------------
BEGIN;
INSERT INTO `architecture` VALUES ('49', '341', '384', 'building2.png', 'military'), ('50', '427', '384', 'building2.png', 'military'), ('51', '512', '384', 'building2.png', 'military'), ('52', '341', '307', 'building2.png', 'military'), ('53', '512', '307', 'building1.png', 'military');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
