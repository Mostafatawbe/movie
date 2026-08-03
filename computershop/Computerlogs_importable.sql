-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 15, 2023 at 08:02 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";



/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: computerlogs
--

-- Create and select the database so this file can be imported standalone
CREATE DATABASE IF NOT EXISTS `computerlogs` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `computerlogs`;

-- --------------------------------------------------------

--
-- Table structure for table accounts
--

DROP TABLE IF EXISTS `accounts`;

CREATE TABLE accounts (
  aid int(11) NOT NULL,
  afname varchar(100) NOT NULL,
  alname varchar(100) NOT NULL,
  phone char(11) NOT NULL,
  email varchar(100) NOT NULL,
  cnic char(13) NOT NULL,
  dob date NOT NULL,
  username varchar(100) NOT NULL,
  gender varchar(10) NOT NULL,
  password varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table accounts
--

INSERT INTO accounts (aid, afname, alname, phone, email, cnic, dob, username, gender, password) VALUES
(5, 'Ali', 'Nasser', '76123456', 'ali.nasser@example.com', '123456789012', '2023-05-03', 'admin_leb', 'M', 'admin123'),
(14, 'Fatima', 'Khoury', '71234567', 'fatima.khoury@example.com', '234567890123', '2023-05-02', 'fatima', 'F', '12345678'),
(18, 'Ibrahim', 'Haddad', '70123456', 'ibrahim.haddad@example.com', '345678901234', '2023-05-10', 'ibrahim', 'M', '12345678'),
(20, 'Layla', 'Abi-Aad', '78123456', 'layla.abi-aad@example.com', '456789012345', '2000-02-16', 'layla_a', 'F', '987654321');

-- --------------------------------------------------------

--
-- Table structure for table cart
--

DROP TABLE IF EXISTS `cart`;

CREATE TABLE cart (
  aid int(11) NOT NULL,
  pid int(11) NOT NULL,
  cqty int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table order-details
--

DROP TABLE IF EXISTS `order-details`;

CREATE TABLE `order-details` (
  oid int(11) NOT NULL,
  pid int(11) NOT NULL,
  qty int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table order-details
--

INSERT INTO `order-details` (oid, pid, qty) VALUES
(17, 35, 5),
(18, 31, 1),
(19, 37, 1);

-- --------------------------------------------------------

--
-- Table structure for table orders
--

DROP TABLE IF EXISTS `orders`;

CREATE TABLE orders (
  oid int(11) NOT NULL,
  dateod date NOT NULL,
  datedel date DEFAULT NULL,
  aid int(11) NOT NULL,
  address varchar(255) NOT NULL,
  city varchar(50) NOT NULL,
  country varchar(100) NOT NULL,
  account char(16) DEFAULT NULL,
  total int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table orders
--

INSERT INTO orders (oid, dateod, datedel, aid, address, city, country, account, total) VALUES
(17, '2023-05-15', '2023-05-15', 14, 'Mar Mikhael, Main Street', 'Beirut', 'Lebanon', NULL, 375),
(18, '2023-05-15', '2023-05-15', 20, 'Mina Street, El-Mina', 'Tripoli', 'Lebanon', NULL, 130),
(19, '2023-05-15', '2023-05-15', 18, 'Old Souk, Sea Side', 'Jounieh', 'Lebanon', '1234567890123456', 380);

-- --------------------------------------------------------

--
-- Table structure for table products
--

DROP TABLE IF EXISTS `products`;

CREATE TABLE products (
  pid int(11) NOT NULL,
  pname varchar(100) NOT NULL,
  category varchar(50) NOT NULL,
  description varchar(200) NOT NULL,
  price int(11) NOT NULL,
  qtyavail int(11) NOT NULL,
  img varchar(255) NOT NULL,
  brand varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table products
--

INSERT INTO products (pid, pname, category, description, price, qtyavail, img, brand) VALUES
(31, 'Sample Keyboard 1', 'keyboard', 'A basic keyboard product', 50, 10, 'kb_sample1.jpg', 'Generic'),
(35, 'Sample RAM 1', 'ram', 'Sample RAM module', 80, 5, 'ram_sample1.jpg', 'Generic'),
(36, 'Sample GPU 1', 'gpu', 'Sample graphics card', 300, 3, 'gpu_sample1.jpg', 'Generic'),
(37, 'Sample Mouse 1', 'mouse', 'Sample mouse product', 30, 20, 'mouse_sample1.jpg', 'Generic'),
(44, 'Intel Core i5-12400F', 'cpu', '6-core Alder Lake processor.', 240, 12, 'cpu1.jpg', 'Intel'),
(45, 'Intel Core i7-12700K', 'cpu', '12-core high-performance CPU.', 410, 8, 'cpu2.jpg', 'Intel'),
(46, 'AMD Ryzen 5 5600', 'cpu', 'Strong gaming CPU with 6 cores.', 180, 15, 'cpu3.jpg', 'AMD'),
(47, 'AMD Ryzen 9 5900X', 'cpu', '12-core monster performance.', 520, 5, 'cpu4.jpg', 'AMD'),
(48, 'Intel Core i3-12100F', 'cpu', 'Great budget CPU.', 120, 20, 'cpu5.jpg', 'Intel'),
(49, 'AMD Ryzen 7 5800X', 'cpu', 'Top performance for gaming.', 330, 9, 'cpu6.jpg', 'AMD'),
(50, 'Intel Core i9-11900K', 'cpu', 'High-end Intel 8-core CPU.', 480, 6, 'cpu7.jpg', 'Intel');

INSERT INTO products (pid, pname, category, description, price, qtyavail, img, brand) VALUES
(51, 'RTX 3060 12GB', 'gpu', 'Great 1080p & 1440p GPU.', 290, 10, 'gpu1.jpg', 'Nvidia'),
(52, 'RTX 4070 12GB', 'gpu', 'Latest gen mid-high GPU.', 530, 7, 'gpu2.jpg', 'Nvidia'),
(53, 'GTX 1650 Super', 'gpu', 'Excellent budget GPU.', 180, 12, 'gpu3.jpg', 'Nvidia'),
(54, 'RX 6600 8GB', 'gpu', 'Great value AMD GPU.', 240, 14, 'gpu4.jpg', 'AMD'),
(55, 'RX 6700 XT 12GB', 'gpu', '1440p beast.', 390, 5, 'gpu5.jpg', 'AMD'),
(56, 'RTX 4090 24GB', 'gpu', 'Best GPU in the world.', 1600, 2, 'gpu6.jpg', 'Nvidia'),
(57, 'RTX 3050 8GB', 'gpu', 'Entry-level RTX GPU.', 230, 16, 'gpu7.jpg', 'Nvidia');

INSERT INTO products (pid, pname, category, description, price, qtyavail, img, brand) VALUES
(58, 'Corsair Vengeance 16GB DDR4', 'ram', 'High-speed gaming RAM.', 75, 20, 'ram1.jpg', 'Corsair'),
(59, 'Kingston Fury 16GB DDR5', 'ram', 'Next-gen DDR5 memory.', 110, 10, 'ram2.jpg', 'Kingston'),
(60, 'G.Skill Trident Z 32GB', 'ram', 'Premium RGB RAM.', 150, 12, 'ram3.jpg', 'G.Skill'),
(61, 'Patriot Viper 8GB', 'ram', 'Reliable budget RAM.', 35, 30, 'ram4.jpg', 'Patriot'),
(62, 'TeamGroup T-Force 16GB', 'ram', 'High-performance RAM.', 70, 15, 'ram5.jpg', 'T-Force'),
(63, 'ADATA XPG Spectrix 16GB', 'ram', 'RGB gaming RAM.', 80, 18, 'ram7.jpg', 'ADATA'),
(64, 'Crucial 32GB DDR4', 'ram', 'Great for productivity.', 140, 7, 'ram6.jpg', 'Crucial');

INSERT INTO products (pid, pname, category, description, price, qtyavail, img, brand) VALUES
(65, 'Logitech G502 Hero', 'mouse', 'Top gaming sensor.', 70, 20, 'mouse1.jpg', 'Logitech'),
(66, 'Razer Viper Mini', 'mouse', 'Ultralight gaming mouse.', 50, 15, 'mouse2.jpg', 'Razer'),
(67, 'SteelSeries Rival 3', 'mouse', 'High-accuracy mouse.', 45, 25, 'mouse3.jpg', 'SteelSeries'),
(68, 'Logitech G304 Wireless', 'mouse', 'Lightweight wireless.', 55, 18, 'mouse4.jpg', 'Logitech'),
(69, 'Redragon M711 Cobra', 'mouse', 'RGB gaming mouse.', 35, 30, 'mouse5.jpg', 'Redragon'),
(70, 'HyperX Pulsefire', 'mouse', 'Precise and durable.', 60, 14, 'mouse6.jpg', 'HyperX'),
(71, 'Alienware AW610M', 'mouse', 'Premium gaming mouse.', 85, 9, 'mouse7.jpg', 'Alienware');

INSERT INTO products (pid, pname, category, description, price, qtyavail, img, brand) VALUES
(72, 'Logitech G Pro Keyboard', 'keyboard', 'Esports mechanical keyboard.', 110, 10, 'kb1.jpg', 'Logitech'),
(73, 'Razer Huntsman Mini', 'keyboard', 'Optical gaming keyboard.', 130, 8, 'kb2.jpg', 'Razer'),
(74, 'Redragon K552 Kumara', 'keyboard', 'Budget mechanical keyboard.', 45, 20, 'kb3.jpg', 'Redragon'),
(75, 'Corsair K70 RGB', 'keyboard', 'Premium RGB keyboard.', 160, 6, 'kb4.jpg', 'Corsair'),
(76, 'HyperX Alloy FPS', 'keyboard', 'Durable gaming keyboard.', 90, 12, 'kb5.jpg', 'HyperX'),
(77, 'SteelSeries Apex 3', 'keyboard', 'Water-resistant keyboard.', 60, 15, 'kb6.jpg', 'SteelSeries'),
(78, 'Asus ROG Strix Scope', 'keyboard', 'High-end gaming keyboard.', 150, 5, 'kb7.jpg', 'Asus');

INSERT INTO products (pid, pname, category, description, price, qtyavail, img, brand) VALUES
(79, 'Gigabyte B550 Aorus Elite', 'motherboard', 'Great AM4 motherboard.', 160, 9, 'mb1.jpg', 'Gigabyte'),
(80, 'MSI B450 Tomahawk', 'motherboard', 'Best budget AM4 board.', 120, 14, 'mb2.jpg', 'MSI'),
(81, 'Asus Prime Z590-P', 'motherboard', 'Intel 11th-gen board.', 180, 8, 'mb3.jpg', 'Asus'),
(82, 'ASRock B660M Pro RS', 'motherboard', 'Great mid-range LGA1700.', 140, 12, 'mb4.jpg', 'ASRock'),
(83, 'Asus TUF X570-Plus', 'motherboard', 'High-end AM4 board.', 200, 6, 'mb5.jpg', 'Asus'),
(84, 'Gigabyte Z690 UD', 'motherboard', 'Intel DDR5 motherboard.', 220, 7, 'mb6.jpg', 'Gigabyte'),
(85, 'MSI MAG B760 Tomahawk', 'motherboard', 'Great LGA1700 board.', 250, 5, 'mb7.jpg', 'MSI');

INSERT INTO products (pid, pname, category, description, price, qtyavail, img, brand) VALUES
(86, 'Acer Nitro VG240Y 24" 144Hz', 'Monitor', '24-inch IPS gaming monitor with 144Hz refresh rate.', 180, 10, 'monitor1.jpg', 'Acer'),
(87, 'Samsung Odyssey G3 27" 165Hz', 'Monitor', '27-inch gaming monitor with ultra-fast 165Hz refresh rate.', 230, 8, 'monitor2.jpg', 'Samsung'),
(88, 'LG Ultragear 24GN600 144Hz', 'Monitor', '144Hz 1ms response time IPS gaming monitor.', 200, 12, 'monitor3.jpg', 'LG'),
(89, 'ASUS TUF Gaming VG249Q 165Hz', 'Monitor', 'Ultra-smooth 165Hz IPS panel designed for gamers.', 220, 7, 'monitor4.jpg', 'Asus'),
(90, 'Dell S2421HGF 24" 144Hz', 'Monitor', 'Fast curved gaming monitor with 144Hz refresh rate.', 190, 15, 'monitor5.jpg', 'Dell'),
(91, 'MSI Optix G241 144Hz', 'Monitor', 'Wide color gamut IPS 144Hz gaming monitor.', 210, 9, 'monitor6.jpg', 'MSI'),
(92, 'AOC C24G1A 24" 165Hz Curved', 'Monitor', '165Hz curved gaming monitor with immersive design.', 220, 6, 'monitor7.jpg', 'AOC');

INSERT INTO products (pid, pname, category, description, price, qtyavail, img, brand) VALUES
(93, 'HyperX Cloud II', 'headset', 'Comfortable gaming headset with 7.1 surround sound.', 99, 15, 'headset1.jpeg', 'HyperX'),
(94, 'SteelSeries Arctis 7', 'headset', 'Wireless lossless audio and 24-hour battery life.', 149, 10, 'headset2.jpeg', 'SteelSeries'),
(95, 'Razer BlackShark V2', 'headset', 'Lightweight esports headset with Triforce Titanium drivers.', 99, 12, 'headset3.jpeg', 'Razer'),
(96, 'Corsair HS60 Pro', 'headset', 'High-quality stereo sound and a detachable microphone.', 69, 20, 'headset4.jpeg', 'Corsair'),
(97, 'Logitech G Pro X', 'headset', 'Pro-grade headset with Blue VO!CE microphone technology.', 129, 8, 'headset5.jpeg', 'Logitech'),
(98, 'Sennheiser GSP 600', 'headset', 'Exceptional audio clarity and ergonomic design.', 199, 5, 'headset6.jpeg', 'Sennheiser');

INSERT INTO products (pid, pname, category, description, price, qtyavail, img, brand) VALUES
(99, 'Secretlab Titan Evo 2022', 'gaming chair', 'The ultimate gaming chair with premium materials.', 499, 10, 'chair1.jpeg', 'Secretlab'),
(100, 'Herman Miller X Logitech G Embody', 'gaming chair', 'The perfect blend of ergonomics and gaming performance.', 1495, 3, 'chair2.jpeg', 'Herman Miller'),
(101, 'Razer Iskur', 'gaming chair', 'Ergonomic gaming chair with a built-in lumbar support system.', 499, 8, 'chair3.jpeg', 'Razer'),
(102, 'DXRacer Formula Series', 'gaming chair', 'The original high-quality gaming chair.', 329, 15, 'chair4.jpeg', 'DXRacer'),
(103, 'AKRacing Core Series EX', 'gaming chair', 'Breathable fabric and a wide frame for comfort.', 349, 12, 'chair5.jpeg', 'AKRacing'),
(104, 'Noblechairs Hero', 'gaming chair', 'Premium materials and a sophisticated design.', 439, 7, 'chair6.jpeg', 'Noblechairs');

INSERT INTO products (pid, pname, category, description, price, qtyavail, img, brand) VALUES
(105, 'SteelSeries QcK+', 'mouse pad', 'Large cloth mouse pad for maximum control.', 15, 30, 'mousepad1.jpeg', 'SteelSeries'),
(106, 'Logitech G440', 'mouse pad', 'Hard polymer surface for high-DPI gaming.', 25, 20, 'mousepad2.jpeg', 'Logitech'),
(107, 'Razer Goliathus Chroma', 'mouse pad', 'Soft gaming mouse mat with Razer Chroma RGB.', 40, 15, 'mousepad3.jpeg', 'Razer'),
(108, 'Corsair MM300', 'mouse pad', 'Anti-fray cloth mouse pad with a high-performance weave.', 20, 25, 'mousepad4.jpeg', 'Corsair'),
(109, 'HyperX Fury S Pro', 'mouse pad', 'Densely woven surface for accurate optical tracking.', 20, 28, 'mousepad5.jpeg', 'HyperX'),
(110, 'Zowie G-SR', 'mouse pad', 'The perfect mouse pad for control and stability.', 30, 18, 'mousepad6.jpeg', 'Zowie');

INSERT INTO products (pid, pname, category, description, price, qtyavail, img, brand) VALUES
(111, 'Secretlab Magnus', 'table', 'A metal desk with a magnetic ecosystem of accessories.', 449, 10, 'table1.jpeg', 'Secretlab'),
(112, 'Arozzi Arena', 'table', 'The ultimate gaming desk with a full-surface mouse pad.', 399, 8, 'table2.jpeg', 'Arozzi'),
(113, 'FlexiSpot Height Adjustable Gaming Desk', 'table', 'An electric height-adjustable desk for gaming.', 499, 5, 'table3.jpeg', 'FlexiSpot'),
(114, 'Thermaltake Level 20 Battlestation', 'table', 'An RGB gaming desk with a durable construction.', 1199, 3, 'table4.jpeg', 'Thermaltake'),
(115, 'Cougar Mars', 'table', 'A spacious gaming desk with RGB lighting.', 379, 7, 'table5.jpeg', 'Cougar'),
(116, 'Eureka Ergonomic Z1-S', 'table', 'A Z-shaped gaming desk with a sleek design.', 219, 12, 'table6.jpeg', 'Eureka Ergonomic');



-- --------------------------------------------------------

--
-- Table structure for table reviews
--

DROP TABLE IF EXISTS `reviews`;

CREATE TABLE reviews (
  oid int(11) NOT NULL,
  pid int(11) NOT NULL,
  rtext varchar(1000) DEFAULT NULL,
  rating int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table reviews
--

INSERT INTO reviews (oid, pid, rtext, rating) VALUES
(17, 35, ' a very good product nice and fast...', 4),
(18, 31, ' Very impressive. easy to use and properly weigh balanced!', 3),
(19, 37, ' Very easy to insert and use into PC. All the slots working correctly. Would recommend.', 4);

-- --------------------------------------------------------

--
-- Table structure for table wishlist
--

DROP TABLE IF EXISTS `wishlist`;

CREATE TABLE wishlist (
  aid int(11) NOT NULL,
  pid int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table wishlist
--

INSERT INTO wishlist (aid, pid) VALUES
(18, 35),
(18, 36);

--
-- Indexes for dumped tables
--

--
-- Indexes for table accounts
--
ALTER TABLE accounts
  ADD PRIMARY KEY (aid),
  ADD UNIQUE KEY cnic (cnic),
  ADD UNIQUE KEY email (email),
  ADD UNIQUE KEY phone (phone),
  ADD UNIQUE KEY username (username);

--
-- Indexes for table cart
--
ALTER TABLE cart
  ADD PRIMARY KEY (aid,pid),
  ADD KEY cartfk2 (pid);

--
-- Indexes for table order-details
--
ALTER TABLE `order-details`
  ADD PRIMARY KEY (oid,pid),
  ADD KEY orderdtfk2 (pid);

--
-- Indexes for table orders
--
ALTER TABLE orders
  ADD PRIMARY KEY (oid),
  ADD KEY ordersfk (aid);

--
-- Indexes for table products
--
ALTER TABLE products
  ADD PRIMARY KEY (pid);

--
-- Indexes for table reviews
--
ALTER TABLE reviews
  ADD PRIMARY KEY (oid,pid),
  ADD KEY reviewsfk2 (pid);

--
-- Indexes for table wishlist
--
ALTER TABLE wishlist
  ADD PRIMARY KEY (aid,pid),
  ADD KEY wishlistfk2 (pid);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table accounts
--
ALTER TABLE accounts
  MODIFY aid int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table orders
--
ALTER TABLE orders
  MODIFY oid int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table products
--
ALTER TABLE products
  MODIFY pid int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=117;

--
-- Constraints for dumped tables
--

--
-- Constraints for table cart
--
ALTER TABLE cart
  ADD CONSTRAINT cartfk1 FOREIGN KEY (aid) REFERENCES accounts (aid) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT cartfk2 FOREIGN KEY (pid) REFERENCES products (pid) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table order-details
--
ALTER TABLE `order-details`
  ADD CONSTRAINT orderdtfk1 FOREIGN KEY (oid) REFERENCES orders (oid) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT orderdtfk2 FOREIGN KEY (pid) REFERENCES products (pid) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table orders
--
ALTER TABLE orders
  ADD CONSTRAINT ordersfk FOREIGN KEY (aid) REFERENCES accounts (aid) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table reviews
--
ALTER TABLE reviews
  ADD CONSTRAINT reviewsfk1 FOREIGN KEY (oid) REFERENCES orders (oid) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT reviewsfk2 FOREIGN KEY (pid) REFERENCES products (pid) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table wishlist
--
ALTER TABLE wishlist
  ADD CONSTRAINT wishlistfk1 FOREIGN KEY (aid) REFERENCES accounts (aid) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT wishlistfk2 FOREIGN KEY (pid) REFERENCES products (pid) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;
/* ========================================================= 
  TRIGGERS (MariaDB Compatible)
  ========================================================= */ 



  -- DECLARE v_qtyavail INT;
  -- DECLARE v_qty_diff INT;
    
  -- Check if product exists and get available quantity
   -- SELECT qtyavail INTO v_qtyavail 
   -- FROM products 
   -- WHERE pid = NEW.pid;
    
  -- Throw error if product not found
   -- IF v_qtyavail IS NULL THEN
   --     SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Product not found.';
   -- END IF;
    
  -- Throw error if not enough stock
   -- IF NEW.qty > v_qtyavail THEN
   --     SIGNAL SQLSTATE '45001' SET MESSAGE_TEXT = 'Not enough stock available.';
   -- END IF;
    
  -- Reduce stock when inserting order detail
   -- UPDATE products 
   -- SET qtyavail = qtyavail - NEW.qty 
   -- WHERE pid = NEW.pid;


-- DELIMITER ; 


-- ============================================================
-- TRIGGER 2: trg_orderdetails_before_update
-- PURPOSE: Adjust stock before updating order details
-- USAGE: Automatically triggered BEFORE UPDATE on order-details
-- NOTE: Converted from SQL Server INSTEAD OF to MariaDB BEFORE trigger
-- ============================================================

-- DELIMITER $$

-- CREATE TRIGGER trg_orderdetails_before_update
-- BEFORE UPDATE ON `order-details`
-- FOR EACH ROW
-- BEGIN
--     DECLARE v_qtyavail INT;
--     DECLARE v_qty_diff INT;
    
--     -- Check if product exists and get available quantity
--     SELECT qtyavail INTO v_qtyavail 
--     FROM products 
--     WHERE pid = NEW.pid;
    
--     -- If product ID is being changed
--     IF NEW.pid <> OLD.pid THEN
--         -- Return old product's stock
--         UPDATE products 
--         SET qtyavail = qtyavail + OLD.qty 
--         WHERE pid = OLD.pid;
        
--         -- Check if new product has enough stock
--         IF NEW.qty > v_qtyavail THEN
--             SIGNAL SQLSTATE '45002' SET MESSAGE_TEXT = 'Not enough stock available for the new product.';
--         END IF;
        
--         -- Reduce stock for new product
--         UPDATE products 
--         SET qtyavail = qtyavail - NEW.qty 
--         WHERE pid = NEW.pid;
--     ELSE
--         -- Same product, just quantity changed
--         SET v_qty_diff = NEW.qty - OLD.qty;
        
--         IF v_qty_diff > 0 AND v_qtyavail < v_qty_diff THEN
--             SIGNAL SQLSTATE '45003' SET MESSAGE_TEXT = 'Not enough stock available for update.';
--         END IF;
        
--         -- Adjust stock based on quantity difference
--         UPDATE products 
--         SET qtyavail = qtyavail - (NEW.qty - OLD.qty)
--         WHERE pid = NEW.pid;
--     END IF;
-- END$$

-- DELIMITER ;

 

-- ============================================================
-- TRIGGER 3: trg_update_order_total_after_insert
-- PURPOSE: Update order total after insert into order-details
-- USAGE: Automatically triggered AFTER INSERT on order-details
-- NOTE: MariaDB version - trigger fires after data is inserted
-- ============================================================

-- DELIMITER $$

-- CREATE TRIGGER trg_update_order_total_after_insert
-- AFTER INSERT ON `order-details`
-- FOR EACH ROW
-- BEGIN
--     UPDATE orders
--     SET total = COALESCE(
--         (SELECT SUM(od.qty * (SELECT price FROM products WHERE pid = od.pid))
--          FROM `order-details` od
--          WHERE od.oid = NEW.oid), 0)
--     WHERE oid = NEW.oid;
-- END$$

-- DELIMITER ;

 

-- ============================================================
-- TRIGGER 4: trg_update_order_total_after_update
-- PURPOSE: Update order total after update to order-details
-- USAGE: Automatically triggered AFTER UPDATE on order-details
-- NOTE: MariaDB version - triggers on both old and new order IDs
-- ============================================================

-- DELIMITER $$

-- CREATE TRIGGER trg_update_order_total_after_update
-- AFTER UPDATE ON `order-details`
-- FOR EACH ROW
-- BEGIN
--     -- Update for the new order (in case oid was changed)
--     UPDATE orders
--     SET total = COALESCE(
--         (SELECT SUM(od.qty * (SELECT price FROM products WHERE pid = od.pid))
--          FROM `order-details` od
--          WHERE od.oid = NEW.oid), 0)
--     WHERE oid = NEW.oid;
    
--     -- If order ID changed, also update the old order
--     IF NEW.oid <> OLD.oid THEN
--         UPDATE orders
--         SET total = COALESCE(
--             (SELECT SUM(od.qty * (SELECT price FROM products WHERE pid = od.pid))
--              FROM `order-details` od
--              WHERE od.oid = OLD.oid), 0)
--         WHERE oid = OLD.oid;
--     END IF;
-- END$$

-- DELIMITER ;

 

-- ============================================================
-- TRIGGER 5: trg_clear_cart_after_order
-- PURPOSE: Clear cart items after order is placed
-- USAGE: Automatically triggered AFTER INSERT on orders
-- NOTE: MariaDB version - deletes all cart items for the customer
-- ============================================================

-- DELIMITER $$
--
-- CREATE TRIGGER trg_clear_cart_after_order
-- AFTER INSERT ON orders
-- FOR EACH ROW
-- BEGIN
--     DELETE FROM cart
--     WHERE aid = NEW.aid;
-- END$$
--
-- DELIMITER ;

 

-- ============================================================
-- TRIGGER 6: trg_hash_password_before_insert
-- PURPOSE: Hash password before insert into accounts
-- USAGE: Automatically triggered BEFORE INSERT on accounts
-- NOTE: MariaDB version - hashes passwords using SHA2_256
-- NOTE: Passwords < 60 chars are hashed, longer ones assumed pre-hashed
-- ============================================================

-- DELIMITER $$
--
-- CREATE TRIGGER trg_hash_password_before_insert
-- BEFORE INSERT ON accounts
-- FOR EACH ROW
-- BEGIN
--     -- Only hash if password is less than 60 chars (not already hashed)
--     IF CHAR_LENGTH(NEW.password) < 60 THEN
--         SET NEW.password = SHA2(NEW.password, 256);
--     END IF;
-- END$$
--
-- DELIMITER ;

-- ============================================================
-- TRIGGER 7: trg_hash_password_before_update
-- PURPOSE: Hash password before update in accounts
-- USAGE: Automatically triggered BEFORE UPDATE on accounts
-- NOTE: MariaDB version - only hashes if password actually changed
-- ============================================================

-- DELIMITER $$

-- CREATE TRIGGER trg_hash_password_before_update
-- BEFORE UPDATE ON accounts
-- FOR EACH ROW
-- BEGIN
--     -- Only hash if password changed and it's not already hashed
--     IF NEW.password <> OLD.password AND CHAR_LENGTH(NEW.password) < 60 THEN
--         SET NEW.password = SHA2(NEW.password, 256);
--     END IF;
-- END$$

-- DELIMITER ;

/* ========================================================= 
   CURSOR-BASED STORED PROCEDURES (MariaDB Compatible)
   ========================================================= */ 

-- ============================================================
-- PROCEDURE 1: recalc_all_order_totals
-- PURPOSE: Recalculate all order totals using a cursor loop
-- USAGE: CALL recalc_all_order_totals();
-- NOTE: Uses cursor to iterate through all orders
-- ============================================================
--
-- DELIMITER $$
--
-- CREATE PROCEDURE recalc_all_order_totals()
-- BEGIN
--     DECLARE done INT DEFAULT FALSE;
--     DECLARE v_oid INT;
--     
--     -- Declare cursor for all order IDs
--     DECLARE cur CURSOR FOR SELECT oid FROM orders;
--     DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
--     
--     OPEN cur;
--     
--     read_loop: LOOP
--         FETCH cur INTO v_oid;
--         IF done THEN
--             LEAVE read_loop;
--         END IF;
--         
--         -- Update total for this order
--         UPDATE orders
--         SET total = COALESCE(
--             (SELECT SUM(od.qty * (SELECT price FROM products WHERE pid = od.pid))
--              FROM `order-details` od
--              WHERE od.oid = v_oid), 0)
--         WHERE oid = v_oid;
--     END LOOP;
--     
--     CLOSE cur;
-- END$$
--
-- DELIMITER ; 

-- ============================================================
-- PROCEDURE 2: rebuild_stock_from_orderdetails
-- PURPOSE: Rebuild/validate stock quantities from order-details
-- USAGE: CALL rebuild_stock_from_orderdetails();
-- NOTE: Uses cursor to iterate through all products
-- ============================================================
--
-- DELIMITER $$
--
-- CREATE PROCEDURE rebuild_stock_from_orderdetails()
-- BEGIN
--     DECLARE done INT DEFAULT FALSE;
--     DECLARE v_pid INT;
--     
--     -- Declare cursor for all product IDs
--     DECLARE cur2 CURSOR FOR SELECT pid FROM products;
--     DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
--     
--     OPEN cur2;
--     
--     read_loop: LOOP
--         FETCH cur2 INTO v_pid;
--         IF done THEN
--             LEAVE read_loop;
--         END IF;
--         
--         -- Ensure quantity is not negative
--         UPDATE products
--         SET qtyavail = CASE WHEN qtyavail < 0 THEN 0 ELSE qtyavail END
--         WHERE pid = v_pid;
--     END LOOP;
--     
--     CLOSE cur2;
-- END$$
--
-- DELIMITER ; 

-- ============================================================
-- PROCEDURE 3: place_order
-- PURPOSE: Place a complete order with transactional integrity
-- USAGE: CALL place_order(aid, address, city, country);
--        CALL place_order(14, 'Main Street', 'Beirut', 'Lebanon');
-- PARAMETERS:
--   - in_p_aid: Account ID of customer placing order
--   - in_p_address: Delivery address
--   - in_p_city: Delivery city
--   - in_p_country: Delivery country
-- NOTE: Uses cursor to iterate through cart items
-- NOTE: Transactional - rolls back on error
-- ============================================================
--
-- DELIMITER $$
--
-- CREATE PROCEDURE place_order(
--     IN in_p_aid INT,
--     IN in_p_address VARCHAR(255),
--     IN in_p_city VARCHAR(50),
--     IN in_p_country VARCHAR(100)
-- )
-- BEGIN
--     DECLARE v_new_oid INT;
--     DECLARE v_pid INT;
--     DECLARE v_cqty INT;
--     DECLARE done INT DEFAULT FALSE;
--     
--     DECLARE cur_cart CURSOR FOR 
--         SELECT pid, cqty FROM cart WHERE aid = in_p_aid;
--     DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
--     
--     DECLARE EXIT HANDLER FOR SQLEXCEPTION
--     BEGIN
--         -- Rollback on any exception
--         ROLLBACK;
--         RESIGNAL;
--     END;
--     
--     START TRANSACTION;
--     
--     -- Create new order
--     INSERT INTO orders 
--         (dateod, datedel, aid, address, city, country, account, total)
--     VALUES 
--         (CURDATE(), NULL, in_p_aid, in_p_address, in_p_city, in_p_country, NULL, 0);
--     
--     SET v_new_oid = LAST_INSERT_ID();
--     
--     -- Process each item in cart
--     OPEN cur_cart;
--     
--     read_loop: LOOP
--         FETCH cur_cart INTO v_pid, v_cqty;
--         IF done THEN
--             LEAVE read_loop;
--         END IF;
--         
--         -- Check if enough stock available
--         IF (SELECT qtyavail FROM products WHERE pid = v_pid) < v_cqty THEN
--             SIGNAL SQLSTATE '45010' SET MESSAGE_TEXT = 'Not enough stock to place order (during place_order).';
--         END IF;
--         
--         -- Insert order detail
--         INSERT INTO `order-details` (oid, pid, qty)
--         VALUES (v_new_oid, v_pid, v_cqty);
--     END LOOP;
--     
--     CLOSE cur_cart;
--     
--     -- Recalculate order total
--     CALL recalc_all_order_totals();
--     
--     COMMIT;
-- END$$
--
-- DELIMITER ; 

/* ========================================================= 
   PROCEDURE CALLS (MariaDB Execution)
   ========================================================= */

-- ============================================================
-- EXAMPLE: Call recalc_all_order_totals procedure
-- PURPOSE: Recalculate all order totals
-- ============================================================
-- CALL recalc_all_order_totals();

-- ============================================================
-- EXAMPLE: Call rebuild_stock_from_orderdetails procedure
-- PURPOSE: Rebuild and validate stock quantities
-- ============================================================
-- CALL rebuild_stock_from_orderdetails();

-- ============================================================
-- EXAMPLE: Call place_order procedure
-- PURPOSE: Place an order for a customer
-- Parameters: (aid, address, city, country)
-- ============================================================
-- CALL place_order(14, 'Mar Mikhael, Main Street', 'Beirut', 'Lebanon');

/* ========================================================= 
   USERS AND ROLES (SQL Server Syntax - COMMENTED OUT for MariaDB)
   NOTE: MariaDB uses different syntax for user/role management
   These SQL Server commands are left for reference only
   ========================================================= */

-- SQL Server User/Role Creation (NOT compatible with MariaDB):
-- sp_addlogin 'admin_login', 'securepass123', 'project', 'us_english' 
-- sp_addlogin 'manager_login', 'inventorypass', 'project', 'us_english' 
-- sp_addlogin 'customer_login', 'customerpass', 'project', 'us_english'  

-- For MariaDB, use instead:
-- CREATE USER 'admin_login'@'localhost' IDENTIFIED BY 'securepass123';
-- CREATE USER 'manager_login'@'localhost' IDENTIFIED BY 'inventorypass';
-- CREATE USER 'customer_login'@'localhost' IDENTIFIED BY 'customerpass';

-- ============================================================
-- SQL Server Role and User Creation (COMMENTED - Reference Only)
-- For MariaDB equivalent, see comments above
-- ============================================================

-- Role for system administrators 
-- CREATE ROLE Admin;
-- Role for standard, logged-in users (shoppers) 
-- CREATE ROLE Customer;
-- Role for staff managing product stock 
-- CREATE ROLE Inventory_Manager;

-- User Creation (SQL Server syntax - commented)
-- CREATE USER admin_user FOR LOGIN admin_login;
-- EXEC sp_addrolemember 'Admin', 'admin_user';  
-- CREATE USER manager_user FOR LOGIN manager_login;
-- EXEC sp_addrolemember 'Inventory_Manager', 'manager_user'; 
-- CREATE USER generic_customer FOR LOGIN customer_login;
-- EXEC sp_addrolemember 'Customer', 'generic_customer';

-- ============================================================
-- SQL Server GRANT Statements (COMMENTED - Reference Only)
-- ============================================================

-- GRANT SELECT, INSERT, UPDATE, DELETE ON accounts TO Admin; 
-- GRANT SELECT, INSERT, UPDATE, DELETE ON products TO Admin; 
-- GRANT SELECT, INSERT, UPDATE, DELETE ON cart TO Admin; 
-- GRANT SELECT, INSERT, UPDATE, DELETE ON orders TO Admin; 
-- GRANT SELECT, INSERT, UPDATE, DELETE ON `order-details` TO Admin; 
-- GRANT SELECT, INSERT, UPDATE, DELETE ON reviews TO Admin; 
-- GRANT SELECT, INSERT, UPDATE, DELETE ON wishlist TO Admin; 

-- Read-only access to products 
-- GRANT SELECT ON products TO Customer; 
-- Full access to their own cart and wishlist 
-- GRANT SELECT, INSERT, UPDATE, DELETE ON cart TO Customer; 
-- GRANT SELECT, INSERT, DELETE ON wishlist TO Customer; 
-- Can create new orders and view their order history 
-- GRANT SELECT, INSERT ON orders TO Customer; 
-- GRANT SELECT, INSERT ON `order-details` TO Customer; 
-- Can write and view reviews 
-- GRANT SELECT, INSERT ON reviews TO Customer; 
-- Can update their own account info (SELECT, UPDATE) 
-- GRANT SELECT, UPDATE ON accounts TO Customer;  

-- View all product details 
-- GRANT SELECT ON products TO Inventory_Manager; 
-- Update quantities, price, description, etc., but not product ID or creation date 
-- GRANT UPDATE ON products (pname, category, description, price, qtyavail, img, brand) TO Inventory_Manager; 
-- View orders to predict stock needs (optional, but helpful) 
-- GRANT SELECT ON orders TO Inventory_Manager; 
-- GRANT SELECT ON `order-details` TO Inventory_Manager; 
 

-- /*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
-- /*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
-- /*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
