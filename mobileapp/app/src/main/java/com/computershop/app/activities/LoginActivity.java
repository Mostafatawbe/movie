package com.computershop.app.activities;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.ProgressBar;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;
import com.computershop.app.R;
import com.computershop.app.network.ApiClient;
import com.computershop.app.utils.SessionManager;
import com.google.android.material.textfield.TextInputEditText;
import org.json.JSONException;
import org.json.JSONObject;

public class LoginActivity extends AppCompatActivity {
    
    private TextInputEditText etUsername, etPassword;
    private Button btnLogin, btnSignup;
    private ProgressBar progressBar;
    private ApiClient apiClient;
    private SessionManager sessionManager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        // Initialize views
        etUsername = findViewById(R.id.etUsername);
        etPassword = findViewById(R.id.etPassword);
        btnLogin = findViewById(R.id.btnLogin);
        btnSignup = findViewById(R.id.btnSignup);
        progressBar = findViewById(R.id.progressBar);

        apiClient = new ApiClient(this);
        sessionManager = new SessionManager(this);

        // Check if already logged in
        if (sessionManager.isLoggedIn()) {
            if (sessionManager.isAdmin()) {
                navigateToAdminPanel();
            } else {
                navigateToMain();
            }
            return;
        }

        btnLogin.setOnClickListener(v -> attemptLogin());
        
        btnSignup.setOnClickListener(v -> {
            startActivity(new Intent(LoginActivity.this, SignupActivity.class));
        });
    }

    private void attemptLogin() {
        String username = etUsername.getText().toString().trim();
        String password = etPassword.getText().toString().trim();

        if (username.isEmpty()) {
            etUsername.setError("Username is required");
            etUsername.requestFocus();
            return;
        }

        if (password.isEmpty()) {
            etPassword.setError("Password is required");
            etPassword.requestFocus();
            return;
        }

        setLoading(true);

        apiClient.login(username, password, new ApiClient.ApiCallback() {
            @Override
            public void onSuccess(JSONObject response) {
                setLoading(false);
                try {
                    JSONObject userData = response.getJSONObject("data");
                    boolean isAdmin = userData.optInt("is_admin", 0) == 1;
                    
                    // Save user session
                    sessionManager.createLoginSession(
                        userData.getInt("aid"),
                        userData.getString("username"),
                        userData.getString("afname"),
                        userData.getString("alname"),
                        userData.getString("email"),
                        isAdmin
                    );

                    Toast.makeText(LoginActivity.this, "Login successful!", Toast.LENGTH_SHORT).show();
                    
                    // Redirect based on user role
                    if (isAdmin) {
                        navigateToAdminPanel();
                    } else {
                        navigateToMain();
                    }

                } catch (JSONException e) {
                    e.printStackTrace();
                    Toast.makeText(LoginActivity.this, "Error parsing response", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onError(String error) {
                setLoading(false);
                Toast.makeText(LoginActivity.this, error, Toast.LENGTH_LONG).show();
            }
        });
    }

    private void setLoading(boolean loading) {
        progressBar.setVisibility(loading ? View.VISIBLE : View.GONE);
        btnLogin.setEnabled(!loading);
        btnSignup.setEnabled(!loading);
        etUsername.setEnabled(!loading);
        etPassword.setEnabled(!loading);
    }

    private void navigateToMain() {
        Intent intent = new Intent(LoginActivity.this, MainActivity.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
        startActivity(intent);
        finish();
    }

    private void navigateToAdminPanel() {
        Intent intent = new Intent(LoginActivity.this, AdminPanelActivity.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
        startActivity(intent);
        finish();
    }
}
