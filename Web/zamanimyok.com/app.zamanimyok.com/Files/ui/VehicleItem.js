$js.compile("VehicleItem", [View], function($self) {

    $self.fields = {

        vehicle: null

    };

    $self.overrides = {

        on_tag: function() { return "z-vehicle-item"; },

        on_construct: function($views) {

            $views.item = new View().init({ name: "v_item" })
                .onClick(function () {
                    
                    $data.vehicle = $self.vehicle;

                    $nav.to("vehicle_update");                   

                });

            $views.item.views.image = new View().init({ name: "v_image" });
            $views.item.views.image.views.image = new ImageView()
                .init({
                    src: $self.vehicle.brand.image
                });

            $views.item.views.info = new View().init({ name: "v_info" });

            $views.item.views.info.views.model = new View().init({ name: "v_model" });
            $views.item.views.info.views.model.views.text = new TextView()
                .init({
                    size: ($self.vehicle.model.length < 15) ? 4 : 3.5,
                    line_height: 34,
                    weight: "regular",
                    align: "center",
                    text: $self.vehicle.model,
                    color: $theme.color.main
                });           

            $views.item.views.info.views.brand = new View().init({ name: "v_brand" });
            $views.item.views.info.views.brand.views.text = new TextView()
                .init({
                    size: 3.5,
                    line_height: 24,
                    weight: "regular",
                    align: "center",
                    text: $self.vehicle.brand.name,
                    color: $theme.color.grayLight
                });

            $views.item.views.info.views.plate = new View().init({ name: "v_plate" });
            $views.item.views.info.views.plate.views.text = new TextView()
                .init({
                    size: 4.5,
                    line_height: 24,
                    weight: "regular",
                    align: "center",
                    text: $self.vehicle.plate,
                    color: $theme.color.gray
                });                                    

        }

    };

}, function() {

    $css.select("z-vehicle-item z-view[z-name='v_item']")
        .begin()
            .relativeLeft()
            .widthPercentCentered(94)
            .height(120)
            .backgroundColor($theme.color.white)            
            .round(10)
            .shadow("#dad9d9 0px 2px 20px 0px")
        .save();

    $css.select("z-vehicle-item z-view[z-name='v_image']")
        .begin()
            .absolute()
            .sideFull()
            .opacity(0.1)
        .save();

    $css.select("z-vehicle-item z-view[z-name='v_image'] img")
        .begin()            
            .sideCentered(90)            
        .save();

    $css.select("z-vehicle-item z-view[z-name='v_info']")
        .begin()
            .absolute()
            .widthCentered(150)
            .height(75)
            .top(20)
        .save();

    $css.merge("z-vehicle-item z-view[z-name='v_model']", "z-vehicle-item z-view[z-name='v_brand']", "z-vehicle-item z-view[z-name='v_plate']")
        .begin()
            .relativeLeft()
            .widthFull()
            .height(25)
        .save();           

});