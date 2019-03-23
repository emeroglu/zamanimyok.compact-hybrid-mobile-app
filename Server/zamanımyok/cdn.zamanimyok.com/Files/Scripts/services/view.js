app.factory("$view", function($rootScope) {

    var $factory = {};

    $factory.navItems = [];
    $factory.pages = {};

    $rootScope.$view = $factory;

    return $factory;

});