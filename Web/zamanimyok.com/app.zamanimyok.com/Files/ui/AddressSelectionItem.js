$js.compile("AddressSelectionItem", [View], function($self) {

    $self.fields = {

        address: null,
        type: ""

    };

    $self.overrides = {

        on_tag: function() { return "z-address-selection-item"; },

        on_construct: function($views) {

            $views.item = new View().init({ name: "v_item" })
                .onClick(function () {

                    if ($self.type == "take_over") {
                        $data.new_request.takeOverAddress = $self.address;
                        $nav.to("delivery_address_selection");
                    } else {
                        $data.new_request.deliveryAddress = $self.address;
                        $nav.to("note");                    
                    }                    

                });

            $views.item.views.top = new View().init({ name: "v_top" });
            $views.item.views.bottom = new View().init({ name: "v_bottom" });

            $views.item.views.top.views.title = new Panel()
                .init({
                    dimen: "-100:full"
                })

            $views.item.views.top.views.title.views.text = new TextView()
                .init({
                    size: 4.25,
                    line_height: 50,
                    weight: "regular",
                    text: $self.address.name,
                    color: $theme.color.main
                });           

            $views.item.views.bottom.views.text = new TextView()
                .init({
                    size: 3,
                    line_height: 24,
                    weight: "light",
                    text: $self.address.value,
                    color: $theme.color.grayLight
                });

        }

    };

}, function() {

    $css.select("z-address-selection-item z-view[z-name='v_item']")
        .begin()
            .relativeLeft()
            .widthPercentCentered(94)
            .backgroundColor($theme.color.white)
            .marginTop(10)
            .round(10)
            .shadow("#dad9d9 0px 2px 20px 0px")
        .save();

    $css.select("z-address-selection-item z-view[z-name='v_top']")
        .begin()
            .relativeLeft()
            .widthPercentCentered(90)
            .height(50)
            .marginTop(10)
        .save();

    $css.select("z-address-selection-item z-view[z-name='v_bottom']")
        .begin()
            .relativeLeft()
            .widthPercentCentered(90)
            .paddingBottom(20)
        .save();

});