app.factory("$platform", function($rootScope) {
        
    var $factory;
    
    var match, uuid;

    var userAgent = userAgent || navigator.userAgent;

    $factory = {
        "browser": {
            "name": null,
            "version": null
        },
        "cookies": null,
        "flash": {
            "version": null
        },
        "ip": null,
        "java": {
            "version": null
        },
        "os": {
            "name": null,
            "version": null
        },
        "screen": {
            "colors": null,
            "dppx": null,
            "height": null,
            "width": null
        },
        "scripts": true,
        "userAgent": userAgent,
        "viewport": {
            "height": null,
            "layout": {
                "height": null,
                "width": null
            },
            "width": null,
            "zoom": null
        },
        "websockets": null
    };


    // extract browser name from user agent
    if (userAgent.indexOf("Trident") >= 0 || userAgent.indexOf("MSIE") >= 0) {
        if (userAgent.indexOf("Mobile") >= 0) {
            $factory.browser.name = "IE Mobile";
        } else {
            $factory.browser.name = "Internet Explorer";
        }
    }

    if (userAgent.indexOf("Firefox") >= 0 && userAgent.indexOf("Seamonkey") === -1) {
        if (userAgent.indexOf("Android") >= 0) {
            $factory.browser.name = "Firefox for Android";
        } else {
            $factory.browser.name = "Firefox";
        }
    }

    if (userAgent.indexOf("Safari") >= 0 && userAgent.indexOf("Chrome") === -1 && userAgent.indexOf("Chromium") === -1 && userAgent.indexOf("Android") === -1) {
        if (userAgent.indexOf("CriOS") >= 0) {
            $factory.browser.name = "Chrome for iOS";
        } else if (userAgent.indexOf("FxiOS") >= 0) {
            $factory.browser.name = "Firefox for iOS";
        } else {
            $factory.browser.name = "Safari";
        }
    }

    if (userAgent.indexOf("Chrome") >= 0) {
        if (userAgent.match(/\bChrome\/[.0-9]* Mobile\b/)) {
            if (userAgent.match(/\bVersion\/\d+\.\d+\b/) || userAgent.match(/\bwv\b/)) {
                $factory.browser.name = "WebView on Android";
            } else {
                $factory.browser.name = "Chrome for Android";
            }
        } else {
            $factory.browser.name = "Chrome";
        }
    }

    if (userAgent.indexOf("Android") >= 0 && userAgent.indexOf("Chrome") === -1 && userAgent.indexOf("Chromium") === -1 && userAgent.indexOf("Trident") === -1 && userAgent.indexOf("Firefox") === -1) {
        $factory.browser.name = "Android Browser";
    }

    if (userAgent.indexOf("Edge") >= 0) {
        $factory.browser.name = "Edge";
    }

    if (userAgent.indexOf("UCBrowser") >= 0) {
        $factory.browser.name = "UC Browser for Android";
    }

    if (userAgent.indexOf("SamsungBrowser") >= 0) {
        $factory.browser.name = "Samsung Internet";
    }

    if (userAgent.indexOf("OPR") >= 0 || userAgent.indexOf("Opera") >= 0) {
        if (userAgent.indexOf("Opera Mini") >= 0) {
            $factory.browser.name = "Opera Mini";
        } else if (userAgent.indexOf("Opera Mobi") >= 0 || userAgent.indexOf("Opera Tablet") >= 0 || userAgent.indexOf("Mobile") >= 0) {
            $factory.browser.name = "Opera Mobile";
        } else {
            $factory.browser.name = "Opera";
        }
    }

    if (userAgent.indexOf("BB10") >= 0 || userAgent.indexOf("PlayBook") >= 0 || userAgent.indexOf("BlackBerry") >= 0) {
        $factory.browser.name = "BlackBerry";
    }


    // extract browser version number from user agent
    match = null;

    switch ($factory.browser.name) {
    case "Chrome":
    case "Chrome for Android":
    case "WebView on Android":
        match = userAgent.match(/Chrome\/((\d+\.)+\d+)/);
        break;
    case "Firefox":
    case "Firefox for Android":
        match = userAgent.match(/Firefox\/((\d+\.)+\d+)/);
        break;
    case "Firefox for iOS":
        match = userAgent.match(/FxiOS\/((\d+\.)+\d+)/);
        break;
    case "Edge":
    case "Internet Explorer":
    case "IE Mobile":

        if (userAgent.indexOf("Edge") >= 0) {
            match = userAgent.match(/Edge\/((\d+\.)+\d+)/);
        } else if (userAgent.indexOf("rv:11") >= 0) {
            match = userAgent.match(/rv:((\d+\.)+\d+)/);
        } else if (userAgent.indexOf("MSIE") >= 0) {
            match = userAgent.match(/MSIE\ ((\d+\.)+\d+)/);
        }

        break;
    case "Safari":
    case "Android Browser":
        match = userAgent.match(/Version\/((\d+\.)+\d+)/);
        break;
    case "UC Browser for Android":
        match = userAgent.match(/UCBrowser\/((\d+\.)+\d+)/);
        break;
    case "Samsung Internet":
        match = userAgent.match(/SamsungBrowser\/((\d+\.)+\d+)/);
        break;
    case "Opera Mini":
        match = userAgent.match(/Opera Mini\/((\d+\.)+\d+)/);
        break;
    case "Opera":
        if (userAgent.match(/OPR/)) {
            match = userAgent.match(/OPR\/((\d+\.)+\d+)/);
        } else if (userAgent.match(/Version/)) {
            match = userAgent.match(/Version\/((\d+\.)+\d+)/);
        } else {
            match = userAgent.match(/Opera\/((\d+\.)+\d+)/);
        }
        break;
    case "BlackBerry":
        match = userAgent.match(/Version\/((\d+\.)+\d+)/);
        break;
    default:
        match = userAgent.match(/\/((\d+\.)+\d+)$/);
        break;
    }

    if (match && match[1]) {
        $factory.browser.version = match[1];
    }

    // pull in browser window size from the visual viewport
    $factory.viewport.width = window.innerWidth || document.documentElement.clientWidth;
    $factory.viewport.height = window.innerHeight || document.documentElement.clientHeight;


    /*
        * test if Object.defineProperty function is fully supported
        */
    try {
        Object.defineProperty({}, "x", {});
        definePropertySupported = true;
    } catch (e) {
        definePropertySupported = false;
    }


    /*
        * helper function to safely log warning messages
        */
    /* eslint-disable no-console */
    function warning(msg) {
        if (window.console) {
            if (console.warn) {
                console.warn(msg);
            } else {
                console.log(msg);
            }
        }
    }
    /* eslint-enable no-console */

    // deprecate $factory.browser.size
    if (definePropertySupported) {
        Object.defineProperty($factory.browser, "size", {
            get: function () {
                warning("browser.size is deprecated; use viewport.width and viewport.height");
                return $factory.viewport.width + " x " + $factory.viewport.height;
            }
        });
    }

    // pull in raw values for layout viewport
    $factory.viewport.layout.width = document.documentElement.clientWidth;
    $factory.viewport.layout.height = document.documentElement.clientHeight;

    // define viewport zoom property
    $factory.viewport.zoom = $factory.viewport.layout.width / $factory.viewport.width;


    // are cookies enabled
    // can't trust this value (Microsoft Edge lies)
    // $factory.cookies = !!navigator.cookieEnabled;

    // truely check if cookies are enabled
    // generate UUID for cookie name
    uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
    uuid = uuid.replace(/[xy]/g, function (c) {
        var r, v;

        r = Math.random() * 16 | 0;
        v = c === "x"
            ? r
            : (r & 0x3 | 0x8);

        return v.toString(16);
    });
    document.cookie = uuid;

    if (document.cookie.indexOf(uuid) >= 0) {
        $factory.cookies = true;
    } else {
        $factory.cookies = false;
    }
    // delete temporoary cookie
    document.cookie = uuid + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";


    // check plugins
    (function (plugins) {
        var i, l, plugin;

        if (plugins) {
            l = plugins.length;

            for (i = 0; i < l; i += 1) {
                plugin = plugins.item(i);

                // what version of Adobe Flash
                if (plugin.name.indexOf("Flash") >= 0) {
                    match = plugin.description.match(/\b((\d+\.)+\d+)\b/);
                    if (match && match[1]) {
                        $factory.flash.version = match[1];
                    }
                }

                // what version of Java
                if (plugin.name.indexOf("Java") >= 0) {
                    match = plugin.description.match(/\b((\d+\.)+\d+)\b/);
                    if (match && match[1]) {
                        $factory.java.version = match[1];
                    }
                }
            }
        }
    }(navigator.plugins));


    // extract operating system name from user agent
    if (userAgent.indexOf("Windows") >= 0) {
        if (userAgent.indexOf("Windows Phone") >= 0) {
            $factory.os.name = "Windows Phone";
        } else {
            $factory.os.name = "Windows";
        }
    }

    if (userAgent.indexOf("OS X") >= 0 && userAgent.indexOf("Android") === -1) {
        $factory.os.name = "OS X";
    }

    if (userAgent.indexOf("Linux") >= 0) {
        $factory.os.name = "Linux";
    }

    if (userAgent.indexOf("like Mac OS X") >= 0) {
        $factory.os.name = "iOS";
    }

    if ((userAgent.indexOf("Android") >= 0 || userAgent.indexOf("Adr") >= 0) && userAgent.indexOf("Windows Phone") === -1) {
        $factory.os.name = "Android";
    }

    if (userAgent.indexOf("BB10") >= 0) {
        $factory.os.name = "BlackBerry";
    }

    if (userAgent.indexOf("RIM Tablet OS") >= 0) {
        $factory.os.name = "BlackBerry Tablet OS";
    }

    if (userAgent.indexOf("BlackBerry") >= 0) {
        $factory.os.name = "BlackBerryOS";
    }


    // extract operating system version from user agent
    match = null;

    switch ($factory.os.name) {
    case "Windows":
    case "Windows Phone":
        if (userAgent.indexOf("Win16") >= 0) {
            $factory.os.version = "3.1.1";
        } else if (userAgent.indexOf("Windows CE") >= 0) {
            $factory.os.version = "CE";
        } else if (userAgent.indexOf("Windows 95") >= 0) {
            $factory.os.version = "95";
        } else if (userAgent.indexOf("Windows 98") >= 0) {
            if (userAgent.indexOf("Windows 98; Win 9x 4.90") >= 0) {
                $factory.os.version = "Millennium Edition";
            } else {
                $factory.os.version = "98";
            }
        } else {
            match = userAgent.match(/Win(?:dows)?(?: Phone)?[\ _]?(?:(?:NT|9x)\ )?((?:(\d+\.)*\d+)|XP|ME|CE)\b/);

            if (match && match[1]) {
                switch (match[1]) {
                case "6.4":
                    match[1] = "10.0";
                    break;
                case "6.3":
                    match[1] = "8.1";
                    break;
                case "6.2":
                    match[1] = "8";
                    break;
                case "6.1":
                    match[1] = "7";
                    break;
                case "6.0":
                    match[1] = "Vista";
                    break;
                case "5.2":
                    match[1] = "Server 2003";
                    break;
                case "5.1":
                    match[1] = "XP";
                    break;
                case "5.01":
                    match[1] = "2000 SP1";
                    break;
                case "5.0":
                    match[1] = "2000";
                    break;
                case "4.0":
                    match[1] = "4.0";
                    break;
                default:
                    // nothing
                    break;
                }
            }
        }
        break;
    case "OS X":
        match = userAgent.match(/OS\ X\ ((\d+[._])+\d+)\b/);
        break;
    case "Linux":
        // linux user agent strings do not usually include the version
        $factory.os.version = null;
        break;
    case "iOS":
        match = userAgent.match(/OS\ ((\d+[._])+\d+)\ like\ Mac\ OS\ X/);
        break;
    case "Android":
        match = userAgent.match(/(?:Android|Adr)\ ((\d+[._])+\d+)/);
        break;
    case "BlackBerry":
    case "BlackBerryOS":
        match = userAgent.match(/Version\/((\d+\.)+\d+)/);
        break;
    case "BlackBerry Tablet OS":
        match = userAgent.match(/RIM Tablet OS ((\d+\.)+\d+)/);
        break;
    default:
        // no good default behavior
        $factory.os.version = null;
        break;
    }

    if (match && match[1]) {

        // replace underscores in version number with periods
        match[1] = match[1].replace(/_/g, ".");
        $factory.os.version = match[1];
    }


    // pull in screen info from W3C standard properties
    if (window.devicePixelRatio && !isNaN(window.devicePixelRatio)) {
        $factory.screen.dppx = window.devicePixelRatio;
    } else {
        $factory.screen.dppx = 1;
    }
    
    $factory.screen.width = screen.width;
    $factory.screen.height = screen.height;
    
    $factory.screen.widthPhysical = $factory.screen.dppx * $factory.screen.width;
    $factory.screen.heightPhysical = $factory.screen.dppx * $factory.screen.height;

    $factory.screen.resolution = $factory.screen.widthPhysical + " x " + $factory.screen.heightPhysical;

    $factory.screen.colors = screen.colorDepth;


    // are web sockets supported
    $factory.websockets = !!window.WebSocket;


    // preferred language(s) for displaying pages
    $factory.lang = navigator.languages || navigator.language;
    

    $rootScope.$platform = $factory;

    return $factory;

});