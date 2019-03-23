$js.compile("ListView", [View], function($self) {

    $self.fields = {

        data: [],
        item: {}

    };

    $self.delegates = {

        on_generate: function() { },
        onGenerate: function(delegate) { $self.on_generate = delegate; return $self; }

    };

    $self.overrides = {

        on_tag: function() { return "z-list-view"; },

        on_construct: function($views) {

            $views.container = new View();
            $views.container.name = "container";

            for (var i = 0; i < $self.data.length; i++) {

                var name = "item_" + i;
                var view = new View();
                view.on_tag = function() { return "z-list-item"; };
                view.name = name;

                $self.on_generate(view, $self.data[i]);

                $views.container.views[name] = view;

            }

        },

        on_ready: function($views, $ready) {

            $self.item = $views.container.views.item_0;

            $self.item.selector = "z-list-item";

            $ready();

        }

    };

}, function() {

    $css.select("z-list-view")
        .begin()
            .verticalScroll()
        .save();

    $css.select("z-list-view z-view[z-name='container']")
        .begin()
            .absolute()
            .marginBottom(50)
        .save();

});