$js.compile("$http", [], function($self) {

    $self.fields = {

        request: null,
        requests: [],

    };

    $self.delegates = {

        begin: function () { $http.request = new WebRequest(); return $http; },

        method: function (param) {
            $http.request.options.method = param; return $http;
        },
        url: function (param) {
            $http.request.options.url = param; return $http;
        },
    
        onSuccess: function (delegate) { $http.request.onsuccess = delegate; return $http; },
        onError: function (delegate) { $http.request.onerror = delegate; return $http; },

    };

    $self.virtuals = {

    };

    $self.extensions = {

    };

    $self.overrides = {

    };

    $self.schema = {

        send: function () {

            $http.requests.push($http.request);
    
            $http.request.send();
    
        },
    
        schedule: function (delay) {
            setTimeout($http.send, delay);
        },
    
        recurse: function (interval) {
    
            $http.send();
    
            setTimeout(function () { $http.recurse(interval); }, interval);
    
        }

    };

});