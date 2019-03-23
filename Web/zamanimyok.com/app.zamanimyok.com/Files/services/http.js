$js.compile("$http", [], function($self) {

    $self.fields = {

        request: null,        

        _delegates: {}

    };

    $self.delegates = {

        begin: function () { $self.request = new WebRequest(); $self._delegates = {}; return $self; },
        
        url: function (param) { $self.request.options.url = param; return $self; },

        data: function (param) { $self.request.options.data = param; return $self; },
    
        on: function (key, delegate) { $self._delegates[key] = delegate; return $self; }

    };

    $self.virtuals = {

    };

    $self.extensions = {

    };

    $self.overrides = {

    };

    $self.schema = {

        send: function () {
            
            $http.request.onsuccess = function ($response) {

                var status = $response.meta.status;
                
                $self._delegates[status]($response.payload);

            };
            $http.request.send();
    
        }

    };

});