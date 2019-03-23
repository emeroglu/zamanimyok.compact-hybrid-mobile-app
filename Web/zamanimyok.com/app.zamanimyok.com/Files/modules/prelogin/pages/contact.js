$js.compile("ContactPage", [Page], function($self) {

    $self.overrides = {

        on_key: function() { return "contact"; },

        on_type: function () { return "tail"; },

        on_back_page: function () { return "signin"; },

        on_construct: function($views) {

            $views.bar = new PreloginNavBar()
                .init({
                    title: "Bize Ulaşın"
                });

            $views.page = new ListView()
                .init({
                    name: "lv"                    
                })
                .onModel(function () {
                    return  [
                        { icon: "phone", size: 15, title: "(216) 458 96 52", text: "Bize hafta içi mesai saatleri (09:00 - 18:00) içerisinde telefonla ulaşabilirsiniz." },
                        { icon: "envelope", size: 18, title: "destek@zamanimyok.com", text: "Bize hafta içi mesai saatleri (09:00 - 18:00) içerisinde e-posta yoluyla ulaşabilirsiniz." },
                        { icon: "map-marker-alt", size: 18, title: "zamanımyok Ofis", text: "Metropol İş Merkezi 4.Kat <br /> Ataşehir - İstanbul" }
                    ];
                })
                .onGenerate(function ($item, $model) {                            

                    $item.views.phone = new Panel()
                        .init({
                            dimen: "-10%:auto",
                            inset: "5%:5%"
                        });

                    $item.views.phone.views.icon = new Panel()
                        .init({
                            dimen: "full:100"
                        });

                    $item.views.phone.views.icon.views.icon = new IconView()
                        .init({
                            icon: $model.icon,
                            size: $model.size,
                            side: 100,
                            weight: "light",
                            color: $theme.color.white
                        });

                    $item.views.phone.views.phone = new Panel()
                        .init({
                            dimen: "full:50"
                        });

                    $item.views.phone.views.phone.views.text = new TextView()
                        .init({
                            size: 5,
                            align: "center",
                            line_height: 50,
                            text: $model.title
                        });

                    $item.views.phone.views.text = new Panel()
                        .init({
                            dimen: "-10%:50",
                            inset: "5%:5%"
                        });

                    $item.views.phone.views.text.views.text = new TextView()
                        .init({
                            size: 3.5,
                            weight: "light",
                            align: "center",
                            line_height: 25,
                            text: $model.text
                        });

                    $item.views.space = new Space()
                        .init({
                            dimen: "full:25"
                        });

                });

        },       

        on_style: function ($views) {

            $css.select($views.page.selector)
                .begin()
                    .relativeLeftFull()
                    .heightCropFromFull(70)
                .save();           

        },

        on_show_start: function($views, $ready) {

            $module.current.views.image.switch("right");                    

            $ready();

        }

    };

});