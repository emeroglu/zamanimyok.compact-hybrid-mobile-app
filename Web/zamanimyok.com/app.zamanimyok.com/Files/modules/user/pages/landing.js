$js.compile("LandingPage", [Page], function($self) {

    $self.fields = {

        info_shown: false

    };

    $self.overrides = {

        on_key: function() { return "landing"; },

        on_type: function () { return "head"; },

        on_construct: function($views) {

            $views.background = new View();

            $views.logo = new ImageView()
                .init({
                    name: "iv_logo",
                    src: $path.cdn + "/File/Image/" + version + "/logo_white"
                })
                .transition("ease", 500);

            $views.menu = new MenuView();            

            $views.main = new View()
                .init({
                    name: "main"
                })
                .transition("ease", 500);

            $views.main.views.bar = new LandingBar();

            $views.main.views.map = new View();

            $views.main.views.map.views.map = new MapView();

            $views.main.views.card = new View();

            $views.main.views.card.views.card = new CardView()
                .init({
                    name: "card",                                        
                    affiliate: $data.affiliates[0]
                });            

        },

        on_style: function($views) {

            $css.select($views.background.selector)
                .begin()
                    .absolute()
                    .sideFull()
                    .background("linear-gradient(40deg, rgb(2, 68, 121) 10%, rgb(61, 145, 212) 65%)")
                .save();

            $css.select($views.logo.selector)
                .begin()
                    .absolute()
                    .widthFull()
                    .height(100)
                .save();

            $css.select($views.logo.selector + " img")
                .begin()
                    .absolute()
                    .widthCentered(1150 * 0.1)
                    .height(191 * 0.1)
                    .top(23)
                .save()
                .state("large")
                    .widthCentered(1150 * 0.15)
                    .height(191 * 0.15)
                    .top(60)
                .save()
                .state("normal")
                    .widthCentered(1150 * 0.1)
                    .height(191 * 0.1)
                    .top(23)
                .save();         

            $css.select($views.main.selector)
                .begin()
                    .absolute()
                    .sideFull()
                    .mask()
                    .transform("translateX(0px)")
                .save()
                .state("closed")
                    .transform("translateX(0px)")
                .save()
                .state("open")
                    .transform("translateX(350px)")
                .save();  
                
            $css.select($views.main.views.map.selector)
                .begin()
                    .absolute()
                    .widthFull()
                    .heightCropFromFull(140)
                    .top(140)
                    .left(0)
                .save();

            $css.select($views.main.views.card.selector)
                .begin()
                    .absolute()
                    .widthFull()
                    .height(80)                    
                    .top(60)
                    .left(0)                    
                .save();

            $css.select($views.main.views.card.views.card.selector + " z-view[z-name='v_card']")
                .begin()
                    .shadow("#909090 0px 5px 20px 0px")                  
                .save();

        },

        on_show: function ($views, $ready) {

            if ($self.info_shown) return;

            $self.info_shown = true;

            setTimeout(function () {

                $message_box
                    .begin()
                        .provideDelay(3000)
                        .provideText("Size en yakın oto-yıkama servislerimizi, bulunduğunuz konuma göre ortalama ücretleri ile birlikte, harita üzerinde bulabilirsiniz...")
                    .showThenHide();                

            }, 1000);

        }

    };

    $self.schema = {        

        open: function() {
            $view.iv_logo.switch("large");
            $view.main.switch("open", function() {
                $view.main.onClick($self.close).emitClick();
            });
        },

        close: function() {
            $view.iv_logo.switch("normal");
            $view.main.switch("closed", function() {
                $view.main.onClick(function() { }).emitClick();
            });
        }

    };

});