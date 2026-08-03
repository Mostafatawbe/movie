<?php
include("include/connect.php");

if (isset($_POST['ins'])) {
    $pname = mysqli_real_escape_string($con, $_POST['name']);
    // prefer new_category if provided
    $category = '';
    if (isset($_POST['new_category']) && trim($_POST['new_category']) !== '') {
        $category = trim($_POST['new_category']);
    } else {
        $category = isset($_POST['category']) ? $_POST['category'] : '';
    }
    $category = mysqli_real_escape_string($con, $category);
    $description = mysqli_real_escape_string($con, $_POST['description']);
    $quantity = (int)$_POST['quantity'];
    $price = (float)$_POST['price'];
    $brand = mysqli_real_escape_string($con, $_POST['brand']);
    $image = $_FILES['photo']['name'];
    $temp_image = $_FILES['photo']['tmp_name'];

    if ($category == "all" || $category == '') {
        echo "<script> alert('select category'); setTimeout(function(){ window.location.href = 'inventory.php'; }, 100); </script>";
        exit();
    }

    if (!empty($image)) {
        move_uploaded_file($temp_image, "product_images/$image");
    }

    $query = "INSERT INTO `products` (pname, category, description, price, qtyavail, img, brand) VALUES ('$pname', '$category', '$description', $price, $quantity, '$image', '$brand')";

    $result = mysqli_query($con, $query);

    if ($result) {
        echo "<script> alert('Successfully entered product') </script>";
    }
}

if (isset($_GET['pid'])) {

	$id = $_GET['pid'];
	$query = "DELETE FROM products WHERE pid = '$id'";

	mysqli_query($con, $query);

}

if (isset($_POST['submitt'])) {
    $pname = mysqli_real_escape_string($con, $_POST['name1']);
    // prefer new_category1 if provided
    if (isset($_POST['new_category1']) && trim($_POST['new_category1']) !== '') {
        $category = mysqli_real_escape_string($con, trim($_POST['new_category1']));
    } else {
        $category = isset($_POST['category1']) ? mysqli_real_escape_string($con, $_POST['category1']) : '';
    }
    $description = mysqli_real_escape_string($con, $_POST['description1']);
    $quantity = (int)$_POST['quantity1'];
    $price = (float)$_POST['price1'];
    $brand = mysqli_real_escape_string($con, $_POST['brand1']);
    $image = $_FILES['photo1']['name'];
    $temp_image = $_FILES['photo1']['tmp_name'];
    $pid2 = (int)$_POST['pid1'];
    $image2 = mysqli_real_escape_string($con, $_POST['prevphoto']);
    $prevcat = mysqli_real_escape_string($con, $_POST['prev']);
    if ($category == "all" || $category == '') {
        $category = $prevcat;
    }

    if (!empty($image)) {
        move_uploaded_file($temp_image, "product_images/$image");
    }

    if (!empty($image))
        $query = "UPDATE `products` SET pname = '$pname', category = '$category', description = '$description', qtyavail = $quantity, brand ='$brand', price = $price, img ='$image' WHERE pid = $pid2";
    else
        $query = "UPDATE `products` SET pname = '$pname', category = '$category', description = '$description', qtyavail = $quantity, brand ='$brand', price = $price, img ='$image2' WHERE pid = $pid2";

    $result = mysqli_query($con, $query);

    if ($result) {
        echo "<script> alert('Successfully updated product') </script>";
    }
}

if (isset($_GET['odd'])) {
	$oid = $_GET['odd'];

	$query = "UPDATE orders set datedel = CURDATE() where oid = $oid";

	$result = mysqli_query($con, $query);

	header("Location: inventory.php");
	exit();
}

?>
<!DOCTYPE html>
<html>

