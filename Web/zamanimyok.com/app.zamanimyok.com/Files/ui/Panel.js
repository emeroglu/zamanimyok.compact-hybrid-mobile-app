$js.compile("Panel", [View], function ($self) {

    $self.fields = {

        dimen: "",
        inset: ""

    };

    $self.overrides = {

        on_tag: function() { return "z-panel"; },

        on_ready: function ($views, $ready) {

            var width = $self.dimen.split(":")[0];
            var height = $self.dimen.split(":")[1];

            var w, h;

            if (width == "full") {
                w = "100%";
            } else if (width.indexOf("%") != -1) {
                if (width.indexOf("-") != -1)
                    w = "calc(100% - " + width.replace("-","") + ")";
                else
                    w = width;

            } else if (width.indexOf("-") != -1) {
                w = "calc(100% - " + width.replace("-","") + "px)";
            } else {
                w = width + "px";
            }
            
            if (height == "auto")
                h = "auto";
            else if (height.indexOf("-") != -1)
                h = "calc(100% - " + height.replace("-","") + "px)";
            else
                h = height + "px";

            $css.select($self.selector)
                .begin()
                    .relativeLeft()
                    .widthPlain(w)
                    .heightPlain(h)
                .save();

            if ($self.inset != "") {
                
                var inset_l = $self.inset.split(":")[0];
                var inset_r = $self.inset.split(":")[1];

                var r, l;

                if (inset_l.indexOf("%") != -1) {
                    l = inset_l;
                } else {
                    l = inset_l + "px";
                }

                if (inset_r.indexOf("%") != -1) {
                    r = inset_r;
                } else {
                    r = inset_r + "px";
                }

                $css.select($self.selector)
                    .begin()
                        .paddingLeftPlain(l)
                        .paddingRightPlain(r)
                    .save();
        
            }

            $ready();

        }

    };

});