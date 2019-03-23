$js.compile("BrandItem", [View], function($self) {

    $self.fields = {

        brand: null

    };

    $self.overrides = {

        on_tag: function() { return "z-brand-item"; },

        on_construct: function($views) {

            $views.item = new View()
                .init({
                    name: "v_item" 
                })
                .onClick(function () {

                    $data.vehicle.brand = $self.brand;

                    $api.models($self.brand.pk, function () { $nav.to("models"); });

                });

            $views.item.views.image = new View().init({ name: "v_image" });
            $views.item.views.image.views.image = new ImageView()
                .init({
                    src: $self.brand.image
                });

            $views.item.views.name = new View().init({ name: "v_name" });            
            $views.item.views.name.views.text = new TextView()
                .init({
                    size: 3.5,
                    line_height: 30,
                    weight: "light",
                    align: "left",
                    text: $self.brand.name,
                    color: $theme.color.grayLight
                });             

        }

    };

}, function() {

    $css.select("z-brand-item z-view[z-name='v_item']")
        .begin()
            .relativeLeft()
            .widthCropFromFull(10)
            .height(40)
            .paddingLeft(10)
            .paddingVertical(5)
            .marginBottom(1)
            .backgroundColor($theme.color.white)            
        .save();

    $css.select("z-brand-item z-view[z-name='v_image']")
        .begin()
            .relativeLeft()
            .side(40)            
        .save();

    $css.select("z-brand-item z-view[z-name='v_image'] img")
        .begin()            
            .sideCentered(30)            
        .save();

    $css.select("z-brand-item z-view[z-name='v_name']")
        .begin()
            .relativeLeft()
            .widthCropFromFull(50)
            .height(30)
            .marginVertical(5)
            .marginLeft(10)
        .save();             

});