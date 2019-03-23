$js.compile("IconView", [View], function($self) {

    $self.fields = {

        _i: null,

        icon: "",
        size: "",
        weight: ""

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

            $self._i = document.createElement("i");
            $self._i.className = fa + " fa-" + $self.icon;

            e.appendChild($self._i);

            return e;

        },

        on_style: function () {

            var textsize = 0;

            if ($self.size == "larger")
                textsize = 36;
            else if ($self.size == "large")
                textsize = 32;
            else if ($self.size == "medium")
                textsize = 24;
            else if ($self.size == "small")
                textsize = 20;
            else if ($self.size == "tiny")
                textsize = 16;

            $css.select($self.selector + " i")
                .begin()
                    .textSize(textsize)
                .save();

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
            .sideCentered(40)
            .impTextLineHeight(40)
            .textCenter()
        .save();

});