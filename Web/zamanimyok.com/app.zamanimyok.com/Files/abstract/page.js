$js.compile("Page", [], function($self) { 

    $self.fields = {

        element: null,

        views: {},

        tag: "",
        selector: "",

        _touch_start_x: 0,
        _touch_start_y: 0,
        _touch_end_x: 0,
        _touch_end_y: 0,
        _going_back: false,

        loading: false,
        loaded: false,

        _showing: false

    };

    $self.delegates = {

        begin: function () { return $self; },

        on_init: function () { },
        onInit: function (delegate) { $self.on_init = delegate; return $self; },                

        on_load: function () { },
        onLoad: function (delegate) { $self.on_load = delegate; return $self; }

    };

    $self.virtuals = {

        on_key: function() { return ""; },

        on_type: function () { return ""; },

        on_construct: function () { },

        on_transition: function() { return "z-ease-500"; },

        on_style: function ($views) { },

        on_content_ready: function () { },

        on_complete: function ($views, $ready) { $ready(); },

        on_show_state: function() {
        
            if ($self.on_type() == "middle")
                return "center";             
            else
                return "show";
            
        },

        on_showing: function () { },

        on_show_start: function ($views, $ready) { $ready(); },

        on_show: function () { },

        on_hide_state: function() {
            
            if ($self.on_type() == "middle") {
                if ($nav.going_back) {
                    return ($self._showing) ? "left" : "right";
                } else {                
                    return ($self._showing) ? "right" : "left";
                }
            } else if ($self.on_type() == "head") {
                if ($self.loading)
                    return "initial";
                else
                    return "hide";
            } else {
                return "hide";
            }

        },

        on_hide: function () { }

    };

    $self.schema = {        

        _dyn_css: function () {

            var e = document.createElement("style");
            e.setAttribute("id", $self.tag);
            e.setAttribute("type", "text/css");
            document.head.appendChild(e);

        },
        _index: -1, 
        _keys: [],
        _on_recurse_end: null,
        _recurse: function () {

            $self._index++;

            if ($self._index == 0) {

                $self._keys = Object.keys($self.views);

            } else if ($self._index == $self._keys.length) {

                $self._on_recurse_end();

                return;

            }

            var key = $self._keys[$self._index];
            var view = $self.views[key];

            view
                .begin()
                    .provideParent($self)
                        .onLoad($self._recurse)
                    .load();       

        },       
        load: function () {

            $self.loading = true;

            $self.tag = "z-" + $self.on_key() + "-page";

            $self.selector = $self.tag;           

            $self.on_construct($self.views);            

            $self._dyn_css(); 
            $css.target = $self.tag;         

            var type = $self.on_type();

            if ($module.current.__name__ == "PreloginModule") {

                if (type == "head") {

                    $css.select($self.selector)
                        .begin()
                            .absolute()
                            .sideFull()
                            .mask()
                        .save()
                        .state("initial")
                            .translateXPercent(100)
                        .save()
                        .state("show")
                            .translateXPercent(0)
                        .save()
                        .state("hide")
                            .translateXPercent(-100)
                        .save();
    
                } else if (type == "middle") {
    
                    $css.select($self.selector)
                        .begin()
                            .absolute()
                            .sideFull()
                            .mask()
                        .save()
                        .state("initial")
                            .translateXPercent(100)
                        .save()
                        .state("left")
                            .translateXPercent(-100)
                        .save()
                        .state("center")
                            .translateXPercent(0)
                        .save()
                        .state("right")
                            .translateXPercent(100)
                        .save();
    
                } else if (type == "tail") {
    
                    $css.select($self.selector)
                        .begin()
                            .absolute()
                            .sideFull()
                            .mask()
                        .save()
                        .state("initial")
                            .translateXPercent(100)
                        .save()
                        .state("show")
                            .translateXPercent(0)
                        .save()
                        .state("hide")
                            .translateXPercent(100)
                        .save();
    
                } 

            } else {

                if (type == "head") {

                    $css.select($self.selector)
                        .begin()
                            .absolute()
                            .sideFull()
                            .mask()
                        .save()
                        .state("initial")
                            .translateXPercent(100)
                            .brightness(1)
                        .save()
                        .state("show")
                            .translateXPercent(0)
                            .brightness(1)
                        .save()
                        .state("hide")
                            .translateXPercent(-40)
                            .brightness(0.2)
                        .save();

                } else if (type == "middle") {

                    $css.select($self.selector)
                        .begin()
                            .absolute()
                            .sideFull()
                            .mask()
                        .save()
                        .state("initial")
                            .translateXPercent(100)
                            .brightness(1)
                        .save()
                        .state("left")
                            .translateXPercent(-40)
                            .brightness(0.2)
                        .save()
                        .state("center")
                            .translateXPercent(0)
                            .brightness(1)
                        .save()
                        .state("right")
                            .translateXPercent(100)
                            .brightness(1)
                        .save();

                } else if (type == "tail") {

                    $css.select($self.selector)
                        .begin()
                            .absolute()
                            .sideFull()
                            .mask()
                        .save()
                        .state("initial")
                            .translateXPercent(100)
                        .save()
                        .state("show")
                            .translateXPercent(0)
                        .save()
                        .state("hide")
                            .translateXPercent(100)
                        .save();

                }  
                
            }
                

            $self.element = document.createElement($self.tag);
            $module.current.container.appendChild($self.element);

            $self.element.ontouchstart = function($event) {

                $self._touch_start_x = $event.touches[0].clientX;
                $self._touch_start_y = $event.touches[0].clientY;

            };

            $self.element.ontouchmove = function($event) {

                $self._touch_end_x = $event.touches[0].clientX;
                $self._touch_end_y = $event.touches[0].clientY;

                if ($self._touch_start_x < $window.screen.width * 0.05) {
                    $self._going_back = true;
                }

            };

            $self.element.ontouchend = function($event) {

                if ($self._going_back) {

                    if ($self._touch_start_x < $self._touch_end_x && Math.abs($self._touch_end_y - $self._touch_start_y) < $window.screen.height * 0.05) {

                        $bridge.js.onBackPressed();

                        $self._going_back = false;

                    }

                }

            };

            $self.on_init();

            $self.element.className = "z-disp z-initial";

            $self._on_recurse_end = function () {                                    
                
                $self.on_style($self.views);

                setTimeout(function() {

                    $self.on_content_ready($self.views);

                    for (var key in $self.views) {
                        if ($self.views[key].on_tag() == "z-space")
                            $self.views[key].on_page_ready($self.views);                        
                    }

                    $self.element.className = "z-none z-initial";

                    $self.loaded = true;

                    $self.on_complete($self.views, $self.on_load);                    

                }, 25);

            };
            $self._recurse();    

        },
        show: function(onshow) {

            $lock.lock();

            $page.current = $self;

            $self._showing = true;

            var transition = $self.on_transition();
            var duration = parseInt(transition.split("-").slice(-1));            

            $self.element.className = $self.on_transition() + " z-disp z-" + $self.on_hide_state();

            setTimeout(function() {                

                $self.on_show_start($self.views, function () {

                    $self.on_showing();

                    $self.element.className = $self.on_transition() + " z-disp z-" + $self.on_show_state();

                    setTimeout(function() {

                        $self.element.className = "z-disp z-" + $self.on_show_state();                    

                        $self._showing = false;
                        $self.loading = false;

                        if ($self.on_type() == "head")
                            $nav.backQuit();
                        else
                            $nav.backDefault();

                        $self.on_show($self.views);

                        if (onshow != null) onshow();

                        $self.on_showing = function () { };

                        $lock.unlock();

                    }, duration + 50); 

                });                

            }, 50);

        },
        hide: function(onhide) {

            $self._showing = false;

            var transition = $self.on_transition();
            var duration = parseInt(transition.split("-").slice(-1));

            $self.element.className = $self.on_transition() + " z-disp z-" + $self.on_hide_state();

            setTimeout(function() {

                $self.element.className = "z-none z-" + $self.on_hide_state();                

                $self.on_hide();

                if (onhide != null) onhide();

            }, duration + 50);

        },
        switch: function(state, onswitch) {

            var transition = $self.on_transition();
            var duration = parseInt(transition.split("-").slice(-1));

            $self.element.className = $self.on_transition() + " z-disp z-" + state;

            setTimeout(function() {

                $self.element.className = "z-disp z-" + state;

                if (onswitch != null) onswitch();

            }, duration + 50);

        }

    };            

});