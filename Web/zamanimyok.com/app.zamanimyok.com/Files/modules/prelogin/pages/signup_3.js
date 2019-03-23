$js.compile("Signup3Page", [Page], function($self) {

    $self.overrides = {

        on_key: function() { return "signup-3"; },

        on_type: function () { return "middle"; },

        on_back_page: function () { return "signup_2"; },

        on_construct: function($views) {

            $views.bar = new PreloginNavBar()
                .init({
                    title: "Şifre Belirlerme"
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

                    if ($views.pass.valid() && $views.check.valid())
                        $views.btn.enable();
                    else
                        $views.btn.disable();

                });

            $views.space_3 = new Space()
                .init({
                    dimen: "full:10"
                });

            $views.check = new PreloginTextbox()
                .init({
                    type: "password",
                    icon: "key",
                    iconAnchor: "right",
                    placeholder: "Şifre Tekrar"
                })
                .onChange(function () {

                    if ($views.pass.valid() && $views.check.valid())
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
                    dimen: "full:60"
                });

            $views.panel.views.text = new TextView()
                .init({
                    size: 3.75,
                    align: "center",
                    line_height: 30,
                    text: "Şifre belirleyerek, hesabınızı oluşturabilirsiniz. Şifreniz minimum 6 haneli olmalıdır."
                });

            $views.rest = new Space()
                .init({
                    dimen: "full:rest"
                });

            $views.btn = new PreloginButton()
                .init({
                    text: "Kaydet"
                })
                .onClick(function () {

                    if ($views.pass.text().length < 6) {

                        $message_line.error("Şifre minimum 6 haneli olmalıdır!");
                        $message_line.show(function () {
                            $message_line.hide();
                        }, 2000);

                    } else {

                        if ($views.pass.text() == $views.check.text()) {

                            $data.new_user.password = $views.pass.text();

                            $nav.to("signup_4");

                        } else {                       

                            $message_line.error("Şifre Tekrar hatalı!");
                            $message_line.show(function () {
                                $message_line.hide();
                            }, 2000);                        

                        }

                    }

                });

            $views.space_5 = new Space()
                .init({
                    dimen: "full:20"
                });

        },      

        on_show_start: function($views, $ready) {

            $views.btn.disable();
            $views.pass.reset();
            $views.check.reset();

            $module.current.views.image.switch("right-4");                    

            $ready();

        }

    };

});