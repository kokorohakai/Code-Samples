package com.example.gps.emitter;

import android.preference.*;
import android.content.SharedPreferences;
import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.os.Bundle;
import android.widget.*;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;

public class MainActivity extends Activity {
    private SharedPreferences app_preferences;
	private LocationManager myLocationManager;
	private LocationListener myLocationListener;
	private TextView myLatitude, myLongitude, connected, myDebug;
	private String app_address, app_port;
	
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        startService(new Intent(this, GPSService.class));
        
        setContentView(R.layout.activity_main);
        myLatitude = (TextView)findViewById(R.id.latitude);
        myLongitude = (TextView)findViewById(R.id.longitude);
        myDebug = (TextView)findViewById(R.id.myDebug);
        connected = (TextView)findViewById(R.id.connected);
        if (myLocationManager == null){
        	myLocationManager = (LocationManager)this.getSystemService( Context.LOCATION_SERVICE );
        }
        if (myLocationListener == null ) {
	        myLocationListener = new LocationListener() {
	        	public void onLocationChanged( Location argLocation ) {
	        		if (app_address.length() < 1 || app_port.length() < 1){
	        			myDebug.setText("Please specify an address and port in the settings menu.");
		        		myLatitude.setText( "(none)" );
		        		myLongitude.setText( "(none)" );
	        			return;
	        		}
	        		myLatitude.setText(String.valueOf(argLocation.getLatitude()));
	        		myLongitude.setText(String.valueOf(argLocation.getLongitude()));
	                myDebug.setText("");
	        	}
	        	public void onProviderDisabled(String provider) {
	        		myDebug.setText("Please turn on GPS radio.");
	        	}
	        	public void onProviderEnabled(String provider) {
	        		myLatitude.setText( " Waiting..." );
	        		myLongitude.setText( " Waiting..." );
	        		myDebug.setText("Waiting for GPS radio.");
	        	}
	        	public void onStatusChanged(String provider, int status, Bundle extras) { }
			};
        }
        
        myLocationManager.requestLocationUpdates( LocationManager.GPS_PROVIDER, 0, 0, myLocationListener);
        
      	app_preferences = PreferenceManager.getDefaultSharedPreferences(this);
        app_address = app_preferences.getString("settings_address", "localhost");
        app_port = app_preferences.getString("settings_port", "5558");
        if ( app_address.length() > 0 && app_port.length() > 0 ) {
        	connected.setText( app_address.concat(":").concat(app_port));
        } else {
        	connected.setText("");
        }
        
		//Set the default text.
        myLatitude.setText( " Waiting..." );
		myLongitude.setText( " Waiting..." );
		myDebug.setText("Waiting for GPS radio.");
    }

    @Override
    public void onDestroy() {
    	super.onDestroy();
    	if (myLocationManager != null && myLocationListener != null){
    		myLocationManager.removeUpdates(myLocationListener);
    	}
        app_preferences = null;
    	myLocationManager = null;
    	myLocationListener = null;
    }
    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.activity_main, menu);
        return true;
    }
    
    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
    	switch(item.getItemId()) {
    		case R.id.menu_settings_option:
    			startActivity( new Intent(MainActivity.this, Settings.class) );   			
    			return true;
    	    default:
    	        return super.onOptionsItemSelected(item);
    	}
    }
}