$js.compile("ListView", [View], function($self) {

    $self.fields = {

        model: [],
        item: {}

    };

    $self.delegates = {

        on_model: function () { return []; },
        onModel: function (delagate) { $self.on_model = delagate; return $self; },

        on_generate: function() { },
        onGenerate: function(delegate) { $self.on_generate = delegate; return $self; }

    };

    $self.overrides = {

        on_tag: function() { return "z-list-view"; },

        on_construct: function($views) {

            $self.model = $self.on_model();

            $views.container = new View();
            $views.container.name = "container";

            for (var i = 0; i < $self.model.length; i++) {

                var name = "item_" + i;
                var view = new View();
                view.on_tag = function() { return "z-list-item"; };
                view.name = name;

                $self.on_generate(view, $self.model[i]);

                $views.container.views[name] = view;

            }            

        }

    };

    $self.schema = {

        update: function () {

            try {

                $self.model = $self.on_model();            

                var currentCount = Object.keys($self.views.container.views).length;
                var toBeCount = $self.model.length;

                if (currentCount == toBeCount) {

                    var i = -1;

                    for (var key in $self.views.container.views) {
                        
                        i++;

                        $self.views.container.views[key].views.item.update($self.model[i]);

                    }

                } else {

                    $self.views.container.element.remove();

                    $self.views.container = new View();
                    $self.views.container.name = "container";

                    for (var i = 0; i < $self.model.length; i++) {

                        var name = "item_" + i;
                        var view = new View();
                        view.on_tag = function() { return "z-list-item"; };
                        view.name = name;

                        $self.on_generate(view, $self.model[i]);

                        $self.views.container.views[name] = view;

                    }

                    $self.views.container.on_load = function () { };
                    $self.views.container.begin().provideParent($self).load();

                }

            } catch (e) {}

        }

    };

}, function() {

    $css.select("z-list-view")
        .begin()
            .absolute()
            .sideFull()
            .verticalScroll()
        .save();

    $css.select("z-list-view z-view[z-name='container']")
        .begin()
            .absolute()
            .widthFull()
            .marginBottom(50)            
        .save();

    $css.select("z-list-view z-view[z-name='container'] z-list-item")
        .begin()
            .relativeLeftFull()
        .save();

});