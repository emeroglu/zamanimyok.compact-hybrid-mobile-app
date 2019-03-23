app.style(function($css, $theme, $path) {

    $css.add("heading", "zc-heading");
    $css.add("heading_first", "zc-heading:first-of-type");

    $css.heading
        .begin()
            .relativeLeftFull()
            .textSize(14)
            .textExtraLight()
            .marginTop(25)
            .marginBottom(10)
            .uppercase()
            .textColor($theme.color.grayDark)
        .save();

    $css.heading_first
        .begin()
            .marginTop(0)
        .save();

});

app.directive("zcHeading", function($bcast, $nav, $view) {

    return {
        restricts: "E",
        scope: false,
        template: function($element, $attr) {
            return $attr.zpText;   
        },
        compile: function($element, $attr) {

            var self = {
              
                id: $attr.zpId,
                $element: $element,
                element: $element[0],
                init: function() {

                    self.text($eval($attr.zpText));

                    $bcast.listen("lexicon_digest", {
                        owner: self.id,
                        invoke: function() {
                            self.text($eval($attr.zpText));
                        }
                    });

                },
                text: function(s){

                    if (s == null)
                        return $element.text();
                    else
                        $element.text(s);

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
