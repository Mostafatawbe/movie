<?php
session_start();

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>computerlogs</title>
    <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" />
    <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" />

    <link rel="stylesheet" href="style.css" />

    <style>
    .search-container {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        background: #e3e6f3;
        padding: 10px;
    }

    #category-filter {
        padding: 6px;
        margin-right: 10px;
        border: none;
        border-radius: 4px;
    }

    #search {
        padding: 6px;
        margin-right: 10px;
        border: none;
        border-radius: 4px;
    }

    #search-btn {
        outline: none;
        border: none;
        padding: 10px 30px;
        background-color: navy;
        color: white;
        border-radius: 1rem;
        cursor: pointer;
    }
    </style>

 
</head>

<body>
    <section id="header">
       <a href="index.php">
            <img src="img/lg.png" class="logo" alt="Nexus Gear" width="200" height="auto" />
        </a>

        <div>
            <ul id="navbar">
                <li><a href="index.php">Home</a></li>
                <li><a class="active" href="shop.php">Shop</a></li>
                <li><a href="about.php">About</a></li>
                <li><a href="contact.php">Contact</a></li>

                <?php

                if (!isset($_SESSION['aid']) || $_SESSION['aid'] < 0) {
                    echo "   <li><a href='login.php'>login</a></li>
            <li><a href='signup.php'>SignUp</a></li>
            ";
                } else {
                    echo "   <li><a href='profile.php'>profile</a></li>
          ";
                }
                ?>
                <li><a href="admin.php">Admin</a></li>
                <li id="lg-bag">
                    <a href="cart.php"><i class="far fa-shopping-bag"></i></a>
                </li>
                <a href="#" id="close"><i class="far fa-times"></i></a>
            </ul>
        </div>
        <div id="mobile">
            <a href="cart.php"><i class="far fa-shopping-bag"></i></a>
            <i id="bar" class="fas fa-outdent"></i>
        </div>
    </section>

    <section id="page-header">
        <h2>Premium Gaming</h2>

        <p>Save more with coupons & up to 70% off!</p>
    </section>

    <div class="search-container">
        <?php 
        $category = isset($_GET['category']) ? $_GET['category'] : 'all';
        $selectedCat = $category; 
        $searchValue = isset($_GET['search']) ? htmlspecialchars($_GET['search']) : '';
        ?>
        <form id="search-form" action="shop.php" method="get">
            <label for="search">Search:</label>
            <input type="text" id="search" name="search" value="<?php echo $searchValue; ?>">
            <label for="category-filter">Category:</label>
            <select id="category-filter" name="category" onchange="this.form.submit();">
                <option value="all"<?php echo ($selectedCat === 'all') ? ' selected' : ''; ?>>All</option>
                <option value="cpu"<?php echo ($selectedCat === 'cpu') ? ' selected' : ''; ?>>CPU</option>
                <option value="gpu"<?php echo ($selectedCat === 'gpu') ? ' selected' : ''; ?>>GPU</option>
                <option value="ram"<?php echo ($selectedCat === 'ram') ? ' selected' : ''; ?>>RAM</option>
                <option value="keyboard"<?php echo ($selectedCat === 'keyboard') ? ' selected' : ''; ?>>Keyboard</option>
                <option value="mouse"<?php echo ($selectedCat === 'mouse') ? ' selected' : ''; ?>>Mouse</option>
                <option value="motherboard"<?php echo ($selectedCat === 'motherboard') ? ' selected' : ''; ?>>Motherboard</option>
                <option value="Monitor"<?php echo ($selectedCat === 'Monitor') ? ' selected' : ''; ?>>Monitor</option>
                <option value="headset"<?php echo ($selectedCat === 'headset') ? ' selected' : ''; ?>>Headsets</option>
                <option value="gaming chair"<?php echo ($selectedCat === 'gaming chair') ? ' selected' : ''; ?>>Chairs</option>
                <option value="mouse pad"<?php echo ($selectedCat === 'mouse pad') ? ' selected' : ''; ?>>Mouse Pads</option>
                <option value="table"<?php echo ($selectedCat === 'table') ? ' selected' : ''; ?>>Tables</option>
            </select>
            <button type="submit" id="search-btn" name="search1">Search</button>
        </form>
    </div>

    <?php
    include("include/connect.php");
    
    // Always show products - either from search or all on initial load
    $search = isset($_GET['search']) ? $_GET['search'] : '';
    $query = "";
    
    if (!empty($search)) {
        $search_term = '%' . $search . '%';
        if ($category != "all") {
            $query = "select* from `products` where ((pname like ?) or (brand like ?) or (description like ?)) and category = ?";
            $stmt = $con->prepare($query);
            $stmt->bind_param("ssss", $search_term, $search_term, $search_term, $category);
        } else {
            $query = "select* from `products` where ((pname like ?) or (brand like ?) or (description like ?))";
            $stmt = $con->prepare($query);
            $stmt->bind_param("sss", $search_term, $search_term, $search_term);
        }
    } else {
        if ($category != "all") {
            $query = "select * from `products` where category = ?";
            $stmt = $con->prepare($query);
            $stmt->bind_param("s", $category);
        } else {
            $query = "select * from `products`";
            $stmt = $con->prepare($query);
        }
    }

    if (!$stmt) {
        die('Prepare failed: ' . $con->error);
    }
    
    if (!empty($search) || $category != "all") {
        $stmt->execute();
        $result = $stmt->get_result();
    } else {
        $result = $con->query($query);
    }

    if ($result) {
        echo "<section id='product1' class='section-p1'>
                <div class='pro-container'>";
    }

    while ($row = mysqli_fetch_assoc($result)) {
        $pid = $row['pid'];
        $pname = $row['pname'];
        if (strlen($pname) > 35) {
            $pname = substr($pname, 0, 35) . '...';
        }
        $desc = $row['description'];
        $qty = $row['qtyavail'];
        $price = $row['price'];
        $cat = $row['category'];
        $img = $row['img'];
        $brand = $row['brand'];

       
                $query2 = "SELECT pid, AVG(rating) AS average_rating FROM reviews where pid = $pid GROUP BY pid ";

        $result2 = mysqli_query($con, $query2);

        $row2 = mysqli_fetch_assoc($result2);

            if ($row2) {
                $stars = $row2['average_rating'];
            } else {
                $stars = 0;
            }
            $stars = round($stars, 0);
            $empty = 5 - $stars;

            echo "
                    <div class='pro' onclick='topage($pid)'>
                      <img src='product_images/$img' height='235px' width = '235px' alt='' />
                      <div class='des'>
                        <span>$brand</span>
                        <h5>$pname</h5>
                        <div class='star'>";
            for ($i = 1; $i <= $stars; $i++) {
                echo "<i class='fas fa-star'></i>";

            }
            for ($i = 1; $i <= $empty; $i++) {
                echo "<i class='far fa-star'></i>";

            }
            echo "</div>
                        <h4>$$price</h4>
                      </div>
                      <a onclick='topage($pid)'><i class='fal fa-shopping-cart cart'></i></a>
                    </div>
                 ";
        }

        if ($result) {

            echo "</section>
                    </div>";
        }
    ?>


    <footer class="section-p1">
        <div class="col">
          
            <h4>Contact</h4>
            <p>
                <strong>Address: </strong> Haret Hreik, Beirut, Lebanon

            </p>
            <p>
                <strong>Phone: </strong> +961 78 838 911
            </p>
            <p>
                <strong>Hours: </strong> 24/7
            </p>
        </div>

        <div class="col">
            <h4>My Account</h4>
            <a href="cart.php">View Cart</a>
            <a href="wishlist.php">My Wishlist</a>
        </div>
        <div class="col install">
            <p>Secured Payment Gateways</p>
            <img src="img/pay/pay.png" />
        </div>
        <div class="copyright">
            <p>2025 Computerlogs HTML CSS </p>
        </div>
    </footer>

    <script src="script.js"></script>
</body>

</html>

<script>
    function topage(pid) {
        window.location.href = `sproduct.php?pid=${pid}`;
    }
    </script>
    <script>
    window.addEventListener("unload", function() {
        // Call a PHP script to log out the user
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "logout.php", false);
        xhr.send();
    });
    </script>