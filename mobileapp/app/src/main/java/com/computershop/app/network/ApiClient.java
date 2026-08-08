package com.computershop.app.network;

import android.content.Context;
import android.database.Cursor;
import android.os.Handler;
import android.os.Looper;

import com.computershop.app.database.DatabaseHelper;
import com.computershop.app.models.CartItem;
import com.computershop.app.models.Order;
import com.computershop.app.models.OrderItem;
import com.computershop.app.models.Product;

import org.json.JSONArray;
import org.json.JSONObject;

import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class ApiClient {

    private Context context;
    private DatabaseHelper dbHelper;
    private ExecutorService executorService;
    private Handler mainHandler;

    public ApiClient(Context context) {
        this.context = context;
        this.dbHelper = new DatabaseHelper(context);
        this.executorService = Executors.newSingleThreadExecutor();
        this.mainHandler = new Handler(Looper.getMainLooper());
    }

    public interface ApiCallback {
        void onSuccess(JSONObject response);
        void onError(String error);
    }

    // Login (Offline)
    public void login(String username, String password, final ApiCallback callback) {
        executorService.execute(() -> {
            try {
                int userId = dbHelper.loginUser(username, password);
                
                if (userId != -1) {
                    Cursor cursor = dbHelper.getUserById(userId);
                    if (cursor.moveToFirst()) {
                        JSONObject response = new JSONObject();
                        response.put("success", true);
                        response.put("message", "Login successful");
                        
                        JSONObject userData = new JSONObject();
                        userData.put("aid", userId);
                        userData.put("username", cursor.getString(cursor.getColumnIndexOrThrow("username")));
                        userData.put("afname", cursor.getString(cursor.getColumnIndexOrThrow("first_name")));
                        userData.put("alname", cursor.getString(cursor.getColumnIndexOrThrow("last_name")));
                        userData.put("email", cursor.getString(cursor.getColumnIndexOrThrow("email")));
                        userData.put("is_admin", cursor.getInt(cursor.getColumnIndexOrThrow("is_admin")));
                        
                        response.put("data", userData);
                        cursor.close();
                        
                        mainHandler.post(() -> callback.onSuccess(response));
                    } else {
                        cursor.close();
                        mainHandler.post(() -> callback.onError("User not found"));
                    }
                } else {
                    mainHandler.post(() -> callback.onError("Invalid username or password"));
                }
            } catch (Exception e) {
                mainHandler.post(() -> callback.onError("Error: " + e.getMessage()));
            }
        });
    }

    // Signup (Offline)
    public void signup(String firstName, String lastName, String phone, String email,
                      String dob, String username, String gender,
                      String password, final ApiCallback callback) {
        executorService.execute(() -> {
            try {
                boolean success = dbHelper.registerUser(username, password, firstName, lastName,
                        email, phone, dob, gender);
                
                JSONObject response = new JSONObject();
                if (success) {
                    response.put("success", true);
                    response.put("message", "Registration successful");
                    mainHandler.post(() -> callback.onSuccess(response));
                } else {
                    response.put("success", false);
                    response.put("message", "Username already exists");
                    mainHandler.post(() -> callback.onError("Username already exists"));
                }
            } catch (Exception e) {
                mainHandler.post(() -> callback.onError("Error: " + e.getMessage()));
            }
        });
    }

    // Get products (Offline)
    public void getProducts(String category, String search, final ApiCallback callback) {
        executorService.execute(() -> {
            try {
                List<Product> products = dbHelper.getAllProducts(category, search);
                
                JSONObject response = new JSONObject();
                response.put("success", true);
                
                JSONArray dataArray = new JSONArray();
                for (Product product : products) {
                    JSONObject productObj = new JSONObject();
                    productObj.put("id", product.getId());
                    productObj.put("name", product.getName());
                    productObj.put("category", product.getCategory());
                    productObj.put("description", product.getDescription());
                    productObj.put("price", product.getPrice());
                    productObj.put("stock", product.getStock());
                    productObj.put("image", product.getImage());
                    productObj.put("brand", product.getBrand());
                    dataArray.put(productObj);
                }
                
                response.put("data", dataArray);
                mainHandler.post(() -> callback.onSuccess(response));
            } catch (Exception e) {
                mainHandler.post(() -> callback.onError("Error: " + e.getMessage()));
            }
        });
    }

    // Get single product (Offline)
    public void getProduct(int productId, final ApiCallback callback) {
        executorService.execute(() -> {
            try {
                Product product = dbHelper.getProductById(productId);
                
                if (product != null) {
                    JSONObject response = new JSONObject();
                    response.put("success", true);
                    
                    JSONObject productObj = new JSONObject();
                    productObj.put("pid", product.getId());
                    productObj.put("pname", product.getName());
                    productObj.put("category", product.getCategory());
                    productObj.put("description", product.getDescription());
                    productObj.put("price", product.getPrice());
                    productObj.put("qtyavail", product.getStock());
                    productObj.put("img", product.getImage());
                    productObj.put("brand", product.getBrand());
                    
                    response.put("data", productObj);
                    mainHandler.post(() -> callback.onSuccess(response));
                } else {
                    mainHandler.post(() -> callback.onError("Product not found"));
                }
            } catch (Exception e) {
                mainHandler.post(() -> callback.onError("Error: " + e.getMessage()));
            }
        });
    }

    // Add to cart (Offline)
    public void addToCart(int userId, int productId, int quantity, final ApiCallback callback) {
        executorService.execute(() -> {
            try {
                boolean success = dbHelper.addToCart(userId, productId, quantity);
                
                JSONObject response = new JSONObject();
                if (success) {
                    response.put("success", true);
                    response.put("message", "Added to cart");
                    mainHandler.post(() -> callback.onSuccess(response));
                } else {
                    response.put("success", false);
                    response.put("message", "Cannot add more items than available stock");
                    mainHandler.post(() -> callback.onError("Not enough stock available. Check your cart for existing items."));
                }
            } catch (Exception e) {
                mainHandler.post(() -> callback.onError("Error: " + e.getMessage()));
            }
        });
    }

    // Get cart (Offline)
    public void getCart(int userId, final ApiCallback callback) {
        executorService.execute(() -> {
            try {
                List<CartItem> cartItems = dbHelper.getCartItems(userId);
                
                JSONObject response = new JSONObject();
                response.put("success", true);
                
                JSONArray itemsArray = new JSONArray();
                int total = 0;
                
                for (CartItem item : cartItems) {
                    JSONObject itemObj = new JSONObject();
                    itemObj.put("product_id", item.getProductId());
                    itemObj.put("product_name", item.getProductName());
                    itemObj.put("price", item.getPrice());
                    itemObj.put("quantity", item.getQuantity());
                    itemObj.put("subtotal", item.getSubtotal());
                    itemObj.put("image", item.getImage());
                    itemObj.put("brand", item.getBrand());
                    itemObj.put("stock", item.getStock());
                    itemsArray.put(itemObj);
                    total += item.getSubtotal();
                }
                
                JSONObject dataObj = new JSONObject();
                dataObj.put("items", itemsArray);
                dataObj.put("total", total);
                response.put("data", dataObj);
                mainHandler.post(() -> callback.onSuccess(response));
            } catch (Exception e) {
                mainHandler.post(() -> callback.onError("Error: " + e.getMessage()));
            }
        });
    }

    // Update cart (Offline)
    public void updateCart(int userId, int productId, int quantity, final ApiCallback callback) {
        executorService.execute(() -> {
            try {
                boolean success = dbHelper.updateCartQuantity(userId, productId, quantity);
                
                JSONObject response = new JSONObject();
                if (success) {
                    response.put("success", true);
                    response.put("message", "Cart updated");
                    mainHandler.post(() -> callback.onSuccess(response));
                } else {
                    mainHandler.post(() -> callback.onError("Failed to update cart"));
                }
            } catch (Exception e) {
                mainHandler.post(() -> callback.onError("Error: " + e.getMessage()));
            }
        });
    }

    // Remove from cart (Offline)
    public void removeFromCart(int userId, int productId, final ApiCallback callback) {
        executorService.execute(() -> {
            try {
                boolean success = dbHelper.removeFromCart(userId, productId);
                
                JSONObject response = new JSONObject();
                if (success) {
                    response.put("success", true);
                    response.put("message", "Item removed");
                    mainHandler.post(() -> callback.onSuccess(response));
                } else {
                    mainHandler.post(() -> callback.onError("Failed to remove item"));
                }
            } catch (Exception e) {
                mainHandler.post(() -> callback.onError("Error: " + e.getMessage()));
            }
        });
    }

    // Checkout (Offline)
    public void checkout(int userId, String address, String city, String country, String account, final ApiCallback callback) {
        executorService.execute(() -> {
            try {
                List<CartItem> cartItems = dbHelper.getCartItems(userId);
                double total = 0;
                for (CartItem item : cartItems) {
                    total += item.getSubtotal();
                }
                
                long orderId = dbHelper.createOrder(userId, address, city, country, total);
                
                JSONObject response = new JSONObject();
                if (orderId != -1) {
                    response.put("success", true);
                    response.put("message", "Order placed successfully! Order ID: " + orderId);
                    mainHandler.post(() -> callback.onSuccess(response));
                } else {
                    mainHandler.post(() -> callback.onError("Failed to place order"));
                }
            } catch (Exception e) {
                mainHandler.post(() -> callback.onError("Error: " + e.getMessage()));
            }
        });
    }

    // Get orders (Offline)
    public void getOrders(int userId, final ApiCallback callback) {
        executorService.execute(() -> {
            try {
                List<Order> orders = dbHelper.getUserOrders(userId);
                
                JSONObject response = new JSONObject();
                response.put("success", true);
                
                JSONArray dataArray = new JSONArray();
                for (Order order : orders) {
                    JSONObject orderObj = new JSONObject();
                    orderObj.put("oid", order.getOrderId());
                    orderObj.put("dateod", order.getOrderDate());
                    orderObj.put("datedel", order.getDeliveryDate());
                    orderObj.put("address", order.getAddress());
                    orderObj.put("city", order.getCity());
                    orderObj.put("country", order.getCountry());
                    orderObj.put("total", order.getTotal());
                    orderObj.put("status", order.getStatus());
                    dataArray.put(orderObj);
                }
                
                response.put("data", dataArray);
                mainHandler.post(() -> callback.onSuccess(response));
            } catch (Exception e) {
                mainHandler.post(() -> callback.onError("Error: " + e.getMessage()));
            }
        });
    }

    // Get order details (Offline)
    public void getOrderDetails(int orderId, final ApiCallback callback) {
        executorService.execute(() -> {
            try {
                List<OrderItem> orderItems = dbHelper.getOrderItems(orderId);
                
                JSONObject response = new JSONObject();
                response.put("success", true);
                
                JSONArray dataArray = new JSONArray();
                for (OrderItem item : orderItems) {
                    JSONObject itemObj = new JSONObject();
                    itemObj.put("pid", item.getProductId());
                    itemObj.put("pname", item.getProductName());
                    itemObj.put("price", item.getPrice());
                    itemObj.put("qty", item.getQuantity());
                    itemObj.put("subtotal", item.getSubtotal());
                    itemObj.put("img", item.getImage());
                    itemObj.put("brand", item.getBrand());
                    dataArray.put(itemObj);
                }
                
                response.put("data", dataArray);
                mainHandler.post(() -> callback.onSuccess(response));
            } catch (Exception e) {
                mainHandler.post(() -> callback.onError("Error: " + e.getMessage()));
            }
        });
    }

    // Wishlist methods (Offline - Simplified)
    public void getWishlist(int userId, final ApiCallback callback) {
        executorService.execute(() -> {
            try {
                JSONObject response = new JSONObject();
                response.put("success", true);
                response.put("data", new JSONArray());
                mainHandler.post(() -> callback.onSuccess(response));
            } catch (Exception e) {
                mainHandler.post(() -> callback.onError("Error: " + e.getMessage()));
            }
        });
    }

    public void addToWishlist(int userId, int productId, final ApiCallback callback) {
        executorService.execute(() -> {
            try {
                JSONObject response = new JSONObject();
                response.put("success", true);
                response.put("message", "Added to wishlist");
                mainHandler.post(() -> callback.onSuccess(response));
            } catch (Exception e) {
                mainHandler.post(() -> callback.onError("Error: " + e.getMessage()));
            }
        });
    }

    public void removeFromWishlist(int userId, int productId, final ApiCallback callback) {
        executorService.execute(() -> {
            try {
                JSONObject response = new JSONObject();
                response.put("success", true);
                response.put("message", "Removed from wishlist");
                mainHandler.post(() -> callback.onSuccess(response));
            } catch (Exception e) {
                mainHandler.post(() -> callback.onError("Error: " + e.getMessage()));
            }
        });
    }

    // Review methods (Offline - Simplified)
    public void getReviews(int productId, final ApiCallback callback) {
        executorService.execute(() -> {
            try {
                JSONObject response = new JSONObject();
                response.put("success", true);
                response.put("data", new JSONArray());
                mainHandler.post(() -> callback.onSuccess(response));
            } catch (Exception e) {
                mainHandler.post(() -> callback.onError("Error: " + e.getMessage()));
            }
        });
    }

    public void addReview(int orderId, int productId, String reviewText, int rating, final ApiCallback callback) {
        executorService.execute(() -> {
            try {
                JSONObject response = new JSONObject();
                response.put("success", true);
                response.put("message", "Review added");
                mainHandler.post(() -> callback.onSuccess(response));
            } catch (Exception e) {
                mainHandler.post(() -> callback.onError("Error: " + e.getMessage()));
            }
        });
    }
}
