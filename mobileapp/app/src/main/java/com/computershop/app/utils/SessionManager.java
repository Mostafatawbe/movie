package com.computershop.app.utils;

import android.content.Context;
import android.content.SharedPreferences;

public class SessionManager {
    private SharedPreferences prefs;
    private SharedPreferences.Editor editor;
    private Context context;

    public SessionManager(Context context) {
        this.context = context;
        prefs = context.getSharedPreferences(Constants.PREF_NAME, Context.MODE_PRIVATE);
        editor = prefs.edit();
    }

    public void createLoginSession(int userId, String username, String firstName, String lastName, String email, boolean isAdmin) {
        editor.putBoolean(Constants.KEY_IS_LOGGED_IN, true);
        editor.putInt(Constants.KEY_USER_ID, userId);
        editor.putString(Constants.KEY_USERNAME, username);
        editor.putString(Constants.KEY_FIRST_NAME, firstName);
        editor.putString(Constants.KEY_LAST_NAME, lastName);
        editor.putString(Constants.KEY_EMAIL, email);
        editor.putBoolean(Constants.KEY_IS_ADMIN, isAdmin);
        editor.commit();
    }

    public boolean isLoggedIn() {
        return prefs.getBoolean(Constants.KEY_IS_LOGGED_IN, false);
    }

    public int getUserId() {
        return prefs.getInt(Constants.KEY_USER_ID, -1);
    }

    public String getUsername() {
        return prefs.getString(Constants.KEY_USERNAME, "");
    }

    public String getFirstName() {
        return prefs.getString(Constants.KEY_FIRST_NAME, "");
    }

    public String getLastName() {
        return prefs.getString(Constants.KEY_LAST_NAME, "");
    }

    public String getEmail() {
        return prefs.getString(Constants.KEY_EMAIL, "");
    }

    public boolean isAdmin() {
        return prefs.getBoolean(Constants.KEY_IS_ADMIN, false);
    }

    public void logout() {
        editor.clear();
        editor.commit();
    }
}
