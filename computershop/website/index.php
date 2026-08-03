<?php
session_start();

if (empty($_SESSION['aid']))
    $_SESSION['aid'] = -1;
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
                <li><a class="active" href="index.php">Home</a></li>
                <li><a href="shop.php">Shop</a></li>
                <li><a href="about.php">About</a></li>
                <li><a href="contact.php">Contact</a></li>

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

    <section id="hero">
        <h4>Trade-in-offer</h4>
        <h2>Super value deals</h2>
        <h1>On all products</h1>
        <p>Save more with coupons & up to 70% off!</p>
        <a href="shop.php">
            <button>Shop Now</button>
        </a>
    </section>

    <section id="category-slider" class="section-p1">
        <div class="slider-container">
            <div class="slide">
                <a href="shop.php?category=cpu">
                    <img src="./product_images/cpu6.jpg" alt="CPU" />
                    <div class="caption">CPU</div>
                </a>
            </div>
            <div class="slide">
                <a href="shop.php?category=gpu">
                    <img src="./product_images/gpu1.jpg" alt="GPU" />
                    <div class="caption">GPU</div>
                </a>
            </div>
            <div class="slide">
                <a href="shop.php?category=keyboard">
                    <img src="./product_images/kb1.jpg" alt="Keyboard" />
                    <div class="caption">Keyboard</div>
                </a>
            </div>
            <div class="slide">
                <a href="shop.php?category=monitor">
                    <img src="./product_images/monitor1.jpg" alt="Monitor" />
                    <div class="caption">Monitor</div>
                </a>
            </div>
            <div class="slide">
                <a href="shop.php?category=mouse">
                    <img src="./product_images/mouse1.jpg" alt="Mouse" />
                    <div class="caption">Mouse</div>
                </a>
            </div>
            <div class="slide">
                <a href="shop.php?category=motherboard">
                    <img src="./product_images/mb1.jpg" alt="Motherboard" />
                    <div class="caption">Motherboard</div>
                </a>
            </div>
            <div class="slide">
                <a href="shop.php?category=ram">
                    <img src="./product_images/ram1.jpg" alt="RAM" />
                    <div class="caption">RAM</div>
                </a>
            </div>
            <div class="slide">
                <a href="shop.php?category=headset">
                    <img src="./product_images/headset1.jpeg" alt="Headsets" />
                    <div class="caption">Headsets</div>
                </a>
            </div>
            <div class="slide">
                <a href="shop.php?category=gaming chair">
                    <img src="./product_images/chair1.jpeg" alt="Gaming Chairs" />
                    <div class="caption">Gaming Chairs</div>
                </a>
            </div>
            <div class="slide">
                <a href="shop.php?category=table">
                    <img src="./product_images/table1.jpeg" alt="Tables" />
                    <div class="caption">Tables</div>
                </a>
            </div>
            <div class="slide">
                <a href="shop.php?category=mouse pad">
                    <img src="./product_images/mousepad1.jpeg" alt="Mouse Pads" />
                    <div class="caption">Mouse Pads</div>
                </a>
            </div>
        </div>
    </section>


    <section id="banner" class="section-m1">
        <h4>Summer Sale</h4>
        <h2>Up to <span>70% Off</span> - All CPUs & GPUs</h2>
        <a href="shop.php">
            <button class="normal">Explore More</button>
        </a>
    </section>

    <section id="sm-banner" class="section-p1">
        <div class="banner-box">
            <h4>crazy deals</h4>
            <h2>Buy a combo, get one accessory free</h2>
            <span>The best classic is on sale at computerlogs</span>
            <a href="shop.php">
                <button class="white">Learn More</button>
            </a>
        </div>
        <div class="banner-box banner-box2">
            <h4>Coming This Week</h4>
            <h2>Ragnar Sale</h2>
            <span>The best classic coming on sale at computerlogs</span>
            <a href="shop.php">
                <button class="white">Collection</button>
            </a>
        </div>
    </section>

    <section id="banner3">
        <div class="banner-box">
            <h2>Excalibur Pack</h2>
            <h3> 25% OFF</h3>
        </div>
        <div class="banner-box banner-box2">
            <h2>Raptor Pack</h2>
            <h3>30% OFF</h3>
        </div>
        <div class="banner-box banner-box3">
            <h2>Magneto Pack</h2>
            <h3>50% OFF</h3>
        </div>
    </section>

    <footer class="section-p1">
        <div class="col">
           <img src="img/lg.png" class="logo" alt="Nexus Gear" width="200" height="auto" />
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
         
        </div>
        <div class="copyright">
            <p>2025 Computerlogs HTML CSS </p>
        </div>
    </footer>

    <script src="script.js"></script>
</body>

</html>

<script>
window.addEventListener("onunload", function() {

  var xhr = new XMLHttpRequest();
  xhr.open("GET", "logout.php", false);
  xhr.send();
});
</script>