package com.computershop.app.fragments;

import android.content.Intent;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.computershop.app.R;
import com.computershop.app.activities.MainActivity;
import com.computershop.app.activities.ProductDetailsActivity;
import com.computershop.app.adapters.CategoryAdapter;
import com.computershop.app.database.DatabaseHelper;
import com.computershop.app.utils.SessionManager;

import java.util.Arrays;
import java.util.List;

public class HomeFragment extends Fragment implements CategoryAdapter.OnCategoryClickListener {

    private SessionManager sessionManager;
    private DatabaseHelper dbHelper;
    private TextView tvWelcome;
    private Button btnShopNow, btnViewProducts, btnViewCart;
    private RecyclerView recyclerCategories;
    private CategoryAdapter categoryAdapter;
    private List<String> categories;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_home, container, false);

        sessionManager = new SessionManager(requireContext());
        dbHelper = new DatabaseHelper(requireContext());

        tvWelcome = view.findViewById(R.id.tv_welcome);
        btnShopNow = view.findViewById(R.id.btn_shop_now);
        btnViewProducts = view.findViewById(R.id.btn_view_products);
        btnViewCart = view.findViewById(R.id.btn_view_cart);
        recyclerCategories = view.findViewById(R.id.recycler_categories);

        if (sessionManager.isLoggedIn()) {
            tvWelcome.setText("Welcome, " + sessionManager.getFirstName() + "!");
        } else {
            tvWelcome.setText("Welcome to Computer Shop!");
        }

        // Setup categories
        categories = Arrays.asList("CPU", "GPU", "RAM", "Keyboard", "Mouse", "Motherboard", "Monitor", "Headset", "Gaming Chair", "Mouse Pad", "Table");
        categoryAdapter = new CategoryAdapter(categories, this);
        recyclerCategories.setLayoutManager(new LinearLayoutManager(requireContext(), LinearLayoutManager.HORIZONTAL, false));
        recyclerCategories.setAdapter(categoryAdapter);

        btnShopNow.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Switch to products tab
                if (getActivity() != null) {
                    ((MainActivity) getActivity()).getBottomNavigationView().setSelectedItemId(R.id.nav_products);
                }
            }
        });

        btnViewProducts.setOnClickListener(v -> {
            if (getActivity() != null) {
                ((MainActivity) getActivity()).getBottomNavigationView().setSelectedItemId(R.id.nav_products);
            }
        });

        btnViewCart.setOnClickListener(v -> {
            if (getActivity() != null) {
                ((MainActivity) getActivity()).getBottomNavigationView().setSelectedItemId(R.id.nav_cart);
            }
        });

        // Top sold grid clicks -> open product details for a product from that category
        setupTopSoldGridClicks(view);

        return view;
    }

    private void setupTopSoldGridClicks(@NonNull View root) {
        // IDs are defined in fragment_home.xml (the grid cards)
        View cardCpu = root.findViewById(R.id.card_cpu);
        View cardGpu = root.findViewById(R.id.card_gpu);
        View cardRam = root.findViewById(R.id.card_ram);
        View cardKeyboard = root.findViewById(R.id.card_keyboard);
        View cardMouse = root.findViewById(R.id.card_mouse);
        View cardMotherboard = root.findViewById(R.id.card_motherboard);
        View cardMonitor = root.findViewById(R.id.card_monitor);
        View cardHeadset = root.findViewById(R.id.card_headset);
        View cardChair = root.findViewById(R.id.card_gaming_chair);
        View cardMousePad = root.findViewById(R.id.card_mouse_pad);
        View cardTable = root.findViewById(R.id.card_table);

        if (cardCpu != null) cardCpu.setOnClickListener(v -> openTopProductDetails("cpu"));
        if (cardGpu != null) cardGpu.setOnClickListener(v -> openTopProductDetails("gpu"));
        if (cardRam != null) cardRam.setOnClickListener(v -> openTopProductDetails("ram"));
        if (cardKeyboard != null) cardKeyboard.setOnClickListener(v -> openTopProductDetails("keyboard"));
        if (cardMouse != null) cardMouse.setOnClickListener(v -> openTopProductDetails("mouse"));
        if (cardMotherboard != null) cardMotherboard.setOnClickListener(v -> openTopProductDetails("motherboard"));
        if (cardMonitor != null) cardMonitor.setOnClickListener(v -> openTopProductDetails("monitor"));
        if (cardHeadset != null) cardHeadset.setOnClickListener(v -> openTopProductDetails("headset"));
        if (cardChair != null) cardChair.setOnClickListener(v -> openTopProductDetails("gaming chair"));
        if (cardMousePad != null) cardMousePad.setOnClickListener(v -> openTopProductDetails("mouse pad"));
        if (cardTable != null) cardTable.setOnClickListener(v -> openTopProductDetails("table"));
    }

    private void openTopProductDetails(@NonNull String category) {
        Integer productId = dbHelper.getFirstProductIdByCategory(category);
        if (productId == null) {
            Toast.makeText(requireContext(), "No product found for " + category, Toast.LENGTH_SHORT).show();
            return;
        }
        Intent intent = new Intent(requireContext(), ProductDetailsActivity.class);
        intent.putExtra(ProductDetailsActivity.EXTRA_PRODUCT_ID, productId);
        startActivity(intent);
    }

    @Override
    public void onCategoryClick(String category) {
        // Switch to products tab and set category
        if (getActivity() != null) {
            ((MainActivity) getActivity()).getBottomNavigationView().setSelectedItemId(R.id.nav_products);
            // Pass category to ProductsFragment
            Bundle bundle = new Bundle();
            bundle.putString("selected_category", category.toLowerCase());
            ProductsFragment productsFragment = new ProductsFragment();
            productsFragment.setArguments(bundle);
            getActivity().getSupportFragmentManager().beginTransaction()
                    .replace(R.id.fragment_container, productsFragment)
                    .commit();
        }
    }
}
