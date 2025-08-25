-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Aug 25, 2025 at 02:46 PM
-- Server version: 8.0.43
-- PHP Version: 8.3.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sms_2_0`
--

-- --------------------------------------------------------

--
-- Table structure for table `about_contents`
--

CREATE TABLE `about_contents` (
  `id` int UNSIGNED NOT NULL,
  `why_content` varchar(500) COLLATE utf8mb3_unicode_ci NOT NULL,
  `key_point_1_title` varchar(100) COLLATE utf8mb3_unicode_ci NOT NULL,
  `key_point_1_content` longtext COLLATE utf8mb3_unicode_ci NOT NULL,
  `key_point_2_title` varchar(100) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `key_point_2_content` longtext COLLATE utf8mb3_unicode_ci,
  `key_point_3_title` varchar(100) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `key_point_3_content` longtext COLLATE utf8mb3_unicode_ci,
  `key_point_4_title` varchar(100) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `key_point_4_content` longtext COLLATE utf8mb3_unicode_ci,
  `key_point_5_title` varchar(100) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `key_point_5_content` longtext COLLATE utf8mb3_unicode_ci,
  `about_us` varchar(500) COLLATE utf8mb3_unicode_ci NOT NULL,
  `who_we_are` varchar(1000) COLLATE utf8mb3_unicode_ci NOT NULL,
  `intro_video_embed_code` text COLLATE utf8mb3_unicode_ci NOT NULL,
  `video_site_link` varchar(500) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `created_by` int UNSIGNED DEFAULT NULL,
  `updated_by` int UNSIGNED DEFAULT NULL,
  `deleted_by` int UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Dumping data for table `about_contents`
--

INSERT INTO `about_contents` (`id`, `why_content`, `key_point_1_title`, `key_point_1_content`, `key_point_2_title`, `key_point_2_content`, `key_point_3_title`, `key_point_3_content`, `key_point_4_title`, `key_point_4_content`, `key_point_5_title`, `key_point_5_content`, `about_us`, `who_we_are`, `intro_video_embed_code`, `video_site_link`, `created_at`, `updated_at`, `created_by`, `updated_by`, `deleted_by`) VALUES
(1, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy.', 'Key point 1', 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock', 'Key point 2', 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock', NULL, NULL, NULL, NULL, NULL, NULL, 'it is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.', 'it is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution', '<iframe src=\"https://www.youtube.com/embed/6sa1G_9jCb0\" frameborder=\"0\"  allowfullscreen></iframe>', 'https://www.youtube.com', '2025-02-01 06:12:12', '2025-02-01 06:12:12', 0, 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `about_sliders`
--

CREATE TABLE `about_sliders` (
  `id` int UNSIGNED NOT NULL,
  `image` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `order` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `created_by` int UNSIGNED DEFAULT NULL,
  `updated_by` int UNSIGNED DEFAULT NULL,
  `deleted_by` int UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Dumping data for table `about_sliders`
--

INSERT INTO `about_sliders` (`id`, `image`, `order`, `created_at`, `updated_at`, `created_by`, `updated_by`, `deleted_by`) VALUES
(1, '1.jpg', 1, '2025-02-01 06:12:12', '2025-02-01 06:12:12', 0, 0, NULL),
(2, '2.jpg', 2, '2025-02-01 06:12:12', '2025-02-01 06:12:12', 0, 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `academic_years`
--

CREATE TABLE `academic_years` (
  `id` int UNSIGNED NOT NULL,
  `school_id` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `is_open_for_admission` tinyint(1) NOT NULL DEFAULT '0',
  `status` enum('0','1') COLLATE utf8mb3_unicode_ci NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_by` int UNSIGNED DEFAULT NULL,
  `updated_by` int UNSIGNED DEFAULT NULL,
  `deleted_by` int UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Dumping data for table `academic_years`
--

