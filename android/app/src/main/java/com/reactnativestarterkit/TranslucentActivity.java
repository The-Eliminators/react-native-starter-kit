package com.reactnativestarterkit;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;

public class TranslucentActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(null);
        Intent intent = new Intent(this, MainActivity.class);
        startActivity(intent);
        finish();
    }
}