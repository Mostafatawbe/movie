package com.computershop.app.activities;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.computershop.app.R;
import com.computershop.app.adapters.AdminProductsAdapter;
import com.computershop.app.database.DatabaseHelper;
import com.computershop.app.models.Product;
import com.computershop.app.utils.SessionManager;

import java.util.ArrayList;
import java.util.List;

public class AdminPanelActivity extends AppCompatActivity implements AdminProductsAdapter.OnProductActionListener {

    private RecyclerView recyclerProducts;
    private AdminProductsAdapter adapter;
    private List<Product> productsList;
    private DatabaseHelper dbHelper;
    private SessionManager sessionManager;
    private Button btnAddProduct, btnLogout;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_admin_panel);

        sessionManager = new SessionManager(this);
        dbHelper = new DatabaseHelper(this);

        // Verify admin access
        if (!sessionManager.isLoggedIn() || !sessionManager.isAdmin()) {
            Toast.makeText(this, "Access denied", Toast.LENGTH_SHORT).show();
            startActivity(new Intent(this, LoginActivity.class));
            finish();
            return;
        }

        Toolbar toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        getSupportActionBar().setTitle("Admin Panel");

        recyclerProducts = findViewById(R.id.recycler_products);
        btnAddProduct = findViewById(R.id.btn_add_product);
        btnLogout = findViewById(R.id.btn_logout);

        productsList = new ArrayList<>();
        adapter = new AdminProductsAdapter(productsList, this);
        recyclerProducts.setLayoutManager(new LinearLayoutManager(this));
        recyclerProducts.setAdapter(adapter);

        btnAddProduct.setOnClickListener(v -> {
            Intent intent = new Intent(AdminPanelActivity.this, AddEditProductActivity.class);
            startActivity(intent);
        });

        btnLogout.setOnClickListener(v -> {
            sessionManager.logout();
            Intent intent = new Intent(AdminPanelActivity.this, LoginActivity.class);
            intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
            startActivity(intent);
            finish();
        });

        loadProducts();
    }

    @Override
    protected void onResume() {
        super.onResume();
        loadProducts();
    }

    private void loadProducts() {
        productsList.clear();
        productsList.addAll(dbHelper.getAllProducts(null, null));
        adapter.notifyDataSetChanged();
    }

    @Override
    public void onEditProduct(Product product) {
        Intent intent = new Intent(this, AddEditProductActivity.class);
        intent.putExtra("product_id", product.getId());
        intent.putExtra("product_name", product.getName());
        intent.putExtra("product_category", product.getCategory());
        intent.putExtra("product_description", product.getDescription());
        intent.putExtra("product_price", product.getPrice());
        intent.putExtra("product_stock", product.getStock());
        intent.putExtra("product_brand", product.getBrand());
        intent.putExtra("product_image", product.getImage());
        startActivity(intent);
    }

    @Override
    public void onDeleteProduct(Product product) {
        new AlertDialog.Builder(this)
                .setTitle("Delete Product")
                .setMessage("Are you sure you want to delete " + product.getName() + "?")
                .setPositiveButton("Delete", (dialog, which) -> {
                    if (dbHelper.deleteProduct(product.getId())) {
                        Toast.makeText(this, "Product deleted", Toast.LENGTH_SHORT).show();
                        loadProducts();
                    } else {
                        Toast.makeText(this, "Failed to delete product", Toast.LENGTH_SHORT).show();
                    }
                })
                .setNegativeButton("Cancel", null)
                .show();
    }

    @Override
    public void onBackPressed() {
        // Prevent going back, admin can only logout
        new AlertDialog.Builder(this)
                .setTitle("Logout")
                .setMessage("Do you want to logout?")
                .setPositiveButton("Logout", (dialog, which) -> {
                    sessionManager.logout();
                    Intent intent = new Intent(AdminPanelActivity.this, LoginActivity.class);
                    intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
                    startActivity(intent);
                    finish();
                })
                .setNegativeButton("Cancel", null)
                .show();
    }
}
