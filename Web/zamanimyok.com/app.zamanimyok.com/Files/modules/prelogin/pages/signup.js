$js.compile("SignupPage", [Page], function($self) {

    $self.overrides = {

        on_key: function() { return "signup"; },

        on_type: function () { return "middle"; },

        on_back_page: function () { return "signin"; },

        on_construct: function($views) {

            $views.bar = new PreloginNavBar()
                .init({
                    title: "E-Posta"  
                });

            $views.space = new Space()
                .init({
                    dimen: "full:20"
                });

            $views.pass = new PreloginTextbox()
                .init({
                    icon: "user",
                    iconAnchor: "right",
                    placeholder: "E-Posta",
                    case: "lower"  
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
                    text: "Kayıt olmak için geçerli bir e-posta adresi girmeniz gerekmektedir."  
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

                    $data.new_user = {};
                    $data.new_user.email = $views.pass.text();

                    $api.verify_email($data.new_user.email, function () {
                       $nav.to("signup_2");
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

            $module.current.views.image.switch("right");                    

            $ready();

        }

    };

});