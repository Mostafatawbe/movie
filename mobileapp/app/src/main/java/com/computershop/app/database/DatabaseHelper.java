package com.computershop.app.database;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;

import com.computershop.app.models.CartItem;
import com.computershop.app.models.Order;
import com.computershop.app.models.OrderItem;
import com.computershop.app.models.Product;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Locale;

public class DatabaseHelper extends SQLiteOpenHelper {

    private static final String DATABASE_NAME = "computer_shop.db";
    private static final int DATABASE_VERSION = 5;

    // Tables
    private static final String TABLE_USERS = "users";
    private static final String TABLE_PRODUCTS = "products";
    private static final String TABLE_CART = "cart";
    private static final String TABLE_WISHLIST = "wishlist";
    private static final String TABLE_ORDERS = "orders";
    private static final String TABLE_ORDER_ITEMS = "order_items";

    public DatabaseHelper(Context context) {
        super(context, DATABASE_NAME, null, DATABASE_VERSION);
    }

    @Override
    public void onCreate(SQLiteDatabase db) {
        // Users table
        db.execSQL("CREATE TABLE " + TABLE_USERS + " (" +
                "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
                "username TEXT UNIQUE, " +
                "password TEXT, " +
                "first_name TEXT, " +
                "last_name TEXT, " +
                "email TEXT, " +
                "phone TEXT, " +
                "dob TEXT, " +
                "gender TEXT, " +
                "is_admin INTEGER DEFAULT 0)");

        // Products table
        db.execSQL("CREATE TABLE " + TABLE_PRODUCTS + " (" +
                "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
                "name TEXT, " +
                "category TEXT, " +
                "description TEXT, " +
                "price REAL, " +
                "stock INTEGER, " +
                "image TEXT, " +
                "brand TEXT)");

        // Cart table
        db.execSQL("CREATE TABLE " + TABLE_CART + " (" +
                "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
                "user_id INTEGER, " +
                "product_id INTEGER, " +
                "quantity INTEGER)");

        // Wishlist table
        db.execSQL("CREATE TABLE " + TABLE_WISHLIST + " (" +
                "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
                "user_id INTEGER, " +
                "product_id INTEGER)"); 

        // Orders table
        db.execSQL("CREATE TABLE " + TABLE_ORDERS + " (" +
                "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
                "user_id INTEGER, " +
                "order_date TEXT, " +
                "delivery_date TEXT, " +
                "address TEXT, " +
                "city TEXT, " +
                "country TEXT, " +
                "total REAL, " +
                "status TEXT)");

        // Order items table
        db.execSQL("CREATE TABLE " + TABLE_ORDER_ITEMS + " (" +
                "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
                "order_id INTEGER, " +
                "product_id INTEGER, " +
                "quantity INTEGER, " +
                "price REAL)");

        // Insert sample data
        insertSampleData(db);
    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        // Drop older tables if existed
        db.execSQL("DROP TABLE IF EXISTS " + TABLE_USERS);
        db.execSQL("DROP TABLE IF EXISTS " + TABLE_PRODUCTS);
        db.execSQL("DROP TABLE IF EXISTS " + TABLE_CART);
        db.execSQL("DROP TABLE IF EXISTS " + TABLE_WISHLIST);
        db.execSQL("DROP TABLE IF EXISTS " + TABLE_ORDERS);
        db.execSQL("DROP TABLE IF EXISTS " + TABLE_ORDER_ITEMS);

        // Create tables again
        onCreate(db);
    }
    
