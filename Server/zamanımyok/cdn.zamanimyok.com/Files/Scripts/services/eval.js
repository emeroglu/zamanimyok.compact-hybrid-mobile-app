app.factory("$eval", function($bcast, $css, $data, $http, $img, $lexicon, $nav, $path, $platform, $style, $timeout, $theme, $view, $window) {

    var $factory = function(s) { return eval(s); };

    $window.$eval = $factory;

    return $factory;

});