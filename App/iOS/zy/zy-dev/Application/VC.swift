//
//  VC.swift
//  zy
//
//  Created by Erhan Emre Eroğlu on 10.05.2018.
//  Copyright © 2018 zamanimyok. All rights reserved.
//

import UIKit

class VC: NSObject {
    
    static var window : UIWindow?
    
    static var mainStoryboard: UIStoryboard!
    static var photoshootStoryboard: UIStoryboard!
    
    static var hybridVC: HybridVC?
    static var photoListVC: PhotoListVC?
    
    static var nav: UINavigationController!
    
    static var app: String?
    static var api: String?
    
    static var key: String?
    static var reservationFk: Int?
    static var stateFk: Int?
    static var typeFk: Int?
    
    static func start(win: UIWindow?) -> UIWindow? {
        
        window = win
        
        mainStoryboard = UIStoryboard(name: "Main", bundle: nil)
        photoshootStoryboard = UIStoryboard(name: "Photoshoot", bundle: nil)
       
        hybridVC = mainStoryboard.instantiateViewController(withIdentifier: "Hybrid") as? HybridVC
        photoListVC = photoshootStoryboard.instantiateViewController(withIdentifier: "PhotoList") as? PhotoListVC
        
        nav = UINavigationController(rootViewController: hybridVC!)
        nav.navigationBar.isHidden = true
        
        app = "https://app.zamanimyok.com"
        //app = "https://test-app-zamanimyok.azurewebsites.net"
        //app = "https://app-zamanimyok.azurewebsites.net"
        
        api = "https://api.zamanimyok.com"
        //api = "https://test-api-zamanimyok.azurewebsites.net"
        //api = "https://api-zamanimyok.azurewebsites.net"
        
        window?.rootViewController = nav
        
        return window
        
    }
    
    static func reset() {
        
        photoListVC = photoshootStoryboard.instantiateViewController(withIdentifier: "PhotoList") as? PhotoListVC
        
    }
    
}
