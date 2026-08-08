package com.computershop.app.activities;

import android.content.Intent;
import android.os.Bundle;
import android.view.MenuItem;
import android.view.View;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.appcompat.app.ActionBarDrawerToggle;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import androidx.core.view.GravityCompat;
import androidx.drawerlayout.widget.DrawerLayout;
import androidx.fragment.app.Fragment;

import com.computershop.app.R;
import com.computershop.app.fragments.CartFragment;
import com.computershop.app.fragments.HomeFragment;
import com.computershop.app.fragments.ProductsFragment;
import com.computershop.app.fragments.ProfileFragment;
import com.computershop.app.fragments.WishlistFragment;
import com.computershop.app.utils.SessionManager;
import com.google.android.material.bottomnavigation.BottomNavigationView;
import com.google.android.material.navigation.NavigationView;

public class MainActivity extends AppCompatActivity implements NavigationView.OnNavigationItemSelectedListener {
    
    private DrawerLayout drawerLayout;
    private NavigationView navigationView;
    private BottomNavigationView bottomNavigationView;
    private SessionManager sessionManager;
    private ActionBarDrawerToggle toggle;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        sessionManager = new SessionManager(this);

        // Setup toolbar
        Toolbar toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        if (getSupportActionBar() != null) {
            getSupportActionBar().setTitle("Computer Shop");
        }

        // Setup drawer
        drawerLayout = findViewById(R.id.drawer_layout);
        navigationView = findViewById(R.id.nav_view);
        navigationView.setNavigationItemSelectedListener(this);

        toggle = new ActionBarDrawerToggle(this, drawerLayout, toolbar,
                R.string.navigation_drawer_open, R.string.navigation_drawer_close);
        drawerLayout.addDrawerListener(toggle);
        toggle.syncState();

        // Update navigation header
        updateNavigationHeader();

        // Setup bottom navigation
        bottomNavigationView = findViewById(R.id.bottom_navigation);
        bottomNavigationView.setOnItemSelectedListener(new BottomNavigationView.OnItemSelectedListener() {
            @Override
            public boolean onNavigationItemSelected(@NonNull MenuItem item) {
                Fragment selectedFragment = null;
                
                int itemId = item.getItemId();
                if (itemId == R.id.nav_home) {
                    selectedFragment = new HomeFragment();
                } else if (itemId == R.id.nav_products) {
                    selectedFragment = new ProductsFragment();
                } else if (itemId == R.id.nav_cart) {
                    selectedFragment = new CartFragment();
                } else if (itemId == R.id.nav_profile) {
                    selectedFragment = new ProfileFragment();
                }

                if (selectedFragment != null) {
                    getSupportFragmentManager().beginTransaction()
                            .replace(R.id.fragment_container, selectedFragment)
                            .commit();
                }
                return true;
            }
        });

        // Load default fragment
        if (savedInstanceState == null) {
            bottomNavigationView.setSelectedItemId(R.id.nav_home);
        }
    }

    private void updateNavigationHeader() {
        View headerView = navigationView.getHeaderView(0);
        TextView navHeaderTitle = headerView.findViewById(R.id.nav_header_title);
        TextView navHeaderSubtitle = headerView.findViewById(R.id.nav_header_subtitle);

        if (sessionManager.isLoggedIn()) {
            navHeaderTitle.setText("Welcome, " + sessionManager.getFirstName());
            navHeaderSubtitle.setText(sessionManager.getEmail());
        } else {
            navHeaderTitle.setText("Computer Shop");
            navHeaderSubtitle.setText("Please login to continue");
        }

        // Show/hide login/logout
        MenuItem loginItem = navigationView.getMenu().findItem(R.id.nav_login);
        MenuItem logoutItem = navigationView.getMenu().findItem(R.id.nav_logout);

        if (sessionManager.isLoggedIn()) {
            loginItem.setVisible(false);
            logoutItem.setVisible(true);
        } else {
            loginItem.setVisible(true);
            logoutItem.setVisible(false);
        }
    }

    @Override
    public boolean onNavigationItemSelected(@NonNull MenuItem item) {
        int itemId = item.getItemId();
        Fragment selectedFragment = null;
        Intent intent = null;

        if (itemId == R.id.nav_home) {
            selectedFragment = new HomeFragment();
            bottomNavigationView.setSelectedItemId(R.id.nav_home);
        } else if (itemId == R.id.nav_products) {
            selectedFragment = new ProductsFragment();
            bottomNavigationView.setSelectedItemId(R.id.nav_products);
        } else if (itemId == R.id.nav_wishlist) {
            selectedFragment = new WishlistFragment();
        } else if (itemId == R.id.nav_cart) {
            selectedFragment = new CartFragment();
            bottomNavigationView.setSelectedItemId(R.id.nav_cart);
        } else if (itemId == R.id.nav_orders) {
            // Assuming there's an OrdersFragment or Activity
            // For now, just go to profile
            selectedFragment = new ProfileFragment();
            bottomNavigationView.setSelectedItemId(R.id.nav_profile);
        } else if (itemId == R.id.nav_profile) {
            selectedFragment = new ProfileFragment();
            bottomNavigationView.setSelectedItemId(R.id.nav_profile);
        } else if (itemId == R.id.nav_login) {
            intent = new Intent(this, LoginActivity.class);
        } else if (itemId == R.id.nav_logout) {
            sessionManager.logout();
            updateNavigationHeader();
            selectedFragment = new HomeFragment();
            bottomNavigationView.setSelectedItemId(R.id.nav_home);
        }

        if (selectedFragment != null) {
            getSupportFragmentManager().beginTransaction()
                    .replace(R.id.fragment_container, selectedFragment)
                    .commit();
        }

        if (intent != null) {
            startActivity(intent);
        }

        drawerLayout.closeDrawer(GravityCompat.START);
        return true;
    }

    @Override
    public void onBackPressed() {
        if (drawerLayout.isDrawerOpen(GravityCompat.START)) {
            drawerLayout.closeDrawer(GravityCompat.START);
        } else {
            super.onBackPressed();
        }
    }

    @Override
    protected void onResume() {
        super.onResume();
        updateNavigationHeader();
        // Refresh cart badge if needed
    }

    public BottomNavigationView getBottomNavigationView() {
        return bottomNavigationView;
    }
}