    private void insertSampleData(SQLiteDatabase db) {
        // Sample users - admin_leb is admin, fatima is regular user
        insertAdminUser(db, "admin_leb", "admin123", "Admin", "User", "admin@shop.com", "1234567890", "1990-01-01", "Male");
        insertUser(db, "fatima", "12345678", "Fatima", "Khan", "fatima@email.com", "9876543210", "1995-05-15", "Female");

        // Sample products
        // Batch 1
        insertProduct(db, "Sample Keyboard 1", "keyboard", "A basic keyboard product", 50, 10, "kb_sample1.jpg", "Generic");
        insertProduct(db, "Sample RAM 1", "ram", "Sample RAM module", 80, 5, "ram_sample1.jpg", "Generic");
        insertProduct(db, "Sample GPU 1", "gpu", "Sample graphics card", 300, 3, "gpu_sample1.jpg", "Generic");
        insertProduct(db, "Sample Mouse 1", "mouse", "Sample mouse product", 30, 20, "mouse_sample1.jpg", "Generic");
        insertProduct(db, "Intel Core i5-12400F", "cpu", "6-core Alder Lake processor.", 240, 12, "cpu1.jpg", "Intel");
        insertProduct(db, "Intel Core i7-12700K", "cpu", "12-core high-performance CPU.", 410, 8, "cpu2.jpg", "Intel");
        insertProduct(db, "AMD Ryzen 5 5600", "cpu", "Strong gaming CPU with 6 cores.", 180, 15, "cpu3.jpg", "AMD");
        insertProduct(db, "AMD Ryzen 9 5900X", "cpu", "12-core monster performance.", 520, 5, "cpu4.jpg", "AMD");
        insertProduct(db, "Intel Core i3-12100F", "cpu", "Great budget CPU.", 120, 20, "cpu5.jpg", "Intel");
        insertProduct(db, "AMD Ryzen 7 5800X", "cpu", "Top performance for gaming.", 330, 9, "cpu6.jpg", "AMD");
        insertProduct(db, "Intel Core i9-11900K", "cpu", "High-end Intel 8-core CPU.", 480, 6, "cpu7.jpg", "Intel");

        // Batch 2
        insertProduct(db, "RTX 3060 12GB", "gpu", "Great 1080p & 1440p GPU.", 290, 10, "gpu1.jpg", "Nvidia");
        insertProduct(db, "RTX 4070 12GB", "gpu", "Latest gen mid-high GPU.", 530, 7, "gpu2.jpg", "Nvidia");
        insertProduct(db, "GTX 1650 Super", "gpu", "Excellent budget GPU.", 180, 12, "gpu3.jpg", "Nvidia");
        insertProduct(db, "RX 6600 8GB", "gpu", "Great value AMD GPU.", 240, 14, "gpu4.jpg", "AMD");
        insertProduct(db, "RX 6700 XT 12GB", "gpu", "1440p beast.", 390, 5, "gpu5.jpg", "AMD");
        insertProduct(db, "RTX 4090 24GB", "gpu", "Best GPU in the world.", 1600, 2, "gpu6.jpg", "Nvidia");
        insertProduct(db, "RTX 3050 8GB", "gpu", "Entry-level RTX GPU.", 230, 16, "gpu7.jpg", "Nvidia");

        // Batch 3
        insertProduct(db, "Corsair Vengeance 16GB DDR4", "ram", "High-speed gaming RAM.", 75, 20, "ram1.jpg", "Corsair");
        insertProduct(db, "Kingston Fury 16GB DDR5", "ram", "Next-gen DDR5 memory.", 110, 10, "ram2.jpg", "Kingston");
        insertProduct(db, "G.Skill Trident Z 32GB", "ram", "Premium RGB RAM.", 150, 12, "ram3.jpg", "G.Skill");
        insertProduct(db, "Patriot Viper 8GB", "ram", "Reliable budget RAM.", 35, 30, "ram4.jpg", "Patriot");
        insertProduct(db, "TeamGroup T-Force 16GB", "ram", "High-performance RAM.", 70, 15, "ram5.jpg", "T-Force");
        insertProduct(db, "ADATA XPG Spectrix 16GB", "ram", "RGB gaming RAM.", 80, 18, "ram7.jpg", "ADATA");
        insertProduct(db, "Crucial 32GB DDR4", "ram", "Great for productivity.", 140, 7, "ram6.jpg", "Crucial");

        // Batch 4
        insertProduct(db, "Logitech G502 Hero", "mouse", "Top gaming sensor.", 70, 20, "mouse1.jpg", "Logitech");
        insertProduct(db, "Razer Viper Mini", "mouse", "Ultralight gaming mouse.", 50, 15, "mouse2.jpg", "Razer");
        insertProduct(db, "SteelSeries Rival 3", "mouse", "High-accuracy mouse.", 45, 25, "mouse3.jpg", "SteelSeries");
        insertProduct(db, "Logitech G304 Wireless", "mouse", "Lightweight wireless.", 55, 18, "mouse4.jpg", "Logitech");
        insertProduct(db, "Redragon M711 Cobra", "mouse", "RGB gaming mouse.", 35, 30, "mouse5.jpg", "Redragon");
        insertProduct(db, "HyperX Pulsefire", "mouse", "Precise and durable.", 60, 14, "mouse6.jpg", "HyperX");
        insertProduct(db, "Alienware AW610M", "mouse", "Premium gaming mouse.", 85, 9, "mouse7.jpg", "Alienware");

        // Batch 5
        insertProduct(db, "Logitech G Pro Keyboard", "keyboard", "Esports mechanical keyboard.", 110, 10, "kb1.jpg", "Logitech");
        insertProduct(db, "Razer Huntsman Mini", "keyboard", "Optical gaming keyboard.", 130, 8, "kb2.jpg", "Razer");
        insertProduct(db, "Redragon K552 Kumara", "keyboard", "Budget mechanical keyboard.", 45, 20, "kb3.jpg", "Redragon");
        insertProduct(db, "Corsair K70 RGB", "keyboard", "Premium RGB keyboard.", 160, 6, "kb4.jpg", "Corsair");
        insertProduct(db, "HyperX Alloy FPS", "keyboard", "Durable gaming keyboard.", 90, 12, "kb5.jpg", "HyperX");
        insertProduct(db, "SteelSeries Apex 3", "keyboard", "Water-resistant keyboard.", 60, 15, "kb6.jpg", "SteelSeries");
        insertProduct(db, "Asus ROG Strix Scope", "keyboard", "High-end gaming keyboard.", 150, 5, "kb7.jpg", "Asus");

        // Batch 6
        insertProduct(db, "Gigabyte B550 Aorus Elite", "motherboard", "Great AM4 motherboard.", 160, 9, "mb1.jpg", "Gigabyte");
        insertProduct(db, "MSI B450 Tomahawk", "motherboard", "Best budget AM4 board.", 120, 14, "mb2.jpg", "MSI");
        insertProduct(db, "Asus Prime Z590-P", "motherboard", "Intel 11th-gen board.", 180, 8, "mb3.jpg", "Asus");
        insertProduct(db, "ASRock B660M Pro RS", "motherboard", "Great mid-range LGA1700.", 140, 12, "mb4.jpg", "ASRock");
        insertProduct(db, "Asus TUF X570-Plus", "motherboard", "High-end AM4 board.", 200, 6, "mb5.jpg", "Asus");
        insertProduct(db, "Gigabyte Z690 UD", "motherboard", "Intel DDR5 motherboard.", 220, 7, "mb6.jpg", "Gigabyte");
        insertProduct(db, "MSI MAG B760 Tomahawk", "motherboard", "Great LGA1700 board.", 250, 5, "mb7.jpg", "MSI");

        // Batch 7
        insertProduct(db, "Acer Nitro VG240Y 24\" 144Hz", "monitor", "24-inch IPS gaming monitor with 144Hz refresh rate.", 180, 10, "monitor1.jpg", "Acer");
        insertProduct(db, "Samsung Odyssey G3 27\" 165Hz", "monitor", "27-inch gaming monitor with ultra-fast 165Hz refresh rate.", 230, 8, "monitor2.jpg", "Samsung");
        insertProduct(db, "LG Ultragear 24GN600 144Hz", "monitor", "144Hz 1ms response time IPS gaming monitor.", 200, 12, "monitor3.jpg", "LG");
        insertProduct(db, "ASUS TUF Gaming VG249Q 165Hz", "monitor", "Ultra-smooth 165Hz IPS panel designed for gamers.", 220, 7, "monitor4.jpg", "Asus");
        insertProduct(db, "Dell S2421HGF 24\" 144Hz", "monitor", "Fast curved gaming monitor with 144Hz refresh rate.", 190, 15, "monitor5.jpg", "Dell");
        insertProduct(db, "MSI Optix G241 144Hz", "monitor", "Wide color gamut IPS 144Hz gaming monitor.", 210, 9, "monitor6.jpg", "MSI");
        insertProduct(db, "AOC C24G1A 24\" 165Hz Curved", "monitor", "165Hz curved gaming monitor with immersive design.", 220, 6, "monitor7.jpg", "AOC");

        // Batch 8
        insertProduct(db, "HyperX Cloud II", "headset", "Comfortable gaming headset with 7.1 surround sound.", 99, 15, "headset1.jpeg", "HyperX");
        insertProduct(db, "SteelSeries Arctis 7", "headset", "Wireless lossless audio and 24-hour battery life.", 149, 10, "headset2.jpeg", "SteelSeries");
        insertProduct(db, "Razer BlackShark V2", "headset", "Lightweight esports headset with Triforce Titanium drivers.", 99, 12, "headset3.jpeg", "Razer");
        insertProduct(db, "Corsair HS60 Pro", "headset", "High-quality stereo sound and a detachable microphone.", 69, 20, "headset4.jpeg", "Corsair");
        insertProduct(db, "Logitech G Pro X", "headset", "Pro-grade headset with Blue VO!CE microphone technology.", 129, 8, "headset5.jpeg", "Logitech");
        insertProduct(db, "Sennheiser GSP 600", "headset", "Exceptional audio clarity and ergonomic design.", 199, 5, "headset6.jpeg", "Sennheiser");

        // Batch 9
        insertProduct(db, "Secretlab Titan Evo 2022", "gaming chair", "The ultimate gaming chair with premium materials.", 499, 10, "chair1.jpeg", "Secretlab");
        insertProduct(db, "Herman Miller X Logitech G Embody", "gaming chair", "The perfect blend of ergonomics and gaming performance.", 1495, 3, "chair2.jpeg", "Herman Miller");
        insertProduct(db, "Razer Iskur", "gaming chair", "Ergonomic gaming chair with a built-in lumbar support system.", 499, 8, "chair3.jpeg", "Razer");
        insertProduct(db, "DXRacer Formula Series", "gaming chair", "The original high-quality gaming chair.", 329, 15, "chair4.jpeg", "DXRacer");
        insertProduct(db, "AKRacing Core Series EX", "gaming chair", "Breathable fabric and a wide frame for comfort.", 349, 12, "chair5.jpeg", "AKRacing");
        insertProduct(db, "Noblechairs Hero", "gaming chair", "Premium materials and a sophisticated design.", 439, 7, "chair6.jpeg", "Noblechairs");

        // Batch 10
        insertProduct(db, "SteelSeries QcK+", "mouse pad", "Large cloth mouse pad for maximum control.", 15, 30, "mousepad1.jpeg", "SteelSeries");
        insertProduct(db, "Logitech G440", "mouse pad", "Hard polymer surface for high-DPI gaming.", 25, 20, "mousepad2.jpeg", "Logitech");
        insertProduct(db, "Razer Goliathus Chroma", "mouse pad", "Soft gaming mouse mat with Razer Chroma RGB.", 40, 15, "mousepad3.jpeg", "Razer");
        insertProduct(db, "Corsair MM300", "mouse pad", "Anti-fray cloth mouse pad with a high-performance weave.", 20, 25, "mousepad4.jpeg", "Corsair");
        insertProduct(db, "HyperX Fury S Pro", "mouse pad", "Densely woven surface for accurate optical tracking.", 20, 28, "mousepad5.jpeg", "HyperX");
        insertProduct(db, "Zowie G-SR", "mouse pad", "The perfect mouse pad for control and stability.", 30, 18, "mousepad6.jpeg", "Zowie");

        // Batch 11
        insertProduct(db, "Secretlab Magnus", "table", "A metal desk with a magnetic ecosystem of accessories.", 449, 10, "table1.jpeg", "Secretlab");
        insertProduct(db, "Arozzi Arena", "table", "The ultimate gaming desk with a full-surface mouse pad.", 399, 8, "table2.jpeg", "Arozzi");
        insertProduct(db, "FlexiSpot Height Adjustable Gaming Desk", "table", "An electric height-adjustable desk for gaming.", 499, 5, "table3.jpeg", "FlexiSpot");
        insertProduct(db, "Thermaltake Level 20 Battlestation", "table", "An RGB gaming desk with a durable construction.", 1199, 3, "table4.jpeg", "Thermaltake");
        insertProduct(db, "Cougar Mars", "table", "A spacious gaming desk with RGB lighting.", 379, 7, "table5.jpeg", "Cougar");
        insertProduct(db, "Eureka Ergonomic Z1-S", "table", "A Z-shaped gaming desk with a sleek design.", 219, 12, "table6.jpeg", "Eureka Ergonomic");
    }

