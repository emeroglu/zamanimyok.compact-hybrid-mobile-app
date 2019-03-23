$js.compile("CardView", [View], function($self) {

    $self.fields = {

        affiliate: null,      

    };

    $self.overrides = {

        on_tag: function() { return "z-card-view"; },

        on_construct: function($views) {

            $views.card = new View()
                .init({
                    name: "v_card"
                });

            $views.card.views.left = new View()
                .init({
                    name: "v_left"
                });

            $views.card.views.left.views.icon = new View()
                .init({
                    name: "v_icon"
                })

            $views.card.views.left.views.icon.views.image = new ImageView()
                .init({
                    src: $self.affiliate.icon
                });

            $views.card.views.right = new View()
                .init({
                    name: "v_right"
                });

            $views.card.views.right.views.first = new View()
                .init({
                    name: "v_first"
                });

            $views.card.views.right.views.first.views.name = new TextView()
                .init({
                    size: 4.5,
                    line_height: 40,
                    weight: "light",
                    text: $self.affiliate.name,
                    color: $theme.color.gray
                });

            $views.card.views.right.views.second = new View()
                .init({
                    name: "v_second"
                });

            $views.card.views.right.views.second.views.address = new TextView()
                .init({
                    size: 3,
                    line_height: 20,
                    weight: "light",
                    text: $self.affiliate.address,
                    color: $theme.color.grayLight
                });
                
            $views.card.views.line = new View()
                .init({
                    name: "v_line"
                });


            $views.card.views.bottom = new View()
                .init({
                    name: "v_bottom"
                });

            $views.card.views.bottom.views.distance = new View()
                .init({
                    name: "v_distance"
                });

            $views.card.views.bottom.views.distance.views.icon = new View()
                .init({
                    name: "v_distance_icon"
                });

            $views.card.views.bottom.views.distance.views.icon.views.image = new IconView()
                .init({
                    icon: "map-marker-alt",
                    size: 3.25,
                    side: 39,
                    weight: "light",
                    color: $theme.color.grayLight
                });

            $views.card.views.bottom.views.distance.views.text = new View()
                .init({
                    name: "v_distance_text"
                });
            
            $views.card.views.bottom.views.distance.views.text.views.text = new TextView()
                .init({
                    size: 3,
                    line_height: 39,
                    weight: "light",
                    align: "left",
                    text: $self.affiliate.distance + " km",
                    color: $theme.color.grayLight
                });

            $views.card.views.bottom.views.price = new View()
                .init({
                    name: "v_price"
                });

            $views.card.views.bottom.views.price.views.icon = new View()
                .init({
                    name: "v_price_icon"
                });

            $views.card.views.bottom.views.price.views.icon.views.image = new IconView()
                .init({
                    icon: "money-bill-alt",
                    size: 3.5,
                    side: 39,
                    weight: "light",
                    color: $theme.color.grayLight
                });

            $views.card.views.bottom.views.price.views.text = new View()
                .init({
                    name: "v_price_text"
                });

            $views.card.views.bottom.views.price.views.text.views.text = new TextView()
                .init({
                    size: 3,
                    line_height: 39,
                    weight: "light",
                    align: "left",
                    text: $self.affiliate.price + " TL",
                    color: $theme.color.grayLight
                });

            $views.card.views.bottom.views.details = new View()
                .init({
                    name: "v_details"
                });

            $views.card.views.bottom.views.details.views.text = new TextView()
                .init({
                    size: 3,
                    line_height: 39,
                    weight: "light",
                    align: "center",
                    text: "Rezervasyon Yap",
                    color: $theme.color.main
                })
                .onClick(function () {

                    $data.new_request = {};
                    $data.new_request.affiliate = $self.affiliate;

                    $api.vehicles(function () { $nav.to("vehicle_selection"); });                    

                });

        }

    };

    $self.schema = {

        update: function($model) {

            $self.affiliate = $model.affiliate;

            $self.views.card.views.left.views.icon.views.image.update($model.affiliate.icon);
            $self.views.card.views.right.views.first.views.name.update($model.affiliate.name);
            $self.views.card.views.right.views.second.views.address.update($model.affiliate.address);
            $self.views.card.views.bottom.views.distance.views.text.views.text.update($model.affiliate.distance + " km");
            $self.views.card.views.bottom.views.price.views.text.views.text.update($model.affiliate.price + " TL");

        }

    };

}, function() {

    $css.select("z-card-view z-view[z-name='v_card']")
        .begin()
            .relativeLeft()
            .widthPercentCentered(94)
            .height(160)
            .round(10)
            .marginTop(10)
            .backgroundColor($theme.color.whiteFull)
            .shadow("#dad9d9 0px 2px 20px 0px")
        .save();

    $css.select("z-card-view z-view[z-name='v_left']")
        .begin()
            .relativeLeft()
            .width(120)
            .height(120)
        .save();

    $css.select("z-card-view z-view[z-name='v_icon']")
        .begin()
            .relativeLeft()
            .side(90)
            .margin(15)
        .save();

    $css.select("z-card-view z-image-view img")
        .begin()
            .absolute()
            .sideFull()
            .round(20)
        .save();

    $css.select("z-card-view z-view[z-name='v_right']")
        .begin()
            .relativeLeft()
            .widthCropFromFull(120)
            .height(120)
        .save();

    $css.select("z-card-view z-view[z-name='v_first']")
        .begin()
            .relativeLeft()
            .widthCropFromFull(10)
            .height(40)
            .marginTop(10)
        .save();

    $css.select("z-card-view z-view[z-name='v_second']")
        .begin()
            .relativeLeft()
            .widthCropFromFull(20)
            .height(60)
        .save();

    $css.select("z-card-view z-view[z-name='v_line']")
        .begin()
            .relativeLeft()
            .widthPercent(94)
            .height(1)
            .marginHorizontalPercent(3)
            .backgroundColor($theme.color.grayLightest)
        .save();

    $css.select("z-card-view z-view[z-name='v_bottom']")
        .begin()
            .relativeLeft()
            .widthFull()
            .height(39)
        .save();

    $css.select("z-card-view z-view[z-name='v_distance']")
        .begin()
            .relativeLeft()
            .width(120)
            .height(39)
        .save();

    $css.select("z-card-view z-view[z-name='v_distance_icon']")
        .begin()
            .relativeLeft()
            .side(39)
            .marginLeft(15)
        .save();

    $css.select("z-card-view z-view[z-name='v_distance_text']")
        .begin()
            .relativeLeft()
            .widthCropFromFull(54)
            .height(39)
        .save();

    $css.select("z-card-view z-view[z-name='v_price']")
        .begin()
            .relativeLeft()
            .width(120)
            .height(39)
        .save();

    $css.select("z-card-view z-view[z-name='v_price_icon']")
        .begin()
            .relativeLeft()
            .side(39)
        .save();

    $css.select("z-card-view z-view[z-name='v_price_text']")
        .begin()
            .relativeLeft()
            .widthCropFromFull(39)
            .height(39)
        .save();

    $css.select("z-card-view z-view[z-name='v_details']")
        .begin()
            .relativeLeft()
            .widthCropFromFull(240)
            .height(39)
        .save();

});