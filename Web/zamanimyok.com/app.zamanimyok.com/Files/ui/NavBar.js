$js.compile("NavBar", [View], function($self) {

    $self.fields = {

        title: ""

    };

    $self.overrides = {

        on_tag: function () { return "z-nav-bar"; },  

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
            $views.text.views.title.weight = "regular";            
            $views.text.views.title.text = $self.title;

            $views.space_1 = new Space();
            $views.space_1.dimen = "full:10";                                           

        }

    };

}, function() {      


});