    private void insertUser(SQLiteDatabase db, String username, String password, String firstName, 
                           String lastName, String email, String phone, String dob, String gender) {
        ContentValues values = new ContentValues();
        values.put("username", username);
        values.put("password", password);
        values.put("first_name", firstName);
        values.put("last_name", lastName);
        values.put("email", email);
        values.put("phone", phone);
        values.put("dob", dob);
        values.put("gender", gender);
        values.put("is_admin", 0);
        db.insert(TABLE_USERS, null, values);
    }

    private void insertAdminUser(SQLiteDatabase db, String username, String password, String firstName,
                                 String lastName, String email, String phone, String dob, String gender) {
        ContentValues values = new ContentValues();
        values.put("username", username);
        values.put("password", password);
        values.put("first_name", firstName);
        values.put("last_name", lastName);
        values.put("email", email);
        values.put("phone", phone);
        values.put("dob", dob);
        values.put("gender", gender);
        values.put("is_admin", 1);
        db.insert(TABLE_USERS, null, values);
    }

    private void insertProduct(SQLiteDatabase db, String name, String category, String description,
                               double price, int stock, String image, String brand) {
        ContentValues values = new ContentValues();
        values.put("name", name);
        values.put("category", category);
        values.put("description", description);
        values.put("price", price);
        values.put("stock", stock);
        values.put("image", image);
        values.put("brand", brand);
        db.insert(TABLE_PRODUCTS, null, values);
    }

