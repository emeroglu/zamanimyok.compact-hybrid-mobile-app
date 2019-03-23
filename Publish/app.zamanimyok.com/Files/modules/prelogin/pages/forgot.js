$js.compile("ForgotPage", [Page], function($self) {

    $js.import($self, Page);

    $self.overrides = {

        on_key: function() { return "forgot"; },

        on_construct: function($views) {

            $views.bar = new NavBar();
            $views.bar.title = "Şifremi Unuttum";

        },

        on_style: function ($views) {

            $css.select($self.selector)
                .state("initial")
                    .translateXPercent(100)
                .save()
                .state("show")
                    .translateXPercent(0)
                .save()
                .state("hide")
                    .translateXPercent(100)
                .save();

        },

        on_show: function() {

            $bridge.js.onBackPressed = function () {

                $module.prelogin.pages.signin.show();
                $self.module.views.image.switch("center");
                $self.hide();

                $bridge.js.onBackPressed = function () { $bridge.native.quit(); };

            };

        }

    };

});