$js.compile("$bridge", [], function($self) {

    $self.fields = {

        native: {
            log: function () { },
            onload: function () { },
            photoshoot: function () { },
            hybrid: function () { },
            quit: function () { }
        },
        js: {
            onBackPressed: function () { },
            onUploadFinished: function () { }
        }

    };

    $self.delegates = {

    };

    $self.virtuals = {

    };
    
    $self.extensions = {

    };

    $self.overrides = {

    };

    $self.schema = {

        _android: function() {
            
            $window.$platform = "android";

            $window.deviceVariables = { credentials: "" };

            $self.on_device_variable = function() { };
            $self.on_location = function() { };

            $self.native.log = function(text) { $window.JSInterface.log(text); };
            $self.native.onload = function() { $window.JSInterface.onload(); };
            $self.native.photoshoot = function(key, reservationFk, stateFk, typeFk) { $window.JSInterface.photoshoot(key, reservationFk, stateFk, typeFk); };
            $self.native.hybrid = function() { $window.JSInterface.hybrid(); };
            $self.native.setDeviceVariable = function(key, value) { $window.JSInterface.setDeviceVariable(key, value); };
            $self.native.getDeviceVariable = function(key, delegate) { $self.on_device_variable = delegate; $window.JSInterface.getDeviceVariable(key); };
            $self.native.getLocation = function (delegate) { $self.on_location = delegate; $window.JSInterface.getLocation(); };
            $self.native.quit = function() { $window.JSInterface.quit(); };

            $self.js.deviceVariableFor = function(key, value) { $window.deviceVariables[key] = value; $self.on_device_variable(value); };
            $self.js.location = function (lat, long) { $self.on_location(parseFloat(lat), parseFloat(long)); };
            $self.js.onBackPressed = function() { $nav.back(); };
            $self.js.onPhotoshootFinished = function() { $self.native.hybrid(); };

        },

        _iOS: function() {

            $window.$platform = "ios";

            $window.deviceVariables = { credentials: "" };

            $self.on_device_variable = function() { };
            $self.on_location = function() { };

            $self.native.log = function(text) { $window.webkit.messageHandlers["JSInterface"].postMessage("log: " + text); };
            $self.native.onload = function() { $window.webkit.messageHandlers["JSInterface"].postMessage("onload"); };
            $self.native.photoshoot = function(key, reservationFk, stateFk, typeFk) { $window.webkit.messageHandlers["JSInterface"].postMessage("photoshoot: key=" + key + "&reservationFk=" + reservationFk + "&stateFk=" + stateFk + "&typeFk=" + typeFk); };
            $self.native.hybrid = function() { $window.webkit.messageHandlers["JSInterface"].postMessage("hybrid"); };
            $self.native.setDeviceVariable = function(key, value) { $window.webkit.messageHandlers["JSInterface"].postMessage("setDeviceVariable: " + key + "=" + value); };
            $self.native.getDeviceVariable = function(key, delegate) { $self.on_device_variable = delegate; $window.webkit.messageHandlers["JSInterface"].postMessage("getDeviceVariable: " + key); };
            $self.native.getLocation = function (delegate) { $self.on_location = delegate; $window.webkit.messageHandlers["JSInterface"].postMessage("location"); };
            $self.native.quit = function() { $window.webkit.messageHandlers["JSInterface"].postMessage("quit"); };

            $self.js.deviceVariableFor = function(key, value) { $window.deviceVariables[key] = value; $self.on_device_variable(value); };
            $self.js.location = function (lat, long) { $self.on_location(parseFloat(lat), parseFloat(long)); };
            $self.js.onBackPressed = function() { $nav.back(); };
            $self.js.onPhotoshootFinished = function() { $self.native.hybrid(); };

        },

        _desktop: function() {

            $window.$platform = "desktop";

            $window.deviceVariables = { credentials: "" };

            $self.on_device_variable = function() { };
            $self.on_location = function() { };

            $self.native.log = function(text) { console.log(text); };
            $self.native.onload = function() { };
            $self.native.photoshoot = function() { };
            $self.native.hybrid = function() { };
            $self.native.setDeviceVariable = function() { };
            $self.native.getDeviceVariable = function(key, delegate) { $self.on_device_variable = delegate; $self.js.deviceVariableFor(key, deviceVariables[key]); };
            $self.native.getLocation = function(delegate) { $self.on_location = delegate; $self.js.location(0 ,0); };
            $self.native.quit = function() { };

            $self.js.deviceVariableFor = function(key, value) { $window.deviceVariables[key] = value; $self.on_device_variable(value); };
            $self.js.location = function(lat, long) { $self.on_location(parseFloat(lat), parseFloat(long)); };
            $self.js.onBackPressed = function() { $nav.back(); };
            $self.js.onPhotoshootFinished = function() { };

        }

    };

    $self.on_post_build = function() {

        var userAgent = navigator.userAgent || navigator.vendor || window.opera;

        if (/android/i.test(userAgent))
            $self._android();
        else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream)
            $self._iOS();
        else
            $self._desktop();

    };

});