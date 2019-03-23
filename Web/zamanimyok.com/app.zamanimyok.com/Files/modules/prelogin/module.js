$js.compile("PreloginModule", [Module], function($self) {

    $self.overrides = {

        on_key: function() { return "prelogin" },

        on_construct: function ($pages, $views) {

            $views.image = new ImageView();                
            $views.image.name = "iv";
            $views.image.src = $path.cdn + "/File/Image/" + version + "/background_login";                                

            $pages.signin = new SigninPage();
            $pages.about = new AboutPage();
            $pages.contact = new ContactPage();
            $pages.forgot = new ForgotPage();
            $pages.forgot_2 = new Forgot2Page();
            $pages.forgot_3 = new Forgot3Page();
            $pages.signup = new SignupPage();
            $pages.signup_2 = new Signup2Page();
            $pages.signup_3 = new Signup3Page();
            $pages.signup_4 = new Signup4Page();

        },

        on_content: function ($views) {

            $css.select($views.image.selector + " img")
                .begin()
                    .absolute()
                    .widthAuto()
                    .heightFull()
                    .brightness(0.4)
                    .translateX(-200)
                .save()
                .state("left")
                    .brightness(0.4)
                    .translateX(-200)
                .save()
                .state("right")
                    .brightness(0.2)
                    .translateX(-300)
                .save()
                .state("right-2")
                    .brightness(0.2)
                    .translateX(-400)                    
                .save()
                .state("right-3")
                    .brightness(0.2)
                    .translateX(-500)                    
                .save()
                .state("right-4")
                    .brightness(0.2)
                    .translateX(-600)                    
                .save();

        },

        on_complete: function ($pages, $views, $ready) {

            $views.image.transition("ease", 750);
            $views.image.switch("left");  
            
            $ready();

        }

    };

});