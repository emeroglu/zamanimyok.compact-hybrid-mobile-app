$js.compile("KeyValueItem", [View], function($self) {

    $self.fields = {

        key: null,
        value: null

    };

    $self.overrides = {

        on_tag: function() { return "z-key-value-item"; },

        on_construct: function($views) {            

            $views.key = new View().init({ name: "v_key" });
            $views.value = new View().init({ name: "v_value" });

            $views.key.views.text = new TextView()
                .init({
                    size: 3.5,
                    line_height: 24,
                    weight: "regular",
                    align: "left",
                    text: $self.key,
                    color: $theme.color.main
                });

            $views.value.views.text = new TextView()
                .init({
                    size: 3.5,
                    line_height: 24,
                    weight: "light",
                    align: "right",
                    text: $self.value(),
                    color: $theme.color.grayLight
                });

        }

    };

    $self.schema = {

        update: function($model) {

            $self.key = $model.key;
            $self.value = $model.value;

            $self.views.key.views.text.update($self.key);
            $self.views.value.views.text.update($self.value());

        }

    };

}, function() {
    
    $css.select("z-key-value-item z-view[z-name='v_key']")
        .begin()
            .relativeLeft()
            .widthPercent(30)
        .save();

    $css.select("z-key-value-item z-view[z-name='v_value']")
        .begin()
            .relativeLeft()
            .widthPercent(70)
        .save();

});