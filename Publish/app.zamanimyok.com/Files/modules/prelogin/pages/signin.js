$js.compile("SigninPage", [Page], function($self) {

    $self.overrides = {

        on_key: function() { return "signin"; },        

        on_construct: function ($views) {

            $views.logo = new ImageView();
            $views.logo.name = "iv_logo";
            $views.logo.src = "https://cdn.zamanimyok.com/File/Image/" + version + "/Logo";

            $views.username = new View();
            $views.username.views.txt = new Textbox();
            $views.username.views.txt.icon = "user";  
            $views.username.views.txt.iconAnchor = "right";
            $views.username.views.txt.placeholder = "Kullanıcı Adı";
            $views.username.views.txt.onChange(function() {

                if ($views.username.views.txt.valid() && $views.password.views.txt.valid())
                    $views.login.enable();
                else
                    $views.login.disable();

            });

            $views.password = new View();
            $views.password.views.txt = new Textbox();
            $views.password.views.txt.type = "password";  
            $views.password.views.txt.icon = "key";  
            $views.password.views.txt.iconAnchor = "right";
            $views.password.views.txt.placeholder = "Şifre";
            $views.password.views.txt.onChange(function() {

                if ($views.username.views.txt.valid() && $views.password.views.txt.valid())
                    $views.login.enable();
                else
                    $views.login.disable();

            });

            $views.forgot = new TextView();
            $views.forgot.name = "forgot";
            $views.forgot.text = "Şifremi Unuttum";

            $views.login = new Button();
            $views.login.name = "btn_login";
            $views.login.text = "Giriş";
            $views.login.onClick(function() {

                $bridge.native.photoshoot();

            });

            $views.signup = new TextView();
            $views.signup.name = "signup";
            $views.signup.text = "Yeni Kullanıcı";

            $views.bottom_left = new View();

            $views.bottom_left.views.icon = new IconView();
            $views.bottom_left.views.icon.name = "ic_about";
            $views.bottom_left.views.icon.icon = "info-circle";
            $views.bottom_left.views.icon.size = "small";
            $views.bottom_left.views.icon.weight = "light";

            $views.bottom_left.views.about = new TextView();
            $views.bottom_left.views.about.name = "tv_about";
            $views.bottom_left.views.about.text = "Hakkında";            

            $views.bottom_right = new View();

            $views.bottom_right.views.contact = new TextView();
            $views.bottom_right.views.contact.name = "tv_contact";
            $views.bottom_right.views.contact.text = "Bize Ulaşın";

            $views.bottom_right.views.icon = new IconView();
            $views.bottom_right.views.icon.name = "ic_contact";
            $views.bottom_right.views.icon.icon = "envelope";
            $views.bottom_right.views.icon.size = "small";
            $views.bottom_right.views.icon.weight = "light";

        },

        on_style: function ($views) {

            $css.select($self.selector)
                .state("initial")
                    .translateXPercent(-100)
                .save()
                .state("show")
                    .translateXPercent(0)
                .save()
                .state("hide")
                    .translateXPercent(-100)
                .save();

        },

        on_content: function($views) {

            $css.select($views.logo.selector)
                .begin()
                    .absolute()
                    .widthFull()
                    .height(80)
                    .anchorTop()
                .save();

            $css.select($views.logo.selector + " img")
                .begin()
                    .absolute()
                    .widthPercentCentered(40)
                    .anchorBottom()
                .save();

            $css.select($views.username.selector)
                .begin()
                    .absolute()
                    .widthPercentCentered(70)
                    .height(45)
                    .top(120)
                .save();

            $css.select($views.password.selector)
                .begin()
                    .absolute()
                    .widthPercentCentered(70)
                    .height(45)
                    .top(200)
                .save();

            $css.select($views.forgot.selector)
                .begin()
                    .absolute()
                    .widthPercent(30)
                    .textHeight(30)
                    .top(250)
                    .leftPercent(55)
                    .textRight()
                    .textColor($theme.color.grayLight)
                    .textLight()
                    .textSizeViewportWidth(3.25)
                .save(); 

            $css.select($views.login.selector)
                .begin()
                    .absolute()
                    .widthPercentCentered(70)
                    .textHeight(40)
                    .top(320)
                    .textCenter()
                    .textColor($theme.color.white)
                    .textLight()
                    .textSizeViewportWidth(3.5)
                    .round(3)
                .save();

            $css.select($views.signup.selector)
                .begin()
                    .absolute()
                    .widthPercentCentered(70)
                    .textHeight(40)
                    .top(370)
                    .textCenter()
                    .textColor($theme.color.white)
                    .textLight()
                    .textSizeViewportWidth(3.5)
                    .backgroundColor($theme.color.main)
                    .round(3)
                .save();

            $css.select($views.bottom_left.selector)
                .begin()
                    .absolute()
                    .widthHalf()
                    .height(60)
                    .anchorBottomLeft()
                .save();

            $css.select($views.bottom_right.selector)
                .begin()
                    .absolute()
                    .widthHalf()
                    .height(60)
                    .anchorBottomRight()
                .save();

            $css.select($view.ic_about.selector)
                .begin()
                    .relativeLeft()
                    .width(50)
                    .height(60)
                    .marginLeft(10)
                    .textColor($theme.color.grayLight)                    
                .save();

            $css.select($view.tv_about.selector)
                .begin()
                    .relativeLeft()
                    .widthCropFromFull(60)
                    .textHeightCentered(60)                    
                    .textLeft()
                    .textColor($theme.color.grayLight)                    
                    .textSizeViewportWidth(3.75)
                    .textLight()                    
                .save();

            $css.select($view.tv_contact.selector)
                .begin()
                    .relativeLeft()
                    .widthCropFromFull(60)
                    .textHeightCentered(60)                    
                    .textRight()
                    .textColor($theme.color.grayLight)                    
                    .textSizeViewportWidth(3.75)
                    .textLight()                    
                .save(); 

            $css.select($view.ic_contact.selector)
                .begin()
                    .relativeLeft()
                    .width(50)
                    .height(60)
                    .marginRight(10)
                    .textColor($theme.color.grayLight)                    
                .save();

        },       

        on_complete: function ($views, $ready) {

            $views.login.disable();

            $views.signup.onClick(function () {

                $module.prelogin.pages.signup.show();
                $self.module.views.image.switch("right");
                $self.hide();

            });

            $views.forgot.onClick(function () {

                $module.prelogin.pages.forgot.show();
                $self.module.views.image.switch("right");
                $self.hide();

            });

            $views.bottom_left.onClick(function () {

                $module.prelogin.pages.about.show();
                $self.module.views.image.switch("right");
                $self.hide();

            });

            $views.bottom_right.onClick(function () {

                $module.prelogin.pages.contact.show();
                $self.module.views.image.switch("right");
                $self.hide();

            });

            $ready();

        }

    };

});