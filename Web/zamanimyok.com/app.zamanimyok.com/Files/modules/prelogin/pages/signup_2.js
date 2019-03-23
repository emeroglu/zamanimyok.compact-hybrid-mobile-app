$js.compile("Signup2Page", [Page], function($self) {

    $self.overrides = {

        on_key: function() { return "signup-2"; },

        on_type: function () { return "middle"; },

        on_back_page: function () { return "signup"; },

        on_construct: function($views) {

            $views.bar = new PreloginNavBar()
                .init({
                    title: "Tek Kullanımlık Şifre"
                });

            $views.space = new Space()
                .init({
                    dimen: "full:20"
                });

            $views.pass = new PreloginTextbox()
                .init({
                    type: "password",
                    icon: "key",
                    iconAnchor: "right",
                    placeholder: "Şifre"
                })
                .onChange(function () {

                    if ($views.pass.valid())
                        $views.btn.enable();
                    else
                        $views.btn.disable();

                });

            $views.space_2 = new Space()
                .init({
                    dimen: "full:20"
                });

            $views.panel = new Panel()
                .init({
                    dimen: "-20%:60",
                    inset: "10%:10%"
                });

            $views.space_4 = new Space()
                .init({
                    dimen: "full:20"
                });

            $views.panel.views.text = new TextView()
                .init({
                    size: 3.75,
                    align: "center",
                    line_height: 30,
                    text: "E-Posta adresinize gönderilen tek kullanımlık şifreyi girerek, Şifre Belirleme ekranına geçebilirsiniz."
                });                       

            $views.rest = new Space()
                .init({
                    dimen: "full:rest"
                });

            $views.btn = new PreloginButton()
                .init({
                    text: "Devam"
                })
                .onClick(function () {

                    $api.check_otp($data.new_user.email, $views.pass.text(), function () {
                        $nav.to("signup_3");
                    }, function () {
                        $nav.back();
                    }, function () {
                        $views.btn.disable();
                        $views.pass.reset();
                    });
                    
                });

            $views.space_3 = new Space()
                .init({
                    dimen: "full:20"
                });

        },      

        on_show_start: function($views, $ready) {

            $views.btn.disable();
            $views.pass.reset();

            $module.current.views.image.switch("right-2");                    

            $ready();

        }

    };

});