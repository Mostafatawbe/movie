# Computer Shop - Android + PHP/MySQL Project

## 📱 Project Overview
This is a complete e-commerce Android application for a computer parts shop, built with:
- **Android (Java)** - Native mobile client
- **PHP/MySQL** - Backend API running on XAMPP
- **Material Design** - Modern UI with BottomNavigation, RecyclerView, Fragments

## 🏗️ Project Structure

```
computer1shop/
├── website/              # PHP Web & API
│   ├── api/             # JSON API endpoints (NEW)
│   │   ├── _common.php
│   │   ├── login.php
│   │   ├── signup.php
│   │   ├── get_products.php
│   │   ├── get_product.php
│   │   ├── add_to_cart.php
│   │   ├── update_cart.php
│   │   ├── remove_from_cart.php
│   │   ├── get_cart.php
│   │   ├── checkout.php
│   │   ├── get_orders.php
│   │   ├── get_order_details.php
│   │   ├── get_wishlist.php
│   │   ├── add_wishlist.php
│   │   ├── remove_wishlist.php
│   │   ├── get_reviews.php
│   │   └── add_review.php
│   ├── product_images/  # Product image files
│   └── include/
│       └── connect.php  # Database connection
│
├── AndroidApp/          # Android Studio Project (NEW)
│   ├── app/
│   │   ├── src/main/
│   │   │   ├── java/com/computershop/app/
│   │   │   │   ├── activities/    # Activities
│   │   │   │   ├── fragments/     # Fragments (Home, Products, Cart, Profile)
│   │   │   │   ├── adapters/      # RecyclerView Adapters
│   │   │   │   ├── models/        # Data models (Product, CartItem, Order)
│   │   │   │   ├── network/       # Volley networking (ApiClient, VolleySingleton)
│   │   │   │   └── utils/         # Utilities (Constants, SessionManager)
│   │   │   └── res/
│   │   │       ├── layout/        # XML layouts
│   │   │       ├── menu/          # Navigation menus
│   │   │       ├── values/        # Strings, colors, themes
│   │   │       └── drawable/      # Images & icons
│   │   └── build.gradle
│   ├── build.gradle
│   └── settings.gradle
│
└── Computerlogs.sql     # Database dump
```

## 🗄️ Database Schema

**Database Name:** `project`

**Tables:**
1. **accounts** - User accounts (aid, afname, alname, phone, email, dob, username, gender, password)
2. **products** - Product catalog (pid, pname, category, description, price, qtyavail, img, brand)
3. **cart** - Shopping cart (aid, pid, cqty)
4. **orders** - Orders (oid, dateod, datedel, aid, address, city, country, account, total)
5. **order-details** - Order items (oid, pid, qty) - **Note: Use backticks in SQL!**
6. **reviews** - Product reviews (oid, pid, rtext, rating)
7. **wishlist** - User wishlist (aid, pid)

## ⚙️ Setup Instructions

### 1. Setup XAMPP & Database

1. **Install XAMPP** (if not already installed)
   - Download from: https://www.apachefriends.org/

2. **Start Apache and MySQL**
   - Open XAMPP Control Panel
   - Click "Start" for Apache
   - Click "Start" for MySQL

3. **Import Database**
   - Open phpMyAdmin: http://localhost/phpmyadmin
   - Click "New" to create database
   - Database name: `project`
   - Collation: `utf8mb4_general_ci`
   - Click "Import" tab
   - Choose file: `Computerlogs.sql`
   - Click "Go"

4. **Verify Database**
   - Check that database `project` exists
   - Check that all 7 tables are created
   - Verify sample data is present

### 2. Setup PHP API

1. **Copy project to XAMPP htdocs**
   ```
   Copy entire `website` folder to:
   C:\xampp\htdocs\website\
   ```

2. **Verify API folder structure**
   ```
   C:\xampp\htdocs\website\
   ├── api\              ← NEW API folder
   ├── product_images\
   ├── include\
   └── (other PHP files)
   ```

3. **Test API Endpoints**

   Open browser and test:

   **Get Products:**
   ```
   http://localhost/website/api/get_products.php
   ```
   Should return JSON with product list

   **Get Specific Product:**
   ```
   http://localhost/website/api/get_product.php?product_id=31
   ```
   
   **Test Login (use tool like Postman or HTML form):**
   ```
   POST: http://localhost/website/api/login.php
   Body: username=admin_leb&password=admin123
   ```

   All endpoints should return JSON:
   ```json
   {
     "success": true/false,
     "message": "...",
     "data": {...}
   }
   ```

### 3. Setup Android App

