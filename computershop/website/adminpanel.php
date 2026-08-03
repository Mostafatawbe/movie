<?php
session_start();
include("include/connect.php");

// Check if user is admin - redirects to login if not authenticated
if (!isset($_SESSION['aid']) || $_SESSION['aid'] != 5) {  // admin1 has aid = 5
    header("Location: admin.php");
    exit();
}

// Handle add category
if (isset($_POST['add_cat'])) {
    $cat_name = trim($_POST['cat_name']);
    if (!empty($cat_name)) {
        // Check if category already exists
        $check_query = "SELECT * FROM products WHERE category = ?";
        $stmt = $con->prepare($check_query);
        $stmt->bind_param("s", $cat_name);
        $stmt->execute();
        $result = $stmt->get_result();
        
        if ($result->num_rows > 0) {
            $message = "Category already exists!";
        } else {
            $message = "Category can be used for new products. Note: Categories are created when products are added.";
        }
    }
}

// Handle add product to category
if (isset($_POST['add_product_cat'])) {
    $pname = trim($_POST['pname']);
    $category = trim($_POST['category']);
    $description = trim($_POST['description']);
    $price = (int)$_POST['price'];
    $qtyavail = (int)$_POST['qtyavail'];
    $brand = trim($_POST['brand']);
    
    if (!empty($pname) && !empty($category) && $price > 0 && $qtyavail >= 0) {
        $img = 'default.jpg';
        if (isset($_FILES['photo']) && $_FILES['photo']['error'] == 0) {
            $img = $_FILES['photo']['name'];
            move_uploaded_file($_FILES['photo']['tmp_name'], "product_images/$img");
        }
        
        $query = "INSERT INTO products (pname, category, description, price, qtyavail, img, brand) 
                  VALUES (?, ?, ?, ?, ?, ?, ?)";
        $stmt = $con->prepare($query);
        $stmt->bind_param("sssiiss", $pname, $category, $description, $price, $qtyavail, $img, $brand);
        
        if ($stmt->execute()) {
            $message = "Product added successfully to category!";
        } else {
            $message = "Error adding product: " . $con->error;
        }
    }
}

// Handle delete category
if (isset($_GET['del_cat'])) {
    $cat = trim($_GET['del_cat']);
    $query = "DELETE FROM products WHERE category = ?";
    $stmt = $con->prepare($query);
    $stmt->bind_param("s", $cat);
    $stmt->execute();
    header("Location: adminpanel.php");
    exit();
}

