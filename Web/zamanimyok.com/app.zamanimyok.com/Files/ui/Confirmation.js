$js.compile("Confirmation", [View], function ($self) {   

    $self.delegates = {

        on_yes: function () { },
        onYes: function (delegate) { $self.on_yes = delegate; return $self; },

        on_no: function () { },
        onNo: function (delegate) { $self.on_no = delegate; return $self; }

    };

    $self.overrides = {

        on_tag: function () { return "z-confirmation"; },

        on_construct: function ($views) {

            $views.box = new View().transition("ease", 500);               

            $views.box.views.text = new View();            
            $views.box.views.text.views.text = new TextView()
                .init({
                    size: 3.5,
                    line_height: 40,
                    weight: "light",
                    align: "left",
                    text: "dasdsafafafdsfdsf",
                    align: "center",
                    color: $theme.color.grayLight
                });

            $views.box.views.buttons = new View();

            $views.box.views.buttons.views.yes = new TextView()
                .init({
                    size: 3.75,
                    line_height: 36,
                    weight: "light",
                    text: "Evet",
                    align: "center",
                    color: $theme.color.whiteFull
                })
                .onClick(function () { $self.on_yes(); });

            $views.box.views.buttons.views.no = new TextView()
                .init({
                    size: 3.75,
                    line_height: 36,
                    weight: "light",
                    text: "Hayır",
                    align: "center",
                    color: $theme.color.main
                })
                .onClick(function () { $self.on_no(); });

        },

        on_style: function ($views) {

            $css.select($views.box.selector)
                .begin()
                    .absolute()
                    .widthFull()
                    .height(125)
                    .bottom(0)
                    .left(0)                    
                    .backgroundColor($theme.color.whiteFull)
                    .shadow("#909090 0px 5px 20px 0px")
                    .translateY(150)
                .save()
                .state("show")
                    .translateY(0)
                .save()
                .state("hide")
                    .translateY(150)
                .save();
            
            $css.select($views.box.views.text.selector)
                .begin()
                    .relativeLeft()
                    .widthPercentCentered(90)
                    .height(40)
                    .marginTop(15)
                .save();

            $css.select($views.box.views.buttons.selector)
                .begin()
                    .relativeLeft()
                    .widthPercentCentered(90)
                    .height(40)
                    .marginTop(10)
                .save();

            $css.select($views.box.views.buttons.views.yes.selector)
                .begin()
                    .absolute()
                    .widthPercent(30)
                    .heightCentered(36)
                    .leftPercent(13)
                    .backgroundColor($theme.color.main)
                    .round(3)
                .save();

            $css.select($views.box.views.buttons.views.no.selector)
                .begin()
                    .absolute()
                    .widthPercent(30)
                    .heightCentered(36)
                    .leftPercent(56)
                    .border("1px solid " + $theme.color.main)
                    .round(3)
                .save();


        }

    };

    $self.schema = {

        show: function (text) {

            $shade.pop();

            if (text != null)
                $self.views.box.views.text.views.text.update(text);

            $self.views.box.switch("show");

        },

        hide: function () {
            $self.views.box.switch("hide");
            $shade.vanish();
        }

    };

});