package com.computershop.app.utils;

public class Constants {
    
    // IMPORTANT: Change this based on your setup
    // For Android Emulator: use 10.0.2.2
    // For Real Device on same WiFi: use your computer's IP address (e.g., 192.168.1.100)
    
    // Change this to your setup:
    public static final String BASE_URL = "http://10.0.2.2/website/api/";
    
    // Alternatively for real device (update with your IP):
    // public static final String BASE_URL = "http://192.168.1.100/website/api/";
    
    // API Endpoints
    public static final String LOGIN_URL = BASE_URL + "login.php";
    public static final String SIGNUP_URL = BASE_URL + "signup.php";
    public static final String GET_PRODUCTS_URL = BASE_URL + "get_products.php";
    public static final String GET_PRODUCT_URL = BASE_URL + "get_product.php";
    public static final String ADD_TO_CART_URL = BASE_URL + "add_to_cart.php";
    public static final String GET_CART_URL = BASE_URL + "get_cart.php";
    public static final String UPDATE_CART_URL = BASE_URL + "update_cart.php";
    public static final String REMOVE_FROM_CART_URL = BASE_URL + "remove_from_cart.php";
    public static final String CHECKOUT_URL = BASE_URL + "checkout.php";
    public static final String GET_ORDERS_URL = BASE_URL + "get_orders.php";
    public static final String GET_ORDER_DETAILS_URL = BASE_URL + "get_order_details.php";
    public static final String GET_WISHLIST_URL = BASE_URL + "get_wishlist.php";
    public static final String ADD_WISHLIST_URL = BASE_URL + "add_wishlist.php";
    public static final String REMOVE_WISHLIST_URL = BASE_URL + "remove_wishlist.php";
    public static final String GET_REVIEWS_URL = BASE_URL + "get_reviews.php";
    public static final String ADD_REVIEW_URL = BASE_URL + "add_review.php";
    
    // Product images base URL
    public static final String PRODUCT_IMAGES_URL = BASE_URL.replace("/api/", "/product_images/");
    
    // SharedPreferences
    public static final String PREF_NAME = "ComputerShopPrefs";
    public static final String KEY_USER_ID = "user_id";
    public static final String KEY_USERNAME = "username";
    public static final String KEY_FIRST_NAME = "first_name";
    public static final String KEY_LAST_NAME = "last_name";
    public static final String KEY_EMAIL = "email";
    public static final String KEY_IS_LOGGED_IN = "is_logged_in";
    public static final String KEY_IS_ADMIN = "is_admin";
}
