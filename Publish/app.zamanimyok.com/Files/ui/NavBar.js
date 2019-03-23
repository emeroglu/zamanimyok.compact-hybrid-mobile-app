$js.compile("NavBar", [View], function($self) {

    $self.fields = {

        title: ""

    };

    $self.overrides = {

        on_tag: function () { return "z-nav-bar"; },  

        on_construct: function($views) {

            $views.back = new IconView();
            $views.back.icon = "arrow-left";
            $views.back.size = "small";
            $views.back.weight = "light";

            $views.title = new TextView();
            $views.title.text = $self.title;

            $views.line = new View();
            $views.line.name= "line";

        },

        on_ready: function($views, $ready) {

            $views.back.onClick(function() { $bridge.js.onBackPressed(); });

            $ready();

        }

    };

}, function() {

    $css.select("z-nav-bar")
        .begin()
            .relativeLeft()
            .widthFull()
            .height(40)
            .marginTop(10)
            .marginBottom(15)
        .save();

    $css.select("z-nav-bar z-icon-view")
        .begin()
            .relativeLeft()
            .width(60)
            .height(40)
            .textColor($theme.color.white)
        .save();

    $css.select("z-nav-bar z-text-view")
        .begin()
            .relativeLeft()
            .widthCropFromFull(60)
            .height(40)
            .textLineHeight(37)
            .textColor($theme.color.white)
            .textSizeViewportWidth(5)
            .textExtraLight()
            .textLeft()
        .save();

    $css.select("z-nav-bar z-view[z-name='line']")
        .begin()
            .relativeLeftFull()
            .height(1)
            .backgroundColor($theme.color.black)
            .marginTop(5)

        .save();

});