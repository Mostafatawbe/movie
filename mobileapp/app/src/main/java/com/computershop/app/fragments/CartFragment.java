package com.computershop.app.fragments;

import android.content.Intent;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.computershop.app.R;
import com.computershop.app.activities.CheckoutActivity;
import com.computershop.app.activities.LoginActivity;
import com.computershop.app.adapters.CartAdapter;
import com.computershop.app.models.CartItem;
import com.computershop.app.network.ApiClient;
import com.computershop.app.utils.SessionManager;

import org.json.JSONArray;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

public class CartFragment extends Fragment implements CartAdapter.OnCartItemListener {

    private RecyclerView recyclerView;
    private CartAdapter adapter;
    private List<CartItem> cartItems;
    private TextView tvEmpty, tvTotal;
    private ProgressBar progressBar;
    private Button btnCheckout;
    private ApiClient apiClient;
    private SessionManager sessionManager;
    private int totalAmount = 0;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_cart, container, false);

        apiClient = new ApiClient(requireContext());
        sessionManager = new SessionManager(requireContext());
        cartItems = new ArrayList<>();

        recyclerView = view.findViewById(R.id.recycler_cart);
        tvEmpty = view.findViewById(R.id.tv_empty);
        tvTotal = view.findViewById(R.id.tv_total);
        progressBar = view.findViewById(R.id.progress_bar);
        btnCheckout = view.findViewById(R.id.btn_checkout);

        recyclerView.setLayoutManager(new LinearLayoutManager(requireContext()));
        adapter = new CartAdapter(cartItems, this);
        recyclerView.setAdapter(adapter);

        btnCheckout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (!sessionManager.isLoggedIn()) {
                    Toast.makeText(requireContext(), "Please login first", Toast.LENGTH_SHORT).show();
                    startActivity(new Intent(requireContext(), LoginActivity.class));
                    return;
                }
                
                if (cartItems.isEmpty()) {
                    Toast.makeText(requireContext(), "Cart is empty", Toast.LENGTH_SHORT).show();
                    return;
                }

                Intent intent = new Intent(requireContext(), CheckoutActivity.class);
                intent.putExtra(CheckoutActivity.EXTRA_TOTAL_AMOUNT, (double)totalAmount);
                startActivity(intent);
            }
        });

        return view;
    }

    @Override
    public void onResume() {
        super.onResume();
        loadCart();
    }

    private void loadCart() {
        if (!sessionManager.isLoggedIn()) {
            tvEmpty.setVisibility(View.VISIBLE);
            tvEmpty.setText("Please login to view cart");
            recyclerView.setVisibility(View.GONE);
            btnCheckout.setVisibility(View.GONE);
            return;
        }

        progressBar.setVisibility(View.VISIBLE);
        tvEmpty.setVisibility(View.GONE);

        apiClient.getCart(sessionManager.getUserId(), new ApiClient.ApiCallback() {
            @Override
            public void onSuccess(JSONObject response) {
                progressBar.setVisibility(View.GONE);

                try {
                    if (response.getBoolean("success")) {
                        JSONObject dataObj = response.getJSONObject("data");
                        JSONArray itemsArray = dataObj.getJSONArray("items");
                        totalAmount = dataObj.getInt("total");

                        cartItems.clear();

                        for (int i = 0; i < itemsArray.length(); i++) {
                            JSONObject itemObj = itemsArray.getJSONObject(i);
                            CartItem item = new CartItem();
                            item.setProductId(itemObj.getInt("product_id"));
                            item.setProductName(itemObj.getString("product_name"));
                            item.setPrice(itemObj.getInt("price"));
                            item.setQuantity(itemObj.getInt("quantity"));
                            item.setSubtotal(itemObj.getInt("subtotal"));
                            item.setImage(itemObj.getString("image"));
                            item.setBrand(itemObj.getString("brand"));
                            item.setStock(itemObj.getInt("stock"));
                            cartItems.add(item);
                        }

                        adapter.notifyDataSetChanged();
                        tvTotal.setText("Total: $" + totalAmount);

                        if (cartItems.isEmpty()) {
                            tvEmpty.setVisibility(View.VISIBLE);
                            tvEmpty.setText("Cart is empty");
                            recyclerView.setVisibility(View.GONE);
                            btnCheckout.setVisibility(View.GONE);
                        } else {
                            recyclerView.setVisibility(View.VISIBLE);
                            btnCheckout.setVisibility(View.VISIBLE);
                        }
                    } else {
                        Toast.makeText(requireContext(), response.getString("message"), Toast.LENGTH_SHORT).show();
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                    Toast.makeText(requireContext(), "Error loading cart", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onError(String error) {
                progressBar.setVisibility(View.GONE);
                tvEmpty.setVisibility(View.VISIBLE);
                tvEmpty.setText("Failed to load cart");
                Toast.makeText(requireContext(), "Error: " + error, Toast.LENGTH_SHORT).show();
            }
        });
    }

    @Override
    public void onQuantityChanged(CartItem item, int newQuantity) {
        if (newQuantity < 1) {
            Toast.makeText(requireContext(), "Quantity cannot be less than 1", Toast.LENGTH_SHORT).show();
            return;
        }

        if (newQuantity > item.getStock()) {
            Toast.makeText(requireContext(), "Not enough stock. Available: " + item.getStock(), Toast.LENGTH_SHORT).show();
            return;
        }

        apiClient.updateCart(sessionManager.getUserId(), item.getProductId(), newQuantity, new ApiClient.ApiCallback() {
            @Override
            public void onSuccess(JSONObject response) {
                try {
                    if (response.getBoolean("success")) {
                        loadCart();
                    } else {
                        Toast.makeText(requireContext(), response.getString("message"), Toast.LENGTH_SHORT).show();
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }

            @Override
            public void onError(String error) {
                Toast.makeText(requireContext(), "Error updating cart", Toast.LENGTH_SHORT).show();
            }
        });
    }

    @Override
    public void onRemoveItem(CartItem item) {
        apiClient.removeFromCart(sessionManager.getUserId(), item.getProductId(), new ApiClient.ApiCallback() {
            @Override
            public void onSuccess(JSONObject response) {
                try {
                    if (response.getBoolean("success")) {
                        Toast.makeText(requireContext(), "Item removed from cart", Toast.LENGTH_SHORT).show();
                        loadCart();
                    } else {
                        Toast.makeText(requireContext(), response.getString("message"), Toast.LENGTH_SHORT).show();
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }

            @Override
            public void onError(String error) {
                Toast.makeText(requireContext(), "Error removing item", Toast.LENGTH_SHORT).show();
            }
        });
    }
}
