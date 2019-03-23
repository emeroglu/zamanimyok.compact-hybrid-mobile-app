app.style(function($css, $path, $theme) {

    $css.add("app", "z-app");

    $css.app
        .begin()
            .absolute()
            .sideFull()
        .save()
        .state("show")
            .opacity(1)
        .save()
        .state("hide")
            .opacity(0)
        .save();

});

app.directive("ztApp", function($path, $theme, $timeout, $view) {

    return {
        restricts: "E",
        templateUrl: $path.templates.app,
        scope: false,
        compile: function($element, $attr) {

            var element = $element[0].querySelector("z-app");

            var self = {

                $element: angular.element(element),
                element: element,
                inInView: false,
                init: function() {
                    self.$element.addClass("z-none z-hide");
                },
                show: function(onfinish) {

                    self.$element.removeClass("z-none");
                    self.$element.addClass("z-disp");

                    $timeout(function() {

                        self.$element.removeClass("z-hide");
                        self.$element.addClass($theme.anim.app + " z-show");

                        $timeout(function() {

                            self.$element.removeClass($theme.anim.app)
                            
                            self.isInView = true;

                            if (onfinish != null) onfinish();

                        }, $theme.anim.app_duration);

                    });

                }

            };

            self.init();

            $view.app = self;

        }
    }

});