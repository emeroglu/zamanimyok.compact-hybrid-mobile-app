$js.compile("ForgotPage", [Page], function($self) {

    $self.overrides = {

        on_key: function() { return "forgot"; },

        on_type: function () { return "middle"; },

        on_back_page: function () { return "signin"; },

        on_construct: function($views) {

            $views.bar = new PreloginNavBar()
                .init({
                    title: "Şifremi Unuttum"
                });

            $views.space = new Space()
                .init({
                    dimen: "full:20"
                });

            $views.username = new PreloginTextbox()
                .init({
                    icon: "user",
                    iconAnchor: "right",
                    placeholder: "E-Posta",
                    case: "lower"
                })
                .onChange(function () {

                    if ($views.username.valid())
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
                    text: "Kayıt olduğunuz e-posta adresinize gönderilecek şifre ile yeni parola belirleyebilirsiniz."
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

                    $data.email = $views.username.text();

                    $api.forgot_password(function () {
                       $nav.to("forgot_2");
                    }, function () {
                        $views.username.reset();
                    });                    

                });

            $views.space_3 = new Space()
                .init({
                    dimen: "full:20"
                });

        },      

        on_show_start: function($views, $ready) {

            $views.btn.disable();
            $views.username.reset();

            $module.current.views.image.switch("right");                    

            $ready();

        }

    };

});