    // User methods
    public int loginUser(String username, String password) {
        SQLiteDatabase db = this.getReadableDatabase();
        Cursor cursor = db.query(TABLE_USERS, new String[]{"id"}, 
                "username=? AND password=?", new String[]{username, password}, 
                null, null, null);
        
        int userId = -1;
        if (cursor.moveToFirst()) {
            userId = cursor.getInt(0);
        }
        cursor.close();
        return userId;
    }

    public Cursor getUserById(int userId) {
        SQLiteDatabase db = this.getReadableDatabase();
        return db.query(TABLE_USERS, null, "id=?", new String[]{String.valueOf(userId)}, 
                null, null, null);
    }

    public boolean registerUser(String username, String password, String firstName, String lastName,
                                String email, String phone, String dob, String gender) {
        SQLiteDatabase db = this.getWritableDatabase();
        ContentValues values = new ContentValues();
        values.put("username", username);
        values.put("password", password);
        values.put("first_name", firstName);
        values.put("last_name", lastName);
        values.put("email", email);
        values.put("phone", phone);
        values.put("dob", dob);
        values.put("gender", gender);
        
        long result = db.insert(TABLE_USERS, null, values);
        return result != -1;
    }

    // Product methods

    /**
     * Returns any (first) product id for a given category.
     *
     * This is useful for simple navigation from category tiles to a product details page.
     * Categories in this app are stored in lowercase (e.g., "cpu", "gpu", "gaming chair").
     */
    public Integer getFirstProductIdByCategory(String category) {
        if (category == null || category.trim().isEmpty()) return null;

        SQLiteDatabase db = this.getReadableDatabase();
        Integer id = null;
        Cursor cursor = null;
        try {
            cursor = db.query(
                    TABLE_PRODUCTS,
                    new String[]{"id"},
                    "category LIKE ?",
                    new String[]{category.trim()},
                    null,
                    null,
                    "id ASC",
                    "1"
            );
            if (cursor.moveToFirst()) {
                id = cursor.getInt(cursor.getColumnIndexOrThrow("id"));
            }
        } finally {
            if (cursor != null) cursor.close();
        }
        return id;
    }
    public List<Product> getAllProducts(String category, String search) {
        List<Product> products = new ArrayList<>();
        SQLiteDatabase db = this.getReadableDatabase();
        
        String selection = null;
        String[] selectionArgs = null;
        
        if (category != null && !category.equals("all") && !category.isEmpty()) {
            if (search != null && !search.isEmpty()) {
                selection = "category LIKE ? AND (name LIKE ? OR brand LIKE ?)";
                selectionArgs = new String[]{category, "%" + search + "%", "%" + search + "%"};
            } else {
                selection = "category LIKE ?";
                selectionArgs = new String[]{category};
            }
        } else if (search != null && !search.isEmpty()) {
            selection = "name LIKE ? OR brand LIKE ?";
            selectionArgs = new String[]{"%" + search + "%", "%" + search + "%"};
        }
        
        Cursor cursor = db.query(TABLE_PRODUCTS, null, selection, selectionArgs, null, null, "name ASC");
        
        if (cursor.moveToFirst()) {
            do {
                Product product = new Product();
                product.setId(cursor.getInt(cursor.getColumnIndexOrThrow("id")));
                product.setName(cursor.getString(cursor.getColumnIndexOrThrow("name")));
                product.setCategory(cursor.getString(cursor.getColumnIndexOrThrow("category")));
                product.setDescription(cursor.getString(cursor.getColumnIndexOrThrow("description")));
                product.setPrice((int) cursor.getDouble(cursor.getColumnIndexOrThrow("price")));
                product.setStock(cursor.getInt(cursor.getColumnIndexOrThrow("stock")));
                product.setImage(cursor.getString(cursor.getColumnIndexOrThrow("image")));
                product.setBrand(cursor.getString(cursor.getColumnIndexOrThrow("brand")));
                products.add(product);
            } while (cursor.moveToNext());
        }
        cursor.close();
        return products;
    }

