<?php
session_start();
include("include/connect.php");

if (isset($_POST['submit'])) {

  $username = $_POST['username'];
  $password = $_POST['password'];

  if ($username == "admin_leb") {

    $query = "select * from accounts where username=? and password=?";
    $stmt = $con->prepare($query);
    $stmt->bind_param("ss", $username, $password);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
      $row = $result->fetch_assoc();
      $_SESSION['aid'] = $row['aid'];
      $_SESSION['username'] = $row['username'];
      $_SESSION['afname'] = $row['afname'];
      header("Location: adminpanel.php");
      exit();
    } else {
      echo "<script> alert('Wrong credentials') </script>";
    }

  } else {
    echo "<script> alert('Wrong credentials') </script>";
  }
}

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

</head>

<body>
    <section id="header">
       <a href="index.php">
            <img src="img/lg.png" class="logo" alt="Nexus Gear" width="200" height="auto" />
        </a>

        <div>
            <ul id="navbar">
                <li><a href="index.php">Home</a></li>
                <li><a href="shop.php">Shop</a></li>
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
                <li><a class="active" href="admin.php">Admin</a></li>
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


    <form method="post" id="form">
        <h3 style="color: darkred; margin: auto"></h3>
        <input class="input1" id="user" name="username" type="text" placeholder="Username *">
        <input class="input1" id="pass" name="password" type="password" placeholder="Password *">
        <button type="submit" class="btn" name="submit">login</button>

    </form>


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
                <strong>Hours: </strong>    24/7
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