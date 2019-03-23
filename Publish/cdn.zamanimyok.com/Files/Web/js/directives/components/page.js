app.style(function($css, $theme, $path) {

    $css.add("page", "z-page");
    $css.add("page_wide", "z-page[type='wide']");
    $css.add("page_medium", "z-page[type='medium']");
    $css.add("page_small", "z-page[type='small']");
    $css.add("page_narrow", "z-page[type='narrow']");
    $css.add("page.heading", "z-page heading");
    $css.add("page.heading.back", "z-page heading back");
    $css.add("page.heading.text", "z-page heading text");
    $css.add("page.heading.icon", "z-page heading icon");
    $css.add("page.heading.line", "z-page heading line");
    $css.add("page.block", "z-page block");
    $css.add("page.block.white", "z-page block z-frosty white");
    $css.add("page.block.view", "z-page block view");
    $css.add("page.block.shade", "z-page block shade");
    $css.add("page.block.loading", "z-page block loading");
    $css.add("page.block.loading.image", "z-page block loading zc-image img");
    $css.add("page.block.loading.text", "z-page block loading text");
    $css.add("page.block.lock", "z-page block lock");

    $css.page
        .begin()
            .relativeLeft()
            .heightFull()
        .save()
        .state("show")
            .opacity(1)
        .save()
        .state("hide")
            .opacity(0)
        .save();

    $css.page_wide
        .begin()
            .width($theme.dimen.page.width_wide)
        .save();

    $css.page_medium
        .begin()
            .width($theme.dimen.page.width_medium)
        .save();

    $css.page_small
        .begin()
            .width($theme.dimen.page.width_small)
        .save();

    $css.page_narrow
        .begin()
            .width($theme.dimen.page.width_narrow)
        .save();

    $css.page.heading
        .begin()
            .relativeLeftFull()
            .height($theme.dimen.page.title_height)
        .save();

    $css.page.heading.back
        .begin()
            .relativeLeft()
            .width(60)
            .height($theme.dimen.page.title_height)
            .marginLeft(5)
        .save();

    $css.page.heading.text
        .begin()
            .relativeLeft()
            .textHeight($theme.dimen.page.title_height)
            .textSize(24)
            .textLight()
            .textColor($theme.color.blackSoft)
        .save()
        .state("back")
            .widthCropFromFull(130)
            .textCenter()
        .save()
        .state("wide")
            .widthCropFromFull(85)
            .textLeft()
            .marginLeft(20)
        .save();

    $css.page.heading.icon
        .begin()
            .relativeLeft()
            .width(60)
            .height($theme.dimen.page.title_height)
            .marginRight(5)
        .save();

    $css.page.heading.line
        .begin()
            .absolute()
            .widthFull()
            .height(1)
            .bottom(0)
            .left(0)
            .backgroundColor($theme.color.gray)
        .save();

    $css.page.block
        .begin()
            .absolute()
            .widthCropFromFull(25)
            .minHeight(500)
            .left(12.5)
            .round(3)
            .mask()
        .save();

    $css.page.block.white
        .begin()
            .opacity(0.9)
        .save();

    $css.page.block.view
        .begin()
            .relativeLeft()
            .widthCropFromFull(50)
            .marginTop($theme.dimen.page.view_padding)
            .paddingLeft($theme.dimen.page.view_padding)
            .paddingRight($theme.dimen.page.view_padding)
            .marginBottom($theme.dimen.page.view_padding)
        .save();

    $css.page.block.shade
        .begin()
            .absolute()
            .sideFull()
            .backgroundColor($theme.color.blackFull)
        .save()
        .state("show")
            .opacity(0.6)
        .save()
        .state("hide")
            .opacity(0)
        .save();

    $css.page.block.loading
        .begin()
            .absolute()
            .sideCentered(250)
        .save()
        .state("show")
            .opacity(1)
        .save()
        .state("hide")
            .opacity(0)
        .save();

    $css.page.block.loading.image
        .begin()
            .absolute()
            .sideCentered(70)
        .save();

    $css.page.block.loading.text
        .begin()
            .absolute()
            .widthFull()
            .textHeight(100)
            .bottom(0)
            .textExtraLight()
            .textCenter()
            .textSize(27)
            .textColor($theme.color.whiteFull)
        .save();

    $css.page.block.lock
        .begin()
            .absolute()
            .sideFull()
            .opacity(0)
        .save();

});

