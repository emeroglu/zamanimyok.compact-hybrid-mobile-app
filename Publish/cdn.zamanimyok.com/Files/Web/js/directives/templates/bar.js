app.style(function($css, $theme, $path) {

    $css.add("bar", "z-bar");
    $css.add("bar.icon", "z-bar icon");
    $css.add("bar.icon.image", "z-bar icon zc-image img");
    $css.add("bar.heading", "z-bar heading");
    $css.add("bar.heading.text", "z-bar heading text");
    $css.add("bar.language", "z-bar language");
    $css.add("bar.language.eng", "z-bar language eng");
    $css.add("bar.language.seperator", "z-bar language seperator");
    $css.add("bar.language.tur", "z-bar language tur");

    $css.bar
        .begin()
            .relativeLeftFull()
            .height($theme.dimen.nav.bar_height)
            .paddingLeft(25)
            .mask()
        .save();

    $css.bar.icon
        .begin()
            .absolute()
            .width(100)
            .height($theme.dimen.nav.bar_height)
            .top(0)
            .left(0)
        .save();

    $css.bar.icon.image
        .begin()
            .absolute()
            .sideCentered(20)
        .save();

    $css.bar.heading
        .begin()
            .absolute()
            .width(500)
            .height($theme.dimen.nav.bar_height)
            .top(0)
            .left(100)
            .mask()
        .save();

    $css.bar.heading.text
        .begin()
            .relativeLeft()
            .widthFull()
            .textHeight($theme.dimen.nav.bar_height)
            .textExtraLight()
            .textColor($theme.color.white)
            .textSize(30)
        .save();

    $css.bar.language
        .begin()
            .absolute()
            .width(120)
            .height($theme.dimen.nav.bar_height)
            .right(50)
        .save();

    $css.bar.language.eng
        .begin()
            .relativeLeftHalf()
            .textHeight($theme.dimen.nav.bar_height)
            .textSize(20)
            .textCenter()
            .textColor($theme.color.white)
            .textExtraLight()
        .save();

    $css.bar.language.tur
        .begin()
            .relativeLeftHalf()
            .textHeight($theme.dimen.nav.bar_height)
            .textSize(20)
            .textCenter()
            .textColor($theme.color.white)
            .textExtraLight()
        .save();

    $css.bar.language.seperator
        .begin()
            .absolute()
            .widthCentered(1)
            .heightCentered(30)
            .backgroundColor($theme.color.white)
        .save();

});

app.directive("ztBar", function($bcast, $lexicon, $nav, $path, $theme, $timeout, $view) {

    return {
        restricts: "E",
        templateUrl: $path.templates.bar,
        scope: false,
        compile: function($element, $attr) {

            var element = $element[0].querySelector("z-bar");
            var text = $element[0].querySelector("text");

            var self = {

                $element: angular.element(element),
                element: element,
                init: function() {

                    self.components.text.$element.text($lexicon.welcome);

                    $bcast.listen("lexicon_digest", {
                        owner: "bar",
                        invoke: function() {
                            
                            if ($nav.index == -1)
                                self.components.text.$element.text($lexicon.welcome);
                            else
                                self.components.text.$element.text($eval($nav.page.title));

                        }
                    });

                },
                components: {
                    text: {
                        $element: angular.element(text),
                        element: text,
                    }
                },
                title: function(text) {

                    if (text == null)
                        return self.components.text.$element.text();
                    else
                        self.components.text.$element.text(text);

                }

            };

            self.init();

            $view.bar = self;

        }
    }

});