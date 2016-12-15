package com.example.gps.emitter;
//import com.example.gps.emitter.*;

import android.os.Bundle;
import android.content.Intent;
import android.content.SharedPreferences;
import android.preference.*;

public class Settings extends PreferenceActivity {
    private SharedPreferences app_preferences;
    private Preference.OnPreferenceChangeListener Listener;
    private Preference settings_address, settings_port, settings_serial;
    public static final String PREFS_NAME = "GPS_Emitter";
    @Override
    protected void onCreate(Bundle savedInstanceState) {
    	Listener = new Preference.OnPreferenceChangeListener() {
			public boolean onPreferenceChange(Preference preference, Object newValue) { 
				//couldn't be any easier.
				SharedPreferences.Editor editor = preference.getEditor();
				editor.putString( preference.getKey(), newValue.toString() );
				editor.commit();
				EditTextPreference textPref = (EditTextPreference) preference;
				textPref.setText( newValue.toString() );
				stopService(new Intent(Settings.this, GPSService.class));
				startService(new Intent(Settings.this, GPSService.class));
		        return false;
			}
		};
		
        super.onCreate(savedInstanceState);
        addPreferencesFromResource(R.layout.settings);        
        app_preferences = PreferenceManager.getDefaultSharedPreferences(this);
        
        settings_address = findPreference("settings_address");
        settings_port = findPreference("settings_port");
        settings_serial = findPreference("settings_serial");
        settings_address.setOnPreferenceChangeListener( Listener );
        settings_port.setOnPreferenceChangeListener( Listener );
        settings_serial.setOnPreferenceChangeListener( Listener );
    }
    
    @Override
    protected void onResume(){
    	super.onResume();
    }
    
    @Override 
    protected void onPause(){
        super.onPause();
    }
    
    @Override
    protected void onStop(){
    	super.onStop();
    }
    
    @Override
    protected void onDestroy(){
    	super.onDestroy();
    }
}