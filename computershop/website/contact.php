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
                <li><a class="active" href="contact.php">Contact</a></li>

                <?php

                if ($_SESSION['aid'] < 0) {
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

    <section id="page-header" class="about-header">
        <h2>#GameTillTheEnd</h2>

        <p>Providing Premium Gaming Experience</p>
    </section>

    <section id="contact-details" class="section-p1">
        <div class="details">
            <span>GET IN TOUCH</span>
            <h2>Visit one of our agency locations or contact us today</h2>
            <h3>Head Office</h3>
            <div>
                <li>
                    <i class="fal fa-map"></i>
                    <p>Haret Hreik, Beirut, Lebanon</p>
                </li>
                <li>
                    <i class="fal fa-envelope"></i>
                    <p>hasan@gmail.com</p>
                </li>
                <li>
                    <i class="fal fa-phone-alt"></i>
                    <p>+961 78 838 911</p>
                </li>
                <li>
                    <i class="fal fa-clock"></i>
                    <p>Monday to Saturday: 24/7</p>

                </li>
            </div>
        </div>
        <div class="map">
            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d25806.699855540737!2d35.484385766080415!3d33.83417195619558!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2slb!4v1766237241239!5m2!1sen!2slb" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
    </section>

    <section id="form-details">
        <div class="people">
            <div>
                <img src="img/people/a.jpeg" alt="" />
                <p>
                    <span>Mostafa </span> Founder and CEO <br />
                    Phone: +961 123 321 <br />
                    Email:mostafa@gmail.com
                </p>
            </div>
            <div>
                <img src="img/people/b.jpeg" alt="" />
                <p>
                    <span>ali</span> Executive Marketing Manager <br />
                    Phone: +961 223 123<br />
                    Email:ali@gmail.com
                </p>
            </div>
            <div>
                <img src="img/people/c.jpeg" alt="" />
                <p>
                    <span>hasan</span> Customer Service Officer <br />
                    Phone: +961 323 123 <br />
                    Email:hasan@gmail.com
                </p>
            </div>
        </div>
    </section>

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
            <p>2025 Computerlogs. HTML CSS </p>
        </div>
    </footer>

    <script src="script.js"></script>
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