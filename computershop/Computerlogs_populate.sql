USE project;

INSERT INTO accounts (aid, afname, alname, phone, email, cnic, dob, username, gender, password) VALUES
(5, 'Ali', 'Nasser', '76123456', 'ali.nasser@example.com', '123456789012', '2023-05-03', 'admin_leb', 'M', 'admin123'),
(14, 'Fatima', 'Khoury', '71234567', 'fatima.khoury@example.com', '234567890123', '2023-05-02', 'fatima', 'F', '12345678'),
(18, 'Ibrahim', 'Haddad', '70123456', 'ibrahim.haddad@example.com', '345678901234', '2023-05-10', 'ibrahim', 'M', '12345678'),
(20, 'Layla', 'Abi-Aad', '78123456', 'layla.abi-aad@example.com', '456789012345', '2000-02-16', 'layla_a', 'F', '987654321');

INSERT INTO `order-details` (oid, pid, qty) VALUES
(17, 35, 5),
(18, 31, 1),
(19, 37, 1);

INSERT INTO orders (oid, dateod, datedel, aid, address, city, country, account, total) VALUES
(17, '2023-05-15', '2023-05-15', 14, 'Mar Mikhael, Main Street', 'Beirut', 'Lebanon', NULL, 375),
(18, '2023-05-15', '2023-05-15', 20, 'Mina Street, El-Mina', 'Tripoli', 'Lebanon', NULL, 130),
(19, '2023-05-15', '2023-05-15', 18, 'Old Souk, Sea Side', 'Jounieh', 'Lebanon', '1234567890123456', 380);

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

INSERT INTO reviews (oid, pid, rtext, rating) VALUES
(17, 35, ' a very good product nice and fast...', 4),
(18, 31, ' Very impressive. easy to use and properly weigh balanced!', 3),
(19, 37, ' Very easy to insert and use into PC. All the slots working correctly. Would recommend.', 4);

INSERT INTO wishlist (aid, pid) VALUES
(18, 35),
(18, 36);
