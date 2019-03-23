app.style(function($css, $theme, $path) {

    $css.add("radio", "zc-radio");
    $css.add("radio.item", "zc-radio item");
    $css.add("radio.item_hover", "zc-radio item:hover");
    $css.add("radio.border", "zc-radio border");
    $css.add("radio.item_first", "zc-radio item:first-of-type");
    $css.add("radio.indicator", "zc-radio indicator");

    $css.radio
        .begin()
            .relativeLeftFull()
            .height(50)
        .save();

    $css.radio.border
        .begin()
            .absolute()
            .widthCropFromFull(2)
            .height(38)
            .border("1px solid " + $theme.color.grayExtraLight)
            .middle(40)
            .round(3)
        .save();

    $css.radio.item
        .begin()
            .relativeLeft()
            .textHeight(50)
            .textExtraLight()
            .textSize(15)
            .textColor($theme.color.grayDark)
        .save();

    $css.radio.item_hover
        .begin()
            .cursorPointer()
        .save();

    $css.radio.item_first
        .begin()
            .textColor($theme.color.white)
        .save();

    $css.radio.indicator
        .begin()
            .absolute()
            .heightCentered(40)
            .backgroundColor($theme.color.main)
            .round(3)
        .save();

        
});

app.directive("zcRadio", function($bcast, $compile, $css, $nav, $theme, $timeout, $view) {

    return {
        restricts: "E",
        scope: false,
        template: function($element, $attr) {

            var items = $eval($attr.zpItems);

            var html = "";

            html += "<radio>";
            html += "   <border></border>";
            html += "   <indicator class='z-ease-500'></indicator>";

            for (var i = 0; i < items.length; i++) {
                html += "   <item class='z-ease-500' za-lexicon zp-index='" + i + "'>" + items[i] + "</item>";
            }

            html += "</radio>";

            return html;

        },
        compile: function($element, $attr) {

            var self = {

                id: $attr.zpId,
                $element: $element,
                element: $element[0],
                init: function() {

                    self.items = $eval($attr.zpItems);

                    var items = $element[0].querySelectorAll("item");

                    for (var i = 0; i < items.length; i++) {

                        self.components.items.push({
                            $element: angular.element(items[i]),
                            element: items[i]
                        });

                        self.components.items[i].element.onclick = function() {
                            self.to(this.getAttribute("zp-index"));
                        };

                        self.components.items[i].$element.text(self.items[i]);

                    }

                    var jsonItem = { };
                    var jsonIndicator = { };

                    var w = 100 / self.items.length;

                    $css.json(jsonItem).widthPercent(w).textCenter();
                    $css.json(jsonIndicator).widthPercent(w).leftPercent(0);

                    $element.find("item").css(jsonItem);
                    $element.find("indicator").css(jsonIndicator);

                    $bcast.listen("lexicon_digest", {
                        owner: self.id,
                        invoke: function() {
                        
                            self.items = $eval($attr.zpItems);

                            for (var i = 0; i < self.items.length; i++) {
                                self.components.items[i].$element.text(self.items[i]);
                            }

                            self.to(0);

                        }
                    });

                },
                components: {
                    items: []
                },
                index: 0,
                to: function(i) {

                    if (i == self.index)
                        return;

                    self.onchange(self.index, i);

                    var left = i * (100 / self.items.length);
                    $element.find("indicator").css($css.json().leftPercent(left).json());

                    $element.find("item").css({ color: $theme.color.grayDark });
                    
                    angular.element($element.find("item")[i]).css({ color: $theme.color.white });

                    self.index = i;

                    $timeout(function() {
                        self.onchanged(self.index);
                    }, 550);
                    
                },
                onchange: function() { },
                onchanged: function() { },
                items: [ ],
                item: function(index, text) {

                    var i = self.components.items[index].$element;

                    if (text == null)
                        return i.text();
                    else
                        i.text(text);

                },
                dispose: function() {

                    $bcast.clear("lexicon_digest", self.id);

                    self = null;

                }

            };

            $view.pages[$nav.page.key].components[$attr.zpId] = self;

        }
    }

});