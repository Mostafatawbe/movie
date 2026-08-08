package com.computershop.app.fragments;

import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ProgressBar;
import android.widget.SearchView;
import android.widget.Spinner;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.GridLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import androidx.swiperefreshlayout.widget.SwipeRefreshLayout;

import com.computershop.app.R;
import com.computershop.app.activities.ProductDetailsActivity;
import com.computershop.app.adapters.ProductsAdapter;
import com.computershop.app.database.DatabaseHelper;
import com.computershop.app.models.Product;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class ProductsFragment extends Fragment implements ProductsAdapter.OnProductClickListener {

    private RecyclerView recyclerView;
    private ProductsAdapter adapter;
    private List<Product> productList;
    private ProgressBar progressBar;
    private TextView tvEmpty;
    private SearchView searchView;
    private Spinner spinnerCategory;
    private SwipeRefreshLayout swipeRefreshLayout;
    private DatabaseHelper dbHelper;
    
    private String currentCategory = "all";
    private String currentSearch = "";

    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (getArguments() != null) {
            String selectedCategory = getArguments().getString("selected_category");
            if (selectedCategory != null) {
                currentCategory = selectedCategory;
            }
        }
    }

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_products, container, false);

        dbHelper = new DatabaseHelper(requireContext());
        productList = new ArrayList<>();

        recyclerView = view.findViewById(R.id.recycler_products);
        progressBar = view.findViewById(R.id.progress_bar);
        tvEmpty = view.findViewById(R.id.tv_empty);
        searchView = view.findViewById(R.id.search_view);
        spinnerCategory = view.findViewById(R.id.spinner_category);
        swipeRefreshLayout = view.findViewById(R.id.swipe_refresh);

        // Setup RecyclerView
        recyclerView.setLayoutManager(new GridLayoutManager(requireContext(), 2));
        adapter = new ProductsAdapter(productList, this);
        recyclerView.setAdapter(adapter);

        // Setup category spinner
        setupCategorySpinner();

        // Setup search
        searchView.setOnQueryTextListener(new SearchView.OnQueryTextListener() {
            @Override
            public boolean onQueryTextSubmit(String query) {
                currentSearch = query;
                loadProducts();
                return true;
            }

            @Override
            public boolean onQueryTextChange(String newText) {
                if (newText.isEmpty()) {
                    currentSearch = "";
                    loadProducts();
                }
                return true;
            }
        });

        // Setup swipe refresh
        swipeRefreshLayout.setOnRefreshListener(new SwipeRefreshLayout.OnRefreshListener() {
            @Override
            public void onRefresh() {
                loadProducts();
            }
        });

        // Load products
        loadProducts();

        return view;
    }

    private void setupCategorySpinner() {
        String[] categories = {"All", "CPU", "GPU", "RAM", "Keyboard", "Mouse", "Motherboard", "Monitor", "Headset", "Gaming Chair", "Mouse Pad", "Table"};
        ArrayAdapter<String> adapter = new ArrayAdapter<>(requireContext(), R.layout.spinner_item, categories);
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        spinnerCategory.setAdapter(adapter);

        // Set initial selection based on currentCategory
        for (int i = 0; i < categories.length; i++) {
            if (categories[i].toLowerCase().equals(currentCategory) || (currentCategory.equals("all") && categories[i].equals("All"))) {
                spinnerCategory.setSelection(i);
                break;
            }
        }

        spinnerCategory.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                currentCategory = categories[position].toLowerCase();
                if (currentCategory.equals("all")) {
                    currentCategory = "all";
                }
                loadProducts();
            }

            @Override
            public void onNothingSelected(AdapterView<?> parent) {
            }
        });
    }

    private void loadProducts() {
        progressBar.setVisibility(View.VISIBLE);
        tvEmpty.setVisibility(View.GONE);
        swipeRefreshLayout.setRefreshing(true);

        ExecutorService executor = Executors.newSingleThreadExecutor();
        Handler handler = new Handler(Looper.getMainLooper());

        executor.execute(() -> {
            // Background work
            List<Product> products = dbHelper.getAllProducts(currentCategory, currentSearch);

            handler.post(() -> {
                // UI Thread work
                swipeRefreshLayout.setRefreshing(false);
                progressBar.setVisibility(View.GONE);

                if (products != null) {
                    productList.clear();
                    productList.addAll(products);
                    adapter.notifyDataSetChanged();

                    if (productList.isEmpty()) {
                        tvEmpty.setVisibility(View.VISIBLE);
                        tvEmpty.setText("No products found");
                    }
                } else {
                    tvEmpty.setVisibility(View.VISIBLE);
                    tvEmpty.setText("Failed to load products");
                    Toast.makeText(requireContext(), "Error loading products", Toast.LENGTH_SHORT).show();
                }
            });
        });
    }

    @Override
    public void onProductClick(Product product) {
        Intent intent = new Intent(requireContext(), ProductDetailsActivity.class);
        intent.putExtra("product_id", product.getId());
        startActivity(intent);
    }
}
