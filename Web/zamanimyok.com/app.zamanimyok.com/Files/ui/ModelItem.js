$js.compile("ModelItem", [View], function($self) {

    $self.fields = {

        model: null

    };

    $self.overrides = {

        on_tag: function() { return "z-model-item"; },

        on_construct: function($views) {

            $views.item = new View()
                .init({
                    name: "v_item"
                })
                .onClick(function () {

                    $data.vehicle.model = $self.model;

                    $nav.to("plate");

                });
            
            $views.item.views.text = new View().init({ name: "v_text" });
            $views.item.views.text.views.text = new TextView()
                .init({
                    size: 3.75,
                    line_height: 40,
                    weight: "light",
                    align: "center",
                    text: $self.model.name,
                    color: $theme.color.grayLight
                });             

        }

    };

}, function() {

    $css.select("z-model-item z-view[z-name='v_item']")
        .begin()
            .relativeLeft()
            .widthFull()
            .height(40)                        
            .marginBottom(1)
            .backgroundColor($theme.color.white)            
        .save();

    $css.select("z-model-item z-view[z-name='v_text']")
        .begin()
            .relativeLeftFull()
            .height(40)            
        .save();             

});