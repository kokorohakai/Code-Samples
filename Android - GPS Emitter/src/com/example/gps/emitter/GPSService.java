package com.example.gps.emitter;

import java.io.IOException;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;
import java.net.SocketException;
import java.net.UnknownHostException;

import org.json.JSONException;
import org.json.JSONObject;

import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.os.Bundle;
import android.os.IBinder;
import android.preference.PreferenceManager;
import android.util.Log;


public class GPSService extends Service {
    private SharedPreferences app_preferences;
	private LocationManager myLocationManager;
	private LocationListener myLocationListener;
	private DatagramSocket socket;
	private InetAddress IPAddress;
	private String app_address, app_port, app_serial;
	
	public boolean hasStarted;
	@Override
	public IBinder onBind(Intent intent) {
		return null;
	}
	
	@Override
	public void onStart( Intent intent, int startid){
		if (hasStarted == false){
	        if (myLocationManager == null){
	        	myLocationManager = (LocationManager)this.getSystemService( Context.LOCATION_SERVICE );
	        }
	        if (myLocationListener == null ) {
		        myLocationListener = new LocationListener() {
		        	public DatagramPacket out;
		        	public void onLocationChanged( Location argLocation ) {
		        		if (app_address.length() < 1 || app_port.length() < 1){
		        			return;
		        		}
		        		try {
		        			socket = new DatagramSocket();
		        		} catch (SocketException e) {
		        			//Log.i(null,"Failed to create socket.");
		        			return;
		        		}
						try {
							IPAddress = InetAddress.getByName( app_address );
						} catch (UnknownHostException e) {
							//Log.i(null,"Failed to obtain IP.");
							return;
						}		
		        		
		        		JSONObject myData = new JSONObject();
		        		try {
		        			String lat = String.valueOf(argLocation.getLatitude());
		        			if ( lat.length() > 12 ) lat = lat.substring(0,8);
		        			String lng = String.valueOf(argLocation.getLongitude());
		        			if ( lng.length() > 12 ) lng = lng.substring(0,8);
		        			String hed = String.valueOf(argLocation.getBearing());
		        			if ( hed.length() > 12 ) hed = hed.substring(0,8);
		        			
							myData.put("lat", lat );
			        		myData.put("lng", lng );
			        		myData.put("spd", argLocation.getSpeed() );
			        		myData.put("hed", hed );
			        		myData.put("key", app_serial );
			        		//myData.put("time", argLocation.getTime() );
						} catch (JSONException e1) {
							e1.printStackTrace();
						} 
		        		
		        		byte[] outData = myData.toString().getBytes(); 
		        		int port = 0;
		        		try {
		        			port = Integer.parseInt(app_port); 
		        		} catch(NumberFormatException e) {
		        			port = 0;
		        		}
		        		out = new DatagramPacket(outData,outData.length, IPAddress, port);
		                try {
							socket.send(out);
						} catch (IOException e) {
						}
		                socket.close();
		        	}
		        	public void onProviderDisabled(String provider) { }
		        	public void onProviderEnabled(String provider) { }
		        	public void onStatusChanged(String provider, int status, Bundle extras) { }
				};
	        }
	        
	        myLocationManager.requestLocationUpdates( LocationManager.GPS_PROVIDER, 0, 0, myLocationListener);
	        
	      	app_preferences = PreferenceManager.getDefaultSharedPreferences(this);
	        app_address = app_preferences.getString("settings_address", "localhost");
	        app_port = app_preferences.getString("settings_port", "5558");
	        app_serial = app_preferences.getString("settings_serial", "");
	        
			hasStarted = true;
		}
		
	}
	
	@Override
	public void onDestroy(){
    	if (myLocationManager != null && myLocationListener != null){
    		myLocationManager.removeUpdates(myLocationListener);
    	}
        app_preferences = null;
    	myLocationManager = null;
    	myLocationListener = null;
	}
}