    public Product getProductById(int productId) {
        SQLiteDatabase db = this.getReadableDatabase();
        Cursor cursor = db.query(TABLE_PRODUCTS, null, "id=?", 
                new String[]{String.valueOf(productId)}, null, null, null);
        
        Product product = null;
        if (cursor.moveToFirst()) {
            product = new Product();
            product.setId(cursor.getInt(cursor.getColumnIndexOrThrow("id")));
            product.setName(cursor.getString(cursor.getColumnIndexOrThrow("name")));
            product.setCategory(cursor.getString(cursor.getColumnIndexOrThrow("category")));
            product.setDescription(cursor.getString(cursor.getColumnIndexOrThrow("description")));
            product.setPrice((int) cursor.getDouble(cursor.getColumnIndexOrThrow("price")));
            product.setStock(cursor.getInt(cursor.getColumnIndexOrThrow("stock")));
            product.setImage(cursor.getString(cursor.getColumnIndexOrThrow("image")));
            product.setBrand(cursor.getString(cursor.getColumnIndexOrThrow("brand")));
        }
        cursor.close();
        return product;
    }

    // Cart methods
    public boolean addToCart(int userId, int productId, int quantity) {
        SQLiteDatabase db = this.getWritableDatabase();
        
        // Get available stock for the product
        Cursor stockCursor = db.query(TABLE_PRODUCTS, new String[]{"stock"}, 
                "id=?", new String[]{String.valueOf(productId)}, null, null, null);
        int availableStock = 0;
        if (stockCursor.moveToFirst()) {
            availableStock = stockCursor.getInt(0);
        }
        stockCursor.close();
        
        // Check if item already exists in cart
        Cursor cursor = db.query(TABLE_CART, new String[]{"id", "quantity"}, 
                "user_id=? AND product_id=?", 
                new String[]{String.valueOf(userId), String.valueOf(productId)}, 
                null, null, null);
        
        if (cursor.moveToFirst()) {
            // Update quantity - validate against stock
            int existingQty = cursor.getInt(cursor.getColumnIndexOrThrow("quantity"));
            int cartId = cursor.getInt(cursor.getColumnIndexOrThrow("id"));
            cursor.close();
            
            int newTotalQty = existingQty + quantity;
            if (newTotalQty > availableStock) {
                return false; // Cannot add more than available stock
            }
            
            ContentValues values = new ContentValues();
            values.put("quantity", newTotalQty);
            db.update(TABLE_CART, values, "id=?", new String[]{String.valueOf(cartId)});
            return true;
        } else {
            cursor.close();
            
            // Validate new quantity against stock
            if (quantity > availableStock) {
                return false; // Cannot add more than available stock
            }
            
            ContentValues values = new ContentValues();
            values.put("user_id", userId);
            values.put("product_id", productId);
            values.put("quantity", quantity);
            long result = db.insert(TABLE_CART, null, values);
            return result != -1;
        }
    }