<head>
    <title>Ecommerce Inventory Management</title>
    <link rel="stylesheet" href="style.css">
    <style>
    #d1 {


        width: 100%;
    }

    .container11 {
        max-width: 100%;
        margin: 0 auto;
        padding: 20px;
        background-color: #fff;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        overflow: auto;

    }

    #tab1 tr {
        width: 100%;
        height: 80px;

    }

    .btns {
        display: flex;
        justify-content: center;
        margin-bottom: 20px;
    }

    .order-container h1 {
        margin-bottom: 0;
    }

    body {
        font-family: Arial, sans-serif;
        background: linear-gradient(to right, #E0C3FC, #8ec5fc);
    }

    .container1 {
        max-width: 100%;
        margin: 0 auto;
        padding: 20px;
        background-color: #fff;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        display: flex;
        justify-content: space-between;
    }

    .form-container {
        width: 35%;
    }


    h1 {
        font-size: 36px;
        text-align: center;
        margin-bottom: 40px;
    }

    h2 {
        font-size: 24px;
        margin-bottom: 20px;
    }

    .search-container {
        width: 60%;
    }

    .form-container,
    .search-container {
        margin-bottom: 40px;
        padding: 20px;
        background-color: #f5f5f5;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .order-container {
        margin-bottom: 40px;
        padding: 20px;
        justify-content: center;
        background-color: #f5f5f5;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        width: 100%;
        overflow: auto;


    }

    #tb1 tr {
        height: 60px;
    }

    .form-container label,
    .search-container label {
        display: flex;
        margin-bottom: 10px;
        font-size: 16px;
        font-weight: bold;
    }

    .form-container input,
    .search-container input,
    .form-container select,
    .search-container select {
        display: block;
        width: 100%;
        padding: 10px;
        margin-bottom: 20px;
        font-size: 16px;
        border-radius: 5px;
        border: 1px solid #ccc;
    }

    .form-container input[type="file"] {
        display: inline-block;
    }

    .inventory-container {
        padding: 20px;
        background-color: #f5f5f5;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .product {
        margin-bottom: 20px;
        padding: 20px;
        background-color: #fff;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        position: relative;
        display: flex;
    }

    .product-checkbox {
        position: absolute;
        top: 20px;
        right: 20px;
    }

    .product p {
        margin: 0;
        font-size: 16px;
        line-height: 1.5;
    }

    .product p span {
        font-weight: bold;
    }

    #delete-btn,
    #update-btn,
    #insert-btn,
    #search-btn,
    #all-btn,
    #delivered-btn,
    #undelivered-btn,
    #oupdate-btn,
    #up-btn {
        display: inline-block;
        padding: 10px 20px;
        font-size: 16px;
        border-radius: 5px;
        border: none;
        color: #fff;
        background-color: #088178;
        cursor: pointer;
        margin-right: 20px;
        margin-top: 20px;
        margin-bottom: 20px;
        margin-left: 20px;
    }

    .insert-btn {
        display: inline-block;
        padding: 10px 20px;
        font-size: 16px;
        border-radius: 5px;
        border: none;
        color: #fff;
        background-color: #088178;
        cursor: pointer;
        margin-right: 20px;
        margin-top: 20px;
        margin-bottom: 20px;
        margin-left: 20px;
    }

    #delete-btn:hover,
    #update-btn:hover,
    #insert-btn:hover,
    #search-btn:hover {
        background-color: #3e8e41;
    }

    #product-list {
        overflow-x: auto;
        height: 20%;
    }

    table {
        border-collapse: collapse;
        height: 350px;
        display: inline-block;
        width: 100%;
        overflow: auto;
    }

    .order-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .random {
        display: flex;
        justify-content: center;
    }

    th,
    td {
        text-align: left;
        padding: 8px;
        border-bottom: 1px solid #ddd;
        white-space: nowrap;
    }

    th {
        background-color: #f2f2f2;

        position: sticky;
        top: 0;
    }

    tr:hover {
        background-color: #f5f5f5;
    }

    td img {
        max-width: 50px;
        max-height: 50px;
        margin-right: 10px;
    }

    td input[type="checkbox"] {
        margin-right: 10px;
    }

    td input[type="checkbox"]:hover {
        cursor: pointer;


    }

    #tab1 {
        height: auto;
        max-height: 900px;
        overflow-y: auto;
        overflow-x: auto;
    }

    .hidden {
        display: none;
    }
    </style>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

