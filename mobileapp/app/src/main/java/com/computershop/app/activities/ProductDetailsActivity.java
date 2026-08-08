package com.computershop.app.activities;

import android.os.Bundle;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import com.bumptech.glide.Glide;
import com.computershop.app.R;
import com.computershop.app.database.DatabaseHelper;
import com.computershop.app.models.Product;
import com.computershop.app.network.ApiClient;
import com.computershop.app.utils.SessionManager;
import com.google.android.material.textfield.TextInputEditText;
import org.json.JSONException;
import org.json.JSONObject;

public class ProductDetailsActivity extends AppCompatActivity {
    
    public static final String EXTRA_PRODUCT_ID = "product_id";
    
    private ImageView ivProduct;
    private TextView tvName, tvBrand, tvCategory, tvPrice, tvStock, tvDescription;
    private TextInputEditText etQuantity;
    private Button btnAddToCart, btnAddToWishlist;
    private ProgressBar progressBar;
    
    private ApiClient apiClient;
    private SessionManager sessionManager;
    private DatabaseHelper dbHelper;
    private int productId;
    private int availableStock;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_product_details);

        Toolbar toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        getSupportActionBar().setTitle("Product Details");

        // Initialize views
        ivProduct = findViewById(R.id.ivProduct);
        tvName = findViewById(R.id.tvName);
        tvBrand = findViewById(R.id.tvBrand);
        tvCategory = findViewById(R.id.tvCategory);
        tvPrice = findViewById(R.id.tvPrice);
        tvStock = findViewById(R.id.tvStock);
        tvDescription = findViewById(R.id.tvDescription);
        etQuantity = findViewById(R.id.etQuantity);
        btnAddToCart = findViewById(R.id.btnAddToCart);
        btnAddToWishlist = findViewById(R.id.btnAddToWishlist);
        progressBar = findViewById(R.id.progressBar);

        apiClient = new ApiClient(this);
        sessionManager = new SessionManager(this);
        dbHelper = new DatabaseHelper(this);

        productId = getIntent().getIntExtra(EXTRA_PRODUCT_ID, -1);
        
        if (productId == -1) {
            Toast.makeText(this, "Invalid product", Toast.LENGTH_SHORT).show();
            finish();
            return;
        }

        loadProductDetails();

        btnAddToCart.setOnClickListener(v -> addToCart());
        btnAddToWishlist.setOnClickListener(v -> addToWishlist());
    }

    private void loadProductDetails() {
        progressBar.setVisibility(View.VISIBLE);

        // First try to load from database
        Product product = dbHelper.getProductById(productId);
        if (product != null) {
            loadProductFromDatabase(product);
            progressBar.setVisibility(View.GONE);
            return;
        }

        // Fallback to API
        apiClient.getProduct(productId, new ApiClient.ApiCallback() {
            @Override
            public void onSuccess(JSONObject response) {
                progressBar.setVisibility(View.GONE);
                try {
                    JSONObject productJson = response.getJSONObject("data");
                    
                    tvName.setText(productJson.getString("pname"));
                    tvBrand.setText("Brand: " + productJson.getString("brand"));
                    tvCategory.setText("Category: " + productJson.getString("category"));
                    tvPrice.setText("$" + productJson.getString("price"));
                    
                    availableStock = productJson.getInt("qtyavail");
                    tvStock.setText("In Stock: " + availableStock);
                    tvDescription.setText(productJson.getString("description"));
                    
                    // Use placeholder for online mode
                    Glide.with(ProductDetailsActivity.this)
                        .load(R.drawable.ic_product)
                        .placeholder(R.drawable.ic_product)
                        .into(ivProduct);

                } catch (JSONException e) {
                    e.printStackTrace();
                    Toast.makeText(ProductDetailsActivity.this, "Error loading product", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onError(String error) {
                progressBar.setVisibility(View.GONE);
                Toast.makeText(ProductDetailsActivity.this, error, Toast.LENGTH_LONG).show();
            }
        });
    }

    private void loadProductFromDatabase(Product product) {
        tvName.setText(product.getName());
        tvBrand.setText("Brand: " + product.getBrand());
        tvCategory.setText("Category: " + product.getCategory());
        tvPrice.setText("$" + product.getPrice());
        availableStock = product.getStock();
        tvStock.setText("In Stock: " + availableStock);
        tvDescription.setText(product.getDescription());

        // Load product image from drawable
        String imageName = product.getImage();
        if (imageName != null && !imageName.isEmpty()) {
            // Remove file extension if present
            if (imageName.contains(".")) {
                imageName = imageName.substring(0, imageName.lastIndexOf('.'));
            }
            // Convert to lowercase for resource name
            imageName = imageName.toLowerCase();
            int resId = getResources().getIdentifier(imageName, "drawable", getPackageName());
            if (resId != 0) {
                Glide.with(this)
                        .load(resId)
                        .placeholder(R.drawable.ic_product)
                        .error(R.drawable.ic_product)
                        .into(ivProduct);
            } else {
                // Fallback to placeholder
                Glide.with(this)
                        .load(R.drawable.ic_product)
                        .into(ivProduct);
            }
        } else {
            // Load placeholder image
            Glide.with(this)
                    .load(R.drawable.ic_product)
                    .into(ivProduct);
        }
    }

    private void addToCart() {
        if (!sessionManager.isLoggedIn()) {
            Toast.makeText(this, "Please login to add items to cart", Toast.LENGTH_SHORT).show();
            return;
        }

        String quantityStr = etQuantity.getText().toString().trim();
        if (quantityStr.isEmpty()) {
            etQuantity.setError("Enter quantity");
            return;
        }

        int quantity = Integer.parseInt(quantityStr);
        if (quantity <= 0) {
            etQuantity.setError("Quantity must be greater than 0");
            return;
        }

        if (quantity > availableStock) {
            etQuantity.setError("Only " + availableStock + " items available");
            return;
        }

        progressBar.setVisibility(View.VISIBLE);
        btnAddToCart.setEnabled(false);

        apiClient.addToCart(sessionManager.getUserId(), productId, quantity, new ApiClient.ApiCallback() {
            @Override
            public void onSuccess(JSONObject response) {
                progressBar.setVisibility(View.GONE);
                btnAddToCart.setEnabled(true);
                Toast.makeText(ProductDetailsActivity.this, "Added to cart!", Toast.LENGTH_SHORT).show();
                etQuantity.setText("");
            }

            @Override
            public void onError(String error) {
                progressBar.setVisibility(View.GONE);
                btnAddToCart.setEnabled(true);
                Toast.makeText(ProductDetailsActivity.this, error, Toast.LENGTH_LONG).show();
            }
        });
    }

    private void addToWishlist() {
        if (!sessionManager.isLoggedIn()) {
            Toast.makeText(this, "Please login to add items to wishlist", Toast.LENGTH_SHORT).show();
            return;
        }

        progressBar.setVisibility(View.VISIBLE);
        btnAddToWishlist.setEnabled(false);

        // Check if already in wishlist
        if (dbHelper.isInWishlist(sessionManager.getUserId(), productId)) {
            progressBar.setVisibility(View.GONE);
            btnAddToWishlist.setEnabled(true);
            Toast.makeText(this, "Already in wishlist", Toast.LENGTH_SHORT).show();
            return;
        }

        boolean success = dbHelper.addToWishlist(sessionManager.getUserId(), productId);
        progressBar.setVisibility(View.GONE);
        btnAddToWishlist.setEnabled(true);

        if (success) {
            Toast.makeText(this, "Added to wishlist!", Toast.LENGTH_SHORT).show();
        } else {
            Toast.makeText(this, "Failed to add to wishlist", Toast.LENGTH_SHORT).show();
        }
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        if (item.getItemId() == android.R.id.home) {
            finish();
            return true;
        }
        return super.onOptionsItemSelected(item);
    }
}
