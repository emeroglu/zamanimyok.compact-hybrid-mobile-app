$js.compile("PreloginModule", [Module], function($self) {

    $self.overrides = {

        on_key: function() { return "prelogin" },

        on_construct: function ($pages, $views) {

            $views.image = new ImageView();                
            $views.image.name = "iv";
            $views.image.src = "https://cdn.zamanimyok.com/File/Image/" + version + "/background_login";                                

            $pages.signin = new SigninPage();
            $pages.about = new AboutPage();
            $pages.contact = new ContactPage();
            $pages.forgot = new ForgotPage();
            $pages.signup = new SignupPage();

        },

        on_content: function ($views) {

            $css.select($views.image.selector)
                .begin()
                    .absolute()
                    .sideFull()
                    .mask()
                .save();

            $css.select($views.image.selector + " img")
                .begin()
                    .absolute()
                    .heightFull()
                    .brightness(0.4)
                    .translateX(-200)
                .save()
                .state("left")
                    .brightness(0.2)
                    .translateX(0)
                .save()
                .state("center")
                    .brightness(0.4)
                    .translateX(-200)
                .save()
                .state("right")
                    .brightness(0.2)
                    .translateX(-400)                    
                .save();

        },

        on_complete: function ($pages, $views, $ready) {

            $views.image.transition("ease", 750);
            $views.image.switch("center");

            $pages.signin.show($ready);            

        }

    };

});