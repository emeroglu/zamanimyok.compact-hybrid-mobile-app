$js.compile("AboutPage", [Page], function($self) {

    $self.overrides = {

        on_key: function() { return "about"; },

        on_construct: function($views) {

            $views.bar = new NavBar();
            $views.bar.title = "Hakkında";

            $views.page = new ListView();
            $views.page.name = "lv";
            $views.page.data = [];
            $views.page.data.push({ title: "Nasıl çalışır?", text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt." });
            $views.page.data.push({ title: "Kullanım Şartları", text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo." });
            $views.page.onGenerate(function($item, $data) {

                $item.views.title = new TextView();

                $item.views.title.name = "tv_title";
                $item.views.title.text = $data.title;

                $item.views.text = new TextView();
                $item.views.text.name = "tv_text";
                $item.views.text.text = $data.text;

            });

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

        on_content: function ($views) {

            $css.select($views.page.selector)
                .begin()
                    .relativeLeftFull()
                    .heightCropFromFull(70)
                .save();

            $css.select($views.page.item.selector)
                .begin()
                    .relativeLeft()
                    .widthCropFromFull(40)
                    .paddingHorizontal(20)
                .save();

            $css.select($views.page.item.selector + " z-text-view[z-name='tv_title']")
                .begin()
                    .relativeLeftFull()
                    .textHeight(50)
                    .textSizeViewportWidth(5)
                    .textColor($theme.color.whiteFull)
                    .textRegular()
                .save();

            $css.select($views.page.item.selector + " z-text-view[z-name='tv_text']")
                .begin()
                    .relativeLeftFull()
                    .textLineHeight(25)
                    .marginBottom(10)
                    .textSizeViewportWidth(3.75)
                    .textColor($theme.color.grayLight)
                    .textLight()
                .save();

        },

        on_show_start: function($views) {

            $views.page.element.scrollTop = 0;

            $bridge.js.onBackPressed = function () {

                $module.prelogin.pages.signin.show();
                $self.module.views.image.switch("center");
                $self.hide();

                $bridge.js.onBackPressed = function () { $bridge.native.quit(); };

            };

        }

    };

});