$js.compile("PreloginNavBar", [View], function($self) {

    $self.fields = {

        title: ""

    };

    $self.overrides = {

        on_tag: function () { return "z-prelogin-nav-bar"; },  

        on_construct: function($views) {

            $views.space = new Space();
            $views.space.dimen = "full:10";

            $views.icon = new Panel();
            $views.icon.dimen = "60:40";

            $views.icon.views.back = new IconView();
            $views.icon.views.back.icon = "arrow-left";
            $views.icon.views.back.size = "small";
            $views.icon.views.back.weight = "light";
            $views.icon.views.back.color = $theme.color.white;
            $views.icon.views.back.size = 5;
            $views.icon.views.back.onClick(function() { $bridge.js.onBackPressed(); })

            $views.text = new Panel();
            $views.text.dimen = "-60:40";

            $views.text.views.title = new TextView();
            $views.text.views.title.size = 5.5;    
            $views.text.views.title.line_height = 40;    
            $views.text.views.title.color = $theme.color.white;            
            $views.text.views.title.text = $self.title;

            $views.space_1 = new Space();
            $views.space_1.dimen = "full:5";

            $views.line = new Panel();
            $views.line.dimen = "full:1";

            $views.line.views.line = new View();
            $views.line.views.line.name = "line";            

            $views.space_2 = new Space();
            $views.space_2.dimen = "full:15";

        }

    };

}, function() {    

    $css.select("z-prelogin-nav-bar z-view[z-name='line']")
        .begin()
            .absolute()
            .sideFull()
            .backgroundColor($theme.color.black)
        .save();


});