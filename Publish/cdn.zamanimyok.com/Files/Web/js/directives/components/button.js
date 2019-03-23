app.style(function($css, $theme, $path) {

    $css.add("button", "zc-button");

    $css.button
        .begin()
            .relativeLeftFull()
            .textHeight(40)
            .textCenter()
            .textSize(15)
            .round(3)
        .save()
        .state("idle")
            .backgroundColor($theme.color.main)
            .textColor($theme.color.white)
            .textExtraLight()
        .save()
        .state("hover")
            .backgroundColor($theme.color.mainLight)
            .textColor($theme.color.mainDark)
            .textRegular()
            .cursorPointer()
        .save();

});

app.directive("zcButton", function($bcast, $nav, $view) {

    return {
        restricts: "E",
        scope: false,
        compile: function($element, $attr) {

            var self = {

                id: $attr.zpId,
                $element: $element,
                element: $element[0],
                init: function() {

                    $element.addClass("z-ease-500 z-idle");

                    self.element.onmouseover = function() {
        
                        $element.removeClass("z-idle");
                        $element.addClass("z-hover");
        
                    };
        
                    self.element.onmouseleave = function() {
        
                        $element.removeClass("z-hover");
                        $element.addClass("z-idle");
        
                    };

                    $element.text($eval($attr.zpText));

                    $bcast.listen("lexicon_digest", {
                        owner: self.id,
                        invoke: function() {
                            self.$element.text($eval($attr.zpText));
                        }
                    });

                },
                onclick: function(onclick) {
                    self.element.onclick = onclick;
                },
                text: function(text) {

                    if (text == null)
                        return self.$element.text();
                    else
                        self.$element.text(text);

                },
                dispose: function() {

                    $bcast.clear("lexicon_digest", self.id);

                    self = null;

                }

            };

            $view.pages[$nav.page.key].components[$attr.zpId] = self;

        }
    };

});
