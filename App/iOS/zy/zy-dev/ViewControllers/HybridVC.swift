//
//  ViewController.swift
//  zy
//
//  Created by Erhan Emre Eroğlu on 7.04.2018.
//  Copyright © 2018 zamanimyok. All rights reserved.
//

import UIKit
import WebKit

class HybridVC: UIViewController, UIWebViewDelegate, WKUIDelegate, WKScriptMessageHandler {
    
    @IBOutlet weak var v: UIView!
    
    var webview: WKWebView!;
    
    override func viewDidLoad() {
        
        super.viewDidLoad()

        VC.hybridVC = self
        var request = URLRequest(url: URL (string: VC.app!)!);
        request.cachePolicy = URLRequest.CachePolicy.returnCacheDataElseLoad;
        
        self.webview = WKWebView(frame: CGRect(x: 0, y: 20, width: UIScreen.main.bounds.width, height: UIScreen.main.bounds.height - 20));
        self.view.addSubview(webview)
        self.view.bringSubview(toFront: v)
        
        self.webview.scrollView.isScrollEnabled = true;
        self.webview.scrollView.bounces = false;
        self.webview.scrollView.delaysContentTouches = false;
        self.webview.allowsBackForwardNavigationGestures = false;

        if #available(iOS 11.0, *) {
            self.webview.scrollView.contentInsetAdjustmentBehavior = .never
        }
        
        self.webview.configuration.userContentController.add(self, name: "JSInterface");
        
        self.webview.load(request);
        
        LocationManager.shared.startUpdatingUserLocation();

    }
    
    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
       
        if let body = message.body as? String {
            
            if (body.contains("log: ")) {
                print(body)
            } else if (body == "onload") {
                removeSplash()
            } else if (body == "hybrid") {
                
                VC.photoListVC?.navigationController?.popToRootViewController(animated: false)
                VC.photoListVC?.dismiss(animated: true, completion: {
                    VC.reset()
                })
                
            } else if (body == "location") {
                
                let location = LocationManager.shared.currentLocation;
                
                if (location == nil) {
                
                    self.webview.evaluateJavaScript("$bridge.js.location(0, 0);", completionHandler: nil);
                    
                } else {
                    
                    let lat = location?.coordinate.latitude;
                    let long = location?.coordinate.longitude;
                    
                    self.webview.evaluateJavaScript("$bridge.js.location('\(lat!)','\(long!)');", completionHandler: nil);
                    
                }
                
            } else if (body.contains("photoshoot: ")) {
                
                if let photolist = VC.photoListVC {
                    
                    let query = body.components(separatedBy: " ")[1]
                    
                    let first = query.components(separatedBy: "&")[0]
                    let second = query.components(separatedBy: "&")[1]
                    let third = query.components(separatedBy: "&")[2]
                    let fourth = query.components(separatedBy: "&")[3]
                    
                    VC.key = first.components(separatedBy: "=")[1]
                    VC.reservationFk = Int(second.components(separatedBy: "=")[1])
                    VC.stateFk = Int(third.components(separatedBy: "=")[1])
                    VC.typeFk = Int(fourth.components(separatedBy: "=")[1])
                    
                    VC.nav.present(photolist, animated: true, completion: nil)
                    
                }
                
            } else if (body.contains("setDeviceVariable: ")) {

                let query = body.components(separatedBy: " ")[1]
                let key = query.components(separatedBy: "=")[0]
                let value = query.components(separatedBy: "=")[1]
                    
                UserDefaults.standard.set(value, forKey: key)
                
            } else if (body.contains("getDeviceVariable: ")) {
                
                let key = body.components(separatedBy: " ")[1]
                var value : String = ""
                if let curValue = UserDefaults.standard.object(forKey: key) as? String{
                    value = curValue
                }

                self.webview.evaluateJavaScript("$bridge.js.deviceVariableFor('\(key)','\(value)');", completionHandler: nil);
                
            }
            
        }
        
    }
    
    func onPhotoshootFinished() {
        self.webview.evaluateJavaScript("$bridge.js.onPhotoshootFinished();", completionHandler: nil);
    }
    
    func cleanWebCache() {
        
        HTTPCookieStorage.shared.removeCookies(since: Date.distantPast);
        
        WKWebsiteDataStore.default().fetchDataRecords(ofTypes: WKWebsiteDataStore.allWebsiteDataTypes()) { records in
            records.forEach { record in
                WKWebsiteDataStore.default().removeData(ofTypes: record.dataTypes, for: [record], completionHandler: {});
            }
        }
        
    }
    
    func removeSplash() {
        
        UIView.animate(withDuration: 0.5, delay: 0, options: [], animations: {
            self.v.alpha = 0;
        }, completion: { (finished: Bool) in
            self.v.removeFromSuperview()
        })
        
    }
    
}

