app.style(function($css, $theme, $path) {

    $css.add("textbox", "zc-textbox");
    $css.add("textbox.input", "zc-textbox input");
    $css.add("textbox.line", "zc-textbox line");
    $css.add("textbox.icon", "zc-textbox icon");

    $css.textbox
        .begin()
            .relativeLeftFull()
        .save();

    $css.textbox.input
        .begin()
            .absolute()
            .padding(0)
            .margin(0)
            .removeBorder()
            .removeBackground()
            .removeOutline()
            .textSize(16)
            .textColor($theme.color.gray)
            .textExtraLight()
        .save();

    $css.textbox.line
        .begin()
            .absolute()
            .widthFull()
            .height(1)
            .bottom(1)
            .backgroundColor($theme.color.gray)
        .save();

    $css.textbox.icon
        .begin()
            .absolute()
        .save();

});

app.directive("zcTextbox", function($bcast, $css, $nav, $path, $theme, $timeout, $view) {

    return {
        restricts: "E",
        scope: false,
        template: function($element, $attr) {

            var html = "";

            html += "<input id='" + $attr.zpId + "' type='" + $attr.zpInputType + "' />";
            html += "<line class='z-ease-500'></line>";

            html += "<icon>";
            html += "   <zc-icon zp-icon='" + $attr.zpIcon + "' zp-size='small' zp-weight='light' zp-color='gray' />";
            html += "</icon>";

            return html;

        },
        compile: function($element, $attr) {

            var self = {

                id: $attr.zpId,
                $element: $element,
                element: $element[0],
                type: $attr.zpType,
                init: function() {

                    var input = $element[0].querySelector("input");
                    var line = $element[0].querySelector("line");
                    var icon = $element[0].querySelector("icon zc-icon i");
                    
                    self.components = {
                        input: {
                            $element: angular.element(input),
                            element: input
                        },
                        line: {
                            $element: angular.element(line),
                            element: line
                        },
                        icon: {
                            $element: angular.element(icon),
                            element: icon
                        }
                    };

                    var type = $attr.zpType;
                    var iconAnchor = $attr.zpIconAnchor;

                    var json = { };
                    var jsonInput = { };
                    var jsonIcon = { };

                    if (type == "normal") {

                        $css.json(json).height(45);

                        $css.json(jsonInput)
                            .widthCropFromFull(45)
                            .textHeight(45);

                        $css.json(jsonIcon)
                            .side(20)
                            .middle(20);

                        if (iconAnchor == "right") {

                            $css.json(jsonInput).left(10);
                            $css.json(jsonIcon).right(10);

                        } else if (iconAnchor == "left") {

                            $css.json(jsonInput).right(0);
                            $css.json(jsonIcon).left(10);

                        }

                    }

                    $element.css(json);
                    $element.find("input").css(jsonInput);
                    $element.find("icon").css(jsonIcon);
                    
                    self.components.input.element.onfocus = function() {

                        self.onfocus();
        
                        self.components.line.$element.css({
                            "background-color": $theme.color.mainDark
                        });
        
                        self.components.icon.$element.css({
                            "color": $theme.color.mainDark
                        });
        
                        if (self.text() == self.placeholder) {
        
                            self.text("");
        
                            self.components.input.$element.css({
                                color: $theme.color.grayDark
                            });
        
                        } else {
        
                            if (self.text() == "") {
        
                                self.text(self.placeholder);
            
                                self.components.input.$element.css({
                                    color: $theme.color.gray
                                });
            
                            }
        
                        }
        
                    };
        
                    self.components.input.element.onblur = function() {
        
                        self.onfocuslost();
        
                        self.components.line.$element.css({
                            "background-color": $theme.color.gray
                        });
        
                        self.components.icon.$element.css({
                            "color": $theme.color.gray
                        });
        
                        if (self.text() == "") {
        
                            self.text(self.placeholder);
        
                            self.components.input.$element.css({
                                color: $theme.color.gray
                            });
        
                        }
        
                    };
        
                    self.components.input.element.oninput = function() {
        
                        var text = self.text().replace(self.placeholder,"");
        
                        if (self.text() == "") {
        
                            self.text(self.placeholder);
        
                            self.element.setSelectionRange(0,0);
        
                            self.components.input.$element.css({
                                color: $theme.color.gray
                            });
        
                        }
                        else if (self.text() == self.placeholder) {
        
                            self.text("");
        
                            self.components.input.$element.css({
                                color: $theme.color.grayDark
                            });
        
                        } else if (text.length == 1) {
        
                            self.text(text);
        
                            self.components.input.$element.css({
                                color: $theme.color.grayDark
                            });
        
                        } else {
        
                            self.components.input.$element.css({
                                color: $theme.color.grayDark
                            });
        
                        }
        
                    };

                    $bcast.listen("lexicon_digest", {
                        owner: self.id,
                        invoke: function() {

                            var need = (self.text() == self.placeholder);
        
                            self.placeholder = $eval($attr.zpInputPlaceholder); 
            
                            if (need)
                                self.text(self.placeholder);    

                        }
                    });

                    self.text(self.placeholder);

                },
                components: { },
                placeholder: $eval($attr.zpInputPlaceholder), 
                placehold: function(text) {

                    self.placeholder = text;
                    self.text(text);

                    self.components.line.$element.css({
                        "background-color": $theme.color.gray
                    });
    
                    self.components.icon.$element.css({
                        "color": $theme.color.gray
                    });

                },
                text: function(s) {

                    if (s == null) {

                        return self.components.input.$element.val();

                    } else {

                        self.components.input.$element.val(s);

                    }

                },
                onfocus: function() { },
                onfocuslost: function() { },
                dispose: function() {
            
                    $bcast.clear("lexicon_digest", self.id);

                    self = null;

                }

            };

            $view.pages[$nav.page.key].components[$attr.zpId] = self;

        }
    }

});