    public List<CartItem> getCartItems(int userId) {
        List<CartItem> cartItems = new ArrayList<>();
        SQLiteDatabase db = this.getReadableDatabase();
        
        String query = "SELECT c.id, c.product_id, c.quantity, p.name, p.price, p.image, p.brand, p.stock " +
                "FROM " + TABLE_CART + " c " +
                "INNER JOIN " + TABLE_PRODUCTS + " p ON c.product_id = p.id " +
                "WHERE c.user_id = ?";
        
        Cursor cursor = db.rawQuery(query, new String[]{String.valueOf(userId)});
        
        if (cursor.moveToFirst()) {
            do {
                CartItem item = new CartItem();
                item.setProductId(cursor.getInt(cursor.getColumnIndexOrThrow("product_id")));
                item.setProductName(cursor.getString(cursor.getColumnIndexOrThrow("name")));
                item.setPrice((int) cursor.getDouble(cursor.getColumnIndexOrThrow("price")));
                item.setQuantity(cursor.getInt(cursor.getColumnIndexOrThrow("quantity")));
                item.setImage(cursor.getString(cursor.getColumnIndexOrThrow("image")));
                item.setBrand(cursor.getString(cursor.getColumnIndexOrThrow("brand")));
                item.setStock(cursor.getInt(cursor.getColumnIndexOrThrow("stock")));
                item.setSubtotal(item.getPrice() * item.getQuantity());
                cartItems.add(item);
            } while (cursor.moveToNext());
        }
        cursor.close();
        return cartItems;
    }

    public boolean updateCartQuantity(int userId, int productId, int quantity) {
        SQLiteDatabase db = this.getWritableDatabase();
        ContentValues values = new ContentValues();
        values.put("quantity", quantity);
        int rows = db.update(TABLE_CART, values, "user_id=? AND product_id=?", 
                new String[]{String.valueOf(userId), String.valueOf(productId)});
        return rows > 0;
    }

    public boolean removeFromCart(int userId, int productId) {
        SQLiteDatabase db = this.getWritableDatabase();
        int rows = db.delete(TABLE_CART, "user_id=? AND product_id=?", 
                new String[]{String.valueOf(userId), String.valueOf(productId)});
        return rows > 0;
    }

    public void clearCart(int userId) {
        SQLiteDatabase db = this.getWritableDatabase();
        db.delete(TABLE_CART, "user_id=?", new String[]{String.valueOf(userId)});
    }

