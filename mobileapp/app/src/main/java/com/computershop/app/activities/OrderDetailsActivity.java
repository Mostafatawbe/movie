package com.computershop.app.activities;

import android.os.Bundle;
import android.view.MenuItem;
import android.view.View;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import com.computershop.app.R;
import com.computershop.app.adapters.OrderItemsAdapter;
import com.computershop.app.models.OrderItem;
import com.computershop.app.network.ApiClient;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import java.util.ArrayList;
import java.util.List;

public class OrderDetailsActivity extends AppCompatActivity {
    
    public static final String EXTRA_ORDER_ID = "order_id";
    public static final String EXTRA_ORDER_DATE = "order_date";
    public static final String EXTRA_DELIVERY_DATE = "delivery_date";
    public static final String EXTRA_ADDRESS = "address";
    public static final String EXTRA_CITY = "city";
    public static final String EXTRA_COUNTRY = "country";
    public static final String EXTRA_TOTAL = "total";
    
    private TextView tvOrderId, tvOrderDate, tvDeliveryDate, tvAddress, tvTotal;
    private RecyclerView rvOrderItems;
    private ProgressBar progressBar;
    
    private ApiClient apiClient;
    private OrderItemsAdapter adapter;
    private List<OrderItem> orderItems;
    private int orderId;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_order_details);

        Toolbar toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        getSupportActionBar().setTitle("Order Details");

        // Initialize views
        tvOrderId = findViewById(R.id.tvOrderId);
        tvOrderDate = findViewById(R.id.tvOrderDate);
        tvDeliveryDate = findViewById(R.id.tvDeliveryDate);
        tvAddress = findViewById(R.id.tvAddress);
        tvTotal = findViewById(R.id.tvTotal);
        rvOrderItems = findViewById(R.id.rvOrderItems);
        progressBar = findViewById(R.id.progressBar);

        apiClient = new ApiClient(this);
        
        // Get order data from intent
        orderId = getIntent().getIntExtra(EXTRA_ORDER_ID, -1);
        String orderDate = getIntent().getStringExtra(EXTRA_ORDER_DATE);
        String deliveryDate = getIntent().getStringExtra(EXTRA_DELIVERY_DATE);
        String address = getIntent().getStringExtra(EXTRA_ADDRESS);
        String city = getIntent().getStringExtra(EXTRA_CITY);
        String country = getIntent().getStringExtra(EXTRA_COUNTRY);
        double total = getIntent().getDoubleExtra(EXTRA_TOTAL, 0.0);

        // Display order information
        tvOrderId.setText("Order #" + orderId);
        tvOrderDate.setText("Order Date: " + orderDate);
        tvDeliveryDate.setText("Delivery Date: " + deliveryDate);
        tvAddress.setText(address + ", " + city + ", " + country);
        tvTotal.setText("Total: $" + String.format("%.2f", total));

        // Setup RecyclerView
        orderItems = new ArrayList<>();
        adapter = new OrderItemsAdapter(this, orderItems);
        rvOrderItems.setLayoutManager(new LinearLayoutManager(this));
        rvOrderItems.setAdapter(adapter);

        if (orderId != -1) {
            loadOrderDetails();
        } else {
            Toast.makeText(this, "Invalid order", Toast.LENGTH_SHORT).show();
            finish();
        }
    }

    private void loadOrderDetails() {
        progressBar.setVisibility(View.VISIBLE);

        apiClient.getOrderDetails(orderId, new ApiClient.ApiCallback() {
            @Override
            public void onSuccess(JSONObject response) {
                progressBar.setVisibility(View.GONE);
                try {
                    JSONArray itemsArray = response.getJSONArray("data");
                    orderItems.clear();
                    
                    for (int i = 0; i < itemsArray.length(); i++) {
                        JSONObject item = itemsArray.getJSONObject(i);
                        
                        OrderItem orderItem = new OrderItem(
                            item.getInt("pid"),
                            item.getString("pname"),
                            (int) item.getDouble("price"),
                            item.getInt("qty"),
                            (int) item.getDouble("subtotal"),
                            item.getString("img"),
                            item.getString("brand")
                        );
                        
                        orderItems.add(orderItem);
                    }
                    
                    adapter.notifyDataSetChanged();

                } catch (JSONException e) {
                    e.printStackTrace();
                    Toast.makeText(OrderDetailsActivity.this, "Error loading order items", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onError(String error) {
                progressBar.setVisibility(View.GONE);
                Toast.makeText(OrderDetailsActivity.this, error, Toast.LENGTH_LONG).show();
            }
        });
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
