$js.compile("SigninPage", [Page], function($self) {

    $self.overrides = {

        on_key: function() { return "signin"; },        

        on_type: function () { return "head"; },

        on_construct: function ($views) {

            $views.logo = new ImageView()
                .init({ 
                    name: "iv_logo", 
                    src: $path.cdn + "/File/Image/" + version + "/Logo" 
                });
            
            $views.space = new Space()
                .init({ 
                    dimen: "full:40" 
                });

            $views.username = new PreloginTextbox()
                .init({ 
                    icon: "user", 
                    iconAnchor: "right", 
                    placeholder: "E-Posta",
                    case: "lower" 
                })
                .onChange(function() {

                    if ($views.username.valid() && $views.password.valid())
                        $views.login.enable();
                    else
                        $views.login.disable();

                });

            $views.space_1 = new Space()
                .init({ 
                    dimen: "full:25" 
                });
            
            $views.password = new PreloginTextbox()
                .init({ 
                    type: "password", 
                    icon: "key", 
                    iconAnchor: "right", 
                    placeholder: "Şifre" 
                }).onChange(function() {

                    if ($views.username.valid() && $views.password.valid())
                        $views.login.enable();
                    else
                        $views.login.disable();

                });
    
            $views.space_8 = new Space()
                .init({ 
                    dimen: "full:10" 
                });

            $views.panel = new Panel()
                .init({ 
                    dimen: "30%:30", 
                    inset: "55%:15%" 
                });

            $views.panel.views.forgot = new TextView()
                .init({ 
                    name: "tv_forgot", 
                    size: 3.25, 
                    align: "right", 
                    text: "Şifremi Unuttum" 
                })
                .onClick(function () {

                    $nav.to("forgot");
    
                });

            $views.space_4 = new Space()
                .init({ 
                    dimen: "full:30" 
                });

            $views.login = new PreloginButton()
                .init({ 
                    name: "btn_login", 
                    text: "Giriş" 
                })
                .onClick(function() {
                   
                    $api.login($views.username.text(), $views.password.text(), function () {

                        if ($data.member.role == "USER") {

                            $bridge.native.setDeviceVariable("credentials", $views.username.text() + "," + $views.password.text());

                            $nav.load("user");

                        } else if ($data.member.role == "SERVANT") {

                            $bridge.native.setDeviceVariable("credentials", "");

                            $nav.load("servant");

                        }

                    }, function () {

                        $views.login.disable();

                        $views.username.reset();
                        $views.password.reset();

                    });                    

                });

            $views.space_5 = new Space()
                .init({ 
                    dimen: "full:10" 
                });

            $views.signup = new PreloginButton()
                .init({ 
                    name: "btn_signup", 
                    text: "Hemen Kaydol" 
                })
                .onClick(function () {

                    $nav.to("signup");

                });

            $views.space_6 = new Space()
                .init({ 
                    dimen: "full:rest" 
                });

            $views.bottom_left = new Panel()
                .init({ 
                    dimen: "50%:60" 
                })
                .onClick(function () {

                    $nav.to("about");
    
                });

            $views.bottom_left.views.space = new Space()
                .init({ 
                    dimen: "10:60" 
                });

            $views.bottom_left.views.icon = new Panel()
                .init({ 
                    dimen: "40:60" 
                });

            $views.bottom_left.views.icon.views.icon = new IconView()
                .init({ 
                    name: "ic_about", 
                    icon: "info-circle", 
                    weight: "light", 
                    size: 5, 
                    color: $theme.color.grayLight 
                });

            $views.bottom_left.views.text = new Panel()
                .init({ 
                    dimen: "-50:60" 
                });

            $views.bottom_left.views.text.views.text = new TextView()
                .init({ 
                    name: "tv_about", 
                    size: 3.75, 
                    align: "left", 
                    line_height: 60, 
                    text: "Hakkında" 
                });

            $views.bottom_right = new Panel()
                .init({ 
                    dimen: "50%:60" 
                })
                .onClick(function () {

                    $nav.to("contact");
    
                });
                   
            $views.bottom_right.views.text = new Panel()
                .init({ 
                    dimen: "-50:60" 
                });
                   
            $views.bottom_right.views.text.views.text = new TextView()
                .init({ 
                    name: "tv_contact", 
                    size: 3.75, 
                    align: "right", 
                    line_height: 60, 
                    text: "Bize Ulaşın" 
                });

            $views.bottom_right.views.icon = new Panel()
                .init({ 
                    dimen: "40:60" 
                });
                   
            $views.bottom_right.views.icon.views.icon = new IconView()
                .init({ 
                    name: "ic_about", 
                    icon: "envelope", 
                    size: "small", 
                    weight: "light", 
                    size: 5, 
                    color: $theme.color.grayLight 
                });

            $views.bottom_right.views.space = new Space()
                .init({
                    dimen: "10:60"
                });

        },        

        on_style: function($views) {

            $css.select($views.logo.selector)
                .begin()
                    .relativeLeft()
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

        },       

        on_complete: function ($views, $ready) {

            $views.login.disable();

            $ready();

        },

        on_show_start: function ($views, $ready) {

            $module.current.views.image.switch("left");

            $ready();

        }

    };

});