INSERT INTO `academic_years` (`id`, `school_id`, `start_date`, `end_date`, `is_open_for_admission`, `status`, `created_at`, `updated_at`, `deleted_at`, `created_by`, `updated_by`, `deleted_by`) VALUES
(1, 'SVS001', '2025-01-01', '2026-01-01', 0, '1', '2025-02-01 06:12:18', '2025-02-01 06:12:18', NULL, 0, 0, NULL),
(2, 'GWH002', '2025-01-01', '2026-01-01', 0, '1', '2025-02-01 06:12:18', '2025-02-01 06:12:18', NULL, 0, 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `app_metas`
--

CREATE TABLE `app_metas` (
  `id` int UNSIGNED NOT NULL,
  `meta_key` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `meta_value` longtext COLLATE utf8mb3_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_by` int UNSIGNED DEFAULT NULL,
  `updated_by` int UNSIGNED DEFAULT NULL,
  `deleted_by` int UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Dumping data for table `app_metas`
--

INSERT INTO `app_metas` (`id`, `meta_key`, `meta_value`, `created_at`, `updated_at`, `deleted_at`, `created_by`, `updated_by`, `deleted_by`) VALUES
(2, 'academic_year', '1', '2025-02-01 06:12:18', '2025-02-01 06:12:18', NULL, 1, 0, NULL),
(3, 'frontend_website', '1', '2025-02-01 06:12:18', NULL, NULL, 1, NULL, NULL),
(4, 'language', 'en', '2025-02-01 06:12:18', NULL, NULL, 1, NULL, NULL),
(5, 'disable_language', '1', '2025-02-01 06:12:18', NULL, NULL, 1, NULL, NULL),
(6, 'institute_type', '1', '2025-02-01 06:12:18', NULL, NULL, 1, NULL, NULL),
(7, 'shift_data', '{\"Morning\":{\"start\":\"08:00 am\",\"end\":\"01:00 pm\"},\"Day\":{\"start\":\"02:00 pm\",\"end\":\"07:00 pm\"},\"Evening\":{\"start\":\"12:00 am\",\"end\":\"12:00 am\"}}', '2025-02-01 06:12:18', NULL, NULL, 1, NULL, NULL),
(8, 'weekends', '[5]', '2025-02-01 06:12:18', NULL, NULL, 1, NULL, NULL),
(9, 'week_start_day', '6', '2025-02-01 06:12:18', NULL, NULL, 1, NULL, NULL),
(10, 'week_end_day', '5', '2025-02-01 06:12:18', NULL, NULL, 1, NULL, NULL),
(11, 'total_casual_leave', '14', '2025-02-01 06:12:18', NULL, NULL, 1, NULL, NULL),
(12, 'total_sick_leave', '10', '2025-02-01 06:12:18', NULL, NULL, 1, NULL, NULL),
(13, 'total_maternity_leave', '90', '2025-02-01 06:12:18', NULL, NULL, 1, NULL, NULL),
(14, 'total_special_leave', '5', '2025-02-01 06:12:18', NULL, NULL, 1, NULL, NULL),
(15, 'board_name', 'Dhaka', '2025-02-01 06:12:18', NULL, NULL, 1, NULL, NULL),
(16, 'result_default_grade_id', '1', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(17, 'institute_settings', '{\"logo\":\"transparent_image.png\",\"school_name\":\"Knowledge Pitch\",\"address\":\"Opposite to VVHS school, Paloothara junction, Mavelikara, \\r\\nKerala-690505 \"}', '2025-08-04 17:41:16', '2025-08-04 17:41:16', NULL, 1, 1, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `book`
--

CREATE TABLE `book` (
  `InstituteId` int DEFAULT NULL,
  `BookId` int NOT NULL,
  `BookName` varchar(256) NOT NULL,
  `BookCode` varchar(10) NOT NULL,
  `BookCategoryId` int NOT NULL,
  `BookAuthor` varchar(256) NOT NULL,
  `BookVolume` varchar(10) DEFAULT NULL,
  `BookEdition` varchar(10) DEFAULT NULL,
  `BookStatus` tinyint(1) NOT NULL,
  `BookDes` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `book`
--

INSERT INTO `book` (`InstituteId`, `BookId`, `BookName`, `BookCode`, `BookCategoryId`, `BookAuthor`, `BookVolume`, `BookEdition`, `BookStatus`, `BookDes`) VALUES
(1, 1, 'Ilakiyam', 'b1', 1, 'kalki', '9', 'first', 1, NULL),
(1, 2, 'Tamil Novel', 'b2', 1, 'sujatha', '8', 'second', 1, NULL),
(1, 3, 'Tamil Essays', 'b3', 1, 'jeyakanthan', '7', 'third', 1, NULL),
(1, 4, 'Grammar', 'b4', 2, 'wren and martin', '9', 'first', 1, NULL),
(1, 5, 'Oliver Twist', 'b5', 2, 'Christopher', '7', 'fifth', 1, NULL),
(1, 6, 'Shakespear\'s plays', 'b6', 2, 'Johns', '6', 'fourth', 1, NULL),
(1, 7, 'Letter Writing', 'b7', 2, 'Martina', '5', 'first', 1, NULL),
(2, 8, 'Algebra', 'b1', 7, 'Chelly', '8', 'second', 1, NULL),
(2, 9, 'Geometry', 'b2', 7, 'Siberschatz', '5', 'third', 1, NULL),
(2, 10, 'Statistics', 'b3', 7, 'balagurusamy', '3', 'fifth', 1, NULL),
(2, 11, 'Java', 'b4', 8, 'Kannan', '6', 'fourth', 1, NULL),
(2, 12, 'PHP', 'b5', 8, 'jeyanth', '2', 'first', 1, NULL),
(2, 13, 'DBMS', 'b6', 8, 'Lakshman', '3', 'second', 1, NULL),
(2, 14, 'Operating System', 'b7', 8, 'Harish', '2', 'third', 1, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `bookcategory`
--

CREATE TABLE `bookcategory` (
  `InstituteId` int DEFAULT NULL,
  `BookCategoryId` int NOT NULL,
  `BookCategory` varchar(256) NOT NULL,
  `BookCategoryDes` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `bookcategory`
--

INSERT INTO `bookcategory` (`InstituteId`, `BookCategoryId`, `BookCategory`, `BookCategoryDes`) VALUES
(1, 1, 'Tamil', NULL),
(1, 2, 'English', NULL),
(1, 3, 'Maths', NULL),
(1, 4, 'Science', NULL),
(1, 5, 'Social', NULL),
(1, 6, 'ComputerScience', NULL),
(2, 7, 'Maths', NULL),
(2, 8, 'ComputerScience', NULL),
(2, 9, 'Politics', NULL),
(2, 10, 'Economics', NULL),
(2, 11, 'Researches', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `bookcode`
--

CREATE TABLE `bookcode` (
  `InstituteId` int DEFAULT NULL,
  `BookCodeId` int NOT NULL,
  `BookCode` varchar(10) NOT NULL,
  `BookCategoryId` int NOT NULL,
  `BookCodeDes` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `bookcode`
--

INSERT INTO `bookcode` (`InstituteId`, `BookCodeId`, `BookCode`, `BookCategoryId`, `BookCodeDes`) VALUES
(1, 1, 'b1', 1, 'dgfgdfg'),
(1, 2, 'b2', 1, 'yyyy'),
(1, 3, 'b3', 1, 't4t4'),
(1, 4, 'b4', 2, NULL),
(1, 5, 'b5', 2, NULL),
(1, 6, 'b6', 2, NULL),
(1, 7, 'b7', 2, NULL),
(2, 8, 'b1', 1, NULL),
(2, 9, 'b2', 1, NULL),
(2, 10, 'b3', 1, NULL),
(2, 11, 'b4', 2, NULL),
(2, 12, 'b5', 2, NULL),
(2, 13, 'b6', 2, NULL),
(2, 14, 'b7', 2, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `buses`
--

CREATE TABLE `buses` (
  `s_no` int NOT NULL,
  `bus_id` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `bus_title` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `bus_number` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `request` varchar(11) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `buses`
--

INSERT INTO `buses` (`s_no`, `bus_id`, `bus_title`, `bus_number`, `request`) VALUES
(10, '1718791847', 'Bus 1', 'XXXXXX', ''),
(11, '1718791949', 'Bus 2', '999999', ''),
(12, '1718791984', 'Another bus', 'OOOOOOOO', '');

-- --------------------------------------------------------

--
-- Table structure for table `bus_root`
--

CREATE TABLE `bus_root` (
  `s_no` int NOT NULL,
  `bus_id` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `location` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `arrival_time` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `serial` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `bus_root`
--

INSERT INTO `bus_root` (`s_no`, `bus_id`, `location`, `arrival_time`, `serial`) VALUES
(7, '1718791847', 'Stop 1', '06:50 AM', 1),
(8, '1718791847', 'Stop 2', '07:00 AM', 2),
(9, '1718791847', 'Stop 3', '07:10 AM', 3),
(10, '1718791847', 'SCHOOL', '10:00 AM', 4),
(13, '1718791949', 'Stop z', '06:35 AM', 1),
(14, '1718791949', 'SCHOOL', '10:00 AM', 2),
(15, '1718791984', 'Stop x', '06:45 AM', 1),
(16, '1718791984', 'SCHOOL', '10:00 AM', 2);

-- --------------------------------------------------------

--
-- Table structure for table `bus_staff`
--

CREATE TABLE `bus_staff` (
  `s_no` int NOT NULL,
  `id` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `bus_id` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `contact` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `bus_staff`
--

INSERT INTO `bus_staff` (`s_no`, `id`, `bus_id`, `name`, `contact`, `role`) VALUES
(1, 'B1718791847', '1718791847', 'driver ', '8080808080', 'driver'),
(2, 'B1718791847', '1718791847', 'helper ', '0000000000', 'helper'),
(3, 'B1718791949', '1718791949', 'driver 2', '7897898988', 'driver'),
(4, 'B1718791949', '1718791949', 'helper', '7897898988', 'helper'),
(5, 'B1718791984', '1718791984', 'another driver', '7897897898', 'driver'),
(6, 'B1718791984', '1718791984', 'another helper', '7894568796', 'helper');

-- --------------------------------------------------------

--
-- Table structure for table `castcategory`
--

CREATE TABLE `castcategory` (
  `InstituteId` int DEFAULT NULL,
  `CastCategoryId` int NOT NULL,
  `CastCategory` varchar(256) NOT NULL,
  `CastCategoryDes` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `castcategory`
--

INSERT INTO `castcategory` (`InstituteId`, `CastCategoryId`, `CastCategory`, `CastCategoryDes`) VALUES
(1, 1, 'OC', 'eerreeeeeeeee'),
(1, 2, 'BC-A', 'fgfgfg'),
(1, 3, 'BC-B', NULL),
(1, 4, 'BC-C', NULL),
(1, 5, 'BC-D', NULL),
(1, 6, 'ST', NULL),
(2, 7, 'BC', NULL),
(2, 8, 'SC', NULL),
(2, 9, 'OC', NULL),
(2, 10, 'FC', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `class_sequences`
--

CREATE TABLE `class_sequences` (
  `name` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `current_value` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `id` int UNSIGNED NOT NULL,
  `user_id` int UNSIGNED DEFAULT NULL,
  `school_id` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `role_id` int UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `qualification` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `experience` varchar(250) COLLATE utf8mb3_unicode_ci NOT NULL,
  `dob` varchar(10) COLLATE utf8mb3_unicode_ci NOT NULL,
  `gender` enum('1','2') COLLATE utf8mb3_unicode_ci NOT NULL DEFAULT '1',
  `religion` varchar(250) COLLATE utf8mb3_unicode_ci NOT NULL,
  `cast` varchar(250) COLLATE utf8mb3_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `phone_no` varchar(15) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `address` varchar(500) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `joining_date` date NOT NULL,
  `designation` varchar(250) COLLATE utf8mb3_unicode_ci NOT NULL,
  `marital_status` varchar(250) COLLATE utf8mb3_unicode_ci NOT NULL,
  `husband_WifeName` varchar(250) COLLATE utf8mb3_unicode_ci NOT NULL,
  `father_name` varchar(250) COLLATE utf8mb3_unicode_ci NOT NULL,
  `mother_name` varchar(250) COLLATE utf8mb3_unicode_ci NOT NULL,
  `father_phone` varchar(250) COLLATE utf8mb3_unicode_ci NOT NULL,
  `mother_phone` varchar(250) COLLATE utf8mb3_unicode_ci NOT NULL,
  `husband_WifePhone` varchar(250) COLLATE utf8mb3_unicode_ci NOT NULL,
  `specialized_in` varchar(250) COLLATE utf8mb3_unicode_ci NOT NULL,
  `nationality` varchar(250) COLLATE utf8mb3_unicode_ci NOT NULL,
  `present_address` varchar(250) COLLATE utf8mb3_unicode_ci NOT NULL,
  `resume` varchar(250) COLLATE utf8mb3_unicode_ci NOT NULL,
  `leave_date` date DEFAULT NULL,
  `photo` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `id_proof` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `shift` enum('1','2') COLLATE utf8mb3_unicode_ci NOT NULL DEFAULT '1',
  `duty_start` time DEFAULT NULL,
  `duty_end` time DEFAULT NULL,
  `status` enum('0','1') COLLATE utf8mb3_unicode_ci NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_by` int UNSIGNED DEFAULT NULL,
  `updated_by` int UNSIGNED DEFAULT NULL,
  `deleted_by` int UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`id`, `user_id`, `school_id`, `role_id`, `name`, `qualification`, `experience`, `dob`, `gender`, `religion`, `cast`, `email`, `phone_no`, `address`, `joining_date`, `designation`, `marital_status`, `husband_WifeName`, `father_name`, `mother_name`, `father_phone`, `mother_phone`, `husband_WifePhone`, `specialized_in`, `nationality`, `present_address`, `resume`, `leave_date`, `photo`, `id_proof`, `shift`, `duty_start`, `duty_end`, `status`, `created_at`, `updated_at`, `deleted_at`, `created_by`, `updated_by`, `deleted_by`) VALUES
(1, 1, 'SVS001', 2, 'Mrs. Alessandra Schroeder PhD', 'reprehenderit', '', '27/08/2020', '2', '5', '', 'ursula29@example.org', '+9086369482755', '8306 Marks Island\nKesslershire, UT 11233', '2024-02-05', '', '', '', '', '', '', '', '', '', '', '', '', NULL, NULL, NULL, '2', '09:00:00', '17:00:00', '1', '2025-02-01 06:12:18', '2025-02-01 06:12:18', NULL, 1, 0, NULL),
(2, 7, 'SVS001', 2, 'Malinda Toy MD', 'ducimus', '', '15/06/2023', '2', '4', '', 'ortiz.alek@example.org', '+9611641507624', '627 Gertrude Junction Suite 435\nKristatown, VT 09347', '2021-07-19', '', '', '', '', '', '', '', '', '', '', '', '', NULL, NULL, NULL, '1', '09:00:00', '17:00:00', '1', '2025-02-01 06:12:18', '2025-02-01 06:12:18', NULL, 1, 0, NULL),
(3, 8, 'SVS001', 2, 'Miss Molly Bogisich', 'provident', '', '04/12/2023', '1', '4', '', 'sallie.wilkinson@example.com', '+5445139722051', '234 Sheila Roads Apt. 873\nNew Bertstad, NH 78564-6041', '2020-02-25', '', '', '', '', '', '', '', '', '', '', '', '', NULL, NULL, NULL, '2', '09:00:00', '17:00:00', '1', '2025-02-01 06:12:18', '2025-02-01 06:12:18', NULL, 1, 0, NULL),
(4, 9, 'SVS001', 2, 'Dr. Reva Batz II', 'rem', '', '15/09/2015', '2', '4', '', 'haven18@example.net', '+3701073405426', '46027 Wuckert Pike\nPort Gabriella, IL 15419-9144', '2022-10-08', '', '', '', '', '', '', '', '', '', '', '', '', NULL, NULL, NULL, '1', '09:00:00', '17:00:00', '1', '2025-02-01 06:12:18', '2025-02-01 06:12:18', NULL, 1, 0, NULL),
(5, 10, 'SVS001', 2, 'Watson Hettinger', 'odio', '', '07/07/2008', '2', '2', '', 'kuhlman.jaquan@example.org', '+8958607907786', '2209 Reynolds Corners Suite 606\nEast Charleneview, FL 27826', '2020-10-26', '', '', '', '', '', '', '', '', '', '', '', '', NULL, NULL, NULL, '1', '09:00:00', '17:00:00', '1', '2025-02-01 06:12:18', '2025-02-01 06:12:18', NULL, 1, 0, NULL),
(6, 11, 'SVS001', 2, 'Mrs. Savannah Johnson V', 'aut', '', '14/03/2017', '1', '1', '', 'nfeest@example.org', '+6694535559001', '87129 Markus Circles\nEstelborough, DC 52851-7105', '2021-03-09', '', '', '', '', '', '', '', '', '', '', '', '', NULL, NULL, NULL, '1', '09:00:00', '17:00:00', '1', '2025-02-01 06:12:18', '2025-02-01 06:12:18', NULL, 1, 0, NULL),
(7, 12, 'SVS001', 5, 'Mr. Kacey Jacobi', 'voluptas', '', '28/01/2006', '1', '2', '', 'ybogisich@example.net', '+9971951896383', '53206 Hubert Court Suite 798\nDoviehaven, PA 10391', '2023-03-27', '', '', '', '', '', '', '', '', '', '', '', '', NULL, NULL, NULL, '1', '09:00:00', '17:00:00', '1', '2025-02-01 06:12:18', '2025-02-01 06:12:18', NULL, 1, 0, NULL),
(8, 13, 'SVS001', 6, 'Albin Vandervort II', 'deleniti', '', '07/04/2020', '2', '1', '', 'sadye.muller@example.org', '+1694142964445', '79779 Feest Gardens Suite 057\nSouth Ronnyfort, WA 06713', '2023-07-20', '', '', '', '', '', '', '', '', '', '', '', '', NULL, NULL, NULL, '2', '09:00:00', '17:00:00', '1', '2025-02-01 06:12:18', '2025-02-01 06:12:18', NULL, 1, 0, NULL),
(9, 14, 'SVS001', 7, 'Theodore Spinka', 'laudantium', '', '28/07/2023', '2', '4', '', 'melvina43@example.net', '+7721959920329', '88759 Alexanne Branch Suite 890\nDachview, DE 09875-7184', '2023-05-17', '', '', '', '', '', '', '', '', '', '', '', '', NULL, NULL, NULL, '1', '09:00:00', '17:00:00', '1', '2025-02-01 06:12:18', '2025-02-01 06:12:18', NULL, 1, 0, NULL),
(21, 84, 'SVS001', 5, 'godwin cthomas', 'sas', 'zcsa', '2025-08-01', '1', 'sikhism', 'sbc', 'godwincthomas@gmail.com', '9741009810', 'Godwin Villa', '2025-08-16', 'Accountant', 'single', 'gfgvjb', 'godwin', 'godwin', '9741009810', '9741009810', '12233', 'dsad', 'Indian', 'Cheeyod', '/uploads/employees/1754618923226_add_staff.png', NULL, '/uploads/employees/1754618923225_add_staff.png', '/uploads/employees/1754618923225_bioengineering.png', '1', NULL, NULL, '1', '2025-08-08 02:08:43', '2025-08-08 02:08:43', NULL, 1, 1, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `employees_sequences`
--

CREATE TABLE `employees_sequences` (
  `name` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `current_value` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employees_sequences`
--

INSERT INTO `employees_sequences` (`name`, `current_value`) VALUES
('user_id', 84);

-- --------------------------------------------------------

--
-- Table structure for table `employee_attendances`
--

CREATE TABLE `employee_attendances` (
  `id` int UNSIGNED NOT NULL,
  `employee_id` int UNSIGNED NOT NULL,
  `attendance_date` date NOT NULL,
  `in_time` datetime NOT NULL,
  `out_time` datetime NOT NULL,
  `working_hour` time NOT NULL,
  `status` varchar(20) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `present` enum('0','1') COLLATE utf8mb3_unicode_ci NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_by` int UNSIGNED DEFAULT NULL,
  `updated_by` int UNSIGNED DEFAULT NULL,
  `deleted_by` int UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Dumping data for table `employee_attendances`
--

INSERT INTO `employee_attendances` (`id`, `employee_id`, `attendance_date`, `in_time`, `out_time`, `working_hour`, `status`, `present`, `created_at`, `updated_at`, `deleted_at`, `created_by`, `updated_by`, `deleted_by`) VALUES
(1, 1, '2025-06-03', '2025-06-03 08:00:00', '2025-01-18 13:00:00', '05:00:00', '', '1', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(2, 2, '2025-06-04', '2025-06-04 00:00:00', '2025-01-18 00:00:00', '00:00:00', '', '0', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(3, 3, '2025-01-18', '2025-01-18 00:00:00', '2025-01-18 00:00:00', '00:00:00', '', '0', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(4, 4, '2025-01-18', '2025-01-18 08:00:00', '2025-01-18 13:00:00', '05:00:00', '', '1', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(5, 5, '2025-01-18', '2025-01-18 08:00:00', '2025-01-18 13:00:00', '05:00:00', '', '1', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(6, 6, '2025-06-08', '2025-01-18 00:00:00', '2025-01-18 00:00:00', '00:00:00', '', '0', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(7, 7, '2025-01-18', '2025-01-18 00:00:00', '2025-01-18 00:00:00', '00:00:00', '', '0', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(8, 8, '2025-01-18', '2025-01-18 08:00:00', '2025-01-18 13:00:00', '05:00:00', '', '1', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(9, 9, '2025-01-18', '2025-01-18 00:00:00', '2025-01-18 00:00:00', '00:00:00', '', '0', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(10, 1, '2025-01-19', '2025-01-19 08:00:00', '2025-01-19 13:00:00', '05:00:00', '', '1', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(11, 2, '2025-01-19', '2025-01-19 00:00:00', '2025-01-19 00:00:00', '00:00:00', '', '0', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(12, 3, '2025-01-19', '2025-01-19 00:00:00', '2025-01-19 00:00:00', '00:00:00', '', '0', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(13, 4, '2025-01-19', '2025-01-19 00:00:00', '2025-01-19 00:00:00', '00:00:00', '', '0', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(14, 5, '2025-01-19', '2025-01-19 08:00:00', '2025-01-19 13:00:00', '05:00:00', '', '1', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(15, 6, '2025-01-19', '2025-01-19 00:00:00', '2025-01-19 00:00:00', '00:00:00', '', '0', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(16, 7, '2025-01-19', '2025-01-19 08:00:00', '2025-01-19 13:00:00', '05:00:00', '', '1', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(17, 8, '2025-01-19', '2025-01-19 00:00:00', '2025-01-19 00:00:00', '00:00:00', '', '0', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(18, 9, '2025-01-19', '2025-01-19 00:00:00', '2025-01-19 00:00:00', '00:00:00', '', '0', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(19, 1, '2025-01-20', '2025-01-20 08:00:00', '2025-01-20 13:00:00', '05:00:00', '', '1', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(20, 2, '2025-01-20', '2025-01-20 08:00:00', '2025-01-20 13:00:00', '05:00:00', '', '1', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(21, 3, '2025-01-20', '2025-01-20 08:00:00', '2025-01-20 13:00:00', '05:00:00', '', '1', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(22, 4, '2025-01-20', '2025-01-20 08:00:00', '2025-01-20 13:00:00', '05:00:00', '', '1', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(23, 5, '2025-01-20', '2025-01-20 08:00:00', '2025-01-20 13:00:00', '05:00:00', '', '1', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(24, 6, '2025-01-20', '2025-01-20 00:00:00', '2025-01-20 00:00:00', '00:00:00', '', '0', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(25, 7, '2025-01-20', '2025-01-20 08:00:00', '2025-01-20 13:00:00', '05:00:00', '', '1', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(26, 8, '2025-01-20', '2025-01-20 00:00:00', '2025-01-20 00:00:00', '00:00:00', '', '0', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(27, 9, '2025-01-20', '2025-01-20 08:00:00', '2025-01-20 13:00:00', '05:00:00', '', '1', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(28, 1, '2025-01-21', '2025-01-21 00:00:00', '2025-01-21 00:00:00', '00:00:00', '', '0', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(29, 2, '2025-01-21', '2025-01-21 00:00:00', '2025-01-21 00:00:00', '00:00:00', '', '0', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(30, 3, '2025-01-21', '2025-01-21 08:00:00', '2025-01-21 13:00:00', '05:00:00', '', '1', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(31, 4, '2025-01-21', '2025-01-21 00:00:00', '2025-01-21 00:00:00', '00:00:00', '', '0', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(32, 5, '2025-01-21', '2025-01-21 00:00:00', '2025-01-21 00:00:00', '00:00:00', '', '0', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(33, 6, '2025-01-21', '2025-01-21 08:00:00', '2025-01-21 13:00:00', '05:00:00', '', '1', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(34, 7, '2025-01-21', '2025-01-21 08:00:00', '2025-01-21 13:00:00', '05:00:00', '', '1', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(35, 8, '2025-01-21', '2025-01-21 00:00:00', '2025-01-21 00:00:00', '00:00:00', '', '0', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(36, 9, '2025-01-21', '2025-01-21 08:00:00', '2025-01-21 13:00:00', '05:00:00', '', '1', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(37, 1, '2025-01-22', '2025-01-22 08:00:00', '2025-01-22 13:00:00', '05:00:00', '', '1', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(38, 2, '2025-01-22', '2025-01-22 00:00:00', '2025-01-22 00:00:00', '00:00:00', '', '0', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(39, 3, '2025-01-22', '2025-01-22 00:00:00', '2025-01-22 00:00:00', '00:00:00', '', '0', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(40, 4, '2025-01-22', '2025-01-22 00:00:00', '2025-01-22 00:00:00', '00:00:00', '', '0', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(41, 5, '2025-01-22', '2025-01-22 08:00:00', '2025-01-22 13:00:00', '05:00:00', '', '1', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(42, 6, '2025-01-22', '2025-01-22 08:00:00', '2025-01-22 13:00:00', '05:00:00', '', '1', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(43, 7, '2025-01-22', '2025-01-22 00:00:00', '2025-01-22 00:00:00', '00:00:00', '', '0', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(44, 8, '2025-01-22', '2025-01-22 00:00:00', '2025-01-22 00:00:00', '00:00:00', '', '0', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(45, 9, '2025-01-22', '2025-01-22 00:00:00', '2025-01-22 00:00:00', '00:00:00', '', '0', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(46, 1, '2025-01-23', '2025-01-23 00:00:00', '2025-01-23 00:00:00', '00:00:00', '', '0', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(47, 2, '2025-01-23', '2025-01-23 08:00:00', '2025-01-23 13:00:00', '05:00:00', '', '1', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(48, 3, '2025-01-23', '2025-01-23 00:00:00', '2025-01-23 00:00:00', '00:00:00', '', '0', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(49, 4, '2025-01-23', '2025-01-23 00:00:00', '2025-01-23 00:00:00', '00:00:00', '', '0', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(50, 5, '2025-01-23', '2025-01-23 00:00:00', '2025-01-23 00:00:00', '00:00:00', '', '0', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(51, 6, '2025-01-23', '2025-01-23 08:00:00', '2025-01-23 13:00:00', '05:00:00', '', '1', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(52, 7, '2025-01-23', '2025-01-23 08:00:00', '2025-01-23 13:00:00', '05:00:00', '', '1', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(53, 8, '2025-01-23', '2025-01-23 08:00:00', '2025-01-23 13:00:00', '05:00:00', '', '1', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(54, 9, '2025-01-23', '2025-01-23 08:00:00', '2025-01-23 13:00:00', '05:00:00', '', '1', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(55, 1, '2025-01-25', '2025-01-25 08:00:00', '2025-01-25 13:00:00', '05:00:00', '', '1', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(56, 2, '2025-01-25', '2025-01-25 00:00:00', '2025-01-25 00:00:00', '00:00:00', '', '0', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(57, 3, '2025-01-25', '2025-01-25 00:00:00', '2025-01-25 00:00:00', '00:00:00', '', '0', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(58, 4, '2025-01-25', '2025-01-25 00:00:00', '2025-01-25 00:00:00', '00:00:00', '', '0', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(59, 5, '2025-01-25', '2025-01-25 08:00:00', '2025-01-25 13:00:00', '05:00:00', '', '1', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(60, 6, '2025-01-25', '2025-01-25 00:00:00', '2025-01-25 00:00:00', '00:00:00', '', '0', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(61, 7, '2025-01-25', '2025-01-25 00:00:00', '2025-01-25 00:00:00', '00:00:00', '', '0', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(62, 8, '2025-01-25', '2025-01-25 08:00:00', '2025-01-25 13:00:00', '05:00:00', '', '1', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(63, 9, '2025-01-25', '2025-01-25 00:00:00', '2025-01-25 00:00:00', '00:00:00', '', '0', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(64, 1, '2025-01-26', '2025-01-26 00:00:00', '2025-01-26 00:00:00', '00:00:00', '', '0', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(65, 2, '2025-01-26', '2025-01-26 08:00:00', '2025-01-26 13:00:00', '05:00:00', '', '1', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(66, 3, '2025-01-26', '2025-01-26 08:00:00', '2025-01-26 13:00:00', '05:00:00', '', '1', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(67, 4, '2025-01-26', '2025-01-26 08:00:00', '2025-01-26 13:00:00', '05:00:00', '', '1', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(68, 5, '2025-01-26', '2025-01-26 00:00:00', '2025-01-26 00:00:00', '00:00:00', '', '0', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(69, 6, '2025-01-26', '2025-01-26 00:00:00', '2025-01-26 00:00:00', '00:00:00', '', '0', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(70, 7, '2025-01-26', '2025-01-26 00:00:00', '2025-01-26 00:00:00', '00:00:00', '', '0', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(71, 8, '2025-01-26', '2025-01-26 08:00:00', '2025-01-26 13:00:00', '05:00:00', '', '1', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(72, 9, '2025-01-26', '2025-01-26 00:00:00', '2025-01-26 00:00:00', '00:00:00', '', '0', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(73, 1, '2025-01-27', '2025-01-27 08:00:00', '2025-01-27 13:00:00', '05:00:00', '', '1', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(74, 2, '2025-01-27', '2025-01-27 00:00:00', '2025-01-27 00:00:00', '00:00:00', '', '0', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(75, 3, '2025-01-27', '2025-01-27 08:00:00', '2025-01-27 13:00:00', '05:00:00', '', '1', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(76, 4, '2025-01-27', '2025-01-27 08:00:00', '2025-01-27 13:00:00', '05:00:00', '', '1', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(77, 5, '2025-01-27', '2025-01-27 08:00:00', '2025-01-27 13:00:00', '05:00:00', '', '1', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(78, 6, '2025-01-27', '2025-01-27 08:00:00', '2025-01-27 13:00:00', '05:00:00', '', '1', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(79, 7, '2025-01-27', '2025-01-27 08:00:00', '2025-01-27 13:00:00', '05:00:00', '', '1', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(80, 8, '2025-01-27', '2025-01-27 08:00:00', '2025-01-27 13:00:00', '05:00:00', '', '1', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(81, 9, '2025-01-27', '2025-01-27 00:00:00', '2025-01-27 00:00:00', '00:00:00', '', '0', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(82, 1, '2025-01-28', '2025-01-28 00:00:00', '2025-01-28 00:00:00', '00:00:00', '', '0', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(83, 2, '2025-01-28', '2025-01-28 08:00:00', '2025-01-28 13:00:00', '05:00:00', '', '1', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(84, 3, '2025-01-28', '2025-01-28 08:00:00', '2025-01-28 13:00:00', '05:00:00', '', '1', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(85, 4, '2025-01-28', '2025-01-28 08:00:00', '2025-01-28 13:00:00', '05:00:00', '', '1', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(86, 5, '2025-01-28', '2025-01-28 00:00:00', '2025-01-28 00:00:00', '00:00:00', '', '0', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(87, 6, '2025-01-28', '2025-01-28 08:00:00', '2025-01-28 13:00:00', '05:00:00', '', '1', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(88, 7, '2025-01-28', '2025-01-28 08:00:00', '2025-01-28 13:00:00', '05:00:00', '', '1', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(89, 8, '2025-01-28', '2025-01-28 08:00:00', '2025-01-28 13:00:00', '05:00:00', '', '1', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(90, 9, '2025-01-28', '2025-01-28 00:00:00', '2025-01-28 00:00:00', '00:00:00', '', '0', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(91, 1, '2025-01-29', '2025-01-29 00:00:00', '2025-01-29 00:00:00', '00:00:00', '', '0', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(92, 2, '2025-01-29', '2025-01-29 00:00:00', '2025-01-29 00:00:00', '00:00:00', '', '0', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(93, 3, '2025-01-29', '2025-01-29 08:00:00', '2025-01-29 13:00:00', '05:00:00', '', '1', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(94, 4, '2025-01-29', '2025-01-29 00:00:00', '2025-01-29 00:00:00', '00:00:00', '', '0', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(95, 5, '2025-01-29', '2025-01-29 08:00:00', '2025-01-29 13:00:00', '05:00:00', '', '1', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(96, 6, '2025-01-29', '2025-01-29 00:00:00', '2025-01-29 00:00:00', '00:00:00', '', '0', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(97, 7, '2025-01-29', '2025-01-29 08:00:00', '2025-01-29 13:00:00', '05:00:00', '', '1', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(98, 8, '2025-01-29', '2025-01-29 08:00:00', '2025-01-29 13:00:00', '05:00:00', '', '1', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(99, 9, '2025-01-29', '2025-01-29 00:00:00', '2025-01-29 00:00:00', '00:00:00', '', '0', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(100, 1, '2025-01-30', '2025-01-30 00:00:00', '2025-01-30 00:00:00', '00:00:00', '', '0', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(101, 2, '2025-01-30', '2025-01-30 00:00:00', '2025-01-30 00:00:00', '00:00:00', '', '0', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(102, 3, '2025-01-30', '2025-01-30 08:00:00', '2025-01-30 13:00:00', '05:00:00', '', '1', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(103, 4, '2025-01-30', '2025-01-30 00:00:00', '2025-01-30 00:00:00', '00:00:00', '', '0', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(104, 5, '2025-01-30', '2025-01-30 00:00:00', '2025-01-30 00:00:00', '00:00:00', '', '0', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(105, 6, '2025-01-30', '2025-01-30 00:00:00', '2025-01-30 00:00:00', '00:00:00', '', '0', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(106, 7, '2025-01-30', '2025-01-30 00:00:00', '2025-01-30 00:00:00', '00:00:00', '', '0', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(107, 8, '2025-01-30', '2025-01-30 00:00:00', '2025-01-30 00:00:00', '00:00:00', '', '0', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(108, 9, '2025-01-30', '2025-01-30 00:00:00', '2025-01-30 00:00:00', '00:00:00', '', '0', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(109, 1, '2025-02-01', '2025-02-01 08:00:00', '2025-02-01 13:00:00', '05:00:00', '', '1', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(110, 2, '2025-02-01', '2025-02-01 00:00:00', '2025-02-01 00:00:00', '00:00:00', '', '0', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(111, 3, '2025-02-01', '2025-02-01 08:00:00', '2025-02-01 13:00:00', '05:00:00', '', '1', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(112, 4, '2025-02-01', '2025-02-01 00:00:00', '2025-02-01 00:00:00', '00:00:00', '', '0', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(113, 5, '2025-02-01', '2025-02-01 08:00:00', '2025-02-01 13:00:00', '05:00:00', '', '1', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(114, 6, '2025-02-01', '2025-02-01 08:00:00', '2025-02-01 13:00:00', '05:00:00', '', '1', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(115, 7, '2025-02-01', '2025-02-01 00:00:00', '2025-02-01 00:00:00', '00:00:00', '', '0', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(116, 8, '2025-02-01', '2025-02-01 08:00:00', '2025-02-01 13:00:00', '05:00:00', '', '1', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(117, 9, '2025-02-01', '2025-02-01 08:00:00', '2025-02-01 13:00:00', '05:00:00', '', '1', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `id` int UNSIGNED NOT NULL,
  `event_time` datetime NOT NULL,
  `title` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `cover_photo` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `cover_video` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `description` longtext COLLATE utf8mb3_unicode_ci NOT NULL,
  `created_by` int UNSIGNED DEFAULT NULL,
  `class_id` int UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`id`, `event_time`, `title`, `cover_photo`, `cover_video`, `description`, `created_by`, `class_id`) VALUES
(1, '2025-12-20 15:00:00', 'Annual function 2025', '1.jpg', '', 'it is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution', 0, NULL),
(2, '2025-06-10 11:42:12', 'Farewell Party', NULL, '<iframe src=\"https://www.youtube.com/embed/pXfqbimmBhE\" frameborder=\"0\" allow=\"autoplay; encrypted-media\" allowfullscreen></iframe>', '<p><b>Details:</b><br><ul><li><p>What restrooms are available prior to gates opening?</p><div>Angel Stadium restrooms are available prior to the gates opening; they are located in the parking lot near the Orangewood entrance.</div></li><li><div>Can I bring food or drinks into the stadium?</div><div>You can bring one unopened bottle of water per person into the stadium. No other food or drinks are permitted.</div></li><li><div>Will food be available for sale inside the stadium?</div><div>Yes. Concession stands will be open until Greg Laurie speaks. Alcohol will not be available.</div></li><li><div>Can I reserve or save seats?</div><div>No. Seating is first-come, first-served.</div></li></ul><br></p>', 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `exams`
--

CREATE TABLE `exams` (
  `id` int UNSIGNED NOT NULL,
  `class_id` int UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `elective_subject_point_addition` decimal(5,2) NOT NULL DEFAULT '0.00',
  `marks_distribution_types` text COLLATE utf8mb3_unicode_ci NOT NULL,
  `status` enum('0','1') COLLATE utf8mb3_unicode_ci NOT NULL DEFAULT '1',
  `open_for_marks_entry` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_by` int UNSIGNED DEFAULT NULL,
  `updated_by` int UNSIGNED DEFAULT NULL,
  `deleted_by` int UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Dumping data for table `exams`
--

INSERT INTO `exams` (`id`, `class_id`, `name`, `elective_subject_point_addition`, `marks_distribution_types`, `status`, `open_for_marks_entry`, `created_at`, `updated_at`, `deleted_at`, `created_by`, `updated_by`, `deleted_by`) VALUES
(1, 2, 'Fugiat et ut.', 1.00, '[3,5,7]', '1', 0, '2025-02-01 06:12:19', '2025-02-01 06:12:19', NULL, 1, 0, NULL),
(2, 10, 'Est distinctio commodi natus omnis.', 2.00, '[5,6,7]', '1', 0, '2025-02-01 06:12:19', '2025-02-01 06:12:19', NULL, 1, 0, NULL),
(3, 10, 'Aut rerum voluptatem.', 2.00, '[3,4,6]', '1', 0, '2025-02-01 06:12:19', '2025-02-01 06:12:19', NULL, 1, 0, NULL),
(4, 7, 'Temporibus nemo tenetur praesentium.', 2.00, '[2,5,7]', '1', 0, '2025-02-01 06:12:19', '2025-02-01 06:12:19', NULL, 1, 0, NULL),
(5, 2, 'Dolorem neque neque ipsum.', 1.00, '[1,5,7]', '1', 0, '2025-02-01 06:12:19', '2025-02-01 06:12:19', NULL, 1, 0, NULL),
(6, 4, 'Vero fugiat occaecati.', 0.00, '[1,4,5]', '1', 0, '2025-02-01 06:12:19', '2025-02-01 06:12:19', NULL, 1, 0, NULL),
(7, 10, 'Consequatur laborum repellendus.', 2.00, '[4,5,6]', '1', 0, '2025-02-01 06:12:19', '2025-02-01 06:12:19', NULL, 1, 0, NULL),
(8, 3, 'Eius necessitatibus corporis corporis.', 1.00, '[2,6,7]', '1', 0, '2025-02-01 06:12:19', '2025-02-01 06:12:19', NULL, 1, 0, NULL),
(9, 2, 'Nihil voluptas.', 2.00, '[2,5,6]', '1', 0, '2025-02-01 06:12:19', '2025-02-01 06:12:19', NULL, 1, 0, NULL),
(10, 7, 'Ut nam ab excepturi.', 2.00, '[2,4,5]', '1', 0, '2025-02-01 06:12:19', '2025-02-01 06:12:19', NULL, 1, 0, NULL),
(11, 1, '1st Term Exam', 0.00, '[1,2,7]', '1', 1, '2025-02-01 06:12:19', '2025-02-01 06:12:19', NULL, 1, 0, NULL),
(12, 1, 'Mid Term Exam', 2.00, '[1,2,5]', '1', 0, '2025-02-01 06:12:19', '2025-02-01 06:12:19', NULL, 1, 0, NULL),
(13, 1, 'Final Exam', 0.00, '[1,2,7]', '1', 0, '2025-02-01 06:12:19', '2025-02-01 06:12:19', NULL, 1, 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `exam_rules`
--

CREATE TABLE `exam_rules` (
  `id` int UNSIGNED NOT NULL,
  `class_id` int UNSIGNED NOT NULL,
  `subject_id` int UNSIGNED NOT NULL,
  `exam_id` int UNSIGNED NOT NULL,
  `grade_id` int UNSIGNED NOT NULL,
  `combine_subject_id` int UNSIGNED DEFAULT NULL,
  `marks_distribution` text COLLATE utf8mb3_unicode_ci NOT NULL,
  `passing_rule` enum('1','2','3') COLLATE utf8mb3_unicode_ci NOT NULL DEFAULT '1',
  `total_exam_marks` int NOT NULL DEFAULT '0',
  `over_all_pass` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_by` int UNSIGNED DEFAULT NULL,
  `updated_by` int UNSIGNED DEFAULT NULL,
  `deleted_by` int UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `fee_structure`
--

CREATE TABLE `fee_structure` (
  `id` bigint NOT NULL,
  `school_id` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `class_group` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `academic_year` varchar(20) NOT NULL,
  `fee_type` varchar(100) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `due_date` date DEFAULT NULL,
  `frequency` enum('Monthly','Quarterly','Yearly','One-time') DEFAULT 'Monthly',
  `remarks` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `fee_structure`
--

INSERT INTO `fee_structure` (`id`, `school_id`, `class_group`, `academic_year`, `fee_type`, `amount`, `due_date`, `frequency`, `remarks`, `created_at`, `updated_at`) VALUES
(1, 'SVS001', '10', '2025-26', 'Tuition', 15000.00, NULL, 'Monthly', NULL, '2025-08-19 14:03:31', '2025-08-19 14:03:31');

-- --------------------------------------------------------

--
-- Table structure for table `fee_types`
--

CREATE TABLE `fee_types` (
  `id` int NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` text,
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `fee_types`
--

INSERT INTO `fee_types` (`id`, `name`, `description`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'Tuition', 'Monthly academic tuition fee', 1, '2025-08-14 17:13:16', '2025-08-14 17:13:16'),
(2, 'Transport', 'Bus/Van service charges', 1, '2025-08-14 17:13:16', '2025-08-14 17:13:16'),
(3, 'Lab', 'Science and computer lab usage fee', 1, '2025-08-14 17:13:16', '2025-08-14 17:13:16'),
(4, 'Hostel', 'Boarding and lodging charges', 1, '2025-08-14 17:13:16', '2025-08-14 17:13:16'),
(5, 'Sports', 'Sports activities and equipment charges', 1, '2025-08-14 17:13:16', '2025-08-14 17:13:16');

-- --------------------------------------------------------

--
-- Table structure for table `grades`
--

CREATE TABLE `grades` (
  `id` int UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `rules` text COLLATE utf8mb3_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_by` int UNSIGNED DEFAULT NULL,
  `updated_by` int UNSIGNED DEFAULT NULL,
  `deleted_by` int UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Dumping data for table `grades`
--

INSERT INTO `grades` (`id`, `name`, `rules`, `created_at`, `updated_at`, `deleted_at`, `created_by`, `updated_by`, `deleted_by`) VALUES
(1, '100 Marks', '[{\"grade\":1,\"point\":5,\"marks_from\":80,\"marks_upto\":100},{\"grade\":2,\"point\":4,\"marks_from\":70,\"marks_upto\":79},{\"grade\":3,\"point\":3.5,\"marks_from\":60,\"marks_upto\":69},{\"grade\":4,\"point\":3,\"marks_from\":50,\"marks_upto\":59},{\"grade\":5,\"point\":2,\"marks_from\":40,\"marks_upto\":49},{\"grade\":6,\"point\":1,\"marks_from\":33,\"marks_upto\":39},{\"grade\":7,\"point\":0,\"marks_from\":0,\"marks_upto\":32}]', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(2, '50 Marks', '[{\"grade\":1,\"point\":5,\"marks_from\":40,\"marks_upto\":50},{\"grade\":2,\"point\":4,\"marks_from\":35,\"marks_upto\":39},{\"grade\":3,\"point\":3.5,\"marks_from\":30,\"marks_upto\":34},{\"grade\":4,\"point\":3,\"marks_from\":25,\"marks_upto\":29},{\"grade\":5,\"point\":2,\"marks_from\":20,\"marks_upto\":24},{\"grade\":6,\"point\":1,\"marks_from\":17,\"marks_upto\":19},{\"grade\":7,\"point\":0,\"marks_from\":0,\"marks_upto\":16}]', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `hostelfees`
--

CREATE TABLE `hostelfees` (
  `InstituteId` int DEFAULT NULL,
  `HostelFeeId` int NOT NULL,
  `ClassId` varchar(3) DEFAULT NULL,
  `HostelFees` double(10,2) DEFAULT NULL,
  `Year` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `hostelfees`
--

INSERT INTO `hostelfees` (`InstituteId`, `HostelFeeId`, `ClassId`, `HostelFees`, `Year`) VALUES
(1, 1, '1', 100.00, '2012-2013'),
(1, 2, '3', 200.00, '2012-2013'),
(1, 3, '2', 300.00, '2012-2013'),
(1, 4, '4', 400.00, '2012-2013'),
(1, 5, '5', 500.00, '2012-2013'),
(1, 6, '6', 600.00, '2012-2013'),
(1, 7, '7', 700.00, '2012-2013'),
(1, 8, '8', 800.00, '2012-2013'),
(2, 9, '9', 100.00, '2012-2013'),
(2, 10, '10', 200.00, '2012-2013'),
(2, 11, '11', 300.00, '2012-2013'),
(2, 12, '12', 400.00, '2012-2013'),
(2, 13, '13', 500.00, '2012-2013'),
(2, 17, '14', 4000.00, '2012-2013'),
(2, 18, '15', 500.00, '2012-2013');

-- --------------------------------------------------------

--
-- Table structure for table `hostelrecord`
--

CREATE TABLE `hostelrecord` (
  `InstituteId` int DEFAULT NULL,
  `HostelRecordId` int NOT NULL,
  `StudentId` int DEFAULT NULL,
  `HostelTermNo` int DEFAULT NULL,
  `HostelTermFee` double DEFAULT NULL,
  `TermPaidDate` date DEFAULT NULL,
  `PaidBy` varchar(100) DEFAULT NULL,
  `Year` varchar(10) DEFAULT NULL,
  `HostelTermDes` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `hostelrecord`
--

INSERT INTO `hostelrecord` (`InstituteId`, `HostelRecordId`, `StudentId`, `HostelTermNo`, `HostelTermFee`, `TermPaidDate`, `PaidBy`, `Year`, `HostelTermDes`) VALUES
(1, 1, 1, 1, 1000, '2012-11-17', 'ram', '2012-2013', ''),
(1, 2, 2, 1, 3000, '2012-11-17', 'raj', '2012-2013', ''),
(1, 3, 3, 2, 3000, '2012-11-17', 'ram', '2012-2013', ''),
(1, 4, 4, 1, 4000, '2012-11-17', 'dev', '2012-2013', ''),
(1, 5, 5, 3, 2000, '2012-11-18', 'raj', '2012-2013', ''),
(1, 6, 6, 1, 1000, '2013-10-15', 'rahu', '2012-2013', ''),
(1, 7, 7, 1, 900, '2013-11-07', 'ravi', '2012-2013', ''),
(1, 8, 8, 1, 5000, '2013-11-06', 'selvi', '2012-2013', ''),
(1, 9, 9, 0, 9888, '2013-11-09', 'priyaa', '2012-2013', ''),
(1, 11, 11, 1, 999, '2013-11-14', 'nithya', '2012-2013', ''),
(1, 12, 12, 1, 9000, '2013-11-05', 'saravanan', '2012-2013', ''),
(2, 13, 13, 2, 890, '2013-11-10', 'jansi', '2012-2013', ''),
(2, 14, 14, 1, 1000, '2013-11-15', 'angel', '2012-2013', ''),
(2, 15, 15, 2, 90, '2013-11-27', 'hari', '2012-2013', ''),
(2, 16, 16, 0, 4000, '2013-12-16', 'praba', '2012-2013', ''),
(2, 17, 17, 3, 2000, '2013-12-16', 'niranjan', '2012-2013', ''),
(2, 19, 18, 1, 2000, '2013-12-16', 'raki', '2012-2013', ''),
(2, 22, 19, 1, 1000, '2013-12-10', 'jagan', '2012-2013', NULL),
(2, 23, 20, 3, 500, '2013-12-17', 'uma', '2012-2013', NULL),
(2, 24, 21, 0, 2000, '2013-12-10', 'hari', '2012-2013', NULL),
(2, 25, 22, 1, 1000, '2013-12-20', 'ranjan', '2012-2013', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `i_classes`
--

CREATE TABLE `i_classes` (
  `id` int NOT NULL,
  `school_id` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `class_id` int UNSIGNED DEFAULT NULL,
  `name` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `class_teacher` int UNSIGNED DEFAULT NULL,
  `class_leader` int UNSIGNED DEFAULT NULL,
  `group` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `status` enum('active','inactive') COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `created_by` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `i_classes`
--

INSERT INTO `i_classes` (`id`, `school_id`, `class_id`, `name`, `class_teacher`, `class_leader`, `group`, `status`, `created_at`, `created_by`) VALUES
(3, 'SVS001', 10, '10 A', 1, NULL, '10', 'active', '2025-05-31 19:02:08', 1),
(4, 'SVS001', 11, '10 B', 7, NULL, '10', 'active', '2025-05-31 19:03:01', 1),
(5, 'SVS001', 12, '10 C', 8, NULL, '10', 'active', '2025-05-31 19:03:46', 1),
(9, 'SVS001', 16, '11 A', NULL, NULL, '11 ', 'active', '2025-08-05 07:50:39', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `leaves`
--

CREATE TABLE `leaves` (
  `id` int UNSIGNED NOT NULL,
  `employee_id` int UNSIGNED NOT NULL,
  `leave_type` enum('1','2','3','4','5') COLLATE utf8mb3_unicode_ci NOT NULL DEFAULT '1',
  `leave_date` date NOT NULL,
  `document` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb3_unicode_ci,
  `status` enum('1','2','3') COLLATE utf8mb3_unicode_ci NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_by` int UNSIGNED DEFAULT NULL,
  `updated_by` int UNSIGNED DEFAULT NULL,
  `deleted_by` int UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Dumping data for table `leaves`
--

INSERT INTO `leaves` (`id`, `employee_id`, `leave_type`, `leave_date`, `document`, `description`, `status`, `created_at`, `updated_at`, `deleted_at`, `created_by`, `updated_by`, `deleted_by`) VALUES
(1, 7, '1', '2025-01-22', NULL, 'Labore autem odit laborum voluptatem reiciendis est soluta natus.', '2', '2025-02-01 06:12:19', '2025-02-01 06:12:19', NULL, 1, 0, NULL),
(2, 4, '2', '2025-01-14', NULL, 'Deleniti iure quam consequatur odit ut eos rerum.', '2', '2025-02-01 06:12:19', '2025-02-01 06:12:19', NULL, 1, 0, NULL),
(3, 7, '1', '2025-01-25', NULL, 'Qui hic nesciunt voluptatem omnis.', '2', '2025-02-01 06:12:19', '2025-02-01 06:12:19', NULL, 1, 0, NULL),
(4, 7, '2', '2025-01-13', NULL, 'Exercitationem quos et soluta aut et dolores molestiae.', '1', '2025-02-01 06:12:19', '2025-02-01 06:12:19', NULL, 1, 0, NULL),
(5, 1, '1', '2025-01-18', NULL, 'Minima molestiae molestias voluptas.', '3', '2025-02-01 06:12:19', '2025-02-01 06:12:19', NULL, 1, 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `lesson_notes`
--

CREATE TABLE `lesson_notes` (
  `id` int NOT NULL,
  `class_id` int UNSIGNED NOT NULL,
  `subject_id` int UNSIGNED NOT NULL,
  `teacher_id` int UNSIGNED NOT NULL,
  `lesson_title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `accordion_data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `chapter_title` varchar(250) COLLATE utf8mb4_general_ci NOT NULL,
  `attachment` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ;

--
-- Dumping data for table `lesson_notes`
--

INSERT INTO `lesson_notes` (`id`, `class_id`, `subject_id`, `teacher_id`, `lesson_title`, `accordion_data`, `chapter_title`, `attachment`, `created_at`, `updated_at`) VALUES
(5, 10, 13, 1, 'dsafdsf', '\"\\\"[{\\\\\\\"title\\\\\\\":\\\\\\\"sxaSA\\\\\\\",\\\\\\\"content\\\\\\\":\\\\\\\"<p>sadsad</p>\\\\\\\",\\\\\\\"tags\\\\\\\":\\\\\\\"sadsa\\\\\\\"}]\\\"\"', 'dsad', NULL, '2025-07-04 20:28:36', '2025-07-07 22:55:20');

-- --------------------------------------------------------

--
-- Table structure for table `libraryrecord`
--

CREATE TABLE `libraryrecord` (
  `InstituteId` int DEFAULT NULL,
  `LibraryRecordId` int DEFAULT NULL,
  `LibraryNo` varchar(5) NOT NULL,
  `BookCode` varchar(5) NOT NULL,
  `IssuedDate` date NOT NULL,
  `ReturnDate` date NOT NULL,
  `ReceivedDate` date DEFAULT NULL,
  `Year` varchar(10) DEFAULT NULL,
  `LibraryDes` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `libraryrecord`
--

INSERT INTO `libraryrecord` (`InstituteId`, `LibraryRecordId`, `LibraryNo`, `BookCode`, `IssuedDate`, `ReturnDate`, `ReceivedDate`, `Year`, `LibraryDes`) VALUES
(1, 1, '1', 'b1', '2013-10-16', '2013-10-15', NULL, '2012-2013', 'calculation'),
(1, 2, '2', 'b2', '2012-11-18', '2013-10-10', '2013-10-09', '2012-2013', NULL),
(1, 3, '3', 'b3', '2012-11-19', '2013-10-09', '2013-10-09', '2012-2013', NULL),
(1, 4, '4', 'b4', '2013-10-09', '2013-10-09', '2013-10-24', '2012-2013', NULL),
(1, 5, '5', 'b5', '2013-10-09', '2013-10-09', '2013-10-23', '2012-2013', NULL),
(1, 6, '6', 'b6', '2013-10-11', '2013-10-11', '2013-10-22', '2012-2013', NULL),
(1, 7, '7', 'b7', '2013-10-11', '2013-10-10', '2013-10-22', '2012-2013', NULL),
(1, 8, '8', 'b1', '2013-10-08', '2013-10-10', '2013-10-24', '2012-2013', NULL),
(1, 9, '9', 'b2', '2013-10-15', '2013-10-15', NULL, '2012-2013', NULL),
(1, 11, '11', 'b3', '2013-10-15', '2013-10-17', NULL, '2012-2013', NULL),
(1, 12, '12', 'b4', '2013-10-22', '2013-10-21', NULL, '2012-2013', NULL),
(2, 13, '13', 'b1', '2013-10-24', '2013-10-23', NULL, '2012-2013', NULL),
(2, 14, '14', 'b2', '2013-10-25', '2013-10-24', NULL, '2012-2013', NULL),
(2, 15, '15', 'b3', '2013-11-08', '2013-11-07', NULL, '2012-2013', NULL),
(2, 18, '18', 'b6', '2013-11-23', '2013-11-12', NULL, '2012-2013', NULL),
(2, 17, '17', 'b5', '2013-11-23', '2013-11-02', NULL, '2012-2013', NULL),
(2, 18, '18', 'b6', '2013-11-23', '2013-11-12', NULL, '2012-2013', NULL),
(2, 19, '19', 'b7', '2013-11-23', '2013-11-12', NULL, '2012-2013', NULL),
(2, 20, '20', 'b1', '2013-12-19', '2013-12-21', NULL, '2012-2013', NULL),
(2, 21, '21', 'b2', '2013-12-11', '2013-12-14', NULL, '2012-2013', NULL),
(2, 22, '22', 'b3', '2013-12-20', '2013-12-22', NULL, '2012-2013', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `libraryreg`
--

CREATE TABLE `libraryreg` (
  `InstituteId` int DEFAULT NULL,
  `LibraryId` int NOT NULL,
  `LibraryNo` varchar(10) NOT NULL,
  `StudentId` varchar(10) NOT NULL,
  `Year` varchar(10) DEFAULT NULL,
  `LibraryDes` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `libraryreg`
--

INSERT INTO `libraryreg` (`InstituteId`, `LibraryId`, `LibraryNo`, `StudentId`, `Year`, `LibraryDes`) VALUES
(1, 1, '1', '1', '2012-2013', NULL),
(1, 2, '2', '2', '2012-2013', NULL),
(1, 3, '3', '3', '2012-2013', NULL),
(1, 4, '4', '4', '2012-2013', NULL),
(1, 5, '5', '5', '2012-2013', NULL),
(1, 6, '6', '6', '2012-2013', NULL),
(1, 7, '7', '7', '2012-2013', NULL),
(1, 8, '8', '8', '2012-2013', NULL),
(1, 9, '9', '9', '2012-2013', NULL),
(1, 11, '11', '11', '2012-2013', NULL),
(1, 12, '12', '12', '2012-2013', NULL),
(2, 13, '13', '13', '2012-2013', NULL),
(2, 14, '14', '14', '2012-2013', NULL),
(2, 15, '15', '15', '2012-2013', NULL),
(2, 16, '16', '16', '2012-2013', NULL),
(2, 17, '17', '17', '2012-2013', NULL),
(2, 18, '18', '18', '2012-2013', NULL),
(2, 19, '19', '19', '2012-2013', NULL),
(2, 20, '20', '20', '2012-2013', NULL),
(2, 21, '21', '21', '2012-2013', NULL),
(2, 22, '22', '22', '2012-2013', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `marks`
--

CREATE TABLE `marks` (
  `id` int UNSIGNED NOT NULL,
  `academic_year_id` int UNSIGNED NOT NULL,
  `class_id` int UNSIGNED NOT NULL,
  `section_id` int UNSIGNED NOT NULL,
  `registration_id` int UNSIGNED NOT NULL,
  `exam_id` int UNSIGNED NOT NULL,
  `subject_id` int UNSIGNED NOT NULL,
  `marks` text COLLATE utf8mb3_unicode_ci NOT NULL,
  `total_marks` int NOT NULL,
  `grade` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `point` decimal(5,2) NOT NULL,
  `present` enum('0','1') COLLATE utf8mb3_unicode_ci NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_by` int UNSIGNED DEFAULT NULL,
  `updated_by` int UNSIGNED DEFAULT NULL,
  `deleted_by` int UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `months`
--

CREATE TABLE `months` (
  `MonthNo` smallint NOT NULL,
  `MonthName` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `months`
--

INSERT INTO `months` (`MonthNo`, `MonthName`) VALUES
(1, 'January'),
(2, 'Febrary'),
(3, 'March'),
(4, 'April'),
(5, 'May'),
(6, 'June'),
(7, 'July'),
(8, 'Auguest'),
(9, 'Spetember'),
(10, 'October'),
(11, 'November'),
(12, 'December');

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` char(36) COLLATE utf8mb3_unicode_ci NOT NULL,
  `type` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `notifiable_type` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `notifiable_id` bigint UNSIGNED NOT NULL,
  `data` text COLLATE utf8mb3_unicode_ci NOT NULL,
  `read_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE `permissions` (
  `id` int UNSIGNED NOT NULL,
  `slug` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `group` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `group_id` int UNSIGNED DEFAULT NULL,
  `menuoder` int NOT NULL,
  `icon` varchar(250) COLLATE utf8mb3_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Dumping data for table `permissions`
--

INSERT INTO `permissions` (`id`, `slug`, `name`, `group`, `group_id`, `menuoder`, `icon`, `created_at`) VALUES
(10, '/profile', 'Profile Access', 'admin', 1, 0, 'Profile Access', '2025-05-28 14:45:21'),
(11, '/profile', 'Profile Access', 'teacher', 2, 0, 'Profile Access', '2025-05-28 14:45:21'),
(12, '/profile', 'Profile Access', 'student', 3, 0, 'Profile Access', '2025-05-28 14:45:21'),
(13, '/profile', 'Profile Access', 'parent', 4, 0, 'Profile Access', '2025-05-28 14:45:21'),
(14, '/settings', 'Settings Access', 'admin', 1, 0, 'Settings', '2025-05-28 14:45:21'),
(15, '/settings', 'Settings Access', 'teacher', 2, 0, 'Settings', '2025-05-28 14:45:21'),
(16, '/settings', 'Settings Access', 'student', 3, 0, 'Settings', '2025-05-28 14:45:21'),
(17, '/settings', 'Settings Access', 'parent', 4, 0, 'Settings', '2025-05-28 14:45:21'),
(18, '/logout', 'Logout Access', 'admin', 1, 0, 'logout', '2025-05-28 14:45:21'),
(19, '/logout', 'Logout Access', 'teacher', 2, 0, 'logout', '2025-05-28 14:45:21'),
(20, '/logout', 'Logout Access', 'student', 3, 0, 'logout', '2025-05-28 14:45:21'),
(21, '/logout', 'Logout Access', 'parent', 4, 0, 'logout', '2025-05-28 14:45:21'),
(219, '/teacher/attendance', 'Attendance', 'Class Teacher\r\n', 8, 0, 'Attendance', '2025-06-08 16:38:53'),
(220, '/teacher/attendance', 'Attendance', 'Teacher\r\n', 2, 0, 'Attendance', '2025-06-08 16:39:32'),
(221, '/teacher/attendance', 'Attendance', 'Admin\r\n', 1, 0, 'Attendance', '2025-06-08 16:40:16'),
(222, '/admission/staff', 'Add Staff', 'admin', 1, 10, 'add staff', '2025-06-15 10:42:48'),
(223, '/admission/student', 'Add Student', 'admin', 1, 11, 'student', '2025-06-15 10:43:34'),
(224, '/lessons/teacher', 'Add Lessons', 'admin', 1, 0, 'note', '2025-06-30 01:01:26'),
(225, '/lessons/teacher', 'Add Lessons', 'teacher', 2, 0, 'note', '2025-06-30 01:02:12'),
(226, '/lessons/teacher', 'Add Lessons', 'student', 3, 0, 'note', '2025-06-30 01:02:56'),
(227, '/lessons/teacher', 'Add Lessons', 'parent', 4, 0, 'note', '2025-06-30 01:03:39'),
(228, '/lessons/student', 'Lesson Nots', 'admin', 1, 0, 'Lesson Nots', '2025-07-07 01:34:39'),
(229, '/lessons/student', 'Lesson Nots', 'teacher', 2, 0, 'Lesson Nots', '2025-07-07 01:35:21'),
(230, '/lessons/student', 'Lesson Nots', 'student', 3, 0, 'Lesson Nots', '2025-07-07 01:36:01'),
(231, '/lessons/student', 'Lesson Nots', 'parent', 4, 0, 'Lesson Nots', '2025-07-07 01:36:32'),
(232, '/other', 'Fess Entry', 'admin', 1, 0, 'payfees', '2025-08-16 14:52:26');

-- --------------------------------------------------------

--
-- Table structure for table `registrations`
--

CREATE TABLE `registrations` (
  `id` int UNSIGNED NOT NULL,
  `regi_no` varchar(20) COLLATE utf8mb3_unicode_ci NOT NULL,
  `student_id` int UNSIGNED NOT NULL,
  `class_id` int UNSIGNED NOT NULL,
  `section_id` int UNSIGNED NOT NULL,
  `academic_year_id` int UNSIGNED NOT NULL,
  `roll_no` int DEFAULT NULL,
  `shift` varchar(15) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `card_no` varchar(50) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `board_regi_no` varchar(50) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `house` varchar(100) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `status` enum('0','1') COLLATE utf8mb3_unicode_ci NOT NULL DEFAULT '1',
  `is_promoted` enum('0','1') COLLATE utf8mb3_unicode_ci NOT NULL DEFAULT '0',
  `old_registration_id` int UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_by` int UNSIGNED DEFAULT NULL,
  `updated_by` int UNSIGNED DEFAULT NULL,
  `deleted_by` int UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Dumping data for table `registrations`
--

INSERT INTO `registrations` (`id`, `regi_no`, `student_id`, `class_id`, `section_id`, `academic_year_id`, `roll_no`, `shift`, `card_no`, `board_regi_no`, `house`, `status`, `is_promoted`, `old_registration_id`, `created_at`, `updated_at`, `deleted_at`, `created_by`, `updated_by`, `deleted_by`) VALUES
(1, '251001', 1, 1, 12, 1, 1, 'Morning', NULL, NULL, NULL, '1', '0', NULL, '2025-02-01 06:12:18', NULL, NULL, 1, NULL, NULL),
(2, '251002', 2, 1, 12, 1, 2, 'Morning', NULL, NULL, NULL, '1', '0', NULL, '2025-02-01 06:12:18', NULL, NULL, 1, NULL, NULL),
(3, '251003', 3, 1, 12, 1, 3, 'Morning', NULL, NULL, NULL, '1', '0', NULL, '2025-02-01 06:12:18', NULL, NULL, 1, NULL, NULL),
(4, '251004', 4, 1, 12, 1, 4, 'Morning', NULL, NULL, NULL, '1', '0', NULL, '2025-02-01 06:12:18', NULL, NULL, 1, NULL, NULL),
(5, '251005', 5, 1, 12, 1, 5, 'Morning', NULL, NULL, NULL, '1', '0', NULL, '2025-02-01 06:12:18', NULL, NULL, 1, NULL, NULL),
(6, '252001', 6, 2, 7, 1, 6, 'Morning', NULL, NULL, NULL, '1', '0', NULL, '2025-02-01 06:12:18', NULL, NULL, 1, NULL, NULL),
(7, '252002', 7, 2, 7, 1, 7, 'Morning', NULL, NULL, NULL, '1', '0', NULL, '2025-02-01 06:12:18', NULL, NULL, 1, NULL, NULL),
(8, '252003', 8, 2, 7, 1, 8, 'Morning', NULL, NULL, NULL, '1', '0', NULL, '2025-02-01 06:12:18', NULL, NULL, 1, NULL, NULL),
(9, '252004', 9, 2, 7, 1, 9, 'Morning', NULL, NULL, NULL, '1', '0', NULL, '2025-02-01 06:12:18', NULL, NULL, 1, NULL, NULL),
(10, '253001', 10, 3, 9, 1, 10, 'Morning', NULL, NULL, NULL, '1', '0', NULL, '2025-02-01 06:12:18', NULL, NULL, 1, NULL, NULL),
(11, '253002', 11, 3, 9, 1, 11, 'Morning', NULL, NULL, NULL, '1', '0', NULL, '2025-02-01 06:12:18', NULL, NULL, 1, NULL, NULL),
(12, '253003', 12, 3, 9, 1, 12, 'Morning', NULL, NULL, NULL, '1', '0', NULL, '2025-02-01 06:12:18', NULL, NULL, 1, NULL, NULL),
(13, '254001', 13, 4, 10, 1, 13, 'Morning', NULL, NULL, NULL, '1', '0', NULL, '2025-02-01 06:12:18', NULL, NULL, 1, NULL, NULL),
(14, '254002', 14, 4, 10, 1, 14, 'Morning', NULL, NULL, NULL, '1', '0', NULL, '2025-02-01 06:12:18', NULL, NULL, 1, NULL, NULL),
(15, '254003', 15, 4, 10, 1, 15, 'Morning', NULL, NULL, NULL, '1', '0', NULL, '2025-02-01 06:12:18', NULL, NULL, 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `results`
--

CREATE TABLE `results` (
  `id` int UNSIGNED NOT NULL,
  `academic_year_id` int UNSIGNED NOT NULL,
  `class_id` int UNSIGNED NOT NULL,
  `registration_id` int UNSIGNED NOT NULL,
  `exam_id` int UNSIGNED NOT NULL,
  `total_marks` int NOT NULL,
  `grade` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `point` decimal(5,2) NOT NULL,
  `subject_fail_count` smallint UNSIGNED NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_by` int UNSIGNED DEFAULT NULL,
  `updated_by` int UNSIGNED DEFAULT NULL,
  `deleted_by` int UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Dumping data for table `results`
--

INSERT INTO `results` (`id`, `academic_year_id`, `class_id`, `registration_id`, `exam_id`, `total_marks`, `grade`, `point`, `subject_fail_count`, `created_at`, `updated_at`, `deleted_at`, `created_by`, `updated_by`, `deleted_by`) VALUES
(1, 1, 1, 1, 11, 265, 'F', 2.75, 1, '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(2, 1, 1, 2, 11, 139, 'F', 0.75, 2, '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(3, 1, 1, 3, 11, 203, 'F', 1.88, 1, '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(4, 1, 1, 4, 11, 136, 'F', 1.00, 2, '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(5, 1, 1, 5, 11, 218, 'F', 2.38, 1, '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `result_publish`
--

CREATE TABLE `result_publish` (
  `id` int UNSIGNED NOT NULL,
  `academic_year_id` int UNSIGNED NOT NULL,
  `class_id` int UNSIGNED NOT NULL,
  `exam_id` int UNSIGNED NOT NULL,
  `publish_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Dumping data for table `result_publish`
--

INSERT INTO `result_publish` (`id`, `academic_year_id`, `class_id`, `exam_id`, `publish_date`) VALUES
(1, 1, 1, 11, '2025-02-01');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `deletable` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_by` int UNSIGNED DEFAULT NULL,
  `updated_by` int UNSIGNED DEFAULT NULL,
  `deleted_by` int UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `deletable`, `created_at`, `updated_at`, `deleted_at`, `created_by`, `updated_by`, `deleted_by`) VALUES
(1, 'Admin', 0, '2025-02-01 06:12:06', '2025-02-01 06:12:06', NULL, 0, 0, NULL),
(2, 'Teacher', 0, '2025-02-01 06:12:06', '2025-02-01 06:12:06', NULL, 0, 0, NULL),
(3, 'Student', 0, '2025-02-01 06:12:06', '2025-02-01 06:12:06', NULL, 0, 0, NULL),
(4, 'Parents', 0, '2025-02-01 06:12:06', '2025-02-01 06:12:06', NULL, 0, 0, NULL),
(5, 'Accountant', 0, '2025-02-01 06:12:06', '2025-02-01 06:12:06', NULL, 0, 0, NULL),
(6, 'Librarian', 0, '2025-02-01 06:12:06', '2025-02-01 06:12:06', NULL, 0, 0, NULL),
(7, 'Receptionist', 0, '2025-02-01 06:12:06', '2025-02-01 06:12:06', NULL, 0, 0, NULL),
(8, 'Class Teacher', 1, '2025-06-08 16:33:20', '2025-06-08 16:33:20', NULL, 1, 1, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `roles_permissions`
--

CREATE TABLE `roles_permissions` (
  `role_id` int UNSIGNED NOT NULL,
  `permission_id` int UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_by` int UNSIGNED DEFAULT NULL,
  `updated_by` int UNSIGNED DEFAULT NULL,
  `deleted_by` int UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `schools`
--

CREATE TABLE `schools` (
  `id` int NOT NULL,
  `code` varchar(20) DEFAULT NULL,
  `name` varchar(150) NOT NULL,
  `address` text,
  `city` varchar(100) DEFAULT NULL,
  `state` varchar(100) DEFAULT NULL,
  `pincode` varchar(10) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `logo_url` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `schools`
--

INSERT INTO `schools` (`id`, `code`, `name`, `address`, `city`, `state`, `pincode`, `phone`, `email`, `logo_url`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'SVS001', 'Spring Valley School', NULL, 'Bangalore', 'Karnataka', NULL, '9876543210', 'contact@svs.com', NULL, 1, '2025-08-14 15:44:11', '2025-08-14 15:44:11'),
(3, 'GWH002', 'Greenwood High', NULL, 'Chennai', 'Tamil Nadu', NULL, '9123456780', 'info@gwh.com', NULL, 1, '2025-08-14 17:22:22', '2025-08-14 17:22:22');

-- --------------------------------------------------------

--
-- Table structure for table `school_fees`
--

CREATE TABLE `school_fees` (
  `id` int NOT NULL,
  `school_id` varchar(20) DEFAULT NULL,
  `student_id` int UNSIGNED NOT NULL,
  `class_id` int UNSIGNED NOT NULL,
  `academic_year` varchar(9) NOT NULL,
  `fee_type` varchar(50) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `due_date` date DEFAULT NULL,
  `status` enum('Pending','Paid','Partial') DEFAULT 'Pending',
  `payment_date` date DEFAULT NULL,
  `payment_method` varchar(50) DEFAULT NULL,
  `remarks` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `school_finances`
--

CREATE TABLE `school_finances` (
  `id` int UNSIGNED NOT NULL,
  `bill_id` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` enum('income','expense') COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `date` date NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `student_id` int UNSIGNED DEFAULT NULL,
  `staff_id` int UNSIGNED DEFAULT NULL,
  `created_by` int UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `school_finances`
--

INSERT INTO `school_finances` (`id`, `bill_id`, `type`, `category`, `amount`, `date`, `description`, `student_id`, `staff_id`, `created_by`, `created_at`, `updated_at`) VALUES
(4, 'BILL20250001', 'income', 'tuition_fee', 3135.00, '2025-01-03', 'Monthly income', NULL, NULL, 1, '2025-05-27 10:11:58', '2025-05-27 10:11:58'),
(5, 'BILL20250002', 'expense', 'maintenance', 19169.00, '2025-01-18', 'Monthly expense', NULL, 1, 1, '2025-05-27 10:11:58', '2025-05-27 10:11:58'),
(16, 'BILL20250003', 'income', 'exam_fee', 8419.00, '2025-01-12', 'Monthly income', NULL, NULL, 1, '2025-05-27 10:59:47', '2025-05-27 10:59:47'),
(19, 'BILL20250004', 'expense', 'salary', 13369.00, '2025-01-12', 'Monthly expense', NULL, 7, 1, '2025-05-27 11:02:03', '2025-05-27 11:02:03'),
(20, 'BILL20250005', 'expense', 'salary', 5005.00, '2025-01-20', 'Monthly expense', NULL, 8, 1, '2025-05-27 11:02:03', '2025-05-27 11:02:03'),
(21, 'BILL20250006', 'income', 'tuition_fee', 9937.00, '2025-02-19', 'Monthly income', NULL, NULL, 1, '2025-05-27 11:02:03', '2025-05-27 11:02:03'),
(22, 'BILL20250007', 'expense', 'salary', 16133.00, '2025-02-04', 'Monthly expense', NULL, 9, 1, '2025-05-27 11:02:03', '2025-05-27 11:02:03'),
(23, 'BILL20250008', 'income', 'tuition_fee', 5043.00, '2025-02-10', 'Monthly income', NULL, NULL, 1, '2025-05-27 11:02:03', '2025-05-27 11:02:03'),
(24, 'BILL20250009', 'income', 'donation', 7479.00, '2025-02-07', 'Monthly income', NULL, NULL, 1, '2025-05-27 11:02:03', '2025-05-27 11:02:03'),
(28, 'BILL20250010', 'expense', 'maintenance', 6843.00, '2025-02-06', 'Monthly expense', NULL, 10, 1, '2025-05-27 11:14:49', '2025-05-27 11:14:49'),
(29, 'BILL20250011', 'expense', 'utilities', 6530.00, '2025-03-28', 'Monthly expense', NULL, 11, 1, '2025-05-27 11:14:49', '2025-05-27 11:14:49'),
(30, 'BILL20250012', 'expense', 'salary', 15888.00, '2025-03-12', 'Monthly expense', NULL, 12, 1, '2025-05-27 11:14:49', '2025-05-27 11:14:49'),
(31, 'BILL20250013', 'income', 'exam_fee', 6382.00, '2025-03-19', 'Monthly income', NULL, NULL, 1, '2025-05-27 11:14:49', '2025-05-27 11:14:49'),
(32, 'BILL20250014', 'income', 'donation', 11487.00, '2025-03-03', 'Monthly income', NULL, NULL, 1, '2025-05-27 11:14:49', '2025-05-27 11:14:49'),
(33, 'BILL20250015', 'expense', 'salary', 13079.00, '2025-03-17', 'Monthly expense', NULL, 13, 1, '2025-05-27 11:14:49', '2025-05-27 11:14:49'),
(34, 'BILL20250016', 'expense', 'utilities', 7286.00, '2025-04-13', 'Monthly expense', NULL, 14, 1, '2025-05-27 11:14:49', '2025-05-27 11:14:49'),
(38, 'BILL20250017', 'expense', 'maintenance', 12404.00, '2025-04-11', 'Monthly expense', NULL, 14, 1, '2025-05-27 11:20:19', '2025-05-27 11:20:19'),
(39, 'BILL20250018', 'expense', 'salary', 10596.00, '2025-04-26', 'Monthly expense', NULL, 13, 1, '2025-05-27 11:20:19', '2025-05-27 11:20:19'),
(40, 'BILL20250019', 'expense', 'salary', 14304.00, '2025-04-04', 'Monthly expense', NULL, 12, 1, '2025-05-27 11:20:19', '2025-05-27 11:20:19'),
(41, 'BILL20250020', 'expense', 'utilities', 16176.00, '2025-04-17', 'Monthly expense', NULL, 11, 1, '2025-05-27 11:20:19', '2025-05-27 11:20:19'),
(42, 'BILL20250021', 'expense', 'maintenance', 19394.00, '2025-05-18', 'Monthly expense', NULL, 10, 1, '2025-05-27 11:20:19', '2025-05-27 11:20:19'),
(43, 'BILL20250022', 'expense', 'salary', 6675.00, '2025-05-20', 'Monthly expense', NULL, 9, 1, '2025-05-27 11:20:19', '2025-05-27 11:20:19'),
(44, 'BILL20250023', 'expense', 'maintenance', 11838.00, '2025-05-06', 'Monthly expense', NULL, 8, 1, '2025-05-27 11:20:19', '2025-05-27 11:20:19'),
(45, 'BILL20250024', 'expense', 'salary', 13920.00, '2025-05-24', 'Monthly expense', NULL, 7, 1, '2025-05-27 11:20:19', '2025-05-27 11:20:19');

-- --------------------------------------------------------

--
-- Table structure for table `sequences`
--

CREATE TABLE `sequences` (
  `name` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `current_value` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sequences`
--

INSERT INTO `sequences` (`name`, `current_value`) VALUES
('class_id', 16),
('user_id', 1115);

-- --------------------------------------------------------

--
-- Table structure for table `site_metas`
--

CREATE TABLE `site_metas` (
  `id` int UNSIGNED NOT NULL,
  `meta_key` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `meta_value` longtext COLLATE utf8mb3_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_by` int UNSIGNED DEFAULT NULL,
  `updated_by` int UNSIGNED DEFAULT NULL,
  `deleted_by` int UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Dumping data for table `site_metas`
--

INSERT INTO `site_metas` (`id`, `meta_key`, `meta_value`, `created_at`, `updated_at`, `deleted_at`, `created_by`, `updated_by`, `deleted_by`) VALUES
(1, 'settings', '{\"logo\":\"logo.png\",\"logo2x\":\"logo@2x.png\",\"favicon\":\"favicon.png\",\"name\":\"Cloud School\",\"short_name\":\"CloudSchool\",\"facebook\":\"#\",\"instagram\":\"#\",\"twitter\":\"#\",\"youtube\":\"#\"}', '2025-02-01 06:12:12', '2025-02-01 06:12:12', NULL, 0, 0, NULL),
(2, 'timeline', '{\"t\":\"We Start Here\",\"d\":\"Lorem ipsum\",\"y\":\"2006\"}', '2025-02-01 06:12:12', '2025-02-01 06:12:12', NULL, 0, 0, NULL),
(3, 'timeline', '{\"t\":\"Top Score\",\"d\":\"We achive top result score in the state\",\"y\":\"2010\"}', '2025-02-01 06:12:12', '2025-02-01 06:12:12', NULL, 0, 0, NULL),
(4, 'faq', '{\"q\":\"How to apply for adminission?\",\"a\":\"Just e-mail us, or contact on hot line.\"}', '2025-02-01 06:12:12', '2025-02-01 06:12:12', NULL, 0, 0, NULL),
(5, 'contact_address', 'Dhaka-1207', '2025-02-01 06:12:12', '2025-02-01 06:12:12', NULL, 0, 0, NULL),
(6, 'contact_phone', '+880258685', '2025-02-01 06:12:12', '2025-02-01 06:12:12', NULL, 0, 0, NULL),
(7, 'contact_email', 'contact@cloudschoolbd.com', '2025-02-01 06:12:12', '2025-02-01 06:12:12', NULL, 0, 0, NULL),
(8, 'contact_latlong', '23.7340076,90.3841824', '2025-02-01 06:12:12', '2025-02-01 06:12:12', NULL, 0, 0, NULL),
(9, 'gallery', '1.jpg', '2025-02-01 06:12:12', '2025-02-01 06:12:12', NULL, 0, 0, NULL),
(10, 'gallery', '2.jpg', '2025-02-01 06:12:12', '2025-02-01 06:12:12', NULL, 0, 0, NULL),
(11, 'gallery', '3.jpg', '2025-02-01 06:12:12', '2025-02-01 06:12:12', NULL, 0, 0, NULL),
(12, 'statistic', '4000,150,18000,9800', '2025-02-01 06:12:12', '2025-02-01 06:12:12', NULL, 0, 0, NULL),
(13, 'our_service_text', 'Lorem ipsum', '2025-02-01 06:12:12', '2025-02-01 06:12:12', NULL, 0, 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `stafftype`
--

CREATE TABLE `stafftype` (
  `InstituteId` int DEFAULT NULL,
  `StaffTypeId` int NOT NULL,
  `StaffType` char(200) NOT NULL,
  `StaffDes` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `stafftype`
--

INSERT INTO `stafftype` (`InstituteId`, `StaffTypeId`, `StaffType`, `StaffDes`) VALUES
(1, 1, 'Principal', NULL),
(1, 2, 'Teacher', NULL),
(1, 3, 'Officeboy', NULL),
(1, 4, 'Attender', NULL),
(2, 5, 'Principal', NULL),
(2, 6, 'Teacher', NULL),
(2, 7, 'Clerk', NULL),
(2, 8, 'attender', '');

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `id` int UNSIGNED NOT NULL,
  `user_id` int UNSIGNED NOT NULL,
  `school_id` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `class_id` int UNSIGNED DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `dob` varchar(10) COLLATE utf8mb3_unicode_ci NOT NULL,
  `gender` enum('1','2') COLLATE utf8mb3_unicode_ci NOT NULL DEFAULT '1',
  `religion` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `email` varchar(250) COLLATE utf8mb3_unicode_ci NOT NULL,
  `blood_group` varchar(10) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `nationality` varchar(50) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `photo` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `phone_no` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `extra_activity` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `note` varchar(500) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `father_name` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `father_phone_no` varchar(15) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `father_email` varchar(250) COLLATE utf8mb3_unicode_ci NOT NULL,
  `mother_name` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `mother_phone_no` varchar(15) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `mother_email` varchar(250) COLLATE utf8mb3_unicode_ci NOT NULL,
  `guardian` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `guardian_phone_no` varchar(15) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `guardian_email` varchar(250) COLLATE utf8mb3_unicode_ci NOT NULL,
  `present_address` varchar(500) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `permanent_address` varchar(500) COLLATE utf8mb3_unicode_ci NOT NULL,
  `birth_certificate` varchar(250) COLLATE utf8mb3_unicode_ci NOT NULL,
  `cast` varchar(250) COLLATE utf8mb3_unicode_ci NOT NULL,
  `sms_receive_no` smallint NOT NULL DEFAULT '1',
  `siblings` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `signature` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `status` enum('0','1') COLLATE utf8mb3_unicode_ci NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_by` int UNSIGNED DEFAULT NULL,
  `updated_by` int UNSIGNED DEFAULT NULL,
  `deleted_by` int UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`id`, `user_id`, `school_id`, `class_id`, `name`, `dob`, `gender`, `religion`, `email`, `blood_group`, `nationality`, `photo`, `phone_no`, `extra_activity`, `note`, `father_name`, `father_phone_no`, `father_email`, `mother_name`, `mother_phone_no`, `mother_email`, `guardian`, `guardian_phone_no`, `guardian_email`, `present_address`, `permanent_address`, `birth_certificate`, `cast`, `sms_receive_no`, `siblings`, `signature`, `status`, `created_at`, `updated_at`, `deleted_at`, `created_by`, `updated_by`, `deleted_by`) VALUES
(1, 15, 'SVS001', 10, 'Alice Johnson', '2010-03-14', '2', 'Christianity', '', 'A+', 'Indian', 'photo1.jpg', '9000000001', 'Drawing', 'Creative and attentive', 'Michael Johnson', '9111111111', '', 'Sara Johnson', '9222222222', '', 'Uncle Bob', '9333333333', '', '12 Elm Street', '45 Oak Lane', '', '', 1, 'Tom Johnson', 'sig1.png', '1', '2025-05-31 13:58:18', '2025-05-31 13:58:18', NULL, 1, NULL, NULL),
(2, 1002, 'SVS001', 10, 'Brian Lee', '2010-06-20', '1', 'Hinduism', '', 'B+', 'Indian', 'photo2.jpg', '9000000002', 'Cricket', 'Fast learner', 'David Lee', '9111111112', '', 'Laura Lee', '9222222223', '', 'Grandfather Lee', '9333333334', '', '34 Pine Avenue', '89 Maple Road', '', '', 1, 'None', 'sig2.png', '1', '2025-05-31 13:58:18', '2025-05-31 13:58:18', NULL, 1, NULL, NULL),
(3, 1003, 'SVS001', 11, 'Chloe Smith', '2010-12-01', '2', 'Islam', '', 'O+', 'Indian', 'photo3.jpg', '9000000003', 'Singing', 'Very sociable', 'Aaron Smith', '9111111113', '', 'Nancy Smith', '9222222224', '', 'Aunt May', '9333333335', '', '56 Willow Way', '102 Cedar St', '', '', 1, 'None', 'sig3.png', '1', '2025-05-31 13:58:18', '2025-05-31 13:58:18', NULL, 1, NULL, NULL),
(4, 1004, 'SVS001', 11, 'Daniel Roy', '2011-01-15', '1', 'Christianity', '', 'AB+', 'Indian', 'photo4.jpg', '9000000004', 'Football', 'Team player', 'Robert Roy', '9111111114', '', 'Emily Roy', '9222222225', '', 'Guardian', '9333333336', '', '78 Birch Blvd', '110 Spruce Lane', '', '', 1, 'None', 'sig4.png', '1', '2025-05-31 13:58:18', '2025-05-31 13:58:18', NULL, 1, NULL, NULL),
(5, 1005, 'SVS001', 12, 'Ella Fernandes', '2011-05-23', '2', 'Hinduism', '', 'B-', 'Indian', 'photo5.jpg', '9000000005', 'Dance', 'Excellent discipline', 'Martin Fernandes', '9111111115', '', 'Sofia Fernandes', '9222222226', '', 'Uncle Raj', '9333333337', '', '90 Jasmine Path', '150 Tulip Crescent', '', '', 1, 'None', 'sig5.png', '1', '2025-05-31 13:58:18', '2025-05-31 13:58:18', NULL, 1, NULL, NULL),
(6, 1006, 'SVS001', 12, 'Felix Khan', '2011-07-30', '1', 'Islam', '', 'O-', 'Indian', 'photo6.jpg', '9000000006', 'Coding', 'Sharp thinker', 'Rashid Khan', '9111111116', '', 'Fatima Khan', '9222222227', '', 'Grandpa Khan', '9333333338', '', '112 River Road', '140 Palm Ave', '', '', 1, 'None', 'sig6.png', '1', '2025-05-31 13:58:18', '2025-05-31 13:58:18', NULL, 1, NULL, NULL),
(16, 1007, 'SVS001', 10, 'Student 1', '2010-01-01', '', 'ReligionA', '', 'O+', 'CountryX', NULL, '9000001007', 'Football', 'Note 1', 'Father 1', '90000011007', '', 'Mother 1', '90000021007', '', 'Guardian 1', '90000031007', '', 'Address 1', 'Address 1', '', '', 32767, 'Sibling 1', NULL, '', '2025-05-31 15:30:35', '2025-05-31 15:30:35', NULL, 1, 1, NULL),
(17, 1008, 'SVS001', 11, 'Student 2', '2010-02-02', '', 'ReligionB', '', 'A+', 'CountryX', NULL, '9000001008', 'Music', 'Note 2', 'Father 2', '90000011008', '', 'Mother 2', '90000021008', '', 'Guardian 2', '90000031008', '', 'Address 2', 'Address 2', '', '', 32767, 'Sibling 2', NULL, '', '2025-05-31 15:30:35', '2025-05-31 15:30:35', NULL, 1, 1, NULL),
(18, 1009, 'SVS001', 12, 'Student 3', '2010-03-03', '', 'ReligionC', '', 'B+', 'CountryX', NULL, '9000001009', 'Drama', 'Note 3', 'Father 3', '90000011009', '', 'Mother 3', '90000021009', '', 'Guardian 3', '90000031009', '', 'Address 3', 'Address 3', '', '', 32767, 'Sibling 3', NULL, '', '2025-05-31 15:30:35', '2025-05-31 15:30:35', NULL, 1, 1, NULL),
(19, 1010, 'SVS001', 10, 'Student 4', '2010-04-04', '', 'ReligionA', '', 'AB+', 'CountryX', NULL, '9000001010', 'Chess', 'Note 4', 'Father 4', '90000011010', '', 'Mother 4', '90000021010', '', 'Guardian 4', '90000031010', '', 'Address 4', 'Address 4', '', '', 32767, 'Sibling 4', NULL, '', '2025-05-31 15:30:35', '2025-05-31 15:30:35', NULL, 1, 1, NULL),
(20, 1011, 'SVS001', 11, 'Student 5', '2010-05-05', '', 'ReligionB', '', 'O-', 'CountryX', NULL, '9000001011', 'Painting', 'Note 5', 'Father 5', '90000011011', '', 'Mother 5', '90000021011', '', 'Guardian 5', '90000031011', '', 'Address 5', 'Address 5', '', '', 32767, 'Sibling 5', NULL, '', '2025-05-31 15:30:35', '2025-05-31 15:30:35', NULL, 1, 1, NULL),
(21, 1012, 'SVS001', 12, 'Student 6', '2010-06-06', '', 'ReligionC', '', 'A-', 'CountryX', NULL, '9000001012', 'Football', 'Note 6', 'Father 6', '90000011012', '', 'Mother 6', '90000021012', '', 'Guardian 6', '90000031012', '', 'Address 6', 'Address 6', '', '', 32767, 'Sibling 6', NULL, '', '2025-05-31 15:30:35', '2025-05-31 15:30:35', NULL, 1, 1, NULL),
(22, 1013, 'SVS001', 10, 'Student 7', '2010-07-07', '', 'ReligionA', '', 'B-', 'CountryX', NULL, '9000001013', 'Music', 'Note 7', 'Father 7', '90000011013', '', 'Mother 7', '90000021013', '', 'Guardian 7', '90000031013', '', 'Address 7', 'Address 7', '', '', 32767, 'Sibling 7', NULL, '', '2025-05-31 15:30:35', '2025-05-31 15:30:35', NULL, 1, 1, NULL),
(23, 1014, 'SVS001', 11, 'Student 8', '2010-08-08', '', 'ReligionB', '', 'O+', 'CountryX', NULL, '9000001014', 'Drama', 'Note 8', 'Father 8', '90000011014', '', 'Mother 8', '90000021014', '', 'Guardian 8', '90000031014', '', 'Address 8', 'Address 8', '', '', 32767, 'Sibling 8', NULL, '', '2025-05-31 15:30:35', '2025-05-31 15:30:35', NULL, 1, 1, NULL),
(24, 1015, 'SVS001', 12, 'Student 9', '2010-09-09', '', 'ReligionC', '', 'A+', 'CountryX', NULL, '9000001015', 'Chess', 'Note 9', 'Father 9', '90000011015', '', 'Mother 9', '90000021015', '', 'Guardian 9', '90000031015', '', 'Address 9', 'Address 9', '', '', 32767, 'Sibling 9', NULL, '', '2025-05-31 15:30:35', '2025-05-31 15:30:35', NULL, 1, 1, NULL),
(25, 1016, 'SVS001', 10, 'Student 10', '2010-10-10', '', 'ReligionA', '', 'B+', 'CountryX', NULL, '9000001016', 'Painting', 'Note 10', 'Father 10', '90000011016', '', 'Mother 10', '90000021016', '', 'Guardian 10', '90000031016', '', 'Address 10', 'Address 10', '', '', 32767, 'Sibling 10', NULL, '', '2025-05-31 15:30:35', '2025-05-31 15:30:35', NULL, 1, 1, NULL),
(26, 1017, 'SVS001', 11, 'Student 11', '2010-11-11', '', 'ReligionB', '', 'AB+', 'CountryX', NULL, '9000001017', 'Football', 'Note 11', 'Father 11', '90000011017', '', 'Mother 11', '90000021017', '', 'Guardian 11', '90000031017', '', 'Address 11', 'Address 11', '', '', 32767, 'Sibling 11', NULL, '', '2025-05-31 15:30:35', '2025-05-31 15:30:35', NULL, 1, 1, NULL),
(27, 1018, 'SVS001', 12, 'Student 12', '2010-12-12', '', 'ReligionC', '', 'O-', 'CountryX', NULL, '9000001018', 'Music', 'Note 12', 'Father 12', '90000011018', '', 'Mother 12', '90000021018', '', 'Guardian 12', '90000031018', '', 'Address 12', 'Address 12', '', '', 32767, 'Sibling 12', NULL, '', '2025-05-31 15:30:35', '2025-05-31 15:30:35', NULL, 1, 1, NULL),
(28, 1019, 'SVS001', 10, 'Student 13', '2010-01-13', '', 'ReligionA', '', 'A-', 'CountryX', NULL, '9000001019', 'Drama', 'Note 13', 'Father 13', '90000011019', '', 'Mother 13', '90000021019', '', 'Guardian 13', '90000031019', '', 'Address 13', 'Address 13', '', '', 32767, 'Sibling 13', NULL, '', '2025-05-31 15:30:35', '2025-05-31 15:30:35', NULL, 1, 1, NULL),
(29, 1020, 'SVS001', 11, 'Student 14', '2010-02-14', '', 'ReligionB', '', 'B-', 'CountryX', NULL, '9000001020', 'Chess', 'Note 14', 'Father 14', '90000011020', '', 'Mother 14', '90000021020', '', 'Guardian 14', '90000031020', '', 'Address 14', 'Address 14', '', '', 32767, 'Sibling 14', NULL, '', '2025-05-31 15:30:35', '2025-05-31 15:30:35', NULL, 1, 1, NULL),
(30, 1021, 'SVS001', 12, 'Student 15', '2010-03-15', '', 'ReligionC', '', 'O+', 'CountryX', NULL, '9000001021', 'Painting', 'Note 15', 'Father 15', '90000011021', '', 'Mother 15', '90000021021', '', 'Guardian 15', '90000031021', '', 'Address 15', 'Address 15', '', '', 32767, 'Sibling 15', NULL, '', '2025-05-31 15:30:35', '2025-05-31 15:30:35', NULL, 1, 1, NULL),
(31, 1022, 'SVS001', 10, 'Student 16', '2010-04-16', '', 'ReligionA', '', 'A+', 'CountryX', NULL, '9000001022', 'Football', 'Note 16', 'Father 16', '90000011022', '', 'Mother 16', '90000021022', '', 'Guardian 16', '90000031022', '', 'Address 16', 'Address 16', '', '', 32767, 'Sibling 16', NULL, '', '2025-05-31 15:30:35', '2025-05-31 15:30:35', NULL, 1, 1, NULL),
(32, 1023, 'SVS001', 11, 'Student 17', '2010-05-17', '', 'ReligionB', '', 'B+', 'CountryX', NULL, '9000001023', 'Music', 'Note 17', 'Father 17', '90000011023', '', 'Mother 17', '90000021023', '', 'Guardian 17', '90000031023', '', 'Address 17', 'Address 17', '', '', 32767, 'Sibling 17', NULL, '', '2025-05-31 15:30:35', '2025-05-31 15:30:35', NULL, 1, 1, NULL),
(33, 1024, 'SVS001', 12, 'Student 18', '2010-06-18', '', 'ReligionC', '', 'AB+', 'CountryX', NULL, '9000001024', 'Drama', 'Note 18', 'Father 18', '90000011024', '', 'Mother 18', '90000021024', '', 'Guardian 18', '90000031024', '', 'Address 18', 'Address 18', '', '', 32767, 'Sibling 18', NULL, '', '2025-05-31 15:30:35', '2025-05-31 15:30:35', NULL, 1, 1, NULL),
(34, 1025, 'SVS001', 10, 'Student 19', '2010-07-19', '', 'ReligionA', '', 'O-', 'CountryX', NULL, '9000001025', 'Chess', 'Note 19', 'Father 19', '90000011025', '', 'Mother 19', '90000021025', '', 'Guardian 19', '90000031025', '', 'Address 19', 'Address 19', '', '', 32767, 'Sibling 19', NULL, '', '2025-05-31 15:30:35', '2025-05-31 15:30:35', NULL, 1, 1, NULL),
(35, 1026, 'SVS001', 11, 'Student 20', '2010-08-20', '', 'ReligionB', '', 'A-', 'CountryX', NULL, '9000001026', 'Painting', 'Note 20', 'Father 20', '90000011026', '', 'Mother 20', '90000021026', '', 'Guardian 20', '90000031026', '', 'Address 20', 'Address 20', '', '', 32767, 'Sibling 20', NULL, '', '2025-05-31 15:30:35', '2025-05-31 15:30:35', NULL, 1, 1, NULL),
(36, 1027, 'SVS001', 12, 'Student 21', '2010-09-21', '', 'ReligionC', '', 'B-', 'CountryX', NULL, '9000001027', 'Football', 'Note 21', 'Father 21', '90000011027', '', 'Mother 21', '90000021027', '', 'Guardian 21', '90000031027', '', 'Address 21', 'Address 21', '', '', 32767, 'Sibling 21', NULL, '', '2025-05-31 15:30:35', '2025-05-31 15:30:35', NULL, 1, 1, NULL),
(37, 1028, 'SVS001', 10, 'Student 22', '2010-10-22', '', 'ReligionA', '', 'O+', 'CountryX', NULL, '9000001028', 'Music', 'Note 22', 'Father 22', '90000011028', '', 'Mother 22', '90000021028', '', 'Guardian 22', '90000031028', '', 'Address 22', 'Address 22', '', '', 32767, 'Sibling 22', NULL, '', '2025-05-31 15:30:35', '2025-05-31 15:30:35', NULL, 1, 1, NULL),
(38, 1029, 'SVS001', 11, 'Student 23', '2010-11-23', '', 'ReligionB', '', 'A+', 'CountryX', NULL, '9000001029', 'Drama', 'Note 23', 'Father 23', '90000011029', '', 'Mother 23', '90000021029', '', 'Guardian 23', '90000031029', '', 'Address 23', 'Address 23', '', '', 32767, 'Sibling 23', NULL, '', '2025-05-31 15:30:35', '2025-05-31 15:30:35', NULL, 1, 1, NULL),
(39, 1030, 'SVS001', 12, 'Student 24', '2010-12-24', '', 'ReligionC', '', 'B+', 'CountryX', NULL, '9000001030', 'Chess', 'Note 24', 'Father 24', '90000011030', '', 'Mother 24', '90000021030', '', 'Guardian 24', '90000031030', '', 'Address 24', 'Address 24', '', '', 32767, 'Sibling 24', NULL, '', '2025-05-31 15:30:35', '2025-05-31 15:30:35', NULL, 1, 1, NULL),
(40, 1031, 'SVS001', 10, 'Student 25', '2010-01-25', '', 'ReligionA', '', 'AB+', 'CountryX', NULL, '9000001031', 'Painting', 'Note 25', 'Father 25', '90000011031', '', 'Mother 25', '90000021031', '', 'Guardian 25', '90000031031', '', 'Address 25', 'Address 25', '', '', 32767, 'Sibling 25', NULL, '', '2025-05-31 15:30:35', '2025-05-31 15:30:35', NULL, 1, 1, NULL),
(41, 1032, 'SVS001', 11, 'Student 26', '2010-02-26', '', 'ReligionB', '', 'O-', 'CountryX', NULL, '9000001032', 'Football', 'Note 26', 'Father 26', '90000011032', '', 'Mother 26', '90000021032', '', 'Guardian 26', '90000031032', '', 'Address 26', 'Address 26', '', '', 32767, 'Sibling 26', NULL, '', '2025-05-31 15:30:35', '2025-05-31 15:30:35', NULL, 1, 1, NULL),
(42, 1033, 'SVS001', 12, 'Student 27', '2010-03-27', '', 'ReligionC', '', 'A-', 'CountryX', NULL, '9000001033', 'Music', 'Note 27', 'Father 27', '90000011033', '', 'Mother 27', '90000021033', '', 'Guardian 27', '90000031033', '', 'Address 27', 'Address 27', '', '', 32767, 'Sibling 27', NULL, '', '2025-05-31 15:30:35', '2025-05-31 15:30:35', NULL, 1, 1, NULL),
(43, 1034, 'SVS001', 10, 'Student 28', '2010-04-28', '', 'ReligionA', '', 'B-', 'CountryX', NULL, '9000001034', 'Drama', 'Note 28', 'Father 28', '90000011034', '', 'Mother 28', '90000021034', '', 'Guardian 28', '90000031034', '', 'Address 28', 'Address 28', '', '', 32767, 'Sibling 28', NULL, '', '2025-05-31 15:30:35', '2025-05-31 15:30:35', NULL, 1, 1, NULL),
(44, 1035, 'SVS001', 11, 'Student 29', '2010-05-01', '', 'ReligionB', '', 'O+', 'CountryX', NULL, '9000001035', 'Chess', 'Note 29', 'Father 29', '90000011035', '', 'Mother 29', '90000021035', '', 'Guardian 29', '90000031035', '', 'Address 29', 'Address 29', '', '', 32767, 'Sibling 29', NULL, '', '2025-05-31 15:30:35', '2025-05-31 15:30:35', NULL, 1, 1, NULL),
(45, 1036, 'SVS001', 12, 'Student 30', '2010-06-02', '', 'ReligionC', '', 'A+', 'CountryX', NULL, '9000001036', 'Painting', 'Note 30', 'Father 30', '90000011036', '', 'Mother 30', '90000021036', '', 'Guardian 30', '90000031036', '', 'Address 30', 'Address 30', '', '', 32767, 'Sibling 30', NULL, '', '2025-05-31 15:30:35', '2025-05-31 15:30:35', NULL, 1, 1, NULL),
(46, 1037, 'SVS001', 10, 'Student 31', '2010-07-03', '', 'ReligionA', '', 'B+', 'CountryX', NULL, '9000001037', 'Football', 'Note 31', 'Father 31', '90000011037', '', 'Mother 31', '90000021037', '', 'Guardian 31', '90000031037', '', 'Address 31', 'Address 31', '', '', 32767, 'Sibling 31', NULL, '', '2025-05-31 15:30:35', '2025-05-31 15:30:35', NULL, 1, 1, NULL),
(47, 1038, 'SVS001', 11, 'Student 32', '2010-08-04', '', 'ReligionB', '', 'AB+', 'CountryX', NULL, '9000001038', 'Music', 'Note 32', 'Father 32', '90000011038', '', 'Mother 32', '90000021038', '', 'Guardian 32', '90000031038', '', 'Address 32', 'Address 32', '', '', 32767, 'Sibling 32', NULL, '', '2025-05-31 15:30:35', '2025-05-31 15:30:35', NULL, 1, 1, NULL),
(48, 1039, 'SVS001', 12, 'Student 33', '2010-09-05', '', 'ReligionC', '', 'O-', 'CountryX', NULL, '9000001039', 'Drama', 'Note 33', 'Father 33', '90000011039', '', 'Mother 33', '90000021039', '', 'Guardian 33', '90000031039', '', 'Address 33', 'Address 33', '', '', 32767, 'Sibling 33', NULL, '', '2025-05-31 15:30:35', '2025-05-31 15:30:35', NULL, 1, 1, NULL),
(49, 1040, 'SVS001', 10, 'Student 34', '2010-10-06', '', 'ReligionA', '', 'A-', 'CountryX', NULL, '9000001040', 'Chess', 'Note 34', 'Father 34', '90000011040', '', 'Mother 34', '90000021040', '', 'Guardian 34', '90000031040', '', 'Address 34', 'Address 34', '', '', 32767, 'Sibling 34', NULL, '', '2025-05-31 15:30:35', '2025-05-31 15:30:35', NULL, 1, 1, NULL),
(50, 1041, 'SVS001', 11, 'Student 35', '2010-11-07', '', 'ReligionB', '', 'B-', 'CountryX', NULL, '9000001041', 'Painting', 'Note 35', 'Father 35', '90000011041', '', 'Mother 35', '90000021041', '', 'Guardian 35', '90000031041', '', 'Address 35', 'Address 35', '', '', 32767, 'Sibling 35', NULL, '', '2025-05-31 15:30:35', '2025-05-31 15:30:35', NULL, 1, 1, NULL),
(51, 1042, 'SVS001', 12, 'Student 36', '2010-12-08', '', 'ReligionC', '', 'O+', 'CountryX', NULL, '9000001042', 'Football', 'Note 36', 'Father 36', '90000011042', '', 'Mother 36', '90000021042', '', 'Guardian 36', '90000031042', '', 'Address 36', 'Address 36', '', '', 32767, 'Sibling 36', NULL, '', '2025-05-31 15:30:35', '2025-05-31 15:30:35', NULL, 1, 1, NULL),
(52, 1043, 'SVS001', 10, 'Student 37', '2010-01-09', '', 'ReligionA', '', 'A+', 'CountryX', NULL, '9000001043', 'Music', 'Note 37', 'Father 37', '90000011043', '', 'Mother 37', '90000021043', '', 'Guardian 37', '90000031043', '', 'Address 37', 'Address 37', '', '', 32767, 'Sibling 37', NULL, '', '2025-05-31 15:30:35', '2025-05-31 15:30:35', NULL, 1, 1, NULL),
(53, 1044, 'SVS001', 11, 'Student 38', '2010-02-10', '', 'ReligionB', '', 'B+', 'CountryX', NULL, '9000001044', 'Drama', 'Note 38', 'Father 38', '90000011044', '', 'Mother 38', '90000021044', '', 'Guardian 38', '90000031044', '', 'Address 38', 'Address 38', '', '', 32767, 'Sibling 38', NULL, '', '2025-05-31 15:30:35', '2025-05-31 15:30:35', NULL, 1, 1, NULL),
(54, 1045, 'SVS001', 12, 'Student 39', '2010-03-11', '', 'ReligionC', '', 'AB+', 'CountryX', NULL, '9000001045', 'Chess', 'Note 39', 'Father 39', '90000011045', '', 'Mother 39', '90000021045', '', 'Guardian 39', '90000031045', '', 'Address 39', 'Address 39', '', '', 32767, 'Sibling 39', NULL, '', '2025-05-31 15:30:35', '2025-05-31 15:30:35', NULL, 1, 1, NULL),
(55, 1046, 'SVS001', 10, 'Student 40', '2010-04-12', '', 'ReligionA', '', 'O-', 'CountryX', NULL, '9000001046', 'Painting', 'Note 40', 'Father 40', '90000011046', '', 'Mother 40', '90000021046', '', 'Guardian 40', '90000031046', '', 'Address 40', 'Address 40', '', '', 32767, 'Sibling 40', NULL, '', '2025-05-31 15:30:35', '2025-05-31 15:30:35', NULL, 1, 1, NULL),
(56, 1047, 'SVS001', 11, 'Student 41', '2010-05-13', '', 'ReligionB', '', 'A-', 'CountryX', NULL, '9000001047', 'Football', 'Note 41', 'Father 41', '90000011047', '', 'Mother 41', '90000021047', '', 'Guardian 41', '90000031047', '', 'Address 41', 'Address 41', '', '', 32767, 'Sibling 41', NULL, '', '2025-05-31 15:30:35', '2025-05-31 15:30:35', NULL, 1, 1, NULL),
(57, 1048, 'SVS001', 12, 'Student 42', '2010-06-14', '', 'ReligionC', '', 'B-', 'CountryX', NULL, '9000001048', 'Music', 'Note 42', 'Father 42', '90000011048', '', 'Mother 42', '90000021048', '', 'Guardian 42', '90000031048', '', 'Address 42', 'Address 42', '', '', 32767, 'Sibling 42', NULL, '', '2025-05-31 15:30:35', '2025-05-31 15:30:35', NULL, 1, 1, NULL),
(58, 1049, 'SVS001', 10, 'Student 43', '2010-07-15', '', 'ReligionA', '', 'O+', 'CountryX', NULL, '9000001049', 'Drama', 'Note 43', 'Father 43', '90000011049', '', 'Mother 43', '90000021049', '', 'Guardian 43', '90000031049', '', 'Address 43', 'Address 43', '', '', 32767, 'Sibling 43', NULL, '', '2025-05-31 15:30:35', '2025-05-31 15:30:35', NULL, 1, 1, NULL),
(59, 1050, 'SVS001', 11, 'Student 44', '2010-08-16', '', 'ReligionB', '', 'A+', 'CountryX', NULL, '9000001050', 'Chess', 'Note 44', 'Father 44', '90000011050', '', 'Mother 44', '90000021050', '', 'Guardian 44', '90000031050', '', 'Address 44', 'Address 44', '', '', 32767, 'Sibling 44', NULL, '', '2025-05-31 15:30:35', '2025-05-31 15:30:35', NULL, 1, 1, NULL),
(60, 1051, 'SVS001', 12, 'Student 45', '2010-09-17', '', 'ReligionC', '', 'B+', 'CountryX', NULL, '9000001051', 'Painting', 'Note 45', 'Father 45', '90000011051', '', 'Mother 45', '90000021051', '', 'Guardian 45', '90000031051', '', 'Address 45', 'Address 45', '', '', 32767, 'Sibling 45', NULL, '', '2025-05-31 15:30:35', '2025-05-31 15:30:35', NULL, 1, 1, NULL),
(61, 1052, 'SVS001', 10, 'Student 46', '2010-10-18', '', 'ReligionA', '', 'AB+', 'CountryX', NULL, '9000001052', 'Football', 'Note 46', 'Father 46', '90000011052', '', 'Mother 46', '90000021052', '', 'Guardian 46', '90000031052', '', 'Address 46', 'Address 46', '', '', 32767, 'Sibling 46', NULL, '', '2025-05-31 15:30:35', '2025-05-31 15:30:35', NULL, 1, 1, NULL),
(62, 1053, 'SVS001', 11, 'Student 47', '2010-11-19', '', 'ReligionB', '', 'O-', 'CountryX', NULL, '9000001053', 'Music', 'Note 47', 'Father 47', '90000011053', '', 'Mother 47', '90000021053', '', 'Guardian 47', '90000031053', '', 'Address 47', 'Address 47', '', '', 32767, 'Sibling 47', NULL, '', '2025-05-31 15:30:35', '2025-05-31 15:30:35', NULL, 1, 1, NULL),
(63, 1054, 'SVS001', 12, 'Student 48', '2010-12-20', '', 'ReligionC', '', 'A-', 'CountryX', NULL, '9000001054', 'Drama', 'Note 48', 'Father 48', '90000011054', '', 'Mother 48', '90000021054', '', 'Guardian 48', '90000031054', '', 'Address 48', 'Address 48', '', '', 32767, 'Sibling 48', NULL, '', '2025-05-31 15:30:35', '2025-05-31 15:30:35', NULL, 1, 1, NULL),
(64, 1055, 'SVS001', 10, 'Student 49', '2010-01-21', '', 'ReligionA', '', 'B-', 'CountryX', NULL, '9000001055', 'Chess', 'Note 49', 'Father 49', '90000011055', '', 'Mother 49', '90000021055', '', 'Guardian 49', '90000031055', '', 'Address 49', 'Address 49', '', '', 32767, 'Sibling 49', NULL, '', '2025-05-31 15:30:35', '2025-05-31 15:30:35', NULL, 1, 1, NULL),
(65, 1056, 'SVS001', 11, 'Student 50', '2010-02-22', '', 'ReligionB', '', 'O+', 'CountryX', NULL, '9000001056', 'Painting', 'Note 50', 'Father 50', '90000011056', '', 'Mother 50', '90000021056', '', 'Guardian 50', '90000031056', '', 'Address 50', 'Address 50', '', '', 32767, 'Sibling 50', NULL, '', '2025-05-31 15:30:35', '2025-05-31 15:30:35', NULL, 1, 1, NULL),
(66, 1057, 'SVS001', 12, 'Student 51', '2010-03-23', '', 'ReligionC', '', 'A+', 'CountryX', NULL, '9000001057', 'Football', 'Note 51', 'Father 51', '90000011057', '', 'Mother 51', '90000021057', '', 'Guardian 51', '90000031057', '', 'Address 51', 'Address 51', '', '', 32767, 'Sibling 51', NULL, '', '2025-05-31 15:30:35', '2025-05-31 15:30:35', NULL, 1, 1, NULL),
(67, 1058, 'SVS001', 10, 'Student 52', '2010-04-24', '', 'ReligionA', '', 'B+', 'CountryX', NULL, '9000001058', 'Music', 'Note 52', 'Father 52', '90000011058', '', 'Mother 52', '90000021058', '', 'Guardian 52', '90000031058', '', 'Address 52', 'Address 52', '', '', 32767, 'Sibling 52', NULL, '', '2025-05-31 15:30:35', '2025-05-31 15:30:35', NULL, 1, 1, NULL),
(68, 1059, 'SVS001', 11, 'Student 53', '2010-05-25', '', 'ReligionB', '', 'AB+', 'CountryX', NULL, '9000001059', 'Drama', 'Note 53', 'Father 53', '90000011059', '', 'Mother 53', '90000021059', '', 'Guardian 53', '90000031059', '', 'Address 53', 'Address 53', '', '', 32767, 'Sibling 53', NULL, '', '2025-05-31 15:30:35', '2025-05-31 15:30:35', NULL, 1, 1, NULL),
(69, 1060, 'SVS001', 12, 'Student 54', '2010-06-26', '', 'ReligionC', '', 'O-', 'CountryX', NULL, '9000001060', 'Chess', 'Note 54', 'Father 54', '90000011060', '', 'Mother 54', '90000021060', '', 'Guardian 54', '90000031060', '', 'Address 54', 'Address 54', '', '', 32767, 'Sibling 54', NULL, '', '2025-05-31 15:30:35', '2025-05-31 15:30:35', NULL, 1, 1, NULL),
(70, 1061, 'SVS001', 10, 'Student 55', '2010-07-27', '', 'ReligionA', '', 'A-', 'CountryX', NULL, '9000001061', 'Painting', 'Note 55', 'Father 55', '90000011061', '', 'Mother 55', '90000021061', '', 'Guardian 55', '90000031061', '', 'Address 55', 'Address 55', '', '', 32767, 'Sibling 55', NULL, '', '2025-05-31 15:30:35', '2025-05-31 15:30:35', NULL, 1, 1, NULL),
(71, 1062, 'SVS001', 11, 'Student 56', '2010-08-28', '', 'ReligionB', '', 'B-', 'CountryX', NULL, '9000001062', 'Football', 'Note 56', 'Father 56', '90000011062', '', 'Mother 56', '90000021062', '', 'Guardian 56', '90000031062', '', 'Address 56', 'Address 56', '', '', 32767, 'Sibling 56', NULL, '', '2025-05-31 15:30:35', '2025-05-31 15:30:35', NULL, 1, 1, NULL),
(72, 1063, 'SVS001', 12, 'Student 57', '2010-09-01', '', 'ReligionC', '', 'O+', 'CountryX', NULL, '9000001063', 'Music', 'Note 57', 'Father 57', '90000011063', '', 'Mother 57', '90000021063', '', 'Guardian 57', '90000031063', '', 'Address 57', 'Address 57', '', '', 32767, 'Sibling 57', NULL, '', '2025-05-31 15:30:35', '2025-05-31 15:30:35', NULL, 1, 1, NULL),
(73, 1064, 'SVS001', 10, 'Student 58', '2010-10-02', '', 'ReligionA', '', 'A+', 'CountryX', NULL, '9000001064', 'Drama', 'Note 58', 'Father 58', '90000011064', '', 'Mother 58', '90000021064', '', 'Guardian 58', '90000031064', '', 'Address 58', 'Address 58', '', '', 32767, 'Sibling 58', NULL, '', '2025-05-31 15:30:35', '2025-05-31 15:30:35', NULL, 1, 1, NULL),
(74, 1065, 'SVS001', 11, 'Student 59', '2010-11-03', '', 'ReligionB', '', 'B+', 'CountryX', NULL, '9000001065', 'Chess', 'Note 59', 'Father 59', '90000011065', '', 'Mother 59', '90000021065', '', 'Guardian 59', '90000031065', '', 'Address 59', 'Address 59', '', '', 32767, 'Sibling 59', NULL, '', '2025-05-31 15:30:35', '2025-05-31 15:30:35', NULL, 1, 1, NULL),
(75, 1066, 'SVS001', 12, 'Student 60', '2010-12-04', '', 'ReligionC', '', 'AB+', 'CountryX', NULL, '9000001066', 'Painting', 'Note 60', 'Father 60', '90000011066', '', 'Mother 60', '90000021066', '', 'Guardian 60', '90000031066', '', 'Address 60', 'Address 60', '', '', 32767, 'Sibling 60', NULL, '', '2025-05-31 15:30:35', '2025-05-31 15:30:35', NULL, 1, 1, NULL),
(76, 1067, 'SVS001', 10, 'Student 61', '2010-01-05', '', 'ReligionA', '', 'O-', 'CountryX', NULL, '9000001067', 'Football', 'Note 61', 'Father 61', '90000011067', '', 'Mother 61', '90000021067', '', 'Guardian 61', '90000031067', '', 'Address 61', 'Address 61', '', '', 32767, 'Sibling 61', NULL, '', '2025-05-31 15:30:35', '2025-05-31 15:30:35', NULL, 1, 1, NULL),
(77, 1068, 'SVS001', 11, 'Student 62', '2010-02-06', '', 'ReligionB', '', 'A-', 'CountryX', NULL, '9000001068', 'Music', 'Note 62', 'Father 62', '90000011068', '', 'Mother 62', '90000021068', '', 'Guardian 62', '90000031068', '', 'Address 62', 'Address 62', '', '', 32767, 'Sibling 62', NULL, '', '2025-05-31 15:30:35', '2025-05-31 15:30:35', NULL, 1, 1, NULL),
(78, 1069, 'SVS001', 12, 'Student 63', '2010-03-07', '', 'ReligionC', '', 'B-', 'CountryX', NULL, '9000001069', 'Drama', 'Note 63', 'Father 63', '90000011069', '', 'Mother 63', '90000021069', '', 'Guardian 63', '90000031069', '', 'Address 63', 'Address 63', '', '', 32767, 'Sibling 63', NULL, '', '2025-05-31 15:30:35', '2025-05-31 15:30:35', NULL, 1, 1, NULL),
(79, 1070, 'SVS001', 10, 'Student 64', '2010-04-08', '', 'ReligionA', '', 'O+', 'CountryX', NULL, '9000001070', 'Chess', 'Note 64', 'Father 64', '90000011070', '', 'Mother 64', '90000021070', '', 'Guardian 64', '90000031070', '', 'Address 64', 'Address 64', '', '', 32767, 'Sibling 64', NULL, '', '2025-05-31 15:30:35', '2025-05-31 15:30:35', NULL, 1, 1, NULL),
(80, 1071, 'SVS001', 11, 'Student 65', '2010-05-09', '', 'ReligionB', '', 'A+', 'CountryX', NULL, '9000001071', 'Painting', 'Note 65', 'Father 65', '90000011071', '', 'Mother 65', '90000021071', '', 'Guardian 65', '90000031071', '', 'Address 65', 'Address 65', '', '', 32767, 'Sibling 65', NULL, '', '2025-05-31 15:30:35', '2025-05-31 15:30:35', NULL, 1, 1, NULL),
(81, 1072, 'SVS001', 12, 'Student 66', '2010-06-10', '', 'ReligionC', '', 'B+', 'CountryX', NULL, '9000001072', 'Football', 'Note 66', 'Father 66', '90000011072', '', 'Mother 66', '90000021072', '', 'Guardian 66', '90000031072', '', 'Address 66', 'Address 66', '', '', 32767, 'Sibling 66', NULL, '', '2025-05-31 15:30:35', '2025-05-31 15:30:35', NULL, 1, 1, NULL),
(82, 1073, 'SVS001', 10, 'Student 67', '2010-07-11', '', 'ReligionA', '', 'AB+', 'CountryX', NULL, '9000001073', 'Music', 'Note 67', 'Father 67', '90000011073', '', 'Mother 67', '90000021073', '', 'Guardian 67', '90000031073', '', 'Address 67', 'Address 67', '', '', 32767, 'Sibling 67', NULL, '', '2025-05-31 15:30:35', '2025-05-31 15:30:35', NULL, 1, 1, NULL),
(83, 1074, 'SVS001', 11, 'Student 68', '2010-08-12', '', 'ReligionB', '', 'O-', 'CountryX', NULL, '9000001074', 'Drama', 'Note 68', 'Father 68', '90000011074', '', 'Mother 68', '90000021074', '', 'Guardian 68', '90000031074', '', 'Address 68', 'Address 68', '', '', 32767, 'Sibling 68', NULL, '', '2025-05-31 15:30:35', '2025-05-31 15:30:35', NULL, 1, 1, NULL),
(84, 1075, 'SVS001', 12, 'Student 69', '2010-09-13', '', 'ReligionC', '', 'A-', 'CountryX', NULL, '9000001075', 'Chess', 'Note 69', 'Father 69', '90000011075', '', 'Mother 69', '90000021075', '', 'Guardian 69', '90000031075', '', 'Address 69', 'Address 69', '', '', 32767, 'Sibling 69', NULL, '', '2025-05-31 15:30:35', '2025-05-31 15:30:35', NULL, 1, 1, NULL),
(85, 1076, 'SVS001', 10, 'Student 70', '2010-10-14', '', 'ReligionA', '', 'B-', 'CountryX', NULL, '9000001076', 'Painting', 'Note 70', 'Father 70', '90000011076', '', 'Mother 70', '90000021076', '', 'Guardian 70', '90000031076', '', 'Address 70', 'Address 70', '', '', 32767, 'Sibling 70', NULL, '', '2025-05-31 15:30:35', '2025-05-31 15:30:35', NULL, 1, 1, NULL),
(86, 1077, 'SVS001', 11, 'Student 71', '2010-11-15', '', 'ReligionB', '', 'O+', 'CountryX', NULL, '9000001077', 'Football', 'Note 71', 'Father 71', '90000011077', '', 'Mother 71', '90000021077', '', 'Guardian 71', '90000031077', '', 'Address 71', 'Address 71', '', '', 32767, 'Sibling 71', NULL, '', '2025-05-31 15:30:35', '2025-05-31 15:30:35', NULL, 1, 1, NULL),
(87, 1078, 'SVS001', 12, 'Student 72', '2010-12-16', '', 'ReligionC', '', 'A+', 'CountryX', NULL, '9000001078', 'Music', 'Note 72', 'Father 72', '90000011078', '', 'Mother 72', '90000021078', '', 'Guardian 72', '90000031078', '', 'Address 72', 'Address 72', '', '', 32767, 'Sibling 72', NULL, '', '2025-05-31 15:30:35', '2025-05-31 15:30:35', NULL, 1, 1, NULL),
(88, 1079, 'SVS001', 10, 'Student 73', '2010-01-17', '', 'ReligionA', '', 'B+', 'CountryX', NULL, '9000001079', 'Drama', 'Note 73', 'Father 73', '90000011079', '', 'Mother 73', '90000021079', '', 'Guardian 73', '90000031079', '', 'Address 73', 'Address 73', '', '', 32767, 'Sibling 73', NULL, '', '2025-05-31 15:30:35', '2025-05-31 15:30:35', NULL, 1, 1, NULL),
(89, 1080, 'SVS001', 11, 'Student 74', '2010-02-18', '', 'ReligionB', '', 'AB+', 'CountryX', NULL, '9000001080', 'Chess', 'Note 74', 'Father 74', '90000011080', '', 'Mother 74', '90000021080', '', 'Guardian 74', '90000031080', '', 'Address 74', 'Address 74', '', '', 32767, 'Sibling 74', NULL, '', '2025-05-31 15:30:35', '2025-05-31 15:30:35', NULL, 1, 1, NULL),
(90, 1081, 'SVS001', 12, 'Student 75', '2010-03-19', '', 'ReligionC', '', 'O-', 'CountryX', NULL, '9000001081', 'Painting', 'Note 75', 'Father 75', '90000011081', '', 'Mother 75', '90000021081', '', 'Guardian 75', '90000031081', '', 'Address 75', 'Address 75', '', '', 32767, 'Sibling 75', NULL, '', '2025-05-31 15:30:35', '2025-05-31 15:30:35', NULL, 1, 1, NULL),
(91, 1082, 'SVS001', 10, 'Student 76', '2010-04-20', '', 'ReligionA', '', 'A-', 'CountryX', NULL, '9000001082', 'Football', 'Note 76', 'Father 76', '90000011082', '', 'Mother 76', '90000021082', '', 'Guardian 76', '90000031082', '', 'Address 76', 'Address 76', '', '', 32767, 'Sibling 76', NULL, '', '2025-05-31 15:30:35', '2025-05-31 15:30:35', NULL, 1, 1, NULL),
(92, 1083, 'SVS001', 11, 'Student 77', '2010-05-21', '', 'ReligionB', '', 'B-', 'CountryX', NULL, '9000001083', 'Music', 'Note 77', 'Father 77', '90000011083', '', 'Mother 77', '90000021083', '', 'Guardian 77', '90000031083', '', 'Address 77', 'Address 77', '', '', 32767, 'Sibling 77', NULL, '', '2025-05-31 15:30:35', '2025-05-31 15:30:35', NULL, 1, 1, NULL),
(93, 1084, 'SVS001', 12, 'Student 78', '2010-06-22', '', 'ReligionC', '', 'O+', 'CountryX', NULL, '9000001084', 'Drama', 'Note 78', 'Father 78', '90000011084', '', 'Mother 78', '90000021084', '', 'Guardian 78', '90000031084', '', 'Address 78', 'Address 78', '', '', 32767, 'Sibling 78', NULL, '', '2025-05-31 15:30:35', '2025-05-31 15:30:35', NULL, 1, 1, NULL),
(94, 1085, 'SVS001', 10, 'Student 79', '2010-07-23', '', 'ReligionA', '', 'A+', 'CountryX', NULL, '9000001085', 'Chess', 'Note 79', 'Father 79', '90000011085', '', 'Mother 79', '90000021085', '', 'Guardian 79', '90000031085', '', 'Address 79', 'Address 79', '', '', 32767, 'Sibling 79', NULL, '', '2025-05-31 15:30:35', '2025-05-31 15:30:35', NULL, 1, 1, NULL),
(95, 1086, 'SVS001', 11, 'Student 80', '2010-08-24', '', 'ReligionB', '', 'B+', 'CountryX', NULL, '9000001086', 'Painting', 'Note 80', 'Father 80', '90000011086', '', 'Mother 80', '90000021086', '', 'Guardian 80', '90000031086', '', 'Address 80', 'Address 80', '', '', 32767, 'Sibling 80', NULL, '', '2025-05-31 15:30:35', '2025-05-31 15:30:35', NULL, 1, 1, NULL),
(96, 1087, 'SVS001', 12, 'Student 81', '2010-09-25', '', 'ReligionC', '', 'AB+', 'CountryX', NULL, '9000001087', 'Football', 'Note 81', 'Father 81', '90000011087', '', 'Mother 81', '90000021087', '', 'Guardian 81', '90000031087', '', 'Address 81', 'Address 81', '', '', 32767, 'Sibling 81', NULL, '', '2025-05-31 15:30:35', '2025-05-31 15:30:35', NULL, 1, 1, NULL),
(97, 1088, 'SVS001', 10, 'Student 82', '2010-10-26', '', 'ReligionA', '', 'O-', 'CountryX', NULL, '9000001088', 'Music', 'Note 82', 'Father 82', '90000011088', '', 'Mother 82', '90000021088', '', 'Guardian 82', '90000031088', '', 'Address 82', 'Address 82', '', '', 32767, 'Sibling 82', NULL, '', '2025-05-31 15:30:35', '2025-05-31 15:30:35', NULL, 1, 1, NULL),
(98, 1089, 'SVS001', 11, 'Student 83', '2010-11-27', '', 'ReligionB', '', 'A-', 'CountryX', NULL, '9000001089', 'Drama', 'Note 83', 'Father 83', '90000011089', '', 'Mother 83', '90000021089', '', 'Guardian 83', '90000031089', '', 'Address 83', 'Address 83', '', '', 32767, 'Sibling 83', NULL, '', '2025-05-31 15:30:35', '2025-05-31 15:30:35', NULL, 1, 1, NULL),
(99, 1090, 'SVS001', 12, 'Student 84', '2010-12-28', '', 'ReligionC', '', 'B-', 'CountryX', NULL, '9000001090', 'Chess', 'Note 84', 'Father 84', '90000011090', '', 'Mother 84', '90000021090', '', 'Guardian 84', '90000031090', '', 'Address 84', 'Address 84', '', '', 32767, 'Sibling 84', NULL, '', '2025-05-31 15:30:35', '2025-05-31 15:30:35', NULL, 1, 1, NULL),
(100, 1091, 'SVS001', 10, 'Student 85', '2010-01-01', '', 'ReligionA', '', 'O+', 'CountryX', NULL, '9000001091', 'Painting', 'Note 85', 'Father 85', '90000011091', '', 'Mother 85', '90000021091', '', 'Guardian 85', '90000031091', '', 'Address 85', 'Address 85', '', '', 32767, 'Sibling 85', NULL, '', '2025-05-31 15:30:35', '2025-05-31 15:30:35', NULL, 1, 1, NULL),
(101, 1092, 'SVS001', 11, 'Student 86', '2010-02-02', '', 'ReligionB', '', 'A+', 'CountryX', NULL, '9000001092', 'Football', 'Note 86', 'Father 86', '90000011092', '', 'Mother 86', '90000021092', '', 'Guardian 86', '90000031092', '', 'Address 86', 'Address 86', '', '', 32767, 'Sibling 86', NULL, '', '2025-05-31 15:30:35', '2025-05-31 15:30:35', NULL, 1, 1, NULL),
(102, 1093, 'SVS001', 12, 'Student 87', '2010-03-03', '', 'ReligionC', '', 'B+', 'CountryX', NULL, '9000001093', 'Music', 'Note 87', 'Father 87', '90000011093', '', 'Mother 87', '90000021093', '', 'Guardian 87', '90000031093', '', 'Address 87', 'Address 87', '', '', 32767, 'Sibling 87', NULL, '', '2025-05-31 15:30:35', '2025-05-31 15:30:35', NULL, 1, 1, NULL),
(103, 1094, 'SVS001', 10, 'Student 88', '2010-04-04', '', 'ReligionA', '', 'AB+', 'CountryX', NULL, '9000001094', 'Drama', 'Note 88', 'Father 88', '90000011094', '', 'Mother 88', '90000021094', '', 'Guardian 88', '90000031094', '', 'Address 88', 'Address 88', '', '', 32767, 'Sibling 88', NULL, '', '2025-05-31 15:30:35', '2025-05-31 15:30:35', NULL, 1, 1, NULL),
(104, 1095, 'SVS001', 11, 'Student 89', '2010-05-05', '', 'ReligionB', '', 'O-', 'CountryX', NULL, '9000001095', 'Chess', 'Note 89', 'Father 89', '90000011095', '', 'Mother 89', '90000021095', '', 'Guardian 89', '90000031095', '', 'Address 89', 'Address 89', '', '', 32767, 'Sibling 89', NULL, '', '2025-05-31 15:30:35', '2025-05-31 15:30:35', NULL, 1, 1, NULL),
(105, 1096, 'SVS001', 12, 'Student 90', '2010-06-06', '', 'ReligionC', '', 'A-', 'CountryX', NULL, '9000001096', 'Painting', 'Note 90', 'Father 90', '90000011096', '', 'Mother 90', '90000021096', '', 'Guardian 90', '90000031096', '', 'Address 90', 'Address 90', '', '', 32767, 'Sibling 90', NULL, '', '2025-05-31 15:30:35', '2025-05-31 15:30:35', NULL, 1, 1, NULL),
(106, 1097, 'SVS001', 10, 'Student 91', '2010-07-07', '', 'ReligionA', '', 'B-', 'CountryX', NULL, '9000001097', 'Football', 'Note 91', 'Father 91', '90000011097', '', 'Mother 91', '90000021097', '', 'Guardian 91', '90000031097', '', 'Address 91', 'Address 91', '', '', 32767, 'Sibling 91', NULL, '', '2025-05-31 15:30:35', '2025-05-31 15:30:35', NULL, 1, 1, NULL),
(107, 1098, 'SVS001', 11, 'Student 92', '2010-08-08', '', 'ReligionB', '', 'O+', 'CountryX', NULL, '9000001098', 'Music', 'Note 92', 'Father 92', '90000011098', '', 'Mother 92', '90000021098', '', 'Guardian 92', '90000031098', '', 'Address 92', 'Address 92', '', '', 32767, 'Sibling 92', NULL, '', '2025-05-31 15:30:35', '2025-05-31 15:30:35', NULL, 1, 1, NULL),
(108, 1099, 'SVS001', 12, 'Student 93', '2010-09-09', '', 'ReligionC', '', 'A+', 'CountryX', NULL, '9000001099', 'Drama', 'Note 93', 'Father 93', '90000011099', '', 'Mother 93', '90000021099', '', 'Guardian 93', '90000031099', '', 'Address 93', 'Address 93', '', '', 32767, 'Sibling 93', NULL, '', '2025-05-31 15:30:35', '2025-05-31 15:30:35', NULL, 1, 1, NULL),
(109, 1100, 'SVS001', 10, 'Student 94', '2010-10-10', '', 'ReligionA', '', 'B+', 'CountryX', NULL, '9000001100', 'Chess', 'Note 94', 'Father 94', '90000011100', '', 'Mother 94', '90000021100', '', 'Guardian 94', '90000031100', '', 'Address 94', 'Address 94', '', '', 32767, 'Sibling 94', NULL, '', '2025-05-31 15:30:35', '2025-05-31 15:30:35', NULL, 1, 1, NULL),
(110, 1101, 'SVS001', 11, 'Student 95', '2010-11-11', '', 'ReligionB', '', 'AB+', 'CountryX', NULL, '9000001101', 'Painting', 'Note 95', 'Father 95', '90000011101', '', 'Mother 95', '90000021101', '', 'Guardian 95', '90000031101', '', 'Address 95', 'Address 95', '', '', 32767, 'Sibling 95', NULL, '', '2025-05-31 15:30:35', '2025-05-31 15:30:35', NULL, 1, 1, NULL),
(111, 1102, 'SVS001', 12, 'Student 96', '2010-12-12', '', 'ReligionC', '', 'O-', 'CountryX', NULL, '9000001102', 'Football', 'Note 96', 'Father 96', '90000011102', '', 'Mother 96', '90000021102', '', 'Guardian 96', '90000031102', '', 'Address 96', 'Address 96', '', '', 32767, 'Sibling 96', NULL, '', '2025-05-31 15:30:35', '2025-05-31 15:30:35', NULL, 1, 1, NULL),
(112, 1103, 'SVS001', 10, 'Student 97', '2010-01-13', '', 'ReligionA', '', 'A-', 'CountryX', NULL, '9000001103', 'Music', 'Note 97', 'Father 97', '90000011103', '', 'Mother 97', '90000021103', '', 'Guardian 97', '90000031103', '', 'Address 97', 'Address 97', '', '', 32767, 'Sibling 97', NULL, '', '2025-05-31 15:30:35', '2025-05-31 15:30:35', NULL, 1, 1, NULL),
(113, 1104, 'SVS001', 11, 'Student 98', '2010-02-14', '', 'ReligionB', '', 'B-', 'CountryX', NULL, '9000001104', 'Drama', 'Note 98', 'Father 98', '90000011104', '', 'Mother 98', '90000021104', '', 'Guardian 98', '90000031104', '', 'Address 98', 'Address 98', '', '', 32767, 'Sibling 98', NULL, '', '2025-05-31 15:30:35', '2025-05-31 15:30:35', NULL, 1, 1, NULL),
(114, 1105, 'SVS001', 12, 'Student 99', '2010-03-15', '', 'ReligionC', '', 'O+', 'CountryX', NULL, '9000001105', 'Chess', 'Note 99', 'Father 99', '90000011105', '', 'Mother 99', '90000021105', '', 'Guardian 99', '90000031105', '', 'Address 99', 'Address 99', '', '', 32767, 'Sibling 99', NULL, '', '2025-05-31 15:30:35', '2025-05-31 15:30:35', NULL, 1, 1, NULL),
(115, 1106, 'SVS001', 10, 'Student 100', '2010-04-16', '', 'ReligionA', '', 'A+', 'CountryX', NULL, '9000001106', 'Painting', 'Note 100', 'Father 100', '90000011106', '', 'Mother 100', '90000021106', '', 'Guardian 100', '90000031106', '', 'Address 100', 'Address 100', '', '', 32767, 'Sibling 100', NULL, '', '2025-05-31 15:30:35', '2025-05-31 15:30:35', NULL, 1, 1, NULL),
(118, 1108, 'SVS001', 10, 'godwin cthomas', '2025-06-08', '', 'other', 'godwin@gmail.com', 'o', 'Indian', NULL, '9741009810', '', 'SSADSAD', 'godwin', NULL, 'godwin@gmail.com', 'godwin', '9741009810', 'godwin@gmail.com', 'godwin', '9741009810', 'godwin@gmail.com', 'Cheeyod', 'Godwin Villa', '-', 'other', 32767, '', '', '0', '2025-06-21 18:07:28', '2025-06-21 18:07:28', NULL, 1, 1, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `student_attendances`
--

CREATE TABLE `student_attendances` (
  `id` int UNSIGNED NOT NULL,
  `academic_year_id` int UNSIGNED NOT NULL,
  `class_id` int UNSIGNED NOT NULL,
  `registration_id` int UNSIGNED DEFAULT NULL,
  `attendance_date` date NOT NULL,
  `in_time` datetime NOT NULL,
  `status` varchar(20) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `present` enum('0','1') COLLATE utf8mb3_unicode_ci NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_by` int UNSIGNED DEFAULT NULL,
  `updated_by` int UNSIGNED DEFAULT NULL,
  `deleted_by` int UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Dumping data for table `student_attendances`
--

INSERT INTO `student_attendances` (`id`, `academic_year_id`, `class_id`, `registration_id`, `attendance_date`, `in_time`, `status`, `present`, `created_at`, `updated_at`, `deleted_at`, `created_by`, `updated_by`, `deleted_by`) VALUES
(70, 1, 10, 1002, '2025-06-09', '0000-00-00 00:00:00', 'Marked', '', '2025-06-13 18:53:28', '2025-06-13 18:53:28', NULL, 1, 1, NULL),
(73, 1, 10, 15, '2025-06-13', '2025-06-13 19:27:47', '1', '1', '2025-06-13 19:27:47', '2025-06-13 19:27:47', NULL, NULL, NULL, NULL),
(74, 1, 10, 15, '2025-06-14', '2025-06-14 02:23:08', '1', '1', '2025-06-14 02:23:08', '2025-06-14 02:23:08', NULL, NULL, NULL, NULL),
(75, 1, 10, 1002, '2025-06-14', '2025-06-14 03:42:59', '1', '1', '2025-06-14 03:42:59', '2025-06-14 03:42:59', NULL, NULL, NULL, NULL),
(76, 1, 10, 1007, '2025-06-14', '2025-06-14 07:49:21', '1', '1', '2025-06-14 07:49:21', '2025-06-14 07:49:21', NULL, NULL, NULL, NULL),
(77, 1, 10, 1010, '2025-06-14', '2025-06-14 07:49:21', '1', '1', '2025-06-14 07:49:21', '2025-06-14 07:49:21', NULL, NULL, NULL, NULL),
(78, 1, 10, 1013, '2025-06-14', '2025-06-14 07:49:21', '1', '1', '2025-06-14 07:49:21', '2025-06-14 07:49:21', NULL, NULL, NULL, NULL),
(79, 1, 10, 1016, '2025-06-14', '2025-06-14 07:49:21', '1', '1', '2025-06-14 07:49:21', '2025-06-14 07:49:21', NULL, NULL, NULL, NULL),
(80, 1, 10, 1019, '2025-06-14', '2025-06-14 07:49:21', '1', '1', '2025-06-14 07:49:21', '2025-06-14 07:49:21', NULL, NULL, NULL, NULL),
(81, 1, 10, 1022, '2025-06-14', '2025-06-14 07:49:21', '1', '1', '2025-06-14 07:49:21', '2025-06-14 07:49:21', NULL, NULL, NULL, NULL),
(82, 1, 10, 1025, '2025-06-14', '2025-06-14 07:49:21', '1', '1', '2025-06-14 07:49:21', '2025-06-14 07:49:21', NULL, NULL, NULL, NULL),
(83, 1, 10, 1028, '2025-06-14', '2025-06-14 07:49:21', '1', '1', '2025-06-14 07:49:21', '2025-06-14 07:49:21', NULL, NULL, NULL, NULL),
(84, 1, 10, 1031, '2025-06-14', '2025-06-14 07:49:21', '1', '1', '2025-06-14 07:49:21', '2025-06-14 07:49:21', NULL, NULL, NULL, NULL),
(85, 1, 10, 1034, '2025-06-14', '2025-06-14 07:49:21', '1', '1', '2025-06-14 07:49:21', '2025-06-14 07:49:21', NULL, NULL, NULL, NULL),
(86, 1, 10, 1037, '2025-06-14', '2025-06-14 07:49:21', '1', '1', '2025-06-14 07:49:21', '2025-06-14 07:49:21', NULL, NULL, NULL, NULL),
(87, 1, 10, 1040, '2025-06-14', '2025-06-14 07:49:21', '1', '1', '2025-06-14 07:49:21', '2025-06-14 07:49:21', NULL, NULL, NULL, NULL),
(88, 1, 10, 1043, '2025-06-14', '2025-06-14 07:49:21', '1', '1', '2025-06-14 07:49:21', '2025-06-14 07:49:21', NULL, NULL, NULL, NULL),
(89, 1, 10, 1046, '2025-06-14', '2025-06-14 07:49:21', '1', '1', '2025-06-14 07:49:21', '2025-06-14 07:49:21', NULL, NULL, NULL, NULL),
(90, 1, 10, 1049, '2025-06-14', '2025-06-14 07:49:21', '1', '1', '2025-06-14 07:49:21', '2025-06-14 07:49:21', NULL, NULL, NULL, NULL),
(91, 1, 10, 1052, '2025-06-14', '2025-06-14 07:49:21', '1', '1', '2025-06-14 07:49:21', '2025-06-14 07:49:21', NULL, NULL, NULL, NULL),
(92, 1, 10, 1055, '2025-06-14', '2025-06-14 07:49:21', '1', '1', '2025-06-14 07:49:21', '2025-06-14 07:49:21', NULL, NULL, NULL, NULL),
(93, 1, 10, 1058, '2025-06-14', '2025-06-14 07:49:21', '1', '1', '2025-06-14 07:49:21', '2025-06-14 07:49:21', NULL, NULL, NULL, NULL),
(94, 1, 10, 1061, '2025-06-14', '2025-06-14 07:49:21', '1', '1', '2025-06-14 07:49:21', '2025-06-14 07:49:21', NULL, NULL, NULL, NULL),
(95, 1, 10, 1064, '2025-06-14', '2025-06-14 07:49:21', '1', '1', '2025-06-14 07:49:21', '2025-06-14 07:49:21', NULL, NULL, NULL, NULL),
(96, 1, 10, 1067, '2025-06-14', '2025-06-14 07:49:21', '1', '1', '2025-06-14 07:49:21', '2025-06-14 07:49:21', NULL, NULL, NULL, NULL),
(97, 1, 10, 1070, '2025-06-14', '2025-06-14 07:49:21', '1', '1', '2025-06-14 07:49:21', '2025-06-14 07:49:21', NULL, NULL, NULL, NULL),
(98, 1, 10, 1073, '2025-06-14', '2025-06-14 07:49:21', '1', '1', '2025-06-14 07:49:21', '2025-06-14 07:49:21', NULL, NULL, NULL, NULL),
(99, 1, 10, 1076, '2025-06-14', '2025-06-14 07:49:21', '1', '1', '2025-06-14 07:49:21', '2025-06-14 07:49:21', NULL, NULL, NULL, NULL),
(100, 1, 10, 1079, '2025-06-14', '2025-06-14 07:49:21', '1', '1', '2025-06-14 07:49:21', '2025-06-14 07:49:21', NULL, NULL, NULL, NULL),
(101, 1, 10, 1082, '2025-06-14', '2025-06-14 07:49:21', '1', '1', '2025-06-14 07:49:21', '2025-06-14 07:49:21', NULL, NULL, NULL, NULL),
(102, 1, 10, 1085, '2025-06-14', '2025-06-14 07:49:21', '1', '1', '2025-06-14 07:49:21', '2025-06-14 07:49:21', NULL, NULL, NULL, NULL),
(103, 1, 10, 1088, '2025-06-14', '2025-06-14 07:49:21', '1', '1', '2025-06-14 07:49:21', '2025-06-14 07:49:21', NULL, NULL, NULL, NULL),
(104, 1, 10, 1091, '2025-06-14', '2025-06-14 07:49:21', '1', '1', '2025-06-14 07:49:21', '2025-06-14 07:49:21', NULL, NULL, NULL, NULL),
(105, 1, 10, 1094, '2025-06-14', '2025-06-14 07:49:21', '1', '1', '2025-06-14 07:49:21', '2025-06-14 07:49:21', NULL, NULL, NULL, NULL),
(106, 1, 10, 1097, '2025-06-14', '2025-06-14 07:49:21', '1', '1', '2025-06-14 07:49:21', '2025-06-14 07:49:21', NULL, NULL, NULL, NULL),
(107, 1, 10, 1100, '2025-06-14', '2025-06-14 07:49:21', '1', '1', '2025-06-14 07:49:21', '2025-06-14 07:49:21', NULL, NULL, NULL, NULL),
(108, 1, 10, 1103, '2025-06-14', '2025-06-14 07:49:21', '1', '1', '2025-06-14 07:49:21', '2025-06-14 07:49:21', NULL, NULL, NULL, NULL),
(109, 1, 10, 1106, '2025-06-14', '2025-06-14 07:49:21', '1', '1', '2025-06-14 07:49:21', '2025-06-14 07:49:21', NULL, NULL, NULL, NULL),
(110, 1, 10, 1002, '2025-06-21', '2025-06-21 16:45:30', '1', '1', '2025-06-21 16:45:30', '2025-06-21 16:45:30', NULL, NULL, NULL, NULL),
(111, 1, 10, 1007, '2025-07-17', '2025-07-17 06:43:56', '1', '1', '2025-07-17 06:43:56', '2025-07-17 06:43:56', NULL, NULL, NULL, NULL),
(112, 1, 10, 1010, '2025-07-17', '2025-07-17 06:43:58', '1', '1', '2025-07-17 06:43:58', '2025-07-17 06:43:58', NULL, NULL, NULL, NULL),
(113, 1, 10, 15, '2025-07-17', '2025-07-17 06:44:05', '1', '1', '2025-07-17 06:44:05', '2025-07-17 06:44:05', NULL, NULL, NULL, NULL),
(114, 1, 10, 1002, '2025-07-17', '2025-07-17 06:44:05', '1', '1', '2025-07-17 06:44:05', '2025-07-17 06:44:05', NULL, NULL, NULL, NULL),
(115, 1, 10, 1013, '2025-07-17', '2025-07-17 06:44:05', '1', '1', '2025-07-17 06:44:05', '2025-07-17 06:44:05', NULL, NULL, NULL, NULL),
(116, 1, 10, 1016, '2025-07-17', '2025-07-17 06:44:05', '1', '1', '2025-07-17 06:44:05', '2025-07-17 06:44:05', NULL, NULL, NULL, NULL),
(117, 1, 10, 1019, '2025-07-17', '2025-07-17 06:44:05', '1', '0', '2025-07-17 06:44:05', '2025-07-17 06:44:05', NULL, NULL, NULL, NULL),
(118, 1, 10, 1022, '2025-07-17', '2025-07-17 06:44:05', '1', '0', '2025-07-17 06:44:05', '2025-07-17 06:44:05', NULL, NULL, NULL, NULL),
(119, 1, 10, 1025, '2025-07-17', '2025-07-17 06:44:05', '1', '0', '2025-07-17 06:44:05', '2025-07-17 06:44:05', NULL, NULL, NULL, NULL),
(120, 1, 10, 1028, '2025-07-17', '2025-07-17 06:44:05', '1', '1', '2025-07-17 06:44:05', '2025-07-17 06:44:05', NULL, NULL, NULL, NULL),
(121, 1, 10, 1031, '2025-07-17', '2025-07-17 06:44:05', '1', '1', '2025-07-17 06:44:05', '2025-07-17 06:44:05', NULL, NULL, NULL, NULL),
(122, 1, 10, 1034, '2025-07-17', '2025-07-17 06:44:05', '1', '1', '2025-07-17 06:44:05', '2025-07-17 06:44:05', NULL, NULL, NULL, NULL),
(123, 1, 10, 1037, '2025-07-17', '2025-07-17 06:44:05', '1', '1', '2025-07-17 06:44:05', '2025-07-17 06:44:05', NULL, NULL, NULL, NULL),
(124, 1, 10, 1040, '2025-07-17', '2025-07-17 06:44:05', '1', '1', '2025-07-17 06:44:05', '2025-07-17 06:44:05', NULL, NULL, NULL, NULL),
(125, 1, 10, 1043, '2025-07-17', '2025-07-17 06:44:05', '1', '1', '2025-07-17 06:44:05', '2025-07-17 06:44:05', NULL, NULL, NULL, NULL),
(126, 1, 10, 1046, '2025-07-17', '2025-07-17 06:44:05', '1', '1', '2025-07-17 06:44:05', '2025-07-17 06:44:05', NULL, NULL, NULL, NULL),
(127, 1, 10, 1049, '2025-07-17', '2025-07-17 06:44:05', '1', '1', '2025-07-17 06:44:05', '2025-07-17 06:44:05', NULL, NULL, NULL, NULL),
(128, 1, 10, 1052, '2025-07-17', '2025-07-17 06:44:05', '1', '1', '2025-07-17 06:44:05', '2025-07-17 06:44:05', NULL, NULL, NULL, NULL),
(129, 1, 10, 1055, '2025-07-17', '2025-07-17 06:44:05', '1', '1', '2025-07-17 06:44:05', '2025-07-17 06:44:05', NULL, NULL, NULL, NULL),
(130, 1, 10, 1058, '2025-07-17', '2025-07-17 06:44:05', '1', '1', '2025-07-17 06:44:05', '2025-07-17 06:44:05', NULL, NULL, NULL, NULL),
(131, 1, 10, 1061, '2025-07-17', '2025-07-17 06:44:05', '1', '1', '2025-07-17 06:44:05', '2025-07-17 06:44:05', NULL, NULL, NULL, NULL),
(132, 1, 10, 1064, '2025-07-17', '2025-07-17 06:44:05', '1', '1', '2025-07-17 06:44:05', '2025-07-17 06:44:05', NULL, NULL, NULL, NULL),
(133, 1, 10, 1067, '2025-07-17', '2025-07-17 06:44:05', '1', '1', '2025-07-17 06:44:05', '2025-07-17 06:44:05', NULL, NULL, NULL, NULL),
(134, 1, 10, 1070, '2025-07-17', '2025-07-17 06:44:05', '1', '1', '2025-07-17 06:44:05', '2025-07-17 06:44:05', NULL, NULL, NULL, NULL),
(135, 1, 10, 1073, '2025-07-17', '2025-07-17 06:44:05', '1', '1', '2025-07-17 06:44:05', '2025-07-17 06:44:05', NULL, NULL, NULL, NULL),
(136, 1, 10, 1076, '2025-07-17', '2025-07-17 06:44:05', '1', '1', '2025-07-17 06:44:05', '2025-07-17 06:44:05', NULL, NULL, NULL, NULL),
(137, 1, 10, 1079, '2025-07-17', '2025-07-17 06:44:05', '1', '1', '2025-07-17 06:44:05', '2025-07-17 06:44:05', NULL, NULL, NULL, NULL),
(138, 1, 10, 1082, '2025-07-17', '2025-07-17 06:44:05', '1', '1', '2025-07-17 06:44:05', '2025-07-17 06:44:05', NULL, NULL, NULL, NULL),
(139, 1, 10, 1085, '2025-07-17', '2025-07-17 06:44:05', '1', '1', '2025-07-17 06:44:05', '2025-07-17 06:44:05', NULL, NULL, NULL, NULL),
(140, 1, 10, 1088, '2025-07-17', '2025-07-17 06:44:05', '1', '1', '2025-07-17 06:44:05', '2025-07-17 06:44:05', NULL, NULL, NULL, NULL),
(141, 1, 10, 1091, '2025-07-17', '2025-07-17 06:44:06', '1', '1', '2025-07-17 06:44:06', '2025-07-17 06:44:06', NULL, NULL, NULL, NULL),
(142, 1, 10, 1094, '2025-07-17', '2025-07-17 06:44:06', '1', '1', '2025-07-17 06:44:06', '2025-07-17 06:44:06', NULL, NULL, NULL, NULL),
(143, 1, 10, 1097, '2025-07-17', '2025-07-17 06:44:06', '1', '1', '2025-07-17 06:44:06', '2025-07-17 06:44:06', NULL, NULL, NULL, NULL),
(144, 1, 10, 1100, '2025-07-17', '2025-07-17 06:44:06', '1', '1', '2025-07-17 06:44:06', '2025-07-17 06:44:06', NULL, NULL, NULL, NULL),
(145, 1, 10, 1103, '2025-07-17', '2025-07-17 06:44:06', '1', '1', '2025-07-17 06:44:06', '2025-07-17 06:44:06', NULL, NULL, NULL, NULL),
(146, 1, 10, 1106, '2025-07-17', '2025-07-17 06:44:06', '1', '1', '2025-07-17 06:44:06', '2025-07-17 06:44:06', NULL, NULL, NULL, NULL),
(147, 1, 10, 1108, '2025-07-17', '2025-07-17 06:44:06', '1', '1', '2025-07-17 06:44:06', '2025-07-17 06:44:06', NULL, NULL, NULL, NULL),
(148, 1, 10, 15, '2025-08-07', '2025-08-07 08:13:29', '1', '1', '2025-08-07 08:13:29', '2025-08-07 08:13:29', NULL, NULL, NULL, NULL),
(149, 1, 10, 1002, '2025-08-07', '2025-08-07 08:13:29', '1', '1', '2025-08-07 08:13:29', '2025-08-07 08:13:29', NULL, NULL, NULL, NULL),
(150, 1, 10, 1007, '2025-08-07', '2025-08-07 08:13:29', '1', '1', '2025-08-07 08:13:29', '2025-08-07 08:13:29', NULL, NULL, NULL, NULL),
(151, 1, 10, 1010, '2025-08-07', '2025-08-07 08:13:29', '1', '1', '2025-08-07 08:13:29', '2025-08-07 08:13:29', NULL, NULL, NULL, NULL),
(152, 1, 10, 1013, '2025-08-07', '2025-08-07 08:13:29', '1', '1', '2025-08-07 08:13:29', '2025-08-07 08:13:29', NULL, NULL, NULL, NULL),
(153, 1, 10, 1016, '2025-08-07', '2025-08-07 08:13:29', '1', '1', '2025-08-07 08:13:29', '2025-08-07 08:13:29', NULL, NULL, NULL, NULL),
(154, 1, 10, 1019, '2025-08-07', '2025-08-07 08:13:29', '1', '1', '2025-08-07 08:13:29', '2025-08-07 08:13:29', NULL, NULL, NULL, NULL),
(155, 1, 10, 1022, '2025-08-07', '2025-08-07 08:13:29', '1', '1', '2025-08-07 08:13:29', '2025-08-07 08:13:29', NULL, NULL, NULL, NULL),
(156, 1, 10, 1025, '2025-08-07', '2025-08-07 08:13:29', '1', '1', '2025-08-07 08:13:29', '2025-08-07 08:13:29', NULL, NULL, NULL, NULL),
(157, 1, 10, 1028, '2025-08-07', '2025-08-07 08:13:29', '1', '1', '2025-08-07 08:13:29', '2025-08-07 08:13:29', NULL, NULL, NULL, NULL),
(158, 1, 10, 1031, '2025-08-07', '2025-08-07 08:13:29', '1', '1', '2025-08-07 08:13:29', '2025-08-07 08:13:29', NULL, NULL, NULL, NULL),
(159, 1, 10, 1034, '2025-08-07', '2025-08-07 08:13:29', '1', '1', '2025-08-07 08:13:29', '2025-08-07 08:13:29', NULL, NULL, NULL, NULL),
(160, 1, 10, 1037, '2025-08-07', '2025-08-07 08:13:29', '1', '1', '2025-08-07 08:13:29', '2025-08-07 08:13:29', NULL, NULL, NULL, NULL),
(161, 1, 10, 1040, '2025-08-07', '2025-08-07 08:13:29', '1', '1', '2025-08-07 08:13:29', '2025-08-07 08:13:29', NULL, NULL, NULL, NULL),
(162, 1, 10, 1043, '2025-08-07', '2025-08-07 08:13:29', '1', '1', '2025-08-07 08:13:29', '2025-08-07 08:13:29', NULL, NULL, NULL, NULL),
(163, 1, 10, 1046, '2025-08-07', '2025-08-07 08:13:29', '1', '1', '2025-08-07 08:13:29', '2025-08-07 08:13:29', NULL, NULL, NULL, NULL),
(164, 1, 10, 1049, '2025-08-07', '2025-08-07 08:13:29', '1', '1', '2025-08-07 08:13:29', '2025-08-07 08:13:29', NULL, NULL, NULL, NULL),
(165, 1, 10, 1052, '2025-08-07', '2025-08-07 08:13:29', '1', '1', '2025-08-07 08:13:29', '2025-08-07 08:13:29', NULL, NULL, NULL, NULL),
(166, 1, 10, 1055, '2025-08-07', '2025-08-07 08:13:29', '1', '1', '2025-08-07 08:13:29', '2025-08-07 08:13:29', NULL, NULL, NULL, NULL),
(167, 1, 10, 1058, '2025-08-07', '2025-08-07 08:13:29', '1', '1', '2025-08-07 08:13:29', '2025-08-07 08:13:29', NULL, NULL, NULL, NULL),
(168, 1, 10, 1061, '2025-08-07', '2025-08-07 08:13:29', '1', '1', '2025-08-07 08:13:29', '2025-08-07 08:13:29', NULL, NULL, NULL, NULL),
(169, 1, 10, 1064, '2025-08-07', '2025-08-07 08:13:29', '1', '1', '2025-08-07 08:13:29', '2025-08-07 08:13:29', NULL, NULL, NULL, NULL),
(170, 1, 10, 1067, '2025-08-07', '2025-08-07 08:13:29', '1', '1', '2025-08-07 08:13:29', '2025-08-07 08:13:29', NULL, NULL, NULL, NULL),
(171, 1, 10, 1070, '2025-08-07', '2025-08-07 08:13:29', '1', '1', '2025-08-07 08:13:29', '2025-08-07 08:13:29', NULL, NULL, NULL, NULL),
(172, 1, 10, 1073, '2025-08-07', '2025-08-07 08:13:29', '1', '1', '2025-08-07 08:13:29', '2025-08-07 08:13:29', NULL, NULL, NULL, NULL),
(173, 1, 10, 1076, '2025-08-07', '2025-08-07 08:13:29', '1', '1', '2025-08-07 08:13:29', '2025-08-07 08:13:29', NULL, NULL, NULL, NULL),
(174, 1, 10, 1079, '2025-08-07', '2025-08-07 08:13:29', '1', '1', '2025-08-07 08:13:29', '2025-08-07 08:13:29', NULL, NULL, NULL, NULL),
(175, 1, 10, 1082, '2025-08-07', '2025-08-07 08:13:29', '1', '1', '2025-08-07 08:13:29', '2025-08-07 08:13:29', NULL, NULL, NULL, NULL),
(176, 1, 10, 1085, '2025-08-07', '2025-08-07 08:13:29', '1', '1', '2025-08-07 08:13:29', '2025-08-07 08:13:29', NULL, NULL, NULL, NULL),
(177, 1, 10, 1088, '2025-08-07', '2025-08-07 08:13:29', '1', '1', '2025-08-07 08:13:29', '2025-08-07 08:13:29', NULL, NULL, NULL, NULL),
(178, 1, 10, 1091, '2025-08-07', '2025-08-07 08:13:29', '1', '1', '2025-08-07 08:13:29', '2025-08-07 08:13:29', NULL, NULL, NULL, NULL),
(179, 1, 10, 1094, '2025-08-07', '2025-08-07 08:13:29', '1', '1', '2025-08-07 08:13:29', '2025-08-07 08:13:29', NULL, NULL, NULL, NULL),
(180, 1, 10, 1097, '2025-08-07', '2025-08-07 08:13:29', '1', '1', '2025-08-07 08:13:29', '2025-08-07 08:13:29', NULL, NULL, NULL, NULL),
(181, 1, 10, 1100, '2025-08-07', '2025-08-07 08:13:29', '1', '1', '2025-08-07 08:13:29', '2025-08-07 08:13:29', NULL, NULL, NULL, NULL),
(182, 1, 10, 1103, '2025-08-07', '2025-08-07 08:13:29', '1', '1', '2025-08-07 08:13:29', '2025-08-07 08:13:29', NULL, NULL, NULL, NULL),
(183, 1, 10, 1106, '2025-08-07', '2025-08-07 08:13:29', '1', '1', '2025-08-07 08:13:29', '2025-08-07 08:13:29', NULL, NULL, NULL, NULL),
(184, 1, 10, 1108, '2025-08-07', '2025-08-07 08:13:29', '1', '1', '2025-08-07 08:13:29', '2025-08-07 08:13:29', NULL, NULL, NULL, NULL),
(185, 1, 10, 15, '2025-08-23', '2025-08-23 11:30:22', '1', '1', '2025-08-23 11:30:21', '2025-08-23 11:30:21', NULL, NULL, NULL, NULL),
(186, 1, 10, 1002, '2025-08-23', '2025-08-23 11:30:22', '1', '1', '2025-08-23 11:30:21', '2025-08-23 11:30:21', NULL, NULL, NULL, NULL),
(187, 1, 10, 1007, '2025-08-23', '2025-08-23 11:30:22', '1', '1', '2025-08-23 11:30:21', '2025-08-23 11:30:21', NULL, NULL, NULL, NULL),
(188, 1, 10, 1010, '2025-08-23', '2025-08-23 11:30:22', '1', '1', '2025-08-23 11:30:21', '2025-08-23 11:30:21', NULL, NULL, NULL, NULL),
(189, 1, 10, 1013, '2025-08-23', '2025-08-23 11:30:22', '1', '1', '2025-08-23 11:30:21', '2025-08-23 11:30:21', NULL, NULL, NULL, NULL),
(190, 1, 10, 1016, '2025-08-23', '2025-08-23 11:30:22', '1', '1', '2025-08-23 11:30:21', '2025-08-23 11:30:21', NULL, NULL, NULL, NULL),
(191, 1, 10, 1019, '2025-08-23', '2025-08-23 11:30:22', '1', '1', '2025-08-23 11:30:21', '2025-08-23 11:30:21', NULL, NULL, NULL, NULL),
(192, 1, 10, 1022, '2025-08-23', '2025-08-23 11:30:22', '1', '1', '2025-08-23 11:30:21', '2025-08-23 11:30:21', NULL, NULL, NULL, NULL),
(193, 1, 10, 1025, '2025-08-23', '2025-08-23 11:30:22', '1', '1', '2025-08-23 11:30:21', '2025-08-23 11:30:21', NULL, NULL, NULL, NULL),
(194, 1, 10, 1028, '2025-08-23', '2025-08-23 11:30:22', '1', '1', '2025-08-23 11:30:21', '2025-08-23 11:30:21', NULL, NULL, NULL, NULL),
(195, 1, 10, 1031, '2025-08-23', '2025-08-23 11:30:22', '1', '1', '2025-08-23 11:30:21', '2025-08-23 11:30:21', NULL, NULL, NULL, NULL),
(196, 1, 10, 1034, '2025-08-23', '2025-08-23 11:30:22', '1', '1', '2025-08-23 11:30:21', '2025-08-23 11:30:21', NULL, NULL, NULL, NULL),
(197, 1, 10, 1037, '2025-08-23', '2025-08-23 11:30:22', '1', '1', '2025-08-23 11:30:21', '2025-08-23 11:30:21', NULL, NULL, NULL, NULL),
(198, 1, 10, 1040, '2025-08-23', '2025-08-23 11:30:22', '1', '1', '2025-08-23 11:30:21', '2025-08-23 11:30:21', NULL, NULL, NULL, NULL),
(199, 1, 10, 1043, '2025-08-23', '2025-08-23 11:30:22', '1', '1', '2025-08-23 11:30:21', '2025-08-23 11:30:21', NULL, NULL, NULL, NULL),
(200, 1, 10, 1046, '2025-08-23', '2025-08-23 11:30:22', '1', '1', '2025-08-23 11:30:21', '2025-08-23 11:30:21', NULL, NULL, NULL, NULL),
(201, 1, 10, 1049, '2025-08-23', '2025-08-23 11:30:22', '1', '1', '2025-08-23 11:30:21', '2025-08-23 11:30:21', NULL, NULL, NULL, NULL),
(202, 1, 10, 1052, '2025-08-23', '2025-08-23 11:30:22', '1', '1', '2025-08-23 11:30:21', '2025-08-23 11:30:21', NULL, NULL, NULL, NULL),
(203, 1, 10, 1055, '2025-08-23', '2025-08-23 11:30:22', '1', '1', '2025-08-23 11:30:21', '2025-08-23 11:30:21', NULL, NULL, NULL, NULL),
(204, 1, 10, 1058, '2025-08-23', '2025-08-23 11:30:22', '1', '1', '2025-08-23 11:30:21', '2025-08-23 11:30:21', NULL, NULL, NULL, NULL),
(205, 1, 10, 1061, '2025-08-23', '2025-08-23 11:30:22', '1', '1', '2025-08-23 11:30:21', '2025-08-23 11:30:21', NULL, NULL, NULL, NULL),
(206, 1, 10, 1064, '2025-08-23', '2025-08-23 11:30:22', '1', '1', '2025-08-23 11:30:21', '2025-08-23 11:30:21', NULL, NULL, NULL, NULL),
(207, 1, 10, 1067, '2025-08-23', '2025-08-23 11:30:22', '1', '1', '2025-08-23 11:30:21', '2025-08-23 11:30:21', NULL, NULL, NULL, NULL),
(208, 1, 10, 1070, '2025-08-23', '2025-08-23 11:30:22', '1', '1', '2025-08-23 11:30:21', '2025-08-23 11:30:21', NULL, NULL, NULL, NULL),
(209, 1, 10, 1073, '2025-08-23', '2025-08-23 11:30:22', '1', '1', '2025-08-23 11:30:21', '2025-08-23 11:30:21', NULL, NULL, NULL, NULL),
(210, 1, 10, 1076, '2025-08-23', '2025-08-23 11:30:22', '1', '1', '2025-08-23 11:30:21', '2025-08-23 11:30:21', NULL, NULL, NULL, NULL),
(211, 1, 10, 1079, '2025-08-23', '2025-08-23 11:30:22', '1', '1', '2025-08-23 11:30:21', '2025-08-23 11:30:21', NULL, NULL, NULL, NULL),
(212, 1, 10, 1082, '2025-08-23', '2025-08-23 11:30:22', '1', '1', '2025-08-23 11:30:21', '2025-08-23 11:30:21', NULL, NULL, NULL, NULL),
(213, 1, 10, 1085, '2025-08-23', '2025-08-23 11:30:22', '1', '1', '2025-08-23 11:30:21', '2025-08-23 11:30:21', NULL, NULL, NULL, NULL),
(214, 1, 10, 1088, '2025-08-23', '2025-08-23 11:30:22', '1', '1', '2025-08-23 11:30:21', '2025-08-23 11:30:21', NULL, NULL, NULL, NULL),
(215, 1, 10, 1091, '2025-08-23', '2025-08-23 11:30:22', '1', '1', '2025-08-23 11:30:21', '2025-08-23 11:30:21', NULL, NULL, NULL, NULL),
(216, 1, 10, 1094, '2025-08-23', '2025-08-23 11:30:22', '1', '1', '2025-08-23 11:30:21', '2025-08-23 11:30:21', NULL, NULL, NULL, NULL),
(217, 1, 10, 1097, '2025-08-23', '2025-08-23 11:30:22', '1', '1', '2025-08-23 11:30:21', '2025-08-23 11:30:21', NULL, NULL, NULL, NULL),
(218, 1, 10, 1100, '2025-08-23', '2025-08-23 11:30:22', '1', '1', '2025-08-23 11:30:21', '2025-08-23 11:30:21', NULL, NULL, NULL, NULL),
(219, 1, 10, 1103, '2025-08-23', '2025-08-23 11:30:22', '1', '1', '2025-08-23 11:30:21', '2025-08-23 11:30:21', NULL, NULL, NULL, NULL),
(220, 1, 10, 1106, '2025-08-23', '2025-08-23 11:30:22', '1', '1', '2025-08-23 11:30:21', '2025-08-23 11:30:21', NULL, NULL, NULL, NULL),
(221, 1, 10, 1108, '2025-08-23', '2025-08-23 11:30:22', '1', '1', '2025-08-23 11:30:21', '2025-08-23 11:30:21', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `subjects`
--

CREATE TABLE `subjects` (
  `id` int UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `code` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `type` enum('1','2','3') COLLATE utf8mb3_unicode_ci NOT NULL DEFAULT '1',
  `class_id` int UNSIGNED NOT NULL,
  `status` enum('0','1') COLLATE utf8mb3_unicode_ci NOT NULL DEFAULT '1',
  `order` smallint UNSIGNED NOT NULL DEFAULT '0',
  `exclude_in_result` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_by` int UNSIGNED DEFAULT NULL,
  `updated_by` int UNSIGNED DEFAULT NULL,
  `deleted_by` int UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Dumping data for table `subjects`
--

INSERT INTO `subjects` (`id`, `name`, `code`, `type`, `class_id`, `status`, `order`, `exclude_in_result`, `created_at`, `updated_at`, `deleted_at`, `created_by`, `updated_by`, `deleted_by`) VALUES
(13, 'English 1st', '107', '1', 10, '1', 0, 0, '2025-02-01 06:12:18', '2025-02-01 06:12:18', NULL, 1, 0, NULL),
(14, 'English 2nd', '108', '1', 10, '1', 0, 0, '2025-02-01 06:12:18', '2025-02-01 06:12:18', NULL, 1, 0, NULL),
(15, 'Math', '111', '1', 10, '1', 0, 0, '2025-02-01 06:12:18', '2025-02-01 06:12:18', NULL, 1, 0, NULL),
(16, 'Computer', '112', '1', 10, '1', 0, 0, '2025-02-01 06:12:18', '2025-02-01 06:12:18', NULL, 1, 0, NULL),
(18, 'Magic Study', '104', '3', 10, '1', 0, 0, '2025-02-01 06:12:18', '2025-02-01 06:12:18', NULL, 1, 0, NULL),
(19, 'English 1st', '109', '1', 10, '1', 0, 0, '2025-02-01 06:12:18', '2025-02-01 06:12:18', NULL, 1, 0, NULL);

--
-- Triggers `subjects`
--
DELIMITER $$
CREATE TRIGGER `subject_ai` AFTER INSERT ON `subjects` FOR EACH ROW INSERT INTO subject_history SELECT 'insert', NULL, d.* 
    FROM subjects AS d WHERE d.id = NEW.id
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `subject_au` AFTER UPDATE ON `subjects` FOR EACH ROW INSERT INTO subject_history SELECT 'update', NULL, d.*
    FROM subjects AS d WHERE d.id = NEW.id
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `teacher_profiles`
--

CREATE TABLE `teacher_profiles` (
  `id` int UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `designation` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `image` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `description` longtext COLLATE utf8mb3_unicode_ci,
  `qualification` longtext COLLATE utf8mb3_unicode_ci,
  `facebook` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `instagram` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `twitter` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_by` int UNSIGNED DEFAULT NULL,
  `updated_by` int UNSIGNED DEFAULT NULL,
  `deleted_by` int UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Dumping data for table `teacher_profiles`
--

INSERT INTO `teacher_profiles` (`id`, `name`, `designation`, `image`, `description`, `qualification`, `facebook`, `instagram`, `twitter`, `created_at`, `updated_at`, `deleted_at`, `created_by`, `updated_by`, `deleted_by`) VALUES
(1, 'Fakir Chand', 'Headmaster', '1.jpg', 'Super cool boy!', 'M.A in English', '#', '#', '#', '2025-02-01 06:12:12', '2025-02-01 06:12:12', NULL, 0, 0, NULL),
(2, 'Nosimon Beagum', 'Class Teacher', '2.jpg', '', 'Hons in English', '#', '#', '#', '2025-02-01 06:12:12', '2025-02-01 06:12:12', NULL, 0, 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `testimonials`
--

CREATE TABLE `testimonials` (
  `id` int UNSIGNED NOT NULL,
  `writer` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `comments` text COLLATE utf8mb3_unicode_ci NOT NULL,
  `avatar` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `order` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_by` int UNSIGNED DEFAULT NULL,
  `updated_by` int UNSIGNED DEFAULT NULL,
  `deleted_by` int UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Dumping data for table `testimonials`
--

INSERT INTO `testimonials` (`id`, `writer`, `comments`, `avatar`, `order`, `created_at`, `updated_at`, `deleted_at`, `created_by`, `updated_by`, `deleted_by`) VALUES
(1, 'Shadhin', 'Awesome Academy', NULL, 1, '2025-02-01 06:12:12', '2025-02-01 06:12:12', NULL, 0, 0, NULL),
(2, 'HRS', 'Great school', NULL, 2, '2025-02-01 06:12:12', '2025-02-01 06:12:12', NULL, 0, 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `timetable`
--

CREATE TABLE `timetable` (
  `id` int NOT NULL,
  `class` varchar(10) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `day` varchar(10) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `time` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `subject` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `teacher` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `class_id` int UNSIGNED DEFAULT NULL,
  `staff_id` int UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `timetable`
--

INSERT INTO `timetable` (`id`, `class`, `day`, `time`, `subject`, `teacher`, `class_id`, `staff_id`) VALUES
(1, '7', 'Monday', '09:00–09:45', 'Math', 'Mr. John', NULL, NULL),
(2, '7', 'Monday', '09:45–10:30', 'English', 'Ms. Alice', NULL, 1),
(4, '7', 'Monday', '10:45–11:30', 'Science', 'Ms. Priya', NULL, NULL),
(5, '7', 'Monday', '11:30–12:15', 'Hindi', 'Ms. Rekha', NULL, NULL),
(7, '7', 'Monday', '01:15–02:00', 'Geography', 'Ms. Anu', NULL, NULL),
(8, '7', 'Monday', '02:00–02:45', 'Malayalam', 'Mr. Kumar', NULL, NULL),
(9, '7', 'Tuesday', '09:00–09:45', 'Math', 'Mr. John', NULL, NULL),
(10, '7', 'Tuesday', '09:45–10:30', 'English', 'Ms. Alice', NULL, 1),
(12, '7', 'Tuesday', '10:45–11:30', 'Science', 'Ms. Priya', NULL, NULL),
(13, '7', 'Tuesday', '11:30–12:15', 'Hindi', 'Ms. Rekha', NULL, NULL),
(15, '7', 'Tuesday', '01:15–02:00', 'Geography', 'Ms. Anu', NULL, NULL),
(16, '7', 'Tuesday', '02:00–02:45', 'Malayalam', 'Mr. Kumar', NULL, NULL),
(17, '7', 'Wednesday', '09:00–09:45', 'Math', 'Mr. John', NULL, NULL),
(18, '7', 'Wednesday', '09:45–10:30', 'English', 'Ms. Alice', NULL, 1),
(20, '7', 'Wednesday', '10:45–11:30', 'Science', 'Ms. Priya', NULL, NULL),
(21, '7', 'Wednesday', '11:30–12:15', 'Hindi', 'Ms. Rekha', NULL, NULL),
(23, '7', 'Wednesday', '01:15–02:00', 'Geography', 'Ms. Anu', NULL, NULL),
(24, '7', 'Wednesday', '02:00–02:45', 'Malayalam', 'Mr. Kumar', NULL, NULL),
(25, '7', 'Thursday', '09:00–09:45', 'Math', 'Mr. John', NULL, NULL),
(26, '7', 'Thursday', '09:45–10:30', 'English', 'Ms. Alice', NULL, 1),
(28, '7', 'Thursday', '10:45–11:30', 'Science', 'Ms. Priya', NULL, NULL),
(29, '7', 'Thursday', '11:30–12:15', 'Hindi', 'Ms. Rekha', NULL, NULL),
(31, '7', 'Thursday', '01:15–02:00', 'Geography', 'Ms. Anu', NULL, NULL),
(32, '7', 'Thursday', '02:00–02:45', 'Malayalam', 'Mr. Kumar', NULL, NULL),
(33, '7', 'Friday', '09:00–09:45', 'Math', 'Mr. John', NULL, NULL),
(34, '7', 'Friday', '09:45–10:30', 'English', 'Ms. Alice', NULL, 1),
(36, '7', 'Friday', '10:45–11:30', 'Science', 'Ms. Priya', NULL, NULL),
(37, '7', 'Friday', '11:30–12:15', 'Hindi', 'Ms. Rekha', NULL, NULL),
(39, '7', 'Friday', '01:15–02:00', 'Geography', 'Ms. Anu', NULL, NULL),
(40, '7', 'Friday', '02:00–02:45', 'Malayalam', 'Mr. Kumar', NULL, NULL),
(41, '8', 'Monday', '09:00–09:45', 'Math', 'Mr. John', NULL, NULL),
(42, '8', 'Monday', '09:45–10:30', 'English', 'Ms. Alice', NULL, 1),
(44, '8', 'Monday', '10:45–11:30', 'Science', 'Ms. Priya', NULL, NULL),
(45, '8', 'Monday', '11:30–12:15', 'Hindi', 'Ms. Rekha', NULL, NULL),
(47, '8', 'Monday', '01:15–02:00', 'Geography', 'Ms. Anu', NULL, NULL),
(48, '8', 'Monday', '02:00–02:45', 'Malayalam', 'Mr. Kumar', NULL, NULL),
(49, '8', 'Tuesday', '09:00–09:45', 'Math', 'Mr. John', NULL, NULL),
(50, '8', 'Tuesday', '09:45–10:30', 'English', 'Ms. Alice', NULL, 1),
(52, '8', 'Tuesday', '10:45–11:30', 'Science', 'Ms. Priya', NULL, NULL),
(53, '8', 'Tuesday', '11:30–12:15', 'Hindi', 'Ms. Rekha', NULL, NULL),
(55, '8', 'Tuesday', '01:15–02:00', 'Geography', 'Ms. Anu', NULL, NULL),
(56, '8', 'Tuesday', '02:00–02:45', 'Malayalam', 'Mr. Kumar', NULL, NULL),
(57, '8', 'Wednesday', '09:00–09:45', 'Math', 'Mr. John', NULL, NULL),
(58, '8', 'Wednesday', '09:45–10:30', 'English', 'Ms. Alice', NULL, 1),
(60, '8', 'Wednesday', '10:45–11:30', 'Science', 'Ms. Priya', NULL, NULL),
(61, '8', 'Wednesday', '11:30–12:15', 'Hindi', 'Ms. Rekha', NULL, NULL),
(63, '8', 'Wednesday', '01:15–02:00', 'Geography', 'Ms. Anu', NULL, NULL),
(64, '8', 'Wednesday', '02:00–02:45', 'Malayalam', 'Mr. Kumar', NULL, NULL),
(65, '8', 'Thursday', '09:00–09:45', 'Math', 'Mr. John', NULL, NULL),
(66, '8', 'Thursday', '09:45–10:30', 'English', 'Ms. Alice', NULL, 1),
(68, '8', 'Thursday', '10:45–11:30', 'Science', 'Ms. Priya', NULL, NULL),
(69, '8', 'Thursday', '11:30–12:15', 'Hindi', 'Ms. Rekha', NULL, NULL),
(71, '8', 'Thursday', '01:15–02:00', 'Geography', 'Ms. Anu', NULL, NULL),
(72, '8', 'Thursday', '02:00–02:45', 'Malayalam', 'Mr. Kumar', NULL, NULL),
(73, '8', 'Friday', '09:00–09:45', 'Math', 'Mr. John', NULL, NULL),
(74, '8', 'Friday', '09:45–10:30', 'English', 'Ms. Alice', NULL, 1),
(76, '8', 'Friday', '10:45–11:30', 'Science', 'Ms. Priya', NULL, NULL),
(77, '8', 'Friday', '11:30–12:15', 'Hindi', 'Ms. Rekha', NULL, NULL),
(79, '8', 'Friday', '01:15–02:00', 'Geography', 'Ms. Anu', NULL, NULL),
(80, '8', 'Friday', '02:00–02:45', 'Malayalam', 'Mr. Kumar', NULL, NULL),
(81, '9', 'Monday', '09:00–09:45', 'Math', 'Mr. John', NULL, NULL),
(82, '9', 'Monday', '09:45–10:30', 'English', 'Ms. Alice', NULL, 1),
(84, '9', 'Monday', '10:45–11:30', 'Physics', 'Mr. Smith', NULL, NULL),
(85, '9', 'Monday', '11:30–12:15', 'Hindi', 'Ms. Rekha', NULL, NULL),
(87, '9', 'Monday', '01:15–02:00', 'Geography', 'Ms. Anu', NULL, NULL),
(88, '9', 'Monday', '02:00–02:45', 'Malayalam', 'Mr. Kumar', NULL, NULL),
(89, '9', 'Tuesday', '09:00–09:45', 'Math', 'Mr. John', NULL, NULL),
(90, '9', 'Tuesday', '09:45–10:30', 'English', 'Ms. Alice', NULL, 1),
(92, '9', 'Tuesday', '10:45–11:30', 'Physics', 'Mr. Smith', NULL, NULL),
(93, '9', 'Tuesday', '11:30–12:15', 'Hindi', 'Ms. Rekha', NULL, NULL),
(95, '9', 'Tuesday', '01:15–02:00', 'Geography', 'Ms. Anu', NULL, NULL),
(96, '9', 'Tuesday', '02:00–02:45', 'Malayalam', 'Mr. Kumar', NULL, NULL),
(97, '9', 'Wednesday', '09:00–09:45', 'Math', 'Mr. John', NULL, NULL),
(98, '9', 'Wednesday', '09:45–10:30', 'English', 'Ms. Alice', NULL, 1),
(100, '9', 'Wednesday', '10:45–11:30', 'Physics', 'Mr. Smith', NULL, NULL),
(101, '9', 'Wednesday', '11:30–12:15', 'Hindi', 'Ms. Rekha', NULL, NULL),
(103, '9', 'Wednesday', '01:15–02:00', 'Geography', 'Ms. Anu', NULL, NULL),
(104, '9', 'Wednesday', '02:00–02:45', 'Malayalam', 'Mr. Kumar', NULL, NULL),
(105, '9', 'Thursday', '09:00–09:45', 'Math', 'Mr. John', NULL, NULL),
(106, '9', 'Thursday', '09:45–10:30', 'English', 'Ms. Alice', NULL, 1),
(108, '9', 'Thursday', '10:45–11:30', 'Physics', 'Mr. Smith', NULL, NULL),
(109, '9', 'Thursday', '11:30–12:15', 'Hindi', 'Ms. Rekha', NULL, NULL),
(111, '9', 'Thursday', '01:15–02:00', 'Geography', 'Ms. Anu', NULL, NULL),
(112, '9', 'Thursday', '02:00–02:45', 'Malayalam', 'Mr. Kumar', NULL, NULL),
(113, '9', 'Friday', '09:00–09:45', 'Math', 'Mr. John', NULL, NULL),
(114, '9', 'Friday', '09:45–10:30', 'English', 'Ms. Alice', NULL, 1),
(116, '9', 'Friday', '10:45–11:30', 'Physics', 'Mr. Smith', NULL, NULL),
(117, '9', 'Friday', '11:30–12:15', 'Hindi', 'Ms. Rekha', NULL, NULL),
(119, '9', 'Friday', '01:15–02:00', 'Geography', 'Ms. Anu', NULL, NULL),
(120, '9', 'Friday', '02:00–02:45', 'Malayalam', 'Mr. Kumar', NULL, NULL),
(121, '10 A', 'Monday', '09:00–09:45', 'Math', 'Mr. John', 10, NULL),
(122, '10 A', 'Monday', '09:45–10:30', 'English', 'Ms. Alice', 10, 1),
(124, '10 A', 'Monday', '10:45–11:30', 'Physics', 'Mr. Smith', 10, NULL),
(125, '10 A', 'Monday', '11:30–12:15', 'Hindi', 'Ms. Rekha', 10, NULL),
(127, '10 A', 'Monday', '13:15–14:00', 'Geography', 'Ms. Anu', 10, NULL),
(128, '10 A', 'Monday', '14:00–14:45', 'Commerce', 'Mr. Raj', 10, NULL),
(129, '10 A', 'Tuesday', '09:00–09:45', 'Math', 'Mr. John', 10, NULL),
(130, '10 A', 'Tuesday', '09:45–10:30', 'English', 'Ms. Alice', 10, 1),
(132, '10 A', 'Tuesday', '10:45–11:30', 'Physics', 'Mr. Smith', 10, NULL),
(133, '10 A', 'Tuesday', '11:30–12:15', 'Hindi', 'Ms. Rekha', 10, NULL),
(135, '10 A', 'Tuesday', '01:15–02:00', 'Geography', 'Ms. Anu', 10, NULL),
(136, '10 A', 'Tuesday', '14:00–14:45', 'Commerce', 'Mr. Raj', 10, NULL),
(137, '10 A', 'Wednesday', '09:00–09:45', 'Math', 'Mr. John', 10, NULL),
(138, '10 A', 'Wednesday', '09:45–10:30', 'English', 'Ms. Alice', 10, 1),
(140, '10 A', 'Wednesday', '10:45–11:30', 'Physics', 'Mr. Smith', 10, NULL),
(141, '10 A', 'Wednesday', '11:30–12:15', 'Hindi', 'Ms. Rekha', 10, NULL),
(143, '10 A', 'Wednesday', '13:15–14:00', 'Geography', 'Ms. Anu', 10, NULL),
(144, '10 A', 'Wednesday', '14:00–14:45', 'Commerce', 'Mr. Raj', 10, NULL),
(145, '10 A', 'Thursday', '09:00–09:45', 'Math', 'Mr. John', 10, NULL),
(146, '10 A', 'Thursday', '09:45–10:30', 'English', 'Ms. Alice', 10, 1),
(148, '10 A', 'Thursday', '10:45–11:30', 'Physics', 'Mr. Smith', 10, NULL),
(149, '10 A', 'Thursday', '11:30–12:15', 'Hindi', 'Ms. Rekha', 10, NULL),
(151, '10 A', 'Thursday', '13:15–14:00', 'Geography', 'Ms. Anu', 10, NULL),
(152, '10 A', 'Thursday', '14:00–14:45', 'Commerce', 'Mr. Raj', 10, NULL),
(153, '10 A', 'Friday', '09:00–09:45', 'Math', 'Mr. John', 10, NULL),
(154, '10 A', 'Friday', '09:45–10:30', 'English', 'Ms. Alice', 10, 1),
(156, '10 A', 'Friday', '10:45–11:30', 'Physics', 'Mr. Smith', 10, NULL),
(157, '10 A', 'Friday', '11:30–12:15', 'Hindi', 'Ms. Rekha', 10, NULL),
(159, '10 A', 'Friday', '13:15–14:00', 'Geography', 'Ms. Anu', 10, NULL),
(160, '10 A', 'Friday', '14:00–14:45', 'Commerce', 'Mr. Raj', 10, NULL),
(161, '10 B', 'Monday', '09:00–09:45', 'Math', 'Mr. John', NULL, NULL),
(162, '10 B', 'Monday', '09:45–10:30', 'English', 'Ms. Alice', NULL, 1),
(164, '10 B', 'Monday', '10:45–11:30', 'Chemistry', 'Ms. Claire', NULL, NULL),
(165, '10 B', 'Monday', '11:30–12:15', 'Hindi', 'Ms. Rekha', NULL, NULL),
(167, '10 B', 'Monday', '01:15–02:00', 'Geography', 'Ms. Anu', NULL, NULL),
(168, '10 B', 'Monday', '02:00–02:45', 'Commerce', 'Mr. Raj', NULL, NULL),
(169, '10 B', 'Tuesday', '09:00–09:45', 'Math', 'Mr. John', NULL, NULL),
(170, '10 B', 'Tuesday', '09:45–10:30', 'English', 'Ms. Alice', NULL, 1),
(172, '10 B', 'Tuesday', '10:45–11:30', 'Chemistry', 'Ms. Claire', NULL, NULL),
(173, '10 B', 'Tuesday', '11:30–12:15', 'Hindi', 'Ms. Rekha', NULL, NULL),
(175, '10 B', 'Tuesday', '01:15–02:00', 'Geography', 'Ms. Anu', NULL, NULL),
(176, '10 B', 'Tuesday', '02:00–02:45', 'Commerce', 'Mr. Raj', NULL, NULL),
(177, '10 B', 'Wednesday', '09:00–09:45', 'Math', 'Mr. John', NULL, NULL),
(178, '10 B', 'Wednesday', '09:45–10:30', 'English', 'Ms. Alice', NULL, 1),
(180, '10 B', 'Wednesday', '10:45–11:30', 'Chemistry', 'Ms. Claire', NULL, NULL),
(181, '10 B', 'Wednesday', '11:30–12:15', 'Hindi', 'Ms. Rekha', NULL, NULL),
(183, '10 B', 'Wednesday', '01:15–02:00', 'Geography', 'Ms. Anu', NULL, NULL),
(184, '10 B', 'Wednesday', '02:00–02:45', 'Commerce', 'Mr. Raj', NULL, NULL),
(185, '10 B', 'Thursday', '09:00–09:45', 'Math', 'Mr. John', NULL, NULL),
(186, '10 B', 'Thursday', '09:45–10:30', 'English', 'Ms. Alice', NULL, 1),
(188, '10 B', 'Thursday', '10:45–11:30', 'Chemistry', 'Ms. Claire', NULL, NULL),
(189, '10 B', 'Thursday', '11:30–12:15', 'Hindi', 'Ms. Rekha', NULL, NULL),
(191, '10 B', 'Thursday', '01:15–02:00', 'Geography', 'Ms. Anu', NULL, NULL),
(192, '10 B', 'Thursday', '02:00–02:45', 'Commerce', 'Mr. Raj', NULL, NULL),
(193, '10 B', 'Friday', '09:00–09:45', 'Math', 'Mr. John', NULL, NULL),
(194, '10 B', 'Friday', '09:45–10:30', 'English', 'Ms. Alice', NULL, 1),
(196, '10 B', 'Friday', '10:45–11:30', 'Chemistry', 'Ms. Claire', NULL, NULL),
(197, '10 B', 'Friday', '11:30–12:15', 'Hindi', 'Ms. Rekha', NULL, NULL),
(199, '10 B', 'Friday', '01:15–02:00', 'Geography', 'Ms. Anu', NULL, NULL),
(200, '10 B', 'Friday', '02:00–02:45', 'Commerce', 'Mr. Raj', NULL, NULL),
(201, '10 C', 'Monday', '09:00–09:45', 'Math', 'Mr. John', NULL, NULL),
(202, '10 C', 'Monday', '09:45–10:30', 'English', 'Ms. Alice', NULL, 1),
(204, '10 C', 'Monday', '10:45–11:30', 'Biology', 'Ms. Priya', NULL, NULL),
(205, '10 C', 'Monday', '11:30–12:15', 'Hindi', 'Ms. Rekha', NULL, NULL),
(207, '10 C', 'Monday', '01:15–02:00', 'Geography', 'Ms. Anu', NULL, NULL),
(208, '10 C', 'Monday', '02:00–02:45', 'Commerce', 'Mr. Raj', NULL, NULL),
(209, '10 C', 'Tuesday', '09:00–09:45', 'Math', 'Mr. John', NULL, NULL),
(210, '10 C', 'Tuesday', '09:45–10:30', 'English', 'Ms. Alice', NULL, 1),
(212, '10 C', 'Tuesday', '10:45–11:30', 'Biology', 'Ms. Priya', NULL, NULL),
(213, '10 C', 'Tuesday', '11:30–12:15', 'Hindi', 'Ms. Rekha', NULL, NULL),
(215, '10 C', 'Tuesday', '01:15–02:00', 'Geography', 'Ms. Anu', NULL, NULL),
(216, '10 C', 'Tuesday', '02:00–02:45', 'Commerce', 'Mr. Raj', NULL, NULL),
(217, '10 C', 'Wednesday', '09:00–09:45', 'Math', 'Mr. John', NULL, NULL),
(218, '10 C', 'Wednesday', '09:45–10:30', 'English', 'Ms. Alice', NULL, 1),
(220, '10 C', 'Wednesday', '10:45–11:30', 'Biology', 'Ms. Priya', NULL, NULL),
(221, '10 C', 'Wednesday', '11:30–12:15', 'Hindi', 'Ms. Rekha', NULL, NULL),
(223, '10 C', 'Wednesday', '01:15–02:00', 'Geography', 'Ms. Anu', NULL, NULL),
(224, '10 C', 'Wednesday', '02:00–02:45', 'Commerce', 'Mr. Raj', NULL, NULL),
(225, '10 C', 'Thursday', '09:00–09:45', 'Math', 'Mr. John', NULL, NULL),
(226, '10 C', 'Thursday', '09:45–10:30', 'English', 'Ms. Alice', NULL, 1),
(228, '10 C', 'Thursday', '10:45–11:30', 'Biology', 'Ms. Priya', NULL, NULL),
(229, '10 C', 'Thursday', '11:30–12:15', 'Hindi', 'Ms. Rekha', NULL, NULL),
(231, '10 C', 'Thursday', '01:15–02:00', 'Geography', 'Ms. Anu', NULL, NULL),
(232, '10 C', 'Thursday', '02:00–02:45', 'Commerce', 'Mr. Raj', NULL, NULL),
(233, '10 C', 'Friday', '09:00–09:45', 'Math', 'Mr. John', NULL, NULL),
(234, '10 C', 'Friday', '09:45–10:30', 'English', 'Ms. Alice', NULL, 1),
(236, '10 C', 'Friday', '10:45–11:30', 'Biology', 'Ms. Priya', NULL, NULL),
(237, '10 C', 'Friday', '11:30–12:15', 'Hindi', 'Ms. Rekha', NULL, NULL),
(239, '10 C', 'Friday', '01:15–02:00', 'Geography', 'Ms. Anu', NULL, NULL),
(240, '10 C', 'Friday', '02:00–02:45', 'Commerce', 'Mr. Raj', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int UNSIGNED NOT NULL,
  `school_id` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `username` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `phone_no` varchar(15) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `force_logout` tinyint(1) NOT NULL DEFAULT '0',
  `status` enum('0','1') COLLATE utf8mb3_unicode_ci NOT NULL DEFAULT '1',
  `is_super_admin` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_by` int UNSIGNED DEFAULT NULL,
  `updated_by` int UNSIGNED DEFAULT NULL,
  `deleted_by` int UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `school_id`, `name`, `username`, `email`, `phone_no`, `password`, `remember_token`, `force_logout`, `status`, `is_super_admin`, `created_at`, `updated_at`, `deleted_at`, `created_by`, `updated_by`, `deleted_by`) VALUES
(1, 'SVS001', 'Super Admin', 'superadmin', 'superadmin@cloudschoolbd.com', NULL, 'e10adc3949ba59abbe56e057f20f883e', NULL, 0, '1', 1, '2025-02-01 06:12:06', '2025-02-01 06:12:06', NULL, 0, 0, NULL),
(2, 'SVS001', 'Mr. admin', 'admin', 'admin@cloudschoolbd.com', NULL, '$2y$10$i2JfylxF3ohNW8qDxaaSNelz.YWE3BlVQ2xkeLhkPjUhkmLabNgCi', NULL, 0, '1', 0, '2025-02-01 06:12:06', '2025-02-01 06:12:06', NULL, 0, 0, NULL),
(3, 'SVS001', 'Modesto Crist', 'taufderhar', 'gloria09@example.org', NULL, 'e10adc3949ba59abbe56e057f20f883e', 'jsCsobfh4A', 0, '1', 0, '2025-02-01 06:12:17', '2025-02-01 06:12:18', NULL, 1, 0, NULL),
(4, 'SVS001', 'Lilla Collier', 'tyrel14', 'terrell14@example.net', NULL, '$2y$10$oUf6cwPgeAS7J96XHdeRjO4CNONxsB9MuV44Z76Sud1pZ4O1limEm', 'b4Fjn96SbC', 0, '1', 0, '2025-02-01 06:12:17', '2025-02-01 06:12:18', NULL, 1, 0, NULL),
(5, 'SVS001', 'Assunta Daugherty', 'ehessel', 'jmetz@example.com', NULL, '$2y$10$HJ/bYWs/Y37LOHWwfxWC3.W7m1S4ldYqQBJqmyAYGCa5FUIdpjSrm', 'moQCiNL1tg', 0, '1', 0, '2025-02-01 06:12:17', '2025-02-01 06:12:18', NULL, 1, 0, NULL),
(6, 'SVS001', 'Dr. Frederik Runolfsdottir', 'alex04', 'ursula29@example.org', NULL, 'e10adc3949ba59abbe56e057f20f883e', 'ZOHvAXYDnk', 0, '1', 0, '2025-02-01 06:12:18', '2025-02-01 06:12:18', NULL, 1, 0, NULL),
(7, 'SVS001', 'Dr. Leonel O\'Conner V', 'marisa23', 'ortiz.alek@example.org', NULL, '$2y$10$EL23DyZYWEnORUcgVz8zKe0iWna7h0UdI1YlgRXTgjHa58CiVkkFW', 'KwOc95Oalz', 0, '1', 0, '2025-02-01 06:12:18', '2025-02-01 06:12:18', NULL, 1, 0, NULL),
(8, 'SVS001', 'Percy Dibbert', 'effertz.norberto', 'sallie.wilkinson@example.com', NULL, '$2y$10$eUlUlZQOBTxN8HVfe40ZfuLZGLxdzP45roOIbwpCeyy6KgsBMyYSG', 'ptz3ciNCtM', 0, '1', 0, '2025-02-01 06:12:18', '2025-02-01 06:12:18', NULL, 1, 0, NULL),
(9, 'SVS001', 'Halle Hill', 'ricky02', 'haven18@example.net', NULL, '$2y$10$rHiykl/8j8nnuRCilwCuCOAWYwjFLmO7re7RmA54RauN6oVppfJZm', 'uHeuMLn0fN', 0, '1', 0, '2025-02-01 06:12:18', '2025-02-01 06:12:18', NULL, 1, 0, NULL),
(10, 'SVS001', 'Liam Howell DDS', 'dibbert.joshuah', 'kuhlman.jaquan@example.org', NULL, '$2y$10$OKGjkHUikU1Qo4Md3rk8qOvDCa6DonoVgJXWNzfrPPhOPo3ORCN6q', 'fr39yGJEXb', 0, '1', 0, '2025-02-01 06:12:18', '2025-02-01 06:12:18', NULL, 1, 0, NULL),
(11, 'SVS001', 'Lilliana Breitenberg', 'bmurray', 'nfeest@example.org', NULL, '$2y$10$dtooqUC9CfkBScGXkg8BYupBjUWdWOgkKc151OLq0PLhPwhNS7dIS', 'iKFrdfrXwY', 0, '1', 0, '2025-02-01 06:12:18', '2025-02-01 06:12:18', NULL, 1, 0, NULL),
(12, 'SVS001', 'Mr. Santa Hagenes', 'jhuel', 'ybogisich@example.net', NULL, '$2y$10$g4A6UAOjx.4XWHL9rC2uMOT3cCdiFRxgK.7a9WHWPlcnRPE3IXCYa', 'c9gwxYt22W', 0, '1', 0, '2025-02-01 06:12:18', '2025-02-01 06:12:18', NULL, 1, 0, NULL),
(13, 'SVS001', 'Bobby Nolan', 'rosetta20', 'sadye.muller@example.org', NULL, '$2y$10$YlLZlK1HxdZxhIIm4J.5qeBcA8t/0vHFJrSPnr4MlbQRbZFoTJD/u', 'MDJvujxjn6', 0, '1', 0, '2025-02-01 06:12:18', '2025-02-01 06:12:18', NULL, 1, 0, NULL),
(14, 'SVS001', 'Vada Carroll', 'iupton', 'melvina43@example.net', NULL, '$2y$10$58Vpaez/zZSqDfl67EJPx.EJ/MYf6gYH7c97oKXDzZJJpyKLLeLXq', 'GQ5tkIv9Ld', 0, '1', 0, '2025-02-01 06:12:18', '2025-02-01 06:12:18', NULL, 1, 0, NULL),
(15, 'SVS001', 'Juana Pfeffer', 'jaydon36', 'alice@example.com', NULL, 'e10adc3949ba59abbe56e057f20f883e', 'qQlIrsdL4r', 0, '1', 0, '2025-02-01 06:12:18', '2025-02-01 06:12:18', NULL, 1, 0, NULL),
(16, 'SVS001', 'Dr. Justina Tremblay', 'nienow.alden', 'kschultz@example.com', NULL, '$2y$10$GwRoEQlo.zYBzm4J.EEA3u6k9gPh391HnpeH4XoiexQjtAJgPWQzS', 'R1KwRjDfCV', 0, '1', 0, '2025-02-01 06:12:18', '2025-02-01 06:12:18', NULL, 1, 0, NULL),
(17, 'SVS001', 'Stefanie Kihn', 'parker.ryder', 'stehr.chyna@example.net', NULL, '$2y$10$drACEvq6e9PWumDZqp8jU.t.3couOeYY2KSGDIRTjO9D.3Rr9loSq', 'EGaRGHZDeY', 0, '1', 0, '2025-02-01 06:12:18', '2025-02-01 06:12:18', NULL, 1, 0, NULL),
(18, 'SVS001', 'Mr. Monroe Nienow PhD', 'charber', 'xwest@example.net', NULL, '$2y$10$jT0KHe30yrUcFnJpcWKaq.u.VFp.37qWLW0RzX3Pwm48tSLE4rHuy', 'tj7bVbyt8i', 0, '1', 0, '2025-02-01 06:12:18', '2025-02-01 06:12:18', NULL, 1, 0, NULL),
(19, 'SVS001', 'Genevieve Wilderman', 'lorn', 'tlynch@example.net', NULL, '$2y$10$k4VjwFwyMK4DFxXQVyqSZ.OFue8pfyETcvJdi5.R3fBz5sKTo2iqu', 'obcVIScHZ0', 0, '1', 0, '2025-02-01 06:12:18', '2025-02-01 06:12:18', NULL, 1, 0, NULL),
(20, 'SVS001', 'Mrs. Aida Grimes', 'ollie72', 'douglas.jalyn@example.net', NULL, '$2y$10$QMVMDYXxbH8GNx1k7sXtLemjb8d9YhsJcifOQDWSfM3c4NokhtN9G', 'mSkg9ZWrd8', 0, '1', 0, '2025-02-01 06:12:19', '2025-02-01 06:12:19', NULL, 1, 0, NULL),
(21, 'SVS001', 'Kailey Ritchie', 'rdavis', 'mcclure.myron@example.net', NULL, '$2y$10$B4KMz1oYLho/8m0oZpMxDeD.DBMWHhINKZ/VtV7OJATJVxP9rhsd2', 'lfx57A6DfA', 0, '1', 0, '2025-02-01 06:12:19', '2025-02-01 06:12:19', NULL, 1, 0, NULL),
(22, 'SVS001', 'Vella Konopelski PhD', 'jacobson.shyanne', 'joy22@example.org', NULL, '$2y$10$uqnVEDC4aRpAmhZAb2e7VO9idmHhzhHOjxdCFpzHNh6.wBT4fdvyO', 'fWIOlewnZv', 0, '1', 0, '2025-02-01 06:12:19', '2025-02-01 06:12:19', NULL, 1, 0, NULL),
(23, 'SVS001', 'Prof. Raymond Ruecker MD', 'jaren.weimann', 'dpurdy@example.org', NULL, '$2y$10$QhdczGW6nAh8uir7fUb4Bud/MQyyeILoUpFTxzFjvkfYBjWmgp3LK', 'YZXU996KKG', 0, '1', 0, '2025-02-01 06:12:19', '2025-02-01 06:12:19', NULL, 1, 0, NULL),
(24, 'SVS001', 'Mr. Hiram Jacobi I', 'dtowne', 'bkuvalis@example.net', NULL, '$2y$10$ETW5BonxFH3icqucYnigruU7j0IR8C6TAoEMC6ILHN7x5jOBgAY9y', 'g1tH0ISVul', 0, '1', 0, '2025-02-01 06:12:19', '2025-02-01 06:12:19', NULL, 1, 0, NULL),
(25, 'SVS001', 'Roxanne Mante PhD', 'rowe.therese', 'alphonso.stroman@example.org', NULL, '$2y$10$5J/NEfBWBDumSnLdgty3Mu1ho4Pl0d97zJCPrty60nk1L0AJO3Gti', 'ubJBkiYCPP', 0, '1', 0, '2025-02-01 06:12:19', '2025-02-01 06:12:19', NULL, 1, 0, NULL),
(26, 'SVS001', 'Damian Weissnat', 'pedro33', 'emilio80@example.com', NULL, '$2y$10$ffyMAKsh8OozEI1TaZqlNe.NmSqQydoTF6j9hI7ZGdR6rJF1E8nxC', 'Xw85ZuDJQF', 0, '1', 0, '2025-02-01 06:12:19', '2025-02-01 06:12:19', NULL, 1, 0, NULL),
(27, 'SVS001', 'Keaton Herman', 'jefferey47', 'hector69@example.com', NULL, '$2y$10$XgetYhb1lvIO1bMz.Tql6.E4V0F6s0Wt2Iq5fu3.xQKHC7/yE1uEa', 'MCQcR3luZs', 0, '1', 0, '2025-02-01 06:12:19', '2025-02-01 06:12:19', NULL, 1, 0, NULL),
(28, 'SVS001', 'Mr. Ladarius Morissette Sr.', 'rutherford.bobby', 'roob.kaleb@example.net', NULL, '$2y$10$sk2EF2Sd1cUq041uBOxT..2lsBhaKvxL6v4ZjHkF7unyoprGPAHGq', 'aL3HDfPeZ7', 0, '1', 0, '2025-02-01 06:12:19', '2025-02-01 06:12:19', NULL, 1, 0, NULL),
(29, 'SVS001', 'Mathias Marks', 'micheal.murphy', 'esperanza.schoen@example.com', NULL, '$2y$10$unUGbKP9hT7djVP6MxJl7eFiV4yZLpdah5JQBHiQGPhB0EI.s3vgO', 'UnAs7oqEUw', 0, '1', 0, '2025-02-01 06:12:19', '2025-02-01 06:12:19', NULL, 1, 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users_permissions`
--

CREATE TABLE `users_permissions` (
  `user_id` int UNSIGNED NOT NULL,
  `permission_id` int UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_by` int UNSIGNED DEFAULT NULL,
  `updated_by` int UNSIGNED DEFAULT NULL,
  `deleted_by` int UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_roles`
--

CREATE TABLE `user_roles` (
  `user_id` int UNSIGNED NOT NULL,
  `role_id` int UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_by` int UNSIGNED DEFAULT NULL,
  `updated_by` int UNSIGNED DEFAULT NULL,
  `deleted_by` int UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Dumping data for table `user_roles`
--

INSERT INTO `user_roles` (`user_id`, `role_id`, `created_at`, `updated_at`, `deleted_at`, `created_by`, `updated_by`, `deleted_by`) VALUES
(1, 1, '2025-02-01 06:12:06', '2025-02-01 06:12:06', NULL, 0, 0, NULL),
(2, 1, '2025-02-01 06:12:06', '2025-02-01 06:12:06', NULL, 0, 0, NULL),
(3, 2, '2025-02-01 06:12:17', '2025-02-01 06:12:18', NULL, 1, 0, NULL),
(4, 5, '2025-02-01 06:12:17', '2025-02-01 06:12:18', NULL, 1, 0, NULL),
(5, 7, '2025-02-01 06:12:17', '2025-02-01 06:12:18', NULL, 1, 0, NULL),
(6, 2, '2025-02-01 06:12:18', '2025-02-01 06:12:18', NULL, 1, 0, NULL),
(7, 2, '2025-02-01 06:12:18', '2025-02-01 06:12:18', NULL, 1, 0, NULL),
(8, 2, '2025-02-01 06:12:18', '2025-02-01 06:12:18', NULL, 1, 0, NULL),
(9, 2, '2025-02-01 06:12:18', '2025-02-01 06:12:18', NULL, 1, 0, NULL),
(10, 2, '2025-02-01 06:12:18', '2025-02-01 06:12:18', NULL, 1, 0, NULL),
(11, 2, '2025-02-01 06:12:18', '2025-02-01 06:12:18', NULL, 1, 0, NULL),
(12, 5, '2025-02-01 06:12:18', '2025-02-01 06:12:18', NULL, 1, 0, NULL),
(13, 6, '2025-02-01 06:12:18', '2025-02-01 06:12:18', NULL, 1, 0, NULL),
(14, 7, '2025-02-01 06:12:18', '2025-02-01 06:12:18', NULL, 1, 0, NULL),
(15, 3, '2025-02-01 06:12:18', '2025-02-01 06:12:19', NULL, 1, 0, NULL),
(16, 3, '2025-02-01 06:12:18', '2025-02-01 06:12:19', NULL, 1, 0, NULL),
(17, 3, '2025-02-01 06:12:18', '2025-02-01 06:12:19', NULL, 1, 0, NULL),
(18, 3, '2025-02-01 06:12:18', '2025-02-01 06:12:19', NULL, 1, 0, NULL),
(19, 3, '2025-02-01 06:12:18', '2025-02-01 06:12:19', NULL, 1, 0, NULL),
(20, 3, '2025-02-01 06:12:18', '2025-02-01 06:12:19', NULL, 1, 0, NULL),
(21, 3, '2025-02-01 06:12:18', '2025-02-01 06:12:19', NULL, 1, 0, NULL),
(22, 3, '2025-02-01 06:12:18', '2025-02-01 06:12:19', NULL, 1, 0, NULL),
(23, 3, '2025-02-01 06:12:18', '2025-02-01 06:12:19', NULL, 1, 0, NULL),
(24, 3, '2025-02-01 06:12:18', '2025-02-01 06:12:19', NULL, 1, 0, NULL),
(25, 3, '2025-02-01 06:12:18', '2025-02-01 06:12:19', NULL, 1, 0, NULL),
(26, 3, '2025-02-01 06:12:18', '2025-02-01 06:12:19', NULL, 1, 0, NULL),
(27, 3, '2025-02-01 06:12:18', '2025-02-01 06:12:19', NULL, 1, 0, NULL),
(28, 3, '2025-02-01 06:12:18', '2025-02-01 06:12:19', NULL, 1, 0, NULL),
(29, 3, '2025-02-01 06:12:18', '2025-02-01 06:12:19', NULL, 1, 0, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `about_contents`
--
ALTER TABLE `about_contents`
  ADD PRIMARY KEY (`id`),
  ADD KEY `about_contents_created_by_index` (`created_by`),
  ADD KEY `about_contents_updated_by_index` (`updated_by`),
  ADD KEY `about_contents_deleted_by_index` (`deleted_by`);

--
-- Indexes for table `about_sliders`
--
ALTER TABLE `about_sliders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `about_sliders_created_by_index` (`created_by`),
  ADD KEY `about_sliders_updated_by_index` (`updated_by`),
  ADD KEY `about_sliders_deleted_by_index` (`deleted_by`);

--
-- Indexes for table `academic_years`
--
ALTER TABLE `academic_years`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `school_id` (`school_id`),
  ADD KEY `academic_years_created_by_index` (`created_by`),
  ADD KEY `academic_years_updated_by_index` (`updated_by`),
  ADD KEY `academic_years_deleted_by_index` (`deleted_by`),
  ADD KEY `school_id_2` (`school_id`);

--
-- Indexes for table `app_metas`
--
ALTER TABLE `app_metas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `app_metas_created_by_index` (`created_by`),
  ADD KEY `app_metas_updated_by_index` (`updated_by`),
  ADD KEY `app_metas_deleted_by_index` (`deleted_by`);

--
-- Indexes for table `book`
--
ALTER TABLE `book`
  ADD PRIMARY KEY (`BookId`);

--
-- Indexes for table `bookcategory`
--
ALTER TABLE `bookcategory`
  ADD PRIMARY KEY (`BookCategoryId`);

--
-- Indexes for table `bookcode`
--
ALTER TABLE `bookcode`
  ADD PRIMARY KEY (`BookCodeId`);

--
-- Indexes for table `buses`
--
ALTER TABLE `buses`
  ADD PRIMARY KEY (`s_no`);

--
-- Indexes for table `bus_root`
--
ALTER TABLE `bus_root`
  ADD PRIMARY KEY (`s_no`);

--
-- Indexes for table `bus_staff`
--
ALTER TABLE `bus_staff`
  ADD PRIMARY KEY (`s_no`);

--
-- Indexes for table `castcategory`
--
ALTER TABLE `castcategory`
  ADD PRIMARY KEY (`CastCategoryId`);

--
-- Indexes for table `class_sequences`
--
ALTER TABLE `class_sequences`
  ADD PRIMARY KEY (`name`);

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`),
  ADD KEY `employees_role_id_foreign` (`role_id`),
  ADD KEY `employees_updated_by_index` (`updated_by`),
  ADD KEY `employees_deleted_by_index` (`deleted_by`),
  ADD KEY `employees_created_by_index` (`created_by`) USING BTREE,
  ADD KEY `fk_employees_school_code` (`school_id`);

--
-- Indexes for table `employee_attendances`
--
ALTER TABLE `employee_attendances`
  ADD PRIMARY KEY (`id`),
  ADD KEY `employee_attendances_employee_id_foreign` (`employee_id`),
  ADD KEY `employee_attendances_created_by_index` (`created_by`),
  ADD KEY `employee_attendances_updated_by_index` (`updated_by`),
  ADD KEY `employee_attendances_deleted_by_index` (`deleted_by`);

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`),
  ADD KEY `events_created_by_index` (`created_by`),
  ADD KEY `fk_class_events` (`class_id`);

--
-- Indexes for table `exams`
--
ALTER TABLE `exams`
  ADD PRIMARY KEY (`id`),
  ADD KEY `exams_created_by_index` (`created_by`),
  ADD KEY `exams_updated_by_index` (`updated_by`),
  ADD KEY `exams_deleted_by_index` (`deleted_by`);

--
-- Indexes for table `exam_rules`
--
ALTER TABLE `exam_rules`
  ADD PRIMARY KEY (`id`),
  ADD KEY `exam_rules_class_id_foreign` (`class_id`),
  ADD KEY `exam_rules_subject_id_foreign` (`subject_id`),
  ADD KEY `exam_rules_grade_id_foreign` (`grade_id`),
  ADD KEY `exam_rules_combine_subject_id_foreign` (`combine_subject_id`),
  ADD KEY `exam_rules_created_by_index` (`created_by`),
  ADD KEY `exam_rules_updated_by_index` (`updated_by`),
  ADD KEY `exam_rules_deleted_by_index` (`deleted_by`);

--
-- Indexes for table `fee_structure`
--
ALTER TABLE `fee_structure`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_fee_structure` (`school_id`,`class_group`,`academic_year`,`fee_type`),
  ADD UNIQUE KEY `class_group` (`class_group`) USING BTREE;

--
-- Indexes for table `fee_types`
--
ALTER TABLE `fee_types`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `grades`
--
ALTER TABLE `grades`
  ADD PRIMARY KEY (`id`),
  ADD KEY `grades_created_by_index` (`created_by`),
  ADD KEY `grades_updated_by_index` (`updated_by`),
  ADD KEY `grades_deleted_by_index` (`deleted_by`);

--
-- Indexes for table `hostelfees`
--
ALTER TABLE `hostelfees`
  ADD PRIMARY KEY (`HostelFeeId`);

--
-- Indexes for table `hostelrecord`
--
ALTER TABLE `hostelrecord`
  ADD PRIMARY KEY (`HostelRecordId`);

--
-- Indexes for table `i_classes`
--
ALTER TABLE `i_classes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `class_id` (`class_id`),
  ADD KEY `fk_class_teacher` (`class_teacher`),
  ADD KEY `fk_class_leader` (`class_leader`),
  ADD KEY `fk_i_classes_class` (`school_id`);

--
-- Indexes for table `leaves`
--
ALTER TABLE `leaves`
  ADD PRIMARY KEY (`id`),
  ADD KEY `leaves_employee_id_foreign` (`employee_id`),
  ADD KEY `leaves_created_by_index` (`created_by`),
  ADD KEY `leaves_updated_by_index` (`updated_by`),
  ADD KEY `leaves_deleted_by_index` (`deleted_by`);

--
-- Indexes for table `lesson_notes`
--
ALTER TABLE `lesson_notes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_lesson_class` (`class_id`),
  ADD KEY `fk_lesson_teacher` (`teacher_id`),
  ADD KEY `fk_lesson_subject` (`subject_id`);

--
-- Indexes for table `libraryreg`
--
ALTER TABLE `libraryreg`
  ADD PRIMARY KEY (`LibraryId`);

--
-- Indexes for table `marks`
--
ALTER TABLE `marks`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `marks_class_id_exam_id_registration_id_subject_id_unique` (`class_id`,`exam_id`,`registration_id`,`subject_id`),
  ADD KEY `marks_academic_year_id_foreign` (`academic_year_id`),
  ADD KEY `marks_section_id_foreign` (`section_id`),
  ADD KEY `marks_registration_id_foreign` (`registration_id`),
  ADD KEY `marks_exam_id_foreign` (`exam_id`),
  ADD KEY `marks_subject_id_foreign` (`subject_id`),
  ADD KEY `marks_created_by_index` (`created_by`),
  ADD KEY `marks_updated_by_index` (`updated_by`),
  ADD KEY `marks_deleted_by_index` (`deleted_by`);

--
-- Indexes for table `months`
--
ALTER TABLE `months`
  ADD PRIMARY KEY (`MonthNo`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `notifications_notifiable_type_notifiable_id_index` (`notifiable_type`,`notifiable_id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_permissions_role` (`group_id`);

--
-- Indexes for table `registrations`
--
ALTER TABLE `registrations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `id_2` (`id`);

--
-- Indexes for table `results`
--
ALTER TABLE `results`
  ADD PRIMARY KEY (`id`),
  ADD KEY `results_academic_year_id_foreign` (`academic_year_id`),
  ADD KEY `results_class_id_foreign` (`class_id`),
  ADD KEY `results_registration_id_foreign` (`registration_id`),
  ADD KEY `results_exam_id_foreign` (`exam_id`),
  ADD KEY `results_created_by_index` (`created_by`),
  ADD KEY `results_updated_by_index` (`updated_by`),
  ADD KEY `results_deleted_by_index` (`deleted_by`);

--
-- Indexes for table `result_publish`
--
ALTER TABLE `result_publish`
  ADD PRIMARY KEY (`id`),
  ADD KEY `result_publish_academic_year_id_foreign` (`academic_year_id`),
  ADD KEY `result_publish_class_id_foreign` (`class_id`),
  ADD KEY `result_publish_exam_id_foreign` (`exam_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `roles_name_unique` (`name`),
  ADD KEY `roles_created_by_index` (`created_by`),
  ADD KEY `roles_updated_by_index` (`updated_by`),
  ADD KEY `roles_deleted_by_index` (`deleted_by`);

--
-- Indexes for table `roles_permissions`
--
ALTER TABLE `roles_permissions`
  ADD KEY `roles_permissions_role_id_foreign` (`role_id`),
  ADD KEY `roles_permissions_permission_id_foreign` (`permission_id`),
  ADD KEY `roles_permissions_created_by_index` (`created_by`),
  ADD KEY `roles_permissions_updated_by_index` (`updated_by`),
  ADD KEY `roles_permissions_deleted_by_index` (`deleted_by`);

--
-- Indexes for table `schools`
--
ALTER TABLE `schools`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `code` (`code`);

--
-- Indexes for table `school_fees`
--
ALTER TABLE `school_fees`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `student_id` (`student_id`),
  ADD UNIQUE KEY `user_id` (`student_id`),
  ADD KEY `fk_school_fees_code` (`school_id`),
  ADD KEY `fk_school_fees_i_classes` (`class_id`);

--
-- Indexes for table `school_finances`
--
ALTER TABLE `school_finances`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `bill_id` (`bill_id`),
  ADD KEY `fk_school_finance_student_user` (`student_id`),
  ADD KEY `fk_school_finance_staff_user` (`staff_id`);

--
-- Indexes for table `sequences`
--
ALTER TABLE `sequences`
  ADD PRIMARY KEY (`name`);

--
-- Indexes for table `site_metas`
--
ALTER TABLE `site_metas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `site_metas_created_by_index` (`created_by`),
  ADD KEY `site_metas_updated_by_index` (`updated_by`),
  ADD KEY `site_metas_deleted_by_index` (`deleted_by`);

--
-- Indexes for table `stafftype`
--
ALTER TABLE `stafftype`
  ADD PRIMARY KEY (`StaffTypeId`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`),
  ADD UNIQUE KEY `unique_user_id` (`user_id`),
  ADD UNIQUE KEY `user_id_2` (`user_id`),
  ADD UNIQUE KEY `user_id_3` (`user_id`),
  ADD KEY `students_created_by_index` (`created_by`),
  ADD KEY `students_updated_by_index` (`updated_by`),
  ADD KEY `students_deleted_by_index` (`deleted_by`),
  ADD KEY `idx_user_id` (`user_id`),
  ADD KEY `fk_student_class` (`class_id`),
  ADD KEY `fk_students_school_code` (`school_id`);

--
-- Indexes for table `student_attendances`
--
ALTER TABLE `student_attendances`
  ADD PRIMARY KEY (`id`),
  ADD KEY `student_attendances_academic_year_id_foreign` (`academic_year_id`),
  ADD KEY `student_attendances_class_id_foreign` (`class_id`),
  ADD KEY `student_attendances_created_by_index` (`created_by`),
  ADD KEY `student_attendances_updated_by_index` (`updated_by`),
  ADD KEY `student_attendances_deleted_by_index` (`deleted_by`),
  ADD KEY `fk_student_attendances` (`registration_id`);

--
-- Indexes for table `subjects`
--
ALTER TABLE `subjects`
  ADD PRIMARY KEY (`id`),
  ADD KEY `subjects_created_by_index` (`created_by`),
  ADD KEY `subjects_updated_by_index` (`updated_by`),
  ADD KEY `subjects_deleted_by_index` (`deleted_by`);

--
-- Indexes for table `teacher_profiles`
--
ALTER TABLE `teacher_profiles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `teacher_profiles_created_by_index` (`created_by`),
  ADD KEY `teacher_profiles_updated_by_index` (`updated_by`),
  ADD KEY `teacher_profiles_deleted_by_index` (`deleted_by`);

--
-- Indexes for table `testimonials`
--
ALTER TABLE `testimonials`
  ADD PRIMARY KEY (`id`),
  ADD KEY `testimonials_created_by_index` (`created_by`),
  ADD KEY `testimonials_updated_by_index` (`updated_by`),
  ADD KEY `testimonials_deleted_by_index` (`deleted_by`);

--
-- Indexes for table `timetable`
--
ALTER TABLE `timetable`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_class_id` (`class_id`),
  ADD KEY `fk_employ_timetable` (`staff_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_username_unique` (`username`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD KEY `users_created_by_index` (`created_by`),
  ADD KEY `users_updated_by_index` (`updated_by`),
  ADD KEY `users_deleted_by_index` (`deleted_by`),
  ADD KEY `fk_users_school_code` (`school_id`);

--
-- Indexes for table `users_permissions`
--
ALTER TABLE `users_permissions`
  ADD KEY `users_permissions_user_id_foreign` (`user_id`),
  ADD KEY `users_permissions_permission_id_foreign` (`permission_id`),
  ADD KEY `users_permissions_created_by_index` (`created_by`),
  ADD KEY `users_permissions_updated_by_index` (`updated_by`),
  ADD KEY `users_permissions_deleted_by_index` (`deleted_by`);

--
-- Indexes for table `user_roles`
--
ALTER TABLE `user_roles`
  ADD PRIMARY KEY (`user_id`,`role_id`),
  ADD KEY `user_roles_role_id_foreign` (`role_id`),
  ADD KEY `user_roles_created_by_index` (`created_by`),
  ADD KEY `user_roles_updated_by_index` (`updated_by`),
  ADD KEY `user_roles_deleted_by_index` (`deleted_by`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `about_contents`
--
ALTER TABLE `about_contents`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `about_sliders`
--
ALTER TABLE `about_sliders`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `academic_years`
--
ALTER TABLE `academic_years`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `app_metas`
--
ALTER TABLE `app_metas`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `book`
--
ALTER TABLE `book`
  MODIFY `BookId` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `bookcategory`
--
ALTER TABLE `bookcategory`
  MODIFY `BookCategoryId` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `bookcode`
--
ALTER TABLE `bookcode`
  MODIFY `BookCodeId` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `buses`
--
ALTER TABLE `buses`
  MODIFY `s_no` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `bus_root`
--
ALTER TABLE `bus_root`
  MODIFY `s_no` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `bus_staff`
--
ALTER TABLE `bus_staff`
  MODIFY `s_no` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `castcategory`
--
ALTER TABLE `castcategory`
  MODIFY `CastCategoryId` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `employee_attendances`
--
ALTER TABLE `employee_attendances`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=118;

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `exams`
--
ALTER TABLE `exams`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `exam_rules`
--
ALTER TABLE `exam_rules`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `fee_structure`
--
ALTER TABLE `fee_structure`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `fee_types`
--
ALTER TABLE `fee_types`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `grades`
--
ALTER TABLE `grades`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `hostelfees`
--
ALTER TABLE `hostelfees`
  MODIFY `HostelFeeId` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `hostelrecord`
--
ALTER TABLE `hostelrecord`
  MODIFY `HostelRecordId` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `i_classes`
--
ALTER TABLE `i_classes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `leaves`
--
ALTER TABLE `leaves`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `lesson_notes`
--
ALTER TABLE `lesson_notes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `libraryreg`
--
ALTER TABLE `libraryreg`
  MODIFY `LibraryId` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `marks`
--
ALTER TABLE `marks`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `months`
--
ALTER TABLE `months`
  MODIFY `MonthNo` smallint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=233;

--
-- AUTO_INCREMENT for table `registrations`
--
ALTER TABLE `registrations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `results`
--
ALTER TABLE `results`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `result_publish`
--
ALTER TABLE `result_publish`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `schools`
--
ALTER TABLE `schools`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `school_fees`
--
ALTER TABLE `school_fees`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `school_finances`
--
ALTER TABLE `school_finances`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT for table `site_metas`
--
ALTER TABLE `site_metas`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `stafftype`
--
ALTER TABLE `stafftype`
  MODIFY `StaffTypeId` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=119;

--
-- AUTO_INCREMENT for table `student_attendances`
--
ALTER TABLE `student_attendances`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=222;

--
-- AUTO_INCREMENT for table `subjects`
--
ALTER TABLE `subjects`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `teacher_profiles`
--
ALTER TABLE `teacher_profiles`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `testimonials`
--
ALTER TABLE `testimonials`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `timetable`
--
ALTER TABLE `timetable`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=241;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `academic_years`
--
ALTER TABLE `academic_years`
  ADD CONSTRAINT `fk_academic_year_code` FOREIGN KEY (`school_id`) REFERENCES `schools` (`code`);

--
-- Constraints for table `employees`
--
ALTER TABLE `employees`
  ADD CONSTRAINT `employees_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`),
  ADD CONSTRAINT `fk_employees_school_code` FOREIGN KEY (`school_id`) REFERENCES `schools` (`code`);

--
-- Constraints for table `employee_attendances`
--
ALTER TABLE `employee_attendances`
  ADD CONSTRAINT `employee_attendances_employee_id_foreign` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`id`);

--
-- Constraints for table `events`
--
ALTER TABLE `events`
  ADD CONSTRAINT `fk_class_events` FOREIGN KEY (`class_id`) REFERENCES `i_classes` (`class_id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `exam_rules`
--
ALTER TABLE `exam_rules`
  ADD CONSTRAINT `exam_rules_combine_subject_id_foreign` FOREIGN KEY (`combine_subject_id`) REFERENCES `subjects` (`id`),
  ADD CONSTRAINT `exam_rules_grade_id_foreign` FOREIGN KEY (`grade_id`) REFERENCES `grades` (`id`),
  ADD CONSTRAINT `exam_rules_subject_id_foreign` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`id`);

--
-- Constraints for table `fee_structure`
--
ALTER TABLE `fee_structure`
  ADD CONSTRAINT `fk_structure_code` FOREIGN KEY (`school_id`) REFERENCES `schools` (`code`) ON UPDATE CASCADE;

--
-- Constraints for table `i_classes`
--
ALTER TABLE `i_classes`
  ADD CONSTRAINT `fk_class_leader` FOREIGN KEY (`class_leader`) REFERENCES `students` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_class_teacher` FOREIGN KEY (`class_teacher`) REFERENCES `employees` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_i_classes_class` FOREIGN KEY (`school_id`) REFERENCES `schools` (`code`);

--
-- Constraints for table `leaves`
--
ALTER TABLE `leaves`
  ADD CONSTRAINT `leaves_employee_id_foreign` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`id`);

--
-- Constraints for table `lesson_notes`
--
ALTER TABLE `lesson_notes`
  ADD CONSTRAINT `fk_lesson_class` FOREIGN KEY (`class_id`) REFERENCES `i_classes` (`class_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_lesson_subject` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_lesson_teacher` FOREIGN KEY (`teacher_id`) REFERENCES `employees` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `marks`
--
ALTER TABLE `marks`
  ADD CONSTRAINT `marks_academic_year_id_foreign` FOREIGN KEY (`academic_year_id`) REFERENCES `academic_years` (`id`),
  ADD CONSTRAINT `marks_exam_id_foreign` FOREIGN KEY (`exam_id`) REFERENCES `exams` (`id`),
  ADD CONSTRAINT `marks_subject_id_foreign` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`id`);

--
-- Constraints for table `permissions`
--
ALTER TABLE `permissions`
  ADD CONSTRAINT `fk_permissions_role` FOREIGN KEY (`group_id`) REFERENCES `roles` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `results`
--
ALTER TABLE `results`
  ADD CONSTRAINT `results_academic_year_id_foreign` FOREIGN KEY (`academic_year_id`) REFERENCES `academic_years` (`id`),
  ADD CONSTRAINT `results_exam_id_foreign` FOREIGN KEY (`exam_id`) REFERENCES `exams` (`id`);

--
-- Constraints for table `result_publish`
--
ALTER TABLE `result_publish`
  ADD CONSTRAINT `result_publish_academic_year_id_foreign` FOREIGN KEY (`academic_year_id`) REFERENCES `academic_years` (`id`),
  ADD CONSTRAINT `result_publish_exam_id_foreign` FOREIGN KEY (`exam_id`) REFERENCES `exams` (`id`);

--
-- Constraints for table `roles_permissions`
--
ALTER TABLE `roles_permissions`
  ADD CONSTRAINT `roles_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `roles_permissions_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `school_fees`
--
ALTER TABLE `school_fees`
  ADD CONSTRAINT `fk_school_fees_code` FOREIGN KEY (`school_id`) REFERENCES `schools` (`code`),
  ADD CONSTRAINT `fk_school_fees_i_classes` FOREIGN KEY (`class_id`) REFERENCES `i_classes` (`class_id`),
  ADD CONSTRAINT `fk_school_fees_student` FOREIGN KEY (`student_id`) REFERENCES `students` (`user_id`);

--
-- Constraints for table `school_finances`
--
ALTER TABLE `school_finances`
  ADD CONSTRAINT `fk_constraint_student` FOREIGN KEY (`student_id`) REFERENCES `students` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_school_finance_staff_user` FOREIGN KEY (`staff_id`) REFERENCES `employees` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_school_finance_student_user` FOREIGN KEY (`student_id`) REFERENCES `students` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_sf_student_userid` FOREIGN KEY (`student_id`) REFERENCES `students` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `students`
--
ALTER TABLE `students`
  ADD CONSTRAINT `fk_student_class` FOREIGN KEY (`class_id`) REFERENCES `i_classes` (`class_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_students_school_code` FOREIGN KEY (`school_id`) REFERENCES `schools` (`code`);

--
-- Constraints for table `student_attendances`
--
ALTER TABLE `student_attendances`
  ADD CONSTRAINT `fk_student_attendances` FOREIGN KEY (`registration_id`) REFERENCES `students` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `student_attendances_academic_year_id_foreign` FOREIGN KEY (`academic_year_id`) REFERENCES `academic_years` (`id`);

--
-- Constraints for table `timetable`
--
ALTER TABLE `timetable`
  ADD CONSTRAINT `fk_class_id` FOREIGN KEY (`class_id`) REFERENCES `i_classes` (`class_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_employ_timetable` FOREIGN KEY (`staff_id`) REFERENCES `employees` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `fk_susers_school_code` FOREIGN KEY (`school_id`) REFERENCES `schools` (`code`);

--
-- Constraints for table `users_permissions`
--
ALTER TABLE `users_permissions`
  ADD CONSTRAINT `users_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `users_permissions_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `user_roles`
--
ALTER TABLE `user_roles`
  ADD CONSTRAINT `user_roles_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`),
  ADD CONSTRAINT `user_roles_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
