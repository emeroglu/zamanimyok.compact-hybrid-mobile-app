$js.compile("Shade", [View], function ($self) {   

    $self.overrides = {

        on_tag: function () { return "z-shade"; },

        on_construct: function ($views) {

            $views.shade = new View();            

        },

        on_style: function ($views) {

            $css.select($views.shade.selector)
                .begin()
                    .absolute()
                    .sideFull()
                    .top(0)
                    .left(0)                    
                    .backgroundColor($theme.color.blackFull)
                    .opacity(0.6)
                .save();              

        },

        on_ready: function ($views, $ready) {

            $self.vanish();

            $ready();

        }

    };

    $self.schema = {

        pop: function () {
            $self.views.shade.switch("disp");
        },

        vanish: function () {
            $self.views.shade.switch("none");
        }

    };

});