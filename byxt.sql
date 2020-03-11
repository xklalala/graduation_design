/*
 Navicat Premium Data Transfer

 Source Server         : 127.0.0.1_3306
 Source Server Type    : MySQL
 Source Server Version : 50729
 Source Host           : 127.0.0.1:3306
 Source Schema         : byxt

 Target Server Type    : MySQL
 Target Server Version : 50729
 File Encoding         : 65001

 Date: 11/03/2020 19:24:19
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for xtxt_sys_params
-- ----------------------------
DROP TABLE IF EXISTS `xtxt_sys_params`;
CREATE TABLE `xtxt_sys_params` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `param_name` varchar(36) NOT NULL COMMENT '参数名称',
  `param_value` varchar(36) NOT NULL COMMENT '参数值',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `param_name` (`param_name`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='系统变量表';

-- ----------------------------
-- Records of xtxt_sys_params
-- ----------------------------
BEGIN;
INSERT INTO `xtxt_sys_params` VALUES (1, 'STUDENT_ENTRY', 'true');
INSERT INTO `xtxt_sys_params` VALUES (2, 'TEACHER_ENTRY', 'true');
COMMIT;

-- ----------------------------
-- Table structure for xtxt_user_admin
-- ----------------------------
DROP TABLE IF EXISTS `xtxt_user_admin`;
CREATE TABLE `xtxt_user_admin` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(10) DEFAULT NULL COMMENT '账号',
  `password` varchar(255) DEFAULT NULL COMMENT '密码',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='管理员表';

-- ----------------------------
-- Records of xtxt_user_admin
-- ----------------------------
BEGIN;
INSERT INTO `xtxt_user_admin` VALUES (1, '004628', 'c9268cca058eede53b7728ebd602efb8');
COMMIT;

-- ----------------------------
-- Table structure for xtxt_user_students_2016
-- ----------------------------
DROP TABLE IF EXISTS `xtxt_user_students_2016`;
CREATE TABLE `xtxt_user_students_2016` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `student_id` char(12) NOT NULL COMMENT '学生学号',
  `student_name` varchar(36) DEFAULT NULL,
  `student_password` varchar(255) NOT NULL DEFAULT 'c9268cca058eede53b7728ebd602efb8' COMMENT '密码默认为12345678',
  `student_class_name` varchar(30) DEFAULT NULL COMMENT '班级',
  `phone_number` varchar(11) DEFAULT NULL COMMENT '学生手机号',
  `another_contact` varchar(128) DEFAULT NULL COMMENT '其它联系方式',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `stu_id` (`student_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='学生表,学生表这里根据年份自建  byxt_user_students_2020';

-- ----------------------------
-- Records of xtxt_user_students_2016
-- ----------------------------
BEGIN;
INSERT INTO `xtxt_user_students_2016` VALUES (1, '201226203047', '徐凯', 'c9268cca058eede53b7728ebd602efb8', '16级网络工程2班', NULL, NULL);
COMMIT;

-- ----------------------------
-- Table structure for xtxt_user_students_2020
-- ----------------------------
DROP TABLE IF EXISTS `xtxt_user_students_2020`;
CREATE TABLE `xtxt_user_students_2020` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `student_id` char(12) NOT NULL COMMENT '学生学号',
  `student_name` varchar(36) DEFAULT NULL,
  `student_password` varchar(255) NOT NULL DEFAULT 'c9268cca058eede53b7728ebd602efb8' COMMENT '密码默认为12345678',
  `student_class_name` varchar(30) DEFAULT NULL COMMENT '班级',
  `phone_number` varchar(11) DEFAULT NULL COMMENT '学生手机号',
  `another_contact` varchar(128) DEFAULT NULL COMMENT '其它联系方式',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `stu_id` (`student_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='学生表,学生表这里根据年份自建  byxt_user_students_2020';

-- ----------------------------
-- Records of xtxt_user_students_2020
-- ----------------------------
BEGIN;
INSERT INTO `xtxt_user_students_2020` VALUES (4, '201626203047', '徐凯', 'c9268cca058eede53b7728ebd602efb8', '16级网络工程2班', '15070232051', '微信：xk2607780909');
INSERT INTO `xtxt_user_students_2020` VALUES (5, '201626203048', '赖锟', 'c9268cca058eede53b7728ebd602efb8', '16级网络工程2班', NULL, NULL);
INSERT INTO `xtxt_user_students_2020` VALUES (6, '201626203049', '肖荘林', 'c9268cca058eede53b7728ebd602efb8', '16级网络工程2班', NULL, NULL);
INSERT INTO `xtxt_user_students_2020` VALUES (7, '201626203050', '龚圣茵', 'c9268cca058eede53b7728ebd602efb8', '16级网络工程2班', NULL, NULL);
INSERT INTO `xtxt_user_students_2020` VALUES (8, '201626203051', '黄敏', 'c9268cca058eede53b7728ebd602efb8', '16级网络工程2班', NULL, NULL);
INSERT INTO `xtxt_user_students_2020` VALUES (9, '201626203052', '赵艺璇', 'c9268cca058eede53b7728ebd602efb8', '16级网络工程2班', NULL, NULL);
INSERT INTO `xtxt_user_students_2020` VALUES (10, '201626203053', '肖涛', 'c9268cca058eede53b7728ebd602efb8', '16级网络工程2班', NULL, NULL);
INSERT INTO `xtxt_user_students_2020` VALUES (11, '201626203054', '汪惠林', 'c9268cca058eede53b7728ebd602efb8', '16级网络工程2班', NULL, NULL);
INSERT INTO `xtxt_user_students_2020` VALUES (12, '201626203055', '陈子聪', 'c9268cca058eede53b7728ebd602efb8', '16级网络工程2班', NULL, NULL);
INSERT INTO `xtxt_user_students_2020` VALUES (13, '201626203056', '余苗', 'c9268cca058eede53b7728ebd602efb8', '16级网络工程2班', NULL, NULL);
INSERT INTO `xtxt_user_students_2020` VALUES (14, '201626203057', '郭慧钰', 'c9268cca058eede53b7728ebd602efb8', '16级网络工程2班', NULL, NULL);
INSERT INTO `xtxt_user_students_2020` VALUES (15, '201626203058', '龚方伟', 'c9268cca058eede53b7728ebd602efb8', '16级网络工程2班', NULL, NULL);
INSERT INTO `xtxt_user_students_2020` VALUES (16, '201626203059', '彭涛', 'c9268cca058eede53b7728ebd602efb8', '16级网络工程2班', NULL, NULL);
INSERT INTO `xtxt_user_students_2020` VALUES (17, '201626203060', '甘瑜', 'c9268cca058eede53b7728ebd602efb8', '16级网络工程2班', NULL, NULL);
INSERT INTO `xtxt_user_students_2020` VALUES (18, '201626203061', '涂杰', 'c9268cca058eede53b7728ebd602efb8', '16级网络工程2班', NULL, NULL);
INSERT INTO `xtxt_user_students_2020` VALUES (19, '201626203062', '吴桓', 'c9268cca058eede53b7728ebd602efb8', '16级网络工程2班', NULL, NULL);
INSERT INTO `xtxt_user_students_2020` VALUES (20, '201626203063', '王钦', 'c9268cca058eede53b7728ebd602efb8', '16级网络工程2班', NULL, NULL);
INSERT INTO `xtxt_user_students_2020` VALUES (21, '201626203064', '李圳', 'c9268cca058eede53b7728ebd602efb8', '16级网络工程2班', NULL, NULL);
INSERT INTO `xtxt_user_students_2020` VALUES (22, '201626203065', '黄子豪', 'c9268cca058eede53b7728ebd602efb8', '16级网络工程2班', NULL, NULL);
INSERT INTO `xtxt_user_students_2020` VALUES (23, '201626203066', '邱俊雄', 'c9268cca058eede53b7728ebd602efb8', '16级网络工程2班', NULL, NULL);
INSERT INTO `xtxt_user_students_2020` VALUES (24, '201626203067', '胡俊', 'c9268cca058eede53b7728ebd602efb8', '16级网络工程2班', NULL, NULL);
INSERT INTO `xtxt_user_students_2020` VALUES (25, '201626203068', '李胜华', 'c9268cca058eede53b7728ebd602efb8', '16级网络工程2班', NULL, NULL);
INSERT INTO `xtxt_user_students_2020` VALUES (26, '201626203069', '刘安平', 'c9268cca058eede53b7728ebd602efb8', '16级网络工程2班', NULL, NULL);
INSERT INTO `xtxt_user_students_2020` VALUES (27, '201626203070', '刘伟', 'c9268cca058eede53b7728ebd602efb8', '16级网络工程2班', NULL, NULL);
INSERT INTO `xtxt_user_students_2020` VALUES (28, '201626203071', '吴迪', 'c9268cca058eede53b7728ebd602efb8', '16级网络工程2班', NULL, NULL);
INSERT INTO `xtxt_user_students_2020` VALUES (29, '201626203072', '石易', 'c9268cca058eede53b7728ebd602efb8', '16级网络工程2班', NULL, NULL);
INSERT INTO `xtxt_user_students_2020` VALUES (30, '201626203073', '洪子文', 'c9268cca058eede53b7728ebd602efb8', '16级网络工程2班', NULL, NULL);
INSERT INTO `xtxt_user_students_2020` VALUES (31, '201626203074', '曾晓淇', 'c9268cca058eede53b7728ebd602efb8', '16级网络工程2班', NULL, NULL);
INSERT INTO `xtxt_user_students_2020` VALUES (32, '201626203075', '吴振南', 'c9268cca058eede53b7728ebd602efb8', '16级网络工程2班', NULL, NULL);
INSERT INTO `xtxt_user_students_2020` VALUES (33, '201626203076', '方程', 'c9268cca058eede53b7728ebd602efb8', '16级网络工程2班', NULL, NULL);
INSERT INTO `xtxt_user_students_2020` VALUES (34, '201626203077', '高营营', 'c9268cca058eede53b7728ebd602efb8', '16级网络工程2班', NULL, NULL);
INSERT INTO `xtxt_user_students_2020` VALUES (35, '201626203078', '徐天一', 'c9268cca058eede53b7728ebd602efb8', '16级网络工程2班', NULL, NULL);
INSERT INTO `xtxt_user_students_2020` VALUES (36, '201626203079', '谢雷', 'c9268cca058eede53b7728ebd602efb8', '16级网络工程2班', NULL, NULL);
INSERT INTO `xtxt_user_students_2020` VALUES (37, '201626203080', '陈思航', 'c9268cca058eede53b7728ebd602efb8', '16级网络工程2班', NULL, NULL);
INSERT INTO `xtxt_user_students_2020` VALUES (38, '201626203081', '吴敏', 'c9268cca058eede53b7728ebd602efb8', '16级网络工程2班', NULL, NULL);
INSERT INTO `xtxt_user_students_2020` VALUES (39, '201626203082', '杜晓洋', 'c9268cca058eede53b7728ebd602efb8', '16级网络工程2班', NULL, NULL);
INSERT INTO `xtxt_user_students_2020` VALUES (40, '201626203083', '孔云', 'c9268cca058eede53b7728ebd602efb8', '16级网络工程2班', NULL, NULL);
INSERT INTO `xtxt_user_students_2020` VALUES (41, '201626203084', '曾涛', 'c9268cca058eede53b7728ebd602efb8', '16级网络工程2班', NULL, NULL);
INSERT INTO `xtxt_user_students_2020` VALUES (42, '201626203085', '江蓉', 'c9268cca058eede53b7728ebd602efb8', '16级网络工程2班', NULL, NULL);
INSERT INTO `xtxt_user_students_2020` VALUES (44, '201627203047', '徐凯', 'c9268cca058eede53b7728ebd602efb8', NULL, '', '');
INSERT INTO `xtxt_user_students_2020` VALUES (46, '201628203047', '徐凯', 'c9268cca058eede53b7728ebd602efb8', NULL, '', '');
COMMIT;

-- ----------------------------
-- Table structure for xtxt_user_students_base
-- ----------------------------
DROP TABLE IF EXISTS `xtxt_user_students_base`;
CREATE TABLE `xtxt_user_students_base` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `student_id` char(12) NOT NULL COMMENT '学生学号',
  `student_name` varchar(36) DEFAULT NULL,
  `student_password` varchar(255) NOT NULL DEFAULT 'c9268cca058eede53b7728ebd602efb8' COMMENT '密码默认为12345678',
  `student_class_name` varchar(30) DEFAULT NULL COMMENT '班级',
  `phone_number` varchar(11) DEFAULT NULL COMMENT '学生手机号',
  `another_contact` varchar(128) DEFAULT NULL COMMENT '其它联系方式',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `stu_id` (`student_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='学生表,学生表这里根据年份自建  byxt_user_students_2020';

-- ----------------------------
-- Records of xtxt_user_students_base
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for xtxt_user_students_table
-- ----------------------------
DROP TABLE IF EXISTS `xtxt_user_students_table`;
CREATE TABLE `xtxt_user_students_table` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `year` char(4) DEFAULT NULL,
  `number` int(11) DEFAULT NULL,
  `status` enum('0','1') DEFAULT '1',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 ROW_FORMAT=FIXED;

-- ----------------------------
-- Records of xtxt_user_students_table
-- ----------------------------
BEGIN;
INSERT INTO `xtxt_user_students_table` VALUES (13, '2016', 0, '1');
INSERT INTO `xtxt_user_students_table` VALUES (12, '2020', 0, '1');
COMMIT;

-- ----------------------------
-- Table structure for xtxt_user_teacher
-- ----------------------------
DROP TABLE IF EXISTS `xtxt_user_teacher`;
CREATE TABLE `xtxt_user_teacher` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `teacher_id` char(6) NOT NULL COMMENT '教师工号',
  `teacher_name` varchar(36) DEFAULT NULL,
  `teacher_password` varchar(255) DEFAULT 'c9268cca058eede53b7728ebd602efb8' COMMENT '密码',
  `phone_number` varchar(11) DEFAULT NULL COMMENT '教师手机号',
  `another_contact` varchar(128) DEFAULT NULL COMMENT '其它联系方式',
  `teacher_status` enum('0','1') DEFAULT '1' COMMENT '账号状态，0 禁用， 1 正常',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `tea_id` (`teacher_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=108 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='教师表';

-- ----------------------------
-- Records of xtxt_user_teacher
-- ----------------------------
BEGIN;
INSERT INTO `xtxt_user_teacher` VALUES (1, '000121', '刘钟吉', 'c9268cca058eede53b7728ebd602efb8', '15070232051', NULL, '1');
INSERT INTO `xtxt_user_teacher` VALUES (2, '000827', '熊晓华', 'c9268cca058eede53b7728ebd602efb8', '15070232051', NULL, '1');
INSERT INTO `xtxt_user_teacher` VALUES (3, '001058', '黄勤', 'c9268cca058eede53b7728ebd602efb8', '15070232051', NULL, '1');
INSERT INTO `xtxt_user_teacher` VALUES (4, '001064', '王明文', 'c9268cca058eede53b7728ebd602efb8', '15070232051', NULL, '1');
INSERT INTO `xtxt_user_teacher` VALUES (5, '001067', '周琪云', 'c9268cca058eede53b7728ebd602efb8', '15070232051', NULL, '1');
INSERT INTO `xtxt_user_teacher` VALUES (6, '001071', '李云清', 'c9268cca058eede53b7728ebd602efb8', '15070232051', NULL, '1');
INSERT INTO `xtxt_user_teacher` VALUES (7, '001073', '杨庆红', 'c9268cca058eede53b7728ebd602efb8', '15070232050', '微信：xk2607780909', '1');
INSERT INTO `xtxt_user_teacher` VALUES (8, '001079', '谢旭升', 'c9268cca058eede53b7728ebd602efb8', '15070232051', NULL, '1');
INSERT INTO `xtxt_user_teacher` VALUES (9, '001082', '张练兴', 'c9268cca058eede53b7728ebd602efb8', '15070232051', NULL, '1');
INSERT INTO `xtxt_user_teacher` VALUES (10, '001311', '罗坚', 'c9268cca058eede53b7728ebd602efb8', '15070232051', NULL, '1');
INSERT INTO `xtxt_user_teacher` VALUES (11, '001312', '熊刚', 'c9268cca058eede53b7728ebd602efb8', '15070232051', NULL, '1');
INSERT INTO `xtxt_user_teacher` VALUES (12, '001314', '李建元', 'c9268cca058eede53b7728ebd602efb8', '15070232051', NULL, '1');
INSERT INTO `xtxt_user_teacher` VALUES (13, '001317', '张建平', 'c9268cca058eede53b7728ebd602efb8', '15070232051', NULL, '1');
INSERT INTO `xtxt_user_teacher` VALUES (14, '001319', '徐文胜', 'c9268cca058eede53b7728ebd602efb8', '15070232051', NULL, '1');
INSERT INTO `xtxt_user_teacher` VALUES (15, '001896', '肖接增', 'c9268cca058eede53b7728ebd602efb8', '15070232051', NULL, '1');
INSERT INTO `xtxt_user_teacher` VALUES (16, '001932', '杨印根', 'c9268cca058eede53b7728ebd602efb8', '15070232051', NULL, '1');
INSERT INTO `xtxt_user_teacher` VALUES (17, '001933', '吴克捷', 'c9268cca058eede53b7728ebd602efb8', '15070232051', NULL, '1');
INSERT INTO `xtxt_user_teacher` VALUES (18, '001978', '李云洪', 'c9268cca058eede53b7728ebd602efb8', '15070232051', NULL, '1');
INSERT INTO `xtxt_user_teacher` VALUES (19, '002036', '朱明华', 'c9268cca058eede53b7728ebd602efb8', '15070232051', NULL, '1');
INSERT INTO `xtxt_user_teacher` VALUES (20, '002053', '万剑怡', 'c9268cca058eede53b7728ebd602efb8', '15070232051', NULL, '1');
INSERT INTO `xtxt_user_teacher` VALUES (21, '002063', '王岚', 'c9268cca058eede53b7728ebd602efb8', '15070232051', NULL, '1');
INSERT INTO `xtxt_user_teacher` VALUES (22, '002065', '漆志群', 'c9268cca058eede53b7728ebd602efb8', '15070232051', NULL, '1');
INSERT INTO `xtxt_user_teacher` VALUES (23, '002067', '李雪斌', 'c9268cca058eede53b7728ebd602efb8', '15070232051', NULL, '1');
INSERT INTO `xtxt_user_teacher` VALUES (24, '002160', '揭安全', 'c9268cca058eede53b7728ebd602efb8', '15070232051', NULL, '1');
INSERT INTO `xtxt_user_teacher` VALUES (25, '002198', '傅清平', 'c9268cca058eede53b7728ebd602efb8', '15070232051', NULL, '1');
INSERT INTO `xtxt_user_teacher` VALUES (26, '002219', '甘朝红', 'c9268cca058eede53b7728ebd602efb8', '15070232051', NULL, '1');
INSERT INTO `xtxt_user_teacher` VALUES (27, '002221', '马明磊', 'c9268cca058eede53b7728ebd602efb8', '15070232051', NULL, '1');
INSERT INTO `xtxt_user_teacher` VALUES (28, '002252', '叶茂盛', 'c9268cca058eede53b7728ebd602efb8', '15070232051', NULL, '1');
INSERT INTO `xtxt_user_teacher` VALUES (29, '002269', '李宏伟', 'c9268cca058eede53b7728ebd602efb8', '15070232051', NULL, '1');
INSERT INTO `xtxt_user_teacher` VALUES (30, '002270', '钟林辉', 'c9268cca058eede53b7728ebd602efb8', '15070232051', NULL, '1');
INSERT INTO `xtxt_user_teacher` VALUES (31, '002279', '熊建华', 'c9268cca058eede53b7728ebd602efb8', '15070232051', NULL, '1');
INSERT INTO `xtxt_user_teacher` VALUES (32, '002292', '万中英', 'c9268cca058eede53b7728ebd602efb8', '15070232051', NULL, '1');
INSERT INTO `xtxt_user_teacher` VALUES (33, '002311', '王昌晶', 'c9268cca058eede53b7728ebd602efb8', '15070232051', NULL, '1');
INSERT INTO `xtxt_user_teacher` VALUES (34, '002351', '化志章', 'c9268cca058eede53b7728ebd602efb8', '15070232051', NULL, '1');
INSERT INTO `xtxt_user_teacher` VALUES (35, '002413', '胡全连', 'c9268cca058eede53b7728ebd602efb8', '15070232051', NULL, '1');
INSERT INTO `xtxt_user_teacher` VALUES (36, '002426', '敖小玲', 'c9268cca058eede53b7728ebd602efb8', '15070232051', NULL, '1');
INSERT INTO `xtxt_user_teacher` VALUES (37, '002561', '黄林颖', 'c9268cca058eede53b7728ebd602efb8', '15070232051', NULL, '1');
INSERT INTO `xtxt_user_teacher` VALUES (38, '002562', '李佳', 'c9268cca058eede53b7728ebd602efb8', '15070232051', NULL, '1');
INSERT INTO `xtxt_user_teacher` VALUES (39, '002564', '吴水秀', 'c9268cca058eede53b7728ebd602efb8', '15070232051', NULL, '1');
INSERT INTO `xtxt_user_teacher` VALUES (40, '002585', '罗玮', 'c9268cca058eede53b7728ebd602efb8', '15070232051', NULL, '1');
INSERT INTO `xtxt_user_teacher` VALUES (41, '002629', '周勇', 'c9268cca058eede53b7728ebd602efb8', '15070232051', NULL, '1');
INSERT INTO `xtxt_user_teacher` VALUES (42, '002642', '叶继华', 'c9268cca058eede53b7728ebd602efb8', '15070232051', NULL, '1');
INSERT INTO `xtxt_user_teacher` VALUES (43, '002643', '李斌', 'c9268cca058eede53b7728ebd602efb8', '15070232051', NULL, '1');
INSERT INTO `xtxt_user_teacher` VALUES (44, '002644', '聂伟强', 'c9268cca058eede53b7728ebd602efb8', '15070232051', NULL, '1');
INSERT INTO `xtxt_user_teacher` VALUES (45, '002645', '刘超', 'c9268cca058eede53b7728ebd602efb8', '15070232051', NULL, '1');
INSERT INTO `xtxt_user_teacher` VALUES (46, '002734', '彭云', 'c9268cca058eede53b7728ebd602efb8', '15070232051', NULL, '1');
INSERT INTO `xtxt_user_teacher` VALUES (47, '002745', '廖云燕', 'c9268cca058eede53b7728ebd602efb8', '15070232051', NULL, '1');
INSERT INTO `xtxt_user_teacher` VALUES (48, '002752', '徐培', 'c9268cca058eede53b7728ebd602efb8', '15070232051', NULL, '1');
INSERT INTO `xtxt_user_teacher` VALUES (49, '002754', '张婕', 'c9268cca058eede53b7728ebd602efb8', '15070232051', NULL, '1');
INSERT INTO `xtxt_user_teacher` VALUES (50, '002822', '余彤仑', 'c9268cca058eede53b7728ebd602efb8', '15070232051', NULL, '1');
INSERT INTO `xtxt_user_teacher` VALUES (51, '002853', '王丽君', 'c9268cca058eede53b7728ebd602efb8', '15070232051', NULL, '1');
INSERT INTO `xtxt_user_teacher` VALUES (52, '002955', '王国纬', 'c9268cca058eede53b7728ebd602efb8', '15070232051', NULL, '1');
INSERT INTO `xtxt_user_teacher` VALUES (53, '002956', '刘洪', 'c9268cca058eede53b7728ebd602efb8', '15070232051', NULL, '1');
INSERT INTO `xtxt_user_teacher` VALUES (54, '002957', '周新', 'c9268cca058eede53b7728ebd602efb8', '15070232051', NULL, '1');
INSERT INTO `xtxt_user_teacher` VALUES (55, '002958', '王萍', 'c9268cca058eede53b7728ebd602efb8', '15070232051', NULL, '1');
INSERT INTO `xtxt_user_teacher` VALUES (56, '003146', '邓涛', 'c9268cca058eede53b7728ebd602efb8', '15070232051', NULL, '1');
INSERT INTO `xtxt_user_teacher` VALUES (57, '003193', '罗芬', 'c9268cca058eede53b7728ebd602efb8', '15070232051', NULL, '1');
INSERT INTO `xtxt_user_teacher` VALUES (58, '003194', '王晓庆', 'c9268cca058eede53b7728ebd602efb8', '15070232051', NULL, '1');
INSERT INTO `xtxt_user_teacher` VALUES (59, '003195', '万宇文', 'c9268cca058eede53b7728ebd602efb8', '15070232051', NULL, '1');
INSERT INTO `xtxt_user_teacher` VALUES (60, '003265', '郑燚', 'c9268cca058eede53b7728ebd602efb8', '15070232051', NULL, '1');
INSERT INTO `xtxt_user_teacher` VALUES (61, '003432', '胡珍新', 'c9268cca058eede53b7728ebd602efb8', '15070232051', NULL, '1');
INSERT INTO `xtxt_user_teacher` VALUES (62, '003435', '石海鹤', 'c9268cca058eede53b7728ebd602efb8', '15070232051', NULL, '1');
INSERT INTO `xtxt_user_teacher` VALUES (63, '003439', '方剑英', 'c9268cca058eede53b7728ebd602efb8', '15070232051', NULL, '1');
INSERT INTO `xtxt_user_teacher` VALUES (64, '003484', '卢家兴', 'c9268cca058eede53b7728ebd602efb8', '15070232051', NULL, '1');
INSERT INTO `xtxt_user_teacher` VALUES (65, '003490', '刘长红', 'c9268cca058eede53b7728ebd602efb8', '15070232051', NULL, '1');
INSERT INTO `xtxt_user_teacher` VALUES (66, '003491', '左正康', 'c9268cca058eede53b7728ebd602efb8', '15070232051', NULL, '1');
INSERT INTO `xtxt_user_teacher` VALUES (67, '003635', '程柏良', 'c9268cca058eede53b7728ebd602efb8', '15070232051', NULL, '1');
INSERT INTO `xtxt_user_teacher` VALUES (68, '003697', '胡蕾', 'c9268cca058eede53b7728ebd602efb8', '15070232051', NULL, '1');
INSERT INTO `xtxt_user_teacher` VALUES (69, '003845', '罗文兵', 'c9268cca058eede53b7728ebd602efb8', '15070232051', NULL, '1');
INSERT INTO `xtxt_user_teacher` VALUES (70, '003888', '万芳', 'c9268cca058eede53b7728ebd602efb8', '15070232051', NULL, '1');
INSERT INTO `xtxt_user_teacher` VALUES (71, '003895', '左家莉', 'c9268cca058eede53b7728ebd602efb8', '15070232051', NULL, '1');
INSERT INTO `xtxt_user_teacher` VALUES (72, '003957', '郭帆', 'c9268cca058eede53b7728ebd602efb8', '15070232051', NULL, '1');
INSERT INTO `xtxt_user_teacher` VALUES (73, '004004', '乐兵', 'c9268cca058eede53b7728ebd602efb8', '15070232051', NULL, '1');
INSERT INTO `xtxt_user_teacher` VALUES (74, '004048', '丁朝毅', 'c9268cca058eede53b7728ebd602efb8', '15070232051', NULL, '1');
INSERT INTO `xtxt_user_teacher` VALUES (75, '004060', '毛阳芳', 'c9268cca058eede53b7728ebd602efb8', '15070232051', NULL, '1');
INSERT INTO `xtxt_user_teacher` VALUES (76, '004228', '倪海英', 'c9268cca058eede53b7728ebd602efb8', '15070232051', NULL, '1');
INSERT INTO `xtxt_user_teacher` VALUES (77, '004346', '李海燕', 'c9268cca058eede53b7728ebd602efb8', '15070232051', NULL, '1');
INSERT INTO `xtxt_user_teacher` VALUES (78, '004373', '曾纪国', 'c9268cca058eede53b7728ebd602efb8', '15070232051', NULL, '1');
INSERT INTO `xtxt_user_teacher` VALUES (79, '004388', '雷震春', 'c9268cca058eede53b7728ebd602efb8', '15070232051', NULL, '1');
INSERT INTO `xtxt_user_teacher` VALUES (80, '004626', '程艳', 'c9268cca058eede53b7728ebd602efb8', '15070232051', NULL, '1');
INSERT INTO `xtxt_user_teacher` VALUES (81, '004632', '江爱文', 'c9268cca058eede53b7728ebd602efb8', '15070232051', NULL, '1');
INSERT INTO `xtxt_user_teacher` VALUES (82, '004639', '刘建明', 'c9268cca058eede53b7728ebd602efb8', '15070232051', NULL, '1');
INSERT INTO `xtxt_user_teacher` VALUES (83, '004719', '曲彦文', 'c9268cca058eede53b7728ebd602efb8', '15070232051', NULL, '1');
INSERT INTO `xtxt_user_teacher` VALUES (84, '004781', '李茂西', 'c9268cca058eede53b7728ebd602efb8', '15070232051', NULL, '1');
INSERT INTO `xtxt_user_teacher` VALUES (85, '004783', '张光河', 'c9268cca058eede53b7728ebd602efb8', '15070232051', NULL, '1');
INSERT INTO `xtxt_user_teacher` VALUES (86, '004798', '王仕民', 'c9268cca058eede53b7728ebd602efb8', '15070232051', NULL, '1');
INSERT INTO `xtxt_user_teacher` VALUES (87, '004822', '章昱', 'c9268cca058eede53b7728ebd602efb8', '15070232051', NULL, '1');
INSERT INTO `xtxt_user_teacher` VALUES (88, '004855', '汪文义', 'c9268cca058eede53b7728ebd602efb8', '15070232051', NULL, '1');
INSERT INTO `xtxt_user_teacher` VALUES (89, '004882', '冯悦', 'c9268cca058eede53b7728ebd602efb8', '15070232051', NULL, '1');
INSERT INTO `xtxt_user_teacher` VALUES (90, '004900', '邓少辉', 'c9268cca058eede53b7728ebd602efb8', '15070232051', NULL, '1');
INSERT INTO `xtxt_user_teacher` VALUES (91, '004944', '徐凡', 'c9268cca058eede53b7728ebd602efb8', '15070232051', NULL, '1');
INSERT INTO `xtxt_user_teacher` VALUES (92, '004966', '周新宇', 'c9268cca058eede53b7728ebd602efb8', '15070232051', NULL, '1');
INSERT INTO `xtxt_user_teacher` VALUES (93, '004987', '李汉曦', 'c9268cca058eede53b7728ebd602efb8', '15070232051', NULL, '1');
INSERT INTO `xtxt_user_teacher` VALUES (94, '005034', '雷浩鹏', 'c9268cca058eede53b7728ebd602efb8', '15070232051', NULL, '1');
INSERT INTO `xtxt_user_teacher` VALUES (95, '005059', '曾锦山', 'c9268cca058eede53b7728ebd602efb8', '15070232051', NULL, '1');
INSERT INTO `xtxt_user_teacher` VALUES (96, '005194', '钟茂生', 'c9268cca058eede53b7728ebd602efb8', '15070232051', NULL, '1');
INSERT INTO `xtxt_user_teacher` VALUES (97, '005208', '马勇', 'c9268cca058eede53b7728ebd602efb8', '15070232051', NULL, '1');
INSERT INTO `xtxt_user_teacher` VALUES (98, '005228', '曾雪强', 'c9268cca058eede53b7728ebd602efb8', '15070232051', NULL, '1');
INSERT INTO `xtxt_user_teacher` VALUES (99, '005237', '倪文龙', 'c9268cca058eede53b7728ebd602efb8', '15070232051', NULL, '1');
INSERT INTO `xtxt_user_teacher` VALUES (100, '005242', '陈华', 'c9268cca058eede53b7728ebd602efb8', '15070232051', NULL, '1');
INSERT INTO `xtxt_user_teacher` VALUES (101, '005275', '黄箐', 'c9268cca058eede53b7728ebd602efb8', '15070232051', NULL, '1');
INSERT INTO `xtxt_user_teacher` VALUES (102, '090077', '周强', 'c9268cca058eede53b7728ebd602efb8', '15070232051', NULL, '1');
INSERT INTO `xtxt_user_teacher` VALUES (103, '090107', '陈恬恬', 'c9268cca058eede53b7728ebd602efb8', '15070232051', NULL, '1');
INSERT INTO `xtxt_user_teacher` VALUES (104, '090127', '曾庆萌', 'c9268cca058eede53b7728ebd602efb8', '15070232051', NULL, '1');
INSERT INTO `xtxt_user_teacher` VALUES (105, '090172', '樊莎莉', 'c9268cca058eede53b7728ebd602efb8', '15070232051', NULL, '1');
INSERT INTO `xtxt_user_teacher` VALUES (106, 'jwc210', '黄海飞', 'c9268cca058eede53b7728ebd602efb8', '15070232051', NULL, '1');
INSERT INTO `xtxt_user_teacher` VALUES (107, 'jwc211', '游胜玉', 'c9268cca058eede53b7728ebd602efb8', '15070232051', NULL, '1');
COMMIT;

-- ----------------------------
-- Table structure for xtxt_xt_list
-- ----------------------------
DROP TABLE IF EXISTS `xtxt_xt_list`;
CREATE TABLE `xtxt_xt_list` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `student_id` int(255) DEFAULT NULL,
  `teacher_id` char(7) DEFAULT NULL,
  `xt_id` int(255) DEFAULT NULL,
  `status` varchar(1) DEFAULT '0',
  `year` char(4) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `teacher_id` (`teacher_id`) USING HASH,
  KEY `student_id` (`student_id`) USING HASH
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of xtxt_xt_list
-- ----------------------------
BEGIN;
INSERT INTO `xtxt_xt_list` VALUES (20, 18, '1', 11, '1', '2020');
INSERT INTO `xtxt_xt_list` VALUES (24, 19, '1', 12, '1', '2020');
INSERT INTO `xtxt_xt_list` VALUES (28, 4, '19', 15, '1', '2020');
INSERT INTO `xtxt_xt_list` VALUES (31, 5, '19', 16, '1', '2020');
INSERT INTO `xtxt_xt_list` VALUES (32, 6, '1', 13, '0', '2020');
COMMIT;

-- ----------------------------
-- Table structure for xtxt_xt_main
-- ----------------------------
DROP TABLE IF EXISTS `xtxt_xt_main`;
CREATE TABLE `xtxt_xt_main` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `teacher_id` int(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `hard` enum('简单','中等','困难') DEFAULT NULL,
  `student_id` varchar(12) DEFAULT NULL,
  `xt_type` enum('理论研究','应用实践') DEFAULT NULL,
  `describe` text,
  `year` char(4) DEFAULT NULL,
  `status` char(1) DEFAULT '0' COMMENT '状态：0未选择 1 已经确定学生',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of xtxt_xt_main
-- ----------------------------
BEGIN;
INSERT INTO `xtxt_xt_main` VALUES (11, 1, '基于JAVA的袜子后台管理系统', '简单', '18', '理论研究', '啊啊啊', '2020', '1');
INSERT INTO `xtxt_xt_main` VALUES (12, 1, '网上商城', '中等', '19', '理论研究', '人3任2人', '2020', '1');
INSERT INTO `xtxt_xt_main` VALUES (13, 1, '毕业选题系统', '中等', '', '应用实践', '3242342', '2020', '0');
INSERT INTO `xtxt_xt_main` VALUES (15, 19, '毕业选题系统', '简单', '4', '理论研究', '', '2020', '1');
INSERT INTO `xtxt_xt_main` VALUES (16, 19, '2016keti', '中等', '5', '应用实践', '', '2020', '1');
INSERT INTO `xtxt_xt_main` VALUES (17, 7, '网上商城', '中等', '', '理论研究', '21312313', '2020', '0');
INSERT INTO `xtxt_xt_main` VALUES (18, 7, '毕业选题系统', '困难', '', '理论研究', '324234', '2020', '0');
INSERT INTO `xtxt_xt_main` VALUES (19, 7, '毕业选题系统', '中等', '', '应用实践', '234234', '2020', '0');
COMMIT;

-- ----------------------------
-- Procedure structure for create_student_table
-- ----------------------------
DROP PROCEDURE IF EXISTS `create_student_table`;
delimiter ;;
CREATE PROCEDURE `create_student_table`(IN input_name VARCHAR(30))
BEGIN
	set @statements = CONCAT("create table ", input_name, " LIKE xtxt_user_students_base");
	select @statements;
	prepare stmt from @statements;
	execute stmt;
	DEALLOCATE prepare stmt;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for StudentXt
-- ----------------------------
DROP PROCEDURE IF EXISTS `StudentXt`;
delimiter ;;
CREATE PROCEDURE `StudentXt`(IN stuId INT, IN xtId INT, IN stuYear CHAR(4))
BEGIN 
	DECLARE tea_id CHAR(7);
	DECLARE num INT DEFAULT 0;
	DECLARE selectID INT DEFAULT 0;
	DECLARE d_id INT DEFAULT 0;
	
	-- 判断选题是否已经选上
	SELECT id  INTO d_id FROM xtxt_xt_list WHERE student_id = stuId AND `year` = stuYear AND `status` = '1';
	if d_id = 0 THEN
		-- 判断是否超过三条
		SELECT COUNT(*) INTO num FROM xtxt_xt_list WHERE student_id = stuId AND `year` = stuYear;
		-- 判断是否已经选择过
		SELECT id INTO selectID FROM xtxt_xt_list WHERE student_id = stuId AND `year` = stuYear AND xt_id = xtId;
		IF 
			num < 3 AND selectId = 0
		THEN
			SELECT teacher_id INTO tea_id FROM xtxt_xt_main WHERE id = xtId;
			INSERT INTO xtxt_xt_list (student_id, teacher_id, xt_id,`year`, `status`) VALUES(stuId, tea_id, xtId, stuYear, "0");
			SELECT 10001 codes, num + 1 as num, "ok" msg;
		ELSE 
			SELECT 10002 codes, num, "重复选题" msg;
		END IF;
	ELSE
		SELECT 10002 codes, num, "你的选题已经确定，不能再次选题" msg;
	END IF;
	
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for stu_delete_xt
-- ----------------------------
DROP PROCEDURE IF EXISTS `stu_delete_xt`;
delimiter ;;
CREATE PROCEDURE `stu_delete_xt`(IN in_stuId INT,
	IN in_Id INT,
	IN in_year CHAR ( 4 ))
BEGIN
	DECLARE
		d_id INT DEFAULT 0;
	SELECT
		id INTO d_id 
	FROM
		xtxt_xt_list 
	WHERE
		student_id = in_stuId 
		AND id = in_Id 
		AND `year` = in_year 
		AND STATUS = '1';
	IF
		d_id = 0 
		THEN
		DELETE 
			FROM
				xtxt_xt_list 
			WHERE
				student_id = in_stuId 
				AND id = in_Id 
				AND `year` = in_year
				AND `status` = '0';
				SELECT 10001 codes, "ok" msg;
	ELSE
		SELECT 10002 codes, "对不起，选题已确定，无法删除!" msg;
END IF; END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for stu_get_self_xt
-- ----------------------------
DROP PROCEDURE IF EXISTS `stu_get_self_xt`;
delimiter ;;
CREATE PROCEDURE `stu_get_self_xt`(IN stuId INT,
	IN stuYear CHAR ( 4 ))
BEGIN
	DECLARE d_id INT DEFAULT 0;
	SELECT id INTO d_id FROM xtxt_xt_list WHERE student_id = stuId AND `status` = '1';
	IF d_id > 0 
	THEN 
			SELECT
				list.id,
				main.title,
				main.hard,
				main.xt_type,
				main.`describe`,
				tea.teacher_name,
				tea.phone_number,
				tea.another_contact,
				list.`status` 
			FROM
				xtxt_xt_list list,
				xtxt_xt_main main,
				xtxt_user_teacher tea 
			WHERE
				list.student_id = stuId 
				AND list.YEAR = stuYear 
				AND list.xt_id = main.id 
			AND list.teacher_id = tea.id ;
	ELSE
		SELECT
			list.id,
			main.title,
			main.hard,
			main.xt_type,
			main.`describe`,
			tea.teacher_name,
			list.`status` 
		FROM
			xtxt_xt_list list,
			xtxt_xt_main main,
			xtxt_user_teacher tea 
		WHERE
			list.student_id = stuId 
			AND list.YEAR = stuYear 
			AND list.xt_id = main.id 
		AND list.teacher_id = tea.id ;
	END IF;
	END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for STU_GET_XT
-- ----------------------------
DROP PROCEDURE IF EXISTS `STU_GET_XT`;
delimiter ;;
CREATE PROCEDURE `STU_GET_XT`(IN select_year CHAR ( 4 ))
BEGIN
	SELECT
		xt.id,xt.id as `key`, xt.title,xt.hard,xt.xt_type,xt.`describe`,xt.`status`,tea.teacher_name 
	FROM
		xtxt_xt_main AS xt, xtxt_user_teacher AS tea 
	WHERE
		xt.teacher_id = tea.id 
		AND xt.`status` = '0' 
		AND xt.YEAR = select_year;

END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for TeaM_GetSelectStu
-- ----------------------------
DROP PROCEDURE IF EXISTS `TeaM_GetSelectStu`;
delimiter ;;
CREATE PROCEDURE `TeaM_GetSelectStu`(in in_stuTable varchar(32), in in_id int)
BEGIN
	set @statements = CONCAT("select * FROM ", in_stuTable);
		select @statements;
		prepare stmt from @statements;
		execute stmt;
		DEALLOCATE PREPARE stmt;
	END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for tea_delete_xt
-- ----------------------------
DROP PROCEDURE IF EXISTS `tea_delete_xt`;
delimiter ;;
CREATE PROCEDURE `tea_delete_xt`(in in_xtId INT, in in_teaId INT)
begin
	DECLARE d_list_id INT DEFAULT 0;
	SELECT id INTO d_list_id FROM xtxt_xt_list list WHERE list.xt_id = in_xtId limit 1;
	IF d_list_id > 0 
	THEN
		SELECT 10008 codes, "已有学生选题，无法删除" msg;
	ELSE
		DELETE FROM xtxt_xt_main WHERE id = in_xtId AND teacher_id = in_teaId;
		SELECT 10001 codes, "ok" msg;
	END IF;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for tea_select_stu
-- ----------------------------
DROP PROCEDURE IF EXISTS `tea_select_stu`;
delimiter ;;
CREATE PROCEDURE `tea_select_stu`(IN in_listId INT, IN in_xtId INT)
BEGIN
	DECLARE d_stuId INT DEFAULT 0;
	DECLARE d_year CHAR(4) DEFAULT "";
	SELECT student_id, `year` INTO d_stuId, d_year FROM xtxt_xt_list WHERE id = in_listId;
	UPDATE xtxt_xt_list SET `status` = '1' WHERE id = in_listId;
	UPDATE xtxt_xt_main SET student_id = d_stuId, `status` = '1' WHERE id = in_xtId;
	DELETE FROM xtxt_xt_list WHERE xt_id = in_xtId AND `status` != '1';
	DELETE FROM xtxt_xt_list WHERE student_id = d_stuId AND `year` = d_year AND `status` = '0';
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for Year_Is_Exit
-- ----------------------------
DROP PROCEDURE IF EXISTS `Year_Is_Exit`;
delimiter ;;
CREATE PROCEDURE `Year_Is_Exit`(in in_year CHAR(4))
BEGIN
 DECLARE d_flag INT DEFAULT 0;
 SELECT id INTO d_flag FROM xtxt_user_students_table WHERE `year` = in_year;
 IF 
	d_flag > 0 
 THEN
	SELECT TRUE `status`;
 ELSE
	SELECT FALSE `status`;
 END IF;
 END
;;
delimiter ;

SET FOREIGN_KEY_CHECKS = 1;