#### Option A: Using Android Studio (Recommended)

1. **Install Android Studio**
   - Download from: https://developer.android.com/studio

2. **Open Project**
   - Open Android Studio
   - File → Open
   - Select: `AndroidApp` folder
   - Wait for Gradle sync to complete

3. **Configure BASE_URL**

   Open: `app/src/main/java/com/computershop/app/utils/Constants.java`

   **For Android Emulator:**
   ```java
   public static final String BASE_URL = "http://10.0.2.2/website/api/";
   ```
   - `10.0.2.2` is the special IP for emulator to access host machine's localhost

   **For Real Phone (same WiFi as computer):**
   ```java
   public static final String BASE_URL = "http://192.168.1.XXX/website/api/";
   ```
   - Replace `192.168.1.XXX` with your computer's actual IP address
   - Find your IP:
     - Windows: Open CMD → `ipconfig` → look for IPv4 Address
     - Example: 192.168.1.100

4. **Build & Run**
   - Connect Android device OR start emulator
   - Click Run (Green play button) or Shift+F10
   - Select device/emulator
   - Wait for build and installation

### 4. Network Configuration

#### For Emulator Testing:

1. Use `http://10.0.2.2/website/api/` in Constants.java
2. No additional configuration needed
3. Emulator automatically routes to host machine

#### For Real Phone Testing:

1. **Connect phone to same WiFi as computer**

2. **Find computer IP address:**
   ```cmd
   ipconfig
   ```
   Look for "IPv4 Address" under your WiFi adapter
   Example: `192.168.1.100`

3. **Update Constants.java:**
   ```java
   public static final String BASE_URL = "http://192.168.1.100/website/api/";
   ```

4. **Allow Windows Firewall:**
   - Windows Defender Firewall → Advanced Settings
   - Inbound Rules → New Rule
   - Port → TCP → 80
   - Allow the connection
   
   OR temporarily disable firewall for testing

5. **Test from phone browser:**
   Open Chrome on phone:
   ```
   http://192.168.1.100/website/api/get_products.php
   ```
   Should see JSON response

## 📊 PHP API → Android Mapping

| Feature | PHP API Endpoint | Android Component |
|---------|-----------------|-------------------|
| Login | `api/login.php` | `LoginActivity` |
| Signup | `api/signup.php` | `SignupActivity` |
| Product List | `api/get_products.php` | `ProductsFragment` + `ProductsAdapter` |
| Product Details | `api/get_product.php` | `ProductDetailsActivity` |
| View Cart | `api/get_cart.php` | `CartFragment` + `CartAdapter` |
| Add to Cart | `api/add_to_cart.php` | `ProductDetailsActivity` |
| Update Cart Qty | `api/update_cart.php` | `CartFragment` |
| Remove from Cart | `api/remove_from_cart.php` | `CartFragment` |
| Checkout | `api/checkout.php` | `CheckoutActivity` |
| View Orders | `api/get_orders.php` | `ProfileFragment` (Orders section) |
| Order Details | `api/get_order_details.php` | `OrderDetailsActivity` |
| Wishlist | `api/get_wishlist.php` | `WishlistFragment` (optional) |

## 🔧 Troubleshooting

### Problem: "Connection failed" in Android app

**Solutions:**
1. Verify XAMPP Apache is running (green in control panel)
2. Test API in browser first: `http://localhost/website/api/get_products.php`
3. Check BASE_URL in Constants.java matches your setup
4. For emulator: Use `10.0.2.2`
5. For phone: Use your computer's actual IP (not localhost!)

### Problem: "404 Not Found" for API endpoints

**Solutions:**
1. Verify API folder exists: `C:\xampp\htdocs\website\api\`
2. Check file names match exactly (case-sensitive on some servers)
3. Test in browser: `http://localhost/website/api/login.php`
4. Clear browser cache

### Problem: "Database connection failed"

**Solutions:**
1. Check MySQL is running in XAMPP
2. Verify database name is `project` (lowercase)
3. Check `website/include/connect.php` credentials:
   ```php
   mysqli_connect('localhost', 'root', '', 'project')
   ```
4. Test in phpMyAdmin that database exists

### Problem: "Can't reach from phone"

**Solutions:**
1. Phone and computer must be on **same WiFi network**
2. Verify computer IP: `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
3. Test in phone browser: `http://YOUR_IP/website/api/get_products.php`
4. Check Windows Firewall allows port 80
5. Some routers block device-to-device communication (AP Isolation) - disable it

### Problem: Images not loading

