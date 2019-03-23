//
//  AppDelegate.swift
//  zy
//
//  Created by Erhan Emre Eroğlu on 7.04.2018.
//  Copyright © 2018 zamanimyok. All rights reserved.
//

import UIKit
import WebKit

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {
    
    var window: UIWindow?
    
    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey: Any]?) -> Bool {

        self.window = VC.start(win: UIWindow(frame: UIScreen.main.bounds))
        
        return true
        
    }
    
}

