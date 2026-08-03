USE project;

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
