$js.compile("View", [], function($self) {

    $self.fields = {

        element: null,
        views: {},

        url: "",
        html: "",        

        name: "",

        key: "",
        tag: "",
        selector: "",

        state: "",
        anim: "",
        duration: 0

    };

    $self.delegates = {

        begin: function () { return $self; },

        parent: null,
        provideParent: function (parent) { $self.parent = parent; return $self; },

        on_load: function() { },
        onLoad: function (delegate) { $self.on_load = delegate; return $self; },

        onClick: function (delegate) {
            $self.element.onclick = delegate;
        }

    };

    $self.virtuals = {

        on_tag: function () { return "z-view"; },

        on_construct: function() { },

        on_style: function() {  },

        on_compile: function() { return document.createElement($self.tag); },
        
        on_append: function() {  },

        on_ready: function($views, $ready) { $ready(); }

    };

    $self.extensions = {        

    };

    $self.overrides = {

    };    

    $self.schema = {        

        transition: function (anim, duration) {
            $self.duration = duration;
            $self.anim = "z-" + anim + "-" + duration;
        },
        _on_state_name: function () {     
            return $self.anim + " z-" + $self.state;
        },
        _on_switch: function (onstate) {            
            $self.element.className = $self._on_state_name();                
        },
        switch: function (clss, on_state) {
            $self.state = clss;    
            $self._on_switch();
            if (on_state != null) setTimeout(on_state, $self.duration + 50);
        },

        _index: -1,
        _keys: [],
        _on_recurse_end: null,
        _recurse: function() {

            $self._index++;

            if ($self._index == 0) {

                $self._keys = Object.keys($self.views);

            }
            
            if ($self._index == $self._keys.length) {

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
                        
            $self.tag = $self.on_tag();                            

            $self.selector = $self.tag + "[z-id='" + $self.id + "']";            

            $self.on_construct($self.views);
            $self.on_style();

            $self.element = $self.on_compile();
            $self.parent.element.appendChild($self.element);

            $self.element.setAttribute("z-id", $self.id);

            if ($self.name != "") {
                $self.element.setAttribute("z-name", $self.name);
                $view[$self.name] = $self;
            }

            $self.on_append($self.views);

            $self._on_recurse_end = function() {
                 
                $self.on_ready($self.views, $self.on_load);

            };
            $self._recurse();

        }

    };

});