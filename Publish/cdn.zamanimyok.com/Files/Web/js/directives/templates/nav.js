app.style(function($css, $theme, $path) {

    $css.add("nav", "z-nav");
    $css.add("nav.block", "z-nav block");
    $css.add("nav.block.items", "z-nav block items");

    $css.nav
        .begin()
            .absolute()
            .width($theme.dimen.nav.width)
            .heightFull()
        .save()
        .state("show")
            .translateX(0)
        .save()
        .state("hide")
            .translateX(-$theme.dimen.nav.width)
        .save();

    $css.nav.block
        .begin()
            .absolute()
            .widthCropFromFull(25)
            .height(800)
            .left(25)
            .mask()
            .round(3)
        .save();

    $css.nav.block.items
        .begin()
            .absolute()
            .widthCropFromFull(10)
            .heightCropFromFull(20)
            .top(20)
            .left(5)
        .save();

});

app.directive("ztNav", function($eval, $nav, $path, $theme, $timeout, $view) {

    return {
        restricts: "E",
        templateUrl: $path.templates.nav,
        scope: false,
        compile: function($element, $attr) {

            var element = $element[0].querySelector("z-nav");

            var self = {

                $element: angular.element(element),
                element: element,
                isInView: false,
                init: function() {
                    self.$element.addClass("z-hide");
                },
                isInView: false,
                toggle: function() {

                    $view.lock();

                    if (self.isInView)
                        self.hide();
                    else
                        self.show();

                },
                show: function(onfinish) {

                    $view.pagess.nav();

                    self.$element.removeClass("z-hide");
                    self.$element.addClass($theme.anim.slider + " z-show");

                    $timeout(function() {

                        self.$element.removeClass($theme.anim.slider);

                        self.isInView = true;

                        if (onfinish != null) onfinish();

                        $nav.locate();

                    }, $theme.anim.slider_duration);

                },
                hide: function(onfinish) {

                    $view.pagess.navless();

                    self.$element.removeClass("z-show");
                    self.$element.addClass($theme.anim.slider + " z-hide");

                    $timeout(function() {

                        self.$element.removeClass($theme.anim.slider);

                        self.isInView = false;

                        if (onfinish != null) onfinish();

                        $nav.locate();

                    }, $theme.anim.slider_duration);

                }

            };

            self.init();

            $view.nav = self;

        }
    }

});