app.directive("zPage", function($bcast, $compile, $http, $lexicon, $nav, $path, $rootScope, $timeout, $theme, $view) {

    return {

        restricts: "E",
        scope: false,
        compile: function($element, $attr) {

            var $page = $nav.pages[$attr.page];

            $view.pages[$page.key] = { components: { } };

            $http({
                method: "GET",
                url: $page.template
            }).then(function(res) {

                var html = "";

                html += "<block>";
                html += "   <zt-frosty></zt-frosty>"
                html += "   <heading>";
                html += "       <back>";
                html += "           <zc-icon za-click='$nav.back()' zp-icon='arrow-left' zp-size='medium' zp-weight='light' zp-color='blackSoft' />";
                html += "       </back>";
                html += "       <text za-lexicon></text>";
                html += "       <icon>";
                html += "           <zc-icon za-click='$nav.close()' zp-icon='times' zp-size='medium' zp-weight='light' zp-color='blackSoft' />";
                html += "       </icon>";
                html += "       <line></line>";
                html += "   </heading>";
                html += "   <zc-scroll>";
                html +=         res.data;
                html += "   </zc-scroll>";
                html += "   <shade></shade>";
                html += "   <loading>"
                html += "       <zc-image zp-path='loading' />";
                html += "       <text za-lexicon></text>";
                html += "   </loading>";
                html += "   <lock></lock>";
                html += "</block>";

                var compilation = $compile(html)($rootScope)[0];
                $element.append(compilation);

                var ctrl = $element[0].querySelector("block ctrl");
                var view = $element[0].querySelector("block view");
                var back = $element[0].querySelector("block heading back");
                var title = $element[0].querySelector("block heading text");
                var shade = $element[0].querySelector("block shade");
                var loading = $element[0].querySelector("block loading");
                var loadingText = $element[0].querySelector("block loading text");
                var lock = $element[0].querySelector("block lock");

                var self = {

                    key: $page.key,
                    $element: $element,
                    element: $element[0],
                    ctrl: ctrl.getAttribute("ng-controller"),
                    view: {
                        $element: angular.element(view),
                        element: view
                    },
                    titlePrecompiled: $nav.page.title,
                    enabled: true,
                    init: function() {

                        if ($nav.index == -1) {
                            self.components.back.$element.addClass("z-none");
                            self.components.title.$element.addClass("z-wide");
                        } else {
                            self.components.back.$element.addClass("z-disp");
                            self.components.title.$element.addClass("z-back");
                        }

                        self.title($eval(self.titlePrecompiled));
                        self.components.loadingText.$element.text($lexicon.please_wait);

                        $bcast.listen("lexicon_digest", {
                            owner: self.key,
                            invoke: function() {

                                self.title($eval(self.titlePrecompiled));
                                self.components.loadingText.$element.text($lexicon.please_wait);

                            }
                        });

                        self.components.shade.$element.addClass("z-none z-hide");
                        self.components.loading.$element.addClass("z-none z-hide");
                        self.components.lock.$element.addClass("z-none z-95");

                    },
                    components: {

                        back: {
                            $element: angular.element(back),
                            element: back
                        },
                        title: {
                            $element: angular.element(title),
                            element: title
                        },
                        shade: {
                            $element: angular.element(shade),
                            element: shade
                        },
                        loading: {
                            $element: angular.element(loading),
                            element: loading
                        },
                        loadingText: {
                            $element: angular.element(loadingText),
                            element: loadingText
                        },
                        lock: {
                            $element: angular.element(lock),
                            element: lock
                        }

                    },
                    lock: function() {

                        self.components.lock.$element.removeClass("z-none z-95");
                        self.components.lock.$element.addClass("z-disp z-105");

                    },
                    unlock: function() {

                        self.components.lock.$element.removeClass("z-disp z-105");
                        self.components.lock.$element.addClass("z-none z-95");

                    },
                    title: function(text) {

                        self.components.title.$element.text(text);

                    },
                    enable: function() {

                        if (self.enabled)
                            return;

                        self.components.shade.$element.removeClass("z-show");
                        self.components.shade.$element.addClass($theme.anim.page_enable + " z-hide");

                        $timeout(function() {

                            self.components.shade.$element.removeClass($theme.anim.page_enable);
                            self.components.shade.$element.addClass("z-none");

                            self.unlock();

                            self.enabled = true;

                        }, $theme.anim.page_enable_duration);

                    },
                    disable: function() {

                        if (!self.enabled)
                            return;

                        self.lock();
                        
                        self.components.shade.$element.removeClass("z-none");
                        self.components.shade.$element.addClass("z-disp");

                        $timeout(function() {

                            self.components.shade.$element.removeClass("z-hide");
                            self.components.shade.$element.addClass($theme.anim.page_disable + " z-show");

                            $timeout(function() {

                                self.components.shade.$element.removeClass($theme.anim.page_disable);

                                self.enabled = true;

                            }, $theme.anim.page_disable_duration);

                        }, 50);

                    },
                    loading: function(onfinish) {

                        self.lock();

                        self.components.shade.$element.removeClass("z-none");
                        self.components.shade.$element.addClass("z-disp");

                        self.components.loading.$element.removeClass("z-none");
                        self.components.loading.$element.addClass("z-disp");

                        $timeout(function() {

                            self.components.shade.$element.removeClass("z-hide");
                            self.components.shade.$element.addClass($theme.anim.page_loading + " z-show");

                            self.components.loading.$element.removeClass("z-hide");
                            self.components.loading.$element.addClass($theme.anim.page_loading + " z-show");

                            $timeout(function() {

                                self.components.shade.$element.removeClass($theme.anim.page_loading);
                                self.components.loading.$element.removeClass($theme.anim.page_loading);

                                self.enabled = false;

                                if (onfinish != null) onfinish();

                            }, $theme.anim.page_loading_duration);

                        }, 50);

                    },
                    loaded: function(onfinish) {

                        self.components.shade.$element.removeClass("z-show");
                        self.components.shade.$element.addClass($theme.anim.page_loaded + " z-hide");

                        self.components.loading.$element.removeClass("z-show");
                        self.components.loading.$element.addClass($theme.anim.page_loaded + " z-hide");

                        $timeout(function() {

                            self.components.shade.$element.removeClass($theme.anim.page_loading);
                            self.components.loading.$element.removeClass($theme.anim.page_loading);

                            $timeout(function() {

                                self.components.shade.$element.removeClass("z-disp");
                                self.components.shade.$element.addClass("z-none");

                                self.components.loading.$element.removeClass("z-disp");
                                self.components.loading.$element.addClass("z-none");

                                self.enabled = true;

                                if (onfinish != null) onfinish();

                                self.unlock();

                            }, 50);

                        }, $theme.anim.page_loaded_duration);

                    },
                    loadedWithShadeBehind: function(onfinish) {

                        self.components.loading.$element.removeClass("z-show");
                        self.components.loading.$element.addClass($theme.anim.page_loaded + " z-hide");

                        $timeout(function() {

                            self.components.loading.$element.removeClass($theme.anim.page_loading);

                            $timeout(function() {

                                self.components.loading.$element.removeClass("z-disp");
                                self.components.loading.$element.addClass("z-none");

                                self.enabled = false;

                                if (onfinish != null) onfinish();

                                self.unlock();

                            }, 50);

                        }, $theme.anim.page_loaded_duration);

                    },
                    dispose: function() {

                        $bcast.clear("lexicon_digest", self.key);

                        for (var key in self.components) {
                            if (self.components[key].id && self.components[key].dispose)
                                self.components[key].dispose();
                        }

                        $bcast.clearThatContains("lexicon_digest", self.key + "_text_");

                        self = null;
                        delete $view.pages[$page.key];

                    }

                }; 
                
                for (var c in $view.pages[$page.key].components) {
                    self.components[c] = $view.pages[$page.key].components[c];
                }

                $view.pages[$page.key] = self;

            });

        }

    };

});