app.style(function($css, $theme, $path) {

    $css.add("pages", "z-pages");
    $css.add("pages.slider", "z-pages slider");
    
    $css.pages
        .begin()
            .absolute()
            .heightFull()
            .left(0)
            .mask()
        .save()
        .state("nav")
            .widthCropFromFull($theme.dimen.nav.width + 12.5)
            .translateX($theme.dimen.nav.width + 12.5)
        .save()
        .state("navless")
            .widthCropFromFull(12.5)
            .translateX(12.5)
        .save();

    $css.pages.slider
        .begin()
            .absolute()
            .widthPercent(200)
            .heightFull()
            .translateX(0)
        .save();

});

app.directive("ztPages", function($path, $timeout, $theme, $view) {

    return {
        restricts: "E",
        scope: false,
        template: function() {

            var html = "";

            html += "<z-pages>";
            html += "   <slider class='" + $theme.anim.slider + "'></slider>";
            html += "</z-pages>";

            return html;

        },
        compile: function($element, $attr) {

            var element = $element[0].querySelector("z-pages");

            var self = {

                $element: angular.element(element),
                element: element,
                wide: true,
                init: function() {
                    self.$element.addClass("z-navless");
                },
                nav: function(onfinish) {

                    self.$element.removeClass("z-navless");
                    self.$element.addClass($theme.anim.nav + " z-nav");

                    $timeout(function() {

                        self.$element.removeClass($theme.anim.nav);

                        self.wide = false;

                        if (onfinish != null) onfinish();

                    }, $theme.anim.nav_duration);

                },
                navless: function(onfinish) {

                    self.$element.removeClass("z-nav");
                    self.$element.addClass($theme.anim.nav + " z-navless");

                    $timeout(function() {

                        self.$element.removeClass($theme.anim.nav);

                        self.wide = true;

                        if (onfinish != null) onfinish();

                    }, $theme.anim.nav_duration);

                }

            };
            
            self.init();

            $view.pagess = self;

        }
    };

});
