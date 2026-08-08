package com.computershop.app.fragments;

import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.GridLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.computershop.app.R;
import com.computershop.app.activities.LoginActivity;
import com.computershop.app.activities.ProductDetailsActivity;
import com.computershop.app.adapters.WishlistAdapter;
import com.computershop.app.database.DatabaseHelper;
import com.computershop.app.models.Product;
import com.computershop.app.utils.SessionManager;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class WishlistFragment extends Fragment implements WishlistAdapter.OnWishlistItemClickListener {

    private RecyclerView recyclerView;
    private WishlistAdapter adapter;
    private List<Product> wishlistItems;
    private TextView tvEmpty;
    private ProgressBar progressBar;
    private DatabaseHelper dbHelper;
    private SessionManager sessionManager;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_wishlist, container, false);

        dbHelper = new DatabaseHelper(requireContext());
        sessionManager = new SessionManager(requireContext());
        wishlistItems = new ArrayList<>();

        recyclerView = view.findViewById(R.id.recycler_wishlist);
        tvEmpty = view.findViewById(R.id.tv_empty);
        progressBar = view.findViewById(R.id.progress_bar);

        recyclerView.setLayoutManager(new GridLayoutManager(requireContext(), 2));
        adapter = new WishlistAdapter(wishlistItems, this);
        recyclerView.setAdapter(adapter);

        return view;
    }

    @Override
    public void onResume() {
        super.onResume();
        loadWishlist();
    }

    private void loadWishlist() {
        if (!sessionManager.isLoggedIn()) {
            tvEmpty.setVisibility(View.VISIBLE);
            tvEmpty.setText("Please login to view wishlist");
            recyclerView.setVisibility(View.GONE);
            return;
        }

        progressBar.setVisibility(View.VISIBLE);
        tvEmpty.setVisibility(View.GONE);

        ExecutorService executor = Executors.newSingleThreadExecutor();
        Handler handler = new Handler(Looper.getMainLooper());

        executor.execute(() -> {
            // Background work
            List<Product> products = dbHelper.getWishlistItems(sessionManager.getUserId());

            handler.post(() -> {
                // UI Thread work
                progressBar.setVisibility(View.GONE);

                wishlistItems.clear();
                wishlistItems.addAll(products);
                adapter.notifyDataSetChanged();

                if (wishlistItems.isEmpty()) {
                    tvEmpty.setVisibility(View.VISIBLE);
                    tvEmpty.setText("Wishlist is empty");
                    recyclerView.setVisibility(View.GONE);
                } else {
                    recyclerView.setVisibility(View.VISIBLE);
                }
            });
        });
    }

    @Override
    public void onProductClick(Product product) {
        Intent intent = new Intent(requireContext(), ProductDetailsActivity.class);
        intent.putExtra(ProductDetailsActivity.EXTRA_PRODUCT_ID, product.getId());
        startActivity(intent);
    }

    @Override
    public void onRemoveFromWishlist(Product product) {
        ExecutorService executor = Executors.newSingleThreadExecutor();
        Handler handler = new Handler(Looper.getMainLooper());

        executor.execute(() -> {
            // Background work
            boolean success = dbHelper.removeFromWishlist(sessionManager.getUserId(), product.getId());

            handler.post(() -> {
                // UI Thread work
                if (success) {
                    Toast.makeText(requireContext(), "Removed from wishlist", Toast.LENGTH_SHORT).show();
                    loadWishlist();
                } else {
                    Toast.makeText(requireContext(), "Error removing item", Toast.LENGTH_SHORT).show();
                }
            });
        });
    }
}