$js.compile("VehicleUpdatePage", [PostLoginPage], function($self) {

    $self.overrides = {

        on_key: function() { return "vehicle-update"; },

        on_type: function () { return "tail"; },

        on_back_page: function () { return "vehicles"; },        

        on_title: function () { return "Araç Güncelle"; },

        on_show_start: function ($views, $ready) {

            $views.content.views.plate.text($data.vehicle.plate);

            $ready();

        }

    };

    $self.extensions = {

        on_construct: function($views) {                                                        

            $views.content.views.message = new View();
            $views.content.views.message.views.text = new TextView()
                .init({                     
                    size: 3.5,
                    line_height: 25,
                    weight: "light",
                    text: "Aracınızı kaldırmak için aşağıdaki butona tıklayabilirsiniz...",
                    color: $theme.color.grayLight,
                    align: "center"
                });

            $views.content.views.plate = new Textbox()
                .init({
                    placeholder: "Plaka",
                    case: "upper"
                })
                .onChange(function ($text) {
                    $data.vehicle.plate = $text;
                });

            $views.content.views.save = new Button()
                .init({
                    text: "Kaydet"
                })
                .onClick(function () {
                    
                    $api.update_vehicle($data.vehicle.pk, $data.vehicle.plate, function () {
                        $nav.back();
                    });

                });

            $views.content.views.remove = new Button()
                .init({
                    text: "Aracı Kaldır"
                })
                .onClick(function () {
                    
                    $api.remove_vehicle($data.vehicle.pk, function () {
                        $nav.back();
                    });

                });

        },

        on_style: function($views) {

            $css.select($views.content.views.plate.selector)
                .begin()
                    .height(60)
                    .top(20)                    
                .save();

            $css.select($views.content.views.plate.selector + " input")
                .begin()
                    .textHeight(60)
                    .textCenter()
                    .textSizeViewportWidth(5)
                    .uppercase()
                .save();

            $css.select($views.content.views.message.selector)
                .begin()
                    .absolute()
                    .widthPercentCentered(70)                    
                    .top(250)
                .save();
               
            $css.select($views.content.views.save.selector)
                .begin()
                    .left(0)
                    .bottom(0)
                .save();

            $css.select($views.content.views.remove.selector)
                .begin()
                    .widthCentered(200)                    
                    .textHeight(40)
                    .round(3)
                    .top(320)                    
                .save();

        }        

    };     

});