    // Wishlist methods
    public boolean addToWishlist(int userId, int productId) {
        SQLiteDatabase db = this.getWritableDatabase();
        
        // Check if item already exists in wishlist
        Cursor cursor = db.query(TABLE_WISHLIST, new String[]{"id"}, 
                "user_id=? AND product_id=?", 
                new String[]{String.valueOf(userId), String.valueOf(productId)}, 
                null, null, null);
        
        if (cursor.moveToFirst()) {
            cursor.close();
            return false; // Already in wishlist
        }
        cursor.close();
        
        ContentValues values = new ContentValues();
        values.put("user_id", userId);
        values.put("product_id", productId);
        long result = db.insert(TABLE_WISHLIST, null, values);
        return result != -1;
    }

    public boolean removeFromWishlist(int userId, int productId) {
        SQLiteDatabase db = this.getWritableDatabase();
        int rows = db.delete(TABLE_WISHLIST, "user_id=? AND product_id=?", 
                new String[]{String.valueOf(userId), String.valueOf(productId)});
        return rows > 0;
    }

    public boolean isInWishlist(int userId, int productId) {
        SQLiteDatabase db = this.getReadableDatabase();
        Cursor cursor = db.query(TABLE_WISHLIST, new String[]{"id"}, 
                "user_id=? AND product_id=?", 
                new String[]{String.valueOf(userId), String.valueOf(productId)}, 
                null, null, null);
        
        boolean exists = cursor.moveToFirst();
        cursor.close();
        return exists;
    }

    public List<Product> getWishlistItems(int userId) {
        List<Product> products = new ArrayList<>();
        SQLiteDatabase db = this.getReadableDatabase();
        
        String query = "SELECT p.* FROM " + TABLE_PRODUCTS + " p " +
                "INNER JOIN " + TABLE_WISHLIST + " w ON p.id = w.product_id " +
                "WHERE w.user_id = ?";
        
        Cursor cursor = db.rawQuery(query, new String[]{String.valueOf(userId)});
        
        if (cursor.moveToFirst()) {
            do {
                Product product = new Product();
                product.setId(cursor.getInt(cursor.getColumnIndexOrThrow("id")));
                product.setName(cursor.getString(cursor.getColumnIndexOrThrow("name")));
                product.setCategory(cursor.getString(cursor.getColumnIndexOrThrow("category")));
                product.setDescription(cursor.getString(cursor.getColumnIndexOrThrow("description")));
                product.setPrice((int) cursor.getDouble(cursor.getColumnIndexOrThrow("price")));
                product.setStock(cursor.getInt(cursor.getColumnIndexOrThrow("stock")));
                product.setImage(cursor.getString(cursor.getColumnIndexOrThrow("image")));
                product.setBrand(cursor.getString(cursor.getColumnIndexOrThrow("brand")));
                products.add(product);
            } while (cursor.moveToNext());
        }
        cursor.close();
        return products;
    }

    // Order methods
    public long createOrder(int userId, String address, String city, String country, double total) {
        SQLiteDatabase db = this.getWritableDatabase();
        
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd", Locale.getDefault());
        String orderDate = sdf.format(new Date());
        
        // Calculate delivery date (7 days from now)
        Date deliveryDateObj = new Date(System.currentTimeMillis() + 7 * 24 * 60 * 60 * 1000);
        String deliveryDate = sdf.format(deliveryDateObj);
        
        ContentValues values = new ContentValues();
        values.put("user_id", userId);
        values.put("order_date", orderDate);
        values.put("delivery_date", deliveryDate);
        values.put("address", address);
        values.put("city", city);
        values.put("country", country);
        values.put("total", total);
        values.put("status", "Processing");
        
        long orderId = db.insert(TABLE_ORDERS, null, values);
        
        if (orderId != -1) {
            // Add cart items to order items
            List<CartItem> cartItems = getCartItems(userId);
            for (CartItem item : cartItems) {
                ContentValues orderItemValues = new ContentValues();
                orderItemValues.put("order_id", orderId);
                orderItemValues.put("product_id", item.getProductId());
                orderItemValues.put("quantity", item.getQuantity());
                orderItemValues.put("price", item.getPrice());
                db.insert(TABLE_ORDER_ITEMS, null, orderItemValues);
                
                // Update product stock
                Product product = getProductById(item.getProductId());
                if (product != null) {
                    ContentValues stockUpdate = new ContentValues();
                    stockUpdate.put("stock", product.getStock() - item.getQuantity());
                    db.update(TABLE_PRODUCTS, stockUpdate, "id=?", 
                            new String[]{String.valueOf(item.getProductId())});
                }
            }
            
            // Clear cart
            clearCart(userId);
        }
        
        return orderId;
    }

