$js.compile("Module", [], function($self) {

    $self.fields = {

        element: null,
        container: null,

        views: {},
        pages: {},

        tag: "",
        selector: "",

        _container_generated: false,
        _initial_page: {}

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

                if (page.on_type() == "head") {

                    $self._initial_page = page;

                    page
                        .begin()
                                .onLoad($self._recurse)
                            .load();

                } else {
                    $self._recurse();
                }

            }            

        },
        load: function() {

            $self.tag = "z-" + $self.on_key() + "-module";

            $self.selector = $self.tag;

            $self.element = document.createElement($self.tag);
            document.body.appendChild($self.element);                     

            $self.on_init();  

            $self.on_construct($self.pages, $self.views);
                        
            $self.views.shade = new Shade();
            $self.views.message_line = new MessageLine();
            $self.views.message_box = new MessageBox();
            $self.views.confirmation = new Confirmation();
            $self.views.lock = new Lock();

            $window.$shade = $self.views.shade;
            $window.$message_line = $self.views.message_line;
            $window.$message_box = $self.views.message_box;
            $window.$confirmation = $self.views.confirmation;
            $window.$lock = $self.views.lock;

            $self._dyn_css();
            $css.target = $self.tag;

            $self.on_style($self.views);
    
            $self._on_recurse_end = function() {

                $css.target = $self.tag;

                $css.select($self.selector)
                    .begin()
                        .absolute()
                        .sideFull()
                        .mask()                        
                    .save();

                $self.on_content($self.views);

                setTimeout(function() {

                    $self._initial_page.show(function() {

                        $self.on_complete($self.pages, $self.views, $self.on_load);

                    });

                }, 250);

            };
            $self._recurse(); 

        },
        destroy: function() {

            var index = 0;
            var keys = Object.keys($self.pages);

            var recurse = function() {

                if ($self.pages[keys[index]].loaded)
                    document.getElementById($self.pages[keys[index]].tag).remove();

                index++;

                if (index < keys.length)
                    setTimeout(recurse, 50);
                else {

                    document.getElementById($self.tag).remove();
                    $self.element.remove();

                }


            };
            recurse();

        }

    }; 

}, function() {

    $css.select("z-pages")
        .begin()
            .absolute()
            .sideFull()
            .mask()
        .save();

});