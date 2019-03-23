//
//  LocationManager.swift
//  zy
//
//  Created by Kagan Cenan on 8.05.2018.
//  Copyright © 2018 zamanimyok. All rights reserved.
//

import UIKit
import CoreLocation
import MapKit

class LocationManager: NSObject, CLLocationManagerDelegate {
    
    static let shared: LocationManager = LocationManager()
    var locationManager: CLLocationManager!
    
    var currentLocation: CLLocation?{
        didSet{
           print(currentLocation)
        }
    }
    
    private override init() {
        super.init()
        locationManager = CLLocationManager()
        setConfiguration()
    }
    
    func setConfiguration(){
        locationManager.desiredAccuracy = kCLLocationAccuracyBest
        locationManager.requestAlwaysAuthorization()
        locationManager.distanceFilter = 50
        locationManager.startUpdatingLocation()
        locationManager.delegate = self
    }
    func checkLocationPermission() -> CLAuthorizationStatus{
        return CLLocationManager.authorizationStatus()/*
         switch CLLocationManager.authorizationStatus() {
         case .restricted, .denied, .notDetermined: return false
         case .authorizedAlways: return true
         case .authorizedWhenInUse: return true
         }*/
    }

    func isLocationManagerStatusOK() -> Bool{
        
        if CLLocationManager.locationServicesEnabled() {
            switch CLLocationManager.authorizationStatus() {
            case .notDetermined, .restricted, .denied:
                return false
            case .authorizedAlways, .authorizedWhenInUse:
                return true
            }
        } else {
            return false
        }
        
    }
    
    // Handle incoming location events.
    func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
        if let location = locations.last {
            currentLocation = location
//            getOtherUsersLocation(currentLocation: CLLocationCoordinate2D(latitude: (currentLocation?.coordinate.latitude)!, longitude: (currentLocation?.coordinate.longitude)!))
//            locationManager.stopUpdatingLocation()
            //sendUserLocation()
        }
    }
    
    func startUpdatingUserLocation(){
        locationManager.startUpdatingLocation()
    }
    
    // Handle authorization for the location manager.
    func locationManager(_ manager: CLLocationManager, didChangeAuthorization status: CLAuthorizationStatus) {
        switch status {
        case .restricted:
            print("Location access was restricted.")
        case .denied:
            print("User denied access to location.")
        case .notDetermined:
            print("Location status not determined.")
        case .authorizedAlways: fallthrough
        case .authorizedWhenInUse:
            locationManager.startUpdatingLocation()
        }
    }
    
    func locationManager(_ manager: CLLocationManager, didFailWithError error: Error) {
        locationManager.stopUpdatingLocation()
        print("Error: \(error)")
    }
    
    
    
}
