app.style(function($css, $theme, $path) {

    $css.add("lock", "z-lock");

    $css.lock
        .begin()
            .absolute()
            .sideFull()
            .opacity(0)
        .save();

});

app.directive("ztLock", function($timeout, $view) {

    return {
        restricts: "E",
        scope: false,
        template: "<z-lock></z-lock>",
        compile: function($element) {

            var element = $element[0].querySelector("z-lock");

            var self = {
                $element: angular.element(element),
                element: element,
                locked: false,
                init: function() {
                    self.$element.addClass("z-none z-95");
                }
            };

            self.init();

            $view.padlock = self;

            $view.lock = function() {
                    
                self.$element.removeClass("z-none z-95");
                self.$element.addClass("z-disp z-105");

                self.locked = true;

            };

            $view.unlock = function() {

                self.$element.removeClass("z-disp z-105");
                self.$element.addClass("z-none z-95");

                self.locked = false;

            };

        }
    }

});