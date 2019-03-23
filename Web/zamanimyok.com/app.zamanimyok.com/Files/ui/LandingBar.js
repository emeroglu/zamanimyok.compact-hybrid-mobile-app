$js.compile("LandingBar", [View], function($self) {    

    $self.overrides = {

        on_tag: function() { return "z-landing-bar"; },

        on_construct: function($views) {           

            $views.bar = new Panel()
                .init({
                    dimen: "full:60"
                });

            $views.bar.views.menu = new Panel()
                .init({
                    dimen: "60:60"
                });

            $views.bar.views.menu.views.icon = new IconView()
                .init({
                    icon: "home",
                    weight: "light",
                    size: 5,
                    color: $theme.color.white
                })
                .onClick(function() { $page.current.open(); });

            $views.bar.views.logo = new Panel()
                .init({
                    dimen: "-120:60"
                });

            $views.bar.views.list = new Panel()
                .init({
                    dimen: "60:60"  
                });

            $views.bar.views.list.views.icon = new IconView()
                .init({
                    icon: "list-ul",
                    weight: "light",
                    size: 5,
                    color: $theme.color.white
                })
                .onClick(function () { $nav.to("list"); });

        }

    };

}, function() {

});