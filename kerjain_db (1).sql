-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 16, 2021 at 04:05 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.3.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
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

--
-- Dumping data for table `exp`
--

INSERT INTO `exp` (`exp_id`, `user_id`, `exp_position`, `exp_company`, `exp_desc`, `exp_start`, `exp_end`, `exp_created_at`, `exp_updated_at`) VALUES
(1, 2, 'Berhasil', 'Berhasil', 'Berhasil', '2014-01-20 00:00:00', '2014-05-21 00:00:00', '2021-01-16 08:24:34', '2021-01-16 09:53:03'),
(2, 2, 'Web development', 'Company.id', 'abcdefghijkl,', '2014-01-20 00:00:00', '2014-01-20 00:00:00', '2021-01-16 08:25:18', '0000-00-00 00:00:00'),
(3, 3, 'Web development', 'Company.id', 'abcdefghijkl,', '2014-01-20 00:00:00', '2014-01-20 00:00:00', '2021-01-16 08:35:58', '0000-00-00 00:00:00'),
(4, 3, 'Web development', 'Company.id', 'abcdefghijkl,', '2014-01-20 00:00:00', '2014-01-20 00:00:00', '2021-01-16 08:36:01', '0000-00-00 00:00:00');

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
(1, 'edit berhasil', 'test@gmail.com', '$2b$10$0McyeuHwLCxeJQdd5s/X5.akhAiSb7E2jEELx5uKylsoObQcXx0d.', 0, '2021-01-15T12-54-10.631Zdownload (1).jpg', 'edit berhasil', 0, '2021-01-14 19:34:01', '2021-01-15 12:54:10', 'edit berhasil', '', 0, 'edit berhasil', 'edit berhasil', '', '', 0),
(2, 'testing', 'testing@gmail.com', '$2b$10$PqzL6FDkooDzPk4HXN3L4.T5LtJts1vJDWTuf6d3/XzL8Bf8MUaGm', 0, '', '', 0, '2021-01-14 19:59:03', NULL, '', '', 0, '', '', '', '', 0),
(3, 'testing', 'testing1@gmail.com', '$2b$10$RVAt0lY6NopapQf7Lou6Iebwvu/2/9arhRmnP3iAmoff3zxN1JuiW', 0, '', '', 0, '2021-01-14 20:29:53', NULL, '', '', 0, '', '', '', '', 0),
(4, 'millaaprillya', 'milla@gmail.com', '$2b$10$Yy7xUQ13s8OvAMWmHWVDSeOhawqlbPcC4h9aGnI3Qt/MSLQRmqAUi', 0, '', '', 0, '2021-01-15 00:24:55', NULL, '', '', 0, '', '', '', '', 0),
(5, 'companyid.com', 'company@gmail.com', '$2b$10$PJG5RcI6K8pKbWvMT5B5m.tfLBd.DwNmxftPzhr5UPUV9e5o5gdy6', 1, '', '', 0, '2021-01-15 00:39:54', NULL, '', '', 0, '', '', '', 'web developer', 0),
(6, 'millaaprillya', 'milla1@gmail.com', '$2b$10$JAmseOGgguw9ZJs.7tYD0.YQXjdY7YRtquIbCy0vb2t4UshzkAm7a', 0, '', '', 0, '2021-01-15 21:30:12', NULL, '', '', 0, '', '', '', '', 0),
(7, 'companyid.com', 'company2@gmail.com', '$2b$10$1ebj7mex30MszmnSlkWWuO7xxVfSwWVJphxBFhJMkC.7SMumHKHL6', 1, '', '', 0, '2021-01-15 21:31:12', NULL, '', '', 0, '', '', '', 'web developer', 0),
(8, 'millaaprillya', 'millaaprillya22@gmail.com', '$2b$10$kSZYbmsN86ovBnblOdBu/eUZEjNh49tr5rVH1fWa7iR8/6jnTrzf2', 0, '', '', 0, '2021-01-15 23:02:30', NULL, '', '', 0, '', '', '', '', 0),
(9, 'millaaprillya', 'millaaprillya2@gmail.com', '$2b$10$W.nS9fSA53vg7.pNAsxZC.q5RqSpcgsqpF2ep13kATCtYjAKWqWc6', 0, '', '', 0, '2021-01-15 23:03:03', NULL, '', '', 0, '', '', '', '', 0),
(10, 'millaaprillya', 'miliaaprillya22@gmail.com', '$2b$07$Og0WiqNDyfvK02jX5uVG3ewt.xZTpMylzdXZ.s5AxLrhs.Gv2xFj.', 0, '', '', 0, '2021-01-15 23:03:57', '2021-01-16 14:49:33', '', '', 7639, '', '', '', '', 0),
(11, 'millaaprillya', 'crused06@gmail.com', '$2b$10$ZwTBu2qKGn.sTgCSAPoRN.jsHpaNCWr2ne3D.etOilAjzEv568HdG', 0, '', '', 0, '2021-01-16 00:04:30', '2021-01-15 17:22:12', '', '', 6402, '', '', '', '', 0),
(12, 'millaaprillya', 'crused066@gmail.com', '$2b$10$nD3cyj/IsLJh67pc2Greb.yXXA7BWMrQW0mPbZgI2DtZRldjyhhcO', 0, 'blank-profile.jpg', '', 0, '2021-01-16 11:25:57', NULL, '', '', 0, '', '', '', '', 0);

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
  MODIFY `contact_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `exp`
--
ALTER TABLE `exp`
  MODIFY `exp_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `portofolio`
--
ALTER TABLE `portofolio`
  MODIFY `porto_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `skill`
--
ALTER TABLE `skill`
  MODIFY `skill_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
