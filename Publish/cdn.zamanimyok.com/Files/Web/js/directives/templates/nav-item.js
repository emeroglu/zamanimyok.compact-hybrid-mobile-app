app.style(function($css, $theme, $path) {

    $css.add("navItem", "zc-nav-item item");
    $css.add("navItem.text", "zc-nav-item item text");
    $css.add("navItem.arrow", "zc-nav-item item arrow");
    $css.add("navItem.arrow.image", "zc-nav-item item arrow zc-image img");
    $css.add("navSubItem", "zc-nav-item sub-item");
    $css.add("navSubItem.text", "zc-nav-item sub-item text");

    $css.navItem
        .begin()
            .relativeLeftFull()
            .height(50)
            .cursorPointer()
        .save();

    $css.navItem.text
        .begin()
            .relativeLeft()
            .widthCropFromFull(60)
            .textHeight(50)
            .marginLeft(15)
            .textLight()
            .textSize(16)
            .textColor($theme.color.white)
        .save();

    $css.navItem.arrow
        .begin()
            .absolute()
            .side(50)
            .right(0)
        .save()
        .state("down")
            .rotate(-90)
        .save()
        .state("left")
            .rotate(0)
        .save();

    $css.navItem.arrow.image
        .begin()
            .absolute()
            .sideCentered(12)
        .save();

    $css.navSubItem
        .begin()
            .relativeLeftFull()
            .cursorPointer()
        .save()
        .state("show")
            .height(50)
            .opacity(1)
        .save()
        .state("hide")
            .height(0)
            .opacity(0)
        .save();

    $css.navSubItem.text
        .begin()
            .absolute()
            .widthCropFromFull(50)
            .textHeight(50)
            .left(50)
            .textLight()
            .textSize(16)
            .textColor($theme.color.white)
        .save();

});

app.directive("zcNavItem", function($bcast, $path, $theme, $timeout, $view) {

    var id = 0;

    return {
        restricts: "E", 
        scope: false,
        template: function($element, $attr) {

            var html = "";

            var subs = $element[0].querySelectorAll("zc-nav-sub-item");

            if (subs.length != 0) {

                html += "<item>";
                html += "   <text za-lexicon></text>";
                html += "   <arrow>";
                html += "       <zc-icon zp-icon='caret-left' zp-size='small' zp-weight='light' zp-color='white' />";
                html += "   </arrow>";
                html += "</item>";
                
                var sub, htmlSub;

                for (var i = 0; i < subs.length; i++) {

                    sub = subs[i];

                    html += "<sub-item za-click=\"$nav.clearLoad('" + sub.getAttribute("zp-navigate-to") + "')\">";
                    html += "   <text za-lexicon zp-text='" + sub.getAttribute("zp-text") + "'></text>";
                    html += "</sub-item>";

                }

            } else {

                html += "<item za-click=\"$nav.clearLoad('" + $attr.zpNavigateTo + "')\">";
                html += "   <text za-lexicon></text>";
                html += "</item>";

            }

            return html;

        },
        compile: function($element, $attr) {

            id++;

            var text = $element[0].querySelector("text");

            var self = {
              
                key: "nav_item_" + id,
                $element: $element,
                element: $element[0],
                init: function() {

                    self.components.text.$element.text($eval($attr.zpText));

                    $bcast.listen("lexicon_digest", {
                        owner: self.key,
                        invoke: function() {
                            self.components.text.$element.text($eval($attr.zpText));
                        }
                    });

                 },
                 components: {
                    text: {
                        $element: angular.element(text),
                        element: text
                    }
                }

            };

            var subbed = $element[0].querySelectorAll("sub-item").length != 0;
            
            if (subbed) {

                var arrow = $element[0].querySelector("arrow");
                var subs = $element[0].querySelectorAll("sub-item");

                self.init = function() {

                    self.components.text.$element.text($eval($attr.zpText));

                    self.components.arrow.$element.addClass("z-left");

                    var text;

                    for (var i = 0; i < self.components.subs.length; i++) {
                        
                        text = self.components.subs[i].components.text.$element;
                        text.text($eval(text.attr("zp-text")));

                        self.components.subs[i].$element.addClass("z-hide");

                    }

                    $bcast.listen("lexicon_digest", {
                        owner: self.key,
                        invoke: function() {
                        
                            self.components.text.$element.text($eval($attr.zpText));

                            var text;

                            for (var i = 0; i < self.components.subs.length; i++) {
                                text = self.components.subs[i].components.text.$element;
                                text.text($eval(text.attr("zp-text")));
                            }

                        }
                    });

                    self.element.onclick = self.toggle;

                };

                self.components = {
                    text: {
                        $element: angular.element(text),
                        element: text
                    },
                    arrow: {
                        $element: angular.element(arrow),
                        element: arrow
                    },
                    subs: []
                };

                var text;

                for (var i = 0; i < subs.length; i++) {

                    text = subs[i].querySelector("text");

                    self.components.subs.push({
                        $element: angular.element(subs[i]),
                        element: subs[i],
                        components: {
                            text: {
                                $element: angular.element(text),
                                element: text
                            }
                        }
                    });

                }

                self.open = false;
                self.toggle = function() {

                    $view.lock();

                    if (self.open) {

                        self.components.arrow.$element.removeClass("z-down");
                        self.components.arrow.$element.addClass($theme.anim.nav + " z-left");
                        
                        for (var i = 0; i < self.components.subs.length; i++) {
                            self.components.subs[i].$element.removeClass("z-show");
                            self.components.subs[i].$element.addClass($theme.anim.nav + " z-hide");
                        }

                        $timeout(function() {

                            self.components.arrow.$element.removeClass($theme.anim.nav);
                         
                            for (var i = 0; i < self.components.subs.length; i++) {
                                self.components.subs[i].$element.removeClass($theme.anim.nav);
                            }

                            self.open = false;

                            $view.unlock();

                        }, $theme.anim.nav_duration);

                    } else {

                        self.components.arrow.$element.removeClass("z-left");
                        self.components.arrow.$element.addClass($theme.anim.nav + " z-down");
                        
                        for (var i = 0; i < self.components.subs.length; i++) {
                            self.components.subs[i].$element.removeClass("z-hide");
                            self.components.subs[i].$element.addClass($theme.anim.nav + " z-show");
                        }

                        $timeout(function() {

                            self.components.arrow.$element.removeClass($theme.anim.nav);
                            
                            for (var i = 0; i < self.components.subs.length; i++) {
                                self.components.subs[i].$element.removeClass($theme.anim.nav);
                            }

                            self.open = true;

                            $view.unlock();

                        }, $theme.anim.nav_duration);

                    }

                };

            }

            self.init();

            $view.navItems.push(self);

        }
    }

});