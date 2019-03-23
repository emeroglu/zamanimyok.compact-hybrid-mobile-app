$js.compile("IconView", [View], function($self) {

    $self.fields = {

        _i: null,

        icon: "",
        size: 0,
        weight: "",
        color: "",
        side: 0

    };

    $self.overrides = {

        on_tag: function () { return "z-icon-view"; },

        on_compile: function () {

            var e = document.createElement($self.tag);
            
            var fa = "";

            if ($self.weight == "light")
                fa = "fal";
            else if ($self.weight == "regular")
                fa = "far";
            else
                fa = "fa";

            if ($self.spin)
                fa += " fa-spin";

            $self._i = document.createElement("i");
            $self._i.className = fa + " fa-" + $self.icon;

            e.appendChild($self._i);

            return e;

        },

        on_ready: function ($views, $ready) {           

            $css.select($self.selector + " i")
                .begin()
                    .textSizeViewportWidth(($self.size == 0) ? 4 : $self.size)
                    .textColor(($self.color == "") ? $theme.color.grayLight : $self.color)
                    .sideCentered(($self.side == 0) ? 40 : $self.side)
                    .impTextLineHeight(($self.side == 0) ? 40 : $self.side)
                .save();

            $ready();

        }

    };

    $self.schema = {

        update: function (icon, color, spin) {
            
            $self.icon = icon;
            $self.color = color;
            $self.spin = spin;
            
            var fa = "";

            if ($self.weight == "light")
                fa = "fal";
            else if ($self.weight == "regular")
                fa = "far";
            else
                fa = "fa";

            if ($self.spin)
                fa += " fa-spin";

            $self._i.className = fa + " fa-" + $self.icon;

            $css.select($self.selector + " i")
                .begin()                    
                    .textColor(($self.color == "") ? $theme.color.grayLight : $self.color)                    
                .commit();
        }

    };

}, function() {

    $css.select("z-icon-view")
        .begin()
            .absolute()
            .sideFull()
        .save();

    $css.select("z-icon-view i")
        .begin()
            .absolute()
            .textCenter()
        .save();

});