$js.compile("VehicleSelectionPage", [PostLoginPage], function($self) {

    $self.overrides = {

        on_key: function() { return "vehicle-selection"; },

        on_type: function () { return "middle"; },

        on_back_page: function () { return "landing"; },

        on_title: function () { return "Araç Seçimi"; },
        
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

                    $item.views.item = new VehicleSelectionItem()
                        .init({
                            vehicle: $model
                        });

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

        }

    };  

});