**Solutions:**
1. Verify images exist in: `C:\xampp\htdocs\website\product_images\`
2. Check PRODUCT_IMAGES_URL in Constants.java
3. Check image names match database (case-sensitive)
4. Use Glide library (already included in build.gradle)

### Problem: SQL Error with order-details

**Solutions:**
1. Always use backticks in SQL:
   ```sql
   SELECT * FROM `order-details` WHERE ...
   ```
2. All API endpoints already handle this correctly
3. If editing SQL manually, remember the backticks!

## 🧪 Testing the App

### Test User Accounts (from SQL dump):

| Username | Password | Role |
|----------|----------|------|
| admin_leb | admin123 | Admin |
| fatima | 12345678 | User |
| ibrahim | 12345678 | User |
| layla_a | 987654321 | User |

### Test Flow:

1. **Login**
   - Open app
   - Go to Profile tab
   - Login with: `admin_leb` / `admin123`

2. **Browse Products**
   - Go to Products tab
   - See list of products from database
   - Try search and category filter

3. **Add to Cart**
   - Tap on a product
   - View details
   - Select quantity
   - Add to Cart

4. **View Cart**
   - Go to Cart tab
   - See cart items
   - Update quantities
   - Remove items

5. **Checkout**
   - In Cart, tap Checkout
   - Fill delivery details
   - Place order

6. **View Orders**
   - Go to Profile tab
   - See your orders
   - Tap on order to see details

## 📱 App Features

### Implemented Features:
- ✅ User authentication (Login/Signup)
- ✅ Product browsing with categories
- ✅ Product search
- ✅ Product details view
- ✅ Shopping cart management
- ✅ Checkout process
- ✅ Order history
- ✅ Order details view
- ✅ Session management
- ✅ Material Design UI
- ✅ Bottom Navigation
- ✅ RecyclerView with adapters
- ✅ Image loading (Glide)
- ✅ Error handling
- ✅ Loading states

### Optional Features (can be added):
- Wishlist functionality (API ready)
- Product reviews (API ready)
- User profile editing
- Password change
- Order tracking
- Push notifications

## 🎨 Customization

### Change App Name:
Edit: `app/src/main/res/values/strings.xml`
```xml
<string name="app_name">Your Shop Name</string>
```

### Change Colors:
Edit: `app/src/main/res/values/colors.xml`
```xml
<color name="colorPrimary">#YOUR_COLOR</color>
<color name="colorPrimaryDark">#YOUR_COLOR</color>
<color name="colorAccent">#YOUR_COLOR</color>
```

### Change App Icon:
Replace: `app/src/main/res/mipmap-*/ic_launcher.png`

## 📝 Important Notes

1. **Security Warning**: This is a college project. In production:
   - Hash passwords (use `password_hash()` in PHP)
   - Use HTTPS not HTTP
   - Implement proper authentication tokens
   - Validate all inputs
   - Use prepared statements (already done!)

2. **XAMPP is for local development only**
   - Not suitable for production deployment
   - For real deployment, use proper web hosting

3. **The `order-details` table**
   - Always use backticks in SQL: `` `order-details` ``
   - Hyphens in table names require special handling
   - All API endpoints already handle this correctly

4. **Image Loading**
   - Images load from: `http://YOUR_IP/website/product_images/IMAGE_NAME`
   - Make sure images exist in product_images folder
   - Glide library handles loading and caching

## 🆘 Getting Help

If you encounter issues:

1. Check logcat in Android Studio for errors
2. Test API endpoints in browser first
3. Verify database has data
4. Check network connectivity
5. Ensure XAMPP services are running

## 📚 Technologies Used

**Backend:**
- PHP 7.4+
- MySQL/MariaDB
- XAMPP

**Android:**
- Java
- Android SDK 24+ (Android 7.0+)
- Material Components
- Volley (Networking)
- Glide (Image Loading)
- RecyclerView
- Fragments
- BottomNavigationView

## ✅ Checklist Before Running

- [ ] XAMPP Apache & MySQL running
- [ ] Database `project` imported successfully
- [ ] API folder exists in `htdocs/website/api/`
- [ ] Tested API endpoint in browser (shows JSON)
- [ ] BASE_URL configured in Constants.java
- [ ] Android emulator/device connected
- [ ] Gradle sync completed successfully
- [ ] For phone: Computer IP address correct in Constants.java
- [ ] For phone: Firewall allows port 80

## 📄 License

This is a college project for educational purposes.

---

**Developed by:** [Your Name]  
**Course:** [Your Course]  
**Year:** 2025

**Original PHP Project:** computerlogs E-Commerce Store  
**Android Conversion:** Complete mobile app with REST API
