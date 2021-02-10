-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 18, 2021 at 11:30 AM
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

--
-- Dumping data for table `contact`
--

INSERT INTO `contact` (`contact_id`, `contact_linkedin`, `contact_instagram`, `contact_phone`, `contact_github`, `contact_created_at`, `contact_updated_at`) VALUES
(1, 'three', 'one', 'four', 'two', '2021-01-16 17:16:21', NULL),
(12, '', '', '', '', '2021-01-18 01:53:06', NULL);

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
(1, 2, 'Berhasil', 'Berhasil', 'Berhasil', '2014-01-20 00:00:00', '2014-05-21 00:00:00', '2021-01-16 08:24:34', '2021-01-16 18:25:25'),
(2, 2, 'Web development', 'Company.id', 'abcdefghijkl,', '2014-01-20 00:00:00', '2014-01-20 00:00:00', '2021-01-16 08:25:18', '0000-00-00 00:00:00'),
(3, 3, 'Web development', 'Company.id', 'abcdefghijkl,', '2014-01-20 00:00:00', '2014-01-20 00:00:00', '2021-01-16 08:35:58', '0000-00-00 00:00:00'),
(4, 3, 'Web development', 'Company.id', 'abcdefghijkl,', '2014-01-20 00:00:00', '2014-01-20 00:00:00', '2021-01-16 08:36:01', '0000-00-00 00:00:00'),
(7, 3, 'Web development', 'Company.id', 'abcdefghijkl,', '2014-01-20 00:00:00', '2014-01-20 00:00:00', '2021-01-16 18:25:21', '0000-00-00 00:00:00');

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
(1, 1, 'coffeeshop', 'bit.ly/porto', 'web', '', '2021-01-16 16:10:16', '0000-00-00 00:00:00');

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
  `user_linkedin` varchar(255) NOT NULL,
  `user_instagram` varchar(255) NOT NULL,
  `user_phone` varchar(255) NOT NULL,
  `user_github` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `user_name`, `user_email`, `user_password`, `user_role`, `user_image`, `user_description`, `user_status`, `user_created_at`, `user_updated_at`, `user_jobdesc`, `user_field`, `user_key`, `user_location`, `user_workplace`, `user_about`, `user_job_type`, `user_linkedin`, `user_instagram`, `user_phone`, `user_github`) VALUES
