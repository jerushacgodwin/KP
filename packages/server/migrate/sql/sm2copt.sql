-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jan 31, 2026 at 06:19 PM
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
-- Database: `sm2copt`
--

-- --------------------------------------------------------

--
-- Table structure for table `about_contents`
--

CREATE TABLE `about_contents` (
  `id` int UNSIGNED NOT NULL,
  `why_content` varchar(500) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `key_point_1_title` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `key_point_1_content` longtext CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `key_point_2_title` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `key_point_2_content` longtext CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci,
  `key_point_3_title` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `key_point_3_content` longtext CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci,
  `key_point_4_title` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `key_point_4_content` longtext CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci,
  `key_point_5_title` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `key_point_5_content` longtext CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci,
  `about_us` varchar(500) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `who_we_are` varchar(1000) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `intro_video_embed_code` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `video_site_link` varchar(500) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `created_by` int UNSIGNED DEFAULT NULL,
  `updated_by` int UNSIGNED DEFAULT NULL,
  `deleted_by` int UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `about_sliders`
--

CREATE TABLE `about_sliders` (
  `id` int UNSIGNED NOT NULL,
  `image` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `order` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `created_by` int UNSIGNED DEFAULT NULL,
  `updated_by` int UNSIGNED DEFAULT NULL,
  `deleted_by` int UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE utf8mb3_unicode_ci;

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
  `status` enum('0','1') CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_by` int UNSIGNED DEFAULT NULL,
  `updated_by` int UNSIGNED DEFAULT NULL,
  `deleted_by` int UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE utf8mb3_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `app_metas`
--

CREATE TABLE `app_metas` (
  `id` int UNSIGNED NOT NULL,
  `meta_key` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `meta_value` longtext CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_by` int UNSIGNED DEFAULT NULL,
  `updated_by` int UNSIGNED DEFAULT NULL,
  `deleted_by` int UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE utf8mb3_unicode_ci;

-- --------------------------------------------------------

--
-- Dumping data for table `app_metas`
--

INSERT INTO `app_metas` (`id`, `meta_key`, `meta_value`, `created_at`, `updated_at`, `deleted_at`, `created_by`, `updated_by`, `deleted_by`) VALUES
(2, 'academic_year', '1', '2025-02-01 06:12:18', '2025-02-01 06:12:18', NULL, 1, 0, NULL),
(3, 'frontend_website', '1', '2025-02-01 06:12:18', NULL, NULL, 1, NULL, NULL),
(4, 'language', 'en', '2025-02-01 06:12:18', NULL, NULL, 1, NULL, NULL),
(5, 'disable_language', '1', '2025-02-01 06:12:18', NULL, NULL, 1, NULL, NULL),
(6, 'institute_type', '1', '2025-02-01 06:12:18', NULL, NULL, 1, NULL, NULL),
(7, 'shift_data', '{"Morning":{"start":"08:00 am","end":"01:00 pm"},"Day":{"start":"02:00 pm","end":"07:00 pm"},"Evening":{"start":"12:00 am","end":"12:00 am"}}', '2025-02-01 06:12:18', NULL, NULL, 1, NULL, NULL),
(8, 'weekends', '[5]', '2025-02-01 06:12:18', NULL, NULL, 1, NULL, NULL),
(9, 'week_start_day', '6', '2025-02-01 06:12:18', NULL, NULL, 1, NULL, NULL),
(10, 'week_end_day', '5', '2025-02-01 06:12:18', NULL, NULL, 1, NULL, NULL),
(11, 'total_casual_leave', '14', '2025-02-01 06:12:18', NULL, NULL, 1, NULL, NULL),
(12, 'total_sick_leave', '10', '2025-02-01 06:12:18', NULL, NULL, 1, NULL, NULL),
(13, 'total_maternity_leave', '90', '2025-02-01 06:12:18', NULL, NULL, 1, NULL, NULL),
(14, 'total_special_leave', '5', '2025-02-01 06:12:18', NULL, NULL, 1, NULL, NULL),
(15, 'board_name', 'Dhaka', '2025-02-01 06:12:18', NULL, NULL, 1, NULL, NULL),
(16, 'result_default_grade_id', '1', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(17, 'institute_settings', '{"logo":"transparent_image.png","school_name":"Knowledge Pitch","address":"Opposite to VVHS school, Paloothara junction, Mavelikara, \r\nKerala-690505 "}', '2025-08-04 17:41:16', '2025-08-04 17:41:16', NULL, 1, 1, NULL);

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

-- --------------------------------------------------------

--
-- Table structure for table `buses`
--

CREATE TABLE `buses` (
  `s_no` int NOT NULL,
  `bus_id` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `bus_title` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `bus_number` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `request` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `bus_root`
--

CREATE TABLE `bus_root` (
  `s_no` int NOT NULL,
  `bus_id` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `location` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `arrival_time` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `serial` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `bus_staff`
--

CREATE TABLE `bus_staff` (
  `s_no` int NOT NULL,
  `id` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `bus_id` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `contact` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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

-- --------------------------------------------------------

--
-- Table structure for table `class_sequences`
--

CREATE TABLE `class_sequences` (
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `current_value` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_general_ci;

-- (rest of SQL dump follows)