// Get distinct categories
$cat_query = "SELECT DISTINCT category FROM products ORDER BY category";
$cat_result = $con->query($cat_query);
$categories = array();
while ($row = $cat_result->fetch_assoc()) {
    $categories[] = $row['category'];
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Admin Panel - Category Management</title>
    <link rel="stylesheet" href="style.css">
    <style>
        body {
            font-family: Arial, sans-serif;
            background: linear-gradient(to right, #E0C3FC, #8ec5fc);
            margin: 0;
            padding: 20px;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background-color: #fff;
            padding: 20px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            border-radius: 5px;
        }
        h1 {
            color: #333;
            text-align: center;
            margin-bottom: 30px;
        }
        h2 {
            color: #088178;
            margin-top: 30px;
            border-bottom: 2px solid #088178;
            padding-bottom: 10px;
        }
        .form-section {
            background: #f9f9f9;
            padding: 20px;
            margin-bottom: 30px;
            border-radius: 5px;
            border-left: 4px solid #088178;
        }
        .form-group {
            margin-bottom: 15px;
        }
        label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
            color: #333;
        }
        input[type="text"],
        input[type="number"],
        select,
        textarea {
            width: 100%;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 14px;
            box-sizing: border-box;
        }
        textarea {
            resize: vertical;
            min-height: 80px;
        }
        button {
            background-color: #088178;
            color: white;
            padding: 12px 30px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
            font-weight: bold;
        }
        button:hover {
            background-color: #066d66;
        }
        .message {
            padding: 15px;
            margin-bottom: 20px;
            background-color: #d4edda;
            color: #155724;
            border-radius: 4px;
            border: 1px solid #c3e6cb;
        }
        .message.error {
            background-color: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
        }
        .category-list {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 20px;
            margin-top: 20px;
        }
        .category-card {
            background: #f9f9f9;
            border: 1px solid #ddd;
            border-radius: 4px;
            padding: 15px;
            text-align: center;
        }
        .category-card h3 {
            margin: 0 0 10px 0;
            color: #088178;
        }
        .category-card p {
            margin: 5px 0;
            color: #666;
        }
        .category-card button {
            background-color: #dc3545;
            padding: 8px 15px;
            font-size: 14px;
            margin-top: 10px;
        }
        .category-card button:hover {
            background-color: #c82333;
        }
        .search-products {
            margin-top: 30px;
            padding: 20px;
            background: #f9f9f9;
            border-radius: 5px;
        }
        .product-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        .product-table th,
        .product-table td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }
        .product-table th {
            background-color: #088178;
            color: white;
        }
        .product-table tr:hover {
            background-color: #f9f9f9;
        }
        .nav-buttons {
            text-align: center;
            margin: 20px 0;
        }
        .nav-buttons button {
            margin: 0 10px;
            padding: 10px 25px;
        }
        .logout-btn {
            background-color: #dc3545;
        }
        .logout-btn:hover {
            background-color: #c82333;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Admin Panel - Category & Product Management</h1>
        
        <div class="nav-buttons">
            <a href="index.php"><button>Back to Shop</button></a>
            <a href="inventory.php"><button>Inventory Management</button></a>
            <a href="logout.php"><button class="logout-btn">Logout</button></a>
        </div>

        <?php if (isset($message)): ?>
            <div class="message <?php echo (strpos($message, 'Error') !== false) ? 'error' : ''; ?>">
                <?php echo htmlspecialchars($message); ?>
            </div>
        <?php endif; ?>

        <!-- Add New Category / Product Section -->
        <h2>Add Product to Category</h2>
        <div class="form-section">
            <form method="POST" enctype="multipart/form-data">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                    <div>
                        <div class="form-group">
                            <label for="pname">Product Name:</label>
                            <input type="text" id="pname" name="pname" required>
                        </div>
                        <div class="form-group">
                            <label for="category">Category:</label>
                            <input type="text" id="category" name="category" placeholder="e.g., cpu, gpu, ram, mouse, keyboard, motherboard, Monitor, headset, gaming chair, mouse pad, table" required>
                        </div>
                        <div class="form-group">
                            <label for="brand">Brand:</label>
                            <input type="text" id="brand" name="brand" required>
                        </div>
                        <div class="form-group">
                            <label for="price">Price:</label>
                            <input type="number" id="price" name="price" min="0" required>
                        </div>
                    </div>
                    <div>
                        <div class="form-group">
                            <label for="qtyavail">Quantity Available:</label>
                            <input type="number" id="qtyavail" name="qtyavail" min="0" required>
                        </div>
                        <div class="form-group">
                            <label for="photo">Product Image:</label>
                            <input type="file" id="photo" name="photo" accept="image/*">
                        </div>
                        <div class="form-group">
                            <label for="description">Description:</label>
                            <textarea id="description" name="description" required></textarea>
                        </div>
                    </div>
                </div>
                <button type="submit" name="add_product_cat">Add Product to Category</button>
            </form>
        </div>

        <!-- Category Monitor -->
        <h2>Category Monitor</h2>
        <p>Click on a category below to view all products in that category:</p>
        <div class="category-list">
            <?php foreach ($categories as $cat): ?>
                <?php
                    // Count products in this category
                    $count_query = "SELECT COUNT(*) as cnt FROM products WHERE category = ?";
                    $stmt = $con->prepare($count_query);
                    $stmt->bind_param("s", $cat);
                    $stmt->execute();
                    $count_result = $stmt->get_result();
                    $count_row = $count_result->fetch_assoc();
                    $product_count = $count_row['cnt'];
                ?>
                <div class="category-card">
                    <h3><?php echo htmlspecialchars($cat); ?></h3>
                    <p><?php echo $product_count; ?> products</p>
                    <a href="#cat-<?php echo urlencode($cat); ?>" style="color: #088178; text-decoration: none; cursor: pointer;">
                        <button style="background-color: #088178; width: 100%;">View Products</button>
                    </a>
                    <a href="adminpanel.php?del_cat=<?php echo urlencode($cat); ?>" 
                       onclick="return confirm('Delete all products in this category? This cannot be undone.');">
                        <button style="background-color: #dc3545; width: 100%;">Delete Category</button>
                    </a>
                </div>
            <?php endforeach; ?>
        </div>

        <!-- Products by Category -->
        <h2 style="margin-top: 40px;">Products by Category</h2>
        <?php foreach ($categories as $cat): ?>
            <div id="cat-<?php echo urlencode($cat); ?>" style="margin-top: 30px;">
                <h3><?php echo htmlspecialchars($cat); ?> Category Products</h3>
                <?php
                    $prod_query = "SELECT * FROM products WHERE category = ? ORDER BY pname";
                    $stmt = $con->prepare($prod_query);
                    $stmt->bind_param("s", $cat);
                    $stmt->execute();
                    $prod_result = $stmt->get_result();
                ?>
                <div class="search-products">
                    <table class="product-table">
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Brand</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php while ($prod = $prod_result->fetch_assoc()): ?>
                                <tr>
                                    <td><?php echo htmlspecialchars($prod['pname']); ?></td>
                                    <td><?php echo htmlspecialchars($prod['brand']); ?></td>
                                    <td>$<?php echo number_format($prod['price'], 2); ?></td>
                                    <td><?php echo $prod['qtyavail']; ?></td>
                                    <td><?php echo htmlspecialchars(substr($prod['description'], 0, 50)) . (strlen($prod['description']) > 50 ? '...' : ''); ?></td>
                                </tr>
                            <?php endwhile; ?>
                        </tbody>
                    </table>
                </div>
            </div>
        <?php endforeach; ?>

        <div class="nav-buttons" style="margin-top: 40px;">
            <a href="index.php"><button>Back to Shop</button></a>
            <a href="inventory.php"><button>Inventory Management</button></a>
            <a href="logout.php"><button class="logout-btn">Logout</button></a>
        </div>
    </div>
</body>
</html>