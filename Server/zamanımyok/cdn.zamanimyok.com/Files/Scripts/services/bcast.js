app.factory("$bcast", function() {

    var $factory = {};

    $factory.delegates = {};
    $factory.listen = function(key, delegate) {
            
        if ($factory.delegates[key] == null)
            $factory.delegates[key] = [];
        
        $factory.delegates[key].push(delegate);

    };

    $factory.shout = function(key, args) {

        if ($factory.delegates[key] == null)
            return;

        for (var i = 0; i < $factory.delegates[key].length; i++) {
            $factory.delegates[key][i].invoke(args);
        }

    };

    $factory.clear = function(key, owner) {

        var clone = [];

        for (var i = 0; i < $factory.delegates[key].length; i++) {
        
            if ($factory.delegates[key][i].owner != owner) {
                clone.push($factory.delegates[key][i]);
            }

        }

        $factory.delegates[key] = clone;

    };

    $factory.clearThatContains = function(key, owner) {

        var clone = [];

        for (var i = 0; i < $factory.delegates[key].length; i++) {
        
            if ($factory.delegates[key][i].owner.indexOf(owner) == -1) {
                clone.push($factory.delegates[key][i]);
            }

        }

        $factory.delegates[key] = clone;

    };

    return $factory;

});