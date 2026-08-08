package com.computershop.app.activities;

import android.app.DatePickerDialog;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.DatePicker;
import android.widget.ProgressBar;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;
import com.computershop.app.R;
import com.computershop.app.network.ApiClient;
import com.google.android.material.textfield.TextInputEditText;
import org.json.JSONObject;
import java.util.Calendar;

public class SignupActivity extends AppCompatActivity {
    
    private TextInputEditText etFirstName, etLastName, etPhone, etEmail, etDob, etUsername, etPassword;
    private RadioGroup rgGender;
    private Button btnSignup, btnBackToLogin;
    private ProgressBar progressBar;
    private ApiClient apiClient;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_signup);

        // Initialize views
        etFirstName = findViewById(R.id.etFirstName);
        etLastName = findViewById(R.id.etLastName);
        etPhone = findViewById(R.id.etPhone);
        etEmail = findViewById(R.id.etEmail);
        etDob = findViewById(R.id.etDob);
        etUsername = findViewById(R.id.etUsername);
        etPassword = findViewById(R.id.etPassword);
        rgGender = findViewById(R.id.rgGender);
        btnSignup = findViewById(R.id.btnSignup);
        btnBackToLogin = findViewById(R.id.btnBackToLogin);
        progressBar = findViewById(R.id.progressBar);

        apiClient = new ApiClient(this);

        // Set up date picker for DOB
        etDob.setOnClickListener(v -> showDatePickerDialog());
        etDob.setFocusable(false);
        etDob.setClickable(true);

        btnSignup.setOnClickListener(v -> attemptSignup());
        btnBackToLogin.setOnClickListener(v -> finish());
    }

    private void attemptSignup() {
        String firstName = etFirstName.getText().toString().trim();
        String lastName = etLastName.getText().toString().trim();
        String phone = etPhone.getText().toString().trim();
        String email = etEmail.getText().toString().trim();
        String dob = etDob.getText().toString().trim();
        String username = etUsername.getText().toString().trim();
        String password = etPassword.getText().toString().trim();
        
        int selectedGenderId = rgGender.getCheckedRadioButtonId();
        if (selectedGenderId == -1) {
            Toast.makeText(this, "Please select gender", Toast.LENGTH_SHORT).show();
            return;
        }
        RadioButton selectedGender = findViewById(selectedGenderId);
        String gender = selectedGender.getText().toString();

        // Validation
        if (firstName.isEmpty()) {
            etFirstName.setError("First name is required");
            etFirstName.requestFocus();
            return;
        }

        if (lastName.isEmpty()) {
            etLastName.setError("Last name is required");
            etLastName.requestFocus();
            return;
        }

        if (phone.isEmpty()) {
            etPhone.setError("Phone is required");
            etPhone.requestFocus();
            return;
        }

        if (email.isEmpty() || !android.util.Patterns.EMAIL_ADDRESS.matcher(email).matches()) {
            etEmail.setError("Valid email is required");
            etEmail.requestFocus();
            return;
        }

        if (dob.isEmpty()) {
            etDob.setError("Date of birth is required");
            etDob.requestFocus();
            return;
        }

        if (username.isEmpty() || username.length() < 4) {
            etUsername.setError("Username must be at least 4 characters");
            etUsername.requestFocus();
            return;
        }

        if (password.isEmpty() || password.length() < 6) {
            etPassword.setError("Password must be at least 6 characters");
            etPassword.requestFocus();
            return;
        }

        setLoading(true);

        apiClient.signup(firstName, lastName, phone, email, dob, username, gender, password, 
            new ApiClient.ApiCallback() {
                @Override
                public void onSuccess(JSONObject response) {
                    setLoading(false);
                    Toast.makeText(SignupActivity.this, "Registration successful! Please login.", Toast.LENGTH_LONG).show();
                    finish();
                }

                @Override
                public void onError(String error) {
                    setLoading(false);
                    Toast.makeText(SignupActivity.this, error, Toast.LENGTH_LONG).show();
                }
            });
    }

    private void showDatePickerDialog() {
        final Calendar calendar = Calendar.getInstance();
        int year = calendar.get(Calendar.YEAR);
        int month = calendar.get(Calendar.MONTH);
        int day = calendar.get(Calendar.DAY_OF_MONTH);

        DatePickerDialog datePickerDialog = new DatePickerDialog(
            this,
            (view, selectedYear, selectedMonth, selectedDay) -> {
                String selectedDate = selectedYear + "-" + 
                    String.format("%02d", (selectedMonth + 1)) + "-" + 
                    String.format("%02d", selectedDay);
                etDob.setText(selectedDate);
            },
            year, month, day);
        
        datePickerDialog.show();
    }

    private void setLoading(boolean loading) {
        progressBar.setVisibility(loading ? View.VISIBLE : View.GONE);
        btnSignup.setEnabled(!loading);
        btnBackToLogin.setEnabled(!loading);
    }
}
