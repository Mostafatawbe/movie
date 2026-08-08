package com.computershop.app.activities;

import android.os.Bundle;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.Spinner;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;

import com.computershop.app.R;
import com.computershop.app.database.DatabaseHelper;
import com.google.android.material.textfield.TextInputEditText;

public class AddEditProductActivity extends AppCompatActivity {

    private TextInputEditText etName, etDescription, etPrice, etStock, etBrand, etImage;
    private Spinner spinnerCategory;
    private Button btnSave;
    private DatabaseHelper dbHelper;
    private int productId = -1;
    private boolean isEditMode = false;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_add_edit_product);

        dbHelper = new DatabaseHelper(this);

        Toolbar toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);

        etName = findViewById(R.id.et_product_name);
        etDescription = findViewById(R.id.et_product_description);
        etPrice = findViewById(R.id.et_product_price);
        etStock = findViewById(R.id.et_product_stock);
        etBrand = findViewById(R.id.et_product_brand);
        etImage = findViewById(R.id.et_product_image);
        spinnerCategory = findViewById(R.id.spinner_category);
        btnSave = findViewById(R.id.btn_save);

        // Setup category spinner
        String[] categories = {"CPU", "GPU", "RAM", "Storage", "Motherboard", "PSU"};
        ArrayAdapter<String> categoryAdapter = new ArrayAdapter<>(this,
                android.R.layout.simple_spinner_item, categories);
        categoryAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        spinnerCategory.setAdapter(categoryAdapter);

        // Check if editing existing product
        if (getIntent().hasExtra("product_id")) {
            isEditMode = true;
            productId = getIntent().getIntExtra("product_id", -1);
            getSupportActionBar().setTitle("Edit Product");
            loadProductData();
        } else {
            getSupportActionBar().setTitle("Add Product");
        }

        btnSave.setOnClickListener(v -> saveProduct());

        toolbar.setNavigationOnClickListener(v -> finish());
    }

    private void loadProductData() {
        etName.setText(getIntent().getStringExtra("product_name"));
        etDescription.setText(getIntent().getStringExtra("product_description"));
        etPrice.setText(String.valueOf(getIntent().getIntExtra("product_price", 0)));
        etStock.setText(String.valueOf(getIntent().getIntExtra("product_stock", 0)));
        etBrand.setText(getIntent().getStringExtra("product_brand"));
        etImage.setText(getIntent().getStringExtra("product_image"));

        String category = getIntent().getStringExtra("product_category");
        String[] categories = {"CPU", "GPU", "RAM", "Storage", "Motherboard", "PSU"};
        for (int i = 0; i < categories.length; i++) {
            if (categories[i].equals(category)) {
                spinnerCategory.setSelection(i);
                break;
            }
        }
    }

    private void saveProduct() {
        String name = etName.getText().toString().trim();
        String description = etDescription.getText().toString().trim();
        String priceStr = etPrice.getText().toString().trim();
        String stockStr = etStock.getText().toString().trim();
        String brand = etBrand.getText().toString().trim();
        String image = etImage.getText().toString().trim();
        String category = spinnerCategory.getSelectedItem().toString();

        if (name.isEmpty()) {
            etName.setError("Name required");
            return;
        }
        if (priceStr.isEmpty()) {
            etPrice.setError("Price required");
            return;
        }
        if (stockStr.isEmpty()) {
            etStock.setError("Stock required");
            return;
        }

        int price = Integer.parseInt(priceStr);
        int stock = Integer.parseInt(stockStr);

        if (image.isEmpty()) {
            image = "placeholder.jpg";
        }
        if (description.isEmpty()) {
            description = "No description";
        }

        boolean success;
        if (isEditMode) {
            success = dbHelper.updateProduct(productId, name, category, description, price, stock, image, brand);
        } else {
            success = dbHelper.addProduct(name, category, description, price, stock, image, brand);
        }

        if (success) {
            Toast.makeText(this, isEditMode ? "Product updated" : "Product added", Toast.LENGTH_SHORT).show();
            finish();
        } else {
            Toast.makeText(this, "Failed to save product", Toast.LENGTH_SHORT).show();
        }
    }
}
