USE project;

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
