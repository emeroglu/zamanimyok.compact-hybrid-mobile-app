$js.compile("$bridge", [], function($self) {

    $self.fields = {

        native: {
            log: function () { },
            onload: function () { },
            photoshoot: function () { },
            quit: function () { }
        },
        js: {
            onBackPressed: function () { }
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

            $self.native.log = function(text) { $window.JSInterface.log(text); };
            $self.native.onload = function() { $window.JSInterface.onload(); };
            $self.native.photoshoot = function() { $window.JSInterface.photoshoot(); };
            $self.native.quit = function() { $window.JSInterface.quit(); };

            $self.js.onBackPressed = function() { $self.native.quit(); };

        },

        _iOS: function() {

            document.documentElement.style.webkitUserSelect = 'none';
            document.documentElement.style.webkitTouchCallout = 'none';

            $self.native.log = function(text) { $window.webkit.messageHandlers["JSInterface"].postMessage("log: " + text); };
            $self.native.onload = function() { $window.webkit.messageHandlers["JSInterface"].postMessage("onload"); };
            $self.native.photoshoot = function() { $window.webkit.messageHandlers["JSInterface"].postMessage("photoshoot"); };
            $self.native.quit = function() { $window.webkit.messageHandlers["JSInterface"].postMessage("quit"); };

            $self.js.onBackPressed = function() { };

        },

        _desktop: function() {

            $self.native.log = function(text) { console.log(text); };
            $self.native.onload = function() { };
            $self.native.photoshoot = function() { };
            $self.native.quit = function() { };

            $self.js.onBackPressed = function() { };

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