    public List<Order> getUserOrders(int userId) {
        List<Order> orders = new ArrayList<>();
        SQLiteDatabase db = this.getReadableDatabase();
        
        Cursor cursor = db.query(TABLE_ORDERS, null, "user_id=?", 
                new String[]{String.valueOf(userId)}, null, null, "order_date DESC");
        
        if (cursor.moveToFirst()) {
            do {
                Order order = new Order();
                order.setOrderId(cursor.getInt(cursor.getColumnIndexOrThrow("id")));
                order.setOrderDate(cursor.getString(cursor.getColumnIndexOrThrow("order_date")));
                order.setDeliveryDate(cursor.getString(cursor.getColumnIndexOrThrow("delivery_date")));
                order.setAddress(cursor.getString(cursor.getColumnIndexOrThrow("address")));
                order.setCity(cursor.getString(cursor.getColumnIndexOrThrow("city")));
                order.setCountry(cursor.getString(cursor.getColumnIndexOrThrow("country")));
                order.setTotal((int) cursor.getDouble(cursor.getColumnIndexOrThrow("total")));
                order.setStatus(cursor.getString(cursor.getColumnIndexOrThrow("status")));
                orders.add(order);
            } while (cursor.moveToNext());
        }
        cursor.close();
        return orders;
    }

    public List<OrderItem> getOrderItems(int orderId) {
        List<OrderItem> orderItems = new ArrayList<>();
        SQLiteDatabase db = this.getReadableDatabase();
        
        String query = "SELECT oi.product_id, oi.quantity, oi.price, p.name, p.image, p.brand " +
                "FROM " + TABLE_ORDER_ITEMS + " oi " +
                "INNER JOIN " + TABLE_PRODUCTS + " p ON oi.product_id = p.id " +
                "WHERE oi.order_id = ?";
        
        Cursor cursor = db.rawQuery(query, new String[]{String.valueOf(orderId)});
        
        if (cursor.moveToFirst()) {
            do {
                OrderItem item = new OrderItem();
                item.setProductId(cursor.getInt(cursor.getColumnIndexOrThrow("product_id")));
                item.setProductName(cursor.getString(cursor.getColumnIndexOrThrow("name")));
                item.setPrice((int) cursor.getDouble(cursor.getColumnIndexOrThrow("price")));
                item.setQuantity(cursor.getInt(cursor.getColumnIndexOrThrow("quantity")));
                item.setImage(cursor.getString(cursor.getColumnIndexOrThrow("image")));
                item.setBrand(cursor.getString(cursor.getColumnIndexOrThrow("brand")));
                item.setSubtotal(item.getPrice() * item.getQuantity());
                orderItems.add(item);
            } while (cursor.moveToNext());
        }
        cursor.close();
        return orderItems;
    }

    // Admin methods
    public boolean isAdmin(int userId) {
        SQLiteDatabase db = this.getReadableDatabase();
        Cursor cursor = db.rawQuery("SELECT is_admin FROM " + TABLE_USERS + " WHERE id = ?",
                new String[]{String.valueOf(userId)});
        boolean admin = false;
        if (cursor.moveToFirst()) {
            admin = cursor.getInt(0) == 1;
        }
        cursor.close();
        return admin;
    }

    public boolean addProduct(String name, String category, String description, int price, 
                              int stock, String image, String brand) {
        SQLiteDatabase db = this.getWritableDatabase();
        ContentValues values = new ContentValues();
        values.put("name", name);
        values.put("category", category);
        values.put("description", description);
        values.put("price", price);
        values.put("stock", stock);
        values.put("image", image);
        values.put("brand", brand);
        long result = db.insert(TABLE_PRODUCTS, null, values);
        return result != -1;
    }

    public boolean updateProduct(int productId, String name, String category, String description, 
                                 int price, int stock, String image, String brand) {
        SQLiteDatabase db = this.getWritableDatabase();
        ContentValues values = new ContentValues();
        values.put("name", name);
        values.put("category", category);
        values.put("description", description);
        values.put("price", price);
        values.put("stock", stock);
        values.put("image", image);
        values.put("brand", brand);
        int rows = db.update(TABLE_PRODUCTS, values, "id = ?", 
                new String[]{String.valueOf(productId)});
        return rows > 0;
    }

    public boolean deleteProduct(int productId) {
        SQLiteDatabase db = this.getWritableDatabase();
        int rows = db.delete(TABLE_PRODUCTS, "id = ?", new String[]{String.valueOf(productId)});
        return rows > 0;
    }
}
