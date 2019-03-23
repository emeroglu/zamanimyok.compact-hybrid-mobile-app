$js.compile("VehiclesPage", [PostLoginPage], function($self) {

    $self.overrides = {

        on_key: function() { return "vehicles"; },

        on_type: function () { return "middle"; },

        on_back_page: function () { return "landing"; },

        on_title: function () { return "Araçlarım"; },
        
        on_show_start: function ($views, $ready) {

            $self.views.content.views.list.update();

            setTimeout($ready, 1000);

        }

    };

    $self.extensions = {

        on_construct: function($views) {                                   

            $views.content.views.list = new ListView()                
                .onModel(function () {
                    return $data.vehicles;
                })
                .onGenerate(function($item, $model) {

                    $item.views.item = new VehicleItem()
                        .init({
                            vehicle: $model
                        });

                });

            $views.content.views.new = new Button()
                .init({
                    text: "Yeni Araç Ekle"
                })
                .onClick(function () {
                    
                    $data.vehicle = {};

                    if ($data.brands == undefined)
                        $api.brands(function () { $nav.to("brands"); });
                    else
                        $nav.to("brands");

                });

        },

        on_style: function ($views) {

            $css.select($views.content.views.list.selector + " z-view[z-name='container']")
                .begin()
                    .widthPercentCentered(96)                    
                .save();

            $css.select($views.content.views.list.selector + " z-view[z-name='container'] z-list-item")
                .begin()
                    .widthPercent(50)
                    .marginTop(10)
                .save();

            $css.select($views.content.views.new.selector)
                .begin()
                    .left(0)
                    .bottom(0)
                .save();

        }

    };  

});