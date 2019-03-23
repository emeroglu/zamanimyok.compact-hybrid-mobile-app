$js.compile("Module", [], function($self) {

    $self.fields = {

        element: null,
        container: null,

        views: {},
        pages: {},

        tag: "",
        selector: "",

        _container_generated: false

    };

    $self.delegates = {

        begin: function () { return $self; },

        on_init: function () { },
        onInit: function (delegate) { $self.on_init = delegate; return $self; },

        on_initial_page: function() { },
        onInitialPage: function(delegate) { $self.on_initial_page = delegate; return $self; },

        on_load: function () { },
        onLoad: function (delegate) { $self.on_load = delegate; return $self; }

    };

    $self.virtuals = {

        on_key: function() { return ""; },

        on_construct: function () { },

        on_style: function () { },

        on_content: function () { },

        on_complete: function ($pages, $views, $ready) { $ready(); }

    };

    $self.schema = {       

        _dyn_css: function() {

            var e = document.createElement("style");
            e.setAttribute("id", $self.tag);
            e.setAttribute("type", "text/css");
            document.head.appendChild(e);                           

        },
        _index: -1,
        _merged: [],
        _merge: function () {

            for (var key in $self.views) {
                $self._merged.push({ id: $self.views[key].id, obj: $self.views[key], type: "view" });
            }            

            for (var key in $self.pages) {
                $self._merged.push({ id: $self.pages[key].id, obj: $self.pages[key], type: "page" });
            }

            $self._merged.sort(function (a, b) { if (a.id < b.id) return -1; if (b.id < a.id) return 1; return 0; });

        },
        _on_recurse_end: null,
        _recurse: function() {

            $self._index++;
    
            if ($self._index == 0) {

                $self._merge();
                
            } else if ($self._index == $self._merged.length) {
                
                $self._on_recurse_end();

                return;

            }

            var item = $self._merged[$self._index];

            if (item.type == "view") {

                var view = item.obj;

                view
                    .begin()
                        .provideParent($self)
                            .onLoad($self._recurse)
                        .load();

            }         

            if (item.type == "page") {

                if (!$self._container_generated) {
                    $self.container = document.createElement("z-pages");
                    $self.element.appendChild($self.container);
                    $self._container_generated = true;
                }

                var page = item.obj;

                page.module = $self;

                page
                    .begin()
                            .onLoad($self._recurse)
                        .load();

            }            

        },
        load: function() {

            $self.tag = "z-" + $self.on_key() + "-module";

            $self.selector = $self.tag + "[z-id='" + $self.id + "']";

            $self.element = document.createElement($self.tag);
            document.body.insertBefore($self.element, document.body.childNodes[0]);                     

            $self.on_init();  

            $self.on_construct($self.pages, $self.views);

            $self._dyn_css();

            $css.prefix = $self.tag;
            $css.target = $self.tag;   

            $self.on_style($self.views);
    
            $self._on_recurse_end = function() {
            
                $css.prefix = $self.tag;
                $css.target = $self.tag;  

                $self.on_content($self.views);
                $self.on_complete($self.pages, $self.views, $self.on_load);

            };
            $self._recurse(); 

        }

    }; 

});