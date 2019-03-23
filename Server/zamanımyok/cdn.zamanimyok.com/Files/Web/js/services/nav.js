app.factory("$nav", function($bcast, $compile, $css, $lexicon, $path, $rootScope, $style, $theme, $timeout, $view) {

    var $factory = {
        
        page: null,
        pageList: [ ],
        pages: { },
        index: -1,
        init: function(data) {
            
            var page;

            for (var d in data) {
                
                page = data[d];
    
                $factory.pages[d] = {
    
                    key: page.key,
                    template: $eval(page.template),
                    type: page.type,
                    title: page.title
    
                };
    
            }

        },
        calculateRequiredWidth: function() {

            var width = $css.pages.select().element.offsetWidth;
            
            if ($factory.pageList.length == 0)
                return { width: width, requiredWidth: 0 };
            
            var requiredWidth = 0;
            var type = "";

            for (var i = 0; i < $factory.index + 1; i++) {

                type = $factory.pageList[i].element.getAttribute("type");

                if (type == "wide")
                    requiredWidth += $theme.dimen.page.width_wide;
                else if (type == "medium")
                    requiredWidth += $theme.dimen.page.width_medium;
                else if (type == "small")
                    requiredWidth += $theme.dimen.page.width_small;
                else if (type == "narrow")
                    requiredWidth += $theme.dimen.page.width_narrow;

            }
            
            requiredWidth += $theme.dimen.page.space / 2;

            return { width: width, requiredWidth: requiredWidth };

        },
        calculateTotalWidth: function() {

            var width = $css.pages.select().element.offsetWidth;
            var totalWidth = 0;
            var type = "";

            for (var i = 0; i < $factory.pageList.length; i++) {

                type = $factory.pageList[i].element.getAttribute("type");

                if (type == "wide")
                    totalWidth += $theme.dimen.page.width_wide;
                else if (type == "medium")
                    totalWidth += $theme.dimen.page.width_medium;
                else if (type == "small")
                    totalWidth += $theme.dimen.page.width_small;
                else if (type == "narrow")
                    totalWidth += $theme.dimen.page.width_narrow;

            }
            
            totalWidth += $theme.dimen.page.space / 2;

            return { width: width, totalWidth: totalWidth };

        },
        needsRelocation: function() {
            
            var location = $factory.calculateTotalWidth();

            return (location.width < location.totalWidth);

        },
        locate: function() {

            if ($factory.index == -1) {

                $view.unlock();

                return;

            }

            var location = $factory.calculateRequiredWidth();

            if (location.width < location.requiredWidth) {

                var pagesWidth = $css.pages.select().element.offsetWidth;

                $css.pages.slider.select()
                    .begin()
                        .width(location.requiredWidth + $theme.dimen.page.width_wide)
                        .translateX(pagesWidth - location.requiredWidth)
                    .commit();

            } else {

                $css.pages.slider.select()
                    .begin()
                        .widthPercent(200)
                        .translateX(0)
                    .commit();

            }

            $timeout($view.unlock, $theme.anim.slider_duration);

        },
        forward: function() {

            $factory.index++;

            $factory.page = $factory.pageList[$factory.index];

            $view.bar.title($eval($factory.page.title));

            $factory.locate();

        },
        back: function() {

            if ($factory.index == 0) {
                $view.bar.title($lexicon.welcome);
                return;
            }

            if ($view.pages[$factory.page.key] != null)
                $view.pages[$factory.page.key].disable();

            $factory.index--;

            $factory.page = $factory.pageList[$factory.index];

            $view.pages[$factory.page.key].enable();

            $timeout(function() {
                
                $view.bar.title($eval($factory.page.title));

                $factory.locate();

            }, $theme.anim.page_disable_duration);

        },
        load: function(key) {

            $factory.clearRest = function() {

                if ($factory.index != $factory.pageList.length - 1) {

                    var clone = [];
    
                    for (var i = 0; i < $factory.pageList.length; i++) {
    
                        if (i <= $factory.index)
                            clone.push($factory.pageList[i]);
                        else
                            $factory.pageList[i].element.remove();
    
                    }
    
                    $factory.pageList = clone;
    
                }

            };

            $factory.onCompile = function() {
    
                var html = "<z-page page='" + key + "' type='" + $factory.page.type + "' class='z-hide'></z-page>";

                var compilation = $compile(html)($rootScope)[0];
                
                $factory.page.element = compilation;
    
                $css.pages.slider.select().element.append(compilation);

            };

            $factory.onLocated = function() {

                $bcast.shout($factory.page.key + "_located", {
                    $page: $view.pages[$factory.page.key], 
                    $comp: $view.pages[$factory.page.key].components
                });

                $factory.page.element.className = $theme.anim.page_load + " z-show";

                $timeout(function() {
                    
                    $bcast.shout($factory.page.key + "_isInView", {
                        $page: $view.pages[$factory.page.key], 
                        $comp: $view.pages[$factory.page.key].components
                    });

                    $factory.page.element.className = "z-show";

                    $view.unlock();

                }, $theme.anim.page_load_duration);

            };

            $factory.onCurrentPageAssignment = function() {

                $factory.index++;

                $factory.page = $factory.pageList[$factory.index];

                $view.bar.title($eval($factory.page.title));

            };

            $factory.onDisabled = function() {

                $factory.clearRest();
    
                $factory.page = $factory.pages[key];
                $factory.pageList.push($factory.page);
    
                $factory.onCompile();
    
                $timeout(function() {

                    $view.pages[$factory.page.key].init();

                    for (var c in $view.pages[$factory.page.key].components) {
                        if ($view.pages[$factory.page.key].components[c].id)
                            $view.pages[$factory.page.key].components[c].init();
                    }

                    $bcast.shout($factory.page.key + "_compiled", {
                        $page: $view.pages[$factory.page.key], 
                        $comp: $view.pages[$factory.page.key].components
                    });

                    $factory.strech(function() {

                        if ($factory.index == -1) {

                            $factory.onCurrentPageAssignment();

                            $factory.onLocated();

                        } else {

                            if ($factory.needsRelocation()) {

                                $factory.forward();

                                $timeout($factory.onLocated,$theme.anim.slider_duration);

                            } else {

                                $factory.onCurrentPageAssignment();

                                $factory.onLocated();

                            }

                        }

                    });
    
                }, 50);

            };

            if ($factory.index == -1) {

                $factory.onDisabled();

            } else {

                var previousPage = $factory.pageList[$factory.index];
                $view.pages[previousPage.key].disable();

                $timeout($factory.onDisabled, $theme.anim.page_disable_duration);

            }

        },
        clearLoad: function(key) {

            $view.lock();

            var slider = $css.pages.slider.select().element;
            
            slider.innerHTML = "";
            slider.className = "";

            $css.pages.slider
                .begin()
                    .left(0)
                .commit();

            slider.className = $theme.anim.slider;

            for (let i = 0; i < $factory.pageList.length; i++) {
                $view.pages[$factory.pageList[i].key].dispose();
                $factory.pageList[i].element.remove();
            }

            $factory.index = -1;
            $factory.page = null;
            $factory.pageList = [];

            $factory.load(key);

        },
        strech: function(onSuccess) {

            var success = true;

            var availableHeight = $css.pages.select().element.offsetHeight - 30;
            var block, view, requiredHeight;

            for (var i = 0; i < $factory.pageList.length; i++) {

                block = $css.page.block.selectAt(i).element;

                if (block == null) {

                    success = false;
                    
                    $timeout(function() {
                        $factory.strech(onSuccess);
                    },50);

                    break;
                }

                view = block.querySelector("view");
                requiredHeight = view.offsetHeight + $theme.dimen.page.title_height + (2 * $theme.dimen.page.view_padding);

                if (availableHeight < requiredHeight) {
                    block.style = "height: " + availableHeight + "px";
                } else {
                    block.style = "height: " + requiredHeight + "px";
                }

            }

            if (success)
                onSuccess();

        },
        close: function() {

            var clone = [];

            for (var i = 0; i < $factory.pageList.length; i++) {

                if (i < $factory.index)
                    clone.push($factory.pageList[i]);
                else {
                    $view.pages[$factory.pageList[i].key].dispose();
                    $factory.pageList[i].element.remove();
                }

            }

            $factory.pageList = clone;

            $factory.back();

        },
        clear: function() {

            for (let i = 0; i < $factory.pageList.length; i++) {
                $view.pages[$factory.pageList[i].key].dispose();
                $factory.pagesList[i].element.remove();
            }

            $factory.index = -1;
            $factory.page = null;
            $factory.pages = [];

            $css.pages.slider
                .begin()
                    .left(0)
                .commit();

            $view.bar.title("Welcome");

        }
    };

    $style.onScreenSizeChanged(function() {

        $factory.strech($factory.locate);

    });

    return $factory;

});