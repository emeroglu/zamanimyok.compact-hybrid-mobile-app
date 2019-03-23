$js.compile("Page", [], function($self) { 

    $self.fields = {

        element: null,

        module: null,
        views: {},

        tag: "",
        selector: "",

        _touch_start_x: 0,
        _touch_start_y: 0,
        _touch_end_x: 0,
        _touch_end_y: 0,
        _going_back: false

    };

    $self.delegates = {

        begin: function () { return $self; },

        on_init: function () { },
        onInit: function (delegate) { $self.on_init = delegate; return $self; },

        on_initial_state: function() { return "initial"; },
        onInitialState: function(delegate) { $self.on_initial_state = delegate; return $self; },

        on_show_state: function() { return "show"; },
        onShowState: function(delegate) { $self.on_show_state = delegate; return $self; },

        on_hide_state: function() { return "hide"; },
        onHideState: function(delegate) { $self.on_hide_state = delegate; return $self; },

        on_load: function () { },
        onLoad: function (delegate) { $self.on_load = delegate; return $self; }

    };

    $self.virtuals = {

        on_key: function() { return ""; },

        on_construct: function () { },

        on_transition: function() { return "z-ease-500"; },

        on_style: function () { },

        on_content: function () { },

        on_content_ready: function () { },

        on_complete: function ($views, $ready) { $ready(); },

        on_show_start: function () { },

        on_show: function () { },

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

            $self.tag = "z-" + $self.on_key() + "-page";

            $self.selector = "";           

            $self.on_construct($self.views);            

            $self._dyn_css();                            

            $css.prefix = $self.tag;
            $css.target = $self.tag;            

            $css.select("")
                .begin()
                    .absolute()
                    .sideFull()
                    .mask()
                .save();            

            $self.on_style($self.views);

            $self.element = document.createElement($self.tag);
            $self.module.container.appendChild($self.element);

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

            $self.element.className = "z-disp z-" + $self.on_initial_state();

            $self._on_recurse_end = function () {                                    

                $self.on_content($self.views);

                setTimeout(function() {

                    $self.on_content_ready($self.views);
                    $self.on_complete($self.views, $self.on_load);

                    $self.element.className = "z-none z-" + $self.on_initial_state();

                }, 25);

            };
            $self._recurse();    

        },
        destroy: function() {

            document.getElementById($self.tag).remove();
                    
            $self.element.remove();

        },
        regenerate: function() {

            $self.destroy();
            
            var module = $self.module;

            var key = $self.on_key();

            var f = $self.__name__;
            eval("$self = new " + f + "();");

            $self.module = module;
            $self.module.pages[key] = $self;

        },
        show: function(onshow) {

            var transition = $self.on_transition();
            var duration = parseInt(transition.split("-").slice(-1));

            $self.element.className = $self.on_transition() + " z-disp z-" + $self.on_hide_state();

            setTimeout(function() {

                $self.on_show_start($self.views);
                
                $self.element.className = $self.on_transition() + " z-disp z-" + $self.on_show_state();

                setTimeout(function() {

                    $self.element.className = "z-disp z-" + $self.on_show_state();

                    if (onshow != null) onshow();

                    $self.on_show($self.views);

                }, duration + 50);

            }, 50);

        },
        hide: function(onhide) {

            var transition = $self.on_transition();
            var duration = parseInt(transition.split("-").slice(-1));

            $self.element.className = $self.on_transition() + " z-disp z-" + $self.on_hide_state();

            setTimeout(function() {

                $self.element.className = "z-none z-" + $self.on_hide_state();

                if (onhide != null) onhide();

                $self.on_hide();

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