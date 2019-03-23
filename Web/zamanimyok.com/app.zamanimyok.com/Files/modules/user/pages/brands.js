$js.compile("BrandsPage", [PostLoginPage], function($self) {

    $self.overrides = {

        on_key: function() { return "brands"; },

        on_type: function () { return "middle"; },

        on_back_page: function () { return "vehicles"; },

        on_title: function () { return "Marka Seç"; },

        on_show_start: function ($views, $ready) {

            $views.content.views.list.element.scrollTop = 0;
            $views.content.views.list.update();

            setTimeout($ready, 1000);

        }

    };

    $self.extensions = {

        on_construct: function($views) {                                   

            $views.content.views.list = new ListView()                
                .onModel(function () {
                    return $data.brands;
                })
                .onGenerate(function($item, $model) {

                    $item.views.item = new BrandItem()
                        .init({
                            brand: $model
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