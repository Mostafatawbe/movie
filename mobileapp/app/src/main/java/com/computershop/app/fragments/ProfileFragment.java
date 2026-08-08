package com.computershop.app.fragments;

import android.content.Intent;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.computershop.app.R;
import com.computershop.app.activities.LoginActivity;
import com.computershop.app.activities.OrderDetailsActivity;
import com.computershop.app.adapters.OrdersAdapter;
import com.computershop.app.models.Order;
import com.computershop.app.network.ApiClient;
import com.computershop.app.utils.SessionManager;

import org.json.JSONArray;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

public class ProfileFragment extends Fragment implements OrdersAdapter.OnOrderClickListener {

    private LinearLayout layoutLoggedOut, layoutLoggedIn;
    private TextView tvUsername, tvEmail;
    private Button btnLogin, btnLogout;
    private RecyclerView recyclerOrders;
    private OrdersAdapter ordersAdapter;
    private List<Order> ordersList;
    private ProgressBar progressBar;
    private TextView tvNoOrders;
    private SessionManager sessionManager;
    private ApiClient apiClient;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_profile, container, false);

        sessionManager = new SessionManager(requireContext());
        apiClient = new ApiClient(requireContext());
        ordersList = new ArrayList<>();

        layoutLoggedOut = view.findViewById(R.id.layout_logged_out);
        layoutLoggedIn = view.findViewById(R.id.layout_logged_in);
        tvUsername = view.findViewById(R.id.tv_profile_username);
        tvEmail = view.findViewById(R.id.tv_profile_email);
        btnLogin = view.findViewById(R.id.btn_login);
        btnLogout = view.findViewById(R.id.btn_logout);
        recyclerOrders = view.findViewById(R.id.recycler_orders);
        progressBar = view.findViewById(R.id.progress_bar);
        tvNoOrders = view.findViewById(R.id.tv_no_orders);

        recyclerOrders.setLayoutManager(new LinearLayoutManager(requireContext()));
        ordersAdapter = new OrdersAdapter(ordersList, this);
        recyclerOrders.setAdapter(ordersAdapter);

        btnLogin.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startActivity(new Intent(requireContext(), LoginActivity.class));
            }
        });

        btnLogout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                sessionManager.logout();
                updateUI();
                Toast.makeText(requireContext(), "Logged out successfully", Toast.LENGTH_SHORT).show();
            }
        });

        return view;
    }

    @Override
    public void onResume() {
        super.onResume();
        updateUI();
    }

    private void updateUI() {
        if (sessionManager.isLoggedIn()) {
            layoutLoggedOut.setVisibility(View.GONE);
            layoutLoggedIn.setVisibility(View.VISIBLE);
            tvUsername.setText(sessionManager.getFirstName() + " " + sessionManager.getLastName());
            tvEmail.setText(sessionManager.getEmail());
            loadOrders();
        } else {
            layoutLoggedOut.setVisibility(View.VISIBLE);
            layoutLoggedIn.setVisibility(View.GONE);
        }
    }

    private void loadOrders() {
        progressBar.setVisibility(View.VISIBLE);
        tvNoOrders.setVisibility(View.GONE);

        apiClient.getOrders(sessionManager.getUserId(), new ApiClient.ApiCallback() {
            @Override
            public void onSuccess(JSONObject response) {
                progressBar.setVisibility(View.GONE);

                try {
                    if (response.getBoolean("success")) {
                        JSONArray ordersArray = response.getJSONArray("data");
                        ordersList.clear();

                        for (int i = 0; i < ordersArray.length(); i++) {
                            JSONObject orderObj = ordersArray.getJSONObject(i);
                            Order order = new Order();
                            order.setOrderId(orderObj.getInt("order_id"));
                            order.setOrderDate(orderObj.getString("order_date"));
                            order.setDeliveryDate(orderObj.optString("delivery_date", null));
                            order.setAddress(orderObj.getString("address"));
                            order.setCity(orderObj.getString("city"));
                            order.setCountry(orderObj.getString("country"));
                            order.setTotal(orderObj.getInt("total"));
                            order.setStatus(orderObj.getString("status"));
                            ordersList.add(order);
                        }

                        ordersAdapter.notifyDataSetChanged();

                        if (ordersList.isEmpty()) {
                            tvNoOrders.setVisibility(View.VISIBLE);
                        }
                    } else {
                        Toast.makeText(requireContext(), response.getString("message"), Toast.LENGTH_SHORT).show();
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                    Toast.makeText(requireContext(), "Error loading orders", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onError(String error) {
                progressBar.setVisibility(View.GONE);
                tvNoOrders.setVisibility(View.VISIBLE);
                tvNoOrders.setText("Failed to load orders");
                Toast.makeText(requireContext(), "Error: " + error, Toast.LENGTH_SHORT).show();
            }
        });
    }

    @Override
    public void onOrderClick(Order order) {
        Intent intent = new Intent(requireContext(), OrderDetailsActivity.class);
        intent.putExtra("order_id", order.getOrderId());
        startActivity(intent);
    }
}
