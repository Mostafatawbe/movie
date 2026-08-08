package com.computershop.app.activities;

import android.os.Bundle;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import com.computershop.app.R;
import com.computershop.app.network.ApiClient;
import com.computershop.app.utils.SessionManager;
import com.google.android.material.textfield.TextInputEditText;
import org.json.JSONException;
import org.json.JSONObject;

public class CheckoutActivity extends AppCompatActivity {
    
    public static final String EXTRA_TOTAL_AMOUNT = "total_amount";
    
    private TextInputEditText etAddress, etCity, etCountry, etAccount;
    private TextView tvTotal;
    private Button btnPlaceOrder;
    private ProgressBar progressBar;
    
    private ApiClient apiClient;
    private SessionManager sessionManager;
    private double totalAmount;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_checkout);

        Toolbar toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        getSupportActionBar().setTitle("Checkout");

        // Initialize views
        etAddress = findViewById(R.id.etAddress);
        etCity = findViewById(R.id.etCity);
        etCountry = findViewById(R.id.etCountry);
        etAccount = findViewById(R.id.etAccount);
        tvTotal = findViewById(R.id.tvTotal);
        btnPlaceOrder = findViewById(R.id.btnPlaceOrder);
        progressBar = findViewById(R.id.progressBar);

        apiClient = new ApiClient(this);
        sessionManager = new SessionManager(this);

        totalAmount = getIntent().getDoubleExtra(EXTRA_TOTAL_AMOUNT, 0.0);
        tvTotal.setText("Total: $" + String.format("%.2f", totalAmount));

        btnPlaceOrder.setOnClickListener(v -> placeOrder());
    }

    private void placeOrder() {
        String address = etAddress.getText().toString().trim();
        String city = etCity.getText().toString().trim();
        String country = etCountry.getText().toString().trim();
        String account = etAccount.getText().toString().trim();

        // Validation
        if (address.isEmpty()) {
            etAddress.setError("Address is required");
            etAddress.requestFocus();
            return;
        }

        if (city.isEmpty()) {
            etCity.setError("City is required");
            etCity.requestFocus();
            return;
        }

        if (country.isEmpty()) {
            etCountry.setError("Country is required");
            etCountry.requestFocus();
            return;
        }

        if (account.isEmpty()) {
            etAccount.setError("Account number is required");
            etAccount.requestFocus();
            return;
        }

        setLoading(true);

        apiClient.checkout(sessionManager.getUserId(), address, city, country, account, 
            new ApiClient.ApiCallback() {
                @Override
                public void onSuccess(JSONObject response) {
                    setLoading(false);
                    try {
                        String message = response.getString("message");
                        Toast.makeText(CheckoutActivity.this, message, Toast.LENGTH_LONG).show();
                        
                        // Go back to main activity
                        finish();
                        
                    } catch (JSONException e) {
                        e.printStackTrace();
                        Toast.makeText(CheckoutActivity.this, "Order placed successfully!", Toast.LENGTH_LONG).show();
                        finish();
                    }
                }

                @Override
                public void onError(String error) {
                    setLoading(false);
                    Toast.makeText(CheckoutActivity.this, error, Toast.LENGTH_LONG).show();
                }
            });
    }

    private void setLoading(boolean loading) {
        progressBar.setVisibility(loading ? View.VISIBLE : View.GONE);
        btnPlaceOrder.setEnabled(!loading);
        etAddress.setEnabled(!loading);
        etCity.setEnabled(!loading);
        etCountry.setEnabled(!loading);
        etAccount.setEnabled(!loading);
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
