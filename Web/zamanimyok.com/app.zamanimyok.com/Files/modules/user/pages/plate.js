$js.compile("PlatePage", [PostLoginPage], function($self) {

    $self.overrides = {

        on_key: function() { return "plate"; },

        on_type: function () { return "tail"; },

        on_back_page: function () { return "models"; },        

        on_title: function () { return "Plaka"; },
        
        on_show: function($views) {

            $views.content.views.plate.reset();

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
                    text: "Aracınızı tanımlamak için son olarak plakasını girmeniz gerekiyor :)",
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
                    
                    $api.new_vehicle($data.vehicle.model.pk, $data.vehicle.plate, function () {
                        $nav.backTo("vehicles");
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

        }        

    };     

});