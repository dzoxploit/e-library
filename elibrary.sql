-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 10, 2022 at 08:51 AM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 8.0.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `elibrary`
--

-- --------------------------------------------------------

--
-- Table structure for table `bookcatalogs`
--

CREATE TABLE `bookcatalogs` (
  `userId` char(36) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `bookCode` varchar(255) NOT NULL,
  `title` text NOT NULL,
  `author` varchar(255) NOT NULL,
  `publisher` varchar(255) NOT NULL,
  `stock` int(11) NOT NULL DEFAULT 0,
  `publicationDate` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `bookCatalogBookCode` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `bookcatalogs`
--

INSERT INTO `bookcatalogs` (`userId`, `bookCode`, `title`, `author`, `publisher`, `stock`, `publicationDate`, `createdAt`, `updatedAt`, `bookCatalogBookCode`) VALUES
('0', '1596352168', 'Buku Pemrograman', 'Udin ', 'Gramedia', 20, '2021-03-11 00:00:00', '2022-01-10 07:09:36', '2022-01-10 07:09:36', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `detailloanbooks`
--

CREATE TABLE `detailloanbooks` (
  `id` int(11) NOT NULL,
  `loanCode` varchar(50) NOT NULL,
  `bookCode` varchar(50) NOT NULL,
  `quantity` int(10) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `createdAt` timestamp NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `loanbooks`
--

CREATE TABLE `loanbooks` (
  `loanCode` varchar(100) NOT NULL,
  `penggunaId` int(11) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `createdAt` timestamp NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstname` varchar(50) NOT NULL,
  `lastname` int(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` timestamp NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstname`, `lastname`, `email`, `password`, `createdAt`, `updatedAt`) VALUES
(0, 'jquera', 0, 'jquerasantos@gmail.com', '$2b$10$MXlEFjd4fLlQj8qkkmFRHunP0C4KJzZgSs2Gxan8dzhQfRez9oSgu', '2022-01-10 06:50:02', '2022-01-10 06:50:02');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bookcatalogs`
--
ALTER TABLE `bookcatalogs`
  ADD PRIMARY KEY (`bookCode`),
  ADD UNIQUE KEY `title` (`title`) USING HASH,
  ADD KEY `bookCatalogBookCode` (`bookCatalogBookCode`);

--
-- Indexes for table `detailloanbooks`
--
ALTER TABLE `detailloanbooks`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `detailloanbooks`
--
ALTER TABLE `detailloanbooks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bookcatalogs`
--
ALTER TABLE `bookcatalogs`
  ADD CONSTRAINT `bookcatalogs_ibfk_1` FOREIGN KEY (`bookCatalogBookCode`) REFERENCES `bookcatalogs` (`bookCode`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
