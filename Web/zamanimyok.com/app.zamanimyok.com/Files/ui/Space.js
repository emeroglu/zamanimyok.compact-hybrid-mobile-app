$js.compile("Space", [View], function ($self) {

    $self.fields = {

        dimen: ""                

    };

    $self.overrides = {

        on_tag: function() { return "z-space"; },

        on_ready: function ($views, $ready) {

            var width = $self.dimen.split(":")[0];
            var height = $self.dimen.split(":")[1];

            var w, h;

            if (width == "full") {
                w = "100%";
            } else if (width.indexOf("%") != -1) {
                w = width;
            } else {
                w = width + "px";
            }

            if (height == "rest") {
                h = 0;
            } else if (height == "full") {
                h = "100%";
            } else {
                h = height + "px";
            }

            $css.select($self.selector)
                .begin()
                    .relativeLeft()
                    .widthPlain(w)
                    .heightPlain(h)
                .save();

            $ready();

        },

        on_page_ready: function ($views) {

            var height = $self.dimen.split(":")[1];

            if (height == "rest") {                

                var keys = Object.keys($views);
                var key = keys.slice(-1);

                var last = $views[key];

                var h = last.element.offsetTop + last.element.offsetHeight;
                
                $css.select($self.selector)
                    .begin()
                        .heightCropFromFull(h)
                    .save();

            }

        }

    };

});