</head>

<body>
    <div class="container1">
        <div class="form-container">
            <h2>Insert Product</h2>
            <form id="insert-form" action="inventory.php" enctype="multipart/form-data" method="post">
                <label for="name">Product Name:</label>
                <input type="text" id="name" name="name" required>
                <label for="category">Category:</label>
                <?php
                    $cats = array();
                    $cat_res = $con->query("SELECT DISTINCT category FROM products ORDER BY category");
                    while ($c = $cat_res->fetch_assoc()) {
                        $cats[] = $c['category'];
                    }
                ?>
                <select id="category-filter" name="category" required>
                    <option value="all">All</option>
                    <?php foreach ($cats as $c): ?>
                        <option value="<?php echo htmlspecialchars($c); ?>"><?php echo htmlspecialchars($c); ?></option>
                    <?php endforeach; ?>
                </select>
                <div style="margin-top:8px;">
                    <label for="new_category">Or add new category (optional):</label>
                    <input type="text" id="new_category" name="new_category" placeholder="e.g. Monitor, headset, gaming chair, mouse pad, table">
                </div>
                <label for="description">Description:</label>
                <input type="text" id="description" name="description" required>
                <label for="price">Price:</label>
                <input type="number" id="price" name="price" required min='0'>
                <label for="quantity">Quantity:</label>
                <input type="number" id="quantity" name="quantity" required min='0'>
                <label for="image">Image:</label>
                <input type="file" name="photo" id="fileInput" required>
                <label for="brand">Brand:</label>
                <input type="text" id="brand" name="brand" required>
                <button name="ins" type="submit" class="insert-btn">save</button>
            </form>
        </div>
        <div class="search-container">
            <h2>Search Product</h2>
            <form id="search-form" action="inventory.php" method="post">
                <label for="search">Search:</label>
                <input type="text" id="search" name="search">
                <label for="category-filter">Category:</label>
                <select id="category-filter" name="cat">
                    <option value="all">All</option>
                    <?php foreach ($cats as $c): ?>
                        <option value="<?php echo htmlspecialchars($c); ?>"><?php echo htmlspecialchars($c); ?></option>
                    <?php endforeach; ?>
                </select>
                <button type="submit" id="search-btn" name="search1">Search</button>
            </form>
            <div class="inventory-container">
                <div id="product-list">

                    <?php
					if (isset($_GET['pidd'])) {
						$id = $_GET['pidd'];
						$query = "select * FROM products WHERE pid = $id";

						$result = mysqli_query($con, $query);
						$row = mysqli_fetch_assoc($result);
						$pid = $row['pid'];
						$pname = $row['pname'];
						$desc = $row['description'];
						$qty = $row['qtyavail'];
						$price = $row['price'];
						$cat = $row['category'];
						$img = $row['img'];
						$brand = $row['brand'];
                        ?>
                        <form id='insert-form' action='inventory.php' enctype='multipart/form-data' method='post'>
                            <input type='number' style='display: none;' name='pid1' value='<?php echo $pid; ?>'>
                            <input type='text' style='display: none;' name='prevphoto' value='<?php echo htmlspecialchars($img); ?>'>
                            <input type='text' style='display: none;' name='prev' value='<?php echo htmlspecialchars($cat); ?>'>
                            <label for='name'>Product Name:</label>
                            <input type='text' id='name' name='name1' value='<?php echo htmlspecialchars($pname); ?>' required>
                            <label for='category'>Category:</label>
                            <select id='category-filter' name='category1'>
                                <option value='all'>All</option>
                                <?php foreach ($cats as $cc): ?>
                                    <option value="<?php echo htmlspecialchars($cc); ?>" <?php if ($cat == $cc) echo 'selected'; ?>><?php echo htmlspecialchars($cc); ?></option>
                                <?php endforeach; ?>
                            </select>
                            <div style='margin-top:8px;'>
                                <label for='new_category1'>Or add new category (optional):</label>
                                <input type='text' id='new_category1' name='new_category1' placeholder='e.g. Monitor, headset, gaming chair, mouse pad, table'>
                            </div>
                            <label for='description' >Description:</label>
                            <input type='text' id='description' name='description1' value='<?php echo htmlspecialchars($desc); ?>' required>
                            <label for='price'>Price:</label>
                            <input type='number' id='price' name='price1' value='<?php echo $price; ?>' required min='0'>
                            <label for='quantity'>Quantity:</label>
                            <input type='number' id='quantity' name='quantity1' value='<?php echo $qty; ?>' required min='0'>
                            <label for='image'>Image:</label>
                            <input type='file' name='photo1' id='fileInput'>
                            <label for='brand'>Brand:</label>
                            <input type='text' id='brand' name='brand1' value='<?php echo htmlspecialchars($brand); ?>' required>
                            <button name='submitt' type='submitt' class='insert-btn'>save</button>
                        </form >
                        <?php
					}
					if (isset($_POST['search1'])) {
						$search = $_POST['search'];
						$category = $_POST['cat'];
						$query = "";
						if (!empty($search))
							$query = "select* from `products` where ((pname like '%$search%') or (brand like '%$search%') or (description like '%$search%'))";
						else
							$query = "select * from `products`";

						if ($category != "all") {
							if (empty($search)) {
								$query = $query . "where category = '$category'";
							} else {
								$query = $query . "and category = '$category'";
							}
						}

						$result = mysqli_query($con, $query);

						if ($result) {
							echo "
										<table>
										<thead>
											<tr>
												<th>Product Name</th>
												<th>Description</th>
												<th>Category</th>
												<th>Price</th>
												<th>Quantity</th>
												<th>Image</th>
												<th>Brand</th>
												<th>Delete</th>
												<th>Update</th>
											</tr>
										</thead>
										<tbody>
										";
						}

						while ($row = mysqli_fetch_assoc($result)) {
							$pid = $row['pid'];
							$pname = $row['pname'];
							$desc = $row['description'];
							$qty = $row['qtyavail'];
							$price = $row['price'];
							$cat = $row['category'];
							$img = $row['img'];
							$brand = $row['brand'];

							echo "<tr>
										<td>$pname</td>
										<td style='max-width: 300px; max-height: 100px; overflow-x: auto; overflow-y: auto;'>$desc</td>
										<td>$cat</td>
										<td>$price</td>
										<td>$qty</td>
										<td><img src='product_images/$img' alt='' /></td>
										<td>$brand</td>
									
										<td><a href ='inventory.php?pid=$pid' class='insert-btn'>Delete</button></td>
										<td><a href ='inventory.php?pidd=$pid' class='insert-btn'>Update</button></td>

										</tr>";
						}

						if ($result) {
							echo "
										</tbody>
										</table>
										";
						}
					}
					?>


                </div>
            </div>

        </div>
    </div>



    <div class="container11">
        <div class="order-container">

            <h1>list of orders</h1>
            <div class="btns">
                <a href='inventory.php?a=1'><button id="all-btn">All</button></a>
                <a href='inventory.php?d=1'><button id="delivered-btn">Delivered</button></a>
                <a href='inventory.php?u=1'><button id="undelivered-btn">Undelivered</button></a>

            </div>


            <table id="tab1" style="width: auto; margin: 0 auto;">
                <thead>
                    <tr>
                        <th> UserName</th>
                        <th>OrderID</th>
                        <th>DateOrdered</th>
                        <th>DateDelivered</th>
                        <th>PaymentMethod</th>
                        <th>Address</th>
                        <th>Set</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
					if (isset($_GET['d'])) {
						include("include/connect.php");
						$query = "SELECT * FROM orders join accounts on orders.aid = accounts.aid where datedel is not NULL";


						$result = mysqli_query($con, $query);

						while ($row = mysqli_fetch_assoc($result)) {
							$aname = $row['username'];
							$oid = $row['oid'];
							$dateod = $row['dateod'];
							$datedel = $row['datedel'];
							$add = $row['address'];
                            $pri = $row['total'];

							if (empty($datedel))
								$datedel = "Not Delivered";
							echo "
										

										<tr>
										<td>$aname</td>
										<td>$oid</td>
												<td>$dateod</td>
												<td>$datedel</td>
										<td>$pri</td>
										<td>$add</td>
										";
							if ($datedel == "Not Delivered")
								echo "<td><a href='inventory.php?odd=$oid'><button id='oupdate-btn'>SET</button></a></td>";


							echo "</tr>";
						}
					} elseif (isset($_GET['u'])) {
						include("include/connect.php");
						$query = "SELECT * FROM orders join accounts on orders.aid = accounts.aid where datedel is NULL";


						$result = mysqli_query($con, $query);

						while ($row = mysqli_fetch_assoc($result)) {
							$aname = $row['username'];
							$oid = $row['oid'];
							$dateod = $row['dateod'];
							$datedel = $row['datedel'];
							$add = $row['address'];
                            $pri = $row['total'];

							if (empty($datedel))
								$datedel = "Not Delivered";
							echo "
										

										<tr>
										<td>$aname</td>
										<td>$oid</td>
												<td>$dateod</td>
												<td>$datedel</td>
										<td>$pri</td>
										<td>$add</td>
										";
							if ($datedel == "Not Delivered")
								echo "<td><a href='inventory.php?odd=$oid'><button id='oupdate-btn'>SET</button></a></td>";


							echo "</tr>";
						}
					} elseif (isset($_GET['a'])) {
						include("include/connect.php");
						$query = "SELECT * FROM orders join accounts on orders.aid = accounts.aid";


						$result = mysqli_query($con, $query);

						while ($row = mysqli_fetch_assoc($result)) {
							$aname = $row['username'];
							$oid = $row['oid'];
							$dateod = $row['dateod'];
							$datedel = $row['datedel'];
							$add = $row['address'];
                            $pri = $row['total'];

							if (empty($datedel))
								$datedel = "Not Delivered";
							echo "
										

										<tr>
										<td>$aname</td>
										<td>$oid</td>
												<td>$dateod</td>
												<td>$datedel</td>
										<td>$pri</td>
										<td>$add</td>
										";
							if ($datedel == "Not Delivered")
								echo "<td><a href='inventory.php?odd=$oid'><button id='oupdate-btn'>SET</button></a></td>";


							echo "</tr>";
						}
					} else {

						include("include/connect.php");
						$query = "SELECT * FROM orders join accounts on orders.aid = accounts.aid";


						$result = mysqli_query($con, $query);

						while ($row = mysqli_fetch_assoc($result)) {
							$aname = $row['username'];
							$oid = $row['oid'];
							$dateod = $row['dateod'];
							$datedel = $row['datedel'];
							$add = $row['address'];
                            $pri = $row['total'];


							if (empty($datedel))
								$datedel = "Not Delivered";
							echo "
										

										<tr>
										<td>$aname</td>
										<td>$oid</td>
												<td>$dateod</td>
												<td>$datedel</td>
										<td>$pri</td>
										<td>$add</td>
										";
							if ($datedel == "Not Delivered")
								echo "<td><a href='inventory.php?odd=$oid'><button id='oupdate-btn'>SET</button></a></td>";


							echo "</tr>";
						}

					}



					?>

                </tbody>
            </table>


        </div>
    </div>
</body>

</html>

<script>
window.addEventListener("unload", function() {
  // Call a PHP script to log out the user
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "logout.php", false);
  xhr.send();
});
</script>