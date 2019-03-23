$js.compile("Signup4Page", [Page], function($self) {

    $self.overrides = {

        on_key: function() { return "signup-4"; },

        on_type: function () { return "tail"; },

        on_back_page: function () { return "signup_3"; },

        on_construct: function($views) {

            $views.bar = new PreloginNavBar()
                .init({
                    title: "Bilgiler"  
                });

            $views.space = new Space()
                .init({
                    dimen: "full:20"
                });

            $views.name = new PreloginTextbox()
                .init({
                    icon: "id-card",
                    iconAnchor: "right",
                    placeholder: "İsim"  
                })
                .onChange(function () {

                    if ($views.name.valid() && $views.surname.valid() && $views.phone.valid())
                        $views.btn.enable();
                    else
                        $views.btn.disable();

                });

            $views.space_2 = new Space()
                .init({
                    dimen: "full:10"
                });

            $views.surname = new PreloginTextbox()
                .init({
                    icon: "id-card",
                    iconAnchor: "right",
                    placeholder: "Soyisim"  
                })
                .onChange(function () {

                    if ($views.name.valid() && $views.surname.valid() && $views.phone.valid())
                        $views.btn.enable();
                    else
                        $views.btn.disable();

                });

            $views.space_3 = new Space()
                .init({
                    dimen: "full:20"
                });

            $views.phone = new PreloginTextbox()
                .init({
                    icon: "phone",
                    iconAnchor: "right",
                    placeholder: "Cep Telefonu"  
                })
                .onChange(function () {

                    if ($views.name.valid() && $views.surname.valid() && $views.phone.valid())
                        $views.btn.enable();
                    else
                        $views.btn.disable();

                });

            $views.space_4 = new Space()
                .init({
                    dimen: "full:60"
                });

            $views.panel = new Panel()
                .init({
                    dimen: "-20%:60",
                    inset: "10%:10%"
                });         

            $views.panel.views.text = new TextView()
                .init({
                    size: 3.75,
                    align: "center",
                    line_height: 30,
                    text: "Kişisel bilgilerinizi de tamamladığınızda hesabınız hazır olacak :)"
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

                    $data.new_user.name = $views.name.text();
                    $data.new_user.surname = $views.surname.text();
                    $data.new_user.phone = $views.phone.text();

                    $api.signup(function () {
                       $nav.to("signin");
                    });                    

                });

            $views.space_5 = new Space()
                .init({
                    dimen: "full:20"
                });

        },      

        on_show_start: function($views, $ready) {

            $views.btn.disable();
            $views.name.reset();
            $views.surname.reset();
            $views.phone.reset();

            $module.current.views.image.switch("right-4");                    

            $ready();

        }

    };

});