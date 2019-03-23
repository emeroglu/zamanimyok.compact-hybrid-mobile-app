$js.compile("TextView", [View], function($self) {

    $self.fields = {
        
        size: 0,
        align: "",
        color: "",
        line_height: 0,
        weight: "",
        text: ""

    };

    $self.overrides = {

        on_tag: function () { return "z-text-view"; },

        on_compile: function() {

            var e = document.createElement($self.tag);
            e.innerHTML = $self.text;

            return e;

        },

        on_ready: function ($views, $ready) {

            var weight = 400;

            if ($self.weight == "regular")
                weight = 400;
            else if ($self.weight == "light")
                weight = 300;
            else if ($self.weight == "extra_light")
                weight = 200;

            $css.select($self.selector)
                .begin()
                    .textLineHeight(($self.line_height == 0) ? 30 : $self.line_height)
                    .textSizeViewportWidth(($self.size == 0) ? 4 : $self.size)
                    .textColor(($self.color == "") ? $theme.color.grayLight : $self.color)
                    .textAlign(($self.align == "") ? "left" : $self.align)
                    .textWeight(weight)
                .save();

            $ready();

        }

    };

    $self.schema = {

        update: function(text) {

            $self.element.innerHTML = text;

        }

    };

}, function () {

    $css.select("z-text-view")
        .begin()
            .relativeLeft()
            .sideFull()            
        .save();

});