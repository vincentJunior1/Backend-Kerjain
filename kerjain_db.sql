-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 16, 2021 at 02:56 PM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kerjain_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `chat`
--

CREATE TABLE `chat` (
  `chat_id` int(11) NOT NULL,
  `chat_content` varchar(255) NOT NULL,
  `user_id_from` int(11) NOT NULL,
  `user_id_to` int(11) NOT NULL,
  `chat_created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `chat_updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `contact`
--

CREATE TABLE `contact` (
  `contact_id` int(11) NOT NULL,
  `contact_linkedin` varchar(255) NOT NULL,
  `contact_instagram` varchar(255) NOT NULL,
  `contact_phone` varchar(20) NOT NULL,
  `contact_github` varchar(255) NOT NULL,
  `contact_created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `contact_updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `contact`
--

INSERT INTO `contact` (`contact_id`, `contact_linkedin`, `contact_instagram`, `contact_phone`, `contact_github`, `contact_created_at`, `contact_updated_at`) VALUES
(2, 'three', 'one', 'four', 'two', '2021-01-16 07:58:40', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `exp`
--

CREATE TABLE `exp` (
  `exp_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `exp_position` varchar(255) NOT NULL,
  `exp_company` varchar(255) NOT NULL,
  `exp_desc` varchar(255) NOT NULL,
  `exp_start` datetime NOT NULL,
  `exp_end` datetime NOT NULL,
  `exp_created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `exp_updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `portofolio`
--

CREATE TABLE `portofolio` (
  `porto_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `porto_name` varchar(255) NOT NULL,
  `porto_link` varchar(255) NOT NULL,
  `porto_type` varchar(255) NOT NULL,
  `porto_image` varchar(255) NOT NULL,
  `porto_created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `porto_updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `portofolio`
--

INSERT INTO `portofolio` (`porto_id`, `user_id`, `porto_name`, `porto_link`, `porto_type`, `porto_image`, `porto_created_at`, `porto_updated_at`) VALUES
(1, 1, 'coffeeshop', 'bit.ly/porto', 'web', '2021-01-16T09-41-33.668Zunnamed1.png', '2021-01-16 09:41:33', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `skill`
--

CREATE TABLE `skill` (
  `skill_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `skill_name` varchar(255) NOT NULL,
  `skill_created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `skill_updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `skill`
--

INSERT INTO `skill` (`skill_id`, `user_id`, `skill_name`, `skill_created_at`, `skill_updated_at`) VALUES
(1, 1, 'C#', '2021-01-14 19:39:45', '2021-01-16 01:56:31'),
(2, 1, 'REACT JS', '2021-01-14 19:39:45', '0000-00-00 00:00:00'),
(5, 2, 'Golang', '2021-01-16 01:04:29', '0000-00-00 00:00:00'),
(6, 6, 'c++', '2021-01-16 09:08:05', '2021-01-16 09:11:30');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `user_email` varchar(255) NOT NULL,
  `user_password` varchar(255) NOT NULL,
  `user_role` int(2) NOT NULL,
  `user_image` varchar(255) NOT NULL,
  `user_description` text NOT NULL,
  `user_status` int(2) NOT NULL,
  `user_created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `user_updated_at` datetime DEFAULT NULL,
  `user_jobdesc` varchar(255) NOT NULL,
  `user_field` varchar(255) NOT NULL,
  `user_key` int(11) NOT NULL,
  `user_location` varchar(255) NOT NULL,
  `user_workplace` varchar(255) NOT NULL,
  `user_about` text NOT NULL,
  `user_job_type` varchar(255) NOT NULL,
  `contact_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `user_name`, `user_email`, `user_password`, `user_role`, `user_image`, `user_description`, `user_status`, `user_created_at`, `user_updated_at`, `user_jobdesc`, `user_field`, `user_key`, `user_location`, `user_workplace`, `user_about`, `user_job_type`, `contact_id`) VALUES
(1, 'Kyara Amanda Rolan', 'amandarolan@gmail.com', '12345', 0, 'abc.jpg', 'jobseeker', 1, '2021-01-14 19:24:30', NULL, 'Programmer', 'Web Developer', 0, 'Padang', 'Jakarta', 'aaasassas', 'freelance', 1),
(2, 'Rina M', 'rinam@gmail.com', '12345', 0, 'abc.jpg', 'jobseeker', 1, '2021-01-14 19:26:13', NULL, 'Programmer', 'Web Developer', 0, 'Makassar', 'Jakarta', 'aaasassas', 'freelance', 2),
(3, 'Roni', 'roni@gmail.com', '12345', 0, 'abc.jpg', 'jobseeker', 1, '2021-01-14 19:26:47', NULL, 'Programmer', 'Web Developer', 0, 'Jakarta', 'Bandung', 'aaasassas', 'freelance', 3),
(4, 'Margareth', 'reta@gmail.com', '12345', 1, 'abc.jpg', 'jobseeker', 1, '2021-01-14 19:27:23', NULL, 'Programmer', 'Web Developer', 0, 'Jakarta', 'Bandung', 'aaasassas', 'fulltime', 4),
(5, 'Trias', 'trias@yahoo.com', '2675', 0, 'efg.png', 'Human', 1, '2021-01-16 07:16:56', NULL, 'Fullstack Dev', 'IT', 0, 'Jakarta', 'Jakarta', 'Human', 'Fulltime', 0),
(6, 'riskyamaliaharis', 'amaliaharisr@gmail.com', '$2b$10$gUpJa0YTzEripyI8hViESufwKrqbVS37XmLCTToUyMfTjeJGDsS2e', 0, '', 'gogogo', 0, '2021-01-16 10:20:39', NULL, 'Trainee', 'Web Developer', 0, 'Makassar', 'Batam', 'Me', 'Fulltime', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `chat`
--
ALTER TABLE `chat`
  ADD PRIMARY KEY (`chat_id`);

--
-- Indexes for table `contact`
--
ALTER TABLE `contact`
  ADD PRIMARY KEY (`contact_id`);

--
-- Indexes for table `exp`
--
ALTER TABLE `exp`
  ADD PRIMARY KEY (`exp_id`);

--
-- Indexes for table `portofolio`
--
ALTER TABLE `portofolio`
  ADD PRIMARY KEY (`porto_id`);

--
-- Indexes for table `skill`
--
ALTER TABLE `skill`
  ADD PRIMARY KEY (`skill_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `chat`
--
ALTER TABLE `chat`
  MODIFY `chat_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `contact`
--
ALTER TABLE `contact`
  MODIFY `contact_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `exp`
--
ALTER TABLE `exp`
  MODIFY `exp_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `portofolio`
--
ALTER TABLE `portofolio`
  MODIFY `porto_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `skill`
--
ALTER TABLE `skill`
  MODIFY `skill_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
