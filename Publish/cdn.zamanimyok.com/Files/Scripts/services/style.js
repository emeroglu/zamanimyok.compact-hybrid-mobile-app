app.factory("$style", function ($css, $img, $path, $theme, $timeout) {

    var $factory = {};

    $factory.imageCount = 0;

    $factory.initialEvents = [];
    $factory.contentDependentEvents = [];
    $factory.screenSizeDependentEvents = [];

    $factory.onInit = function(event) {
        $factory.initialEvents.push(event);
    };

    $factory.onContentChanged = function(event) {
        $factory.contentDependentEvents.push(event);
    };

    $factory.onScreenSizeChanged = function(event) {
        $factory.screenSizeDependentEvents.push(event);
    };

    $factory.init = function() {

        for (var i = 0; i < $factory.initialEvents.length; i++) {
            $factory.initialEvents[i]($css, $theme, $path, $img);
        }

    };

    $factory.contentChanged = function() {

        for (var i = 0; i < $factory.contentDependentEvents.length; i++) {
            $factory.contentDependentEvents[i]();
        }

    };

    $factory.screenSizeChanged = function() {

        for (var i = 0; i < $factory.screenSizeDependentEvents.length; i++) {
            $factory.screenSizeDependentEvents[i]();
        }

    };

    $factory.queueImage = function() {
        $factory.imageCount++;
    };

    $factory.dequeueImage = function() {

        $factory.imageCount--;

        if ($factory.imageCount == 0) {

            $timeout(function() {

                $factory.contentChanged();

            }, 250);

        }

    };

    return $factory;

});