(1, 'Company.com', 'berhasil@gmail.com', '$2b$10$0McyeuHwLCxeJQdd5s/X5.akhAiSb7E2jEELx5uKylsoObQcXx0d.', 0, '2021-01-15T12-54-10.631Zdownload (1).jpg', 'Company dec', 0, '2021-01-14 19:34:01', '2021-01-18 09:28:11', 'frontend ', 'test', 0, 'Bandung', 'Indonesiaberhasil', '', 'Freelance', 'berhasil', 'berhasil', 'berhasil', ''),
(2, 'Ivan', 'testing@gmail.com', '$2b$10$PqzL6FDkooDzPk4HXN3L4.T5LtJts1vJDWTuf6d3/XzL8Bf8MUaGm', 0, '', 'abcdefgh', 0, '2021-01-14 19:59:03', '2021-01-18 05:00:20', 'frontend Developer', '', 0, 'Indonesia', 'Indonesia', '', '', 'linkedin', '@ivan', '000', ''),
(3, 'testing', 'testing1@gmail.com', '$2b$10$RVAt0lY6NopapQf7Lou6Iebwvu/2/9arhRmnP3iAmoff3zxN1JuiW', 0, '', '', 0, '2021-01-14 20:29:53', NULL, '', '', 0, '', '', '', '', '', '', '', ''),
(4, 'millaaprillya', 'milla@gmail.com', '$2b$10$Yy7xUQ13s8OvAMWmHWVDSeOhawqlbPcC4h9aGnI3Qt/MSLQRmqAUi', 0, '', '', 0, '2021-01-15 00:24:55', NULL, '', '', 0, '', '', '', '', '', '', '', ''),
(5, 'companyid.com', 'company@gmail.com', '$2b$10$PJG5RcI6K8pKbWvMT5B5m.tfLBd.DwNmxftPzhr5UPUV9e5o5gdy6', 1, '', '', 0, '2021-01-15 00:39:54', NULL, '', '', 0, '', '', '', 'web developer', '', '', '', ''),
(6, 'millaaprillya', 'milla1@gmail.com', '$2b$10$JAmseOGgguw9ZJs.7tYD0.YQXjdY7YRtquIbCy0vb2t4UshzkAm7a', 0, '', '', 0, '2021-01-15 21:30:12', NULL, '', '', 0, '', '', '', '', '', '', '', ''),
(7, 'companyid.com', 'company2@gmail.com', '$2b$10$1ebj7mex30MszmnSlkWWuO7xxVfSwWVJphxBFhJMkC.7SMumHKHL6', 1, '', '', 0, '2021-01-15 21:31:12', NULL, '', '', 0, '', '', '', 'web developer', '', '', '', ''),
(8, 'millaaprillya', 'millaaprillya22@gmail.com', '$2b$10$kSZYbmsN86ovBnblOdBu/eUZEjNh49tr5rVH1fWa7iR8/6jnTrzf2', 0, '', '', 0, '2021-01-15 23:02:30', NULL, '', '', 0, '', '', '', '', '', '', '', ''),
(9, 'millaaprillya', 'millaaprillya2@gmail.com', '$2b$10$W.nS9fSA53vg7.pNAsxZC.q5RqSpcgsqpF2ep13kATCtYjAKWqWc6', 0, '', '', 0, '2021-01-15 23:03:03', NULL, '', '', 0, '', '', '', '', '', '', '', ''),
(10, 'millaaprillya', 'miliaaprillya22@gmail.com', '$2b$07$umj6e0wzPSr1HH5PHFz50./DVBo1iTkm57lxnjGjzuev8S6kTFH9m', 0, '', '', 0, '2021-01-15 23:03:57', '2021-01-18 03:53:06', '', '', 0, '', '', '', '', '', '', '', ''),
(11, 'millaaprillya', 'crused06@gmail.com', '$2b$10$ZwTBu2qKGn.sTgCSAPoRN.jsHpaNCWr2ne3D.etOilAjzEv568HdG', 0, '', '', 0, '2021-01-16 00:04:30', '2021-01-15 17:22:12', '', '', 6402, '', '', '', '', '', '', '', ''),
(12, 'risky risky', 'crused066@gmail.com', '$2b$10$nD3cyj/IsLJh67pc2Greb.yXXA7BWMrQW0mPbZgI2DtZRldjyhhcO', 0, '2021-01-17T16-58-36.024Z3.jpg', 'edit berhasil', 0, '2021-01-16 11:25:57', '2021-01-17 16:58:36', 'abcd', '', 0, 'edit berhasil', 'edit berhasil', '', '', '', '', '', ''),
(13, 'millaaprillya', 'b@gmail.com', '$2b$10$2a453RC7fN9z1kj6n9..ZOptCvV3n3/CXhJZ8eFvaOgb8KO8b3Azm', 0, 'blank-profile.jpg', '', 0, '2021-01-17 23:46:09', NULL, '', '', 0, '', '', '', '', '', '', '', ''),
(14, 'companyid.com', 'company23@gmail.com', '$2b$10$eHC9bxutqcc463AGJsNVJ.VPOWYKWsDL7zmF/j6yvzsdhdrYULKqO', 1, 'blank-profile.jpg', '', 0, '2021-01-17 23:50:48', NULL, '', '', 0, '', '', '', 'web developer', '', '', '', ''),
(15, 'companyid.com', 'company234@gmail.com', '$2b$10$ZiQaOxQHKVExeF.2hHNoH.npO0tWuTilSydxGpm/hftvM/vb1YXAS', 1, '', '', 0, '2021-01-18 00:52:11', NULL, '', '', 0, '', '', '', 'web developer', '', '', '', ''),
(16, 'millaaprillya', 'ba@gmail.com', '$2b$10$Bmh.89zTQiYsct4zMh8ac.5nrMuHkJCPWr7TtxXbZMA9YiBwCePGK', 0, '', '', 0, '2021-01-18 00:54:00', NULL, '', '', 0, '', '', '', '', '', '', '', ''),
(17, 'millaaprillya', 'ba3@gmail.com', '$2b$10$lYDA86wl9uCMExH6RCmdiuNkcoO4reA/kx7yBMyy91F5ja507AVju', 0, '', '', 0, '2021-01-18 15:59:21', NULL, '', '', 0, '', '', '', '', '', '', '085720602914', ''),
(18, 'millaaprillya', 'baba@gmail.com', '$2b$10$5M.AFbLT8xeKBmwCPYeMkOT85no5THC10A1sjOMp1jo.q7fv96Kp6', 0, '', '', 0, '2021-01-18 15:59:40', NULL, '', '', 0, '', '', '', '', '', '', '085720602914', ''),
(19, 'companyid.com', 'company2345@gmail.com', '$2b$10$THYe22GyXDftXydzXzcQTuzM0xC7vEC1wDGTtFmuT9b8iULXJy5/e', 1, '', '', 0, '2021-01-18 16:00:13', NULL, '', '', 0, '', '', '', 'web developer', '', '', '', ''),
(20, 'companyid.com', 'company23456@gmail.com', '$2b$10$5XylQo.sdUKdzobWS86DLOamwJrRSf22TxMko4QMTV3c1vZzdMJLC', 1, '', '', 0, '2021-01-18 16:01:43', NULL, '', '', 0, '', '', '', 'web developer', '', '', '', ''),
(21, 'Risky Amalia Haris', 'risky123@gmail.com', '$2b$10$D.dXeS2MJw5GQEbB.vfsF.KU3s9oQ6OOOpU6zE5RqnJskszlfT9tm', 0, '', 'Rsiky ', 0, '2021-01-18 16:29:20', '2021-01-18 10:17:34', 'frontend developer', '', 0, 'indonesia', 'Indonesia', '', 'Freelance ', 'linkedin ', '@risky', '000123456', ''),
(22, 'Company.com', 'berhasilkerjain@gmail.com', '$2b$10$ZTNolkFknefgjkEROjkJZOII1fF9hPbLD5ff2Y2cbx3ZM2W3tr0oK', 1, '', 'Company dec', 0, '2021-01-18 16:32:54', '2021-01-18 10:17:57', '', 'berhasil', 0, 'Bandung', '', '', '', 'berhasil', 'berhasil', 'berhasil', '');

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
  MODIFY `contact_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `exp`
--
ALTER TABLE `exp`
  MODIFY `exp_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `portofolio`
--
ALTER TABLE `portofolio`
  MODIFY `porto_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `skill`
--
ALTER TABLE `skill`
  MODIFY `skill_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
