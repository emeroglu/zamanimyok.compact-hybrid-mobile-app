$js.compile("ListPage", [PostLoginPage], function($self) {

    $self.overrides = {

        on_key: function() { return "list"; },

        on_type: function () { return "middle"; },

        on_back_page: function () { return "landing"; },

        on_title: function () { return "Liste"; },

        on_show_start: function ($views, $ready) {

            $views.content.views.list.update();

            setTimeout($ready, 1000);

        }

    };

    $self.extensions = {

        on_construct: function($views) {                                   

            $views.content.views.list = new ListView()
                .init({
                    model: $data.affiliates
                })
                .onModel(function () {
                    return $data.affiliates;
                })
                .onGenerate(function($item, $model) {

                    $item.views.card = new CardView()
                        .init({
                            affiliate: $model
                        });

                });


        },

        on_style: function($views) {

            

        }

    };

    $self.schema = {        

        

    };

});