$js.compile("ModelsPage", [PostLoginPage], function($self) {

    $self.overrides = {

        on_key: function() { return "models"; },

        on_type: function () { return "middle"; },

        on_back_page: function () { return "brands"; },

        on_title: function () { return "Model Seç"; },

        on_show_start: function ($views, $ready) {

            $views.content.views.list.element.scrollTop = 0;
            $views.content.views.list.update();

            $ready();

        }

    };

    $self.extensions = {

        on_construct: function($views) {                                   

            $views.content.views.list = new ListView()                
                .onModel(function () {
                    return $data.models;
                })
                .onGenerate(function($item, $model) {

                    $item.views.item = new ModelItem()
                        .init({
                            model: $model
                        });

                });

        },

        on_style: function ($views) {

            $css.select($views.content.views.list.selector)
                .begin()
                    .relativeLeftFull()
                    .heightFull()
                .save();

        }

    };  

});